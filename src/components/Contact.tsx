'use client';

import { useState } from 'react';
import { translations, type Lang } from '@/lib/i18n';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

interface ContactProps { lang: Lang; }

export default function Contact({ lang }: ContactProps) {
  const t = translations[lang];
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setForm({ name: '', email: '', message: '' });
  };

  const info = [
    { icon: MapPin, label: t.contact_address, value: t.contact_address_val },
    { icon: Phone, label: t.contact_phone, value: t.contact_phone_val },
    { icon: Mail, label: t.contact_email, value: t.contact_email_val },
    { icon: Clock, label: t.contact_schedule, value: t.contact_schedule_val },
  ];

  return (
    <section id="contact" style={{ padding: '96px 0', background: '#f8f9fc' }}>
      <div className="container-custom">
        <div style={{ textAlign: 'center', maxWidth: 500, margin: '0 auto 56px' }}>
          <div style={{
            display: 'inline-block', background: 'rgba(26,58,110,0.08)', color: '#1a3a6e',
            fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.08em', padding: '5px 14px',
            borderRadius: 50, marginBottom: 16, textTransform: 'uppercase',
          }}>
            {lang === 'uz' ? "Bog'lanish" : lang === 'ru' ? 'Контакты' : 'Contact'}
          </div>
          <h2 className="section-title">{t.contact_title}</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32 }}>
          {/* Info */}
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginBottom: 28 }}>
              {info.map((item, i) => (
                <div key={i} style={{
                  display: 'flex', gap: 16, alignItems: 'flex-start',
                  background: 'white', borderRadius: 14, padding: '18px 20px',
                  boxShadow: '0 4px 16px rgba(26,58,110,0.06)',
                  border: '1px solid rgba(26,58,110,0.06)',
                }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 10, flexShrink: 0,
                    background: 'linear-gradient(135deg, rgba(26,58,110,0.1), rgba(26,58,110,0.06))',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <item.icon size={20} color="#1a3a6e" />
                  </div>
                  <div>
                    <p style={{ color: '#9ca3af', fontSize: '0.75rem', fontWeight: 600, marginBottom: 4 }}>{item.label}</p>
                    <p style={{ color: '#1a1f2e', fontWeight: 600, fontSize: '0.88rem', lineHeight: 1.5 }}>{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Map placeholder */}
            <div style={{
              borderRadius: 16, overflow: 'hidden', height: 200,
              background: 'linear-gradient(135deg, #1a3a6e, #2d5bb5)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '1px solid rgba(26,58,110,0.1)',
            }}>
              <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.8)' }}>
                <MapPin size={32} style={{ marginBottom: 8 }} />
                <p style={{ fontSize: '0.85rem', fontWeight: 600 }}>
                  {lang === 'uz' ? "Toshkent, Yunusobod tumani" : lang === 'ru' ? "Ташкент, Юнусабадский район" : "Tashkent, Yunusabad district"}
                </p>
                <p style={{ fontSize: '0.75rem', opacity: 0.6, marginTop: 4 }}>Amir Temur shox ko'chasi, 108</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div style={{
            background: 'white', borderRadius: 20, padding: '36px 32px',
            boxShadow: '0 8px 40px rgba(26,58,110,0.08)', border: '1px solid rgba(26,58,110,0.07)',
          }}>
            <h3 style={{ color: '#1a1f2e', fontWeight: 700, fontSize: '1.2rem', marginBottom: 28 }}>
              ✉️ {t.contact_send}
            </h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div>
                <label style={{ display: 'block', color: '#374151', fontSize: '0.84rem', fontWeight: 600, marginBottom: 8 }}>
                  {t.contact_name}
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder={lang === 'uz' ? "Ismingizni kiriting" : lang === 'ru' ? "Введите ваше имя" : "Enter your name"}
                  style={{
                    width: '100%', padding: '12px 16px', borderRadius: 10,
                    border: '1.5px solid #e5e7eb', fontSize: '0.9rem', outline: 'none',
                    transition: 'border-color 0.2s', boxSizing: 'border-box',
                    fontFamily: 'Inter, sans-serif',
                  }}
                  onFocus={e => (e.target.style.borderColor = '#1a3a6e')}
                  onBlur={e => (e.target.style.borderColor = '#e5e7eb')}
                />
              </div>
              <div>
                <label style={{ display: 'block', color: '#374151', fontSize: '0.84rem', fontWeight: 600, marginBottom: 8 }}>
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  placeholder={lang === 'uz' ? "email@misol.uz" : "email@example.com"}
                  style={{
                    width: '100%', padding: '12px 16px', borderRadius: 10,
                    border: '1.5px solid #e5e7eb', fontSize: '0.9rem', outline: 'none',
                    transition: 'border-color 0.2s', boxSizing: 'border-box',
                    fontFamily: 'Inter, sans-serif',
                  }}
                  onFocus={e => (e.target.style.borderColor = '#1a3a6e')}
                  onBlur={e => (e.target.style.borderColor = '#e5e7eb')}
                />
              </div>
              <div>
                <label style={{ display: 'block', color: '#374151', fontSize: '0.84rem', fontWeight: 600, marginBottom: 8 }}>
                  {t.contact_msg}
                </label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  placeholder={lang === 'uz' ? "Xabaringizni yozing..." : lang === 'ru' ? "Напишите ваше сообщение..." : "Write your message..."}
                  style={{
                    width: '100%', padding: '12px 16px', borderRadius: 10,
                    border: '1.5px solid #e5e7eb', fontSize: '0.9rem', outline: 'none',
                    transition: 'border-color 0.2s', boxSizing: 'border-box',
                    resize: 'vertical', fontFamily: 'Inter, sans-serif',
                  }}
                  onFocus={e => (e.target.style.borderColor = '#1a3a6e')}
                  onBlur={e => (e.target.style.borderColor = '#e5e7eb')}
                />
              </div>
              <button
                type="submit"
                disabled={sent}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  padding: '14px', borderRadius: 10, border: 'none', cursor: 'pointer',
                  fontWeight: 700, fontSize: '0.95rem', fontFamily: 'Inter, sans-serif',
                  background: sent ? 'linear-gradient(135deg,#1d7a55,#134e3a)' : 'linear-gradient(135deg,#1a3a6e,#2d5bb5)',
                  color: 'white', transition: 'all 0.3s ease',
                }}
                onMouseEnter={e => { if (!sent) (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'none'; }}
              >
                {sent ? (
                  <>✓ {lang === 'uz' ? "Yuborildi!" : lang === 'ru' ? "Отправлено!" : "Sent!"}</>
                ) : (
                  <><Send size={16} /> {t.contact_submit}</>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
