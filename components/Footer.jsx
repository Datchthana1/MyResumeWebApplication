// components/Footer.jsx
"use client";
import { useLang } from "@/components/LanguageProvider";

export default function Footer() {
  const { t } = useLang();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-black/8 bg-white/60 backdrop-blur-xl">
      <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-sm text-neutral-500">
          &copy; {currentYear}{" "}
          <span className="font-display font-medium text-neutral-800">
            Dechthana Arunchaiya
          </span>
        </p>
        <p className="flex items-center gap-2 font-mono text-xs text-neutral-400">
          <span className="signal-dot" />
          {t.footer.builtWith}
        </p>
      </div>
    </footer>
  );
}
