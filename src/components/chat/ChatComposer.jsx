"use client";

import { useEffect, useRef } from "react";
import Icon from "@/components/ui/Icon";
import { useLang } from "@/providers/LanguageProvider";

/* Message input: auto-growing textarea + send button. Enter sends,
   Shift+Enter inserts a newline. */
export default function ChatComposer({ value, onChange, onSubmit, loading, placeholder }) {
  const { t } = useLang();
  const c = t.chat;
  const ref = useRef(null);

  // Grow the textarea with its content. CSS max-h caps it; resetting to
  // "auto" first lets it shrink again after a send clears the value.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [value]);

  return (
    <form onSubmit={onSubmit} className="mt-4 flex items-end gap-2">
      <textarea
        ref={ref}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          // Skip while an IME (e.g. Thai input) is still composing.
          if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) onSubmit(e);
        }}
        rows={1}
        aria-label={placeholder}
        placeholder={placeholder}
        className="card max-h-40 min-h-[48px] flex-1 resize-none rounded-2xl px-4 py-3 text-sm text-ink outline-none placeholder:text-ink-3 focus:border-line-strong"
      />
      <button
        type="submit"
        disabled={loading || !value.trim()}
        aria-label={c.send}
        className="btn btn-spark h-12 shrink-0 px-5 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Icon name="send" size={16} />
        <span>{c.send}</span>
      </button>
    </form>
  );
}
