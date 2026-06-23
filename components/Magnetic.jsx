"use client";

// Magnetic — wraps an interactive element so it drifts toward the cursor while
// hovered, then springs back on leave. A small, deliberate micro-interaction
// reserved for the hero CTAs. No-op when the pointer is coarse (touch) or when
// the user prefers reduced motion.

import { useRef } from "react";

export default function Magnetic({ children, strength = 0.35, className = "" }) {
  const ref = useRef(null);

  function handleMove(e) {
    const el = ref.current;
    if (!el) return;
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia("(pointer: coarse)").matches
    )
      return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  }

  function reset() {
    const el = ref.current;
    if (el) el.style.transform = "translate(0, 0)";
  }

  return (
    <span
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={`magnetic ${className}`}
    >
      {children}
    </span>
  );
}
