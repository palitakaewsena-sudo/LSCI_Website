import React from "react";
import Image from "next/image";

export default function DevicePage() {
  return (
    <div className="min-h-screen">
      <section className="border-b border-slate-100 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
          <h1 className="text-2xl font-bold text-slate-800 mb-2">อุปกรณ์ต้นแบบ</h1>
          <p className="text-slate-500 text-sm max-w-2xl">
            รายละเอียดของอุปกรณ์ต้นแบบ LSCI ที่ใช้ในการเก็บข้อมูลวิดีโอ
          </p>
        </div>
      </section>

      <section className="section-spacing">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            {/* Main device image */}
            <div className="space-y-4">
              <div className="sci-card p-0 overflow-hidden">
                <Image
                  src="/images/prototype_device.png"
                  alt="LSCI Prototype Device"
                  width={600}
                  height={450}
                  className="w-full h-auto"
                />
              </div>
              <div className="sci-card p-0 overflow-hidden">
                <Image
                  src="/images/sensor_view.png"
                  alt="Sensor Close-up View"
                  width={600}
                  height={450}
                  className="w-full h-auto"
                />
              </div>
            </div>

            {/* Specifications */}
            <div className="space-y-6">
              <div className="sci-card">
                <h2 className="text-lg font-bold text-slate-800 mb-4">ข้อมูลจำเพาะ</h2>
                <div className="space-y-3 text-sm">
                  {[
                    ["แหล่งกำเนิดแสง", "เลเซอร์ NIR 785nm"],
                    ["เซ็นเซอร์", "กล้อง CCD ความไวสูง"],
                    ["อัตราเฟรม", "120 FPS"],
                    ["ขนาดเฟรม", "200 × 200 พิกเซล"],
                    ["ระยะเวลาบันทึก", "30 วินาที / ครั้ง"],
                    ["จำนวนการบันทึก", "3 ครั้ง / คน"],
                    ["ตำแหน่งบันทึก", "ปลายนิ้วมือ"],
                    ["โครงสร้าง", "ตั้งโต๊ะ พร้อมที่วางแขน"],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between py-2 border-b border-slate-100 last:border-0">
                      <span className="text-slate-500">{label}</span>
                      <span className="font-semibold text-slate-800">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-xs text-slate-400 leading-relaxed p-3 bg-slate-50 rounded-lg">
                อุปกรณ์นี้เป็นต้นแบบเพื่อการวิจัย ออกแบบและสร้างโดยทีมวิจัย
                สำหรับใช้ในการเก็บข้อมูลวิดีโอ LSCI จากอาสาสมัคร
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
