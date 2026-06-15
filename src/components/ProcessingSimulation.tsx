"use client";

import React, { useState, useEffect } from "react";
import { CheckCircle, Loader2, Activity } from "lucide-react";

const STAGES = [
  { id: "load", label: "กำลังโหลดวิดีโอ LSCI", duration: 800 },
  { id: "roi", label: "กำลังตรวจจับ ROI", duration: 1000 },
  { id: "spg", label: "กำลังสกัดสัญญาณ SPG", duration: 1200 },
  { id: "nir", label: "กำลังสกัดสัญญาณ NIR-iPPG", duration: 1200 },
  { id: "feat", label: "กำลังคำนวณคุณลักษณะสัญญาณ", duration: 1500 },
  { id: "prep", label: "กำลังเตรียมข้อมูลสำหรับโมเดล", duration: 800 },
  { id: "ml", label: "กำลังประมวลผลโมเดล Machine Learning", duration: 2000 },
  { id: "rep", label: "กำลังสร้างรายงานผลการประเมิน", duration: 1000 },
];

interface ProcessingSimulationProps {
  isActive: boolean;
  onComplete: () => void;
}

export default function ProcessingSimulation({ isActive, onComplete }: ProcessingSimulationProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    let currentIdx = 0;
    let totalTimeElapsed = 0;
    const totalDuration = STAGES.reduce((acc, stage) => acc + stage.duration, 0);

    const runStage = () => {
      if (currentIdx >= STAGES.length) {
        setProgress(100);
        setTimeout(onComplete, 500);
        return;
      }

      setCurrentStep(currentIdx);
      const stageDuration = STAGES[currentIdx].duration;

      // Smooth progress bar update for this stage
      const startTime = Date.now();
      const progressInterval = setInterval(() => {
        const elapsedInStage = Date.now() - startTime;
        const currentProgress = ((totalTimeElapsed + Math.min(elapsedInStage, stageDuration)) / totalDuration) * 100;
        setProgress(Math.min(currentProgress, 99));
      }, 50);

      setTimeout(() => {
        clearInterval(progressInterval);
        totalTimeElapsed += stageDuration;
        currentIdx++;
        runStage();
      }, stageDuration);
    };

    runStage();
  }, [isActive, onComplete]);

  if (!isActive) return null;

  const estimatedRemaining = Math.max(0, 10 - Math.floor((progress / 100) * 10));

  return (
    <div className="sci-card relative overflow-hidden bg-white shadow-xl shadow-sky-900/5 border-sky-100 p-8 sm:p-12">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-sky-50 rounded-full blur-3xl opacity-50 pointer-events-none" />

      <div className="max-w-xl mx-auto flex flex-col items-center text-center">
        {/* Animated Logo */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-sky-200 rounded-full blur-xl animate-pulse opacity-60" />
          <div className="w-24 h-24 bg-gradient-to-br from-sky-500 to-cyan-600 rounded-full flex items-center justify-center relative z-10 shadow-lg shadow-sky-500/30">
            <Activity className="w-12 h-12 text-white animate-pulse" />
          </div>
          {/* Orbiting dots */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-sky-200 rounded-full animate-[spin_4s_linear_infinite]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-sky-100 rounded-full animate-[spin_6s_linear_infinite_reverse]" />
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-2">
          Zycel Analysis Engine
        </h3>
        <p className="text-slate-500 mb-8">
          กำลังวิเคราะห์สัญญาณทางสรีรวิทยา...
        </p>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 rounded-full h-2.5 mb-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-sky-500 to-cyan-500 h-2.5 rounded-full transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="w-full flex justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider mb-8">
          <span>{progress.toFixed(0)}% Complete</span>
          <span>~ {estimatedRemaining}s remaining</span>
        </div>

        {/* Status List */}
        <div className="w-full text-left space-y-3">
          {STAGES.map((stage, i) => {
            const isDone = i < currentStep;
            const isCurrent = i === currentStep;
            const isPending = i > currentStep;

            return (
              <div
                key={stage.id}
                className={`flex items-center gap-4 transition-all duration-300 ${
                  isCurrent ? "opacity-100 translate-x-2" : isPending ? "opacity-30" : "opacity-60"
                }`}
              >
                {isDone ? (
                  <CheckCircle className="w-5 h-5 text-sky-500 flex-shrink-0" />
                ) : isCurrent ? (
                  <Loader2 className="w-5 h-5 text-sky-600 animate-spin flex-shrink-0" />
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-slate-200 flex-shrink-0" />
                )}
                <span
                  className={`text-sm font-medium ${
                    isCurrent ? "text-sky-800 font-bold" : "text-slate-600"
                  }`}
                >
                  {stage.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
