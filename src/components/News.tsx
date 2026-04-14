'use client';

import { translations, type Lang } from '@/lib/i18n';
import { Calendar, ArrowRight } from 'lucide-react';

interface NewsProps { lang: Lang; }

const newsItems = [
  {
    date: '2026-03-21',
    dateLabel: "21 Mart 2026 | 21 Марта 2026 | March 21, 2026",
    titleUz: "Navro'z bayrami munosabati bilan katta bayram tashkil etildi",
    titleRu: "Большой праздник организован в честь Навруза",
    titleEn: "Grand celebration organized for Nowruz holiday",
    descUz: "Litsey o'quvchilari va o'qituvchilar Navro'z bayramini shod-xurramlik bilan nishonlashdi. Turli san'at ko'rsatuvlari va milliy taomlar namoyish qilindi.",
    descRu: "Ученики и учителя лицея радостно отпраздновали Навруз. Были показаны различные художественные выступления и национальные блюда.",
    descEn: "Students and teachers of the lyceum joyfully celebrated Nowruz. Various artistic performances and national cuisines were presented.",
    tag: "Ijtimoiy | Социальное | Social",
    color: '#1a3a6e',
  },
  {
    date: '2026-04-05',
    dateLabel: "5 Aprel 2026 | 5 Апреля 2026 | April 5, 2026",
    titleUz: "Informatika va robototexnika ko'rgazmasi o'tkazildi",
    titleRu: "Проведена выставка по информатике и робототехнике",
    titleEn: "Informatics and robotics exhibition was held",
    descUz: "O'quvchilar tomonidan tayyorlangan 30 dan ortiq loyiha namoyish etildi. Eng yaxshi loyihalar tegishli mukofotlar bilan taqdirlandi.",
    descRu: "Было представлено более 30 проектов, подготовленных учениками. Лучшие проекты были удостоены соответствующих наград.",
    descEn: "Over 30 projects prepared by students were presented. The best projects were awarded with appropriate prizes.",
    tag: "Ilm | Наука | Science",
    color: '#1d7a55',
  },
  {
    date: '2026-04-10',
    dateLabel: "10 Aprel 2026 | 10 Апреля 2026 | April 10, 2026",
    titleUz: "Matematika olimpiadasi g'oliblari mukofotlandi",
    titleRu: "Победители олимпиады по математике награждены",
    titleEn: "Math olympiad winners were awarded",
    descUz: "Respublika matematika olimpiadasida g'olib bo'lgan o'quvchilar litsey rahbariyati tomonidan qabul qilindi va nishonlandi.",
    descRu: "Ученики, победившие на республиканской олимпиаде по математике, были приняты и отмечены руководством лицея.",
    descEn: "Students who won the national math olympiad were received and celebrated by lyceum leadership.",
    tag: "Yutuqlar | Достижения | Achievement",
    color: '#c8a96e',
  },
];

export default function News({ lang }: NewsProps) {
  const t = translations[lang];

  return (
    <section id="news" style={{ padding: '96px 0', background: 'white' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{
              display: 'inline-block', background: 'rgba(26,58,110,0.08)', color: '#1a3a6e',
              fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.08em', padding: '5px 14px',
              borderRadius: 50, marginBottom: 14, textTransform: 'uppercase',
            }}>
              {lang === 'uz' ? 'Yangiliklar' : lang === 'ru' ? 'Новости' : 'News'}
            </div>
            <h2 className="section-title">{t.news_title}</h2>
          </div>
          <button style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: 'none', border: '1.5px solid #1a3a6e', borderRadius: 8,
            color: '#1a3a6e', fontWeight: 600, fontSize: '0.87rem', padding: '10px 20px',
            cursor: 'pointer', transition: 'all 0.25s ease',
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#1a3a6e'; (e.currentTarget as HTMLButtonElement).style.color = 'white'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'none'; (e.currentTarget as HTMLButtonElement).style.color = '#1a3a6e'; }}
          >
            {t.news_all} <ArrowRight size={15} />
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
          {newsItems.map((item, i) => {
            const title = lang === 'uz' ? item.titleUz : lang === 'ru' ? item.titleRu : item.titleEn;
            const desc = lang === 'uz' ? item.descUz : lang === 'ru' ? item.descRu : item.descEn;
            const dateStr = item.dateLabel.split('|')[lang === 'uz' ? 0 : lang === 'ru' ? 1 : 2].trim();
            const tagStr = item.tag.split('|')[lang === 'uz' ? 0 : lang === 'ru' ? 1 : 2].trim();

            return (
              <div key={i} className="news-card" style={{ cursor: 'pointer' }}>
                {/* Color strip */}
                <div style={{ height: 4, background: `linear-gradient(90deg, ${item.color}, ${item.color}88)` }} />

                <div style={{ padding: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <span style={{
                      background: `${item.color}15`, color: item.color,
                      fontSize: '0.74rem', fontWeight: 700, padding: '4px 10px',
                      borderRadius: 50, border: `1px solid ${item.color}30`,
                    }}>
                      {tagStr}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#9ca3af', fontSize: '0.77rem' }}>
                      <Calendar size={13} /> {dateStr}
                    </div>
                  </div>
                  <h3 style={{ color: '#1a1f2e', fontWeight: 700, fontSize: '1rem', lineHeight: 1.45, marginBottom: 12 }}>
                    {title}
                  </h3>
                  <p style={{ color: '#6b7280', fontSize: '0.84rem', lineHeight: 1.7, marginBottom: 18 }}>
                    {desc}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: item.color, fontSize: '0.83rem', fontWeight: 600 }}>
                    {t.news_read} <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
