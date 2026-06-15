"use client";

import React, { useState, useCallback } from "react";
import PatientForm, { PatientData } from "@/components/PatientForm";
import VideoSelector, { LsciVideo, SAMPLE_VIDEOS } from "@/components/VideoSelector";
import SignalChart from "@/components/SignalChart";
import ProcessingSimulation from "@/components/ProcessingSimulation";
import ResultReport, { ScreeningResults } from "@/components/ResultReport";
import { predictLipidRisks } from "@/services/predictionService";
import { Target, Activity, Cpu, AlertCircle } from "lucide-react";

type Stage = "input" | "signals" | "processing" | "results";

export default function PrototypePage() {
  const [patientData, setPatientData] = useState<PatientData>({
    gender: "male",
    age: 45,
    weight: 70,
    height: 172,
    bmi: 23.66,
  });
  const [selectedVideo, setSelectedVideo] = useState<LsciVideo>(SAMPLE_VIDEOS[0]);
  const [patientConfirmed, setPatientConfirmed] = useState(false);
  const [videoConfirmed, setVideoConfirmed] = useState(false);

  // Real signal data
  const [spgData, setSpgData] = useState<number[]>([]);
  const [nirData, setNirData] = useState<number[]>([]);
  const [signalFps, setSignalFps] = useState(20);
  const [signalLoading, setSignalLoading] = useState(false);
  const [signalError, setSignalError] = useState("");

  // Workflow
  const [stage, setStage] = useState<Stage>("input");
  const [results, setResults] = useState<ScreeningResults | null>(null);
  const [predictionError, setPredictionError] = useState("");

  // Step 1: Patient confirmed
  const handlePatientSubmit = (data: PatientData) => {
    setPatientData(data);
    setPatientConfirmed(true);
  };

  // Step 2: Video selected → load real signals
  const handleVideoSelected = async (video: LsciVideo) => {
    setSelectedVideo(video);
    setVideoConfirmed(true);
    setSignalLoading(true);
    setSignalError("");
    setSpgData([]);
    setNirData([]);

    try {
      const res = await fetch(
        `/api/signals?subject=${video.subjectId}&trial=${video.trial}`
      );
      if (!res.ok) {
        throw new Error(`ไม่พบข้อมูลสัญญาณสำหรับ Subject ${video.subjectId}`);
      }
      const data = await res.json();
      setSpgData(data.spg);
      setNirData(data.nir_ippg);
      setSignalFps(data.effectiveFps || 20);
      setStage("signals");
    } catch (err) {
      setSignalError(
        err instanceof Error ? err.message : "ไม่สามารถโหลดข้อมูลสัญญาณได้"
      );
    } finally {
      setSignalLoading(false);
    }
  };

  // Step 5: Run analysis
  const handleRunAnalysis = async () => {
    setStage("processing");
    setPredictionError("");
  };

  // Processing complete → get prediction
  const handleProcessingComplete = useCallback(async () => {
    try {
      const prediction = await predictLipidRisks(patientData, selectedVideo);
      setResults(prediction);
      setStage("results");
    } catch (err) {
      setPredictionError("การวิเคราะห์ล้มเหลว กรุณาลองอีกครั้ง");
      setStage("signals");
    }
  }, [patientData, selectedVideo]);

  // Reset
  const handleReset = () => {
    setStage("input");
    setPatientConfirmed(false);
    setVideoConfirmed(false);
    setResults(null);
    setSpgData([]);
    setNirData([]);
    setSignalError("");
    setPredictionError("");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="border-b border-slate-100 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
          <h1 className="text-2xl font-bold text-slate-800 mb-1">
            ต้นแบบระบบคัดกรอง
          </h1>
          <p className="text-sm text-slate-500">
            ทดลองใช้งานระบบคัดกรองความเสี่ยงทางหัวใจและหลอดเลือดจากวิดีโอ LSCI
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* ── Step 1: Patient Data ──────────────────── */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className={`step-badge ${patientConfirmed ? "completed" : ""}`}>1</div>
            <h2 className="text-lg font-bold text-slate-700">กรอกข้อมูลพื้นฐาน</h2>
          </div>
          <div className="max-w-lg">
            <PatientForm onFormSubmit={handlePatientSubmit} initialData={patientData} />
          </div>
        </div>

        {/* ── Step 2: Video Selection ──────────────── */}
        {patientConfirmed && (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className={`step-badge ${videoConfirmed ? "completed" : ""}`}>2</div>
              <h2 className="text-lg font-bold text-slate-700">เลือกวิดีโอ LSCI</h2>
            </div>
            <div className="max-w-lg">
              <VideoSelector
                onVideoSelected={handleVideoSelected}
                selectedVideo={selectedVideo}
              />
            </div>
          </div>
        )}

        {/* ── Step 3: ROI ─────────────────────────── */}
        {videoConfirmed && (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="step-badge completed">3</div>
              <h2 className="text-lg font-bold text-slate-700">ตำแหน่ง ROI</h2>
            </div>
            <div className="sci-card max-w-lg">
              <div className="flex items-center gap-3 mb-3">
                <Target className="w-4 h-4 text-sky-700" />
                <span className="text-sm font-semibold text-slate-700">
                  Region of Interest (ROI)
                </span>
              </div>
              <p className="text-sm text-slate-500">
                ใช้พื้นที่ทั้งหมดของเฟรมวิดีโอ (Full Frame) เป็น ROI สำหรับสกัดสัญญาณ
                ขนาดเฟรม 200×200 พิกเซล ที่อัตรา {selectedVideo.fps} FPS
                ระยะเวลาบันทึก {selectedVideo.duration} วินาที
              </p>
              <div className="mt-3 flex items-center justify-center">
                <div className="w-40 h-40 border-2 border-dashed border-sky-300 rounded-lg bg-sky-50 flex items-center justify-center relative">
                  <span className="text-xs text-sky-500 font-mono">200 × 200 px</span>
                  <div className="absolute -top-2 -left-2 w-3 h-3 border-t-2 border-l-2 border-sky-500" />
                  <div className="absolute -top-2 -right-2 w-3 h-3 border-t-2 border-r-2 border-sky-500" />
                  <div className="absolute -bottom-2 -left-2 w-3 h-3 border-b-2 border-l-2 border-sky-500" />
                  <div className="absolute -bottom-2 -right-2 w-3 h-3 border-b-2 border-r-2 border-sky-500" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Step 4: Signal Visualization ─────────── */}
        {videoConfirmed && (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className={`step-badge ${spgData.length > 0 ? "completed" : ""}`}>4</div>
              <h2 className="text-lg font-bold text-slate-700">
                สัญญาณ SPG และ NIR-iPPG
              </h2>
            </div>

            {signalLoading && (
              <div className="sci-card flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" />
                <span className="text-sm text-slate-500">กำลังโหลดข้อมูลสัญญาณจริง...</span>
              </div>
            )}

            {signalError && (
              <div className="sci-card flex items-center gap-3 bg-amber-50 border-amber-200">
                <AlertCircle className="w-5 h-5 text-amber-500" />
                <span className="text-sm text-amber-700">{signalError}</span>
              </div>
            )}

            {spgData.length > 0 && nirData.length > 0 && (
              <div className="space-y-4">
                <SignalChart
                  data={spgData}
                  label="SPG (Speckle Plethysmography)"
                  color="#0891b2"
                  fps={signalFps}
                />
                <SignalChart
                  data={nirData}
                  label="NIR-iPPG (Near-Infrared Imaging Photoplethysmography)"
                  color="#0369a1"
                  fps={signalFps}
                />
              </div>
            )}
          </div>
        )}

        {/* ── Step 5: Run Analysis ────────────────── */}
        {stage === "signals" && spgData.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="step-badge">5</div>
              <h2 className="text-lg font-bold text-slate-700">รันการวิเคราะห์</h2>
            </div>
            {predictionError && (
              <div className="sci-card flex items-center gap-3 bg-red-50 border-red-200 mb-4">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <span className="text-sm text-red-700">{predictionError}</span>
              </div>
            )}
            <button onClick={handleRunAnalysis} className="btn-primary cursor-pointer">
              <Cpu className="w-4 h-4" />
              เริ่มวิเคราะห์ด้วย Machine Learning
            </button>
          </div>
        )}

        {/* ── Step 5 active: Processing ───────────── */}
        {stage === "processing" && (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="step-badge">5</div>
              <h2 className="text-lg font-bold text-slate-700">กำลังประมวลผล</h2>
            </div>
            <div className="max-w-lg">
              <ProcessingSimulation
                isActive={true}
                onComplete={handleProcessingComplete}
              />
            </div>
          </div>
        )}

        {/* ── Step 6: Results ─────────────────────── */}
        {stage === "results" && results && (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="step-badge completed">6</div>
              <h2 className="text-lg font-bold text-slate-700">
                ผลการประเมินความเสี่ยง
              </h2>
            </div>
            <ResultReport results={results} patientData={patientData} />

            <button
              onClick={handleReset}
              className="mt-6 px-6 py-2.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              เริ่มการคัดกรองใหม่
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
