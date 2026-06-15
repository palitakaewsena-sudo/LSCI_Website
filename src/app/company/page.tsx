"use client";

import React from "react";
import { Building2, Globe, Heart, Award } from "lucide-react";

export default function CompanyProfile() {
  const timelineEvents = [
    {
      year: "2023",
      title: "Biomedical Lab Feasibility",
      desc: "Initial research experiments at Rochester University Biomedical Engineering Center. Discovered statistical correlations between laser speckle intensity decay rates and patient lipid counts.",
    },
    {
      year: "2024",
      title: "Prototype Enclosure Build",
      desc: "Completed assembly of the tabletop sensor housing (Class 1M safe laser + CCD sensor) and established static forearm posture rest mounts to negate subject movement noise.",
    },
    {
      year: "2025",
      title: "AI Model Development & Test",
      desc: "Collected clinical video panels to train scikit-learn models (Ridge, RandomForest, and HistGradientBoosting Regressors), saving them as local joblib workspaces.",
    },
    {
      year: "2026",
      title: "Seed Phase: Investor Demo Launch",
      desc: "Opening preliminary demonstration portals for clinical partners and venture capital groups under the Zycel brand name. Initiating pilot trials in outpatient settings.",
    },
  ];

  const team = [
    {
      name: "Dr. Elena Rostova, MD",
      role: "Chief Medical Officer",
      bio: "12+ years clinical cardiology research. Oversees clinical trial guidelines mapping and NCEP ATP-III criteria alignment.",
    },
    {
      name: "Marcus Thorne, PhD",
      role: "Lead Biomedical Engineer",
      bio: "Anatomical optical sensors specialist. Designed the optical laser collimation aperture and CCD array specs for the tabletop unit.",
    },
    {
      name: "Sarah Chen, MSc",
      role: "Head of AI Research",
      bio: "Former Senior ML researcher. Developed the signal-imputing pipeline, time-domain feature extractors, and model serialization layers.",
    },
  ];

  const partners = [
    "Rochester Optical Systems Corp",
    "Mayo Capillary Health Research Labs",
    "Midwest Medical Seed Syndicate",
    "Clinical Optics & Imaging Society",
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 text-slate-900 bg-slate-50/50">
      
      {/* Title Header */}
      <div className="space-y-4 max-w-3xl">
        <span className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-600 text-xs font-semibold uppercase tracking-wider">
          <Building2 className="w-3.5 h-3.5" />
          <span>Startup Profile</span>
        </span>
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
          Zycel Medical Technologies
        </h1>
        <p className="text-slate-500 leading-relaxed text-sm sm:text-base">
          Founded at the intersection of optical physics, machine learning, and cardiology, Zycel is building next-generation non-invasive tools to scale preliminary cardiovascular screening globally.
        </p>
      </div>

      {/* Mission / Vision Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
            <Heart className="w-5 h-5 text-red-500" />
            <span>Our Mission</span>
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            To eliminate clinical diagnostic barriers. By creating rapid, painless, needle-free laser screening endpoints, we empower clinicians to flag high-risk lipid and atherogenic profiles within outpatient consultations under a single minute.
          </p>
        </div>
        <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
            <Globe className="w-5 h-5 text-sky-500" />
            <span>Our Vision</span>
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            A world where cardiovascular disease prevention begins at every primary care encounter. We envision our serialized scikit-learn models integrated into outpatient clinics globally, reducing heart event mortality through proactive detection.
          </p>
        </div>
      </div>

      {/* Innovation Goals Section */}
      <div className="bg-white border border-slate-200 p-6 rounded-3xl space-y-4 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 flex items-center space-x-1.5">
          <Award className="w-5 h-5 text-teal-500" />
          <span>Biomedical Innovation Goals</span>
        </h3>
        <p className="text-xs text-slate-500 leading-relaxed">
          The prototype system has achieved robust laboratory correlations. Our next innovation targets involve adapting the optical lens sensor into a wearable smart wristband, allowing continuous microvascular flow spectral stability calculations and cardiovascular stress forecasting during daily activities.
        </p>
      </div>

      {/* Vertical Timeline Roadmap */}
      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-200 pb-3 flex items-center space-x-2">
          <span>Project Timeline & Milestone Roadmap</span>
        </h2>
        
        <div className="space-y-6 relative before:absolute before:inset-y-0 before:left-4 before:w-0.5 before:bg-slate-200 pl-10">
          {timelineEvents.map((event) => (
            <div key={event.year} className="relative space-y-2">
              {/* Timeline dot */}
              <div className="absolute -left-[32px] top-1.5 w-4.5 h-4.5 rounded-full bg-white border-2 border-sky-500 flex items-center justify-center shadow-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-sky-500" />
              </div>
              
              <div className="bg-white border border-slate-200 p-4 rounded-xl max-w-3xl shadow-sm">
                <span className="font-mono text-xs font-bold text-sky-600">{event.year}</span>
                <h3 className="font-bold text-slate-900 text-sm mt-0.5">{event.title}</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {event.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Core Team Section */}
      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-200 pb-3">
          Core Research & Engineering Team
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {team.map((member) => (
            <div key={member.name} className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm space-y-3">
              <div>
                <h4 className="font-bold text-slate-950 text-sm">{member.name}</h4>
                <span className="text-xs text-sky-600 font-semibold">{member.role}</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Partners Section */}
      <div className="space-y-6">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider text-center">
          Collaborating Clinical Research Partners
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {partners.map((p) => (
            <div
              key={p}
              className="p-4 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 shadow-sm flex items-center justify-center"
            >
              {p}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
