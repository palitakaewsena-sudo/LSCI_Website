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

  useEffect(() => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    if (w > 0 && h > 0) {
      setBmi(parseFloat((w / Math.pow(h / 100, 2)).toFixed(2)));
    } else {
      setBmi(0);
    }
  }, [weight, height]);

  const validate = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    const ageNum = parseFloat(age);
    if (!age || isNaN(ageNum) || ageNum <= 0 || ageNum > 120) {
      newErrors.age = "กรุณาระบุอายุที่ถูกต้อง (1–120 ปี)";
    }
    const weightNum = parseFloat(weight);
    if (!weight || isNaN(weightNum) || weightNum <= 10 || weightNum > 300) {
      newErrors.weight = "กรุณาระบุน้ำหนักที่ถูกต้อง (10–300 กก.)";
    }
    const heightNum = parseFloat(height);
    if (!height || isNaN(heightNum) || heightNum <= 50 || heightNum > 250) {
      newErrors.height = "กรุณาระบุส่วนสูงที่ถูกต้อง (50–250 ซม.)";
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

  const getBmiClass = (val: number) => {
    if (val <= 0) return { label: "—", color: "text-slate-400" };
    if (val < 18.5) return { label: "น้ำหนักน้อย", color: "text-amber-600" };
    if (val < 25) return { label: "ปกติ", color: "text-green-600" };
    if (val < 30) return { label: "น้ำหนักเกิน", color: "text-amber-600" };
    return { label: "อ้วน", color: "text-red-600" };
  };
  const bmiClass = getBmiClass(bmi);

  return (
    <form onSubmit={handleSubmit} className="sci-card">
      <h3 className="text-base font-bold text-slate-800 mb-5 flex items-center gap-2">
        <User className="w-4 h-4 text-sky-700" />
        ข้อมูลผู้เข้ารับการคัดกรอง
      </h3>

      <div className="space-y-4">
        {/* Gender */}
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            เพศ
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setGender("male")}
              className={`py-2.5 px-4 rounded-lg border text-sm font-semibold transition-all cursor-pointer ${
                gender === "male"
                  ? "bg-sky-50 border-sky-300 text-sky-700"
                  : "border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              ชาย
            </button>
            <button
              type="button"
              onClick={() => setGender("female")}
              className={`py-2.5 px-4 rounded-lg border text-sm font-semibold transition-all cursor-pointer ${
                gender === "female"
                  ? "bg-sky-50 border-sky-300 text-sky-700"
                  : "border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              หญิง
            </button>
          </div>
        </div>

        {/* Age */}
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            อายุ (ปี)
          </label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400 text-slate-800 transition-all"
            placeholder="เช่น 45"
            min="1"
            max="120"
          />
          {errors.age && <p className="text-xs text-red-500 mt-1">{errors.age}</p>}
        </div>

        {/* Height & Weight */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
              <Ruler className="w-3.5 h-3.5" />
              ส่วนสูง (ซม.)
            </label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400 text-slate-800 transition-all"
              placeholder="เช่น 172"
              min="50"
              max="250"
            />
            {errors.height && <p className="text-xs text-red-500 mt-1">{errors.height}</p>}
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
              <Scale className="w-3.5 h-3.5" />
              น้ำหนัก (กก.)
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400 text-slate-800 transition-all"
              placeholder="เช่น 70"
              min="10"
              max="300"
            />
            {errors.weight && <p className="text-xs text-red-500 mt-1">{errors.weight}</p>}
          </div>
        </div>

        {/* BMI */}
        <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">
              ดัชนีมวลกาย (BMI)
            </span>
            <span className="text-2xl font-bold text-slate-800 font-mono">
              {bmi > 0 ? bmi : "—"}
            </span>
          </div>
          {bmi > 0 && (
            <div className="text-right">
              <span className="text-[10px] text-slate-400 block">ระดับ</span>
              <span className={`font-semibold text-sm ${bmiClass.color}`}>
                {bmiClass.label}
              </span>
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full btn-primary mt-2 py-3 cursor-pointer"
        >
          <CheckCircle className="w-4 h-4" />
          ยืนยันข้อมูล
        </button>
      </div>
    </form>
  );
}
