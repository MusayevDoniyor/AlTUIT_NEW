'use client';

import { translations, type Lang } from '@/lib/i18n';
import { Trophy, Medal, Star, Award } from 'lucide-react';

interface AchievementsProps { lang: Lang; }

const achievements = [
  {
    icon: Trophy,
    color: '#c8a96e',
    year: '2024',
    titleUz: "Matematika olimpiadasi – Respublika 1-o'rni",
    titleRu: "Олимпиада по математике – 1 место в республике",
    titleEn: "Math Olympiad – National 1st Place",
    descUz: "O'quvchimiz respublika matematika olimpiadasida birinchi o'rinni qo'lga kiritdi.",
    descRu: "Наш ученик занял первое место на республиканской олимпиаде по математике.",
    descEn: "Our student won first place at the national mathematics olympiad.",
  },
  {
    icon: Medal,
    color: '#6b9eff',
    year: '2024',
    titleUz: "Xalqaro informatika olimpiadasi – Bronza medal",
    titleRu: "Международная олимпиада по информатике – Бронзовая медаль",
    titleEn: "International Informatics Olympiad – Bronze Medal",
    descUz: "Xalqaro informatika olimpiadasida bronza medal qo'lga kiritildi.",
    descRu: "На международной олимпиаде по информатике завоёвана бронзовая медаль.",
    descEn: "A bronze medal was won at the international informatics olympiad.",
  },
  {
    icon: Star,
    color: '#86efac',
    year: '2023',
    titleUz: "Kimyo va biologiyadan eng yaxshi natijalar",
    titleRu: "Лучшие результаты по химии и биологии",
    titleEn: "Top Results in Chemistry & Biology",
    descUz: "Kimyo va biologiya fanlaridan maktablar o'rtasida eng yuqori ballni to'pladik.",
    descRu: "Мы набрали наивысший балл по химии и биологии среди школ.",
    descEn: "Achieved the highest scores in chemistry and biology among lyceums.",
  },
  {
    icon: Award,
    color: '#f9a8d4',
    year: '2023',
    titleUz: "\"Yilning eng yaxshi litseyi\" unvoni",
    titleRu: "Звание «Лучший лицей года»",
    titleEn: "\"Best Lyceum of the Year\" Award",
    descUz: "Ta'lim vazirligi tomonidan eng yaxshi litsey deb e'tirof etildi.",
    descRu: "Признан лучшим лицеем Министерством образования.",
    descEn: "Recognized as the best lyceum by the Ministry of Education.",
  },
];

export default function Achievements({ lang }: AchievementsProps) {
  const t = translations[lang];
  return (
    <section id="achievements" style={{ padding: '96px 0', background: 'white' }}>
      <div className="container-custom">
        <div style={{ textAlign: 'center', maxWidth: 580, margin: '0 auto 56px' }}>
          <div style={{
            display: 'inline-block', background: 'rgba(26,58,110,0.08)', color: '#1a3a6e',
            fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.08em', padding: '5px 14px',
            borderRadius: 50, marginBottom: 16, textTransform: 'uppercase',
          }}>
            {lang === 'uz' ? 'Yutuqlar' : lang === 'ru' ? 'Достижения' : 'Achievements'}
          </div>
          <h2 className="section-title" style={{ marginBottom: 12 }}>{t.ach_title}</h2>
          <p style={{ color: '#6b7280', fontSize: '0.97rem', lineHeight: 1.6 }}>{t.ach_subtitle}</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
          {achievements.map((a, i) => {
            const title = lang === 'uz' ? a.titleUz : lang === 'ru' ? a.titleRu : a.titleEn;
            const desc = lang === 'uz' ? a.descUz : lang === 'ru' ? a.descRu : a.descEn;
            return (
              <div key={i} className="card-hover" style={{
                background: '#f8f9fc', borderRadius: 18, padding: '28px 24px',
                border: '1px solid rgba(26,58,110,0.07)',
                boxShadow: '0 4px 18px rgba(26,58,110,0.05)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
                  <div style={{
                    width: 50, height: 50, borderRadius: 14,
                    background: `${a.color}22`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <a.icon size={24} color={a.color} />
                  </div>
                  <span style={{
                    background: 'rgba(26,58,110,0.07)', color: '#1a3a6e',
                    fontSize: '0.78rem', fontWeight: 700, padding: '4px 12px', borderRadius: 50,
                  }}>{a.year}</span>
                </div>
                <h3 style={{ color: '#1a1f2e', fontWeight: 700, fontSize: '0.95rem', lineHeight: 1.4, marginBottom: 10 }}>
                  {title}
                </h3>
                <p style={{ color: '#6b7280', fontSize: '0.83rem', lineHeight: 1.65 }}>{desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
