"use client";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

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
              className="focus:outline-none"
            >
              {isOpen ? (
                <span className="text-2xl">&#10005;</span> // X icon
              ) : (
                <span className="text-2xl">&#9776;</span> // Hamburger
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <>
          {/* Overlay คลิกปิด */}
          <div
            className="fixed inset-0 z-40" // ครอบเต็มหน้าจอ
            onClick={() => setIsOpen(false)}
          ></div>

          {/* Mobile Menu */}
          <div className="fixed top-16 left-0 w-full md:hidden bg-gray-800 px-4 pt-2 pb-4 space-y-2 z-50">
            <Link
              href="/"
              className="block hover:text-blue-300"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/Exprience"
              className="block hover:text-blue-300"
              onClick={() => setIsOpen(false)}
            >
              About My Exprience
            </Link>
          </div>
        </>
      )}
    </nav>
  );
}
