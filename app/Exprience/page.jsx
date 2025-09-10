"use client";
import Image from "next/image";
import CompetitionContest from "@/assets/CompetitionContest.jpg";
import ProcedureOfDemostration from "@/assets/ProcedureOfDemostration.webp";
import VibeInContest from "@/assets/VibeInContest.jpg";

const Page = () => {
  let Experience = {
    "Data Scientist": {
      description:
        "ผมได้ทำโปรเจ็คจบที่เกี่ยวกับการใช้ Machine Learning สำหรับการทำนายความเจ็บปวดจากสัญญาณชีวภาพ (Physiological Signal) ได้แก่ อัตราการเต้นของหัวใจ (HeartRate:HR), ความต้านไฟฟ้าที่ผิวหนัง (Electrodermal Activity:EDA), อัตราการแปรผันของอัตราการเต้นของหัวใจ (Heart Rate Variability:HRV), และอุณหภูมิที่ผิวหนัง (Skin Temerature:ST) โดยใช้เทคนิคต่างๆ เช่น Decision Tree, Random Forest, Gradient Boosting, XGBoost, LightGBM และ CatBoost เพื่อสร้างโมเดลที่มีประสิทธิภาพสูงสุดในการทำนายความเจ็บปวด ซึ่งโมเดลสามารถทำนายระดับความเจ็บปวดได้ที่ 83.2% โดยใช้ XGBoosting ผลลัพธ์ดังกล่าวเป็นที่น่าพอใจและสามารถนำไปประยุกต์ใช้ในงานวิจัยทางการแพทย์ได้อย่างมีประสิทธิภาพ",
      Tools: [
        "pandas",
        "numpy",
        "scikit-learn",
        "xgboost",
        "lightgbm",
        "catboost",
        "matplotlib",
        "seaborn",
        "pytorch",
      ],
      link: {
        INewGen:
          "https://www.wu.ac.th/index.php/th/news/25143/index.html?utm_source=chatgpt.com",
        Medium:
          "https://medium.com/@kaiza941/%E0%B8%AD%E0%B8%B8%E0%B8%9B%E0%B8%81%E0%B8%A3%E0%B8%93%E0%B9%8C%E0%B8%A7%E0%B8%B1%E0%B8%94%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B9%80%E0%B8%88%E0%B9%87%E0%B8%9A%E0%B8%9B%E0%B8%A7%E0%B8%94-728d043f6af1",
      },
      picture: [VibeInContest, ProcedureOfDemostration, CompetitionContest],
    },
    "Data Engineer": {
      description:
        "ผลงานผมได้ฝึกงานกับบริษัท Greenline Synergy Co., Ltd. ในตำแหน่ง Data Engineer โดยมีหน้าที่หลักในการพัฒนาระบบประมวลผลทางการเงิน และระบบประมวลผลข้อมูลขนาดใหญ่ให้กับโรงพยาบาล เพื่อจัดการข้อมูลขนาดใหญ่จากแหล่งต่างๆ ให้เป็นระบบและพร้อมใช้งานสำหรับการวิเคราะห์ข้อมูล นอกจากนี้ ผมยังมีส่วนร่วมในการตรวจสอบและยืนยันความถูกต้องของข้อมูล (Data Validation) เพื่อให้มั่นใจว่าข้อมูลที่นำมาใช้มีคุณภาพสูง และได้พัฒนาระบบแชทบอทสำหรับช่วยเหลือทีมงานทางการแพทย์ในการทำงานด้านการเข้ารหัสข้อมูลทางการแพทย์ (Medical Coding) จาก Google Cloud Platform ซึ่งช่วยเพิ่มประสิทธิภาพในการทำงานและลดข้อผิดพลาดในการป้อนข้อมูล",
      Tools: ["SQL", "Google Cloud Platform", "DataForm", "VertexAI"],
    },
  };

  return (
    <div className="font-sans min-h-screen bg-gray-100 text-gray-900 px-5 pt-5 space-y-6">
      {Object.entries(Experience).map(([title, details], index) => (
        <div
          key={index}
          className="bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-4"
        >
          {/* ชื่อ Position */}
          <h2 className="text-xl font-bold text-blue-600 text-center md:text-left">
            {title}
          </h2>

          {/* รูปภาพ */}
          {details.picture && (
            <div className="flex flex-col md:flex-row gap-4">
              {details.picture.map((pic, index) => (
                <Image
                  key={index}
                  src={pic}
                  height={300}
                  className="rounded-2xl mb-4"
                  alt={`picture-${index}`}
                />
              ))}
            </div>
          )}

          {/* คำอธิบาย */}
          <p className="text-gray-700">{details.description}</p>

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

          {/* Link */}
          {details.link && (
            <div className="">
              <h3 className="font-semibold mt-2">Links:</h3>
              <ul className="list-disc list-inside text-blue-500 text-left flex flex-col md:flex-row flex-wrap gap-5">
                {Object.entries(details.link).map(([label, url], index) => (
                  <li key={index}>
                    <a href={url} target="_blank" rel="noopener noreferrer">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Page;
