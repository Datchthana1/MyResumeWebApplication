// Single source of truth for site structure: which home-page sections exist,
// which standalone features (routes) the site offers, and contact details.
// Labels live in content.js — this file only holds ids, hrefs and data that
// doesn't change between languages.

// In-page anchors on the home page, in scroll order. `id` matches the
// <section id> and the key in t.nav. Only these appear in the navbar.
export const NAV_SECTIONS = ["about", "skills", "experience", "education", "contact"];

// Every section the navbar's scroll-spy should track (includes ones that are
// not linked directly, so the highlight clears when you pass them).
export const SPY_SECTIONS = ["home", ...NAV_SECTIONS, "monitor"];

// Standalone features. `key` matches t.explore.items[key]; `navKey` is the
// t.ui label used for the compact navbar link.
export const FEATURES = [
  { key: "chat", href: "/chat", navKey: "askAi", icon: "spark" },
  { key: "monitor", href: "/monitor", navKey: "liveMonitor", icon: "pulse" },
  { key: "experience", href: "/Experience", navKey: null, icon: "book" },
];

export const CONTACT = {
  emailFormal: "dechthanaar@gmail.com",
  emailPersonal: "Kaiza941@gmail.com",
};
