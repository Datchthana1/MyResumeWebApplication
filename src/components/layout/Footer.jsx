// components/Footer.jsx
"use client";
import Link from "next/link";
import { useLang } from "@/providers/LanguageProvider";
import { FEATURES, NAV_SECTIONS } from "@/config/site";

export default function Footer() {
  const { t } = useLang();
  const currentYear = new Date().getFullYear();

  // Feature labels reuse the navbar wording; the Experience page has no navKey,
  // so use its page title (t.nav.experience is already the home-section link).
  const featureLabel = (f) => (f.navKey ? t.ui[f.navKey] : t.experienceDetail.title);

  return (
    <footer className="relative border-t border-line bg-surface/60 backdrop-blur-xl">
      <div className="mx-auto max-w-5xl px-6 py-8">
        {/* Row 1: quiet sitemap */}
        <nav aria-label={t.ui.explore} className="mb-6">
          <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-ink-3 sm:justify-start">
            {NAV_SECTIONS.map((id) => (
              <li key={id}>
                <Link href={`/#${id}`} className="transition-colors hover:text-ink">
                  {t.nav[id]}
                </Link>
              </li>
            ))}
            {FEATURES.map((f) => (
              <li key={f.key}>
                <Link href={f.href} className="transition-colors hover:text-ink">
                  {featureLabel(f)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Row 2: copyright + credit */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-line pt-6 sm:flex-row">
          <p className="text-sm text-ink-2">
            &copy; {currentYear}{" "}
            <span className="font-display font-medium text-ink">
              Dechthana Arunchaiya
            </span>
          </p>
          <p className="mono flex items-center gap-2 text-xs text-ink-3">
            <span className="spark-dot" />
            {t.footer.builtWith}
          </p>
        </div>
      </div>
    </footer>
  );
}
