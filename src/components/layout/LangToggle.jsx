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
      className={`inline-flex items-center rounded-full border border-black/10 p-0.5 text-xs font-mono ${className}`}
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
            className={`px-2.5 py-1 rounded-full transition-colors duration-300 ${
              active
                ? "bg-neutral-950 text-white"
                : "text-neutral-500 hover:text-neutral-950"
            }`}
          >
            {l.label}
          </button>
        );
      })}
    </div>
  );
}
