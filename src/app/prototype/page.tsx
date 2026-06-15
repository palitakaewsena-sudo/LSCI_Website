"use client";

import React, { useState } from "react";
import { Cpu, Play, ClipboardList, Activity, ArrowRight, ShieldCheck } from "lucide-react";
import PatientForm, { PatientData } from "@/components/PatientForm";
import VideoSelector, { LsciVideo, SAMPLE_VIDEOS } from "@/components/VideoSelector";
import ProcessingSimulation from "@/components/ProcessingSimulation";
import ResultReport, { ScreeningResults } from "@/components/ResultReport";
import SpgVisualizer from "@/components/SpgVisualizer";
import IppgVisualizer from "@/components/IppgVisualizer";
import { predictLipidRisks } from "@/services/predictionService";

type ScreeningStep = "SETUP" | "PROCESSING" | "RESULTS";

export default function PrototypeDemo() {
  const [step, setStep] = useState<ScreeningStep>("SETUP");
  const [patientData, setPatientData] = useState<PatientData | null>({
    gender: "male",
    age: 45,
    weight: 70,
    height: 172,
    bmi: 23.66
  });
  const [selectedVideo, setSelectedVideo] = useState<LsciVideo>(SAMPLE_VIDEOS[0]);
  const [screeningResults, setScreeningResults] = useState<ScreeningResults | null>(null);

  const handleFormSubmit = (data: PatientData) => {
    setPatientData(data);
  };

  const handleVideoSelect = (video: LsciVideo) => {
    setSelectedVideo(video);
  };

  const startScreening = () => {
    if (!patientData) {
      alert("Please confirm the Patient Demographics form first.");
      return;
    }
    setStep("PROCESSING");
  };

  const handleProcessingComplete = async () => {
    if (!patientData || !selectedVideo) return;
    
    // Call the prediction API service layer
    const results = await predictLipidRisks(patientData, selectedVideo);
    setScreeningResults(results);
    setStep("RESULTS");
  };

  const handleReset = () => {
    setStep("SETUP");
    setScreeningResults(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 text-slate-900">
      
      {/* Title Header */}
      <div className="space-y-4 max-w-3xl">
        <span className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-600 text-xs font-semibold uppercase tracking-wider">
          <Cpu className="w-3.5 h-3.5" />
          <span>Interactive Prototype</span>
        </span>
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
          Zycel Prototype Demonstration
        </h1>
        <p className="text-slate-500 leading-relaxed text-sm sm:text-base">
          Experience the non-invasive cardiovascular and lipid screening workflow. Set patient demographics, select an LSCI microvascular feed, view extracted waveforms, and compile predicted risk reports.
        </p>
      </div>

      {/* SETUP Step: Patient Form & Video/Waveform Selector Panel */}
      {step === "SETUP" && (
        <div className="space-y-8 animate-fade-in">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
            
            {/* Demographic Parameters - Left Column */}
            <div className="xl:col-span-4 space-y-6">
              <PatientForm
                onFormSubmit={handleFormSubmit}
                initialData={patientData || undefined}
              />
              
              {/* Telemetry info callout */}
              <div className="bg-white border border-slate-200 p-5 rounded-2xl text-xs text-slate-600 leading-relaxed space-y-3 shadow-sm">
                <span className="font-bold flex items-center space-x-1.5 text-sky-600">
                  <ClipboardList className="w-4 h-4" />
                  <span>Demonstration Procedure</span>
                </span>
                <div className="space-y-1.5 pl-1.5 list-decimal">
                  <p>1. Toggle biological sex, and enter subject height, weight, and age.</p>
                  <p>2. Select an LSCI video capture template from the right panel.</p>
                  <p>3. Drag the green ROI box on the speckle feed to isolate blood flow channels.</p>
                  <p>4. Inspect the real-time **SPG** and **NIR-iPPG** waveforms extracted from the video.</p>
                  <p>5. Click **Run AI Screening** to process serialization. Only risk bands are calculated.</p>
                </div>
              </div>
            </div>

            {/* Video Selection & Live Waveforms - Right Column */}
            <div className="xl:col-span-8 space-y-6">
              {/* Main Selector */}
              <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm">
                <VideoSelector
                  onVideoSelected={handleVideoSelect}
                  selectedVideo={selectedVideo}
                />
              </div>

              {/* Real-time Physiological Waveforms extracted from the LSCI feed */}
              <div className="space-y-4">
                <h3 className="text-base font-bold text-slate-900 flex items-center space-x-1.5 px-1">
                  <Activity className="w-5 h-5 text-sky-500" />
                  <span>Real-time Capillary Waveform Signal Extraction</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <SpgVisualizer
                    isScanning={true}
                    videoIndex={selectedVideo.id - 1}
                  />
                  <IppgVisualizer
                    isScanning={true}
                    videoIndex={selectedVideo.id - 1}
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Screening Submission Centered Button */}
          <div className="flex flex-col items-center pt-6 border-t border-slate-200">
            <button
              onClick={startScreening}
              className="px-12 py-4 font-bold text-white bg-gradient-to-r from-sky-500 via-cyan-500 to-teal-500 hover:from-sky-600 hover:to-teal-600 rounded-2xl shadow-xl hover:shadow-sky-500/25 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center space-x-3 text-lg cursor-pointer"
            >
              <Play className="w-5 h-5 fill-current" />
              <span>Run AI Screening</span>
            </button>
            <p className="text-[10px] text-slate-400 mt-3 text-center max-w-sm">
              Inference is processed using local scikit-learn models mapped to NCEP ATP-III criteria.
            </p>
          </div>
        </div>
      )}

      {/* PROCESSING Step: Fullscreen 8-step simulation */}
      <ProcessingSimulation
        isRunning={step === "PROCESSING"}
        onComplete={handleProcessingComplete}
      />

      {/* RESULTS Step: Display Risk report card */}
      {step === "RESULTS" && patientData && selectedVideo && screeningResults && (
        <ResultReport
          patientData={patientData}
          video={selectedVideo}
          results={screeningResults}
          onReset={handleReset}
        />
      )}

    </div>
  );
}
