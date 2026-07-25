import {
  Bricolage_Grotesque,
  IBM_Plex_Sans,
  IBM_Plex_Sans_Thai,
  IBM_Plex_Mono,
} from "next/font/google";
import Navbar from "@/components/layout/Navbars";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/layout/ScrollProgress";
import { LanguageProvider } from "@/providers/LanguageProvider";
import "./globals.css";

// Display face — a contemporary grotesque with warmth and character, used for
// the hero name and headings. Reads as modern-scientific-editorial.
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

// Body — IBM Plex Sans (+ Thai). A humanist, scientific sans that carries the
// "research lab / field notebook" register and reads cleanly at length.
const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const plexThai = IBM_Plex_Sans_Thai({
  variable: "--font-plex-thai",
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Data / specimen labels — a monospace for eyebrows, years, coordinates.
const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata = {
  title: "Dechthana Arunchaiya — Data / AI Engineer",
  description:
    "The portfolio of Dechthana Arunchaiya — a Data & AI Engineer who turns raw signal into meaning. Data engineering, machine learning, and AI systems, built with curiosity.",
  // Tab icon comes from app/icon.svg (the Sapien mark — a striding Homo
  // sapiens, for curiosity that never stops). Next.js picks it up by
  // convention, so no explicit `icons` override is needed here.
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${plexSans.variable} ${plexThai.variable} ${plexMono.variable}`}
    >
      <body className="antialiased">
        <LanguageProvider>
          <ScrollProgress />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
