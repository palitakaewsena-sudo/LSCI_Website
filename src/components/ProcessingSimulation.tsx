"use client";

import React, { useState, useEffect } from "react";
import { CheckCircle, Loader2 } from "lucide-react";

const STEPS = [
  "โหลดวิดีโอ LSCI",
  "ตรวจจับ ROI",
  "สกัดสัญญาณ",
  "สร้างสัญญาณ SPG",
  "สร้างสัญญาณ NIR-iPPG",
  "สกัดคุณลักษณะ",
  "ประเมินระดับความเสี่ยง",
];

interface ProcessingSimulationProps {
  isActive: boolean;
  onComplete: () => void;
}

export default function ProcessingSimulation({
  isActive,
  onComplete,
}: ProcessingSimulationProps) {
  const [currentStep, setCurrentStep] = useState(-1);

  useEffect(() => {
    if (!isActive) {
      setCurrentStep(-1);
      return;
    }

    setCurrentStep(0);
    let step = 0;

    const interval = setInterval(() => {
      step++;
      if (step >= STEPS.length) {
        clearInterval(interval);
        setTimeout(onComplete, 400);
      } else {
        setCurrentStep(step);
      }
    }, 600);

    return () => clearInterval(interval);
  }, [isActive, onComplete]);

  if (!isActive && currentStep === -1) return null;

  return (
    <div className="sci-card">
      <h3 className="text-base font-bold text-slate-800 mb-4">
        กำลังประมวลผล...
      </h3>

      <div className="space-y-2.5">
        {STEPS.map((label, i) => {
          const isDone = i < currentStep || (i === STEPS.length - 1 && currentStep >= STEPS.length - 1);
          const isCurrent = i === currentStep && currentStep < STEPS.length;
          const isPending = i > currentStep;

          return (
            <div
              key={i}
              className={`flex items-center gap-3 py-2 px-3 rounded-lg transition-all ${
                isDone ? "step-enter" : ""
              } ${isCurrent ? "bg-sky-50" : ""}`}
            >
              {isDone ? (
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
              ) : isCurrent ? (
                <Loader2 className="w-5 h-5 text-sky-600 animate-spin flex-shrink-0" />
              ) : (
                <div className="w-5 h-5 rounded-full border-2 border-slate-200 flex-shrink-0" />
              )}
              <span
                className={`text-sm font-medium ${
                  isDone
                    ? "text-green-700"
                    : isCurrent
                    ? "text-sky-700"
                    : "text-slate-400"
                }`}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
