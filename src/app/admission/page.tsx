"use client";

import React from "react";
import { motion } from "framer-motion";
import { SITE_DATA, Track, Subject } from "@/lib/constants";
import { Calculator, Globe, BrainCircuit, Calendar, ExternalLink, Play } from "lucide-react";

export default function AdmissionPage() {
  return (
    <div className="pt-24 min-h-screen bg-slate-50">
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20 space-y-6">
            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-brand-primary text-white text-sm font-bold uppercase tracking-widest">
              Qabul 2025
            </div>
            <h1 className="text-4xl lg:text-7xl font-display text-slate-900 leading-[1.1]">
              Kelajak IT <span className="text-brand-primary">Mutaxassislaridan</span> Biri Bo'ling
            </h1>
            <p className="text-slate-500 text-lg max-w-3xl mx-auto leading-relaxed">
              Imtihonlar Bilimni baholash Agentligi tomonidan tashkil etiladi. Ro'yxatdan o'tish maxsus platforma orqali amalga oshiriladi.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">
            {/* Admission Info */}
            <div className="lg:col-span-4 space-y-8">
               <div className="p-8 bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 space-y-6">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary">
                        <Calendar size={24} />
                     </div>
                     <div>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Muddati</p>
                        <p className="text-lg font-display font-bold text-slate-900">{SITE_DATA.admission.period}</p>
                     </div>
                  </div>
                  <div className="space-y-4 pt-4">
                     <p className="text-sm text-slate-500 leading-relaxed">
                        Ro'yxatdan o'tish agentlik tomonidan tasdiqlangan maxsus platforma orqali amalga oshiriladi:
                     </p>
                     <a 
                       href="https://my.edu.uz" 
                       target="_blank" 
                       className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-xl group hover:border-brand-primary transition-colors"
                     >
                        <span className="font-bold text-brand-primary">my.edu.uz</span>
                        <ExternalLink size={18} className="text-slate-300 group-hover:text-brand-primary transition-colors" />
                     </a>
                  </div>
               </div>

               <div className="p-8 bg-slate-900 rounded-[2rem] text-white space-y-6 relative overflow-hidden">
                  <div className="absolute -top-10 -left-10 w-40 h-40 bg-brand-secondary/20 rounded-full blur-3xl"></div>
                  <h3 className="text-xl font-display font-bold relative z-10">Ariza topshirish qo'llanmasi</h3>
                  <p className="text-slate-400 text-sm leading-relaxed relative z-10">
                    Hujjat topshirish jarayonini bosqichma-bosqich tushuntiruvchi video qo'llanma bilan tanishib chiqing.
                  </p>
                  <button className="flex items-center gap-3 py-3 px-6 bg-brand-secondary text-slate-900 rounded-xl font-bold w-full justify-center transform hover:scale-[1.02] transition-all">
                     <Play size={18} fill="currentColor" />
                     Videoni ko'rish
                  </button>
               </div>
            </div>

            {/* Exam Tracks */}
            <div className="lg:col-span-8 space-y-10">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {SITE_DATA.admission.tracks.map((track: Track, i: number) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 space-y-8"
                    >
                       <h3 className="text-2xl font-display font-bold text-slate-900">{track.name}</h3>
                       <div className="space-y-6">
                          {track.subjects.map((subj: Subject, j: number) => (
                             <div key={j} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                                <div className="flex items-center gap-4">
                                   <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-brand-primary">
                                      {subj.name === "Matematika" ? <Calculator size={18} /> : 
                                       subj.name.includes("IQ") ? <BrainCircuit size={18} /> : 
                                       <Globe size={18} />}
                                   </div>
                                   <span className="font-bold text-slate-700">{subj.name}</span>
                                </div>
                                <div className="text-right">
                                   <p className="text-lg font-black text-brand-primary leading-none">{subj.questions}</p>
                                   <p className="text-[10px] uppercase font-bold text-slate-400">Savol</p>
                                </div>
                             </div>
                          ))}
                       </div>
                       <div className="pt-6 border-t border-slate-100 flex justify-between items-center">
                          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Maksimal Ball</p>
                          <p className="text-3xl font-display font-black text-brand-primary">{track.maxScore}</p>
                       </div>
                    </motion.div>
                  ))}
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
