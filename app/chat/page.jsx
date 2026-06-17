"use client";

// AI chatbot page — ask questions about Dechthana.
//
// History is kept ONLY in React state (the `messages` array below). Nothing is
// written to localStorage, cookies, or any database, so the moment the user
// navigates away this component unmounts and the conversation is wiped. Coming
// back to /chat always starts a fresh, empty session.

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useLang } from "@/components/LanguageProvider";

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
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
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
                className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  m.role === "user"
                    ? "bg-neutral-900 text-white"
                    : "bg-black/5 text-neutral-800"
                }`}
              >
                {m.text}
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
            className="h-12 shrink-0 rounded-2xl bg-neutral-900 px-5 text-sm font-medium text-white transition-colors hover:bg-neutral-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {c.send}
          </button>
        </form>

        <p className="mt-3 text-center text-xs text-neutral-400">{c.notice}</p>
      </div>
    </div>
  );
}
