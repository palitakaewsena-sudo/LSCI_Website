"use client";

import React, { useState } from "react";
import { Film, CheckCircle, Info, Cpu, Eye } from "lucide-react";
import SpeckleCanvas from "./SpeckleCanvas";

export interface LsciVideo {
  id: number;
  filename: string;
  targetArea: string;
  duration: number;
  fps: number;
  perfusionIndex: number;
  roiCoords: { x: number; y: number; w: number; h: number };
  description: string;
  patientProfile: string;
}

export const SAMPLE_VIDEOS: LsciVideo[] = [
  {
    id: 1,
    filename: "235-1_video.avi",
    targetArea: "Index Finger (Dorsal)",
    duration: 15.0,
    fps: 20.0,
    perfusionIndex: 12.4,
    roiCoords: { x: 140, y: 100, w: 60, h: 60 },
    description: "Healthy vascular control. High microvascular response and regular vasomotor oscillations.",
    patientProfile: "Healthy Control (Expected Low Lipid Risk)",
  },
  {
    id: 2,
    filename: "236-1_video.avi",
    targetArea: "Inner Wrist (Radial)",
    duration: 15.0,
    fps: 20.0,
    perfusionIndex: 8.9,
    roiCoords: { x: 130, y: 110, w: 60, h: 60 },
    description: "Mild perfusion fluctuations. Damped vasomotor wave amplitude. Indication of moderate vessel elasticity loss.",
    patientProfile: "Borderline Metabolic (Expected Moderate Lipid Risk)",
  },
  {
    id: 3,
    filename: "237-1_video.avi",
    targetArea: "Index Finger (Dorsal)",
    duration: 15.0,
    fps: 20.0,
    perfusionIndex: 5.2,
    roiCoords: { x: 170, y: 130, w: 60, h: 60 },
    description: "Severely sluggish microcirculation. Low capillary density mapping with high backscatter intensity fluctuation.",
    patientProfile: "Vascular Pervasive Plaque (Expected High Lipid Risk)",
  },
  {
    id: 4,
    filename: "238-1_video.avi",
    targetArea: "Forearm (Ventral)",
    duration: 15.0,
    fps: 20.0,
    perfusionIndex: 14.1,
    roiCoords: { x: 110, y: 120, w: 60, h: 60 },
    description: "Hyperemic response signal. Rapid heart rate pulse tracking with standard lipid spectral features.",
    patientProfile: "Elevated Heart Rate Control (Expected Normal Lipids / High HR Risk)",
  },
  {
    id: 5,
    filename: "239-1_video.avi",
    targetArea: "Index Finger (Dorsal)",
    duration: 15.0,
    fps: 20.0,
    perfusionIndex: 15.6,
    roiCoords: { x: 150, y: 90, w: 60, h: 60 },
    description: "High compliance athletic perfusion. Regular and deep vasomotor waves with minimal spectral noise.",
    patientProfile: "Cardiovascular Athlete Control (Expected Very Low Lipid Risk)",
  },
];

interface VideoSelectorProps {
  onVideoSelected: (video: LsciVideo) => void;
  selectedVideo?: LsciVideo;
}

export default function VideoSelector({ onVideoSelected, selectedVideo }: VideoSelectorProps) {
  const [activeVideo, setActiveVideo] = useState<LsciVideo>(selectedVideo || SAMPLE_VIDEOS[0]);

  const handleSelect = (video: LsciVideo) => {
    setActiveVideo(video);
    onVideoSelected(video);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Video Selection Grid List - Left Column */}
      <div className="lg:col-span-5 space-y-3">
        <h3 className="text-lg font-bold text-foreground mb-4 flex items-center space-x-2">
          <Film className="w-5 h-5 text-sky-500" />
          <span>2. Select LSCI Signal Video</span>
        </h3>
        
        <div className="space-y-2">
          {SAMPLE_VIDEOS.map((video) => {
            const isSelected = activeVideo.id === video.id;
            return (
              <button
                key={video.id}
                type="button"
                onClick={() => handleSelect(video)}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? "bg-sky-500/10 border-sky-500 text-sky-500 neon-glow"
                    : "bg-card-bg border-card-border hover:bg-foreground/5 text-foreground"
                }`}
              >
                <div className="pr-4">
                  <span className="font-mono text-xs block opacity-60">
                    ID: #{video.id} | {video.filename}
                  </span>
                  <span className="font-bold text-sm block mt-0.5">
                    {video.targetArea}
                  </span>
                  <span className="text-xs block opacity-85 mt-1 font-semibold text-slate-500 dark:text-slate-400">
                    {video.patientProfile}
                  </span>
                </div>
                {isSelected && <CheckCircle className="w-5 h-5 text-sky-500 flex-shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Video Preview and Capture Info Panel - Right Column */}
      <div className="lg:col-span-7 space-y-4">
        {/* Dynamic LSCI Speckle Canvas Live Feed */}
        <SpeckleCanvas
          isPlaying={true}
          videoIndex={activeVideo.id - 1}
        />
        
        {/* Capture Information Panel */}
        <div className="bg-card-bg border border-card-border p-4 rounded-2xl space-y-3">
          <h4 className="text-sm font-bold text-foreground flex items-center space-x-1.5 border-b border-card-border pb-2">
            <Info className="w-4 h-4 text-sky-500" />
            <span>LSCI Capture Information</span>
          </h4>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-mono">
            <div>
              <span className="text-foreground/55 block">File Format</span>
              <span className="font-semibold text-foreground">{activeVideo.filename}</span>
            </div>
            <div>
              <span className="text-foreground/55 block">Acquisition Length</span>
              <span className="font-semibold text-foreground">{activeVideo.duration} seconds</span>
            </div>
            <div>
              <span className="text-foreground/55 block">Frame Rate</span>
              <span className="font-semibold text-foreground">{activeVideo.fps} FPS</span>
            </div>
            <div>
              <span className="text-foreground/55 block">Anatomical Target</span>
              <span className="font-semibold text-foreground">{activeVideo.targetArea}</span>
            </div>
            <div>
              <span className="text-foreground/55 block">Mean Perfusion</span>
              <span className="font-semibold text-foreground">{activeVideo.perfusionIndex} PU</span>
            </div>
            <div>
              <span className="text-foreground/55 block">Default ROI Coordinates</span>
              <span className="font-semibold text-emerald-500">[{activeVideo.roiCoords.x}, {activeVideo.roiCoords.y}, 60, 60]</span>
            </div>
          </div>
          
          <div className="bg-slate-500/5 p-3 rounded-lg border border-card-border text-[11px] leading-relaxed text-foreground/80 space-y-1">
            <span className="font-bold flex items-center space-x-1 text-sky-500 text-xs">
              <Cpu className="w-3.5 h-3.5" />
              <span>Microcirculation Assessment</span>
            </span>
            <p>{activeVideo.description}</p>
            <p className="text-slate-400 italic text-[10px] mt-1">
              &quot;LSCI microcirculation video acquired from our prototype system.&quot;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
