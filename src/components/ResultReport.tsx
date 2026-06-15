"use client";

import React from "react";
import { PatientData } from "./PatientForm";
import { FileBarChart, AlertTriangle, User, Video, Activity, CheckCircle, BrainCircuit } from "lucide-react";
import { LsciVideo } from "./VideoSelector";

export type RiskLevel = "Low" | "Moderate" | "High";

export interface ScreeningResults {
  tgRisk: RiskLevel;
  ldlRisk: RiskLevel;
  hdlRisk: RiskLevel;
  aipRisk: RiskLevel;
  sdldlRisk: RiskLevel;
  hrRisk: RiskLevel;
  hrValue: number;
}

interface ResultReportProps {
  results: ScreeningResults;
  patientData: PatientData;
  video: LsciVideo;
}

const RISK_LABELS: Record<RiskLevel, { thai: string; class: string }> = {
  Low: { thai: "ต่ำ", class: "text-emerald-700 bg-emerald-100 border-emerald-200" },
  Moderate: { thai: "ปานกลาง", class: "text-amber-700 bg-amber-100 border-amber-200" },
  High: { thai: "สูง", class: "text-red-700 bg-red-100 border-red-200" },
};

const RISK_ITEMS = [
  {
    key: "tgRisk" as keyof ScreeningResults,
    label: "Triglyceride (TG)",
    thai: "ไตรกลีเซอไรด์",
    desc: "ความเสี่ยงจากระดับไขมันไตรกลีเซอไรด์",
  },
  {
    key: "ldlRisk" as keyof ScreeningResults,
    label: "LDL-C",
    thai: "แอลดีแอล คอเลสเตอรอล",
    desc: "ความเสี่ยงจากไขมันชนิดไม่ดี (LDL-C)",
  },
  {
    key: "hdlRisk" as keyof ScreeningResults,
    label: "HDL-C",
    thai: "เอชดีแอล คอเลสเตอรอล",
    desc: "ความเสี่ยงจากไขมันชนิดดี (HDL-C) ต่ำ",
  },
  {
    key: "sdldlRisk" as keyof ScreeningResults,
    label: "sdLDL-C",
    thai: "แอลดีแอลขนาดเล็ก",
    desc: "ไขมันชนิดไม่ดีที่มีขนาดเล็กและหนาแน่น (sdLDL-C)",
  },
  {
    key: "aipRisk" as keyof ScreeningResults,
    label: "Atherogenic Index (AIP)",
    thai: "ดัชนี Atherogenic Index",
    desc: "ดัชนีชี้วัดความเสี่ยงต่อหลอดเลือดแดงแข็ง",
  },
];

export default function ResultReport({ results, patientData, video }: ResultReportProps) {
  const highCount = ["tgRisk", "ldlRisk", "hdlRisk", "sdldlRisk", "aipRisk"].filter(
    (k) => results[k as keyof ScreeningResults] === "High"
  ).length;

  const RiskIndicator = ({ level }: { level: RiskLevel }) => {
    return (
      <div className="relative w-full h-2 bg-slate-100 rounded-full mt-2">
        {/* Track segments */}
        <div className="absolute top-0 left-0 w-1/3 h-full bg-emerald-100 rounded-l-full" />
        <div className="absolute top-0 left-1/3 w-1/3 h-full bg-amber-100" />
        <div className="absolute top-0 left-2/3 w-1/3 h-full bg-red-100 rounded-r-full" />
        
        {/* Active Marker */}
        <div
          className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-white shadow-sm transition-all duration-500 ${
            level === "Low"
              ? "left-[16%] bg-emerald-500"
              : level === "Moderate"
              ? "left-1/2 bg-amber-500"
              : "left-[83%] bg-red-500"
          }`}
          style={{ transform: "translate(-50%, -50%)" }}
        />
      </div>
    );
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden text-slate-800">
      {/* Header */}
      <div className="bg-gradient-to-r from-sky-800 to-sky-900 px-6 py-5 text-white">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <FileBarChart className="w-6 h-6" />
          รายงานผลการวิเคราะห์ Zycel Prototype
        </h2>
        <p className="text-sky-100 text-sm mt-1">
          การประเมินความเสี่ยงโรคหลอดเลือดหัวใจจากสัญญาณทางสรีรวิทยา
        </p>
      </div>

      <div className="p-6 md:p-8 space-y-10">
        {/* Section 1 & 2: Patient and Video Info */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border border-slate-100 bg-slate-50 rounded-xl p-5">
            <h3 className="text-sm font-bold text-sky-800 flex items-center gap-2 mb-4 uppercase tracking-wider">
              <User className="w-4 h-4" /> 1. ข้อมูลผู้เข้ารับการประเมิน
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-slate-400 block text-xs">เพศ</span>
                <span className="font-semibold">{patientData.gender === "male" ? "ชาย" : "หญิง"}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-xs">อายุ</span>
                <span className="font-semibold">{patientData.age} ปี</span>
              </div>
              <div>
                <span className="text-slate-400 block text-xs">ส่วนสูง / น้ำหนัก</span>
                <span className="font-semibold">{patientData.height} ซม. / {patientData.weight} กก.</span>
              </div>
              <div>
                <span className="text-slate-400 block text-xs">ดัชนีมวลกาย (BMI)</span>
                <span className="font-semibold">{patientData.bmi}</span>
              </div>
            </div>
          </div>

          <div className="border border-slate-100 bg-slate-50 rounded-xl p-5">
            <h3 className="text-sm font-bold text-sky-800 flex items-center gap-2 mb-4 uppercase tracking-wider">
              <Video className="w-4 h-4" /> 2. ข้อมูลวิดีโอ LSCI
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="col-span-2">
                <span className="text-slate-400 block text-xs">ไฟล์วิดีโออ้างอิง</span>
                <span className="font-semibold truncate block">{video.filename}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-xs">เฟรมเรต</span>
                <span className="font-semibold">{video.fps} FPS</span>
              </div>
              <div>
                <span className="text-slate-400 block text-xs">ระยะเวลา</span>
                <span className="font-semibold">{video.duration} วินาที</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Features Summary */}
        <div className="border border-slate-100 rounded-xl p-5">
          <h3 className="text-sm font-bold text-sky-800 flex items-center gap-2 mb-4 uppercase tracking-wider">
            <BrainCircuit className="w-4 h-4" /> 4. คุณลักษณะที่ใช้ในการวิเคราะห์
          </h3>
          <p className="text-sm text-slate-500 mb-4">
            ระบบ Machine Learning ใช้คุณลักษณะของสัญญาณ (Features) มากกว่า 150 ตัวแปรในการวิเคราะห์ โดยแบ่งเป็น 4 กลุ่มหลัก:
          </p>
          <div className="grid sm:grid-cols-4 gap-4">
            <div className="bg-sky-50 p-3 rounded-lg text-center">
              <div className="text-sky-700 font-bold text-sm mb-1">Amplitude</div>
              <div className="text-xs text-sky-600">สถิติความกว้างคลื่น</div>
            </div>
            <div className="bg-sky-50 p-3 rounded-lg text-center">
              <div className="text-sky-700 font-bold text-sm mb-1">Frequency</div>
              <div className="text-xs text-sky-600">พลังงานในโดเมนความถี่</div>
            </div>
            <div className="bg-sky-50 p-3 rounded-lg text-center">
              <div className="text-sky-700 font-bold text-sm mb-1">Morphological</div>
              <div className="text-xs text-sky-600">รูปทรงและมุมของคลื่น</div>
            </div>
            <div className="bg-sky-50 p-3 rounded-lg text-center">
              <div className="text-sky-700 font-bold text-sm mb-1">Variability</div>
              <div className="text-xs text-sky-600">ความซับซ้อนและการกระจาย</div>
            </div>
          </div>
        </div>

        {/* Section 5: Risk Evaluation */}
        <div>
          <h3 className="text-sm font-bold text-sky-800 flex items-center gap-2 mb-4 uppercase tracking-wider border-b border-slate-100 pb-3">
            <Activity className="w-4 h-4" /> 5. ผลการประเมินความเสี่ยง (Lipid Risks)
          </h3>
          
          <div className="space-y-6">
            {RISK_ITEMS.map((item) => {
              const level = results[item.key as keyof ScreeningResults];
              const riskInfo = RISK_LABELS[level as RiskLevel];
              
              return (
                <div key={item.key} className="grid md:grid-cols-[1fr_250px] gap-6 items-center">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold text-slate-800">{item.label}</h4>
                      <span className="text-xs text-slate-500">({item.thai})</span>
                    </div>
                    <p className="text-sm text-slate-500">{item.desc}</p>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className="text-slate-400">Low</span>
                      <span className={`px-2 py-0.5 rounded border ${riskInfo.class}`}>
                        {riskInfo.thai}
                      </span>
                      <span className="text-slate-400">High</span>
                    </div>
                    <RiskIndicator level={level as RiskLevel} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Heart Rate Extra Block */}
          <div className="mt-8 pt-6 border-t border-slate-100">
            <h4 className="font-bold text-slate-800 mb-4">อัตราการเต้นของหัวใจ (Heart Rate)</h4>
            <div className="flex items-center gap-8">
              <div className="text-4xl font-light text-slate-700">
                {results.hrValue} <span className="text-lg text-slate-400 font-normal">BPM</span>
              </div>
              <div className="flex-1 max-w-[250px]">
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-slate-400">Low</span>
                  <span className={`px-2 py-0.5 rounded border ${RISK_LABELS[results.hrRisk].class}`}>
                    {RISK_LABELS[results.hrRisk].thai}
                  </span>
                  <span className="text-slate-400">High</span>
                </div>
                <RiskIndicator level={results.hrRisk} />
              </div>
            </div>
          </div>
        </div>

        {/* Section 6: Summary */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
          <h3 className="text-sm font-bold text-sky-800 flex items-center gap-2 mb-3 uppercase tracking-wider">
            <CheckCircle className="w-4 h-4" /> 6. สรุปผล
          </h3>
          
          {highCount > 0 ? (
            <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-red-800 text-sm">
                  พบระดับความเสี่ยงสูงจำนวน {highCount} รายการ
                </p>
                <p className="text-red-700 text-sm mt-1">
                  ผลการคัดกรองเบื้องต้นนี้ตรวจพบปัจจัยเสี่ยงด้านไขมันในเลือด แนะนำให้ปรึกษาแพทย์เพื่อทำการเจาะเลือดตรวจทางห้องปฏิบัติการเพิ่มเติม
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-3 bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
              <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-emerald-800 text-sm">
                  ไม่พบความเสี่ยงระดับสูง
                </p>
                <p className="text-emerald-700 text-sm mt-1">
                  สัญญาณลายนิ้วมือทางแสง (LSCI) มีลักษณะทางสัณฐานวิทยาปกติ แต่อย่างไรก็ตาม ควรหมั่นตรวจสุขภาพประจำปีอย่างสม่ำเสมอ
                </p>
              </div>
            </div>
          )}

          <div className="text-xs text-slate-400 leading-relaxed mt-4">
            <strong>คำเตือน:</strong> รายงานผลฉบับนี้เป็นผลการวิเคราะห์จาก <em>ระบบต้นแบบงานวิจัยทางการแพทย์ (Research Prototype)</em> เท่านั้น 
            ไม่ได้ผ่านการรับรองเพื่อใช้เป็นเครื่องมือแพทย์สำหรับการวินิจฉัยโรค ผลลัพธ์ที่ได้เป็นการประเมินความเสี่ยงเพื่อการคัดกรองเบื้องต้นเท่านั้น 
            ห้ามนำไปใช้แทนการตัดสินใจทางการแพทย์โดยเด็ดขาด
          </div>
        </div>
      </div>
    </div>
  );
}
