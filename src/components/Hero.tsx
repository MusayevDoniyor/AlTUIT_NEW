'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { translations, type Lang } from '@/lib/i18n';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

interface HeroProps { lang: Lang; }

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1541339907198-e08759dfc3ef?q=80&w=2070&auto=format&fit=crop',
    titleUz: "Kelajak texnologiyalari markazi",
    titleRu: "Центр технологий будущего",
    titleEn: "Center of Future Technologies",
    descUz: "Zamonaviy laboratoriyalar va yuqori texnologik ta'lim muhiti sizni kutmoqda.",
    descRu: "Современные лаборатории и высокотехнологичная образовательная среда ждут вас.",
    descEn: "Modern laboratories and a high-tech educational environment await you.",
  },
  {
    image: 'https://images.unsplash.com/photo-1523050335392-9bc567597280?q=80&w=2070&auto=format&fit=crop',
    titleUz: "Sifatli ta'lim — muvaffaqiyat garovi",
    titleRu: "Качественное образование — залог успеха",
    titleEn: "Quality Education — Key to Success",
    descUz: "TATU huzuridagi Al-Xorazmiy litseyi bilan xalqaro standartlarda ilm oling.",
    descRu: "Получайте знания по международным стандартам в лицее Аль-Хорезми при ТУИТ.",
    descEn: "Study with international standards at the Al-Khwarizmi Lyceum under TUIT.",
  },
  {
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop',
    titleUz: "Iqtidorli yoshlar jamiyati",
    titleRu: "Сообщество талантливой молодёжи",
    titleEn: "Community of Talented Youth",
    descUz: "Biz bilan birga yangi marralarni zabt eting va xalqaro olimpiadalarga tayyorlaning.",
    descRu: "Покоряйте новые вершины вместе с нами и готовьтесь к международным олимпиадам.",
    descEn: "Conquer new heights with us and prepare for international olympiads.",
  },
];

export default function Hero({ lang }: HeroProps) {
  const t = translations[lang];
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prev = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(next, 7000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];
  const title = lang === 'uz' ? slide.titleUz : lang === 'ru' ? slide.titleRu : slide.titleEn;
  const desc = lang === 'uz' ? slide.descUz : lang === 'ru' ? slide.descRu : slide.descEn;

  return (
    <section className="carousel-container" style={{ minHeight: '650px', height: '90vh', background: '#002147' }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          className="carousel-slide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          style={{ position: 'absolute', inset: 0 }}
        >
          <Image 
            src={slide.image} 
            alt="Hero background" 
            fill 
            priority={current === 0} 
            className="object-cover"
            style={{ zIndex: -1, opacity: 0.6 }}
            sizes="100vw"
          />

          <div className="carousel-overlay" style={{ background: 'linear-gradient(to right, rgba(0,33,71,0.9) 0%, rgba(0,33,71,0.3) 100%)' }} />
          
          <div className="container-custom" style={{ 
            position: 'relative', zIndex: 2, height: '100%', display: 'flex', 
            alignItems: 'center', paddingTop: '180px' 
          }}>
            <div style={{ maxWidth: 850 }}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <div style={{ 
                  display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 24, 
                  background: 'rgba(200,169,110,0.15)', border: '1px solid rgba(200,169,110,0.3)', 
                  borderRadius: 50, padding: '8px 20px' 
                }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#c8a96e' }} />
                  <span style={{ color: '#c8a96e', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                    {t.hero_badge}
                  </span>
                </div>

                <h1 style={{ 
                  color: 'white', fontWeight: 900, 
                  fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', 
                  lineHeight: 1.05, marginBottom: 25, 
                  textShadow: '0 4px 12px rgba(0,0,0,0.2)' 
                }}>
                  {title}
                </h1>
                
                <p style={{ 
                  color: 'rgba(255,255,255,0.9)', 
                  fontSize: 'clamp(1rem, 1.6vw, 1.3rem)', 
                  lineHeight: 1.6, marginBottom: 45, maxWidth: 700 
                }}>
                  {desc}
                </p>

                <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                  <button
                    onClick={() => document.querySelector('#admission')?.scrollIntoView({ behavior: 'smooth' })}
                    className="btn-primary"
                    style={{ padding: '18px 40px', borderRadius: 12, fontSize: '1rem', background: '#c8a96e', color: '#002147' }}
                  >
                    {t.hero_cta} <ArrowRight size={20} />
                  </button>
                  <button
                    onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
                    className="btn-outline"
                    style={{ padding: '18px 40px', borderRadius: 12, fontSize: '1rem', borderColor: 'rgba(255,255,255,0.4)', borderWidth: 2 }}
                  >
                    {t.hero_cta2}
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <button className="carousel-arrow hidden-mobile" style={{ left: 40 }} onClick={prev} aria-label="Previous slide">
        <ChevronLeft size={28} />
      </button>
      <button className="carousel-arrow hidden-mobile" style={{ right: 40 }} onClick={next} aria-label="Next slide">
        <ChevronRight size={28} />
      </button>

      <div className="carousel-dots">
        {slides.map((_, i) => (
          <div 
            key={i} 
            className={`carousel-dot ${current === i ? 'active' : ''}`}
            onClick={() => setCurrent(i)}
            style={{ width: current === i ? 32 : 12, height: 12 }}
          />
        ))}
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
        }
      `}</style>
    </section>
  );
}
