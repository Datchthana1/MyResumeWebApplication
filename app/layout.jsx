import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbars";
import Footer from "../components/Footer";
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

export const metadata = {
  title: "Dechthana Arunchaiya — Portfolio",
  description:
    "Portfolio of Dechthana Arunchaiya — Data Scientist, Data Engineer & Web Developer.",
  icons: {
    icon: [
      { url: "/profile.png", sizes: "32x32" },
      { url: "/profile.png", sizes: "16x16" },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="bg-white text-[#0a0a0a] antialiased">
        <LanguageProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
