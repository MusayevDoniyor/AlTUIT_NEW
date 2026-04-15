'use client';

import { translations, type Lang } from '@/lib/i18n';
import { Target, Eye, Star, BookOpen } from 'lucide-react';

interface AboutProps { lang: Lang; }

export default function About({ lang }: AboutProps) {
  const t = translations[lang];

  const sectionLabel =
    lang === 'uz' ? 'Litsey haqida'
    : lang === 'ru' ? 'О лицее'
    : 'About';

  const estLabel   = lang === 'uz' ? "Ta'sis etilgan"  : lang === 'ru' ? 'Основан'       : 'Established';
  const uniLabel   = lang === 'uz' ? 'Universitet'     : lang === 'ru' ? 'Университет'   : 'University';

  const values = [
    {
      icon: Target,
      title: lang === 'uz' ? 'Maqsadimiz'        : lang === 'ru' ? 'Наша цель'    : 'Our Mission',
      desc:  lang === 'uz' ? "Iqtidorli yoshlarni aniqlash va ularni zamonaviy bilim bilan qurollantirish"
           : lang === 'ru' ? "Выявление талантливой молодёжи и вооружение её современными знаниями"
           : "Identifying talented youth and equipping them with modern knowledge",
    },
    {
      icon: Eye,
      title: lang === 'uz' ? 'Qadriyatlar'       : lang === 'ru' ? 'Ценности'     : 'Values',
      desc:  lang === 'uz' ? "Bilim, halollik, insonparvarlik va milliy qadriyatlarga sadoqat"
           : lang === 'ru' ? "Знания, честность, гуманизм и преданность национальным ценностям"
           : "Knowledge, integrity, humanism and dedication to national values",
    },
    {
      icon: Star,
      title: lang === 'uz' ? "Ko'rsatkichlar"    : lang === 'ru' ? 'Показатели'   : 'Results',
      desc:  lang === 'uz' ? "O'quvchilarimizning 90%+ yetakchi oliy o'quv yurtlariga kiradi"
           : lang === 'ru' ? "Более 90% наших учеников поступают в ведущие вузы"
           : "Over 90% of our graduates enter leading universities",
    },
    {
      icon: BookOpen,
      title: lang === 'uz' ? "Ta'lim standarti"  : lang === 'ru' ? 'Стандарт обучения' : 'Education Standard',
      desc:  lang === 'uz' ? "Davlat ta'lim standartlari asosida chuqurlashtirilgan o'qitish metodologiyasi"
           : lang === 'ru' ? "Углублённая методология обучения на основе государственных стандартов"
           : "Deepened teaching methodology based on state education standards",
    },
  ];

  return (
    <section id="about" style={{ padding: '96px 0', background: '#f8f9fc' }}>
      <div className="container-custom">

        {/* Header */}
        <div style={{ maxWidth: 680, marginBottom: 20 }}>
          <div style={{ display: 'inline-block', background: 'rgba(26,58,110,0.08)', color: '#1a3a6e', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.08em', padding: '5px 14px', borderRadius: 50, marginBottom: 16, textTransform: 'uppercase' }}>
            {sectionLabel}
          </div>
          <h2 className="section-title accent-underline" style={{ marginBottom: 32 }}>{t.about_title}</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 40, alignItems: 'start' }}>
          {/* Text columns */}
          <div>
            <p style={{ color: '#4b5563', lineHeight: 1.85, marginBottom: 18, fontSize: '0.97rem' }}>{t.about_p1}</p>
            <p style={{ color: '#4b5563', lineHeight: 1.85, marginBottom: 18, fontSize: '0.97rem' }}>{t.about_p2}</p>
            <p style={{ color: '#4b5563', lineHeight: 1.85, fontSize: '0.97rem' }}>{t.about_p3}</p>

            {/* Founded chip */}
            <div style={{ marginTop: 28, display: 'inline-flex', alignItems: 'center', gap: 12, background: 'linear-gradient(135deg,#0f2347,#1a3a6e)', borderRadius: 14, padding: '16px 24px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: '#c8a96e', fontSize: '1.8rem', fontWeight: 800, lineHeight: 1 }}>1993</div>
                <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.73rem', marginTop: 4 }}>{estLabel}</div>
              </div>
              <div style={{ width: 1, height: 40, background: 'rgba(255,255,255,0.15)' }} />
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: '#c8a96e', fontSize: '1.8rem', fontWeight: 800, lineHeight: 1 }}>TATU</div>
                <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.73rem', marginTop: 4 }}>{uniLabel}</div>
              </div>
            </div>
          </div>

          {/* Values grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {values.map((v, i) => (
              <div key={i} className="card-hover" style={{ background: 'white', borderRadius: 14, padding: '22px 18px', boxShadow: '0 4px 20px rgba(26,58,110,0.06)', border: '1px solid rgba(26,58,110,0.07)' }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, marginBottom: 14, background: 'linear-gradient(135deg,rgba(26,58,110,0.08),rgba(26,58,110,0.04))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <v.icon size={20} color="#1a3a6e" />
                </div>
                <h3 style={{ fontWeight: 700, color: '#1a1f2e', fontSize: '0.9rem', marginBottom: 8 }}>{v.title}</h3>
                <p style={{ color: '#6b7280', fontSize: '0.8rem', lineHeight: 1.6 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
