import Navbar from "@/components/Navbars";
import Footer from "../components/Footer";
import "./globals.css";

export const metadata = {
  title: "My Resume Web",
  icons: {
    icon: [
      { url: "/profile.png", sizes: "32x32" },
      { url: "/profile.png", sizes: "16x16" },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="pt-16 bg-white">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
