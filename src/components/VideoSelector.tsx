"use client";

import React, { useState } from "react";
import { Film, CheckCircle } from "lucide-react";

export interface LsciVideo {
  id: number;
  filename: string;
  subjectId: string;
  trial: number;
  duration: number;
  fps: number;
  description: string;
}

export const SAMPLE_VIDEOS: LsciVideo[] = [
  {
    id: 1,
    filename: "235-1_video.avi",
    subjectId: "235",
    trial: 1,
    duration: 30.0,
    fps: 120,
    description: "อาสาสมัคร 235 — การบันทึกครั้งที่ 1",
  },
  {
    id: 2,
    filename: "236-1_video.avi",
    subjectId: "236",
    trial: 1,
    duration: 30.0,
    fps: 120,
    description: "อาสาสมัคร 236 — การบันทึกครั้งที่ 1",
  },
  {
    id: 3,
    filename: "237-1_video.avi",
    subjectId: "237",
    trial: 1,
    duration: 30.0,
    fps: 120,
    description: "อาสาสมัคร 237 — การบันทึกครั้งที่ 1",
  },
  {
    id: 4,
    filename: "238-1_video.avi",
    subjectId: "238",
    trial: 1,
    duration: 30.0,
    fps: 120,
    description: "อาสาสมัคร 238 — การบันทึกครั้งที่ 1",
  },
  {
    id: 5,
    filename: "239-1_video.avi",
    subjectId: "239",
    trial: 1,
    duration: 30.0,
    fps: 120,
    description: "อาสาสมัคร 239 — การบันทึกครั้งที่ 1",
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
    <div className="sci-card">
      <h3 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
        <Film className="w-4 h-4 text-sky-700" />
        เลือกวิดีโอ LSCI
      </h3>

      <div className="space-y-2">
        {SAMPLE_VIDEOS.map((video) => {
          const isSelected = activeVideo.id === video.id;
          return (
            <button
              key={video.id}
              type="button"
              onClick={() => handleSelect(video)}
              className={`w-full text-left p-3.5 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                isSelected
                  ? "bg-sky-50 border-sky-300 text-sky-800"
                  : "border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              <div>
                <span className="font-mono text-xs text-slate-400 block">
                  {video.filename}
                </span>
                <span className="font-semibold text-sm block mt-0.5">
                  {video.description}
                </span>
                <span className="text-xs text-slate-400 mt-1 block">
                  {video.duration}s · {video.fps} FPS · Subject {video.subjectId}
                </span>
              </div>
              {isSelected && <CheckCircle className="w-5 h-5 text-sky-600 flex-shrink-0" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
