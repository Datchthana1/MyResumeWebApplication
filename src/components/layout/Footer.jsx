// components/Footer.jsx
"use client";
import { useLang } from "@/providers/LanguageProvider";

export default function Footer() {
  const { t } = useLang();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-line bg-surface/60 backdrop-blur-xl">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-6 py-8 sm:flex-row">
        <p className="text-sm text-ink-2">
          &copy; {currentYear}{" "}
          <span className="font-display font-medium text-ink">
            Dechthana Arunchaiya
          </span>
        </p>
        <p className="mono flex items-center gap-2 text-xs text-ink-3">
          <span className="spark-dot" />
          {t.footer.builtWith}
        </p>
      </div>
    </footer>
  );
}
