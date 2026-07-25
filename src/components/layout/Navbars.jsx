"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useLang } from "@/providers/LanguageProvider";
import LangToggle from "@/components/layout/LangToggle";
import { SapienMark } from "@/components/ui/SapienMark";

const SECTIONS = ["home", "about", "skills", "experience", "monitor", "education", "contact"];

export default function Navbar() {
  const { t } = useLang();
  const [isOpen, setIsOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  const links = SECTIONS.map((id) => ({ id, label: t.nav[id] }));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = SECTIONS.map((id) => document.getElementById(id)).filter(
      Boolean
    );
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setClosing(false);
    }, 250);
  };

  const handleToggle = () => (isOpen ? handleClose() : setIsOpen(true));

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
            {/* Logo — Sapien mark + wordmark */}
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

            {/* Desktop Menu */}
            <div className="hidden items-center gap-1 md:flex">
              {links.map((link) => (
                <Link
                  key={link.id}
                  href={`/#${link.id}`}
                  className={`relative rounded-full px-4 py-2 text-sm transition-colors duration-300 ${
                    active === link.id
                      ? "text-ink"
                      : "text-ink-3 hover:text-ink"
                  }`}
                >
                  <span className="relative z-10">{link.label}</span>
                  {active === link.id && (
                    <span className="absolute inset-0 rounded-full bg-ink/[0.06]" />
                  )}
                </Link>
              ))}
              <Link
                href="/chat"
                className="ml-1 inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-sm text-paper transition-colors hover:bg-black"
              >
                <span aria-hidden>✦</span>
                {t.ui.askAi}
              </Link>
              <LangToggle className="ml-2" />
            </div>

            {/* Mobile: toggle + menu button */}
            <div className="flex items-center gap-2 md:hidden">
              <LangToggle />
              <button
                onClick={handleToggle}
                aria-label="Toggle menu"
                className="relative flex h-9 w-9 flex-col items-center justify-center"
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

      {/* Mobile Menu */}
      {isOpen && (
        <>
          <div
            className={`fixed inset-0 z-40 bg-ink/20 backdrop-blur-sm ${
              closing ? "fade-out" : "fade-in"
            }`}
            onClick={handleClose}
          />
          <div className="mobile-menu-container">
            <div
              className={`card space-y-2 rounded-3xl p-4 shadow-2xl ${
                closing ? "slide-up" : "slide-down"
              }`}
            >
              {links.map((link) => (
                <Link
                  key={link.id}
                  href={`/#${link.id}`}
                  onClick={handleClose}
                  className={`flex items-center justify-center rounded-xl py-3 text-base font-medium transition-all duration-300 ${
                    active === link.id
                      ? "bg-ink/[0.06] text-ink"
                      : "text-ink-2 hover:bg-ink/[0.05] hover:text-ink"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/chat"
                onClick={handleClose}
                className="flex items-center justify-center gap-1.5 rounded-xl bg-ink py-3 text-base font-medium text-paper transition-colors hover:bg-black"
              >
                <span aria-hidden>✦</span>
                {t.ui.askAi}
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
}
