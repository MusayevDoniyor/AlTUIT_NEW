'use client';

import { useEffect, useRef, useState } from 'react';
import { translations, type Lang } from '@/lib/i18n';
import { TrendingUp, Users2, GraduationCap, Trophy } from 'lucide-react';

interface StatsProps { lang: Lang; }

function Counter({ to, active, suffix = '' }: { to: number; active: boolean; suffix?: string }) {
  const [val, setVal] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    if (!active || started.current) return;
    started.current = true;
    const d = 1800;
    const s = Date.now();
    const tick = () => {
      const p = Math.min((Date.now() - s) / d, 1);
      const e = 1 - (1 - p) ** 4;
      setVal(Math.round(e * to));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [to, active]);
  return <>{val}{suffix}</>;
}

export default function Stats({ lang }: StatsProps) {
  const t = translations[lang];
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const admissionLabel = lang === 'uz' ? "Oliy ta'limga kirish" : lang === 'ru' ? 'Поступление в вузы' : 'Uni Admission Rate';
  const olympiadLabel  = lang === 'uz' ? "Olimpiada g'oliblari" : lang === 'ru' ? 'Победители олимпиад' : 'Olympiad Winners';

  const stats = [
    { icon: GraduationCap, value: 1200, suffix: '+', label: t.hero_stat1, color: '#1a3a6e' },
    { icon: Users2,         value: 85,   suffix: '+', label: t.hero_stat2, color: '#2d5bb5' },
    { icon: TrendingUp,     value: 96,   suffix: '%', label: admissionLabel, color: '#1d7a55' },
    { icon: Trophy,         value: 200,  suffix: '+', label: olympiadLabel,  color: '#c8a96e' },
  ];

  return (
    <section ref={ref} style={{ padding: '72px 0', background: 'linear-gradient(135deg,#f0f4ff,#e8eeff)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 24 }}>
          {stats.map((s, i) => (
            <div key={i} style={{ textAlign: 'center', padding: '24px 16px' }}>
              <div style={{ width: 60, height: 60, borderRadius: 16, margin: '0 auto 16px', background: `${s.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${s.color}28` }}>
                <s.icon size={26} color={s.color} />
              </div>
              <div style={{ fontSize: '2.8rem', fontWeight: 900, color: s.color, lineHeight: 1, marginBottom: 8 }}>
                <Counter to={s.value} active={inView} suffix={s.suffix} />
              </div>
              <div style={{ color: '#6b7280', fontSize: '0.88rem', fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
