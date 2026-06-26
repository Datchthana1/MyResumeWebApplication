"use client";

// ScrollProgress — a thin emerald bar pinned to the top of the viewport that
// tracks how far the page has been scrolled. Uses a scaleX transform (cheap to
// animate) driven by a rAF-throttled scroll listener.

import { useEffect, useRef } from "react";

export default function ScrollProgress() {
  const ref = useRef(null);

  useEffect(() => {
    const bar = ref.current;
    if (!bar) return;
    let ticking = false;

    const update = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const ratio = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      bar.style.transform = `scaleX(${ratio})`;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="scroll-progress"
      style={{ width: "100%", transform: "scaleX(0)" }}
      aria-hidden="true"
    />
  );
}
