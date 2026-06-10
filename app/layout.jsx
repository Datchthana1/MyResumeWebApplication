import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbars";
import Footer from "../components/Footer";
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
      <body className="bg-[#050510] text-[#e8eaf2] antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
