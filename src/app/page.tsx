"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Eye, ShieldCheck, Zap, Layers, Cpu, CheckCircle } from "lucide-react";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Background particle flow animation to represent laser backscattering in microcirculation (light theme adjustments)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    // Particles simulating red blood cell perfusion flows
    const particles = Array.from({ length: 30 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 1,
      speed: Math.random() * 1.0 + 0.3,
      alpha: Math.random() * 0.3 + 0.1,
      color: "#0ea5e9", // Medical Blue
    }));

    const render = () => {
      ctx.fillStyle = "rgba(248, 250, 252, 0.2)"; // Slate-50 light background
      ctx.fillRect(0, 0, width, height);

      // Draw faint background grid
      ctx.strokeStyle = "rgba(148, 163, 184, 0.08)";
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw particles
      particles.forEach((p) => {
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        p.x += p.speed;
        if (p.x > width) {
          p.x = 0;
          p.y = Math.random() * height;
        }
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const coreFeatures = [
    {
      title: "Non-Invasive Diagnostic Method",
      desc: "Eliminates needle punctures. Captures perfusion metrics directly through skin layers using light reflection.",
      icon: Eye,
      color: "text-sky-600 bg-sky-500/10 border-sky-500/20",
    },
    {
      title: "Rapid AI Risk Scoring",
      desc: "Signal extraction algorithms compile diagnostic scores and risk categories in under 60 seconds.",
      icon: Zap,
      color: "text-teal-600 bg-teal-500/10 border-teal-500/20",
    },
    {
      title: "Trained Machine Learning Models",
      desc: "Utilizes optimized Random Forest and Gradient Boosting models matching NCEP ATP-III criteria.",
      icon: Cpu,
      color: "text-indigo-600 bg-indigo-500/10 border-indigo-500/20",
    },
    {
      title: "Investor-Ready Scalability",
      desc: "Modular service architecture built with REST-compliant APIs ready for cloud clinician deployments.",
      icon: ShieldCheck,
      color: "text-emerald-600 bg-emerald-500/10 border-emerald-500/20",
    },
  ];

  return (
    <div className="relative w-full overflow-hidden min-h-screen flex flex-col bg-slate-50 text-slate-900">
      
      {/* Dynamic Laser Background Canvas */}
      <div className="absolute inset-0 z-0 opacity-60">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 md:pt-28 flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-grow space-y-6 text-center lg:text-left lg:max-w-2xl">
          <span className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-600 text-xs font-semibold uppercase tracking-wider">
            <Cpu className="w-3.5 h-3.5" />
            <span>AI-Powered Non-Invasive Cardiovascular Screening</span>
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-slate-900">
            AI-Powered Lipid Screening Using{" "}
            <span className="text-gradient">Laser Speckle Contrast Imaging</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-500 leading-relaxed">
            Non-invasive cardiovascular risk assessment through machine learning and microcirculation analysis. Explore our prototype system and experience the screening workflow instantly.
          </p>
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-2">
            <Link
              href="/prototype"
              className="px-6 py-3 font-semibold text-white bg-gradient-to-r from-sky-500 to-teal-500 hover:from-sky-600 hover:to-teal-600 rounded-xl shadow-lg hover:shadow-sky-500/20 transition transform hover:-translate-y-0.5 flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>Try Prototype</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/technology"
              className="px-6 py-3 font-semibold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition flex items-center justify-center space-x-1 cursor-pointer shadow-sm"
            >
              <span>Explore Technology</span>
            </Link>
          </div>
        </div>

        {/* Dynamic Image Enclosure - Right Column */}
        <div className="flex-shrink-0 w-full lg:w-[460px] relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-sky-500/10 to-teal-500/10 rounded-3xl blur-2xl opacity-60 z-0" />
          <div className="relative z-10 bg-white border border-slate-200 rounded-3xl p-5 shadow-xl space-y-4 backdrop-blur-md">
            
            {/* Device mock image */}
            <div className="relative aspect-video rounded-2xl overflow-hidden border border-slate-100 shadow-inner bg-slate-50">
              <img
                src="/images/prototype_device.png"
                alt="Zycel LSCI Capillary Perfusion Screening Device"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2.5 left-2.5 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-slate-700 text-[9px] font-mono text-sky-400">
                ZYCEL_LSCI_PROTOTYPE
              </div>
            </div>
            
            {/* Short hardware summary */}
            <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono px-1">
              <span>Laser Source: 785nm Coherent</span>
              <span className="text-sky-600 font-bold">● ONLINE</span>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Features Panel */}
      <section className="relative z-10 w-full bg-white border-t border-slate-200 py-16 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Medical Diagnostics Reimagined
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
              Designed as a rapid clinical screening workflow, Zycel combines high-speed physical optics, computer vision filtering, and machine learning risk classification.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreFeatures.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="bg-slate-50 border border-slate-200 hover:border-slate-300 p-6 rounded-2xl transition-all duration-200 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${f.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                      {f.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {f.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to action section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-sky-500/5 via-cyan-500/5 to-teal-500/5 border border-sky-500/10 p-8 sm:p-12 rounded-3xl flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-sm">
          <div className="space-y-2 relative z-10 max-w-xl text-center lg:text-left">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">Ready to run a simulated screening?</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Input patient demographic variables, select a pre-recorded LSCI capillary perfusion video, and visualize real-time SPG and iPPG heart pulse extraction lines.
            </p>
          </div>
          <div className="flex-shrink-0 relative z-10">
            <Link
              href="/prototype"
              className="px-6 py-3 font-bold text-white bg-sky-500 hover:bg-sky-600 rounded-xl shadow transition transform hover:-translate-y-0.5 cursor-pointer block"
            >
              Start Demonstration
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
