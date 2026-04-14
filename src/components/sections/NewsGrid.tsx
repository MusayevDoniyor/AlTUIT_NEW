"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Calendar, User } from "lucide-react";
import { motion } from "framer-motion";

const newsItems = [
  {
    image:
      "https://images.unsplash.com/photo-1544652478-6653e09f18a2?q=80&w=2070&auto=format&fit=crop",
    date: "28 Fevral, 2024",
    title: "TATU rektorining litseyga tashrifi",
    category: "Tadbir",
    excerpt:
      "TATU rektori professor B.Maxkamov hamda 70 nafar filial direktorlari akademik litseyga tashrif buyurib, o'quvchilar bilan uchrashdilar.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop",
    date: "12 Mart, 2024",
    title: "Amity Universiteti Doktori mehmon bo'ldi",
    category: "Workshop",
    excerpt:
      "Amity universiteti Doktori akademik litsey talabalari uchun maxsus workshop tashkil qildi va IT sohasidagi many yangiliklar bilan bo'lishdi.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop",
    date: "20 Mart, 2024",
    title: "TATU universitetiga o'quv sayohati",
    category: "Sayohat",
    excerpt:
      "Akademik litsey o'quvchilari TATU universitetiga tashrif buyurishdi. U yerda universitet bo'ylab sayohat va rahbarlar bilan uchrashuv bo'lib o'tdi.",
  },
];

export const NewsGrid = () => {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
          <div className="space-y-4 max-w-2xl">
            <h2 className="text-brand-primary text-sm font-black uppercase tracking-[0.2em]">
              Yangiliklar
            </h2>
            <h3 className="text-4xl lg:text-5xl font-display text-slate-900 leading-tight">
              Litsey Hayoti va{" "}
              <span className="text-brand-secondary">Eng So'nggi Habarlar</span>
            </h3>
          </div>
          <Link
            href="/news"
            className="group flex items-center gap-2 text-brand-primary font-bold hover:text-brand-secondary transition-colors"
          >
            Barcha yangiliklar
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {newsItems.map((item, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[16/10] rounded-[2rem] overflow-hidden mb-6 shadow-xl shadow-slate-200/50">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 py-1.5 px-4 bg-brand-primary/90 text-white text-[10px] font-bold uppercase tracking-wider rounded-full backdrop-blur-md">
                  {item.category}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-brand-secondary" />
                    <span>{item.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <User size={14} className="text-brand-secondary" />
                    <span>Admin</span>
                  </div>
                </div>

                <h4 className="text-xl font-display font-bold text-slate-900 leading-snug group-hover:text-brand-primary transition-colors">
                  {item.title}
                </h4>

                <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">
                  {item.excerpt}
                </p>

                <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-brand-primary font-bold text-xs uppercase tracking-widest group-hover:gap-4 transition-all">
                  Batafsil o'qish
                  <ArrowRight size={14} />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
