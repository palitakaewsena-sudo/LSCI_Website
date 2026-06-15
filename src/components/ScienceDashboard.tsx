"use client";

import React, { useState } from "react";
import { Video, Scan, Settings2, Activity, Heart, Cpu, FileSpreadsheet, Eye, ChevronRight } from "lucide-react";

export default function ScienceDashboard() {
  const [activeTab, setActiveTab] = useState(0);

  const pipelineSteps = [
    {
      label: "LSCI Video Capture",
      desc: "CCD sensor records the raw 20 FPS dynamic backscattering laser speckle patterns from hand microcirculation beds.",
      techName: "Raw Image Acquisition",
      icon: Video,
      math: "I(x,y,t) \\text{ frame matrix arrays}",
    },
    {
      label: "ROI Detection",
      desc: "Isolates the microcirculation grid. Users drag the bounding target area to select capillary networks, filtering out bone/stationary tendon blocks.",
      techName: "Capillary Thresholding",
      icon: Scan,
      math: "ROI(x, y, w, h)",
    },
    {
      label: "Signal Processing",
      desc: "Filters intensity variance signals through a 4th-order Butterworth bandpass filter (0.5 - 4.0 Hz) and Savitzky-Golay smoothing to eliminate breathing drifts.",
      techName: "Physiological Filtering",
      icon: Settings2,
      math: "f_{low} = 0.5\\text{Hz}, \\ f_{high} = 4.0\\text{Hz}",
    },
    {
      label: "SPG Signal Generation",
      desc: "Calculates temporal speckle contrast variation over the ROI. Visualizes capillary vasomotion recoil waves (0.01 - 0.15 Hz).",
      techName: "Speckle Plethysmography",
      icon: Activity,
      math: "K_t = \\sigma_I(t) / \\langle I(t) \\rangle",
    },
    {
      label: "NIR-iPPG Extraction",
      desc: "Resolves blood volume changes in subcutaneous arterioles from ambient intensity fluctuations under near-infrared laser light (785nm).",
      techName: "Imaging Photoplethysmography",
      icon: Heart,
      math: "iPPG(t) = \\Delta I_{dermal}(t)",
    },
    {
      label: "Feature Generation",
      desc: "Extracts multi-scale entropy (Sample Entropy, Approximate Entropy) and spectral density weights from SPG & iPPG waveforms, combining them with patient BMI.",
      techName: "Feature Extraction",
      icon: FileSpreadsheet,
      math: "\\text{SampEn}(m, r, N)",
    },
    {
      label: "AI Model Execution",
      desc: "Feeds feature rows into local scikit-learn models (Ridge, Histogram Gradient Boosting Regressors). Handles missing telemetry using embedded KNN imputers.",
      techName: "Pipeline Inference",
      icon: Cpu,
      math: "\\hat{y} = f_{ensemble}(\\mathbf{X})",
    },
    {
      label: "Risk Assessment",
      desc: "Compares predicted averages against clinical criteria (NCEP ATP-III guidelines) to classify patients into Low, Moderate, or High risk bands.",
      techName: "Clinical Classification",
      icon: Eye,
      math: "\\text{Risk} \\in \\{\\text{Low, Moderate, High}\\}",
    },
  ];

  const currentStep = pipelineSteps[activeTab];

  return (
    <div className="bg-card-bg border border-card-border p-6 rounded-3xl shadow-sm space-y-6">
      <div className="space-y-1">
        <h3 className="text-lg font-bold text-foreground">
          Zycel Scientific Engineering Console
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Click on any processing stage below to inspect the mathematical transforms and engineering pipeline operations.
        </p>
      </div>

      {/* Horizontal workflow steps selection bar */}
      <div className="grid grid-cols-2 md:grid-cols-8 gap-2 border-b border-card-border pb-4">
        {pipelineSteps.map((step, idx) => {
          const Icon = step.icon;
          const isActive = activeTab === idx;

          return (
            <button
              key={step.label}
              onClick={() => setActiveTab(idx)}
              className={`p-3 rounded-xl border text-center transition flex flex-col items-center justify-between space-y-2 cursor-pointer ${
                isActive
                  ? "bg-sky-500/10 border-sky-500 text-sky-500"
                  : "bg-background border-card-border hover:bg-foreground/5 text-foreground/70"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[9px] font-bold leading-tight block select-none">
                {idx + 1}. {step.label.split(" ")[0]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Interactive Detail Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start bg-slate-50 dark:bg-slate-900/40 p-5 rounded-2xl border border-card-border/60">
        
        {/* Math & Details */}
        <div className="lg:col-span-8 space-y-4">
          <div>
            <span className="text-[10px] font-mono font-bold text-sky-500 bg-sky-500/10 px-2 py-0.5 rounded uppercase">
              {currentStep.techName}
            </span>
            <h4 className="text-base font-bold text-foreground mt-2">
              {currentStep.label}
            </h4>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            {currentStep.desc}
          </p>
        </div>

        {/* Theoretical Formula display */}
        <div className="lg:col-span-4 bg-card-bg border border-card-border p-4 rounded-xl flex flex-col items-center text-center space-y-2 self-stretch justify-center shadow-sm">
          <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest block">
            Mathematical Metric
          </span>
          <div className="text-xs font-mono font-bold text-teal-600 dark:text-teal-400 bg-slate-500/5 px-3 py-2.5 rounded-lg border border-card-border">
            $$ {currentStep.math} $$
          </div>
          <span className="text-[9px] text-slate-500 leading-snug">
            Processed at runtime in our serialized model pipelines.
          </span>
        </div>
      </div>
    </div>
  );
}
