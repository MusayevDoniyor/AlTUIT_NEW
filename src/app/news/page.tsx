"use client";

import { useState } from "react";
import Link from "next/link";
import { translations, type Lang } from "@/lib/i18n";
import { Calendar, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ALL_NEWS = [
  {
    id: "navrouz-2026",
    date: "2026-03-21",
    titleUz: "Navro'z bayrami munosabati bilan katta bayram tashkil etildi",
    titleRu: "Большой праздник организован в честь Навруза",
    titleEn: "Grand celebration organized for Nowruz holiday",
    descUz:
      "Litsey o'quvchilari va o'qituvchilar Navro'z bayramini shod-xurramlik bilan nishonlashdi. Turli san'at ko'rsatuvlari va milliy taomlar namoyish qilindi.",
    descRu:
      "Ученики и учителя лицея радостно отпраздновали Навруз. Были показаны различные художественные выступления и национальные блюда.",
    descEn:
      "Students and teachers of the lyceum joyfully celebrated Nowruz. Various artistic performances and national cuisines were presented.",
    tag: { uz: "Ijtimoiy", ru: "Социальное", en: "Social" },
    color: "#1a3a6e",
  },
  {
    id: "robotics-2026",
    date: "2026-04-05",
    titleUz: "Informatika va robototexnika ko'rgazmasi o'tkazildi",
    titleRu: "Проведена выставка по информатике и робототехнике",
    titleEn: "Informatics and robotics exhibition was held",
    descUz:
      "O'quvchilar tomonidan tayyorlangan 30 dan ortiq loyiha namoyish etildi. Eng yaxshi loyihalar tegishli mukofotlar bilan taqdirlandi.",
    descRu:
      "Было представлено более 30 проектов, подготовленных учениками. Лучшие проекты были удостоены соответствующих наград.",
    descEn:
      "Over 30 projects prepared by students were presented. The best projects were awarded with appropriate prizes.",
    tag: { uz: "Ilm", ru: "Наука", en: "Science" },
    color: "#1d7a55",
  },
  {
    id: "math-olympiad-2026",
    date: "2026-04-10",
    titleUz: "Matematika olimpiadasi g'oliblari mukofotlandi",
    titleRu: "Победители олимпиады по математике награждены",
    titleEn: "Math olympiad winners were awarded",
    descUz:
      "Respublika matematika olimpiadasida g'olib bo'lgan o'quvchilar litsey rahbariyati tomonidan qabul qilindi va nishonlandi.",
    descRu:
      "Ученики, победившие на республиканской олимпиаде по математике, были приняты и отмечены руководством лицея.",
    descEn:
      "Students who won the national math olympiad were received and celebrated by lyceum leadership.",
    tag: { uz: "Yutuqlar", ru: "Достижения", en: "Achievement" },
    color: "#c8a96e",
  },
  {
    id: "open-day-2026",
    date: "2026-04-15",
    titleUz: "Ochiq eshiklar kuni muvaffaqiyatli o'tdi",
    titleRu: "День открытых дверей прошёл успешно",
    titleEn: "Open doors day was held successfully",
    descUz:
      "Bu yilgi Ochiq eshiklar kuniga 500 dan ortiq abituriyent va ularning ota-onalari tashrif buyurdi. Litsey bo'limlari batafsil tanishtirdi.",
    descRu:
      "В этом году день открытых дверей посетили более 500 абитуриентов и их родителей. Отделы лицея провели подробное знакомство.",
    descEn:
      "This year's open day was attended by over 500 applicants and their parents. Lyceum departments gave detailed tours.",
    tag: { uz: "Tadbir", ru: "Мероприятие", en: "Event" },
    color: "#6032bf",
  },
  {
    id: "english-olympiad-2026",
    date: "2026-04-12",
    titleUz: "Ingliz tili olimpiadasida 2-o'rin qo'lga kiritildi",
    titleRu: "2 место занято на олимпиаде по английскому языку",
    titleEn: "2nd place won at English language olympiad",
    descUz:
      "O'quvchimiz respublika ingliz tili olimpiadasida 2-o'rinni qo'lga kiritib, litseymizga sharaf keltirdi.",
    descRu:
      "Наш ученик занял 2 место на республиканской олимпиаде по английскому языку, принеся честь нашему лицею.",
    descEn:
      "Our student won 2nd place at the national English language olympiad, bringing honor to our lyceum.",
    tag: { uz: "Yutuqlar", ru: "Достижения", en: "Achievement" },
    color: "#c8a96e",
  },
  {
    id: "science-week-2026",
    date: "2026-04-08",
    titleUz: "Ilmiy hafta tadbirlari yakunlandi",
    titleRu: "Мероприятия Недели науки завершились",
    titleEn: "Science Week events concluded",
    descUz:
      "Bir hafta davom etgan ilmiy tadbirlar, loyiha ko'rgazmalari va munozaralar muvaffaqiyatli yakunlandi.",
    descRu:
      "Недельные научные мероприятия, выставки проектов и дискуссии успешно завершились.",
    descEn:
      "Week-long science events, project exhibitions and discussions concluded successfully.",
    tag: { uz: "Ilm", ru: "Наука", en: "Science" },
    color: "#1d7a55",
  },
];

export default function NewsPage() {
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
            <span style={{ color: "#c8a96e" }}>{t.nav_news}</span>
          </div>
          <h1
            style={{
              color: "white",
              fontWeight: 900,
              fontSize: "clamp(2rem,5vw,3rem)",
              marginBottom: 12,
            }}
          >
            {t.news_title}
          </h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1rem" }}>
            {lang === "uz"
              ? "Litsey hayotidagi so'nggi yangiliklar"
              : lang === "ru"
              ? "Последние новости из жизни лицея"
              : "Latest news from the lyceum life"}
          </p>
        </div>
      </div>

      {/* ===== NEWS GRID ===== */}
      <section style={{ padding: "80px 0", background: "#f8f9fc" }}>
        <div className="container-custom">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))",
              gap: 28,
            }}
          >
            {ALL_NEWS.map((item) => {
              const title =
                lang === "uz" ? item.titleUz : lang === "ru" ? item.titleRu : item.titleEn;
              const desc =
                lang === "uz" ? item.descUz : lang === "ru" ? item.descRu : item.descEn;
              const tagStr = item.tag[lang];

              return (
                <Link
                  key={item.id}
                  href={`/news/${item.id}`}
                  className="news-card"
                  style={{ cursor: "pointer", textDecoration: "none", display: "block" }}
                >
                  {/* Color strip */}
                  <div
                    style={{
                      height: 4,
                      background: `linear-gradient(90deg, ${item.color}, ${item.color}88)`,
                    }}
                  />
                  <div style={{ padding: "24px" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 16,
                      }}
                    >
                      <span
                        style={{
                          background: `${item.color}15`,
                          color: item.color,
                          fontSize: "0.74rem",
                          fontWeight: 700,
                          padding: "4px 10px",
                          borderRadius: 50,
                          border: `1px solid ${item.color}30`,
                        }}
                      >
                        {tagStr}
                      </span>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 5,
                          color: "#9ca3af",
                          fontSize: "0.77rem",
                        }}
                      >
                        <Calendar size={13} />
                        {item.date}
                      </div>
                    </div>
                    <h3
                      style={{
                        color: "#1a1f2e",
                        fontWeight: 700,
                        fontSize: "1rem",
                        lineHeight: 1.45,
                        marginBottom: 12,
                      }}
                    >
                      {title}
                    </h3>
                    <p
                      style={{
                        color: "#6b7280",
                        fontSize: "0.84rem",
                        lineHeight: 1.7,
                        marginBottom: 18,
                      }}
                    >
                      {desc}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        color: item.color,
                        fontSize: "0.83rem",
                        fontWeight: 600,
                      }}
                    >
                      {t.news_read} <ArrowRight size={14} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <Footer lang={lang} />
    </main>
  );
}
