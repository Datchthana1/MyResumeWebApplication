import Image from "next/image";
import Dechthana from "@/assets/Dechthana.jpg";

export default function Portfolio() {
  let position = [
    "Data Scientist/Engineer",
    "Web Developer",
    "Chatbot Developer",
  ];
  return (
    <div className="font-sans min-h-screen bg-gray-100 text-gray-900 pt-5 space-y-6">
      {/* Container */}
      <div className="max-w-5xl mx-auto px-6 py-6 animate-fadeInUp">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="flex flex-col  items-center min-w-fit md:items-center w-full md:w-1/3">
            <Image
              src={Dechthana}
              alt="Profile"
              width={150}
              height={150}
              className="rounded-full mb-4"
            />
            <div className="flex flex-col items-center md:items-center text-center md:text-center">
              {/* ชื่อ */}
              <h1 className="text-3xl font-bold">
                Dechthana <span className="block md:inline">Arunchaiya</span>
              </h1>

              {/* ตำแหน่ง */}
              <ul className="list-disc list-inside mt-2 text-gray-600 text-left">
                {position.map((pos, index) => (
                  <li key={index}>{pos}</li>
                ))}
              </ul>
            </div>

            <div className="flex gap-4 mt-4">
              <a
                href="https://www.facebook.com/datchtana.arunchaiya/"
                className="text-blue-500 hover:underline"
              >
                Facebook
              </a>
              <a
                href="https://github.com/Datchthana1"
                className="text-blue-500 hover:underline"
              >
                GitHub
              </a>
            </div>
          </div>

          {/* About */}
          <div className="w-full md:w-2/3">
            <h2 className="text-2xl font-semibold mb-2">About Me</h2>
            <p className="text-gray-700 leading-relaxed">
              I am student at Walailak University majoring in Innovation of
              Medical Informatics. I have a strong passion for data science,
              data engineering, and web development. I enjoy learning new
              technologies and applying them to solve real-world problems. My
              goal is to become a proficient data scientist, be researcher and
              contribute to impactful projects in the future.
            </p>
          </div>
        </div>

        {/* Skills & Experience Section */}
        <div className="grid md:grid-cols-[1fr_2fr] gap-8 mt-12">
          {/* Skills */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">Programming Languages</h2>
            <ul className="list-none text-justify justify-around list-inside space-y-2 text-gray-700 flex flex-row ">
              <li>Python </li>
              <li>JavaScript</li>
              <li>SQL</li>
            </ul>
            <h2 className="text-xl font-bold mb-4 pt-5">Language I Speak</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>English (B1-Intermediate)</li>
              <li>Thai (Native)</li>
            </ul>
          </div>

          {/* Experience */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">Experience</h2>
            <ul className="space-y-3 text-gray-700">
              <li>
                <span className="font-semibold">Web Developer</span> — Working
                on personal projects to build skills and gain experience.
                Currently learning, no professional experience yet.
              </li>
              <li>
                <span className="font-semibold">Data Scientist</span> —
                Completed a thesis project focused on Machine Learning and Data
                Analysis by using Phyiological Signal for predicting pain. More
                details can be found in the "About My Experience" section.
              </li>
              <li>
                <span className="font-semibold">Data Engineer</span> —
                Internship at Greenline Synergy Co., Ltd., responsible for ETL
                processes, Validated data, and developed chat bot for medical
                coder
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mt-12">
          <h2 className="text-xl font-bold mb-4">Contact</h2>
          <p className="text-gray-700">
            Email (Formal):{" "}
            <a
              href="mailto:Dechthana.ar@mail.wu.ac.th"
              className="text-blue-500 hover:underline"
            >
              Dechthana.ar@mail.wu.ac.th
            </a>
          </p>
          <p className="text-gray-700">
            Email (Informal):{" "}
            <a
              href="mailto:Kaiza941@gmail.com"
              className="text-blue-500 hover:underline"
            >
              Kaiza941@gmail.com
            </a>
          </p>
          <p className="text-gray-700">Location: Hatyai, Thailand</p>
        </div>
      </div>
    </div>
  );
}
