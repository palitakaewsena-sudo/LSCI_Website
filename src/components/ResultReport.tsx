"use client";

import React, { useEffect, useState } from "react";
import { Award, AlertTriangle, Printer, RotateCcw, ShieldAlert, CheckCircle, ArrowRight } from "lucide-react";
import { LsciVideo } from "./VideoSelector";
import { PatientData } from "./PatientForm";
import canvasConfetti from "canvas-confetti";

export type RiskLevel = "Low" | "Moderate" | "High";

export interface ScreeningResults {
  tgRisk: RiskLevel;
  ldlRisk: RiskLevel;
  hdlRisk: RiskLevel;
  aipRisk: RiskLevel;
  hrRisk: RiskLevel;
  rawEstimates?: {
    tg: number;
    ldl: number;
    hdl: number;
    aip: number;
    hr: number;
  };
}

interface ResultReportProps {
  patientData: PatientData;
  video: LsciVideo;
  results: ScreeningResults;
  onReset: () => void;
}

// Reusable SVG Semi-Circle Gauge Component
function RiskGauge({ label, value, risk }: { label: string; value: number; risk: RiskLevel }) {
  // Determine color coding
  const colorMap = {
    Low: { stroke: "#10b981", text: "text-emerald-500", bg: "bg-emerald-500/10" },
    Moderate: { stroke: "#f59e0b", text: "text-amber-500", bg: "bg-amber-500/10" },
    High: { stroke: "#ef4444", text: "text-red-500", bg: "bg-red-500/10" },
  };

  const currentColors = colorMap[risk] || colorMap.Low;
  
  // SVG Arc calculation parameters
  const radius = 50;
  const strokeWidth = 10;
  const circumference = Math.PI * radius; // Half-circle path
  // Map value (0 to 100) to dashoffset
  const percentage = Math.min(100, Math.max(0, value));
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center p-4 bg-card-bg border border-card-border rounded-2xl shadow-sm text-center">
      <span className="text-xs font-bold text-foreground/75 tracking-wider uppercase mb-2">
        {label}
      </span>
      
      <div className="relative w-28 h-16 flex items-center justify-center overflow-hidden">
        <svg className="w-28 h-28 absolute top-0" viewBox="0 0 120 120">
          {/* Background Arc */}
          <path
            d="M 10 70 A 50 50 0 0 1 110 70"
            fill="none"
            stroke="rgba(148, 163, 184, 0.15)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          {/* Active Arc */}
          <path
            d="M 10 70 A 50 50 0 0 1 110 70"
            fill="none"
            stroke={currentColors.stroke}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <span className={`text-base font-extrabold uppercase mt-6 tracking-wide ${currentColors.text}`}>
          {risk}
        </span>
      </div>
      
      <span className={`text-[10px] mt-1.5 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${currentColors.bg} ${currentColors.text}`}>
        Risk Score: {Math.round(percentage)}/100
      </span>
    </div>
  );
}

export default function ResultReport({ patientData, video, results, onReset }: ResultReportProps) {
  const [downloading, setDownloading] = useState(false);

  // Trigger celebratory confetti if all indices are Low Risk
  useEffect(() => {
    const isAllLow = 
      results.tgRisk === "Low" && 
      results.ldlRisk === "Low" && 
      results.hdlRisk === "Low" && 
      results.aipRisk === "Low" && 
      results.hrRisk === "Low";
      
    if (isAllLow) {
      canvasConfetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
      });
    }
  }, [results]);

  const handlePrint = () => {
    setDownloading(true);
    setTimeout(() => {
      window.print();
      setDownloading(false);
    }, 1000);
  };

  // Convert RiskLevel to numerical indicator for Gauges
  const getRiskNum = (risk: RiskLevel) => {
    if (risk === "Low") return 25;
    if (risk === "Moderate") return 60;
    return 90;
  };

  // Metric metadata for detailed cards
  const metricCards = [
    {
      title: "Triglycerides (TG) Risk",
      key: "tgRisk",
      risk: results.tgRisk,
      desc: "Measures TG levels, which are fat energy reserves. High risk is associated with fatty liver disease, metabolic syndrome, and vascular wall thickening.",
      boundary: "Low: <150 mg/dL | Moderate: 150-199 mg/dL | High: >=200 mg/dL",
    },
    {
      title: "LDL Cholesterol Risk",
      key: "ldlRisk",
      risk: results.ldlRisk,
      desc: "Low-Density Lipoprotein, the 'bad' cholesterol. Drives cholesterol deposit accumulation on arterial walls, forming dangerous calcified plaques.",
      boundary: "Low: <130 mg/dL | Moderate: 130-159 mg/dL | High: >=160 mg/dL",
    },
    {
      title: "HDL Cholesterol Risk",
      key: "hdlRisk",
      risk: results.hdlRisk,
      desc: "High-Density Lipoprotein, the protective 'good' cholesterol. High risk represents deficient levels, leaving arteries vulnerable to plaque deposit damage.",
      boundary: "Low: >=60 mg/dL | Moderate: 40-59 mg/dL | High: <40 mg/dL",
    },
    {
      title: "Atherogenic Index of Plasma (AIP) Risk",
      key: "aipRisk",
      risk: results.aipRisk,
      desc: "Calculated log ratio of Triglycerides to HDL-C. A strong clinical risk predictor for metabolic plaque index and acute coronary syndromes.",
      boundary: "Low: <0.11 | Moderate: 0.11-0.24 | High: >0.24",
    },
    {
      title: "Heart Rate (HR) Risk",
      key: "hrRisk",
      risk: results.hrRisk,
      desc: "Resting pulse signals collected from spatial ROI. Persistent deviations suggest autonomic nervous system stress or cardiovascular fatigue.",
      boundary: "Low: 60-100 bpm | Moderate: 50-59 or 101-110 bpm | High: <50 or >110 bpm",
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in print:bg-white print:text-black">
      {/* Success Title Banner */}
      <div className="bg-emerald-500/10 border border-emerald-500/20 p-6 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-500 flex items-center justify-center">
            <CheckCircle className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground">AI Screening Completed</h3>
            <p className="text-xs text-foreground/60 mt-0.5">
              Zycel AI models & NCEP ATP-III criteria screening completed.
            </p>
          </div>
        </div>
        <div className="flex space-x-3 print:hidden">
          <button
            onClick={handlePrint}
            disabled={downloading}
            className="px-4 py-2 text-xs font-semibold border border-card-border hover:bg-foreground/5 rounded-xl flex items-center space-x-2 transition cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>{downloading ? "Formatting..." : "Print Report"}</span>
          </button>
          <button
            onClick={onReset}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 dark:bg-sky-500 dark:hover:bg-sky-600 rounded-xl flex items-center space-x-2 transition cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>New Screening</span>
          </button>
        </div>
      </div>

      {/* Patient & Signal Metadata Table */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card-bg border border-card-border p-5 rounded-2xl shadow-sm space-y-3">
          <h4 className="text-sm font-bold text-foreground uppercase tracking-wider border-b border-card-border pb-2">
            Patient Information
          </h4>
          <table className="w-full text-sm">
            <tbody>
              <tr className="border-b border-card-border/40 py-2 block flex justify-between">
                <td className="text-foreground/50">Biological Sex</td>
                <td className="font-semibold text-foreground capitalize">{patientData.gender}</td>
              </tr>
              <tr className="border-b border-card-border/40 py-2 block flex justify-between">
                <td className="text-foreground/50">Subject Age</td>
                <td className="font-semibold text-foreground">{patientData.age} Years</td>
              </tr>
              <tr className="border-b border-card-border/40 py-2 block flex justify-between">
                <td className="text-foreground/50">Height & Weight</td>
                <td className="font-semibold text-foreground">
                  {patientData.height} cm / {patientData.weight} kg
                </td>
              </tr>
              <tr className="py-2 block flex justify-between">
                <td className="text-foreground/50">Body Mass Index (BMI)</td>
                <td className="font-semibold text-foreground font-mono">
                  {patientData.bmi} kg/m&sup2;
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-card-bg border border-card-border p-5 rounded-2xl shadow-sm space-y-3">
          <h4 className="text-sm font-bold text-foreground uppercase tracking-wider border-b border-card-border pb-2">
            Signal Input Source
          </h4>
          <table className="w-full text-sm">
            <tbody>
              <tr className="border-b border-card-border/40 py-2 block flex justify-between">
                <td className="text-foreground/50">LSCI File</td>
                <td className="font-semibold text-foreground font-mono">{video.filename}</td>
              </tr>
              <tr className="border-b border-card-border/40 py-2 block flex justify-between">
                <td className="text-foreground/50">Vascular Site</td>
                <td className="font-semibold text-foreground">{video.targetArea}</td>
              </tr>
              <tr className="border-b border-card-border/40 py-2 block flex justify-between">
                <td className="text-foreground/50">FPS & Capture Range</td>
                <td className="font-semibold text-foreground">{video.fps} FPS | {video.duration}s</td>
              </tr>
              <tr className="py-2 block flex justify-between">
                <td className="text-foreground/50">Laser Speckle ROI</td>
                <td className="font-semibold text-emerald-500 font-mono">
                  [{video.roiCoords.x}, {video.roiCoords.y}, 60, 60]
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* SVG Arc Gauges Row */}
      <div>
        <h4 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">
          Risk Classification Gauges
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <RiskGauge label="TG Risk" value={getRiskNum(results.tgRisk)} risk={results.tgRisk} />
          <RiskGauge label="LDL Risk" value={getRiskNum(results.ldlRisk)} risk={results.ldlRisk} />
          <RiskGauge label="HDL Risk" value={getRiskNum(results.hdlRisk)} risk={results.hdlRisk} />
          <RiskGauge label="AIP Risk" value={getRiskNum(results.aipRisk)} risk={results.aipRisk} />
          <RiskGauge label="HR Risk" value={getRiskNum(results.hrRisk)} risk={results.hrRisk} />
        </div>
      </div>

      {/* Detailed Risk Level Card list */}
      <div className="space-y-4">
        <h4 className="text-sm font-bold text-foreground uppercase tracking-wider">
          Diagnostic Risk Breakdown
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {metricCards.map((card) => {
            const riskColors = {
              Low: "border-emerald-500/20 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400",
              Moderate: "border-amber-500/20 bg-amber-500/5 text-amber-600 dark:text-amber-400",
              High: "border-red-500/20 bg-red-500/5 text-red-600 dark:text-red-400",
            }[card.risk];

            return (
              <div
                key={card.title}
                className={`p-5 rounded-2xl border ${riskColors} flex flex-col justify-between space-y-3`}
              >
                <div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-foreground text-sm">{card.title}</span>
                    <span className="text-xs uppercase font-extrabold px-2.5 py-0.5 rounded-full bg-foreground/10">
                      {card.risk} Risk
                    </span>
                  </div>
                  <p className="text-xs text-foreground/75 mt-2 leading-relaxed">{card.desc}</p>
                </div>
                <div className="border-t border-card-border/30 pt-2 flex items-center justify-between text-[10px] font-mono text-foreground/50">
                  <span>Clinical Bounds Reference</span>
                  <span>{card.boundary}</span>
                </div>
              </div>
            );
          })}
          
          {/* Action Call for Clinician */}
          <div className="p-5 rounded-2xl border border-dashed border-sky-500/30 bg-sky-500/5 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <span className="font-bold text-foreground text-sm flex items-center space-x-1">
                <ShieldAlert className="w-4 h-4 text-sky-500" />
                <span>Next Screening Steps</span>
              </span>
              <p className="text-xs text-foreground/70 leading-relaxed">
                Need verification? Users are encouraged to schedule a clinic visit for traditional laboratory panel blood tests to cross-reference this prototype speckle capture.
              </p>
            </div>
            <button
              onClick={() => window.location.href = "/contact"}
              className="py-2.5 px-4 bg-sky-500 text-white text-xs font-semibold rounded-xl hover:bg-sky-600 transition flex items-center justify-center space-x-1 self-start cursor-pointer"
            >
              <span>Consult Clinical Research Team</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Warning Box + Medical Disclaimer */}
      <div className="bg-red-500/5 border border-red-500/20 p-5 rounded-2xl flex items-start space-x-3 text-xs leading-relaxed text-foreground/80">
        <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-red-500 block mb-1">Clinical Screening Disclaimer</span>
          This screening result is intended for preliminary assessment only and is not a substitute for clinical laboratory testing or professional medical diagnosis. Do not make pharmaceutical or dietary adjustments based on these simulated bands without first consulting a board-certified physician.
        </div>
      </div>
    </div>
  );
}
