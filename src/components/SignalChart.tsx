"use client";

import React, { useRef, useEffect } from "react";

interface SignalChartProps {
  data: number[];
  label: string;
  color: string;
  fps: number;
  className?: string;
}

/**
 * Scientific waveform viewer — MATLAB/Matplotlib style.
 * Pure SVG rendering with time axis, amplitude axis, grid lines.
 */
export default function SignalChart({
  data,
  label,
  color,
  fps,
  className = "",
}: SignalChartProps) {
  const WIDTH = 800;
  const HEIGHT = 220;
  const PADDING = { top: 20, right: 20, bottom: 40, left: 60 };

  const plotW = WIDTH - PADDING.left - PADDING.right;
  const plotH = HEIGHT - PADDING.top - PADDING.bottom;

  if (!data || data.length === 0) {
    return (
      <div className={`waveform-box ${className}`}>
        <div className="waveform-title">{label}</div>
        <div className="flex items-center justify-center h-40 text-sm text-slate-400">
          ไม่มีข้อมูลสัญญาณ
        </div>
      </div>
    );
  }

  const duration = data.length / fps;
  const minVal = Math.min(...data);
  const maxVal = Math.max(...data);
  const range = maxVal - minVal || 1;

  // Map data to SVG coordinates
  const toX = (i: number) => PADDING.left + (i / (data.length - 1)) * plotW;
  const toY = (v: number) =>
    PADDING.top + plotH - ((v - minVal) / range) * plotH;

  // Build SVG path
  const pathD = data
    .map((v, i) => `${i === 0 ? "M" : "L"}${toX(i).toFixed(1)},${toY(v).toFixed(1)}`)
    .join(" ");

  // Time axis ticks
  const timeTicks: number[] = [];
  const tickInterval = duration <= 10 ? 1 : duration <= 30 ? 5 : 10;
  for (let t = 0; t <= duration; t += tickInterval) {
    timeTicks.push(t);
  }

  // Y-axis ticks (5 divisions)
  const yTicks: number[] = [];
  for (let i = 0; i <= 4; i++) {
    yTicks.push(minVal + (range * i) / 4);
  }

  return (
    <div className={`waveform-box ${className}`}>
      <div className="flex items-center justify-between mb-1">
        <div className="waveform-title">{label}</div>
        <div className="text-[10px] text-slate-400 font-mono">
          {data.length} samples · {duration.toFixed(1)}s · {fps} Hz
        </div>
      </div>

      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Grid lines */}
        {timeTicks.map((t) => {
          const x = PADDING.left + (t / duration) * plotW;
          return (
            <line
              key={`gx-${t}`}
              x1={x}
              y1={PADDING.top}
              x2={x}
              y2={PADDING.top + plotH}
              stroke="#e2e8f0"
              strokeWidth={0.5}
            />
          );
        })}
        {yTicks.map((v, i) => {
          const y = toY(v);
          return (
            <line
              key={`gy-${i}`}
              x1={PADDING.left}
              y1={y}
              x2={PADDING.left + plotW}
              y2={y}
              stroke="#e2e8f0"
              strokeWidth={0.5}
            />
          );
        })}

        {/* Axes */}
        <line
          x1={PADDING.left}
          y1={PADDING.top}
          x2={PADDING.left}
          y2={PADDING.top + plotH}
          stroke="#94a3b8"
          strokeWidth={1}
        />
        <line
          x1={PADDING.left}
          y1={PADDING.top + plotH}
          x2={PADDING.left + plotW}
          y2={PADDING.top + plotH}
          stroke="#94a3b8"
          strokeWidth={1}
        />

        {/* X-axis labels */}
        {timeTicks.map((t) => {
          const x = PADDING.left + (t / duration) * plotW;
          return (
            <text
              key={`xl-${t}`}
              x={x}
              y={HEIGHT - 8}
              textAnchor="middle"
              fontSize={10}
              fill="#94a3b8"
              fontFamily="monospace"
            >
              {t}s
            </text>
          );
        })}

        {/* Y-axis labels */}
        {yTicks.map((v, i) => (
          <text
            key={`yl-${i}`}
            x={PADDING.left - 8}
            y={toY(v) + 3}
            textAnchor="end"
            fontSize={9}
            fill="#94a3b8"
            fontFamily="monospace"
          >
            {v.toFixed(4)}
          </text>
        ))}

        {/* Axis titles */}
        <text
          x={PADDING.left + plotW / 2}
          y={HEIGHT - 0}
          textAnchor="middle"
          fontSize={10}
          fill="#64748b"
        >
          Time (seconds)
        </text>
        <text
          x={12}
          y={PADDING.top + plotH / 2}
          textAnchor="middle"
          fontSize={10}
          fill="#64748b"
          transform={`rotate(-90, 12, ${PADDING.top + plotH / 2})`}
        >
          Amplitude
        </text>

        {/* Signal trace */}
        <path
          d={pathD}
          fill="none"
          stroke={color}
          strokeWidth={1.2}
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
