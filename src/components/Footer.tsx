export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-sky-700 flex items-center justify-center">
              <span className="text-white font-bold text-[10px]">Z</span>
            </div>
            <span className="font-semibold text-slate-700">Zycel</span>
            <span className="text-slate-400">|</span>
            <span>ระบบวิจัยต้นแบบ</span>
          </div>
          <p className="text-xs text-slate-400 text-center sm:text-right max-w-md">
            ระบบนี้เป็นต้นแบบเพื่อการวิจัยเท่านั้น ไม่ใช่เครื่องมือวินิจฉัยทางการแพทย์
            ผลการคัดกรองไม่สามารถใช้ทดแทนการตรวจวินิจฉัยจากแพทย์ได้
          </p>
        </div>
        <div className="mt-4 pt-4 border-t border-slate-200 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} Zycel Research. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
