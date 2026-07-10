"use client";

// Typewriter — types and erases a rotating list of role strings, like a live
// readout. Used for the hero's positions. With reduced motion it falls back to
// the role list joined statically (no animation, no caret churn).

import { useEffect, useState } from "react";

export default function Typewriter({
  words = [],
  typeSpeed = 70,
  deleteSpeed = 38,
  holdTime = 1600,
  className = "",
}) {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (reduce || !words.length) return;
    const current = words[index % words.length];

    if (!deleting && text === current) {
      const hold = setTimeout(() => setDeleting(true), holdTime);
      return () => clearTimeout(hold);
    }
    if (deleting && text === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
      return;
    }

    const next = deleting
      ? current.slice(0, text.length - 1)
      : current.slice(0, text.length + 1);

    const tick = setTimeout(() => setText(next), deleting ? deleteSpeed : typeSpeed);
    return () => clearTimeout(tick);
  }, [text, deleting, index, words, reduce, typeSpeed, deleteSpeed, holdTime]);

  if (reduce || !words.length) {
    return <span className={className}>{words.join("  ·  ")}</span>;
  }

  return (
    <span className={`inline-flex items-center ${className}`}>
      <span>{text}</span>
      <span className="caret" aria-hidden="true" />
    </span>
  );
}
