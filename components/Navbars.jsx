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

  const handleToggle = () => {
    if (isOpen) {
      handleClose();
    } else {
      setIsOpen(true);
    }
  };

  return (
    <>
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
                onClick={handleToggle}
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
              className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${
                closing ? "fade-out" : "fade-in"
              }`}
              onClick={handleClose}
            ></div>

            {/* Mobile Menu Container */}
            <div className="mobile-menu-container">
              <div
                className={`p-6 space-y-4 mt-5
                bg-gradient-to-br from-white/20 via-white/10 to-white/5
                backdrop-blur-3xl backdrop-saturate-150
                border border-white/20 rounded-3xl shadow-2xl
                before:absolute before:inset-0 before:rounded-3xl
                before:bg-gradient-to-br before:from-white/30 before:via-transparent before:to-white/10
                before:backdrop-blur-xl before:-z-10
                relative overflow-hidden ${
                  closing ? "slide-up" : "slide-down"
                }`}
                style={{
                  backdropFilter: "blur(40px) saturate(180%)",
                  background: "rgba(255, 255, 255, 0.1)",
                  boxShadow: `
                    0 8px 32px rgba(31, 38, 135, 0.37),
                    inset 0 1px 0 rgba(255, 255, 255, 0.3),
                    inset 0 -1px 0 rgba(255, 255, 255, 0.1)
                  `,
                }}
              >
                <Link
                  href="/"
                  className={`flex items-center  justify-center py-4 text-lg text-black/90 font-bold
                  bg-gradient-to-r from-white/15 via-white/10 to-white/15
                  backdrop-blur-2xl backdrop-saturate-200
                  border border-white/30 rounded-xl shadow-lg
                  hover:bg-gradient-to-r hover:from-white/25 hover:via-white/20 hover:to-white/25
                  hover:text-white hover:shadow-xl hover:border-white/40
                  transition-all duration-500 transform hover:scale-105 hover:-translate-y-1
                  relative overflow-hidden ${
                    closing ? "slide-up" : "slide-down"
                  }
                  before:absolute before:inset-0 before:bg-gradient-to-r 
                  before:from-transparent before:via-white/10 before:to-transparent
                  before:translate-x-[-100%] hover:before:translate-x-[100%]
                  before:transition-transform before:duration-700`}
                  onClick={handleClose}
                  style={{
                    backdropFilter: "blur(20px) saturate(180%)",
                    textShadow: "0 1px 3px rgba(0,0,0,0.3)",
                    animationDelay: closing ? "0s" : "0.1s",
                  }}
                >
                  Home
                </Link>
                <Link
                  href="/Experience"
                  className={`flex items-center justify-center py-4 text-lg text-black/90 font-bold
                  bg-gradient-to-r from-white/15 via-white/10 to-white/15
                  backdrop-blur-2xl backdrop-saturate-200
                  border border-white/30 rounded-xl shadow-lg
                  hover:bg-gradient-to-r hover:from-white/25 hover:via-white/20 hover:to-white/25
                  hover:text-white hover:shadow-xl hover:border-white/40
                  transition-all duration-500 transform hover:scale-105 hover:-translate-y-1
                  relative overflow-hidden ${
                    closing ? "slide-up" : "slide-down"
                  }
                  before:absolute before:inset-0 before:bg-gradient-to-r 
                  before:from-transparent before:via-white/10 before:to-transparent
                  before:translate-x-[-100%] hover:before:translate-x-[100%]
                  before:transition-transform before:duration-700`}
                  onClick={handleClose}
                  style={{
                    backdropFilter: "blur(20px) saturate(180%)",
                    textShadow: "0 1px 3px rgba(0,0,0,0.3)",
                    animationDelay: closing ? "0s" : "0.2s",
                  }}
                >
                  About My Experience
                </Link>
              </div>
            </div>
          </>
        )}
      </nav>
    </>
  );
}
