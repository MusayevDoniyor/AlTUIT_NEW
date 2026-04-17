"use client";

import { useState } from "react";
import Link from "next/link";
import { translations, type Lang } from "@/lib/i18n";
import { Trophy, Medal, Star, Award, Handshake } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ACHIEVEMENTS = [
  {
    icon: Trophy,
    color: "#c8a96e",
    year: "2024",
    titleUz: "Matematika olimpiadasi – Respublika 1-o'rni",
    titleRu: "Олимпиада по математике – 1 место в республике",
    titleEn: "Math Olympiad – National 1st Place",
    descUz: "O'quvchimiz respublika matematika olimpiadasida birinchi o'rinni qo'lga kiritdi.",
    descRu: "Наш ученик занял первое место на республиканской олимпиаде по математике.",
    descEn: "Our student won first place at the national mathematics olympiad.",
  },
  {
    icon: Medal,
    color: "#6b9eff",
    year: "2024",
    titleUz: "Xalqaro informatika olimpiadasi – Bronza medal",
    titleRu: "Международная олимпиада по информатике – Бронзовая медаль",
    titleEn: "International Informatics Olympiad – Bronze Medal",
    descUz: "Xalqaro informatika olimpiadasida bronza medal qo'lga kiritildi.",
    descRu: "На международной олимпиаде по информатике завоёвана бронзовая медаль.",
    descEn: "A bronze medal was won at the international informatics olympiad.",
  },
  {
    icon: Star,
    color: "#86efac",
    year: "2023",
    titleUz: "Kimyo va biologiyadan eng yaxshi natijalar",
    titleRu: "Лучшие результаты по химии и биологии",
    titleEn: "Top Results in Chemistry & Biology",
    descUz: "Kimyo va biologiya fanlaridan maktablar o'rtasida eng yuqori ballni to'pladik.",
    descRu: "Мы набрали наивысший балл по химии и биологии среди школ.",
    descEn: "Achieved the highest scores in chemistry and biology among lyceums.",
  },
  {
    icon: Award,
    color: "#f9a8d4",
    year: "2023",
    titleUz: "\"Yilning eng yaxshi litseyi\" unvoni",
    titleRu: "Звание «Лучший лицей года»",
    titleEn: "\"Best Lyceum of the Year\" Award",
    descUz: "Ta'lim vazirligi tomonidan eng yaxshi litsey deb e'tirof etildi.",
    descRu: "Признан лучшим лицеем Министерством образования.",
    descEn: "Recognized as the best lyceum by the Ministry of Education.",
  },
  {
    icon: Trophy,
    color: "#c8a96e",
    year: "2023",
    titleUz: "Ingliz tili – Respublika 2-o'rni",
    titleRu: "Английский язык – 2 место в республике",
    titleEn: "English Language – National 2nd Place",
    descUz: "O'quvchimiz respublika ingliz tili olimpiadasida 2-o'rinni qo'lga kiritdi.",
    descRu: "Наш ученик занял 2 место на республиканской олимпиаде по английскому языку.",
    descEn: "Our student won 2nd place at the national English language olympiad.",
  },
  {
    icon: Medal,
    color: "#fdba74",
    year: "2022",
    titleUz: "Fizika – Xalqaro olimpiada ishtirokchisi",
    titleRu: "Физика – Участник международной олимпиады",
    titleEn: "Physics – International Olympiad Participant",
    descUz: "Litseyimiz o'quvchisi xalqaro fizika olimpiadasida O'zbekistonni vakilladi.",
    descRu: "Ученик нашего лицея представил Узбекистан на международной олимпиаде по физике.",
    descEn: "Our lyceum student represented Uzbekistan at the international physics olympiad.",
  },
];

const PARTNERS = [
  { name: "TATU", full: "Toshkent axborot texnologiyalari universiteti", abbr: "TATU", color: "#1a3a6e", href: "https://tatu.uz" },
  { name: "INHA", full: "Inha University in Tashkent", abbr: "INHA", color: "#003087", href: "https://inha.uz" },
  { name: "WIUT", full: "Westminster International University in Tashkent", abbr: "WIUT", color: "#8B0000", href: "https://wiut.uz" },
  { name: "TSUE", full: "Toshkent davlat iqtisodiyot universiteti", abbr: "TSUE", color: "#1d7a55", href: "https://tsue.uz" },
  { name: "NUUz", full: "O'zbekiston Milliy universiteti", abbr: "NUUz", color: "#2d5bb5", href: "https://nuu.uz" },
  { name: "AKFA", full: "AKFA University", abbr: "AKFA", color: "#c8a96e", href: "https://akfauniversity.uz" },
];

export default function SciencePage() {
  const [lang, setLang] = useState<Lang>("uz");
  const t = translations[lang];

  return (
    <main>
      <Navbar lang={lang} onLangChange={setLang} />

      {/* PAGE BANNER */}
      <div className="page-banner" style={{ paddingTop: 140 }}>
        <div className="container-custom" style={{ position: "relative", zIndex: 1 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 16,
              fontSize: "0.8rem",
              color: "rgba(255,255,255,0.6)",
            }}
          >
            <Link href="/" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>
              {t.nav_home}
            </Link>
            <span>/</span>
            <span style={{ color: "#c8a96e" }}>{t.nav_science}</span>
          </div>
          <h1
            style={{
              color: "white",
              fontWeight: 900,
              fontSize: "clamp(2rem,5vw,3rem)",
              marginBottom: 12,
            }}
          >
            {lang === "uz" ? "Ilmiy hayot" : lang === "ru" ? "Научная жизнь" : "Academic Life"}
          </h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1rem", maxWidth: 600 }}>
            {t.ach_subtitle}
          </p>
        </div>
      </div>

      {/* ===== ACHIEVEMENTS ===== */}
      <section style={{ padding: "96px 0", background: "white" }}>
        <div className="container-custom">
          <div style={{ textAlign: "center", maxWidth: 580, margin: "0 auto 56px" }}>
            <div
              style={{
                display: "inline-block",
                background: "rgba(26,58,110,0.08)",
                color: "#1a3a6e",
                fontSize: "0.78rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                padding: "5px 14px",
                borderRadius: 50,
                marginBottom: 16,
                textTransform: "uppercase",
              }}
            >
              {lang === "uz" ? "Yutuqlar" : lang === "ru" ? "Достижения" : "Achievements"}
            </div>
            <h2 className="section-title" style={{ marginBottom: 12 }}>
              {t.ach_title}
            </h2>
            <p style={{ color: "#6b7280", fontSize: "0.97rem", lineHeight: 1.6 }}>
              {t.ach_subtitle}
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
              gap: 24,
            }}
          >
            {ACHIEVEMENTS.map((a, i) => {
              const title =
                lang === "uz" ? a.titleUz : lang === "ru" ? a.titleRu : a.titleEn;
              const desc =
                lang === "uz" ? a.descUz : lang === "ru" ? a.descRu : a.descEn;
              return (
                <div
                  key={i}
                  className="card-hover"
                  style={{
                    background: "#f8f9fc",
                    borderRadius: 18,
                    padding: "28px 24px",
                    border: "1px solid rgba(26,58,110,0.07)",
                    boxShadow: "0 4px 18px rgba(26,58,110,0.05)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: 18,
                    }}
                  >
                    <div
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 14,
                        background: `${a.color}22`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <a.icon size={24} color={a.color} />
                    </div>
                    <span
                      style={{
                        background: "rgba(26,58,110,0.07)",
                        color: "#1a3a6e",
                        fontSize: "0.78rem",
                        fontWeight: 700,
                        padding: "4px 12px",
                        borderRadius: 50,
                      }}
                    >
                      {a.year}
                    </span>
                  </div>
                  <h3
                    style={{
                      color: "#1a1f2e",
                      fontWeight: 700,
                      fontSize: "0.95rem",
                      lineHeight: 1.4,
                      marginBottom: 10,
                    }}
                  >
                    {title}
                  </h3>
                  <p style={{ color: "#6b7280", fontSize: "0.83rem", lineHeight: 1.65 }}>
                    {desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Stats summary */}
          <div
            style={{
              marginTop: 64,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
              gap: 24,
            }}
          >
            {[
              {
                num: "200+",
                label: lang === "uz" ? "Olimpiada g'oliblari" : lang === "ru" ? "Победители олимпиад" : "Olympiad winners",
                color: "#c8a96e",
              },
              {
                num: "15+",
                label: lang === "uz" ? "Xalqaro mukofotlar" : lang === "ru" ? "Международных наград" : "International awards",
                color: "#1a3a6e",
              },
              {
                num: "30+",
                label: lang === "uz" ? "Respublika 1-o'rinlari" : lang === "ru" ? "Республиканских 1 мест" : "National 1st places",
                color: "#1d7a55",
              },
              {
                num: "96%",
                label: lang === "uz" ? "Oliy ta'limga kirish" : lang === "ru" ? "Поступление в вузы" : "Uni admission rate",
                color: "#2d5bb5",
              },
            ].map((s, i) => (
              <div
                key={i}
                style={{
                  background: "linear-gradient(135deg,#0f2347,#1a3a6e)",
                  borderRadius: 16,
                  padding: "28px 20px",
                  textAlign: "center",
                }}
              >
                <div style={{ color: "#c8a96e", fontSize: "2.5rem", fontWeight: 900, lineHeight: 1, marginBottom: 8 }}>
                  {s.num}
                </div>
                <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.87rem" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PARTNERS ===== */}
      <section id="partners" style={{ padding: "96px 0", background: "#f0f4ff" }}>
        <div className="container-custom">
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(26,58,110,0.08)",
                color: "#1a3a6e",
                fontSize: "0.78rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                padding: "5px 14px",
                borderRadius: 50,
                marginBottom: 16,
                textTransform: "uppercase",
              }}
            >
              <Handshake size={13} />
              {lang === "uz" ? "Hamkorlar" : lang === "ru" ? "Партнёры" : "Partners"}
            </div>
            <h2 className="section-title" style={{ marginBottom: 10 }}>
              {t.partners_title}
            </h2>
            <p style={{ color: "#6b7280", fontSize: "0.95rem" }}>{t.partners_subtitle}</p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
              gap: 20,
            }}
          >
            {PARTNERS.map((p, i) => (
              <a
                key={i}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="card-hover"
                style={{
                  background: "white",
                  borderRadius: 16,
                  padding: "32px 16px",
                  textAlign: "center",
                  border: "1px solid rgba(26,58,110,0.07)",
                  boxShadow: "0 4px 18px rgba(26,58,110,0.05)",
                  textDecoration: "none",
                  display: "block",
                }}
              >
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 16,
                    margin: "0 auto 14px",
                    background: `${p.color}18`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span style={{ color: p.color, fontWeight: 800, fontSize: "1rem" }}>{p.abbr}</span>
                </div>
                <div style={{ color: "#1a1f2e", fontWeight: 600, fontSize: "0.8rem", lineHeight: 1.4 }}>
                  {p.full}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <Footer lang={lang} />
    </main>
  );
}
