"use client";
import { useLang } from "@/providers/LanguageProvider";

// First focusable element on every page. Hidden until a keyboard user tabs
// to it (.skip-link in globals.css), then jumps straight to <main id="main">.
export default function SkipLink() {
  const { t } = useLang();
  return (
    <a href="#main" className="skip-link">
      {t.ui.skipToContent}
    </a>
  );
}
