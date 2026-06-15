"use client";

import React, { useEffect, useState } from "react";
import { Activity, ShieldCheck, HeartPulse } from "lucide-react";

interface SpgVisualizerProps {
  isScanning: boolean;
  videoIndex: number;
}

export default function SpgVisualizer({ isScanning, videoIndex }: SpgVisualizerProps) {
  const [points, setPoints] = useState<number[]>(Array.from({ length: 50 }, () => 50));
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    if (!isScanning) return;

    const interval = setInterval(() => {
      setFrame((f) => {
        const nextFrame = f + 1;
        
        // Generate a composite slow vasomotion wave + cardiac pulse ripple
        // Vasomotion frequency (0.1 Hz): sin(frame * 0.05)
        // Cardiac ripple (1.2 Hz): sin(frame * 0.4) * 0.15
        const vasomotion = Math.sin(nextFrame * 0.06 + videoIndex) * 20;
        const cardiacRipple = Math.sin(nextFrame * 0.45) * 4;
        const noise = (Math.random() - 0.5) * 1.5;
        
        // Final value centered around 50 (baseline)
        const nextValue = Math.max(10, Math.min(90, 50 + vasomotion + cardiacRipple + noise));

        setPoints((prev) => {
          const nextPoints = [...prev.slice(1), nextValue];
          return nextPoints;
        });

        return nextFrame;
      });
    }, 80); // Updates every 80ms for a smooth real-time sweep

    return () => clearInterval(interval);
  }, [isScanning, videoIndex]);

  // Construct SVG Polyline path points
  const pathD = points
    .map((val, idx) => {
      const x = (idx / (points.length - 1)) * 300;
      const y = 80 - (val / 100) * 60; // scale value to SVG coordinate
      return `${idx === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");

  // Perfusion telemetry based on chosen video index
  const perfusionValues = [12.4, 8.9, 5.2, 14.1, 15.6];
  const perfusionVal = perfusionValues[videoIndex % perfusionValues.length];

  return (
    <div className="bg-card-bg border border-card-border p-5 rounded-2xl shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-card-border pb-2">
        <div className="flex items-center space-x-2">
          <Activity className="w-5 h-5 text-sky-500" />
          <span className="text-sm font-bold text-foreground">
            SPG Waveform Visualizer
          </span>
        </div>
        <span className="text-[10px] font-mono font-bold text-sky-500 uppercase bg-sky-500/10 px-2.5 py-0.5 rounded-full">
          Speckle Plethysmography
        </span>
      </div>

      {/* SVG Waveform Plot */}
      <div className="bg-slate-950 rounded-xl p-4 relative h-32 flex items-center justify-center overflow-hidden border border-slate-900 shadow-inner">
        <svg className="w-full h-full" viewBox="0 0 300 80" preserveAspectRatio="none">
          {/* Grid lines */}
          <line x1="0" y1="40" x2="300" y2="40" stroke="rgba(56, 189, 248, 0.08)" strokeWidth="1" />
          <line x1="0" y1="20" x2="300" y2="20" stroke="rgba(56, 189, 248, 0.04)" strokeWidth="1" />
          <line x1="0" y1="60" x2="300" y2="60" stroke="rgba(56, 189, 248, 0.04)" strokeWidth="1" />
          
          {/* Live drawing path */}
          <path
            d={pathD}
            fill="none"
            stroke="#2dd4bf" /* Teal color */
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-all duration-75 ease-linear"
          />
        </svg>

        {/* Scanline indicator */}
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-r from-transparent to-teal-500/10 border-r border-teal-500/30 animate-pulse" />
      </div>

      {/* Signal Quality & Telemetry Metrics */}
      <div className="grid grid-cols-3 gap-3 text-center text-[10px] font-mono border-t border-card-border/60 pt-3">
        <div className="p-2 bg-slate-50 rounded-lg dark:bg-slate-900 border border-card-border/50">
          <span className="text-foreground/50 block uppercase">Signal Quality</span>
          <span className="font-extrabold text-emerald-500 flex items-center justify-center space-x-0.5 mt-0.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>98.6%</span>
          </span>
        </div>
        <div className="p-2 bg-slate-50 rounded-lg dark:bg-slate-900 border border-card-border/50">
          <span className="text-foreground/50 block uppercase">Perfusion Index</span>
          <span className="font-extrabold text-foreground mt-0.5 block">
            {isScanning ? perfusionVal : "0.0"} PU
          </span>
        </div>
        <div className="p-2 bg-slate-50 rounded-lg dark:bg-slate-900 border border-card-border/50">
          <span className="text-foreground/50 block uppercase">Recoil Frequency</span>
          <span className="font-extrabold text-sky-500 mt-0.5 block flex items-center justify-center space-x-0.5">
            <HeartPulse className="w-3.5 h-3.5" />
            <span>0.09 Hz</span>
          </span>
        </div>
      </div>
      
      <p className="text-[9px] text-slate-500 leading-snug">
        *SPG records red blood cell velocity fluctuations in superficial capillary beds under coherent laser scatter dynamics.
      </p>
    </div>
  );
}
