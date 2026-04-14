"use client";

import React from "react";
import { motion } from "framer-motion";
import { SITE_DATA, AdminMember, Department } from "@/lib/constants";
import { Mail, Phone, Award } from "lucide-react";

export default function AdministrationPage() {
  return (
    <div className="pt-24 min-h-screen bg-slate-50">
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 space-y-4">
            <h1 className="text-4xl lg:text-6xl font-display text-slate-900 leading-tight">
              Litsey <span className="text-brand-primary">Rahbariyat</span>
            </h1>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">
              Muhammad al-Xorazmiy nomidagi TATU akademik litseyining ma'muriy jamoasi bilan tanishing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {SITE_DATA.administration.map((member: AdminMember, i: number) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-xl shadow-slate-200/50 group"
              >
                <div className="aspect-[3/4] bg-slate-100 flex items-center justify-center relative overflow-hidden">
                   {/* Placeholder for real images */}
                   <div className="text-slate-300 transform group-hover:scale-110 transition-transform duration-500">
                      <Award size={120} strokeWidth={1} />
                   </div>
                   <div className="absolute top-4 left-4 py-1 px-4 bg-brand-primary/90 text-white text-[10px] font-bold uppercase tracking-wider rounded-full backdrop-blur-md">
                      {member.role}
                   </div>
                </div>
                <div className="p-8 space-y-4 text-center">
                  <h3 className="text-xl font-display font-bold text-slate-900 group-hover:text-brand-primary transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed font-medium">
                    {member.title || member.role}
                  </p>
                  
                  <div className="pt-4 flex justify-center gap-4 text-slate-400">
                     <button className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center hover:bg-brand-primary hover:text-white transition-all">
                        <Phone size={18} />
                     </button>
                     <button className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center hover:bg-brand-primary hover:text-white transition-all">
                        <Mail size={18} />
                     </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-32 p-12 bg-brand-primary rounded-[3rem] text-white relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
             <div className="max-w-3xl space-y-6 relative z-10">
                <h2 className="text-3xl font-display font-bold">Kafedralar haqida</h2>
                <p className="text-white/80 leading-relaxed">
                  Bugungi kunda akademik litseyda 4 kafedra mavjud: Aniq fanlar, Tabiiy fanlar, Xorijiy tillar va Gumanitar fanlar kafedralari. 
                  Ushbu kafedralarda jami 36 nafar tajribali o'qituvchi hodimlar, jumladan 2 nafar fan nomzodi va 15 nafar yetakchi o'qituvchilar faoliyat yuritadi.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6">
                   {SITE_DATA.departments.map((dept: Department, i: number) => (
                      <div key={i} className="py-3 px-6 bg-white/10 rounded-2xl text-center backdrop-blur-sm">
                         <p className="text-xs font-bold uppercase tracking-widest">{dept.name}</p>
                      </div>
                   ))}
                </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
