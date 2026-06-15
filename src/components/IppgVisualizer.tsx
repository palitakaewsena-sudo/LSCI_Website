"use client";

import React, { useEffect, useState } from "react";
import { Activity, Heart, ShieldAlert } from "lucide-react";

interface IppgVisualizerProps {
  isScanning: boolean;
  videoIndex: number;
}

export default function IppgVisualizer({ isScanning, videoIndex }: IppgVisualizerProps) {
  const [points, setPoints] = useState<number[]>(Array.from({ length: 60 }, () => 50));
  const [frame, setFrame] = useState(0);
  const [isPeak, setIsPeak] = useState(false);

  // Heart rates for mock videos: Video 1 (74), Video 2 (68), Video 3 (62), Video 4 (105 Tachycardia), Video 5 (58 Athlete)
  const heartRates = [74, 68, 62, 105, 58];
  const activeHR = heartRates[videoIndex % heartRates.length];

  useEffect(() => {
    if (!isScanning) return;

    // Calculate interval based on active HR to match the pulse rate
    // If HR is 75 bpm, we get ~1.25 beats per second.
    const tickInterval = 50; // ms
    const beatsPerSec = activeHR / 60;
    const ticksPerBeat = 1000 / (tickInterval * beatsPerSec);

    const interval = setInterval(() => {
      setFrame((f) => {
        const nextFrame = f + 1;
        
        // Model a classic dicrotic-notch pulse wave
        // Cycle is represented as modulo of ticksPerBeat
        const beatProgress = (nextFrame % ticksPerBeat) / ticksPerBeat;
        
        let nextValue = 50;
        let peakActive = false;

        if (beatProgress < 0.2) {
          // Rapid systolic rise
          const factor = beatProgress / 0.2;
          nextValue = 50 - factor * 35; // Systolic peak (lower coordinate value is higher on screen)
          if (beatProgress > 0.1) peakActive = true;
        } else if (beatProgress < 0.45) {
          // Systolic decay and dicrotic notch dip
          const factor = (beatProgress - 0.2) / 0.25;
          nextValue = 15 + factor * 25; // drop down to notch
        } else if (beatProgress < 0.55) {
          // Dicrotic peak rise
          const factor = (beatProgress - 0.45) / 0.1;
          nextValue = 40 - factor * 8; // small notch bump
        } else {
          // Diastolic decay back to baseline
          const factor = (beatProgress - 0.55) / 0.45;
          nextValue = 32 + factor * 18; // slide down to 50
        }

        // Add minor noise
        nextValue += (Math.random() - 0.5) * 1.5;

        setIsPeak(peakActive);

        setPoints((prev) => {
          const nextPoints = [...prev.slice(1), 100 - nextValue]; // flip so higher values plot higher on screen
          return nextPoints;
        });

        return nextFrame;
      });
    }, tickInterval);

    return () => clearInterval(interval);
  }, [isScanning, videoIndex, activeHR]);

  const pathD = points
    .map((val, idx) => {
      const x = (idx / (points.length - 1)) * 300;
      const y = 80 - (val / 100) * 60;
      return `${idx === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");

  return (
    <div className="bg-card-bg border border-card-border p-5 rounded-2xl shadow-sm space-y-4">
      <div className="flex items-between justify-between border-b border-card-border pb-2">
        <div className="flex items-center space-x-2">
          <Activity className="w-5 h-5 text-sky-500" />
          <span className="text-sm font-bold text-foreground">
            NIR-iPPG Pulse Visualizer
          </span>
        </div>
        <span className="text-[10px] font-mono font-bold text-teal-500 uppercase bg-teal-500/10 px-2.5 py-0.5 rounded-full">
          Photoplethysmography
        </span>
      </div>

      {/* SVG Pulse graph plot */}
      <div className="bg-slate-950 rounded-xl p-4 relative h-32 flex items-center justify-center overflow-hidden border border-slate-900 shadow-inner">
        <svg className="w-full h-full" viewBox="0 0 300 80" preserveAspectRatio="none">
          {/* Grid lines */}
          <line x1="0" y1="40" x2="300" y2="40" stroke="rgba(56, 189, 248, 0.08)" strokeWidth="1" />
          <line x1="0" y1="20" x2="300" y2="20" stroke="rgba(56, 189, 248, 0.04)" strokeWidth="1" />
          <line x1="0" y1="60" x2="300" y2="60" stroke="rgba(56, 189, 248, 0.04)" strokeWidth="1" />
          
          {/* Pulse path */}
          <path
            d={pathD}
            fill="none"
            stroke="#06b6d4" /* Cyan color */
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-all duration-50s ease-linear"
          />
        </svg>

        {/* Flashing heart alert inside chart */}
        {isScanning && isPeak && (
          <div className="absolute top-2 right-2 p-1.5 rounded-lg bg-red-500/15 border border-red-500/30 text-red-500 animate-ping" />
        )}
      </div>

      {/* RHR and Pulse Telemetry */}
      <div className="grid grid-cols-3 gap-3 text-center text-[10px] font-mono border-t border-card-border/60 pt-3">
        <div className="p-2 bg-slate-50 rounded-lg dark:bg-slate-900 border border-card-border/50">
          <span className="text-foreground/50 block uppercase">Signal Lock</span>
          <span className="font-extrabold text-teal-500 block mt-0.5">
            {isScanning ? "LOCKED" : "STANDBY"}
          </span>
        </div>
        <div className="p-2 bg-slate-50 rounded-lg dark:bg-slate-900 border border-card-border/50">
          <span className="text-foreground/50 block uppercase">Heart Rate</span>
          <span className="font-extrabold text-foreground mt-0.5 flex items-center justify-center space-x-1">
            <Heart className={`w-3.5 h-3.5 text-red-500 ${isScanning && isPeak ? "scale-120 fill-red-500" : ""} transition-transform duration-75`} />
            <span>{isScanning ? activeHR : "--"} BPM</span>
          </span>
        </div>
        <div className="p-2 bg-slate-50 rounded-lg dark:bg-slate-900 border border-card-border/50">
          <span className="text-foreground/50 block uppercase">Pulse Amplitude</span>
          <span className="font-extrabold text-cyan-500 mt-0.5 block">
            {isScanning ? "1.42 mA" : "0.00"}
          </span>
        </div>
      </div>
      
      <p className="text-[9px] text-slate-500 leading-snug">
        *NIR-iPPG resolves blood volume variance in underlying dermal arterioles by filtering ambient intensity reflections at 785nm.
      </p>
    </div>
  );
}
