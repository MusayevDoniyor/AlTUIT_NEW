'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { translations, type Lang } from '@/lib/i18n';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

interface HeroProps { lang: Lang; }

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1541339907198-e08759dfc3ef?q=80&w=2070&auto=format&fit=crop', // Academic building
    titleUz: "Kelajak texnologiyalari markazi",
    titleRu: "Центр технологий будущего",
    titleEn: "Center of Future Technologies",
    descUz: "Zamonaviy laboratoriyalar va yuqori texnologik ta'lim muhiti sizni kutmoqda.",
    descRu: "Современные лаборатории и высокотехнологичная образовательная среда ждут вас.",
    descEn: "Modern laboratories and a high-tech educational environment await you.",
  },
  {
    image: 'https://images.unsplash.com/photo-1523050335392-9bc567597280?q=80&w=2070&auto=format&fit=crop', // University/College
    titleUz: "Sifatli ta'lim — muvaffaqiyat garovi",
    titleRu: "Качественное образование — залог успеха",
    titleEn: "Quality Education — Key to Success",
    descUz: "TATU huzuridagi Al-Xorazmiy litseyi bilan xalqaro standartlarda ilm oling.",
    descRu: "Получайте знания по международным стандартам в лицее Аль-Хорезми при ТУИТ.",
    descEn: "Study with international standards at the Al-Khwarizmi Lyceum under TUIT.",
  },
  {
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop', // Students
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
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];
  const title = lang === 'uz' ? slide.titleUz : lang === 'ru' ? slide.titleRu : slide.titleEn;
  const desc = lang === 'uz' ? slide.descUz : lang === 'ru' ? slide.descRu : slide.descEn;

  return (
    <section className="carousel-container">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          className="carousel-slide"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          <div className="carousel-overlay" />
          
          <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', alignItems: 'center', maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
            <div style={{ maxWidth: 800 }}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 24, background: 'rgba(200,169,110,0.15)', border: '1px solid rgba(200,169,110,0.4)', borderRadius: 50, padding: '6px 18px' }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#c8a96e' }} />
                  <span style={{ color: '#c8a96e', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{t.hero_badge}</span>
                </div>

                <h1 style={{ color: 'white', fontWeight: 900, fontSize: 'clamp(2rem, 5vw, 4rem)', lineHeight: 1.1, marginBottom: 20 }}>
                  {title}
                </h1>
                
                <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', lineHeight: 1.6, marginBottom: 40, maxWidth: 650 }}>
                  {desc}
                </p>

                <div style={{ display: 'flex', gap: 15, flexWrap: 'wrap' }}>
                  <button
                    onClick={() => document.querySelector('#admission')?.scrollIntoView({ behavior: 'smooth' })}
                    style={{ padding: '15px 35px', background: '#c8a96e', color: '#002147', border: 'none', borderRadius: 10, fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, transition: 'all 0.3s' }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(200,169,110,0.3)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
                  >
                    {t.hero_cta} <ArrowRight size={18} />
                  </button>
                  <button
                    onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
                    style={{ padding: '15px 35px', background: 'rgba(255,255,255,0.08)', color: 'white', border: '1.5px solid rgba(255,255,255,0.3)', borderRadius: 10, fontWeight: 600, fontSize: '0.95rem', cursor: 'pointer', backdropFilter: 'blur(10px)', transition: 'all 0.3s' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
                  >
                    {t.hero_cta2}
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button className="carousel-arrow" style={{ left: 30 }} onClick={prev} aria-label="Previous slide">
        <ChevronLeft size={24} />
      </button>
      <button className="carousel-arrow" style={{ right: 30 }} onClick={next} aria-label="Next slide">
        <ChevronRight size={24} />
      </button>

      {/* Dots */}
      <div className="carousel-dots">
        {slides.map((_, i) => (
          <div 
            key={i} 
            className={`carousel-dot ${current === i ? 'active' : ''}`}
            onClick={() => setCurrent(i)}
          />
        ))}
      </div>
    </section>
  );
}
