"use client";

import React from "react";
import { BookOpen, Layers, ShieldAlert, HeartPulse, Activity, Brain } from "lucide-react";

export default function Education() {
  const lipids = [
    {
      title: "Triglycerides (TG)",
      subtitle: "Stored Energy Reserves",
      definition: "Triglycerides are the most common type of fat in the body, derived from foods (especially butter, oils, and excess calories). They circulate in your blood to provide energy to muscles.",
      whyMatters: "High levels of triglycerides (hypertriglyceridemia) are correlated with high levels of small dense LDL and low HDL, combining to accelerate vessel plaque deposits.",
      impact: "Correlated with metabolic syndrome, insulin resistance, fatty liver disease, and acute pancreatitis when levels exceed 500 mg/dL.",
    },
    {
      title: "LDL Cholesterol",
      subtitle: "Low-Density Lipoprotein ('Bad' Cholesterol)",
      definition: "LDL transports cholesterol particles from the liver throughout the body. It is often called 'bad' cholesterol because excessive LDL particles are prone to oxidation and vessel wall penetration.",
      whyMatters: "When LDL levels are high, they accumulate in the endothelial lining of arterial walls. Immune cells ingest them, forming foam cells and establishing arterial plaque.",
      impact: "Directly causes atherosclerosis, coronary artery disease, narrowing of major carotid paths, and increases risk of stroke and heart attack.",
    },
    {
      title: "HDL Cholesterol",
      subtitle: "High-Density Lipoprotein ('Good' Cholesterol)",
      definition: "HDL acts as a scavenger molecule in the blood. It collects excess cholesterol from tissues and vessel walls, transporting it back to the liver for excretion (Reverse Cholesterol Transport).",
      whyMatters: "High HDL levels are cardiovascularly protective. Conversely, low HDL levels (<40 mg/dL) represent a deficient cholesterol removal system, accelerating plaque growth.",
      impact: "Protects against vascular inflammation, helps maintain arterial nitric oxide production, and lowers overall risks of coronary events.",
    },
  ];

  const diseases = [
    {
      name: "Atherosclerosis",
      desc: "The chronic buildup of fatty plaques, calcium, and cellular waste inside the arteries. Over decades, this process causes arterial walls to thicken and lose elasticity, restricting blood flow to critical organs.",
      icon: Layers,
      color: "border-amber-500/20 bg-amber-500/5 text-amber-500",
    },
    {
      name: "Coronary Artery Disease (CAD)",
      desc: "Occurs when plaque narrows the main coronary arteries supplying blood to the heart muscle. CAD leads to chest pain (angina), shortness of breath, and complete blockage leading to myocardial infarction.",
      icon: HeartPulse,
      color: "border-red-500/20 bg-red-500/5 text-red-500",
    },
    {
      name: "Stroke",
      desc: "A medical emergency caused by restricted blood supply to the brain (Ischemic Stroke) or vascular rupture (Hemorrhagic Stroke). Narrowed carotid arteries from lipid plaque are a leading driver of clots.",
      icon: Brain,
      color: "border-sky-500/20 bg-sky-500/5 text-sky-500",
    },
    {
      name: "Heart Attack",
      desc: "Myocardial infarction happens when a blood vessel supplying oxygen to the heart becomes completely occluded. Usually triggered by a sudden rupture of an unstable, lipid-rich atherosclerotic plaque.",
      icon: Activity,
      color: "border-teal-500/20 bg-teal-500/5 text-teal-500",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Title Header */}
      <div className="space-y-4 max-w-3xl">
        <span className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-semibold uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Cardiovascular Education</span>
        </span>
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
          Understanding Lipids and Vascular Health
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-base leading-relaxed">
          Lipid disorders are quiet, chronic precursors to major cardiovascular diseases. Early non-invasive screening provides crucial indicators to start dietary, athletic, or clinical pathways before structural damage occurs.
        </p>
      </div>

      {/* Lipid Disorders Section */}
      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-foreground border-b border-card-border pb-3 flex items-center space-x-2">
          <span>1. The Lipid Panel Indicators</span>
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {lipids.map((lipid) => (
            <div
              key={lipid.title}
              className="bg-card-bg border border-card-border p-6 rounded-2xl shadow-sm space-y-4 hover:shadow-md transition duration-200"
            >
              <div>
                <h3 className="text-lg font-bold text-foreground">{lipid.title}</h3>
                <span className="text-xs text-sky-500 font-semibold">{lipid.subtitle}</span>
              </div>
              
              <div className="space-y-3 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                <p>
                  <strong className="text-foreground">What it is:</strong> {lipid.definition}
                </p>
                <p>
                  <strong className="text-foreground">Why it matters:</strong> {lipid.whyMatters}
                </p>
                <p>
                  <strong className="text-foreground">Clinical Impact:</strong> {lipid.impact}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cardiovascular Disease Grid */}
      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-foreground border-b border-card-border pb-3 flex items-center space-x-2">
          <span>2. Pathology: Cardiovascular Diseases (CVD)</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {diseases.map((d) => {
            const Icon = d.icon;
            return (
              <div
                key={d.name}
                className={`p-6 rounded-2xl border ${d.color} flex items-start space-x-5`}
              >
                <div className="flex-shrink-0 p-3 rounded-xl bg-foreground/5 text-inherit">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-foreground">{d.name}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {d.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Key Advice Callout Box */}
      <div className="bg-slate-500/5 border border-card-border p-6 rounded-2xl flex items-start space-x-4">
        <ShieldAlert className="w-6 h-6 text-sky-500 flex-shrink-0 mt-0.5" />
        <div className="space-y-2 text-sm leading-relaxed">
          <span className="font-bold text-foreground">A Note on Early Vascular Screening</span>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Atherosclerosis takes decades to develop. By monitoring blood flow perfusion changes in skin microcirculation (vasomotion, spectral compliance, and capillary response rates), non-invasive LSCI technology aims to detect early warning patterns long before major vascular occlusions require invasive cardiothoracic interventions.
          </p>
        </div>
      </div>

    </div>
  );
}
