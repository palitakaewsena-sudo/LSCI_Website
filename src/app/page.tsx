"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ClipboardList,
  Film,
  Target,
  Activity,
  Cpu,
  FileBarChart,
} from "lucide-react";

const STEPS = [
  {
    icon: ClipboardList,
    title: "กรอกข้อมูลพื้นฐาน",
    desc: "ระบุเพศ อายุ น้ำหนัก และส่วนสูง",
  },
  {
    icon: Film,
    title: "เลือกวิดีโอ LSCI",
    desc: "เลือกวิดีโอจากระบบเก็บข้อมูลต้นแบบ",
  },
  {
    icon: Target,
    title: "ดูตำแหน่ง ROI",
    desc: "แสดงพื้นที่สนใจที่ใช้สกัดสัญญาณ",
  },
  {
    icon: Activity,
    title: "ดูสัญญาณ SPG และ NIR-iPPG",
    desc: "แสดงสัญญาณทางสรีรวิทยาที่สกัดจากวิดีโอจริง",
  },
  {
    icon: Cpu,
    title: "รันการวิเคราะห์",
    desc: "ประมวลผลด้วย Machine Learning Model",
  },
  {
    icon: FileBarChart,
    title: "ดูผลการประเมินความเสี่ยง",
    desc: "แสดงระดับความเสี่ยงทางหัวใจและหลอดเลือด",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-mesh">
      {/* ── Hero Section ─────────────────────────────── */}
      <section className="section-spacing border-b border-slate-100/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-100/50 text-sky-800 text-xs font-semibold mb-6 border border-sky-200/50">
                <Activity className="w-3.5 h-3.5" />
                Research Prototype System
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold text-slate-900 leading-[1.15] mb-6 tracking-tight">
                ระบบต้นแบบคัดกรองความเสี่ยง
                <br />
                <span className="text-gradient">หัวใจและหลอดเลือด</span>
              </h1>
              <p className="text-slate-600 text-lg leading-relaxed mb-8 max-w-lg font-medium">
                วิเคราะห์สัญญาณทางสรีรวิทยาจากวิดีโอ Laser Speckle Contrast Imaging (LSCI)
                ด้วยเทคนิค Machine Learning เพื่อประเมินระดับความเสี่ยงของไขมันในเลือด
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Link href="/prototype" className="btn-primary group">
                  เริ่มทดลองใช้งาน
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link href="/technology" className="text-sm font-semibold text-slate-500 hover:text-sky-700 transition-colors px-4 py-2">
                  ศึกษาเทคโนโลยี &rarr;
                </Link>
              </div>
              <p className="text-xs text-slate-400 mt-6 bg-slate-50 inline-block px-3 py-2 rounded-lg border border-slate-100">
                <span className="font-semibold text-slate-500">หมายเหตุ:</span> ระบบนี้เป็นต้นแบบเพื่อการวิจัย ไม่ใช่เครื่องมือวินิจฉัยทางการแพทย์
              </p>
            </div>

            {/* Device Image */}
            <div className="flex justify-center relative">
              {/* Premium Glow Behind Device */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-sky-200/40 rounded-full blur-[80px] -z-10" />
              
              <div className="relative w-full max-w-md group">
                <div className="absolute -inset-0.5 bg-gradient-to-br from-sky-300 to-cyan-300 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500" />
                <Image
                  src="/images/prototype_device.png"
                  alt="Zycel LSCI Prototype Device"
                  width={480}
                  height={360}
                  className="relative rounded-2xl shadow-xl border border-white/50 bg-white"
                  priority
                />
                <div className="absolute -bottom-6 -right-6 sm:bottom-4 sm:left-4 sm:right-auto bg-white/95 backdrop-blur-md rounded-xl p-4 border border-slate-200/80 shadow-lg transform transition-transform group-hover:-translate-y-1">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center">
                      <Target className="w-5 h-5 text-sky-600" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">
                        อุปกรณ์ต้นแบบ LSCI
                      </p>
                      <p className="text-[11px] text-slate-500 font-medium">
                        Laser 785nm / 120 FPS
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Workflow Steps ────────────────────────────── */}
      <section className="section-spacing bg-gradient-to-b from-white to-slate-50/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">
              ขั้นตอนการทำงาน
            </h2>
            <p className="text-slate-500 text-base max-w-xl mx-auto">
              กระบวนการคัดกรองแบบไม่รุกรานจากวิดีโอสู่ผลการประเมินความเสี่ยง
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {STEPS.map((step, i) => (
              <div key={i} className="sci-card flex gap-5 group">
                <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center flex-shrink-0 group-hover:bg-sky-500 group-hover:text-white transition-colors duration-300">
                  <step.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 mb-1.5 group-hover:text-sky-700 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pipeline Diagram ─────────────────────────── */}
      <section className="section-spacing border-t border-slate-100/50 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">
            Signal Processing Pipeline
          </h2>
          <p className="text-slate-500 text-base mb-12 max-w-xl mx-auto">
            สถาปัตยกรรมการสกัดสัญญาณและวิเคราะห์ข้อมูลจากวิดีโอระดับหลอดเลือดฝอย
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 text-sm relative z-10">
            {[
              { id: "LSCI Video", color: "bg-slate-50 text-slate-700 border-slate-200" },
              { id: "ROI Detection", color: "bg-slate-50 text-slate-700 border-slate-200" },
              { id: "Signal Extraction", color: "bg-sky-50 text-sky-800 border-sky-200" },
              { id: "SPG & NIR-iPPG", color: "bg-cyan-50 text-cyan-800 border-cyan-200 font-bold" },
              { id: "Feature Extraction", color: "bg-slate-50 text-slate-700 border-slate-200" },
              { id: "ML Model", color: "bg-indigo-50 text-indigo-800 border-indigo-200" },
              { id: "Risk Assessment", color: "bg-green-50 text-green-800 border-green-200 font-bold shadow-sm" },
            ].map((step, i, arr) => (
              <React.Fragment key={step.id}>
                <div className={`px-5 py-2.5 rounded-xl border ${step.color} transition-all hover:-translate-y-1 hover:shadow-md cursor-default`}>
                  {step.id}
                </div>
                {i < arr.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-slate-300 flex-shrink-0" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
