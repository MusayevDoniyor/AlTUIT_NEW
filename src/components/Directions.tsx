'use client';

import { translations, type Lang } from '@/lib/i18n';
import { Calculator, Globe, Microscope, BookOpen, ArrowRight } from 'lucide-react';

interface DirectionsProps { lang: Lang; }

const dirColors = [
  { bg: 'linear-gradient(135deg,#0f2347,#1a3a6e)', accent: '#c8a96e' },
  { bg: 'linear-gradient(135deg,#1a3a6e,#2d5bb5)', accent: '#dfc08a' },
  { bg: 'linear-gradient(135deg,#134e3a,#1d7a55)', accent: '#86efc1' },
  { bg: 'linear-gradient(135deg,#3b1f6e,#6032bf)', accent: '#c4b5fd' },
];

const dirIcons = [Calculator, Globe, Microscope, BookOpen];

const dirSubjectsUz = [
  ['Matematika', 'Fizika', 'Informatika', 'Ingliz tili'],
  ['Matematika', 'Ingliz tili', 'Iqtisodiyot', 'Ona tili'],
  ['Biologiya', 'Kimyo', 'Matematika', 'Fizika'],
  ['Tarix', 'Huquq', 'Falsafa', 'Geografiya'],
];
const dirSubjectsRu = [
  ['Математика', 'Физика', 'Информатика', 'Английский'],
  ['Математика', 'Английский', 'Экономика', 'Родной язык'],
  ['Биология', 'Химия', 'Математика', 'Физика'],
  ['История', 'Право', 'Философия', 'География'],
];
const dirSubjectsEn = [
  ['Mathematics', 'Physics', 'Informatics', 'English'],
  ['Mathematics', 'English', 'Economics', 'Native Language'],
  ['Biology', 'Chemistry', 'Mathematics', 'Physics'],
  ['History', 'Law', 'Philosophy', 'Geography'],
];

const coreSubjectsLabel = { uz: 'Asosiy fanlar', ru: 'Основные предметы', en: 'Core Subjects' };
const applyLabel = { uz: 'Qabul →', ru: 'Поступление →', en: 'Apply →' };
const sectionTag = { uz: "Yo'nalishlar", ru: 'Направления', en: 'Directions' };

export default function Directions({ lang }: DirectionsProps) {
  const t = translations[lang];

  const subjects = lang === 'uz' ? dirSubjectsUz : lang === 'ru' ? dirSubjectsRu : dirSubjectsEn;

  const dirs = [
    { name: t.dir1_name, desc: t.dir1_desc },
    { name: t.dir2_name, desc: t.dir2_desc },
    { name: t.dir3_name, desc: t.dir3_desc },
    { name: t.dir4_name, desc: t.dir4_desc },
  ];

  return (
    <section id="directions" style={{ padding: '96px 0', background: 'white' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: 620, margin: '0 auto 56px' }}>
          <div style={{ display: 'inline-block', background: 'rgba(26,58,110,0.08)', color: '#1a3a6e', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.08em', padding: '5px 14px', borderRadius: 50, marginBottom: 16, textTransform: 'uppercase' }}>
            {sectionTag[lang]}
          </div>
          <h2 className="section-title" style={{ marginBottom: 12 }}>{t.dir_title}</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>{t.dir_subtitle}</p>
        </div>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 24 }}>
          {dirs.map((dir, i) => {
            const Icon = dirIcons[i];
            const color = dirColors[i];

            return (
              <div key={i} className="card-hover" style={{ borderRadius: 18, overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column' }}>
                {/* Top */}
                <div style={{ background: color.bg, padding: '28px 24px 24px' }}>
                  <div style={{ width: 50, height: 50, borderRadius: 12, background: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
                    <Icon size={24} color={color.accent} />
                  </div>
                  <h3 style={{ color: 'white', fontWeight: 700, fontSize: '1.05rem', marginBottom: 10, lineHeight: 1.3 }}>{dir.name}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.84rem', lineHeight: 1.65 }}>{dir.desc}</p>
                </div>

                {/* Bottom */}
                <div style={{ background: 'white', padding: '20px 24px', flex: 1 }}>
                  <p style={{ color: '#6b7280', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>
                    {coreSubjectsLabel[lang]}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 18 }}>
                    {subjects[i].map((s, j) => (
                      <span key={j} style={{ background: 'rgba(26,58,110,0.06)', color: '#1a3a6e', fontSize: '0.78rem', fontWeight: 600, padding: '4px 12px', borderRadius: 50, border: '1px solid rgba(26,58,110,0.1)' }}>
                        {s}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => document.querySelector('#admission')?.scrollIntoView({ behavior: 'smooth' })}
                    style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', color: '#1a3a6e', fontWeight: 600, fontSize: '0.84rem', padding: 0, transition: 'gap 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.gap = '10px'}
                    onMouseLeave={e => e.currentTarget.style.gap = '6px'}
                  >
                    {applyLabel[lang]} <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
