import Navbar from "@/components/Navbars";
import Footer from "../components/Footer";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="pt-15">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
