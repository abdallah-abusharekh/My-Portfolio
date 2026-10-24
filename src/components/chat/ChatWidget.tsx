import {
  FormEvent,
  KeyboardEvent,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { profile } from "../../data/profile";
import { ChatMarkdown } from "./ChatMarkdown";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
  // Errors are shown in the thread but never sent back to the API
  error?: boolean;
};

// Keep in sync with the limits in api/chat.ts
const MAX_MESSAGE_LENGTH = 500;
const MAX_HISTORY = 10;
// A bit above the server's worst case (two models x 12s)
const REQUEST_TIMEOUT_MS = 30_000;

const firstName = profile.name.split(" ")[0];

const welcomeMessage = `Hi👋, I’m ${firstName} | Software Engineer & Full-stack developer. Ask me about my projects, stack, or experience. What would you like to know?`;

const suggestedQuestions = [
  "What projects have you built?",
  "What's your tech stack?",
  "Are you open to new opportunities?",
];

// Pulsing "online" dot, shared by the floating button and the panel header.
// Each use adds its own colour.
const statusDotClass = "rounded-full motion-safe:animate-pulse-dot";

const BotIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="4" y="7.5" width="16" height="11.5" rx="4" />
    <path d="M12 7.5V4.5M2 12v3M22 12v3M10 16h4" />
    <circle cx="12" cy="3.5" r="1" />
    <circle cx="9" cy="12.5" r="1" fill="currentColor" stroke="none" />
    <circle cx="15" cy="12.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const CloseIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
    <path
      d="M6 6L18 18M18 6L6 18"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const SendIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 bg-card px-4 py-3.5 border border-border-subtle rounded-2xl rounded-bl-md w-fit">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="bg-teal rounded-full w-1.5 h-1.5"
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeInOut",
          }}
        />
      ))}
      <span className="sr-only">Assistant is typing</span>
    </div>
  );
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const reduceMotion = useReducedMotion();

  const panelId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Focus the input whenever the panel opens
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  // Keep the newest message in view
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, loading, open]);

  function close() {
    setOpen(false);
    toggleRef.current?.focus();
  }

  async function send(text: string) {
    const content = text.trim().slice(0, MAX_MESSAGE_LENGTH);
    if (!content || loading) return;

    const next: ChatMessage[] = [...messages, { role: "user", content }];
    setMessages(next);
    setInput("");
    setLoading(true);

    const history = next
      .filter((m) => !m.error)
      .slice(-MAX_HISTORY)
      .map(({ role, content }) => ({ role, content }));

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || typeof data?.reply !== "string") {
        throw new Error(data?.error);
      }
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } catch (err) {
      const timedOut = err instanceof Error && err.name === "TimeoutError";
      const message = timedOut
        ? `Sorry, that took too long. Please try again, or email ${profile.email}.`
        : err instanceof Error && err.message
          ? err.message
          : `Sorry, I couldn't reply just now. Please try again, or email ${profile.email}.`;
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: message, error: true },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    send(input);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    // Enter sends, Shift+Enter adds a new line
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      send(input);
    }
  }

  const remaining = MAX_MESSAGE_LENGTH - input.length;

  return (
    <div
      className="right-4 sm:right-6 bottom-4 sm:bottom-6 z-[60] fixed"
      onKeyDown={(e) => {
        if (e.key === "Escape" && open) close();
      }}
    >
      <AnimatePresence>
        {open && (
          <motion.div
            id={panelId}
            role="dialog"
            aria-label={`Chat with ${firstName}'s AI assistant`}
            className="right-0 bottom-[calc(100%+0.75rem)] absolute flex flex-col bg-[#0a0a0a]/95 shadow-2xl shadow-black/50 backdrop-blur-xl border border-white/10 rounded-2xl w-[calc(100vw-2rem)] sm:w-[24rem] h-[min(36rem,calc(100dvh-7rem))] overflow-hidden"
            // Grow out of the button's corner
            style={{ originX: 1, originY: 1 }}
            initial={
              reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.6, y: 16 }
            }
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={
              reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.6, y: 16 }
            }
            transition={
              reduceMotion
                ? { duration: 0.15 }
                : { type: "spring", stiffness: 380, damping: 30 }
            }
          >
            {/* Header */}
            <div className="flex items-center gap-3 bg-bluegray-950/80 px-4 py-3 border-white/[0.06] border-b">
              <div className="flex justify-center items-center bg-bluegray-800 border-2 border-teal/80 rounded-full w-9 h-9 text-teal-light shrink-0">
                <BotIcon className="w-5 h-5" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-semibold text-white text-sm">
                  {firstName}'s assistant
                </span>
                <span className="flex items-center gap-1.5 font-mono text-[0.62rem] text-text-muted uppercase tracking-[0.12em]">
                  <span className={`${statusDotClass} bg-teal w-1.5 h-1.5`} />
                  AI · answers on my behalf
                </span>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Close chat"
                className="flex justify-center items-center hover:bg-white/5 ml-auto rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-light/70 w-8 h-8 text-bluegray-300 hover:text-white transition-colors shrink-0"
              >
                <CloseIcon className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              role="log"
              aria-live="polite"
              aria-label="Chat messages"
              className="flex-1 space-y-3 px-4 py-4 overflow-y-auto overscroll-contain"
            >
              <div className="bg-card px-4 py-3 border border-border-subtle rounded-2xl rounded-bl-md max-w-[85%] text-[#fafafa]/80 text-sm leading-relaxed">
                <ChatMarkdown content={welcomeMessage} />
              </div>

              {messages.length === 0 && (
                <div className="flex flex-col items-start gap-2 pt-1">
                  {suggestedQuestions.map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => send(q)}
                      className="bg-bluegray-900/60 hover:bg-bluegray-800 px-3.5 py-2 border border-bluegray-700 hover:border-teal/60 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-light/70 text-bluegray-300 hover:text-white text-xs text-left transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}

              {messages.map((m, i) =>
                m.role === "user" ? (
                  <div key={i} className="flex justify-end">
                    <div className="bg-bluegray-800 px-4 py-2.5 border border-bluegray-700 rounded-2xl rounded-br-md max-w-[85%] text-white text-sm break-words leading-relaxed whitespace-pre-wrap">
                      <span className="sr-only">You: </span>
                      {m.content}
                    </div>
                  </div>
                ) : (
                  <div
                    key={i}
                    className={`px-4 py-3 border rounded-2xl rounded-bl-md max-w-[85%] text-sm leading-relaxed break-words ${
                      m.error
                        ? "bg-red-500/10 border-red-500/20 text-red-300"
                        : "bg-card border-border-subtle text-[#fafafa]/80"
                    }`}
                  >
                    <span className="sr-only">Assistant: </span>
                    <ChatMarkdown content={m.content} />
                  </div>
                ),
              )}

              {loading && <TypingIndicator />}
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="bg-bluegray-950/60 p-3 border-white/[0.06] border-t"
            >
              <div className="flex items-end gap-2">
                <label htmlFor={`${panelId}-input`} className="sr-only">
                  Your message
                </label>
                <textarea
                  id={`${panelId}-input`}
                  ref={inputRef}
                  rows={1}
                  value={input}
                  maxLength={MAX_MESSAGE_LENGTH}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about my work..."
                  className="flex-1 bg-bluegray-900/60 px-4 py-2.5 border border-bluegray-700 focus:border-teal-light rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-light/30 max-h-28 text-white placeholder:text-bluegray-600 text-sm transition-colors resize-none [field-sizing:content]"
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  aria-label="Send message"
                  className="flex justify-center items-center bg-bluegray-800 hover:bg-teal disabled:hover:bg-bluegray-800 disabled:opacity-50 border border-bluegray-600 hover:border-teal-light rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-light/70 w-11 h-11 text-bluegray-300 hover:text-white transition-colors disabled:cursor-not-allowed shrink-0"
                >
                  <SendIcon />
                </button>
              </div>
              {remaining <= 50 && (
                <p className="mt-1.5 px-1 font-mono text-[0.62rem] text-text-muted">
                  {remaining} characters left
                </p>
              )}
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating bubble */}
      <button
        ref={toggleRef}
        type="button"
        onClick={() => (open ? close() : setOpen(true))}
        aria-label={
          open ? "Close chat" : `Chat with ${firstName}'s AI assistant`
        }
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        className="group block relative shadow-[0_8px_30px_rgba(0,0,0,0.45)] hover:shadow-[0_0_40px_rgba(115,161,177,0.5)] rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-light/70 focus-visible:ring-offset-[#0a0a0a] focus-visible:ring-offset-2 w-14 h-14 motion-safe:hover:scale-105 motion-safe:active:scale-95 transition-[box-shadow,transform] motion-safe:hover:-translate-y-1 motion-safe:animate-pop-in duration-300"
      >
        {/* Breathing glow ring */}
        <span
          aria-hidden="true"
          className={`absolute -inset-1 rounded-full bg-teal/50 group-hover:bg-teal-light/80 blur-md transition-[background-color,opacity] duration-300 ${
            open ? "opacity-0" : "opacity-40 motion-safe:animate-breathe"
          }`}
        />

        {/* Bot icon, rotates out as the ✕ rotates in */}
        <span
          aria-hidden="true"
          className={`absolute inset-0 flex justify-center items-center rounded-full border-2 border-teal/80 group-hover:border-teal-light bg-bluegray-800 group-hover:bg-teal text-teal-light group-hover:text-white transition-[opacity,transform,background-color,border-color,color] duration-300 ${
            open ? "opacity-0 motion-safe:rotate-90 motion-safe:scale-50" : ""
          }`}
        >
          <BotIcon />
        </span>

        <span
          aria-hidden="true"
          className={`absolute inset-0 flex justify-center items-center rounded-full bg-bluegray-800 group-hover:bg-teal border border-bluegray-600 group-hover:border-teal-light text-bluegray-300 group-hover:text-white transition-[opacity,transform,background-color,border-color,color] duration-300 ${
            open ? "" : "opacity-0 motion-safe:-rotate-90 motion-safe:scale-50"
          }`}
        >
          <CloseIcon />
        </span>

        {/* Online dot, same pulse as the panel header's status dot. The outer
            span fades it out while open; the pulse animates opacity itself,
            so it can't sit on the same element. */}
        <span
          aria-hidden="true"
          className={`right-0.5 bottom-0.5 absolute w-3 h-3 transition-opacity duration-200 ${
            open ? "opacity-0" : "opacity-100"
          }`}
        >
          <span
            className={`${statusDotClass} block bg-amber-400 border-2 border-[#0a0a0a] w-full h-full`}
          />
        </span>
      </button>
    </div>
  );
}
