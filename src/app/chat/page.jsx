"use client";

// AI chatbot page — ask questions about Dechthana.
//
// History is kept ONLY in React state (the `messages` array below). Nothing is
// written to localStorage, cookies, or any database, so the moment the user
// navigates away this component unmounts and the conversation is wiped. Coming
// back to /chat always starts a fresh, empty session.

import { useEffect, useRef, useState } from "react";
import PageHeader from "@/components/ui/PageHeader";
import Icon from "@/components/ui/Icon";
import ChatMessage from "@/components/chat/ChatMessage";
import ChatComposer from "@/components/chat/ChatComposer";
import SuggestedPrompts from "@/components/chat/SuggestedPrompts";
import { useLang } from "@/providers/LanguageProvider";

// Stable session id, so server-side logs can group a conversation. Regenerated
// on "New chat". Not persisted anywhere client-side.
function newSessionId() {
  return typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `s-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export default function ChatPage() {
  const { t } = useLang();
  const c = t.chat;

  const [messages, setMessages] = useState([]); // { role: "user"|"assistant", text }
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const scrollRef = useRef(null);
  const sessionId = useRef(newSessionId());

  // Keep the latest message in view.
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  // Sends `raw` as a new user message. Used by the composer and by the
  // suggested-prompt chips.
  async function send(raw) {
    const text = raw.trim();
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
        body: JSON.stringify({ messages: next, session_id: sessionId.current }),
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

  function handleSubmit(e) {
    e?.preventDefault();
    send(input);
  }

  function resetChat() {
    setMessages([]);
    setInput("");
    setError("");
    sessionId.current = newSessionId();
  }

  const hasMessages = messages.length > 0;

  return (
    <div className="relative min-h-screen px-6 pb-16 pt-28">
      <div className="mx-auto flex max-w-3xl flex-col">
        <PageHeader
          backHref="/#home"
          eyebrow={t.ui.askAi}
          title={c.title}
          blurb={c.subtitle}
          actions={
            hasMessages && (
              <button type="button" onClick={resetChat} className="icon-btn px-4 py-2 text-sm">
                {c.reset}
              </button>
            )
          }
        />

        {/* Conversation */}
        <div
          ref={scrollRef}
          role="log"
          aria-live="polite"
          className={`card flex flex-col gap-4 overflow-y-auto rounded-3xl p-4 sm:p-6 ${
            hasMessages || loading ? "h-[55vh]" : "min-h-[320px]"
          }`}
        >
          {/* Empty state doubles as the starting point: one tap asks a question */}
          {!hasMessages && !loading && (
            <div className="m-auto flex max-w-lg flex-col items-center gap-6 py-6 text-center">
              <span className="feature-icon">
                <Icon name="spark" size={20} />
              </span>
              <p className="text-ink-2">{c.empty}</p>
              <SuggestedPrompts onPick={(prompt) => send(prompt)} disabled={loading} />
            </div>
          )}

          {messages.map((m, i) => (
            <ChatMessage key={i} role={m.role} text={m.text} />
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="rounded-2xl bg-surface-2 px-4 py-3">
                <span className="flex items-center gap-1">
                  <span className="sr-only">{c.thinking}</span>
                  <span aria-hidden className="h-2 w-2 animate-bounce rounded-full bg-ink-3 [animation-delay:-0.3s]" />
                  <span aria-hidden className="h-2 w-2 animate-bounce rounded-full bg-ink-3 [animation-delay:-0.15s]" />
                  <span aria-hidden className="h-2 w-2 animate-bounce rounded-full bg-ink-3" />
                </span>
              </div>
            </div>
          )}
        </div>

        {error && (
          <p role="alert" className="mt-3 text-sm text-spark-ink">
            {error}
          </p>
        )}

        {/* Composer */}
        <ChatComposer
          value={input}
          onChange={setInput}
          onSubmit={handleSubmit}
          loading={loading}
          placeholder={c.placeholder}
        />

        <p className="mt-3 text-center text-xs text-ink-3">{c.notice}</p>
      </div>
    </div>
  );
}
