"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Cpu, BookOpen, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";

export const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-brand-muted">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-primary/5 -skew-x-12 transform origin-top-right transition-all duration-1000"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-brand-secondary/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-bold uppercase tracking-wider">
            <Cpu size={14} />
            <span>IT Yo'nalishidagi yetakchi litsey</span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-display leading-[1.1] text-slate-900">
            Kelajak <span className="text-brand-primary">IT Texnologiyalari</span> Shu Yerdan Boshlanadi
          </h1>
          
          <p className="text-lg text-slate-600 max-w-xl leading-relaxed">
            Muhammad al-Xorazmiy nomidagi TATU akademik litseyida zamonaviy bilimlar va yuqori texnologiyalar olamiga birinchi qadamingizni qo'ying.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Link 
              href="/admission"
              className="px-8 py-4 bg-brand-primary text-white rounded-xl font-bold flex items-center gap-2 shadow-xl shadow-brand-primary/30 hover:bg-brand-primary/90 transition-all transform hover:-translate-y-1"
            >
              Hujjat topshirish
              <ArrowRight size={20} />
            </Link>
            <Link 
              href="/about"
              className="px-8 py-4 bg-white text-brand-primary border-2 border-brand-primary/10 rounded-xl font-bold hover:bg-slate-50 transition-all shadow-sm"
            >
              Batafsil ma'lumot
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-8 pt-4 border-t border-slate-200">
            <div>
              <div className="text-3xl font-display font-black text-brand-primary">90%</div>
              <div className="text-xs text-slate-500 uppercase font-bold tracking-tight">Otmga kirish</div>
            </div>
            <div>
              <div className="text-3xl font-display font-black text-brand-primary">390+</div>
              <div className="text-xs text-slate-500 uppercase font-bold tracking-tight">Bitiruvchilar</div>
            </div>
            <div>
              <div className="text-3xl font-display font-black text-brand-primary">26+</div>
              <div className="text-xs text-slate-500 uppercase font-bold tracking-tight">To'garaklar</div>
            </div>
          </div>
        </motion.div>

        {/* Hero Visual */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative hidden lg:block"
        >
          <div className="relative z-10 rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white">
            <img 
              src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop" 
              alt="Students learning IT" 
              className="w-full h-[500px] object-cover"
            />
          </div>
          
          {/* Floating Cards */}
          <div className="absolute -top-10 -right-10 glass-card p-6 rounded-2xl shadow-xl z-20 animate-bounce-slow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                <GraduationCap size={24} />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-bold uppercase">Grant O'rinlari</p>
                <p className="text-xl font-black text-slate-900">120 tadan ko'p</p>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-10 -left-10 glass-card p-6 rounded-2xl shadow-xl z-20">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                <BookOpen size={24} />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-bold uppercase">Akademik ta'lim</p>
                <p className="text-xl font-black text-slate-900">Xalqaro standart</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
