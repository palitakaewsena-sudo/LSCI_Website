"use client";

import React from "react";
import { PatientData } from "./PatientForm";
import { FileBarChart, AlertTriangle } from "lucide-react";

export type RiskLevel = "Low" | "Moderate" | "High";

export interface ScreeningResults {
  tgRisk: RiskLevel;
  ldlRisk: RiskLevel;
  hdlRisk: RiskLevel;
  aipRisk: RiskLevel;
  hrRisk: RiskLevel;
}

interface ResultReportProps {
  results: ScreeningResults;
  patientData: PatientData;
}

const RISK_LABELS: Record<RiskLevel, { thai: string; class: string }> = {
  Low: { thai: "ต่ำ", class: "risk-low" },
  Moderate: { thai: "ปานกลาง", class: "risk-moderate" },
  High: { thai: "สูง", class: "risk-high" },
};

const RISK_ITEMS = [
  {
    key: "tgRisk" as keyof ScreeningResults,
    label: "TG Risk",
    thai: "ไตรกลีเซอไรด์",
    desc: "ระดับความเสี่ยงจากไขมันไตรกลีเซอไรด์ในเลือด",
  },
  {
    key: "ldlRisk" as keyof ScreeningResults,
    label: "LDL Risk",
    thai: "แอลดีแอล คอเลสเตอรอล",
    desc: "ระดับความเสี่ยงจากไขมันชนิดไม่ดี (LDL-C)",
  },
  {
    key: "hdlRisk" as keyof ScreeningResults,
    label: "HDL Risk",
    thai: "เอชดีแอล คอเลสเตอรอล",
    desc: "ระดับความเสี่ยงจากไขมันชนิดดี (HDL-C) ต่ำ",
  },
  {
    key: "aipRisk" as keyof ScreeningResults,
    label: "AIP Risk",
    thai: "ดัชนี Atherogenic Index",
    desc: "ดัชนีชี้วัดความเสี่ยงต่อหลอดเลือดแดงแข็ง",
  },
  {
    key: "hrRisk" as keyof ScreeningResults,
    label: "HR Risk",
    thai: "อัตราการเต้นของหัวใจ",
    desc: "ระดับความเสี่ยงจากอัตราการเต้นของหัวใจที่ผิดปกติ",
  },
];

export default function ResultReport({ results, patientData }: ResultReportProps) {
  const highCount = Object.values(results).filter((v) => v === "High").length;
  const modCount = Object.values(results).filter((v) => v === "Moderate").length;

  return (
    <div className="sci-card">
      <h3 className="text-base font-bold text-slate-800 mb-5 flex items-center gap-2">
        <FileBarChart className="w-4 h-4 text-sky-700" />
        ผลการประเมินความเสี่ยง
      </h3>

      {/* Patient Summary */}
      <div className="bg-slate-50 rounded-lg p-4 mb-6 text-sm">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-slate-600">
          <div>
            <span className="text-xs text-slate-400 block">เพศ</span>
            <span className="font-semibold">{patientData.gender === "male" ? "ชาย" : "หญิง"}</span>
          </div>
          <div>
            <span className="text-xs text-slate-400 block">อายุ</span>
            <span className="font-semibold">{patientData.age} ปี</span>
          </div>
          <div>
            <span className="text-xs text-slate-400 block">BMI</span>
            <span className="font-semibold">{patientData.bmi}</span>
          </div>
          <div>
            <span className="text-xs text-slate-400 block">น้ำหนัก/ส่วนสูง</span>
            <span className="font-semibold">{patientData.weight} กก. / {patientData.height} ซม.</span>
          </div>
        </div>
      </div>

      {/* Risk Results Table */}
      <div className="border border-slate-200 rounded-lg overflow-hidden mb-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="text-left px-4 py-3 font-semibold text-slate-600">ตัวชี้วัด</th>
              <th className="text-left px-4 py-3 font-semibold text-slate-600">รายละเอียด</th>
              <th className="text-center px-4 py-3 font-semibold text-slate-600">ระดับความเสี่ยง</th>
            </tr>
          </thead>
          <tbody>
            {RISK_ITEMS.map((item) => {
              const level = results[item.key];
              const riskInfo = RISK_LABELS[level];
              return (
                <tr key={item.key} className="border-b border-slate-100 last:border-0">
                  <td className="px-4 py-3">
                    <span className="font-semibold text-slate-800">{item.label}</span>
                    <span className="block text-xs text-slate-400">{item.thai}</span>
                  </td>
                  <td className="px-4 py-3 text-slate-500 text-xs">{item.desc}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${riskInfo.class}`}>
                      {riskInfo.thai}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Summary Alert */}
      {highCount > 0 && (
        <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-semibold text-red-700">
              พบปัจจัยเสี่ยงระดับสูง {highCount} รายการ
            </p>
            <p className="text-red-600 text-xs mt-1">
              ผลการคัดกรองเบื้องต้นนี้แนะนำให้ปรึกษาแพทย์เพื่อตรวจเพิ่มเติม
            </p>
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <div className="text-[11px] text-slate-400 leading-relaxed p-3 bg-slate-50 rounded-lg">
        <strong>หมายเหตุ:</strong> ผลการประเมินนี้เป็นเพียงการคัดกรองเบื้องต้นจากระบบวิจัยต้นแบบ
        ไม่สามารถใช้ทดแทนการตรวจวินิจฉัยจากห้องปฏิบัติการหรือแพทย์ได้
        กรุณาปรึกษาแพทย์เพื่อรับการประเมินอย่างละเอียด
      </div>
    </div>
  );
}
