"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Icon from "@/components/ui/Icon";
import { useLang } from "@/providers/LanguageProvider";

// Matches the .animate-fadeOut / fadeOutOverlay duration in globals.css.
const CLOSE_MS = 300;

// Full-screen image viewer. Closes on Escape, backdrop click or the close
// button; focus moves to the close button on open and returns to the opener
// on close. `alt` describes the image for screen readers.
export default function LightBox({ src, alt, onClose }) {
  const { t } = useLang();
  const closeRef = useRef(null);
  const timerRef = useRef(null);
  const [closing, setClosing] = useState(false);

  const requestClose = useCallback(() => {
    if (timerRef.current) return;
    setClosing(true);
    timerRef.current = setTimeout(onClose, CLOSE_MS);
  }, [onClose]);

  // Focus management and body scroll lock for the life of the dialog.
  useEffect(() => {
    const opener = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      clearTimeout(timerRef.current);
      if (opener instanceof HTMLElement) opener.focus();
    };
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") requestClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [requestClose]);

  return (
    <div
      className={`fixed inset-0 z-[60] flex items-center justify-center bg-ink/30 p-4 backdrop-blur-sm ${
        closing ? "animate-fadeOutOverlay" : "animate-fadeInOverlay"
      }`}
      onClick={requestClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={alt}
        className={`relative max-h-[90vh] max-w-[min(90vw,48rem)] ${
          closing ? "animate-fadeOut" : "animate-fadeInUp"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={src}
          alt={alt}
          className="block h-auto max-h-[85vh] w-auto max-w-full rounded-3xl bg-surface object-contain"
        />
        <button
          ref={closeRef}
          type="button"
          onClick={requestClose}
          aria-label={t.ui.close}
          className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface text-ink-2 shadow transition-colors hover:text-ink"
        >
          <Icon name="close" size={16} />
        </button>
      </div>
    </div>
  );
}
