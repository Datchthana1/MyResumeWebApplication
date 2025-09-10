// app/components/Footer.jsx
"use client";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-gray-800 text-white py-4 text-center">
      &copy; {currentYear} Dechthana
    </footer>
  );
}
