"use client";

// AI chatbot page — ask questions about Dechthana.
//
// History is kept ONLY in React state (the `messages` array below). Nothing is
// written to localStorage, cookies, or any database, so the moment the user
// navigates away this component unmounts and the conversation is wiped. Coming
// back to /chat always starts a fresh, empty session.

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useLang } from "@/components/LanguageProvider";

// Tailwind classes for the markdown elements the bot tends to emit (bold,
// bullet / numbered lists, links, inline code). react-markdown never renders
// raw HTML by default, so this is safe for LLM output.
const mdComponents = {
  p: (props) => <p className="mb-2 last:mb-0" {...props} />,
  ul: (props) => <ul className="mb-2 list-disc space-y-1 pl-5 last:mb-0" {...props} />,
  ol: (props) => <ol className="mb-2 list-decimal space-y-1 pl-5 last:mb-0" {...props} />,
  li: (props) => <li className="leading-relaxed" {...props} />,
  strong: (props) => <strong className="font-semibold" {...props} />,
  a: (props) => (
    <a
      className="underline underline-offset-2 hover:text-neutral-950"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
  code: (props) => (
    <code className="rounded bg-black/10 px-1 py-0.5 text-[0.85em]" {...props} />
  ),
  h1: (props) => <h1 className="mb-2 text-base font-semibold" {...props} />,
  h2: (props) => <h2 className="mb-2 text-base font-semibold" {...props} />,
  h3: (props) => <h3 className="mb-1 font-semibold" {...props} />,
};

export default function ChatPage() {
  const { t } = useLang();
  const c = t.chat;

  const [messages, setMessages] = useState([]); // { role: "user"|"assistant", text }
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const scrollRef = useRef(null);

  // Keep the latest message in view.
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  async function sendMessage(e) {
    e?.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const next = [...messages, { role: "user", text }];
    setMessages(next);
    setInput("");
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || c.error);
      setMessages((m) => [...m, { role: "assistant", text: data.reply }]);
    } catch (err) {
      setError(err.message || c.error);
    } finally {
      setLoading(false);
    }
  }

  function resetChat() {
    setMessages([]);
    setInput("");
    setError("");
  }

  return (
    <div className="relative min-h-screen px-6 pb-16 pt-28">
      <div className="mx-auto flex max-w-3xl flex-col">
        <div className="mb-6 flex items-center justify-between gap-4">
          <Link
            href="/#home"
            className="inline-flex items-center gap-2 text-sm text-neutral-500 transition-colors hover:text-neutral-950"
          >
            <span aria-hidden>&larr;</span>
            {t.ui.backToHome}
          </Link>
          {messages.length > 0 && (
            <button
              onClick={resetChat}
              className="text-sm text-neutral-500 transition-colors hover:text-neutral-950"
            >
              {c.reset}
            </button>
          )}
        </div>

        <header className="mb-6">
          <p className="kicker mb-3 flex items-center gap-2">
            <span className="signal-dot" />
            AI ASSISTANT &middot; gpt-oss
          </p>
          <h1 className="font-display text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
            {c.title}
          </h1>
          <p className="mt-2 text-sm text-neutral-500">{c.subtitle}</p>
        </header>

        {/* Conversation */}
        <div
          ref={scrollRef}
          className="card flex h-[55vh] flex-col gap-4 overflow-y-auto rounded-3xl p-4 sm:p-6"
        >
          {messages.length === 0 && !loading && (
            <div className="m-auto max-w-sm text-center text-sm text-neutral-400">
              {c.empty}
            </div>
          )}

          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${
                m.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  m.role === "user"
                    ? "whitespace-pre-wrap bg-neutral-900 text-white"
                    : "bg-black/5 text-neutral-800"
                }`}
              >
                {m.role === "user" ? (
                  m.text
                ) : (
                  <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
                    {m.text}
                  </ReactMarkdown>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="rounded-2xl bg-black/5 px-4 py-3">
                <span className="flex gap-1">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-neutral-400 [animation-delay:-0.3s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-neutral-400 [animation-delay:-0.15s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-neutral-400" />
                </span>
              </div>
            </div>
          )}
        </div>

        {error && (
          <p className="mt-3 text-sm text-red-500">{error}</p>
        )}

        {/* Composer */}
        <form onSubmit={sendMessage} className="mt-4 flex items-end gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) sendMessage(e);
            }}
            rows={1}
            placeholder={c.placeholder}
            className="card max-h-40 min-h-[48px] flex-1 resize-none rounded-2xl px-4 py-3 text-sm text-neutral-900 outline-none placeholder:text-neutral-400 focus:border-neutral-400"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="h-12 shrink-0 rounded-2xl bg-neutral-900 px-5 text-sm font-medium text-white transition-all hover:bg-(--signal-strong) hover:shadow-[0_10px_24px_-10px_rgba(14,159,110,0.6)] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-neutral-900 disabled:hover:shadow-none"
          >
            {c.send}
          </button>
        </form>

        <p className="mt-3 text-center text-xs text-neutral-400">{c.notice}</p>
      </div>
    </div>
  );
}
