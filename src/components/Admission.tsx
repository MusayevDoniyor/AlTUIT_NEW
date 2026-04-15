'use client';

import { translations, type Lang } from '@/lib/i18n';
import { ClipboardList, FileText, PenLine, CheckCircle } from 'lucide-react';

interface AdmissionProps { lang: Lang; }

const privLabels = {
  title: { uz: "Imtiyozlar", ru: "Льготы", en: "Privileges" },
  items: {
    uz: [
      "Xalqaro, viloyat va shahar olimpiadalari g'oliblari (1-3 o'rin)",
      "IELTS Academic 5.0+, TOEFL IBT 42+, Cambridge PET va undan yuqori",
      "Milliy matematika sertifikatiga ega abituriyentlar",
    ],
    ru: [
      "Победители международных, областных и городских олимпиад (1-3 место)",
      "IELTS Academic 5.0+, TOEFL IBT 42+, Cambridge PET и выше",
      "Абитуриенты с национальным сертификатом по математике",
    ],
    en: [
      "Winners of international, regional and city olympiads (1st–3rd place)",
      "IELTS Academic 5.0+, TOEFL IBT 42+, Cambridge PET or higher",
      "Applicants with a national mathematics certificate",
    ],
  },
};

const applyBtn = { uz: "my.edu.uz orqali ro'yxatdan o'ting →", ru: "Зарегистрируйтесь на my.edu.uz →", en: "Register at my.edu.uz →" };
const sectionTag = { uz: "Qabul", ru: "Поступление", en: "Admissions" };

export default function Admission({ lang }: AdmissionProps) {
  const t = translations[lang];

  const steps = [
    { icon: ClipboardList, title: t.adm_step1_title, desc: t.adm_step1_desc, num: '01' },
    { icon: FileText,      title: t.adm_step2_title, desc: t.adm_step2_desc, num: '02' },
    { icon: PenLine,       title: t.adm_step3_title, desc: t.adm_step3_desc, num: '03' },
    { icon: CheckCircle,   title: t.adm_step4_title, desc: t.adm_step4_desc, num: '04' },
  ];

  return (
    <section id="admission" style={{ padding: '96px 0', background: 'linear-gradient(135deg,#0a1628 0%,#0f2347 50%,#1a3a6e 100%)', position: 'relative', overflow: 'hidden' }}>
      {/* BG decorations */}
      <div style={{ position: 'absolute', top: -100, right: -100, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle,rgba(200,169,110,0.08) 0%,transparent 70%)', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: -60, left: -60, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle,rgba(45,91,181,0.2) 0%,transparent 70%)', zIndex: 0 }} />

      <div className="container-custom" style={{ position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: 580, margin: '0 auto 64px' }}>
          <div style={{ display: 'inline-block', background: 'rgba(200,169,110,0.15)', color: '#c8a96e', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.08em', padding: '5px 14px', borderRadius: 50, marginBottom: 16, textTransform: 'uppercase', border: '1px solid rgba(200,169,110,0.25)' }}>
            {sectionTag[lang]}
          </div>
          <h2 style={{ color: 'white', fontWeight: 800, fontSize: 'clamp(1.6rem,4vw,2.2rem)', marginBottom: 14 }}>{t.adm_title}</h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.97rem', lineHeight: 1.7 }}>{t.adm_subtitle}</p>
        </div>

        {/* Steps */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 24, marginBottom: 56 }}>
          {steps.map((step, i) => (
            <div key={i}
              style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 18, padding: '28px 24px', position: 'relative', transition: 'all 0.3s ease' }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.09)'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.05)'; (e.currentTarget as HTMLDivElement).style.transform = 'none'; }}
            >
              {/* Ghost number */}
              <div style={{ position: 'absolute', top: 16, right: 18, color: 'rgba(200,169,110,0.18)', fontSize: '3.5rem', fontWeight: 900, lineHeight: 1, userSelect: 'none' }}>{step.num}</div>
              <div style={{ width: 52, height: 52, borderRadius: 14, marginBottom: 18, background: 'rgba(200,169,110,0.12)', border: '1px solid rgba(200,169,110,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <step.icon size={24} color="#c8a96e" />
              </div>
              <h3 style={{ color: 'white', fontWeight: 700, fontSize: '1rem', marginBottom: 10 }}>{step.title}</h3>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.85rem', lineHeight: 1.7 }}>{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Documents + Deadlines */}
        <div id="documents" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 24 }}>

          {/* Docs */}
          <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 18, padding: '28px 26px', backdropFilter: 'blur(12px)' }}>
            <h3 style={{ color: 'white', fontWeight: 700, fontSize: '1.05rem', marginBottom: 22 }}>📄 {t.docs_title}</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {t.docs_list.map((doc: string, i: number) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 0', borderBottom: i < t.docs_list.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none' }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#c8a96e', flexShrink: 0, marginTop: 7 }} />
                  <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.87rem', lineHeight: 1.5 }}>{doc}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {/* Deadline */}
            <div style={{ background: 'rgba(200,169,110,0.1)', border: '1px solid rgba(200,169,110,0.25)', borderRadius: 18, padding: '22px 26px', backdropFilter: 'blur(12px)' }}>
              <p style={{ color: '#c8a96e', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>📅 {t.docs_deadline}</p>
              <p style={{ color: 'white', fontWeight: 600, fontSize: '0.9rem' }}>{t.docs_deadline_val}</p>
            </div>
            {/* Exam */}
            <div style={{ background: 'rgba(200,169,110,0.1)', border: '1px solid rgba(200,169,110,0.25)', borderRadius: 18, padding: '22px 26px', backdropFilter: 'blur(12px)' }}>
              <p style={{ color: '#c8a96e', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>✍️ {t.docs_exam}</p>
              <p style={{ color: 'white', fontWeight: 600, fontSize: '0.9rem' }}>{t.docs_exam_val}</p>
            </div>

            {/* Privileges */}
            <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 18, padding: '22px 26px', backdropFilter: 'blur(12px)' }}>
              <p style={{ color: 'white', fontWeight: 700, fontSize: '0.92rem', marginBottom: 14 }}>⭐ {privLabels.title[lang]}</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {privLabels.items[lang].map((item: string, i: number) => (
                  <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#c8a96e', flexShrink: 0, marginTop: 8 }} />
                    <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.83rem', lineHeight: 1.6 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <a href="https://my.edu.uz" target="_blank" rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '16px', background: 'linear-gradient(135deg,#c8a96e,#dfc08a)', color: '#0f2347', borderRadius: 14, fontWeight: 700, fontSize: '0.92rem', textDecoration: 'none', transition: 'all 0.3s ease' }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 12px 32px rgba(200,169,110,0.35)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'none'; (e.currentTarget as HTMLAnchorElement).style.boxShadow = 'none'; }}
            >
              {applyBtn[lang]}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
