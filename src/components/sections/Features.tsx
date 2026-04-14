"use client";

import React from "react";
import { Monitor, Users, FlaskConical, Trophy, Laptop, Library } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Laptop,
    title: "Zamonaviy IT Laboratoriyalar",
    description: "Eng so'nggi rusumdagi kompyuterlar bilan jihozlangan 3 ta maxsus laboratoriya o'quvchilar ixtiyorida.",
    color: "bg-blue-500",
  },
  {
    icon: FlaskConical,
    title: "Aniq Fanlar Laboratoriyasi",
    description: "Kimyo va Fizika fanlari bo'yicha amaliy mashg'ulotlar uchun jahon andozalariga mos jihozlar.",
    color: "bg-purple-500",
  },
  {
    icon: Users,
    title: "Malakali Ustozlar",
    description: "TATU professor-o'qituvchilari va tajribali mutaxassislar tomonidan o'tiladigan darslar.",
    color: "bg-emerald-500",
  },
  {
    icon: Trophy,
    title: "Olimpiada va Tanlovlar",
    description: "O'quvchilarimiz muntazam ravishda respublika va xalqaro fan olimpiadalarida faxrli o'rinlarni egallashadi.",
    color: "bg-orange-500",
  },
  {
    icon: Library,
    title: "Boy Kutubxona",
    description: "Zamonaviy badiiy va ilmiy adabiyotlar bilan boyitilgan, shinam mutolaa zallariga ega kutubxona.",
    color: "bg-pink-500",
  },
  {
    icon: Monitor,
    title: "Robototexnika To'garagi",
    description: "Kelajak texnologiyalarini bugundan o'rganish uchun robototexnika va dasturlash klublari.",
    color: "bg-teal-500",
  },
];

export const Features = () => {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <h2 className="text-brand-primary text-sm font-black uppercase tracking-[0.2em]">Nega aynan biz?</h2>
          <h3 className="text-4xl lg:text-5xl font-display text-slate-900 leading-tight">
            O'quvchilarimiz uchun yaratilgan <span className="text-brand-secondary">Eng Zo'r Imkoniyatlar</span>
          </h3>
          <p className="text-slate-500 text-lg">
            Sifatli ta'lim va zamonaviy infratuzilma birlashgan maskan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-8 rounded-3xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-2xl hover:shadow-brand-primary/5 transition-all duration-300"
            >
              <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center text-white mb-6 transform group-hover:scale-110 transition-transform shadow-lg shadow-current/20`}>
                <feature.icon size={28} />
              </div>
              <h4 className="text-xl font-display font-bold text-slate-900 mb-4 group-hover:text-brand-primary transition-colors">
                {feature.title}
              </h4>
              <p className="text-slate-600 leading-relaxed text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
