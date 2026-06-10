// components/Footer.jsx
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/10 bg-[#050510]/80 backdrop-blur-lg">
      <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-sm text-white/55">
          &copy; {currentYear}{" "}
          <span className="text-white/80 font-medium">Dechthana Arunchaiya</span>
        </p>
        <p className="text-xs font-mono text-white/40">
          Built with Next.js &amp; Tailwind CSS
        </p>
      </div>
    </footer>
  );
}
