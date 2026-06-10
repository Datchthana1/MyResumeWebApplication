// components/Footer.jsx
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/60 bg-white/40 backdrop-blur-xl backdrop-saturate-150">
      <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-sm text-slate-500">
          &copy; {currentYear}{" "}
          <span className="text-slate-800 font-medium">
            Dechthana Arunchaiya
          </span>
        </p>
        <p className="text-xs font-mono text-slate-400">
          Built with Next.js &amp; Tailwind CSS
        </p>
      </div>
    </footer>
  );
}
