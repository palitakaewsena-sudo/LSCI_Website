import React from "react";
import { Mail, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <section className="border-b border-slate-100 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
          <h1 className="text-2xl font-bold text-slate-800 mb-2">ติดต่อ</h1>
          <p className="text-slate-500 text-sm">
            ช่องทางการติดต่อทีมวิจัย Zycel
          </p>
        </div>
      </section>

      <section className="section-spacing">
        <div className="max-w-lg mx-auto px-4 sm:px-6 space-y-6">
          <div className="sci-card flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-sky-50 flex items-center justify-center flex-shrink-0">
              <Mail className="w-5 h-5 text-sky-700" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800">อีเมล</h3>
              <p className="text-sm text-slate-500">research@zycel.io</p>
            </div>
          </div>

          <div className="sci-card flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-sky-50 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5 text-sky-700" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800">ที่อยู่</h3>
              <p className="text-sm text-slate-500">
                มหาวิทยาลัยอุบลราชธานี
              </p>
            </div>
          </div>

          <div className="text-xs text-slate-400 leading-relaxed p-3 bg-slate-50 rounded-lg">
            สำหรับข้อมูลเพิ่มเติมเกี่ยวกับโครงการวิจัย หรือต้องการสอบถามรายละเอียดทางเทคนิค
            กรุณาติดต่อผ่านอีเมลข้างต้น
          </div>
        </div>
      </section>
    </div>
  );
}
