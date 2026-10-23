"use client";
import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/Icon";
import { useLang } from "@/providers/LanguageProvider";

/* Copies a value (an email address) to the clipboard and flips to a
   "Copied" state for a moment. If the clipboard is blocked, nothing breaks:
   the address is still a working mailto link next to it. */
export default function CopyButton({ value }) {
  const { t } = useLang();
  const [copied, setCopied] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable: leave the label unchanged */
    }
  }

  return (
    <button type="button" onClick={copy} className="icon-btn gap-2 px-3 text-xs">
      <Icon name={copied ? "check" : "copy"} size={14} />
      <span aria-live="polite">{copied ? t.ui.copied : t.ui.copy}</span>
    </button>
  );
}
