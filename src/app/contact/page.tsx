"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare } from "lucide-react";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [org, setOrg] = useState("");
  const [msg, setMsg] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && msg) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setName("");
        setEmail("");
        setOrg("");
        setMsg("");
      }, 3000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Title Header */}
      <div className="space-y-4 max-w-3xl">
        <span className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-semibold uppercase tracking-wider">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Contact Us</span>
        </span>
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
          Connect with Our Clinical Division
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-base leading-relaxed">
          Have questions regarding our LSCI hardware prototypes, serialization APIs, or academic cardiovascular research publications? Reach out and our team will follow up.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Contact Form - Left Column */}
        <div className="lg:col-span-7 bg-card-bg border border-card-border p-6 rounded-3xl shadow-sm relative overflow-hidden">
          
          {submitted ? (
            <div className="py-16 flex flex-col items-center justify-center space-y-4 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Message Received</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs leading-relaxed">
                Thank you for contacting Zycel. Our cardiovascular research team has registered your inquiry and will respond within 24 business hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Dr. John Doe"
                    className="w-full px-4 py-2.5 rounded-xl border border-card-border bg-background focus:outline-none focus:ring-2 focus:ring-sky-500 text-xs text-foreground"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@clinic.med"
                    className="w-full px-4 py-2.5 rounded-xl border border-card-border bg-background focus:outline-none focus:ring-2 focus:ring-sky-500 text-xs text-foreground"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Organization / Affiliation
                </label>
                <input
                  type="text"
                  value={org}
                  onChange={(e) => setOrg(e.target.value)}
                  placeholder="Medical Center Division (Optional)"
                  className="w-full px-4 py-2.5 rounded-xl border border-card-border bg-background focus:outline-none focus:ring-2 focus:ring-sky-500 text-xs text-foreground"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  Message Details
                </label>
                <textarea
                  rows={5}
                  required
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  placeholder="Write your research inquiries, feedback, or scheduling queries..."
                  className="w-full px-4 py-2.5 rounded-xl border border-card-border bg-background focus:outline-none focus:ring-2 focus:ring-sky-500 text-xs text-foreground resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 text-xs font-semibold text-white bg-gradient-to-r from-sky-500 to-teal-500 hover:from-sky-600 hover:to-teal-600 rounded-xl shadow-md transition transform hover:-translate-y-0.5 flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </button>
            </form>
          )}

        </div>

        {/* Contact info cards - Right Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-card-bg border border-card-border p-6 rounded-3xl shadow-sm space-y-4">
            <h3 className="font-bold text-foreground text-sm uppercase tracking-wider border-b border-card-border pb-2">
              Primary Office Address
            </h3>
            
            <div className="space-y-4 text-xs">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-sky-500 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-foreground block">Headquarters</span>
                  <span className="text-slate-500 leading-relaxed">
                    100 Innovation Parkway, Biotech Suite C, Rochester, MN 55901
                  </span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-sky-500 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-foreground block">Phone Contact</span>
                  <span className="text-slate-500">+1 (507) 555-0192 (Mon-Fri, 9AM-5PM CST)</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-sky-500 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-foreground block">Electronic Mail</span>
                  <span className="text-slate-500">contact@zycel.med</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card-bg border border-card-border p-6 rounded-3xl shadow-sm space-y-3">
            <h3 className="font-bold text-foreground text-sm uppercase tracking-wider border-b border-card-border pb-2">
              Venture Media
            </h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="flex-1 py-2 px-3 bg-slate-500/5 hover:bg-slate-500/10 border border-card-border rounded-xl text-[10px] font-semibold text-foreground flex items-center justify-center space-x-1.5 transition animate-all"
                aria-label="LinkedIn"
              >
                <svg className="w-3.5 h-3.5 fill-current text-sky-600" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                <span>LinkedIn</span>
              </a>
              <a
                href="#"
                className="flex-1 py-2 px-3 bg-slate-500/5 hover:bg-slate-500/10 border border-card-border rounded-xl text-[10px] font-semibold text-foreground flex items-center justify-center space-x-1.5 transition animate-all"
                aria-label="Twitter"
              >
                <svg className="w-3.5 h-3.5 fill-current text-sky-400" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
                <span>Twitter</span>
              </a>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
