"use client";

import { useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { translations, type Lang } from "@/lib/i18n";
import { Calendar, ArrowLeft, Tag } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NEWS_DATA: Record<
  string,
  {
    date: string;
    titleUz: string;
    titleRu: string;
    titleEn: string;
    bodyUz: string;
    bodyRu: string;
    bodyEn: string;
    tag: { uz: string; ru: string; en: string };
    color: string;
  }
> = {
  "navrouz-2026": {
    date: "2026-03-21",
    titleUz: "Navro'z bayrami munosabati bilan katta bayram tashkil etildi",
    titleRu: "Большой праздник организован в честь Навруза",
    titleEn: "Grand celebration organized for Nowruz holiday",
    bodyUz: `Litsey o'quvchilari va o'qituvchilar Navro'z bayramini shod-xurramlik bilan nishonlashdi. Turli san'at ko'rsatuvlari va milliy taomlar namoyish qilindi.

Bayram kuni litsey hovlisida katta sahnaga aylandi. O'quvchilar milli kiyimlar kiyib, turli raqslar va qo'shiqlar ijro etishdi. Ona tabiatga bag'ishlangan she'rlar o'qildi, milliy o'yinlar o'ynaldi.

Tadbirda litsey direktori o'quvchilarga murojaat qilib, Navro'z bayrami millatimizning ma'naviy boyligini aks ettiruvchi muhim bayram ekanligini ta'kidladi.

Bayram dasturida "Sumalak" tayyorlash ham tashkil etildi. Maktab oshxonasida turli milliy taomlar tayyorlanib, o'quvchilarga ulashildi.`,
    bodyRu: `Ученики и учителя лицея радостно отпраздновали Навруз. Были показаны различные художественные выступления и национальные блюда.

В день праздника двор лицея превратился в большую сцену. Ученики в национальных костюмах исполняли различные танцы и песни. Читались стихи о природе, проводились национальные игры.

На мероприятии директор лицея обратился к ученикам, подчеркнув, что Навруз является важным праздником, отражающим духовное богатство нашего народа.

В рамках праздничной программы также была организована приготовление «Сумалака». В школьной столовой были приготовлены различные национальные блюда и розданы ученикам.`,
    bodyEn: `Students and teachers of the lyceum joyfully celebrated Nowruz. Various artistic performances and national cuisines were presented.

On the day of the holiday, the lyceum courtyard turned into a big stage. Students in national costumes performed various dances and songs. Poems about nature were recited, and national games were played.

At the event, the lyceum director addressed the students, emphasizing that Nowruz is an important holiday reflecting the spiritual wealth of our people.

The holiday program also included the preparation of "Sumalak". Various national dishes were prepared in the school cafeteria and distributed to students.`,
    tag: { uz: "Ijtimoiy", ru: "Социальное", en: "Social" },
    color: "#1a3a6e",
  },
  "robotics-2026": {
    date: "2026-04-05",
    titleUz: "Informatika va robototexnika ko'rgazmasi o'tkazildi",
    titleRu: "Проведена выставка по информатике и робототехнике",
    titleEn: "Informatics and robotics exhibition was held",
    bodyUz: `O'quvchilar tomonidan tayyorlangan 30 dan ortiq loyiha namoyish etildi. Eng yaxshi loyihalar tegishli mukofotlar bilan taqdirlandi.

Ko'rgazmada 10, 11 va 12-sinf o'quvchilari tomonidan tayyorlangan turli loyihalar namoyish etildi. Loyihalar quyidagi yo'nalishlar bo'yicha taqdimlandi: sun'iy intellekt, robototexnika, mobil ilovalar va veb-dasturlash.

Birinchi o'rinni 11-sinf o'quvchilari guruhining "Aqlli bog'" loyihasi egalladi. Bu loyiha IoT texnologiyasidan foydalanib o'simliklarni avtomatik sug'orish tizimini o'z ichiga oladi.`,
    bodyRu: `Было представлено более 30 проектов, подготовленных учениками. Лучшие проекты были удостоены соответствующих наград.

На выставке были представлены различные проекты учеников 10, 11 и 12 классов. Проекты были представлены по следующим направлениям: искусственный интеллект, робототехника, мобильные приложения и веб-программирование.

Первое место заняла команда учеников 11 класса с проектом «Умный сад». Этот проект включает систему автоматического полива растений с использованием технологии IoT.`,
    bodyEn: `Over 30 projects prepared by students were presented. The best projects were awarded with appropriate prizes.

The exhibition featured various projects by students from 10th, 11th, and 12th grades. Projects were presented in the following directions: artificial intelligence, robotics, mobile applications, and web programming.

First place was won by a group of 11th grade students with their "Smart Garden" project. This project includes an automatic plant irrigation system using IoT technology.`,
    tag: { uz: "Ilm", ru: "Наука", en: "Science" },
    color: "#1d7a55",
  },
  "math-olympiad-2026": {
    date: "2026-04-10",
    titleUz: "Matematika olimpiadasi g'oliblari mukofotlandi",
    titleRu: "Победители олимпиады по математике награждены",
    titleEn: "Math olympiad winners were awarded",
    bodyUz: `Respublika matematika olimpiadasida g'olib bo'lgan o'quvchilar litsey rahbariyati tomonidan qabul qilindi va nishonlandi.

Litseyimizdan 5 nafar o'quvchi respublika matematika olimpiadasida ishtirok etib, shundan 2 nafari sovrinli o'rinlarni egalladi. Abdullayev Jasur 1-o'rinni, Karimova Zulfiya esa 3-o'rinni qo'lga kiritdi.

O'quvchilar xalqaro matematika olimpiadasiga yo'llanma olish huquqini qo'lga kiritdilar.`,
    bodyRu: `Ученики, победившие на республиканской олимпиаде по математике, были приняты и отмечены руководством лицея.

Пятеро учеников нашего лицея приняли участие в республиканской олимпиаде по математике, из которых двое заняли призовые места. Абдуллаев Жасур занял 1 место, а Каримова Зулфия — 3 место.

Ученики получили право на путёвку на международную математическую олимпиаду.`,
    bodyEn: `Students who won the national math olympiad were received and celebrated by lyceum leadership.

Five students from our lyceum participated in the national mathematics olympiad, of which two won prize places. Abdullayev Jasur won 1st place, and Karimova Zulfiya won 3rd place.

The students earned the right to participate in the international mathematics olympiad.`,
    tag: { uz: "Yutuqlar", ru: "Достижения", en: "Achievement" },
    color: "#c8a96e",
  },
  "open-day-2026": {
    date: "2026-04-15",
    titleUz: "Ochiq eshiklar kuni muvaffaqiyatli o'tdi",
    titleRu: "День открытых дверей прошёл успешно",
    titleEn: "Open doors day was held successfully",
    bodyUz: `Bu yilgi Ochiq eshiklar kuniga 500 dan ortiq abituriyent va ularning ota-onalari tashrif buyurdi. Litsey bo'limlari batafsil tanishtirdi.

Tadbir davomida abituriyentlar litsey laboratoriyalari, kutubxona va kompyuter sinflari bilan tanishdilar. O'qituvchilar har bir yo'nalish haqida batafsil ma'lumot berdilar.

Qabul jarayoni, zarur hujjatlar va imtihon tartibi haqida ham to'liq ma'lumot ulashildi.`,
    bodyRu: `В этом году день открытых дверей посетили более 500 абитуриентов и их родителей. Отделы лицея провели подробное знакомство.

В ходе мероприятия абитуриенты познакомились с лабораториями лицея, библиотекой и компьютерными классами. Учителя дали подробную информацию о каждом направлении.

Также была предоставлена полная информация о процессе приёма, необходимых документах и порядке экзамена.`,
    bodyEn: `This year's open day was attended by over 500 applicants and their parents. Lyceum departments gave detailed tours.

During the event, applicants got acquainted with the lyceum laboratories, library and computer classes. Teachers gave detailed information about each direction.

Full information about the admission process, required documents and examination procedure was also shared.`,
    tag: { uz: "Tadbir", ru: "Мероприятие", en: "Event" },
    color: "#6032bf",
  },
  "english-olympiad-2026": {
    date: "2026-04-12",
    titleUz: "Ingliz tili olimpiadasida 2-o'rin qo'lga kiritildi",
    titleRu: "2 место занято на олимпиаде по английскому языку",
    titleEn: "2nd place won at English language olympiad",
    bodyUz: `O'quvchimiz respublika ingliz tili olimpiadasida 2-o'rinni qo'lga kiritib, litseymizga sharaf keltirdi.

11-sinf o'quvchisi Nodira Rahimova respublika miqyosida o'tkazilgan ingliz tili olimpiadasida 2-o'rinni egalladi. Olimpiadada 200 dan ortiq litsey va maktablardan o'quvchilar ishtirok etdi.

Nodira ingliz tili bo'yicha IELTS 7.5 balliga ham ega bo'lib, xalqaro darajada ham o'z bilimini isbotlagan.`,
    bodyRu: `Наш ученик занял 2 место на республиканской олимпиаде по английскому языку, принеся честь нашему лицею.

Ученица 11 класса Нодира Рахимова заняла 2 место на республиканской олимпиаде по английскому языку. В олимпиаде приняли участие ученики более чем 200 лицеев и школ.

Нодира также имеет оценку IELTS 7.5 по английскому языку и доказала свои знания на международном уровне.`,
    bodyEn: `Our student won 2nd place at the national English language olympiad, bringing honor to our lyceum.

11th grade student Nodira Rahimova won 2nd place at the national English language olympiad. More than 200 lyceum and school students participated in the olympiad.

Nodira also holds an IELTS score of 7.5 in English language and has proven her knowledge at the international level.`,
    tag: { uz: "Yutuqlar", ru: "Достижения", en: "Achievement" },
    color: "#c8a96e",
  },
  "science-week-2026": {
    date: "2026-04-08",
    titleUz: "Ilmiy hafta tadbirlari yakunlandi",
    titleRu: "Мероприятия Недели науки завершились",
    titleEn: "Science Week events concluded",
    bodyUz: `Bir hafta davom etgan ilmiy tadbirlar, loyiha ko'rgazmalari va munozaralar muvaffaqiyatli yakunlandi.

Ilmiy hafta davomida kunlik tadbirlar, eksperimentlar va loyihalar taqdimoti bo'lib o'tdi. Har bir kun boshqa fan yo'nalishiga bag'ishlandi.

Hafta yakunida eng faol o'quvchilar va guruhlar maxsus mukofotlar bilan taqdirlandi.`,
    bodyRu: `Недельные научные мероприятия, выставки проектов и дискуссии успешно завершились.

В ходе недели науки проходили ежедневные мероприятия, эксперименты и презентации проектов. Каждый день был посвящён отдельному научному направлению.

По итогам недели наиболее активные ученики и группы были награждены специальными призами.`,
    bodyEn: `Week-long science events, project exhibitions and discussions concluded successfully.

During Science Week, daily events, experiments and project presentations took place. Each day was dedicated to a different scientific direction.

At the end of the week, the most active students and groups were awarded special prizes.`,
    tag: { uz: "Ilm", ru: "Наука", en: "Science" },
    color: "#1d7a55",
  },
};

interface PageProps {
  params: { id: string };
}

export default function NewsDetailPage({ params }: PageProps) {
  const [lang, setLang] = useState<Lang>("uz");
  const item = NEWS_DATA[params.id];

  if (!item) notFound();

  const t = translations[lang];
  const title = lang === "uz" ? item.titleUz : lang === "ru" ? item.titleRu : item.titleEn;
  const body = lang === "uz" ? item.bodyUz : lang === "ru" ? item.bodyRu : item.bodyEn;
  const tagStr = item.tag[lang];

  return (
    <main>
      <Navbar lang={lang} onLangChange={setLang} />

      {/* PAGE BANNER */}
      <div
        className="page-banner"
        style={{
          paddingTop: 140,
          paddingBottom: 80,
          background: `linear-gradient(135deg,#0f2347,${item.color}cc,#0f2347)`,
        }}
      >
        <div className="container-custom" style={{ position: "relative", zIndex: 1 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 20,
              fontSize: "0.8rem",
              color: "rgba(255,255,255,0.6)",
              flexWrap: "wrap",
            }}
          >
            <Link href="/" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>
              {t.nav_home}
            </Link>
            <span>/</span>
            <Link href="/news" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>
              {t.nav_news}
            </Link>
            <span>/</span>
            <span style={{ color: "#c8a96e" }}>{tagStr}</span>
          </div>

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: `${item.color}33`,
              border: `1px solid ${item.color}66`,
              color: "#c8a96e",
              fontSize: "0.78rem",
              fontWeight: 700,
              padding: "5px 14px",
              borderRadius: 50,
              marginBottom: 16,
            }}
          >
            <Tag size={12} />
            {tagStr}
          </div>

          <h1
            style={{
              color: "white",
              fontWeight: 900,
              fontSize: "clamp(1.5rem,4vw,2.5rem)",
              lineHeight: 1.2,
              marginBottom: 20,
              maxWidth: 800,
            }}
          >
            {title}
          </h1>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              color: "rgba(255,255,255,0.6)",
              fontSize: "0.85rem",
            }}
          >
            <Calendar size={15} />
            {item.date}
          </div>
        </div>
      </div>

      {/* ARTICLE BODY */}
      <section style={{ padding: "72px 0", background: "white" }}>
        <div className="container-custom">
          <div style={{ maxWidth: 820, margin: "0 auto" }}>
            {/* Back button */}
            <Link
              href="/news"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                color: "#1a3a6e",
                fontWeight: 600,
                fontSize: "0.87rem",
                textDecoration: "none",
                marginBottom: 40,
                padding: "10px 20px",
                background: "rgba(26,58,110,0.06)",
                borderRadius: 8,
                border: "1px solid rgba(26,58,110,0.12)",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "rgba(26,58,110,0.12)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "rgba(26,58,110,0.06)";
              }}
            >
              <ArrowLeft size={16} />
              {lang === "uz" ? "Yangiliklarga qaytish" : lang === "ru" ? "Вернуться к новостям" : "Back to news"}
            </Link>

            {/* Article content */}
            <div
              style={{
                background: "#f8f9fc",
                borderRadius: 20,
                padding: "48px",
                border: "1px solid rgba(26,58,110,0.07)",
                boxShadow: "0 8px 40px rgba(26,58,110,0.07)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 32,
                  paddingBottom: 24,
                  borderBottom: "1px solid rgba(26,58,110,0.08)",
                }}
              >
                <div
                  style={{
                    background: `${item.color}15`,
                    color: item.color,
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    padding: "5px 14px",
                    borderRadius: 50,
                    border: `1px solid ${item.color}30`,
                  }}
                >
                  {tagStr}
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    color: "#9ca3af",
                    fontSize: "0.8rem",
                  }}
                >
                  <Calendar size={14} />
                  {item.date}
                </div>
              </div>

              <div>
                {body.split("\n\n").map((para, i) => (
                  <p
                    key={i}
                    style={{
                      color: "#374151",
                      lineHeight: 1.85,
                      fontSize: "1rem",
                      marginBottom: i < body.split("\n\n").length - 1 ? 20 : 0,
                    }}
                  >
                    {para}
                  </p>
                ))}
              </div>
            </div>

            {/* Share / Nav buttons */}
            <div
              style={{
                marginTop: 40,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 16,
              }}
            >
              <Link href="/news" className="btn-primary" style={{ textDecoration: "none" }}>
                <ArrowLeft size={16} />
                {lang === "uz" ? "Barcha yangiliklar" : lang === "ru" ? "Все новости" : "All news"}
              </Link>
              <a
                href="https://t.me/altuit_lyceum"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "12px 24px",
                  background: "rgba(26,58,110,0.06)",
                  border: "1px solid rgba(26,58,110,0.12)",
                  borderRadius: 8,
                  color: "#1a3a6e",
                  fontWeight: 600,
                  fontSize: "0.87rem",
                  textDecoration: "none",
                }}
              >
                ✈️ Telegram kanalida ko'rish
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer lang={lang} />
    </main>
  );
}
