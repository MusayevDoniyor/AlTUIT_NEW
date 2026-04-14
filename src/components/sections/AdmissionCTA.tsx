"use client";

import React from "react";
import Link from "next/link";
import { Download, FileText, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export const AdmissionCTA = () => {
  return (
    <section className="py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto rounded-[3rem] bg-brand-primary p-12 lg:p-24 relative overflow-hidden flex flex-col items-center text-center">
        {/* Background blobs */}
        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-brand-secondary/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-3xl space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/10 text-brand-secondary text-sm font-bold uppercase tracking-widest border border-white/10 backdrop-blur-sm">
            Qabul 2025
          </div>
          
          <h2 className="text-4xl lg:text-6xl font-display text-white leading-tight">
            Biz bilan O'z <span className="text-brand-secondary">Karyerangizni</span> Yarating
          </h2>
          
          <p className="text-white/70 text-lg leading-relaxed">
            Hujjat topshirish jarayoni va kerakli ma'lumotlarni bilib oling. Akademik litseyga o'qishga kirish uchun hoziroq ariza topshiring.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 pt-4">
            <Link 
              href="/admission"
              className="px-10 py-5 bg-white text-brand-primary rounded-2xl font-black text-lg shadow-2xl hover:bg-slate-50 transition-all transform hover:-translate-y-1"
            >
              Hujjat topshirish
            </Link>
            <button className="px-10 py-5 bg-brand-primary border-2 border-white/20 text-white rounded-2xl font-black text-lg hover:bg-white/10 transition-all flex items-center gap-3">
              <Download size={22} />
              Qo'llanmani yuklash
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-x-10 gap-y-4 pt-10 text-white/50 text-sm font-bold uppercase tracking-[0.15em]">
            <div className="flex items-center gap-2">
              <CheckCircle size={18} className="text-brand-secondary" />
              <span>Sifatli Ta'lim</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={18} className="text-brand-secondary" />
              <span>Diplom Oling</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={18} className="text-brand-secondary" />
              <span>Karyera Boshlang</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
