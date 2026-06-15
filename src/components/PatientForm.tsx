"use client";

import React, { useState, useEffect } from "react";
import { User, Scale, Ruler, Calendar, CheckCircle } from "lucide-react";

export interface PatientData {
  gender: "male" | "female";
  age: number;
  weight: number;
  height: number;
  bmi: number;
}

interface PatientFormProps {
  onFormSubmit: (data: PatientData) => void;
  initialData?: Partial<PatientData>;
}

export default function PatientForm({ onFormSubmit, initialData }: PatientFormProps) {
  const [gender, setGender] = useState<"male" | "female">(
    (initialData?.gender as "male" | "female") || "male"
  );
  const [age, setAge] = useState<string>(initialData?.age?.toString() || "45");
  const [weight, setWeight] = useState<string>(initialData?.weight?.toString() || "70");
  const [height, setHeight] = useState<string>(initialData?.height?.toString() || "172");
  const [bmi, setBmi] = useState<number>(0);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Recalculate BMI automatically
  useEffect(() => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    if (w > 0 && h > 0) {
      const calculatedBmi = w / Math.pow(h / 100, 2);
      setBmi(parseFloat(calculatedBmi.toFixed(2)));
    } else {
      setBmi(0);
    }
  }, [weight, height]);

  const validate = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    const ageNum = parseFloat(age);
    if (!age || isNaN(ageNum) || ageNum <= 0 || ageNum > 120) {
      newErrors.age = "Please enter a valid age (1 - 120).";
    }

    const weightNum = parseFloat(weight);
    if (!weight || isNaN(weightNum) || weightNum <= 10 || weightNum > 300) {
      newErrors.weight = "Please enter a valid weight (10 - 300 kg).";
    }

    const heightNum = parseFloat(height);
    if (!height || isNaN(heightNum) || heightNum <= 50 || heightNum > 250) {
      newErrors.height = "Please enter a valid height (50 - 250 cm).";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onFormSubmit({
        gender,
        age: parseFloat(age),
        weight: parseFloat(weight),
        height: parseFloat(height),
        bmi,
      });
    }
  };

  // BMI classification colors and text
  const getBmiClass = (bmiVal: number) => {
    if (bmiVal <= 0) return { label: "N/A", color: "text-slate-400" };
    if (bmiVal < 18.5) return { label: "Underweight", color: "text-amber-500 font-semibold" };
    if (bmiVal < 25) return { label: "Normal weight", color: "text-emerald-500 font-semibold" };
    if (bmiVal < 30) return { label: "Overweight", color: "text-amber-500 font-semibold" };
    return { label: "Obese", color: "text-red-500 font-semibold animate-pulse-slow" };
  };

  const bmiClass = getBmiClass(bmi);

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-card-bg border border-card-border p-6 rounded-2xl shadow-sm transition-all relative overflow-hidden"
    >
      <h3 className="text-lg font-bold text-foreground mb-6 flex items-center space-x-2">
        <User className="w-5 h-5 text-sky-500" />
        <span>1. Patient Demographics</span>
      </h3>

      <div className="space-y-4">
        {/* Gender Selection */}
        <div>
          <label className="block text-xs font-semibold text-foreground/70 uppercase tracking-wider mb-2">
            Biological Sex
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setGender("male")}
              className={`py-2 px-4 rounded-xl border text-sm font-semibold transition-all duration-200 ${
                gender === "male"
                  ? "bg-sky-500/10 border-sky-500 text-sky-500 neon-glow"
                  : "border-card-border text-foreground hover:bg-foreground/5"
              }`}
            >
              Male
            </button>
            <button
              type="button"
              onClick={() => setGender("female")}
              className={`py-2 px-4 rounded-xl border text-sm font-semibold transition-all duration-200 ${
                gender === "female"
                  ? "bg-sky-500/10 border-sky-500 text-sky-500 neon-glow"
                  : "border-card-border text-foreground hover:bg-foreground/5"
              }`}
            >
              Female
            </button>
          </div>
        </div>

        {/* Age Entry */}
        <div>
          <label className="block text-xs font-semibold text-foreground/70 uppercase tracking-wider mb-1.5 flex items-center space-x-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>Age (Years)</span>
          </label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-card-border bg-background focus:outline-none focus:ring-2 focus:ring-sky-500 text-foreground transition-all"
            placeholder="e.g. 45"
            min="1"
            max="120"
          />
          {errors.age && <p className="text-xs text-red-500 mt-1">{errors.age}</p>}
        </div>

        {/* Height and Weight Row */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-foreground/70 uppercase tracking-wider mb-1.5 flex items-center space-x-1">
              <Ruler className="w-3.5 h-3.5" />
              <span>Height (cm)</span>
            </label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-card-border bg-background focus:outline-none focus:ring-2 focus:ring-sky-500 text-foreground transition-all"
              placeholder="e.g. 172"
              min="50"
              max="250"
            />
            {errors.height && <p className="text-xs text-red-500 mt-1">{errors.height}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-foreground/70 uppercase tracking-wider mb-1.5 flex items-center space-x-1">
              <Scale className="w-3.5 h-3.5" />
              <span>Weight (kg)</span>
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-card-border bg-background focus:outline-none focus:ring-2 focus:ring-sky-500 text-foreground transition-all"
              placeholder="e.g. 70"
              min="10"
              max="300"
            />
            {errors.weight && <p className="text-xs text-red-500 mt-1">{errors.weight}</p>}
          </div>
        </div>

        {/* Dynamic BMI readout block */}
        <div className="bg-slate-500/5 border border-card-border/50 p-4 rounded-xl flex items-center justify-between mt-4">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-foreground/50 font-bold block">
              Calculated Body Mass Index (BMI)
            </span>
            <span className="text-2xl font-bold text-foreground font-mono">
              {bmi > 0 ? bmi : "--"}
            </span>
          </div>
          {bmi > 0 && (
            <div className="text-right">
              <span className="text-[10px] text-foreground/50 block">Classification</span>
              <span className={bmiClass.color}>{bmiClass.label}</span>
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full mt-4 py-3 text-sm font-semibold text-white bg-gradient-to-r from-sky-500 to-teal-500 hover:from-sky-600 hover:to-teal-600 rounded-xl shadow-md transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center space-x-2 cursor-pointer"
        >
          <CheckCircle className="w-4 h-4" />
          <span>Confirm Patient Parameters</span>
        </button>
      </div>
    </form>
  );
}
