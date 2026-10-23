"use client";
import { useState } from "react";
import Image from "next/image";
import LightBox from "@/components/ui/LightBox";
import { useLang } from "@/providers/LanguageProvider";

// Photo strip for one role. Several photos sit in a uniform-height grid
// (cropped to fill); a single photo, such as a logo, is shown contained.
// Very wide images are diagrams, not photos — cropping them hides the content.
const isDiagram = (pic) => pic.width / pic.height > 1.6;

export default function Gallery({ pictures, title }) {
  const { t } = useLang();
  const [openIndex, setOpenIndex] = useState(null);

  if (!pictures?.length) return null;
  const single = pictures.length === 1;

  return (
    <>
      <ul className={single ? "max-w-md" : "grid gap-3 sm:grid-cols-2 lg:grid-cols-3"}>
        {pictures.map((pic, i) => (
          <li key={i}>
            <button
              type="button"
              onClick={() => setOpenIndex(i)}
              aria-label={`${t.ui.openImage} ${i + 1}`}
              className="group relative block w-full overflow-hidden rounded-2xl bg-surface-2 ring-1 ring-line transition-shadow hover:ring-line-strong"
            >
              {single ? (
                <span className="flex items-center justify-center p-6">
                  <Image
                    src={pic}
                    alt=""
                    className="h-auto max-h-56 w-auto max-w-full object-contain"
                  />
                </span>
              ) : (
                <span className="relative block h-44 sm:h-52">
                  <Image
                    src={pic}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 14rem, (min-width: 640px) 50vw, 100vw"
                    className={`transition-transform duration-500 group-hover:scale-[1.03] ${
                      isDiagram(pic) ? "object-contain p-2" : "object-cover"
                    }`}
                  />
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>

      {openIndex !== null && (
        <LightBox
          src={pictures[openIndex]}
          alt={`${title} photo ${openIndex + 1}`}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </>
  );
}
