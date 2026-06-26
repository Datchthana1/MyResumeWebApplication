import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import Navbar from "@/components/Navbars";
import Footer from "../components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import { LanguageProvider } from "@/components/LanguageProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Display face — a technical grotesque used for the hero name and headings.
const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata = {
  title: "Dechthana Arunchaiya — Portfolio",
  description:
    "Portfolio of Dechthana Arunchaiya — Data Scientist, Data Engineer & Web Developer.",
  // Tab icon comes from app/icon.svg (the Sapien mark — a striding Homo
  // sapiens, for curiosity that never stops). Next.js picks it up by
  // convention, so no explicit `icons` override is needed here.
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable}`}
    >
      <body className="bg-white text-[#0a0a0a] antialiased">
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
