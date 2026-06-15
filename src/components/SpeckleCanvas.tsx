"use client";

import React, { useRef, useEffect, useState } from "react";
import { Crosshair, Play, Square } from "lucide-react";
import { useTheme } from "./ThemeProvider";

interface SpeckleCanvasProps {
  isPlaying?: boolean;
  videoIndex?: number;
  onRoiSelected?: (roi: { x: number; y: number; w: number; h: number }) => void;
}

export default function SpeckleCanvas({
  isPlaying = true,
  videoIndex = 0,
  onRoiSelected,
}: SpeckleCanvasProps) {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [roi, setRoi] = useState({ x: 140, y: 100, w: 60, h: 60 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // Handle ROI drag inside the canvas
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Check if click is inside the ROI box
    if (x >= roi.x && x <= roi.x + roi.w && y >= roi.y && y <= roi.y + roi.h) {
      setIsDragging(true);
      setDragOffset({ x: x - roi.x, y: y - roi.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Constrain ROI bounds within the canvas
    const newX = Math.max(0, Math.min(canvas.width - roi.w, x - dragOffset.x));
    const newY = Math.max(0, Math.min(canvas.height - roi.h, y - dragOffset.y));

    const updatedRoi = { ...roi, x: Math.round(newX), y: Math.round(newY) };
    setRoi(updatedRoi);
    if (onRoiSelected) {
      onRoiSelected(updatedRoi);
    }
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let frame = 0;

    // Dynamic blood vessel points depending on video selected to show different patterns
    const vesselOffsets = [
      [
        { x: 50, y: 140 },
        { x: 120, y: 130 },
        { x: 190, y: 125 },
        { x: 260, y: 135 },
        { x: 330, y: 150 },
      ],
      [
        { x: 50, y: 80 },
        { x: 130, y: 110 },
        { x: 200, y: 150 },
        { x: 280, y: 120 },
        { x: 330, y: 90 },
      ],
      [
        { x: 50, y: 190 },
        { x: 110, y: 160 },
        { x: 170, y: 130 },
        { x: 240, y: 100 },
        { x: 330, y: 60 },
      ],
      [
        { x: 50, y: 100 },
        { x: 150, y: 100 },
        { x: 230, y: 170 },
        { x: 290, y: 170 },
        { x: 330, y: 110 },
      ],
      [
        { x: 50, y: 150 },
        { x: 100, y: 90 },
        { x: 180, y: 90 },
        { x: 250, y: 160 },
        { x: 330, y: 150 },
      ],
    ];

    const vessels = vesselOffsets[videoIndex % vesselOffsets.length];

    const render = () => {
      frame++;
      
      // 1. Clear background (dark slate laser imaging window)
      ctx.fillStyle = "#0c1322";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 2. Draw moving speckle noise (laser backscatter simulation)
      const buffer = ctx.createImageData(canvas.width, canvas.height);
      const data = buffer.data;
      
      // Draw background noise
      for (let i = 0; i < data.length; i += 4) {
        // High-contrast, fine-grained speckle noise (grayscale/reddish backscatter)
        const rand = Math.random();
        const brightness = rand > 0.85 ? 40 : rand < 0.15 ? 5 : 18;
        
        data[i] = brightness + 10;     // Red
        data[i + 1] = brightness - 5;  // Green
        data[i + 2] = brightness - 5;  // Blue
        data[i + 3] = 255;             // Alpha
      }
      ctx.putImageData(buffer, 0, 0);

      // 3. Render LSCI Contrast Overlays (glowing vascular structures with fluid pulse)
      ctx.save();
      ctx.lineWidth = 14;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      
      // Outer glow for blood vessels
      ctx.shadowBlur = 15;
      ctx.shadowColor = theme === "dark" ? "#2dd4bf" : "#0d9488"; // Teal flow colors
      
      ctx.beginPath();
      ctx.moveTo(vessels[0].x, vessels[0].y);
      for (let i = 1; i < vessels.length; i++) {
        ctx.lineTo(vessels[i].x, vessels[i].y);
      }
      
      // Pulse animation frequency based on index
      const pulseSpeed = 0.08 + (videoIndex * 0.02);
      const pulse = Math.sin(frame * pulseSpeed) * 0.2 + 0.8; // pulsing scale
      
      // Contrast gradient: high speed = red/teal, tissue = dark blue
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      gradient.addColorStop(0, "rgba(45, 212, 191, 0.45)");
      gradient.addColorStop(0.3, "rgba(56, 189, 248, 0.6)");
      // Inject high-lipid flow velocity signals (redder speckle contrast) in some videos
      if (videoIndex === 2) {
        gradient.addColorStop(0.6, "rgba(239, 68, 68, 0.7)"); // High risk warning indicators
      } else {
        gradient.addColorStop(0.6, "rgba(45, 212, 191, 0.5)");
      }
      gradient.addColorStop(1, "rgba(13, 148, 136, 0.4)");

      ctx.strokeStyle = gradient;
      ctx.stroke();

      // Draw capillary micro-vessels branching off
      ctx.lineWidth = 3;
      ctx.strokeStyle = "rgba(45, 212, 191, 0.25)";
      ctx.beginPath();
      // Branch 1
      ctx.moveTo(vessels[1].x, vessels[1].y);
      ctx.lineTo(vessels[1].x + 30, vessels[1].y - 30 * pulse);
      ctx.lineTo(vessels[1].x + 60, vessels[1].y - 20);
      // Branch 2
      ctx.moveTo(vessels[2].x, vessels[2].y);
      ctx.lineTo(vessels[2].x - 20, vessels[2].y + 40 * pulse);
      ctx.lineTo(vessels[2].x - 50, vessels[2].y + 50);
      ctx.stroke();

      ctx.restore();

      // 4. Draw laser scanline sweep
      const sweepY = (frame * 1.5) % canvas.height;
      ctx.fillStyle = "rgba(14, 165, 233, 0.08)";
      ctx.fillRect(0, sweepY - 10, canvas.width, 20);
      ctx.fillStyle = "rgba(14, 165, 233, 0.4)";
      ctx.fillRect(0, sweepY, canvas.width, 1);

      // 5. Draw interactive ROI overlay box (Green target box)
      ctx.strokeStyle = "#10b981";
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 3]);
      ctx.strokeRect(roi.x, roi.y, roi.w, roi.h);
      ctx.setLineDash([]);

      // Draw corner grips
      ctx.fillStyle = "#10b981";
      ctx.fillRect(roi.x - 3, roi.y - 3, 6, 6);
      ctx.fillRect(roi.x + roi.w - 3, roi.y - 3, 6, 6);
      ctx.fillRect(roi.x - 3, roi.y + roi.h - 3, 6, 6);
      ctx.fillRect(roi.x + roi.w - 3, roi.y + roi.h - 3, 6, 6);

      // Label
      ctx.fillStyle = "rgba(16, 185, 129, 0.9)";
      ctx.font = "bold 9px monospace";
      ctx.fillText(`ROI SELECTION (${roi.x}, ${roi.y})`, roi.x, roi.y - 6);

      // 6. Draw crosshair in the center of ROI
      ctx.strokeStyle = "rgba(16, 185, 129, 0.5)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(roi.x + roi.w / 2 - 10, roi.y + roi.h / 2);
      ctx.lineTo(roi.x + roi.w / 2 + 10, roi.y + roi.h / 2);
      ctx.moveTo(roi.x + roi.w / 2, roi.y + roi.h / 2 - 10);
      ctx.lineTo(roi.x + roi.w / 2, roi.y + roi.h / 2 + 10);
      ctx.stroke();

      // Show video indicator details at the top right
      ctx.fillStyle = "rgba(15, 23, 42, 0.8)";
      ctx.fillRect(canvas.width - 110, 8, 102, 36);
      ctx.strokeStyle = "rgba(56, 189, 248, 0.3)";
      ctx.lineWidth = 1;
      ctx.strokeRect(canvas.width - 110, 8, 102, 36);
      
      ctx.fillStyle = "#38bdf8";
      ctx.font = "bold 10px monospace";
      ctx.fillText("LSCI PERFUSION", canvas.width - 104, 20);
      ctx.fillStyle = "#10b981";
      ctx.fillText(isPlaying ? "● CAPTURING" : "■ PAUSED", canvas.width - 104, 32);

      if (isPlaying) {
        animationId = requestAnimationFrame(render);
      }
    };

    if (isPlaying) {
      render();
    } else {
      // Static render when paused
      ctx.fillStyle = "#0c1322";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
      ctx.font = "14px Inter";
      ctx.fillText("Speckle feed paused. Click Play.", canvas.width / 2 - 100, canvas.height / 2);
    }

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isPlaying, videoIndex, roi, theme]);

  return (
    <div className="relative rounded-xl overflow-hidden border border-card-border bg-slate-950 flex flex-col shadow-inner">
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={380}
          height={260}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          className="w-full h-auto cursor-crosshair block"
        />
        <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800 text-[10px] text-slate-400">
          <span className="flex items-center space-x-1">
            <Crosshair className="w-3.5 h-3.5 text-emerald-400" />
            <span>Drag target box to select Laser ROI</span>
          </span>
          <span className="font-mono text-emerald-400">
            [{roi.x}, {roi.y}, {roi.w}, {roi.h}]
          </span>
        </div>
      </div>
    </div>
  );
}
