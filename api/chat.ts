import { ApiError, GoogleGenAI, ThinkingLevel, type Content } from "@google/genai";
import { systemPrompt } from "./_portfolio-context.js";

// Free-tier models (see ai.google.dev/gemini-api/docs/pricing), tried in order.
// Flash-Lite answers in ~2s; the next one is a fallback when it's busy.
// gemini-3.8-flash was too congested on the free tier (30-80s, frequent 503s).
const MODELS = ["gemini-3.5-flash-lite", "gemini-3.6-flash"];
// Per-model limit, so a slow model falls through instead of hanging
const MODEL_TIMEOUT_MS = 12_000;

// Abuse limits. Keep MAX_MESSAGE_LENGTH / MAX_HISTORY in sync with ChatWidget.tsx
const MAX_MESSAGE_LENGTH = 500;
const MAX_HISTORY = 10;
// Includes thinking tokens, so leave headroom above the visible reply
const MAX_OUTPUT_TOKENS = 1024;

const FALLBACK_ERROR =
  "Sorry, I couldn't reply just now. Please try again in a moment, or reach me by email at abdallahabusharekh66@gmail.com.";
const RATE_LIMIT_ERROR =
  "I'm getting a lot of questions right now. Please try again in a minute, or reach me by email at abdallahabusharekh66@gmail.com.";

type IncomingMessage = { role: "user" | "assistant"; content: string };

const json = (body: unknown, status = 200, headers: HeadersInit = {}) =>
  Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store", ...headers },
  });

function parseMessages(body: unknown): IncomingMessage[] | null {
  const raw = (body as { messages?: unknown })?.messages;
  if (!Array.isArray(raw) || raw.length === 0) return null;

  const messages: IncomingMessage[] = [];
  for (const m of raw.slice(-MAX_HISTORY)) {
    if (
      !m ||
      (m.role !== "user" && m.role !== "assistant") ||
      typeof m.content !== "string"
    ) {
      return null;
    }
    const content = m.content.trim();
    if (!content || content.length > MAX_MESSAGE_LENGTH) return null;
    messages.push({ role: m.role, content });
  }

  // Gemini expects the conversation to start with a user turn and end on one
  while (messages[0]?.role === "assistant") messages.shift();
  if (messages.at(-1)?.role !== "user") return null;
  return messages;
}

export default {
  async fetch(request: Request) {
    if (request.method !== "POST") {
      return json({ error: "Method not allowed." }, 405, { Allow: "POST" });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("chat: GEMINI_API_KEY is not set");
      return json({ error: FALLBACK_ERROR }, 500);
    }

    const messages = parseMessages(await request.json().catch(() => null));
    if (!messages) {
      return json(
        {
          error: `Please send a message of up to ${MAX_MESSAGE_LENGTH} characters.`,
        },
        400,
      );
    }

    const contents: Content[] = messages.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const ai = new GoogleGenAI({ apiKey });
    let rateLimited = false;

    for (const model of MODELS) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents,
          config: {
            systemInstruction: systemPrompt,
            maxOutputTokens: MAX_OUTPUT_TOKENS,
            thinkingConfig: { thinkingLevel: ThinkingLevel.MINIMAL },
            // The SDK otherwise retries 429/5xx up to 5 times with long
            // backoff; falling back to the next model is much faster.
            httpOptions: {
              timeout: MODEL_TIMEOUT_MS,
              retryOptions: { attempts: 1 },
            },
          },
        });

        const reply = response.text?.trim();
        if (reply) return json({ reply });
        console.error(
          `chat: empty reply from ${model}, finishReason =`,
          response.candidates?.[0]?.finishReason,
        );
      } catch (err) {
        // Log server-side only; the client gets a generic message
        if (err instanceof ApiError) {
          console.error(`chat: ${model} error ${err.status}: ${err.message}`);
          if (err.status === 429) rateLimited = true;
          // Bad request or auth problems won't be fixed by another model
          else if (err.status < 500 && err.status !== 404) break;
        } else {
          console.error(`chat: ${model} failed`, err);
        }
      }
    }

    return rateLimited
      ? json({ error: RATE_LIMIT_ERROR }, 429)
      : json({ error: FALLBACK_ERROR }, 502);
  },
};
