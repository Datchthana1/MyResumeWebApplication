// app/components/Footer.jsx
"use client";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="
        fixed bottom-0 left-0 w-full
        bg-gradient-to-br from-white/20 via-white/10 to-white/5
        backdrop-blur-lg backdrop-saturate-150
        border-t border-white/20
        shadow-[0_-4px_20px_rgba(0,0,0,0.25)]
        z-50
        text-center py-4
      "
      style={{
        backdropFilter: "blur(5px)",
        background: "rgba(255, 255, 255, 0.1)",
      }}
    >
      <p className="text-sm font-medium tracking-wide text-black/80 hover:text-black transition-colors duration-300">
        © {currentYear} Dechthana
      </p>
    </footer>
  );
}
