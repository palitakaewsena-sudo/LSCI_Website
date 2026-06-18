"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, QrCode } from "lucide-react";
import QRCode from "react-qr-code";

const NAV_LINKS = [
  { href: "/", label: "หน้าแรก" },
  { href: "/technology", label: "เทคโนโลยี" },
  { href: "/education", label: "องค์ความรู้" },
  { href: "/prototype", label: "ต้นแบบระบบ" },
  { href: "/company", label: "เกี่ยวกับเรา" },
  { href: "/contact", label: "ติดต่อ" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-700 flex items-center justify-center">
              <span className="text-white font-bold text-sm">Z</span>
            </div>
            <div className="leading-tight">
              <span className="font-bold text-lg text-slate-800 tracking-tight">
                Zycel
              </span>
              <span className="hidden sm:block text-[10px] text-slate-400 -mt-0.5">
                ระบบวิจัยคัดกรองหัวใจและหลอดเลือด
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "text-sky-700 bg-sky-50"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <button
              onClick={() => setQrModalOpen(true)}
              className="ml-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-sky-700 hover:bg-sky-50 flex items-center gap-2 transition-colors"
            >
              <QrCode className="w-4 h-4" />
              Share
            </button>
          </nav>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <nav className="md:hidden pb-4 space-y-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "text-sky-700 bg-sky-50"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <button
              onClick={() => {
                setQrModalOpen(true);
                setMobileOpen(false);
              }}
              className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-sky-700 hover:bg-sky-50 transition-colors"
            >
              <QrCode className="w-4 h-4" />
              Share
            </button>
          </nav>
        )}
      </div>

      {/* QR Code Modal */}
      {qrModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setQrModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-full p-1.5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="text-center mb-6 mt-2">
              <h3 className="text-xl font-bold text-slate-800">Scan QR Code</h3>
              <p className="text-sm text-slate-500 mt-1">สแกนเพื่อเข้าถึงหน้านี้บนมือถือของคุณ</p>
            </div>
            <div className="flex justify-center bg-white p-4 rounded-xl border border-slate-100 mb-6">
              {currentUrl && (
                <QRCode
                  value={currentUrl}
                  size={200}
                  className="w-full max-w-[200px] h-auto"
                />
              )}
            </div>
            <div className="flex justify-center">
              <button
                onClick={() => setQrModalOpen(false)}
                className="px-6 py-2 bg-sky-600 text-white rounded-lg font-medium hover:bg-sky-700 transition-colors w-full"
              >
                ปิด
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
