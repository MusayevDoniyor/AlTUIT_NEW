"use client";

import React from "react";
import { motion } from "framer-motion";
import { SITE_DATA, RegulatoryDoc } from "@/lib/constants";
import { FileText, Download, ShieldCheck } from "lucide-react";

export default function DocumentsPage() {
  return (
    <div className="pt-24 min-h-screen bg-slate-50">
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 space-y-4">
             <h1 className="text-4xl lg:text-6xl font-display text-slate-900 leading-tight">
                Me'yoriy <span className="text-brand-primary">Hujjatlar</span>
             </h1>
             <p className="text-slate-500 text-lg max-w-2xl mx-auto">
                Akademik litsey faoliyatiga oid huquqiy va ma'muriy hujjatlar to'plami.
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             {SITE_DATA.documents.map((doc: RegulatoryDoc, i: number) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 flex items-start gap-6 group hover:border-brand-primary/20 transition-all"
                >
                   <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-brand-primary/10 group-hover:text-brand-primary transition-all shrink-0">
                      <FileText size={32} />
                   </div>
                   <div className="space-y-4 flex-grow">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-brand-secondary mb-1">Qaror / Nizom</p>
                        <h3 className="text-lg font-display font-bold text-slate-900 leading-snug">
                          {doc.title}
                        </h3>
                      </div>
                      <p className="text-sm text-slate-500 leading-relaxed italic">
                        {doc.desc}
                      </p>
                      <button className="flex items-center gap-2 text-brand-primary font-black text-xs uppercase tracking-widest hover:gap-4 transition-all">
                         Hujjatni Yuklash
                         <Download size={16} />
                      </button>
                   </div>
                </motion.div>
             ))}
          </div>

          <div className="mt-20 p-12 rounded-[3.5rem] bg-slate-100 border border-slate-200 flex flex-col md:flex-row items-center gap-10">
             <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center text-brand-accent shadow-xl">
                <ShieldCheck size={48} />
             </div>
             <div className="space-y-2 text-center md:text-left">
                <h4 className="text-2xl font-display font-bold text-slate-900">Xavfsiz va Ishonchli Ta'lim</h4>
                <p className="text-slate-500 max-w-xl">
                  Barcha hujjatlar O'zbekiston Respublikasi qonunchiligiga muvofiq ishlab chiqilgan va litsey ma'muriyati tomonidan tasdiqlangan.
                </p>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
