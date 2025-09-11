"use client";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [closing, setClosing] = useState(false);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setClosing(false);
    }, 300); // ระยะเวลาให้ตรงกับ duration ของ fade-out
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-800 text-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 font-bold text-lg">My Website</div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="block hover:text-blue-300">
              Home
            </Link>
            <Link href="/Exprience" className="block hover:text-blue-300">
              About My Exprience
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none relative w-8 h-6 flex flex-col justify-between"
            >
              {/* Hamburger/X Lines */}
              <span
                className={`block h-0.5 w-full bg-white transform transition-all duration-300 ${
                  isOpen ? "rotate-45 translate-y-2.5" : ""
                }`}
              ></span>
              <span
                className={`block h-0.5 w-full bg-white transition-all duration-300 ${
                  isOpen ? "opacity-0" : ""
                }`}
              ></span>
              <span
                className={`block h-0.5 w-full bg-white transform transition-all duration-300 ${
                  isOpen ? "-rotate-45 -translate-y-2.5" : ""
                }`}
              ></span>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <>
          {/* Overlay คลิกปิด */}
          <div className="fixed inset-0 z-40" onClick={handleClose}></div>

          {/* Mobile Menu */}
          <div
            className={`fixed top-16 left-0 w-full md:hidden bg-gray-800 px-4 pt-2 pb-4 space-y-2 z-50 rounded-b-2xl ${
              closing ? "animate-fadeOut-Navbar" : "animate-fadeInUp-Navbar"
            }`}
          >
            <Link
              href="/"
              className="block hover:text-blue-300"
              onClick={handleClose}
            >
              Home
            </Link>
            <Link
              href="/Exprience"
              className="block hover:text-blue-300"
              onClick={handleClose}
            >
              About My Exprience
            </Link>
          </div>
        </>
      )}
    </nav>
  );
}
