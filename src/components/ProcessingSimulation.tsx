"use client";

import React, { useEffect, useState } from "react";
import { Loader2, Check, UploadCloud, Cpu, Award, FileText, Settings, HeartPulse, Scan, Layers } from "lucide-react";

interface ProcessingSimulationProps {
  onComplete: () => void;
  isRunning: boolean;
}

interface Step {
  id: number;
  label: string;
  subLabel: string;
  duration: number; // millisecond duration of this step
  icon: any;
}

const PIPELINE_STEPS: Step[] = [
  {
    id: 1,
    label: "Loading LSCI Video",
    subLabel: "Loading raw speckle intensity frame arrays from local data path...",
    duration: 1200,
    icon: UploadCloud,
  },
  {
    id: 2,
    label: "Detecting ROI",
    subLabel: "Running spatial-temporal threshold filters to isolate capillary beds...",
    duration: 1200,
    icon: Scan,
  },
  {
    id: 3,
    label: "Extracting Physiological Signals",
    subLabel: "Isolating raw blood volume dynamics from intensity variations...",
    duration: 1200,
    icon: HeartPulse,
  },
  {
    id: 4,
    label: "Generating SPG",
    subLabel: "Computing Speckle Plethysmography (SPG) vasomotion oscillations...",
    duration: 1200,
    icon: Layers,
  },
  {
    id: 5,
    label: "Generating NIR-iPPG",
    subLabel: "Resolving Near-Infrared photoplethysmography pulse wave dicrotic dips...",
    duration: 1200,
    icon: Settings,
  },
  {
    id: 6,
    label: "Extracting Features",
    subLabel: "Calculating Sample Entropy, Approximate Entropy, and BMI ratios...",
    duration: 1200,
    icon: FileText,
  },
  {
    id: 7,
    label: "Running AI Models",
    subLabel: "Invoking Ridge, Random Forest and Gradient Boosting estimators...",
    duration: 1200,
    icon: Cpu,
  },
  {
    id: 8,
    label: "Generating Risk Report",
    subLabel: "Compiling NCEP ATP-III diagnostic categories and disclaimers...",
    duration: 1200,
    icon: Award,
  },
];

export default function ProcessingSimulation({ onComplete, isRunning }: ProcessingSimulationProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isRunning) {
      setCurrentStepIndex(0);
      setCompletedSteps([]);
      setProgress(0);
      return;
    }

    let isSubscribed = true;
    let stepTimer: NodeJS.Timeout;
    let progressTimer: NodeJS.Timeout;

    const runStep = (index: number) => {
      if (index >= PIPELINE_STEPS.length) {
        if (isSubscribed) {
          setProgress(100);
          setTimeout(() => {
            onComplete();
          }, 400);
        }
        return;
      }

      if (isSubscribed) {
        setCurrentStepIndex(index);
        
        const stepDuration = PIPELINE_STEPS[index].duration;
        const progressStart = (index / PIPELINE_STEPS.length) * 100;
        const progressEnd = ((index + 1) / PIPELINE_STEPS.length) * 100;
        let elapsed = 0;
        
        const tick = 35; // ms per tick
        
        const updateProgress = () => {
          if (!isSubscribed) return;
          elapsed += tick;
          const percentage = Math.min(
            progressEnd,
            progressStart + (elapsed / stepDuration) * (progressEnd - progressStart)
          );
          setProgress(percentage);
          
          if (elapsed < stepDuration) {
            progressTimer = setTimeout(updateProgress, tick);
          }
        };
        
        updateProgress();

        stepTimer = setTimeout(() => {
          if (isSubscribed) {
            setCompletedSteps((prev) => [...prev, index]);
            runStep(index + 1);
          }
        }, stepDuration);
      }
    };

    runStep(0);

    return () => {
      isSubscribed = false;
      clearTimeout(stepTimer);
      clearTimeout(progressTimer);
    };
  }, [isRunning, onComplete]);

  if (!isRunning) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4 transition-opacity duration-300">
      <div className="bg-white border border-slate-200 p-8 rounded-3xl w-full max-w-2xl shadow-2xl relative overflow-hidden flex flex-col items-center">
        
        {/* Glow overlay */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full text-center space-y-2 mb-6">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-sky-500/10 text-sky-600 mb-2 animate-bounce">
            <Loader2 className="w-7 h-7 animate-spin" />
          </div>
          <h3 className="text-xl font-extrabold text-slate-900">Zycel AI Model Processing</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Extracting speckle flow features and running clinical cardiovascular risk regression models.
          </p>
        </div>

        {/* Global Progress Bar */}
        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden mb-6 relative border border-slate-200/50">
          <div
            className="h-full bg-gradient-to-r from-sky-500 via-cyan-500 to-teal-400 rounded-full transition-all duration-300 relative shadow-sm"
            style={{ width: `${progress}%` }}
          />
          <span className="absolute right-0 top-3 text-[10px] font-mono font-bold text-slate-400">
            {Math.round(progress)}% Complete
          </span>
        </div>

        {/* Steps List */}
        <div className="w-full space-y-3.5 max-h-[300px] overflow-y-auto pr-2">
          {PIPELINE_STEPS.map((step, idx) => {
            const isCompleted = completedSteps.includes(idx);
            const isActive = currentStepIndex === idx;
            const Icon = step.icon;

            return (
              <div
                key={step.id}
                className={`flex items-start space-x-3.5 p-3 rounded-xl transition duration-200 border ${
                  isActive
                    ? "bg-sky-500/5 border-sky-500/20"
                    : "border-transparent"
                }`}
              >
                <div
                  className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
                    isCompleted
                      ? "bg-emerald-500/10 text-emerald-600"
                      : isActive
                      ? "bg-sky-500/10 text-sky-600 animate-pulse-slow"
                      : "bg-slate-100 text-slate-300"
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4" />
                  ) : isActive ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Icon className="w-3.5 h-3.5" />
                  )}
                </div>

                <div className="flex-grow">
                  <span
                    className={`text-xs font-bold block leading-none ${
                      isActive ? "text-sky-600" : isCompleted ? "text-slate-800" : "text-slate-400"
                    }`}
                  >
                    {step.label}
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-1 leading-snug">
                    {step.subLabel}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
