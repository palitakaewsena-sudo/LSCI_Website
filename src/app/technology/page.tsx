"use client";

import React from "react";
import { Cpu, Video, Settings, Activity, ShieldCheck, Heart } from "lucide-react";
import ScienceDashboard from "@/components/ScienceDashboard";
import ModelSection from "@/components/ModelSection";

export default function Technology() {
  const pipelineSteps = [
    {
      step: 1,
      name: "Video Acquisition",
      desc: "Illuminate arm skin tissues with a low-power, single-mode laser diode (785nm). A high-speed CCD sensor captures backscattered light, generating frame sequences.",
      icon: Video,
      color: "border-sky-500/20 bg-sky-500/5 text-sky-600",
    },
    {
      step: 2,
      name: "Signal Extraction",
      desc: "Processes intensity variance signals on Capillary beds within the designated Region of Interest (ROI), tracking dynamic fluctuations.",
      icon: Settings,
      color: "border-teal-500/20 bg-teal-500/5 text-teal-600",
    },
    {
      step: 3,
      name: "SPG Generation",
      desc: "Calculates temporal speckle contrast variations over the ROI frames to compute dynamic Speckle Plethysmography (SPG) vasomotion waves.",
      icon: Activity,
      color: "border-indigo-500/20 bg-indigo-500/5 text-indigo-600",
    },
    {
      step: 4,
      name: "NIR-iPPG Generation",
      desc: "Extracts pulsatile arterial volume change signals (Near-Infrared Imaging Photoplethysmography) from ambient intensity reflection cycles.",
      icon: Heart,
      color: "border-cyan-500/20 bg-cyan-500/5 text-cyan-600",
    },
    {
      step: 5,
      name: "Feature Extraction",
      desc: "Computes multi-scale entropy metrics (Sample Entropy, Approximate Entropy) and spectral density parameters from both SPG and iPPG waveforms.",
      icon: Cpu,
      color: "border-emerald-500/20 bg-emerald-500/5 text-emerald-600",
    },
    {
      step: 6,
      name: "Risk Classification",
      desc: "Feeds feature rows into trained scikit-learn models, evaluating predicted values against NCEP ATP-III criteria to classify cardiovascular risk.",
      icon: ShieldCheck,
      color: "border-sky-500/20 bg-sky-500/5 text-sky-600",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 text-slate-900 bg-slate-50/50">
      
      {/* Title Header */}
      <div className="space-y-4 max-w-3xl">
        <span className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-600 text-xs font-semibold uppercase tracking-wider">
          <Cpu className="w-3.5 h-3.5" />
          <span>Core Technology</span>
        </span>
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
          Laser Speckle Contrast Imaging & AI
        </h1>
        <p className="text-slate-500 leading-relaxed text-sm sm:text-base">
          Zycel translates dynamic laser scatter patterns into cardiorespiratory and blood lipid risk metrics using physical optics, capillary extraction filters, and serialized machine learning models.
        </p>
      </div>

      {/* Physics / Scientific Formula Section */}
      <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-8 space-y-4">
          <h3 className="text-lg font-bold text-slate-900">
            The Physics of Laser Speckle Contrast
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            When a coherent laser beam illuminates biological tissue, the backscattered light forms a random interference pattern known as a **speckle pattern**. If the scattering particles (such as red blood cells in microcirculation capillaries) are moving, the speckle pattern fluctuates, causing visual blurring.
          </p>
          <p className="text-xs text-slate-500 leading-relaxed">
            By calculating the local spatial or temporal speckle contrast ($K$), we can extract the blood perfusion velocity. Areas of high flow yield lower contrast (high blurring), whereas stationary tissue yields high contrast.
          </p>
        </div>
        <div className="lg:col-span-4 bg-slate-50 p-5 rounded-2xl border border-slate-200 flex flex-col items-center text-center">
          <span className="text-[10px] uppercase text-slate-400 font-bold mb-3 tracking-wider">
            Contrast Mathematical Ratio
          </span>
          <div className="text-2xl font-serif text-teal-600 py-3 font-semibold font-mono">
            K = &sigma; / &lt;I&gt;
          </div>
          <span className="text-[10px] text-slate-500 leading-relaxed mt-2">
            Where &sigma; represents the standard deviation of intensity, and &lt;I&gt; is the mean intensity of the speckle region.
          </span>
        </div>
      </div>

      {/* Engineering Pipeline Dashboard section */}
      <ScienceDashboard />

      {/* Animated Pipeline Diagram Section */}
      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-200 pb-3">
          Capillary Perfusion Extraction Roadmap
        </h2>

        {/* Horizontal Pipeline Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-4 py-2">
          {pipelineSteps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.step}
                className="p-5 bg-white border border-slate-200 hover:border-sky-500/40 rounded-2xl flex flex-col justify-between space-y-4 shadow-sm transition"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block">
                    Step 0{step.step}
                  </span>
                  <h3 className="font-bold text-slate-950 text-xs leading-tight">
                    {step.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 leading-relaxed mt-1">
                    {step.desc}
                  </p>
                </div>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center self-start border ${step.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI Model Architecture Section */}
      <ModelSection />

    </div>
  );
}
