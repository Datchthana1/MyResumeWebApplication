"use client";

import { useLang } from "@/providers/LanguageProvider";

/* Starter questions shown on an empty chat. Clicking one sends it at once. */
export default function SuggestedPrompts({ onPick, disabled, className = "" }) {
  const { t } = useLang();
  const c = t.chat;

  return (
    <div className={className}>
      <p className="kicker mb-3">{c.suggestionsLabel}</p>
      <div className="flex flex-wrap justify-center gap-2">
        {c.suggestions.map((prompt) => (
          <button
            key={prompt}
            type="button"
            onClick={() => onPick(prompt)}
            disabled={disabled}
            className="pill text-left text-sm text-ink-2 transition-colors hover:border-line-strong hover:text-ink disabled:cursor-not-allowed disabled:opacity-50"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
}
