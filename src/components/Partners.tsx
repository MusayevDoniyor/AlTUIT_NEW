'use client';

import { translations, type Lang } from '@/lib/i18n';
import { Handshake } from 'lucide-react';

interface PartnersProps { lang: Lang; }

const partners = [
  { name: 'TATU', full: "Toshkent axborot texnologiyalari universiteti", abbr: 'TATU', color: '#1a3a6e' },
  { name: 'INHA', full: 'Inha University in Tashkent', abbr: 'INHA', color: '#003087' },
  { name: 'WIUT', full: 'Westminster International University in Tashkent', abbr: 'WIUT', color: '#8B0000' },
  { name: 'TSUE', full: "Toshkent davlat iqtisodiyot universiteti", abbr: 'TSUE', color: '#1d7a55' },
  { name: 'UZUM', full: "O'zbekiston Milliy universiteti", abbr: 'NUUz', color: '#2d5bb5' },
  { name: 'AKFA', full: 'AKFA University', abbr: 'AKFA', color: '#c8a96e' },
];

export default function Partners({ lang }: PartnersProps) {
  const t = translations[lang];
  return (
    <section id="partners" style={{ padding: '80px 0', background: '#f0f4ff' }}>
      <div className="container-custom">
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(26,58,110,0.08)', color: '#1a3a6e',
            fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.08em', padding: '5px 14px',
            borderRadius: 50, marginBottom: 16, textTransform: 'uppercase',
          }}>
            <Handshake size={13} /> {lang === 'uz' ? 'Hamkorlar' : lang === 'ru' ? 'Партнёры' : 'Partners'}
          </div>
          <h2 className="section-title" style={{ marginBottom: 10 }}>{t.partners_title}</h2>
          <p style={{ color: '#6b7280', fontSize: '0.95rem' }}>{t.partners_subtitle}</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 18 }}>
          {partners.map((p, i) => (
            <div key={i} className="card-hover" style={{
              background: 'white', borderRadius: 16, padding: '28px 16px',
              textAlign: 'center', border: '1px solid rgba(26,58,110,0.07)',
              boxShadow: '0 4px 18px rgba(26,58,110,0.05)',
            }}>
              <div style={{
                width: 64, height: 64, borderRadius: 16, margin: '0 auto 14px',
                background: `${p.color}18`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ color: p.color, fontWeight: 800, fontSize: '1rem' }}>{p.abbr}</span>
              </div>
              <div style={{ color: '#1a1f2e', fontWeight: 600, fontSize: '0.8rem', lineHeight: 1.4 }}>
                {p.full}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
