"use client";

// SignalField — the hero's signature element.
//
// A faint, living "sensor stream": a few layered signal waves drifting left,
// like a readout on a monitoring instrument. It reacts to the cursor (the wave
// swells near the pointer), which ties the page's identity to Dechthana's
// air-quality / data-pipeline work without ever competing with the content.
//
// Pure canvas, no dependencies. Respects prefers-reduced-motion (renders one
// static frame) and pauses when the tab is hidden.

import { useEffect, useRef } from "react";

export default function SignalField({ className = "" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Pointer influence (eased toward the real cursor position).
    const pointer = { x: -9999, y: 0, active: 0 };
    const target = { x: -9999, y: 0, active: 0 };

    function resize() {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    // Three drifting waves spread top-to-bottom so they frame the name rather
    // than hide behind it: two ink-grey, one emerald signal line.
    const waves = [
      { amp: 26, len: 0.004, speed: 0.016, y: 0.28, color: "21,23,26", alpha: 0.08, lw: 1.5 },
      { amp: 30, len: 0.0034, speed: 0.012, y: 0.66, color: "14,159,110", alpha: 0.28, lw: 1.6 },
      { amp: 18, len: 0.0066, speed: 0.026, y: 0.8, color: "21,23,26", alpha: 0.06, lw: 1 },
    ];

    function drawWave(w, t) {
      const baseY = height * w.y;
      ctx.beginPath();
      for (let x = 0; x <= width; x += 6) {
        // Distance from pointer drives a local swell in amplitude.
        const dx = x - pointer.x;
        const influence =
          pointer.active * Math.exp(-(dx * dx) / 16000) * 28;
        const y =
          baseY +
          Math.sin(x * w.len + t * w.speed) * w.amp +
          Math.sin(x * w.len * 2.3 + t * w.speed * 1.7) * (w.amp * 0.35) +
          influence * Math.sin(t * 0.05 + x * 0.01);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = `rgba(${w.color},${w.alpha})`;
      ctx.lineWidth = w.lw;
      ctx.stroke();
    }

    let frame = 0;
    let raf;
    let t = 0;

    function render() {
      ctx.clearRect(0, 0, width, height);

      // Ease pointer toward target.
      pointer.x += (target.x - pointer.x) * 0.08;
      pointer.y += (target.y - pointer.y) * 0.08;
      pointer.active += (target.active - pointer.active) * 0.06;

      t += 1;
      for (const w of waves) drawWave(w, t);

      // A travelling node on the emerald line near the pointer.
      if (pointer.active > 0.02 && pointer.x > 0 && pointer.x < width) {
        const w = waves[1];
        const baseY = height * w.y;
        const y =
          baseY +
          Math.sin(pointer.x * w.len + t * w.speed) * w.amp +
          Math.sin(pointer.x * w.len * 2.3 + t * w.speed * 1.7) * (w.amp * 0.35);
        ctx.beginPath();
        ctx.arc(pointer.x, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(14,159,110,${0.6 * pointer.active})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(render);
    }

    function staticFrame() {
      ctx.clearRect(0, 0, width, height);
      for (const w of waves) drawWave(w, 120);
    }

    function onMove(e) {
      const rect = canvas.getBoundingClientRect();
      target.x = e.clientX - rect.left;
      target.y = e.clientY - rect.top;
      target.active = 1;
    }
    function onLeave() {
      target.active = 0;
    }
    function onVisibility() {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else if (!reduce) {
        raf = requestAnimationFrame(render);
      }
    }

    resize();
    window.addEventListener("resize", resize);

    if (reduce) {
      staticFrame();
    } else {
      staticFrame(); // paint an immediate first frame before the rAF loop
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerleave", onLeave);
      document.addEventListener("visibilitychange", onVisibility);
      raf = requestAnimationFrame(render);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      void frame;
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
}
