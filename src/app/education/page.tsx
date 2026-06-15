import React from "react";

const BIOMARKERS = [
  {
    abbr: "TG",
    name: "Triglyceride",
    thai: "ไตรกลีเซอไรด์",
    desc: "ไขมันชนิดหนึ่งในเลือดที่ร่างกายใช้เป็นแหล่งพลังงาน ระดับ TG สูงเพิ่มความเสี่ยงต่อโรคหัวใจและหลอดเลือด มักเกี่ยวข้องกับพฤติกรรมการบริโภคอาหาร",
    levels: [
      { label: "ต่ำ (Low Risk)", range: "< 150 mg/dL", color: "text-green-600" },
      { label: "ปานกลาง (Moderate)", range: "150–199 mg/dL", color: "text-amber-600" },
      { label: "สูง (High Risk)", range: "≥ 200 mg/dL", color: "text-red-600" },
    ],
  },
  {
    abbr: "LDL-C",
    name: "Low-Density Lipoprotein Cholesterol",
    thai: "แอลดีแอล คอเลสเตอรอล (ไขมันชนิดไม่ดี)",
    desc: "LDL เป็นตัวพาคอเลสเตอรอลไปสะสมที่ผนังหลอดเลือดแดง ทำให้เกิดภาวะหลอดเลือดแดงแข็ง (Atherosclerosis) ซึ่งเป็นสาเหตุหลักของโรคหัวใจ",
    levels: [
      { label: "ต่ำ (Low Risk)", range: "< 130 mg/dL", color: "text-green-600" },
      { label: "ปานกลาง (Moderate)", range: "130–159 mg/dL", color: "text-amber-600" },
      { label: "สูง (High Risk)", range: "≥ 160 mg/dL", color: "text-red-600" },
    ],
  },
  {
    abbr: "HDL-C",
    name: "High-Density Lipoprotein Cholesterol",
    thai: "เอชดีแอล คอเลสเตอรอล (ไขมันชนิดดี)",
    desc: "HDL ทำหน้าที่เก็บกวาดคอเลสเตอรอลจากหลอดเลือดกลับไปยังตับเพื่อกำจัด ระดับ HDL ที่ต่ำเกินไปจะเพิ่มความเสี่ยงต่อโรคหัวใจ",
    levels: [
      { label: "ต่ำ (Low Risk)", range: "≥ 60 mg/dL", color: "text-green-600" },
      { label: "ปานกลาง (Moderate)", range: "40–59 mg/dL", color: "text-amber-600" },
      { label: "สูง (High Risk)", range: "< 40 mg/dL", color: "text-red-600" },
    ],
  },
  {
    abbr: "AIP",
    name: "Atherogenic Index of Plasma",
    thai: "ดัชนีชี้วัดความเสี่ยงหลอดเลือดแดงแข็ง",
    desc: "AIP คำนวณจาก log₁₀(TG/HDL-C) เป็นดัชนีรวมที่บ่งบอกความเสี่ยงของภาวะหลอดเลือดแดงแข็งได้ดีกว่าการดูค่าไขมันแต่ละตัวแยกกัน",
    levels: [
      { label: "ต่ำ (Low Risk)", range: "< 0.11", color: "text-green-600" },
      { label: "ปานกลาง (Moderate)", range: "0.11–0.24", color: "text-amber-600" },
      { label: "สูง (High Risk)", range: "> 0.24", color: "text-red-600" },
    ],
  },
  {
    abbr: "HR",
    name: "Heart Rate",
    thai: "อัตราการเต้นของหัวใจ",
    desc: "อัตราการเต้นของหัวใจขณะพักที่ผิดปกติ (เร็วหรือช้าเกินไป) สัมพันธ์กับความเสี่ยงต่อภาวะหัวใจเต้นผิดจังหวะและโรคหลอดเลือดสมอง",
    levels: [
      { label: "ต่ำ (Low Risk)", range: "60–100 BPM", color: "text-green-600" },
      { label: "ปานกลาง (Moderate)", range: "50–59 หรือ 101–110 BPM", color: "text-amber-600" },
      { label: "สูง (High Risk)", range: "< 50 หรือ > 110 BPM", color: "text-red-600" },
    ],
  },
];

export default function EducationPage() {
  return (
    <div className="min-h-screen">
      <section className="border-b border-slate-100 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
          <h1 className="text-2xl font-bold text-slate-800 mb-2">องค์ความรู้</h1>
          <p className="text-slate-500 text-sm max-w-2xl">
            ข้อมูลเกี่ยวกับตัวชี้วัดความเสี่ยงทางหัวใจและหลอดเลือดที่ระบบนี้ใช้ในการคัดกรอง
          </p>
        </div>
      </section>

      <section className="section-spacing">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
          {BIOMARKERS.map((marker) => (
            <div key={marker.abbr} className="sci-card">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-sky-700 text-sm">{marker.abbr}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-800">{marker.name}</h3>
                  <p className="text-sm text-sky-600 font-semibold mb-2">{marker.thai}</p>
                  <p className="text-sm text-slate-500 leading-relaxed mb-3">{marker.desc}</p>
                  <div className="grid sm:grid-cols-3 gap-2">
                    {marker.levels.map((lv) => (
                      <div
                        key={lv.label}
                        className="bg-slate-50 rounded-lg px-3 py-2 text-xs"
                      >
                        <span className={`font-semibold block ${lv.color}`}>
                          {lv.label}
                        </span>
                        <span className="text-slate-400">{lv.range}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="text-xs text-slate-400 p-4 bg-slate-50 rounded-lg leading-relaxed">
            <strong>อ้างอิง:</strong> เกณฑ์การจัดระดับความเสี่ยงอ้างอิงจากแนวทาง NCEP ATP III
            (National Cholesterol Education Program) ข้อมูลนี้มีวัตถุประสงค์เพื่อการศึกษาเท่านั้น
          </div>
        </div>
      </section>
    </div>
  );
}
