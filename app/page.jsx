import Image from "next/image";
import Dechthana from "@/assets/Dechthana.jpg";

export default function Portfolio() {
  const positions = [
    "Data Scientist/Engineer",
    "Web Developer",
    "Chatbot Developer",
  ];

  return (
    <div className="font-sans min-h-screen bg-gray-100 text-gray-900 pb-12">
      <div className="max-w-5xl mx-auto px-6 py-6 animate-fadeInUp">
        <div className="grid gap-8 mt-6">
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Profile Section */}
            <div className="flex flex-col items-center w-full md:w-1/3">
              <Image
                src={Dechthana}
                alt="Profile"
                width={150}
                height={150}
                className="rounded-full mb-4"
              />
              <h1 className="text-3xl font-bold text-center">
                Dechthana <span className="block md:inline">Arunchaiya</span>
              </h1>

              <ul className="list-disc list-inside mt-2 text-gray-600 text-left">
                {positions.map((pos, idx) => (
                  <li key={idx}>{pos}</li>
                ))}
              </ul>

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

            {/* About Section */}
            <div className="w-full md:w-2/3">
              <h2 className="text-2xl font-semibold mb-2">About Me</h2>
              <p className="text-gray-700 leading-relaxed">
                I am a student at Walailak University majoring in Innovation of
                Medical Informatics. I have a strong passion for data science,
                data engineering, and web development. I enjoy learning new
                technologies and applying them to solve real-world problems. My
                goal is to become a proficient data scientist, be a researcher,
                and contribute to impactful projects in the future.
              </p>
            </div>
          </div>

          {/* Experience Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">Experience</h2>
            <ul className="space-y-3 text-gray-700">
              <li>
                <span className="font-semibold">Web Developer</span> — Working
                on personal projects to build skills and gain experience.
              </li>
              <li>
                <span className="font-semibold">Data Scientist</span> —
                Completed a thesis project focused on Machine Learning and Data
                Analysis using Physiological Signals for predicting pain.
              </li>
              <li>
                <span className="font-semibold">Data Engineer</span> —
                Internship at Greenline Synergy Co., Ltd., responsible for ETL
                processes, data validation, and developing chatbot for medical
                coders.
              </li>
            </ul>
          </div>

          <div className="flex flex-col justify-evenly gap-6 md:flex-row">
            {/* Skills Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6 w-full">
              <h2 className="text-xl font-bold text-center mb-4">
                Programming Languages
              </h2>
              <div className="flex gap-6 flex-wrap text-gray-700 justify-center">
                <span>Python</span>
                <span>JavaScript</span>
                <span>SQL</span>
              </div>
            </div>

            {/* Skills Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6 w-full">
              <h2 className="text-xl font-bold text-center mb-4">
                Languages I Speak
              </h2>
              <div className="flex gap-6 flex-wrap text-gray-700 justify-center">
                <span>English (B1-Intermediate)</span>
                <span>Thai (Native)</span>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
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
    </div>
  );
}
