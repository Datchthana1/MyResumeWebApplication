"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { content } from "@/content/content";

const STORAGE_KEY = "lang";
const DEFAULT_LANG = "en";

const LanguageContext = createContext({
  lang: DEFAULT_LANG,
  t: content[DEFAULT_LANG],
  setLang: () => {},
  toggleLang: () => {},
});

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(DEFAULT_LANG);

  // Restore the saved language once on the client.
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "th") setLang(saved);
  }, []);

  // Persist + keep <html lang> in sync whenever the language changes.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const toggleLang = () => setLang((l) => (l === "en" ? "th" : "en"));

  const value = { lang, t: content[lang], setLang, toggleLang };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
