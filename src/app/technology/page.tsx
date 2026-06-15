import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const PIPELINE = [
  {
    step: "1",
    title: "LSCI Video Acquisition",
    thai: "การบันทึกวิดีโอ LSCI",
    desc: "บันทึกวิดีโอจากหลอดเลือดฝอยด้วยเลเซอร์ 850nm ผ่านต้นแบบอุปกรณ์ ที่ 120 FPS ความละเอียด 200×200 px ระยะเวลา 30 วินาที",
  },
  {
    step: "2",
    title: "ROI Detection",
    thai: "การตรวจจับพื้นที่สนใจ",
    desc: "กำหนดพื้นที่สนใจ (Region of Interest) จากเฟรมวิดีโอเพื่อสกัดสัญญาณทางสรีรวิทยา",
  },
  {
    step: "3",
    title: "Signal Extraction",
    thai: "การสกัดสัญญาณ",
    desc: "สกัดสัญญาณดิบ 2 ประเภทจาก ROI: ค่าเฉลี่ยความเข้มแสง (NIR-iPPG) และค่าเบี่ยงเบนมาตรฐานแบบ normalize (SPG)",
  },
  {
    step: "4",
    title: "Preprocessing & Filtering",
    thai: "การกรองและปรับแต่งสัญญาณ",
    desc: "ใช้ Butterworth Bandpass Filter (0.5–4.0 Hz) ร่วมกับ Savitzky-Golay Smoothing เพื่อกรองสัญญาณรบกวนและเน้นองค์ประกอบทางสรีรวิทยา",
  },
  {
    step: "5",
    title: "Feature Extraction",
    thai: "การสกัดคุณลักษณะ",
    desc: "สกัดคุณลักษณะทางสถิติ ความถี่ และโดเมนเวลาจากสัญญาณ SPG และ NIR-iPPG เช่น Entropy, Variance, Power Spectral Density",
  },
  {
    step: "6",
    title: "ML Model Inference",
    thai: "การทำนายด้วยโมเดล",
    desc: "ใช้โมเดล Machine Learning (Histogram Gradient Boosting) ที่ผ่านการฝึกจากข้อมูลอาสาสมัคร 240 ราย เพื่อประเมินระดับความเสี่ยง",
  },
];

export default function TechnologyPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="border-b border-slate-100 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
          <h1 className="text-2xl font-bold text-slate-800 mb-2">เทคโนโลยี</h1>
          <p className="text-slate-500 text-sm max-w-2xl">
            อธิบายหลักการทำงานของเทคนิค Laser Speckle Contrast Imaging (LSCI)
            และกระบวนการสกัดสัญญาณ SPG/NIR-iPPG สำหรับการคัดกรองความเสี่ยงทางหัวใจและหลอดเลือด
          </p>
        </div>
      </section>

      {/* LSCI Explanation */}
      <section className="section-spacing">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-10 items-center mb-16">
            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-3">
                Laser Speckle Contrast Imaging คืออะไร?
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                LSCI เป็นเทคนิคทางแสงที่ใช้วิเคราะห์การไหลเวียนของเลือดในหลอดเลือดฝอย
                โดยอาศัยรูปแบบการกระจายของแสงเลเซอร์ (Speckle Pattern)
                ที่เปลี่ยนแปลงตามการเคลื่อนที่ของเม็ดเลือดแดง
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                เมื่อเลเซอร์ส่องกระทบผิวหนัง แสงจะกระจายและสร้างรูปแบบ Speckle
                การวิเคราะห์ความแปรปรวนของรูปแบบนี้ทำให้สามารถสกัดข้อมูลเกี่ยวกับ
                การไหลเวียนเลือด อัตราการเต้นของหัวใจ และสภาพหลอดเลือดได้
              </p>
            </div>
            <div className="flex justify-center">
              <Image
                src="/images/sensor_view.png"
                alt="LSCI Sensor Close-up"
                width={400}
                height={300}
                className="rounded-xl border border-slate-200 shadow-sm"
              />
            </div>
          </div>

          {/* Signal Types */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            <div className="sci-card">
              <h3 className="font-bold text-slate-800 mb-2">
                SPG — Speckle Plethysmography
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                สัญญาณ SPG สกัดจากค่าเบี่ยงเบนมาตรฐานของความเข้มแสงใน ROI
                แบบ normalize ด้วยค่าเฉลี่ย สะท้อนการเปลี่ยนแปลงของ Speckle Contrast
                ซึ่งสัมพันธ์กับการไหลเวียนของเลือดในหลอดเลือดฝอย
              </p>
            </div>
            <div className="sci-card">
              <h3 className="font-bold text-slate-800 mb-2">
                NIR-iPPG — Imaging Photoplethysmography
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                สัญญาณ NIR-iPPG สกัดจากค่าเฉลี่ยความเข้มแสงของเฟรมวิดีโอ
                แบบ AC-coupled normalization สะท้อนคลื่นชีพจรและการเต้นของหัวใจ
                ซึ่งสามารถวิเคราะห์อัตราการเต้นของหัวใจได้
              </p>
            </div>
          </div>

          {/* Pipeline */}
          <h2 className="text-xl font-bold text-slate-800 mb-6 text-center">
            Signal Processing Pipeline
          </h2>
          <div className="space-y-4">
            {PIPELINE.map((item, i) => (
              <div key={i} className="sci-card flex gap-4">
                <div className="step-badge flex-shrink-0 mt-0.5">{item.step}</div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm">{item.title}</h3>
                  <p className="text-xs text-sky-600 font-semibold mb-1">{item.thai}</p>
                  <p className="text-sm text-slate-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
