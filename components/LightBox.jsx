"use client";
import Image from "next/image";

export default function Lightbox({ lightbox, closing, closeLightbox }) {
  if (!lightbox.isOpen) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 
        bg-black/30 backdrop-blur-sm 
        ${closing ? "animate-fadeOutOverlay" : "animate-fadeInOverlay"}`}
      onClick={closeLightbox}
    >
      <div
        className={`relative max-w-3xl max-h-[90vh] 
          ${closing ? "animate-fadeOut" : "animate-fadeInUp"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={lightbox.src}
          alt="Expanded image"
          width={800}
          height={600}
          className="rounded-3xl object-contain"
        />
        <button
          className="absolute top-3 right-3 w-10 h-10 flex items-center justify-center rounded-full glass text-slate-800 text-2xl leading-none cursor-pointer hover:scale-110 transition-transform"
          onClick={closeLightbox}
          aria-label="Close"
        >
          &times;
        </button>
      </div>
    </div>
  );
}
