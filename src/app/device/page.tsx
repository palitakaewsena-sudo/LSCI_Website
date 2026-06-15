"use client";

import React, { useState } from "react";
import { Eye, ShieldCheck, Zap, Hammer, Mail, Info, Send, Check } from "lucide-react";

interface Hotspot {
  x: number; // percentage
  y: number; // percentage
  title: string;
  desc: string;
}

export default function DeviceShowcase() {
  const [viewerMode, setViewerMode] = useState<"prototype" | "sensor">("prototype");
  const [activeTab, setActiveTab] = useState<"specs" | "advantages" | "applications">("specs");
  const [modalOpen, setModalOpen] = useState(false);
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [org, setOrg] = useState("");
  const [units, setUnits] = useState("1");
  const [hoveredHotspot, setHoveredHotspot] = useState<Hotspot | null>(null);

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && org) {
      setQuoteSubmitted(true);
      setTimeout(() => {
        setModalOpen(false);
        setQuoteSubmitted(false);
        setEmail("");
        setOrg("");
      }, 2000);
    }
  };

  // Coordinates matching elements on our prototype images
  const prototypeHotspots: Hotspot[] = [
    { x: 52, y: 34, title: "CCD Optical Sensor Grid", desc: "High-resolution microvascular camera capturing intensity variance at 20 frames per second." },
    { x: 34, y: 72, title: "Stabilization Arm Rest", desc: "Ergonomically contoured limb rest to negate motion artifacts during the 15-second acquisition window." },
    { x: 74, y: 44, title: "NIR Laser Source", desc: "Coherent 785nm single-mode laser diode projecting uniform backscattering fields." },
  ];

  const sensorHotspots: Hotspot[] = [
    { x: 48, y: 28, title: "Laser Diode Collimator", desc: "Focuses coherent laser emission over capillary vascular networks." },
    { x: 62, y: 65, title: "Focal Adjustment Ring", desc: "Calibrates lens depth to resolve microvascular beds dynamically." },
    { x: 28, y: 52, title: "USB-C Bus Port", desc: "Standard 5V/2A input terminal for direct clinic diagnostics integration." },
  ];

  const activeHotspots = viewerMode === "prototype" ? prototypeHotspots : sensorHotspots;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 text-slate-900 bg-slate-50/50">
      
      {/* Title Header */}
      <div className="space-y-4 max-w-3xl">
        <span className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-600 text-xs font-semibold uppercase tracking-wider">
          <Hammer className="w-3.5 h-3.5" />
          <span>Hardware Architecture</span>
        </span>
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
          Zycel LSCI Tabletop Enclosure System
        </h1>
        <p className="text-slate-500 leading-relaxed text-sm sm:text-base">
          Investigate the physical instrumentation of Zycel. Our hardware combines near-infrared lasers, stabilized rests, and high-frequency optical arrays for rapid out-patient checks.
        </p>
      </div>

      {/* Main Column: Interactive Device Viewer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Device Photo & Interactive Viewer Hotspots - Left Column */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex border-b border-slate-200 pb-1.5 space-x-4">
            <button
              onClick={() => setViewerMode("prototype")}
              className={`text-xs font-bold pb-2 uppercase tracking-wider transition border-b-2 cursor-pointer ${
                viewerMode === "prototype" ? "border-sky-500 text-sky-600" : "border-transparent text-slate-400 hover:text-slate-600"
              }`}
            >
              Perspective View (Prototype)
            </button>
            <button
              onClick={() => setViewerMode("sensor")}
              className={`text-xs font-bold pb-2 uppercase tracking-wider transition border-b-2 cursor-pointer ${
                viewerMode === "sensor" ? "border-sky-500 text-sky-600" : "border-transparent text-slate-400 hover:text-slate-600"
              }`}
            >
              Close-Up View (Optical Head)
            </button>
          </div>

          {/* Interactive Image Frame */}
          <div className="relative aspect-video rounded-3xl overflow-hidden border border-slate-200 shadow-lg bg-white">
            <img
              src={viewerMode === "prototype" ? "/images/prototype_device.png" : "/images/sensor_view.png"}
              alt="Zycel LSCI Diagnostics Tabletop Enclosure"
              className="w-full h-full object-cover select-none"
            />
            
            {/* Hotspot Dots */}
            {activeHotspots.map((spot) => (
              <button
                key={spot.title}
                onMouseEnter={() => setHoveredHotspot(spot)}
                onMouseLeave={() => setHoveredHotspot(null)}
                className="absolute w-5 h-5 rounded-full bg-sky-500 border border-white text-white flex items-center justify-center shadow-lg transition-transform hover:scale-125 cursor-pointer animate-ping-slow"
                style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
              >
                <div className="w-2 h-2 rounded-full bg-white" />
              </button>
            ))}

            {/* Floating Hotspot Details Display */}
            {hoveredHotspot && (
              <div className="absolute top-4 left-4 right-4 bg-slate-900/90 text-white p-3 rounded-xl border border-slate-700 text-xs shadow-xl backdrop-blur-md transition-all duration-300">
                <span className="font-bold text-sky-400 block">{hoveredHotspot.title}</span>
                <p className="text-[11px] text-slate-300 mt-1 leading-snug">{hoveredHotspot.desc}</p>
              </div>
            )}
          </div>
          <p className="text-[10px] text-slate-500 italic text-center">
            *Hover over the blue locator dots on the enclosure to inspect component details.
          </p>
        </div>

        {/* Dynamic Detail Tab Sheet - Right Column */}
        <div className="lg:col-span-5 bg-white border border-slate-200 p-6 rounded-3xl shadow-sm space-y-6">
          <div className="flex border-b border-slate-200 pb-1.5 space-x-4">
            {(["specs", "advantages", "applications"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-xs font-bold pb-2 capitalize tracking-wide transition border-b-2 cursor-pointer ${
                  activeTab === tab
                    ? "border-sky-500 text-sky-600"
                    : "border-transparent text-slate-400 hover:text-slate-600"
                }`}
              >
                {tab === "specs" ? "Specifications" : tab}
              </button>
            ))}
          </div>

          <div className="text-xs leading-relaxed text-slate-500 min-h-[160px]">
            {activeTab === "specs" && (
              <div className="grid grid-cols-2 gap-4 font-mono">
                <div>
                  <span className="text-slate-400 block">Laser Wavelength</span>
                  <span className="font-semibold text-slate-800">785 nm (Near-IR)</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Sensor Framerate</span>
                  <span className="font-semibold text-slate-800">20.0 FPS</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Output Signal Range</span>
                  <span className="font-semibold text-slate-800">0.1 - 25.0 PU</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Power Connection</span>
                  <span className="font-semibold text-slate-800">USB-C (DC 5V, 2A)</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Enclosure Size</span>
                  <span className="font-semibold text-slate-800">240mm x 160mm x 100mm</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Optical Matrix</span>
                  <span className="font-semibold text-slate-800">640 x 480 capillary grid</span>
                </div>
              </div>
            )}

            {activeTab === "advantages" && (
              <ul className="space-y-2.5 list-disc pl-4 text-slate-600 font-sans">
                <li><strong className="text-slate-900">Zero Needles:</strong> Fully non-invasive capillary perfusion captures minimize patient testing hesitation.</li>
                <li><strong className="text-slate-900">Immediate Readouts:</strong> AI features run and serialize results in 12 seconds, reducing physical clinic wait times.</li>
                <li><strong className="text-slate-900">High Compliance:</strong> Stabilized contoured casing ensures regular focus alignment and removes user scanning drift.</li>
              </ul>
            )}

            {activeTab === "applications" && (
              <ul className="space-y-2 list-disc pl-4 text-slate-600 font-sans">
                <li>Cardiorespiratory outpatient screening clinics.</li>
                <li>Biomedical optical laboratory research databases.</li>
                <li>Preventive corporate employee health check points.</li>
                <li>Capillary perfusion research (diabetic peripheral foot screening).</li>
              </ul>
            )}
          </div>

          {/* Pricing Placeholder & Quotation Form Trigger */}
          <div className="border-t border-slate-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">
                Commercial Licensing Pricing
              </span>
              <span className="text-xs font-semibold text-slate-500">
                Contact sales for institutional trials
              </span>
            </div>
            <button
              onClick={() => setModalOpen(true)}
              className="py-2.5 px-5 bg-sky-500 hover:bg-sky-600 text-white text-xs font-semibold rounded-xl transition shadow-md cursor-pointer"
            >
              Request Quotation
            </button>
          </div>
        </div>
      </div>

      {/* Quote Request Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white border border-slate-200 p-6 rounded-3xl w-full max-w-md shadow-2xl relative">
            <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center space-x-1.5">
              <Mail className="w-5 h-5 text-sky-500" />
              <span>Request Zycel Quotation</span>
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-6">
              Enter details below to receive Zycel hardware spec sheets, clinical data registries, and customized licensing quotation plans.
            </p>

            {quoteSubmitted ? (
              <div className="py-8 flex flex-col items-center justify-center space-y-3 text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-500 flex items-center justify-center animate-bounce">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-slate-900 text-sm">Quotation Request Sent</h4>
                <p className="text-[10px] text-slate-400">We have registered your clinic profile. A team coordinator will reach out in 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleQuoteSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="physician@clinic.med"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-background focus:outline-none focus:ring-2 focus:ring-sky-500 text-xs text-foreground"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                    Organization / Clinic Name
                  </label>
                  <input
                    type="text"
                    required
                    value={org}
                    onChange={(e) => setOrg(e.target.value)}
                    placeholder="Mayo General Cardio-care"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-background focus:outline-none focus:ring-2 focus:ring-sky-500 text-xs text-foreground"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                    Requested Units
                  </label>
                  <select
                    value={units}
                    onChange={(e) => setUnits(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-background focus:outline-none focus:ring-2 focus:ring-sky-500 text-xs text-foreground"
                  >
                    <option value="1">1 Unit (Pilot Enclosure)</option>
                    <option value="2-5">2-5 Units (Clinical Trials)</option>
                    <option value="6+">6+ Units (Hospital Network)</option>
                  </select>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="flex-1 py-2.5 text-xs font-semibold border border-slate-200 rounded-xl hover:bg-slate-50 cursor-pointer text-slate-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 text-xs font-semibold text-white bg-sky-500 hover:bg-sky-600 rounded-xl shadow transition flex items-center justify-center space-x-1.5 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Request</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
