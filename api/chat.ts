import { ApiError, GoogleGenAI, ThinkingLevel, type Content } from "@google/genai";
import { systemPrompt } from "./_portfolio-context.js";

// Free-tier models (see ai.google.dev/gemini-api/docs/pricing), tried in order.
// Flash-Lite answers in ~2s; the next one is a fallback when it's busy.
// gemini-3.8-flash was too congested on the free tier (30-80s, frequent 503s).
const MODELS = ["gemini-3.5-flash-lite", "gemini-3.6-flash"];
// Per-model limit, so a slow model falls through instead of hanging
const MODEL_TIMEOUT_MS = 12_000;

// Abuse limits. Keep the user limit / MAX_HISTORY in sync with ChatWidget.tsx.
const MAX_USER_MESSAGE_LENGTH = 500;
const MAX_HISTORY = 10;
// Includes thinking tokens, so leave headroom above the visible reply
const MAX_OUTPUT_TOKENS = 1024;
const MAX_REQUEST_BODY_BYTES = 16 * 1024;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 10;

const FALLBACK_ERROR =
  "Sorry, I couldn't reply just now. Please try again in a moment, or reach me by email at abdallahabusharekh66@gmail.com.";
const RATE_LIMIT_ERROR =
  "I'm getting a lot of questions right now. Please try again in a minute, or reach me by email at abdallahabusharekh66@gmail.com.";

type IncomingMessage = { role: "user" | "assistant"; content: string };
type RateLimitEntry = { count: number; windowStartedAt: number };

const rateLimit = new Map<string, RateLimitEntry>();

const json = (body: unknown, status = 200, headers: HeadersInit = {}) =>
  Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store", ...headers },
  });

function getClientKey(request: Request): string {
  // Vercel and most reverse proxies provide the connecting address here.
  // Use only the first forwarded address when running behind a proxy.
  return (
    request.headers.get("x-real-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown"
  );
}

function checkRateLimit(request: Request): number {
  const now = Date.now();
  const clientKey = getClientKey(request);
  const current = rateLimit.get(clientKey);

  if (!current || now - current.windowStartedAt >= RATE_LIMIT_WINDOW_MS) {
    rateLimit.set(clientKey, { count: 1, windowStartedAt: now });
  } else if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    return Math.ceil(
      (RATE_LIMIT_WINDOW_MS - (now - current.windowStartedAt)) / 1_000,
    );
  } else {
    current.count += 1;
  }

  // Prevent stale entries from accumulating in long-lived server processes.
  if (rateLimit.size > 1_000) {
    for (const [key, entry] of rateLimit) {
      if (now - entry.windowStartedAt >= RATE_LIMIT_WINDOW_MS) {
        rateLimit.delete(key);
      }
    }
  }

  return 0;
}

async function parseRequestBody(
  request: Request,
): Promise<{ body: unknown; tooLarge: boolean }> {
  const declaredLength = request.headers.get("content-length");
  if (declaredLength && Number(declaredLength) > MAX_REQUEST_BODY_BYTES) {
    return { body: null, tooLarge: true };
  }

  const bytes = await request.arrayBuffer();
  if (bytes.byteLength > MAX_REQUEST_BODY_BYTES) {
    return { body: null, tooLarge: true };
  }

  try {
    return { body: JSON.parse(new TextDecoder().decode(bytes)), tooLarge: false };
  } catch {
    return { body: null, tooLarge: false };
  }
}

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
    if (
      !content ||
      (m.role === "user" && content.length > MAX_USER_MESSAGE_LENGTH)
    ) {
      return null;
    }
    messages.push({ role: m.role, content });
  }

  // Assistant history comes from the client and cannot be authenticated.
  const userMessages = messages.filter((message) => message.role === "user");
  return userMessages.length > 0 ? userMessages : null;
}

export default {
  async fetch(request: Request) {
    if (request.method !== "POST") {
      return json({ error: "Method not allowed." }, 405, { Allow: "POST" });
    }

    const retryAfter = checkRateLimit(request);
    if (retryAfter > 0) {
      return json(
        { error: RATE_LIMIT_ERROR },
        429,
        { "Retry-After": String(retryAfter) },
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("chat: GEMINI_API_KEY is not set");
      return json({ error: FALLBACK_ERROR }, 500);
    }

    const requestBody = await parseRequestBody(request);
    if (requestBody.tooLarge) {
      return json(
        { error: "Request body is too large." },
        413,
        { "Content-Type": "application/json" },
      );
    }

    const messages = parseMessages(requestBody.body);
    if (!messages) {
      return json(
        {
          error: `Please send a message of up to ${MAX_USER_MESSAGE_LENGTH} characters.`,
        },
        400,
      );
    }

    const contents: Content[] = messages.map((m) => ({
      role: "user",
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
