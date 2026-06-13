"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useLang } from "@/components/LanguageProvider";
import LangToggle from "@/components/LangToggle";

const SECTIONS = ["home", "about", "skills", "experience", "education", "contact"];

export default function Navbar() {
  const { t } = useLang();
  const [isOpen, setIsOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  const links = SECTIONS.map((id) => ({ id, label: t.nav[id] }));

  // Solidify navbar after scrolling a bit
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section currently in view
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
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/75 backdrop-blur-xl border-b border-black/8 shadow-[0_1px_20px_-12px_rgba(0,0,0,0.25)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/#home" className="shrink-0 group">
            <span className="font-bold text-lg sm:text-xl tracking-tight text-neutral-800 group-hover:text-neutral-950 transition-colors">
              Dechthana
              <span className="text-neutral-400">.</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.id}
                href={`/#${link.id}`}
                className={`relative px-4 py-2 text-sm rounded-full transition-colors duration-300 ${
                  active === link.id
                    ? "text-neutral-950"
                    : "text-neutral-500 hover:text-neutral-950"
                }`}
              >
                <span className="relative z-10">{link.label}</span>
                {active === link.id && (
                  <span className="absolute inset-0 rounded-full bg-black/5" />
                )}
              </Link>
            ))}
            <LangToggle className="ml-2" />
          </div>

          {/* Mobile: toggle + menu button */}
          <div className="md:hidden flex items-center gap-2">
            <LangToggle />
            <button
              onClick={handleToggle}
              aria-label="Toggle menu"
              className="relative w-9 h-9 flex flex-col justify-center items-center"
            >
              <span
                className={`block h-0.5 w-6 bg-neutral-800 rounded-full transition-all duration-300 ${
                  isOpen ? "rotate-45 translate-y-0.75" : "-translate-y-1"
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-neutral-800 rounded-full transition-all duration-300 my-1 ${
                  isOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-neutral-800 rounded-full transition-all duration-300 ${
                  isOpen ? "-rotate-45 -translate-y-1.75" : "translate-y-1"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <>
          <div
            className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-40 ${
              closing ? "fade-out" : "fade-in"
            }`}
            onClick={handleClose}
          />
          <div className="mobile-menu-container">
            <div
              className={`card rounded-3xl p-4 space-y-2 shadow-2xl ${
                closing ? "slide-up" : "slide-down"
              }`}
            >
              {links.map((link) => (
                <Link
                  key={link.id}
                  href={`/#${link.id}`}
                  onClick={handleClose}
                  className={`flex items-center justify-center py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                    active === link.id
                      ? "bg-black/5 text-neutral-950"
                      : "text-neutral-600 hover:bg-black/5 hover:text-neutral-950"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
