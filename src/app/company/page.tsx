import React from "react";

export default function CompanyPage() {
  return (
    <div className="min-h-screen">
      <section className="border-b border-slate-100 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
          <h1 className="text-2xl font-bold text-slate-800 mb-2">เกี่ยวกับเรา</h1>
          <p className="text-slate-500 text-sm max-w-2xl">
            ข้อมูลเกี่ยวกับทีมวิจัยและความเป็นมาของโครงการ Zycel
          </p>
        </div>
      </section>

      <section className="section-spacing">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="sci-card">
            <h2 className="text-lg font-bold text-slate-800 mb-3">โครงการวิจัย Zycel</h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              Zycel เป็นโครงการวิจัยที่พัฒนาระบบต้นแบบสำหรับคัดกรองความเสี่ยงทางหัวใจและหลอดเลือด
              แบบไม่รุกราน (Non-Invasive) โดยใช้เทคนิค Laser Speckle Contrast Imaging (LSCI)
              ร่วมกับ Machine Learning
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              ระบบสามารถสกัดสัญญาณทางสรีรวิทยา (SPG และ NIR-iPPG) จากวิดีโอที่บันทึกจากหลอดเลือดฝอย
              และใช้คุณลักษณะเหล่านั้นในการประเมินระดับความเสี่ยงของไขมันในเลือด
              โดยไม่ต้องเจาะเลือด
            </p>
          </div>

          <div className="sci-card">
            <h2 className="text-lg font-bold text-slate-800 mb-3">เป้าหมายการวิจัย</h2>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5 flex-shrink-0" />
                พัฒนาระบบคัดกรองเบื้องต้นที่ใช้งานง่าย ราคาถูก และไม่ต้องเจาะเลือด
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5 flex-shrink-0" />
                ศึกษาความเป็นไปได้ในการใช้สัญญาณแสงจากหลอดเลือดฝอยเพื่อทำนายค่าไขมันในเลือด
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5 flex-shrink-0" />
                เก็บข้อมูลจากอาสาสมัคร 240 ราย เพื่อฝึกและทดสอบโมเดล Machine Learning
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5 flex-shrink-0" />
                สร้างแพลตฟอร์มเว็บสำหรับสาธิตการทำงานของระบบ
              </li>
            </ul>
          </div>

          <div className="sci-card">
            <h2 className="text-lg font-bold text-slate-800 mb-3">ข้อมูลสำคัญ</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="bg-slate-50 rounded-lg p-4">
                <span className="text-2xl font-bold text-sky-700">240</span>
                <span className="text-xs text-slate-500 block mt-1">อาสาสมัคร</span>
              </div>
              <div className="bg-slate-50 rounded-lg p-4">
                <span className="text-2xl font-bold text-sky-700">720</span>
                <span className="text-xs text-slate-500 block mt-1">วิดีโอ LSCI</span>
              </div>
              <div className="bg-slate-50 rounded-lg p-4">
                <span className="text-2xl font-bold text-sky-700">5</span>
                <span className="text-xs text-slate-500 block mt-1">ตัวชี้วัดความเสี่ยง</span>
              </div>
              <div className="bg-slate-50 rounded-lg p-4">
                <span className="text-2xl font-bold text-sky-700">120</span>
                <span className="text-xs text-slate-500 block mt-1">FPS</span>
              </div>
            </div>
          </div>

          <div className="text-xs text-slate-400 leading-relaxed p-3 bg-slate-50 rounded-lg">
            ระบบนี้เป็นต้นแบบเพื่อการวิจัยเท่านั้น ไม่ได้รับการรับรองจากหน่วยงานทางการแพทย์
            และไม่ควรใช้ทดแทนการตรวจวินิจฉัยจากแพทย์
          </div>
        </div>
      </section>
    </div>
  );
}
