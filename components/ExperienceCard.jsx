"use client";
import Image from "next/image";

export default function ExperienceCard({
  title,
  details,
  index,
  setLightbox,
  setClosing,
}) {
  return (
    <div
      className="bg-white rounded-2xl shadow-lg p-8 mb-6 flex flex-col gap-4 animate-fadeInUp"
      style={{ animationDelay: `${index * 0.3}s` }}
    >
      <h2 className="text-xl font-bold text-black-600 text-center md:text-center">
        {title}
      </h2>

      {/* รูปภาพ */}
      {details.picture && (
        <div className="flex flex-wrap md:flex-row gap-4 justify-center items-center">
          {details.picture.map((pic, idx) => (
            <Image
              key={idx}
              src={pic}
              height={200}
              className="rounded-2xl mb-4 cursor-pointer"
              alt={`picture-${idx}`}
              onClick={() => {
                setLightbox({ isOpen: true, src: pic });
                setClosing(false);
              }}
            />
          ))}
        </div>
      )}

      {/* คำอธิบาย */}
      <div>
        <h3 className="font-semibold mt-2">Description:</h3>
        <p className="text-gray-700">{details.description}</p>
      </div>

      {/* Tools */}
      {details.Tools && (
        <div>
          <h3 className="font-semibold mt-2">Tools:</h3>
          <ul className="flex flex-row flex-wrap gap-2 text-gray-600 justify-start">
            {details.Tools.map((tool, i) => (
              <li
                key={i}
                className="list-none bg-gray-200 px-2 py-1 rounded-md w-fit"
              >
                {tool}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Links */}
      {details.link && (
        <div>
          <h3 className="font-semibold mt-2">Links:</h3>
          <ul className="list-disc list-inside text-blue-500 text-left flex flex-col md:flex-row flex-wrap gap-5">
            {Object.entries(details.link).map(([label, url], idx) => (
              <li key={idx}>
                <a href={url} target="_blank" rel="noopener noreferrer">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
