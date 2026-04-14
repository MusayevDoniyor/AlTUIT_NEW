"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export const AboutSection = () => {
  return (
    <section className="py-24 px-6 bg-slate-50">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-[12px] border-white z-10">
            <img 
              src="https://images.unsplash.com/photo-1523050335102-c89b1811b13d?q=80&w=2070&auto=format&fit=crop" 
              alt="Lyceum Building" 
              className="w-full aspect-[4/5] object-cover"
            />
          </div>
          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-brand-primary rounded-3xl -z-0 opacity-10 animate-pulse"></div>
          
          <div className="absolute top-1/2 -left-8 -translate-y-1/2 glass-card p-8 rounded-3xl shadow-2xl z-20 hidden md:block max-w-xs">
            <div className="text-4xl font-black text-brand-primary mb-2">Prizident</div>
            <p className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4">PQ-3290 sonli Qarori</p>
            <p className="text-xs text-slate-500 leading-relaxed">
              O'zbekiston Respublikasi Prezidentining 2017-yil 26-sentyabrdagi maxsus qarori asosida tashkil etilgan.
            </p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <h2 className="text-brand-primary text-sm font-black uppercase tracking-[0.2em]">Biz haqimizda</h2>
            <h3 className="text-4xl lg:text-5xl font-display text-slate-900 leading-tight">
              TATU Akademik <span className="text-brand-secondary">Litseyi Tarixi</span>
            </h3>
          </div>
          
          <p className="text-lg text-slate-600 leading-relaxed">
            O'zbekiston Respublikasi Prezidentining 2017-yil 26-sentyabrdagi Qarori asosida TATU qoshidagi 2-son akademik litsey Muhammad al-Xorazmiy nomidagi Toshkent axborot texnologiyalari universiteti akademik litseyiga aylantirildi.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              "450 o'ringa mo'ljallangan bino",
              "Barcha auditoriyalar IT jihozlangan",
              "3 ta zamonaviy kompyuter sinfi",
              "Jahon andozasidagi laboratoriyalar",
              "Zamonaviy sport zal va stadion",
              "26 tadan ortiq to'garaklar"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle2 className="text-brand-accent shrink-0" size={20} />
                <span className="text-slate-700 font-medium">{item}</span>
              </div>
            ))}
          </div>

          <div className="p-8 bg-white rounded-[2rem] border border-brand-primary/10 shadow-xl shadow-brand-primary/5">
            <p className="text-slate-600 italic leading-relaxed">
              "Bizning maqsadimiz — yoshlarni nafaqat bilimli, balki zamonaviy texnologiyalarni chuqur tushunadigan va ulardan unumli foydalana oladigan mutaxassislar qilib tarbiyalashdir."
            </p>
            <div className="mt-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-slate-200"></div>
              <div>
                <p className="font-bold text-slate-900 leading-none">A. Abdullayev</p>
                <p className="text-xs text-slate-500 mt-1 uppercase font-bold tracking-wider">Litsey direktori</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
