import React from "react";
import Link from "next/link";
import { Activity, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-slate-900 border-t border-slate-800 text-slate-400 py-12 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-tr from-sky-500 to-teal-400 text-white shadow-md">
                <Activity className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                Zycel
              </span>
            </Link>
            <p className="text-sm leading-relaxed">
              Leading the next frontier of non-invasive lipid screening and vascular wellness tracking using high-speed Laser Speckle Contrast Imaging and machine learning.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-sky-400 transition-colors" aria-label="LinkedIn">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href="#" className="hover:text-sky-400 transition-colors" aria-label="Twitter">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Platform</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/technology" className="hover:text-white transition-colors">Technology</Link></li>
              <li><Link href="/education" className="hover:text-white transition-colors">Education</Link></li>
              <li><Link href="/prototype" className="hover:text-white transition-colors">Prototype Demonstration</Link></li>
            </ul>
          </div>

          {/* Product & Research */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Research & Hardware</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/device" className="hover:text-white transition-colors">LSCI Device Prototype</Link></li>
              <li><Link href="/company" className="hover:text-white transition-colors">Company Timeline</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Division</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 font-sans">Contact Headquarters</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <span>100 Innovation Parkway, Biotech Suite C, Rochester, MN 55901</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <span>+1 (507) 555-0192</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <span>contact@zycel.med</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider & Disclaimer */}
        <div className="border-t border-slate-800 mt-10 pt-6">
          <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 text-xs leading-relaxed mb-6 text-slate-500">
            <span className="font-bold text-slate-400 uppercase block mb-1">Medical Tool Disclaimer</span>
            This screening result is intended for preliminary assessment only and is not a substitute for clinical laboratory testing or professional medical diagnosis. Zycel measurements are for investigational and prototype screening purposes, utilizing machine learning risk mapping.
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 space-y-4 md:space-y-0">
            <span>&copy; {currentYear} Zycel Medical Technologies Inc. All rights reserved.</span>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-slate-400">Privacy Policy</a>
              <a href="#" className="hover:text-slate-400">Terms of Service</a>
              <a href="#" className="hover:text-slate-400">FDA Investigational Device Notice</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
