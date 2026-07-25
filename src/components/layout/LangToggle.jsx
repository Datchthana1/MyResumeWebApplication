"use client";
import { useLang } from "@/providers/LanguageProvider";

const LANGS = [
  { code: "en", label: "EN" },
  { code: "th", label: "TH" },
];

export default function LangToggle({ className = "" }) {
  const { lang, setLang } = useLang();

  return (
    <div
      className={`mono inline-flex items-center rounded-full border border-line p-0.5 text-xs ${className}`}
      role="group"
      aria-label="Language"
    >
      {LANGS.map((l) => {
        const active = lang === l.code;
        return (
          <button
            key={l.code}
            type="button"
            onClick={() => setLang(l.code)}
            aria-pressed={active}
            className={`rounded-full px-2.5 py-1 transition-colors duration-300 ${
              active
                ? "bg-ink text-paper"
                : "text-ink-3 hover:text-ink"
            }`}
          >
            {l.label}
          </button>
        );
      })}
    </div>
  );
}
