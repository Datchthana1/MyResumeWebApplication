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
    }, 300);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-800/20 backdrop-blur-lg border-b border-gray-700/30 shadow-xl z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <div className="font-bold text-2xl text-black/40 hover:text-black hover:scale-105 transition-all duration-300 cursor-pointer">
              My Website
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <Link
              href="/"
              className="relative text-black/60 hover:text-black px-4 py-2 rounded-xl transition-all duration-300 group"
            >
              <span className="relative z-10">Home</span>
              <div className="absolute inset-0 bg-gray-500/20 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300"></div>
            </Link>
            <Link
              href="/Experience"
              className="relative text-black/60 hover:text-black px-4 py-2 rounded-xl transition-all duration-300 group"
            >
              <span className="relative z-10">About My Experience</span>
              <div className="absolute inset-0 bg-gray-500/20 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300"></div>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none relative w-8 h-8 flex flex-col justify-center items-center group"
            >
              <div className="absolute inset-0 bg-gray-500/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
              <span
                className={`block h-0.5 w-6 bg-white transform transition-all duration-300 ${
                  isOpen ? "rotate-45 translate-y-2" : "-translate-y-2"
                }`}
              ></span>
              <span
                className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
                  isOpen ? "opacity-0" : "opacity-100"
                }`}
              ></span>
              <span
                className={`block h-0.5 w-6 bg-white transform transition-all duration-300 ${
                  isOpen ? "-rotate-45 -translate-y-2" : "translate-y-2"
                }`}
              ></span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-white/20  z-40 transition-opacity duration-300"
            onClick={handleClose}
          ></div>

          {/* Mobile Menu */}
          <div
            className={`fixed top-20 left-4 right-4 md:hidden
                  bg-gray-300/25 backdrop-blur-3xl border border-gray-100/30
                  rounded-3xl shadow-xl z-50 overflow-hidden
                  ${
                    closing
                      ? "animate-[slideUp_0.3s_ease-in-out_forwards]"
                      : "animate-[slideDown_0.3s_ease-in-out_forwards]"
                  }`}
          >
            <div className="p-6 space-y-4 bg-gray-100/25 backdrop-blur-xl">
              <Link
                href="/"
                className="flex items-center justify-center py-4 text-lg text-black hover:text-gray-100 rounded-xl font-bold
                     bg-gray-300/70 backdrop-blur-sm hover:bg-gray-100/20 transition-all duration-300 transform hover:scale-105"
                onClick={handleClose}
              >
                Home
              </Link>
              <Link
                href="/Experience"
                className="flex items-center justify-center py-4 text-lg text-black hover:text-gray-100 rounded-xl font-bold
                     bg-gray-300/70 backdrop-blur-sm hover:bg-gray-100/20 transition-all duration-300 transform hover:scale-105"
                onClick={handleClose}
              >
                About My Experience
              </Link>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
