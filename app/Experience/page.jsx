"use client";
import Image from "next/image";
import CompetitionContest from "@/assets/CompetitionContest.jpg";
import ProcedureOfDemostration from "@/assets/ProcedureOfDemostration.webp";
import VibeInContest from "@/assets/VibeInContest.jpg";
import { useEffect, useState } from "react";
import ExperienceList from "@/components/ExperienceList";
import Lightbox from "@/components/LightBox";
import GLS_Logo2 from "@/assets/GLS_Logo2.jpg";
import GLS_Vibe from "@/assets/GLS_Vibe.jpg";

const Page = () => {
  const [lightbox, setLightbox] = useState({ isOpen: false, src: null });
  const [closing, setClosing] = useState(false);

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
        I_NewGen:
          "https://www.wu.ac.th/index.php/th/news/25143/index.html?utm_source=chatgpt.com",
        Medium:
          "https://medium.com/@kaiza941/%E0%B8%AD%E0%B8%B8%E0%B8%9B%E0%B8%81%E0%B8%A3%E0%B8%93%E0%B9%8C%E0%B8%A7%E0%B8%B1%E0%B8%94%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B9%80%E0%B8%88%E0%B9%87%E0%B8%9A%E0%B8%9B%E0%B8%A7%E0%B8%94-728d043f6af1",
      },
      picture: [VibeInContest, CompetitionContest, ProcedureOfDemostration],
    },
    "Data Engineer": {
      description:
        "ผลงานผมได้ฝึกงานกับบริษัท Greenline Synergy Co., Ltd. ในตำแหน่ง Data Engineer โดยมีหน้าที่หลักในการพัฒนาระบบประมวลผลทางการเงิน และระบบประมวลผลข้อมูลขนาดใหญ่ให้กับโรงพยาบาล เพื่อจัดการข้อมูลขนาดใหญ่จากแหล่งต่างๆ ให้เป็นระบบและพร้อมใช้งานสำหรับการวิเคราะห์ข้อมูล นอกจากนี้ ผมยังมีส่วนร่วมในการตรวจสอบและยืนยันความถูกต้องของข้อมูล (Data Validation) เพื่อให้มั่นใจว่าข้อมูลที่นำมาใช้มีคุณภาพสูง และได้พัฒนาระบบแชทบอทสำหรับช่วยเหลือทีมงานทางการแพทย์ในการทำงานด้านการเข้ารหัสข้อมูลทางการแพทย์ (Medical Coding) จาก Google Cloud Platform ซึ่งช่วยเพิ่มประสิทธิภาพในการทำงานและลดข้อผิดพลาดในการป้อนข้อมูล",
      Tools: ["SQL", "Google Cloud Platform", "DataForm", "VertexAI"],
      picture: [GLS_Logo2, GLS_Vibe],
    },
  };

  const closeLightbox = () => {
    setClosing(true);
    setTimeout(() => {
      setLightbox({ isOpen: false, src: null });
      setClosing(false);
    }, 300);
  };

  useEffect(() => {
    if (lightbox.isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [lightbox.isOpen]);

  return (
    <div className="font-sans min-h-screen bg-gray-100 text-gray-900 px-5 pt-1 space-y-6 pb-12 min-w-sc">
      <ExperienceList
        Experience={Experience}
        setLightbox={setLightbox}
        setClosing={setClosing}
      />

      <Lightbox
        lightbox={lightbox}
        closing={closing}
        closeLightbox={closeLightbox}
      />
    </div>
  );
};

export default Page;
