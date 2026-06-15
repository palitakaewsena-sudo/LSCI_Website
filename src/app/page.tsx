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
    <div className="min-h-screen">
      {/* ── Hero Section ─────────────────────────────── */}
      <section className="section-spacing border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-50 text-sky-700 text-xs font-semibold mb-6">
                <Activity className="w-3.5 h-3.5" />
                Research Prototype
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight mb-4">
                ระบบต้นแบบคัดกรองความเสี่ยง
                <br />
                <span className="text-gradient">หัวใจและหลอดเลือด</span>
              </h1>
              <p className="text-slate-500 text-lg leading-relaxed mb-8 max-w-lg">
                วิเคราะห์สัญญาณทางสรีรวิทยาจากวิดีโอ Laser Speckle Contrast Imaging (LSCI)
                ด้วยเทคนิค Machine Learning เพื่อประเมินระดับความเสี่ยงของไขมันในเลือด
              </p>
              <Link href="/prototype" className="btn-primary">
                เริ่มทดลองใช้งาน
                <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="text-xs text-slate-400 mt-4">
                * ระบบนี้เป็นต้นแบบเพื่อการวิจัย ไม่ใช่เครื่องมือวินิจฉัยทางการแพทย์
              </p>
            </div>

            {/* Device Image */}
            <div className="flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute -inset-4 bg-gradient-to-br from-sky-50 to-cyan-50 rounded-3xl -z-10" />
                <Image
                  src="/images/prototype_device.png"
                  alt="Zycel LSCI Prototype Device"
                  width={480}
                  height={360}
                  className="rounded-2xl shadow-sm border border-slate-200"
                  priority
                />
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl p-3 border border-slate-200">
                  <p className="text-xs font-semibold text-slate-700">
                    อุปกรณ์ต้นแบบ LSCI
                  </p>
                  <p className="text-[10px] text-slate-400">
                    ใช้เลเซอร์ 850nm สำหรับสกัดสัญญาณจากหลอดเลือดฝอย
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Workflow Steps ────────────────────────────── */}
      <section className="section-spacing bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">
              ขั้นตอนการทำงาน
            </h2>
            <p className="text-slate-500 text-sm">
              กระบวนการคัดกรองจากวิดีโอสู่ผลการประเมินความเสี่ยง
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {STEPS.map((step, i) => (
              <div key={i} className="sci-card flex gap-4">
                <div className="step-badge flex-shrink-0 mt-0.5">{i + 1}</div>
                <div>
                  <h3 className="font-semibold text-slate-800 mb-1">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-500">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pipeline Diagram ─────────────────────────── */}
      <section className="section-spacing border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-3">
            Signal Processing Pipeline
          </h2>
          <p className="text-slate-500 text-sm mb-10">
            ขั้นตอนการสกัดสัญญาณและวิเคราะห์ข้อมูลจากวิดีโอ LSCI
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
            {[
              "LSCI Video",
              "ROI Detection",
              "Signal Extraction",
              "SPG",
              "NIR-iPPG",
              "Feature Extraction",
              "ML Model",
              "Risk Assessment",
            ].map((step, i, arr) => (
              <React.Fragment key={step}>
                <span className="px-4 py-2 rounded-lg bg-slate-50 border border-slate-200 font-medium text-slate-700">
                  {step}
                </span>
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
