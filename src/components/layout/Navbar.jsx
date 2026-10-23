"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLang } from "@/providers/LanguageProvider";
import LangToggle from "@/components/layout/LangToggle";
import Icon from "@/components/ui/Icon";
import { SapienMark } from "@/components/ui/SapienMark";
import { FEATURES, NAV_SECTIONS, SPY_SECTIONS } from "@/config/site";

// Matches the .fade-out / .slide-up animation length in globals.css.
const CLOSE_MS = 250;

export default function Navbar() {
  const { t } = useLang();
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [isOpen, setIsOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  // Track the last pathname so the mobile sheet closes on route change
  // without an effect (React's "adjust state while rendering" pattern).
  const [prevPath, setPrevPath] = useState(pathname);

  const buttonRef = useRef(null);
  const timerRef = useRef(null);

  const sections = NAV_SECTIONS.map((id) => ({ id, label: t.nav[id] }));
  const chatFeature = FEATURES.find((f) => f.key === "chat");
  const monitorFeature = FEATURES.find((f) => f.key === "monitor");

  if (pathname !== prevPath) {
    setPrevPath(pathname);
    if (isOpen) {
      setIsOpen(false);
      setClosing(false);
    }
  }

  const closeMenu = useCallback(() => {
    setClosing(true);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setIsOpen(false);
      setClosing(false);
    }, CLOSE_MS);
  }, []);

  const openMenu = () => {
    clearTimeout(timerRef.current);
    setClosing(false);
    setIsOpen(true);
  };

  const toggleMenu = () => (isOpen && !closing ? closeMenu() : openMenu());

  useEffect(() => () => clearTimeout(timerRef.current), []);

  // Scrolled-state background for the bar.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: only meaningful on the home page, where the sections live.
  useEffect(() => {
    if (!isHome) return;
    const nodes = SPY_SECTIONS.map((id) => document.getElementById(id)).filter(
      Boolean
    );
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [isHome]);

  // Escape closes the sheet and returns focus to the hamburger button.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      closeMenu();
      buttonRef.current?.focus();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, closeMenu]);

  // Lock page scroll while the mobile sheet is open.
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  const isSectionActive = (id) => isHome && active === id;
  const isFeatureActive = (f) => pathname.startsWith(f.href);

  return (
    <>
      <nav
        className={`fixed left-0 top-0 z-50 w-full transition-all duration-500 ${
          scrolled
            ? "border-b border-line bg-paper/80 backdrop-blur-xl shadow-[0_1px_24px_-14px_rgba(23,20,14,0.4)]"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo: Sapien mark + wordmark */}
            <Link
              href="/#home"
              className="group inline-flex shrink-0 items-center gap-2"
            >
              <SapienMark
                size={26}
                className="text-ink transition-transform duration-300 group-hover:-translate-y-0.5"
              />
              <span className="text-lg font-bold tracking-tight text-ink-2 transition-colors group-hover:text-ink sm:text-xl">
                Dechthana
                <span className="text-spark">.</span>
              </span>
            </Link>

            {/* Desktop: section anchors, then features */}
            <div className="hidden items-center gap-1 md:flex">
              {sections.map((link) => (
                <Link
                  key={link.id}
                  href={`/#${link.id}`}
                  aria-current={isSectionActive(link.id) ? "true" : undefined}
                  className={`relative rounded-full px-4 py-2 text-sm transition-colors duration-300 ${
                    isSectionActive(link.id)
                      ? "text-ink"
                      : "text-ink-3 hover:text-ink"
                  }`}
                >
                  <span className="relative z-10">{link.label}</span>
                  {isSectionActive(link.id) && (
                    <span className="absolute inset-0 rounded-full bg-ink/[0.06]" />
                  )}
                </Link>
              ))}

              <span aria-hidden className="mx-2 h-5 w-px bg-line" />

              {monitorFeature && (
                <Link
                  href={monitorFeature.href}
                  aria-current={isFeatureActive(monitorFeature) ? "page" : undefined}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm transition-colors duration-300 ${
                    isFeatureActive(monitorFeature)
                      ? "text-ink"
                      : "text-ink-3 hover:text-ink"
                  }`}
                >
                  <Icon name={monitorFeature.icon} size={15} />
                  {t.ui[monitorFeature.navKey]}
                </Link>
              )}

              {chatFeature && (
                <Link
                  href={chatFeature.href}
                  aria-current={isFeatureActive(chatFeature) ? "page" : undefined}
                  className="ml-1 inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-sm text-paper transition-colors hover:bg-black"
                >
                  <Icon name={chatFeature.icon} size={14} />
                  {t.ui[chatFeature.navKey]}
                </Link>
              )}

              <LangToggle className="ml-2" />
            </div>

            {/* Mobile: language + menu button */}
            <div className="flex items-center gap-2 md:hidden">
              <LangToggle />
              <button
                ref={buttonRef}
                type="button"
                onClick={toggleMenu}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
                aria-label={isOpen ? t.ui.closeMenu : t.ui.openMenu}
                className="relative flex h-9 w-9 flex-col items-center justify-center rounded-full"
              >
                <span
                  className={`block h-0.5 w-6 rounded-full bg-ink transition-all duration-300 ${
                    isOpen ? "translate-y-0.75 rotate-45" : "-translate-y-1"
                  }`}
                />
                <span
                  className={`my-1 block h-0.5 w-6 rounded-full bg-ink transition-all duration-300 ${
                    isOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`block h-0.5 w-6 rounded-full bg-ink transition-all duration-300 ${
                    isOpen ? "-translate-y-1.75 -rotate-45" : "translate-y-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile sheet */}
      {isOpen && (
        <>
          <div
            className={`fixed inset-0 z-40 bg-ink/20 backdrop-blur-sm ${
              closing ? "fade-out" : "fade-in"
            }`}
            onClick={closeMenu}
            aria-hidden
          />
          <div className="mobile-menu-container">
            <div
              id="mobile-menu"
              className={`card max-h-[75vh] space-y-5 overflow-y-auto rounded-3xl p-4 shadow-2xl ${
                closing ? "slide-up" : "slide-down"
              }`}
            >
              <div>
                <p className="kicker px-3 pb-2">{t.ui.onThisPage}</p>
                <ul className="space-y-1">
                  {sections.map((link) => (
                    <li key={link.id}>
                      <Link
                        href={`/#${link.id}`}
                        onClick={closeMenu}
                        aria-current={isSectionActive(link.id) ? "true" : undefined}
                        className={`flex items-center rounded-xl px-3 py-3 text-base font-medium transition-colors duration-300 ${
                          isSectionActive(link.id)
                            ? "bg-ink/[0.06] text-ink"
                            : "text-ink-2 hover:bg-ink/[0.05] hover:text-ink"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="kicker px-3 pb-2">{t.ui.explore}</p>
                <ul className="space-y-1">
                  {FEATURES.map((f) => (
                    <li key={f.key}>
                      <Link
                        href={f.href}
                        onClick={closeMenu}
                        aria-current={isFeatureActive(f) ? "page" : undefined}
                        className={`flex items-center gap-3 rounded-xl px-3 py-3 text-base font-medium transition-colors duration-300 ${
                          isFeatureActive(f)
                            ? "bg-ink/[0.06] text-ink"
                            : "text-ink-2 hover:bg-ink/[0.05] hover:text-ink"
                        }`}
                      >
                        <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-surface-2 text-ink">
                          <Icon name={f.icon} size={16} />
                        </span>
                        {t.explore.items[f.key].title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
