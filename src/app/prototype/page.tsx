"use client";

import React, { useState, useCallback, useEffect } from "react";
import PatientForm, { PatientData } from "@/components/PatientForm";
import VideoSelector, { LsciVideo, SAMPLE_VIDEOS } from "@/components/VideoSelector";
import SignalChart from "@/components/SignalChart";
import ProcessingSimulation from "@/components/ProcessingSimulation";
import ResultReport, { ScreeningResults } from "@/components/ResultReport";
import { predictLipidRisks } from "@/services/predictionService";
import { Cpu, AlertCircle, ArrowRight, ArrowLeft } from "lucide-react";

type Stage = "patient" | "video" | "signals" | "processing" | "results";

const STEPS = [
  { id: "patient", label: "ข้อมูลพื้นฐาน" },
  { id: "video", label: "วิดีโอ LSCI" },
  { id: "signals", label: "การสกัดสัญญาณ" },
  { id: "processing", label: "ประมวลผลโมเดล" },
  { id: "results", label: "รายงานผล" },
];

export default function PrototypePage() {
  const [stage, setStage] = useState<Stage>("patient");

  // State
  const [patientData, setPatientData] = useState<PatientData>({
    gender: "male",
    age: 45,
    weight: 70,
    height: 172,
    bmi: 23.66,
  });
  const [selectedVideo, setSelectedVideo] = useState<LsciVideo>(SAMPLE_VIDEOS[0]);
  
  // Real signal data
  const [spgData, setSpgData] = useState<number[]>([]);
  const [nirData, setNirData] = useState<number[]>([]);
  const [signalFps, setSignalFps] = useState(20);
  const [signalLoading, setSignalLoading] = useState(false);
  const [signalError, setSignalError] = useState("");

  const [results, setResults] = useState<ScreeningResults | null>(null);
  const [predictionError, setPredictionError] = useState("");

  const currentStepIndex = STEPS.findIndex((s) => s.id === stage);

  // Stepper UI
  const renderStepper = () => (
    <div className="w-full mb-10 py-6 border-b border-slate-100 bg-white sticky top-0 z-20">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between relative">
          <div className="absolute top-1/2 left-0 w-full h-[2px] bg-slate-100 -z-10 -translate-y-1/2" />
          {STEPS.map((step, idx) => {
            const isActive = stage === step.id;
            const isCompleted = idx < currentStepIndex;

            return (
              <div key={step.id} className="flex flex-col items-center gap-2 bg-white px-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-colors ${
                    isActive
                      ? "border-sky-500 bg-sky-50 text-sky-700"
                      : isCompleted
                      ? "border-emerald-500 bg-emerald-500 text-white"
                      : "border-slate-200 bg-white text-slate-400"
                  }`}
                >
                  {isCompleted ? "✓" : idx + 1}
                </div>
                <span
                  className={`text-xs font-semibold ${
                    isActive ? "text-sky-800" : isCompleted ? "text-emerald-700" : "text-slate-400"
                  }`}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  // Handlers
  const handlePatientNext = (data: PatientData) => {
    setPatientData(data);
    setStage("video");
  };

  const handleVideoNext = async () => {
    setStage("signals");
    setSignalLoading(true);
    setSignalError("");
    setSpgData([]);
    setNirData([]);

    try {
      const res = await fetch(
        `/api/signals?subject=${selectedVideo.subjectId}&trial=${selectedVideo.trial}`
      );
      if (!res.ok) {
        throw new Error(`ไม่พบข้อมูลสัญญาณสำหรับ Subject ${selectedVideo.subjectId}`);
      }
      const data = await res.json();
      setSpgData(data.spg);
      setNirData(data.nir_ippg);
      setSignalFps(data.effectiveFps || 20);
    } catch (err) {
      setSignalError(
        err instanceof Error ? err.message : "ไม่สามารถโหลดข้อมูลสัญญาณได้"
      );
    } finally {
      setSignalLoading(false);
    }
  };

  const handleRunAnalysis = () => {
    setStage("processing");
    setPredictionError("");
  };

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

  const handleReset = () => {
    setStage("patient");
    setResults(null);
    setSpgData([]);
    setNirData([]);
    setSignalError("");
    setPredictionError("");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Page Header */}
      <section className="bg-sky-900 text-white py-8 shadow-inner">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h1 className="text-2xl font-bold mb-2">Zycel Cardiovascular Screening Prototype</h1>
          <p className="text-sky-200 text-sm max-w-2xl">
            ระบบสาธิตนี้แสดงกระบวนการทำงานของเทคโนโลยี LSCI สำหรับวิเคราะห์ค่าความเสี่ยงของไขมันในหลอดเลือดโดยไม่ต้องเจาะเลือด
            (Non-invasive)
          </p>
        </div>
      </section>

      {renderStepper()}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-20">
        
        {/* Step 1: Patient */}
        {stage === "patient" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-slate-800">1. ข้อมูลผู้เข้ารับการประเมิน</h2>
              <p className="text-sm text-slate-500">กรอกข้อมูลพื้นฐานทางกายภาพเพื่อประกอบการคำนวณ BMI และความเสี่ยง</p>
            </div>
            <PatientForm onFormSubmit={handlePatientNext} initialData={patientData} />
          </div>
        )}

        {/* Step 2: Video */}
        {stage === "video" && (
          <div className="animate-in fade-in slide-in-from-right-8 duration-500">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-800">2. เลือกวิดีโอ LSCI</h2>
                <p className="text-sm text-slate-500">เลือกตัวอย่างวิดีโอ Laser Speckle Contrast Imaging เพื่อนำไปประมวลผล</p>
              </div>
              <button 
                onClick={() => setStage("patient")}
                className="text-slate-400 hover:text-slate-600 flex items-center gap-1 text-sm font-medium"
              >
                <ArrowLeft className="w-4 h-4" /> ย้อนกลับ
              </button>
            </div>
            <VideoSelector onVideoSelected={(v) => setSelectedVideo(v)} selectedVideo={selectedVideo} />
            
            <div className="mt-8 flex justify-end">
              <button onClick={handleVideoNext} className="btn-primary cursor-pointer flex items-center gap-2">
                ถัดไป: สกัดสัญญาณ <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Signals */}
        {stage === "signals" && (
          <div className="animate-in fade-in slide-in-from-right-8 duration-500">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-800">3. สัญญาณทางสรีรวิทยา (Physiological Signals)</h2>
                <p className="text-sm text-slate-500">
                  สกัดสัญญาณ SPG (Speckle Plethysmography) และ NIR-iPPG จากวิดีโออ้างอิง: {selectedVideo.filename}
                </p>
              </div>
              <button 
                onClick={() => setStage("video")}
                className="text-slate-400 hover:text-slate-600 flex items-center gap-1 text-sm font-medium"
              >
                <ArrowLeft className="w-4 h-4" /> ย้อนกลับ
              </button>
            </div>

            {signalLoading && (
              <div className="sci-card flex items-center gap-4 justify-center h-48">
                <div className="w-8 h-8 border-4 border-sky-500 border-t-transparent rounded-full animate-spin" />
                <span className="text-slate-500 font-medium">กำลังโหลดและสกัดสัญญาณ...</span>
              </div>
            )}

            {signalError && (
              <div className="sci-card flex items-center gap-3 bg-red-50 border-red-200">
                <AlertCircle className="w-6 h-6 text-red-500" />
                <span className="text-red-700">{signalError}</span>
              </div>
            )}

            {!signalLoading && !signalError && spgData.length > 0 && nirData.length > 0 && (
              <div className="space-y-6">
                <SignalChart
                  data={spgData}
                  label="SPG Signal (Blood Flow Velocity)"
                  color="#DC2626" // Standard Red
                  fps={signalFps}
                  className="bg-white"
                />
                <SignalChart
                  data={nirData}
                  label="NIR-iPPG Signal (Blood Volume Pulse)"
                  color="#2563EB" // Standard Blue
                  fps={signalFps}
                  className="bg-white"
                />
                
                {predictionError && (
                  <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-lg p-4">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                    <span className="text-sm text-red-700">{predictionError}</span>
                  </div>
                )}

                <div className="flex justify-end pt-4">
                  <button onClick={handleRunAnalysis} className="btn-primary cursor-pointer text-base px-8 py-3">
                    <Cpu className="w-5 h-5 mr-2" />
                    วิเคราะห์ข้อมูลด้วย Machine Learning
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 4: Processing */}
        {stage === "processing" && (
          <div className="animate-in zoom-in-95 duration-500">
            <ProcessingSimulation isActive={true} onComplete={handleProcessingComplete} />
          </div>
        )}

        {/* Step 5: Results */}
        {stage === "results" && results && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <ResultReport results={results} patientData={patientData} video={selectedVideo} />
            
            <div className="mt-8 flex justify-center">
              <button
                onClick={handleReset}
                className="px-8 py-3 rounded-lg border-2 border-slate-200 text-slate-600 font-bold hover:bg-slate-100 hover:text-slate-800 transition-colors cursor-pointer"
              >
                เริ่มการประเมินใหม่
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
