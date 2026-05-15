"use client";

import { useState } from "react";
import Link from "next/link";
import { translations, type Lang } from "@/lib/i18n";
import {
  Target,
  Eye,
  Star,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Users,
  Award,
  Building2,
  FlaskConical,
  Wifi,
  Library,
} from "lucide-react";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const LEADERSHIP = [
  {
    nameUz: "Abdullayev Sherzod Hamidovich",
    nameRu: "Абдуллаев Шерзод Хамидович",
    nameEn: "Abdullayev Sherzod Hamidovich",
    roleUz: "Litsey direktori",
    roleRu: "Директор лицея",
    roleEn: "Lyceum Director",
    phone: "+998 71 235 03 69",
    email: "director@tatual.uz",
    initials: "AŞ",
    color: "#1a3a6e",
  },
  {
    nameUz: "Karimova Dilnoza Baxtiyorovna",
    nameRu: "Каримова Дилноза Бахтиёровна",
    nameEn: "Karimova Dilnoza Baxtiyorovna",
    roleUz: "O'quv ishlari bo'yicha direktor o'rinbosari",
    roleRu: "Заместитель директора по учебной работе",
    roleEn: "Deputy Director for Academic Affairs",
    phone: "+998 71 235 03 70",
    email: "akademik@tatual.uz",
    initials: "KD",
    color: "#2d5bb5",
  },
  {
    nameUz: "Xolmatov Jamshid Narzullayevich",
    nameRu: "Холматов Жамшид Нарзуллаевич",
    nameEn: "Xolmatov Jamshid Narzullayevich",
    roleUz: "Tarbiyaviy ishlar bo'yicha direktor o'rinbosari",
    roleRu: "Заместитель директора по воспитательной работе",
    roleEn: "Deputy Director for Educational Affairs",
    phone: "+998 71 235 03 71",
    email: "tarbiya@tatual.uz",
    initials: "XJ",
    color: "#1d7a55",
  },
];

const DEPARTMENTS = [
  {
    nameUz: "Matematika va fizika",
    nameRu: "Математика и физика",
    nameEn: "Mathematics & Physics",
    teachersCount: 12,
    color: "#1a3a6e",
  },
  {
    nameUz: "Informatika va texnologiya",
    nameRu: "Информатика и технологии",
    nameEn: "Informatics & Technology",
    teachersCount: 8,
    color: "#2d5bb5",
  },
  {
    nameUz: "Kimyo va biologiya",
    nameRu: "Химия и биология",
    nameEn: "Chemistry & Biology",
    teachersCount: 9,
    color: "#1d7a55",
  },
  {
    nameUz: "Tarix va ijtimoiy fanlar",
    nameRu: "История и обществознание",
    nameEn: "History & Social Studies",
    teachersCount: 7,
    color: "#c8a96e",
  },
  {
    nameUz: "Chet tillari",
    nameRu: "Иностранные языки",
    nameEn: "Foreign Languages",
    teachersCount: 11,
    color: "#6032bf",
  },
  {
    nameUz: "Ona tili va adabiyot",
    nameRu: "Родной язык и литература",
    nameEn: "Native Language & Literature",
    teachersCount: 6,
    color: "#b91c1c",
  },
];

const FACILITIES = [
  {
    icon: FlaskConical,
    titleUz: "Zamonaviy laboratoriyalar",
    titleRu: "Современные лаборатории",
    titleEn: "Modern Laboratories",
    descUz: "Kimyo, fizika va biologiya fanlari uchun to'liq jihozlangan 6 ta laboratoriya",
    descRu: "6 полностью оснащённых лабораторий по химии, физике и биологии",
    descEn: "6 fully equipped laboratories for chemistry, physics and biology",
    color: "#1d7a55",
  },
  {
    icon: Wifi,
    titleUz: "Kompyuter sinflari",
    titleRu: "Компьютерные классы",
    titleEn: "Computer Labs",
    descUz: "150+ zamonaviy kompyuter, tezkor internet va dasturlash muhiti",
    descRu: "150+ современных компьютеров, высокоскоростной интернет",
    descEn: "150+ modern computers, high-speed internet and coding environment",
    color: "#1a3a6e",
  },
  {
    icon: Library,
    titleUz: "Kutubxona",
    titleRu: "Библиотека",
    titleEn: "Library",
    descUz: "25,000+ kitob, elektron resurslar va o'qish zallari",
    descRu: "25,000+ книг, электронные ресурсы и читальные залы",
    descEn: "25,000+ books, digital resources and reading halls",
    color: "#c8a96e",
  },
  {
    icon: Building2,
    titleUz: "Sport majmuasi",
    titleRu: "Спортивный комплекс",
    titleEn: "Sports Complex",
    descUz: "Zamonaviy sport zali, futbol va basketbol maydonlari",
    descRu: "Современный спортзал, футбольное и баскетбольное поля",
    descEn: "Modern gym, football and basketball courts",
    color: "#2d5bb5",
  },
];

export default function AboutPage() {
  const [lang, setLang] = useState<Lang>("uz");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const t = translations[lang];

  const values = [
    {
      icon: Target,
      title: lang === "uz" ? "Maqsadimiz" : lang === "ru" ? "Наша цель" : "Our Mission",
      desc:
        lang === "uz"
          ? "Iqtidorli yoshlarni aniqlash va ularni zamonaviy bilim bilan qurollantirish"
          : lang === "ru"
          ? "Выявление талантливой молодёжи и вооружение её современными знаниями"
          : "Identifying talented youth and equipping them with modern knowledge",
    },
    {
      icon: Eye,
      title: lang === "uz" ? "Qadriyatlar" : lang === "ru" ? "Ценности" : "Values",
      desc:
        lang === "uz"
          ? "Bilim, halollik, insonparvarlik va milliy qadriyatlarga sadoqat"
          : lang === "ru"
          ? "Знания, честность, гуманизм и преданность национальным ценностям"
          : "Knowledge, integrity, humanism and dedication to national values",
    },
    {
      icon: Star,
      title: lang === "uz" ? "Ko'rsatkichlar" : lang === "ru" ? "Показатели" : "Results",
      desc:
        lang === "uz"
          ? "O'quvchilarimizning 90%+ yetakchi oliy o'quv yurtlariga kiradi"
          : lang === "ru"
          ? "Более 90% наших учеников поступают в ведущие вузы"
          : "Over 90% of our graduates enter leading universities",
    },
    {
      icon: BookOpen,
      title: lang === "uz" ? "Ta'lim standarti" : lang === "ru" ? "Стандарт обучения" : "Education Standard",
      desc:
        lang === "uz"
          ? "Davlat ta'lim standartlari asosida chuqurlashtirilgan o'qitish metodologiyasi"
          : lang === "ru"
          ? "Углублённая методология обучения на основе государственных стандартов"
          : "Deepened teaching methodology based on state education standards",
    },
  ];

  const estLabel = lang === "uz" ? "Ta'sis etilgan" : lang === "ru" ? "Основан" : "Established";
  const uniLabel = lang === "uz" ? "Universitet" : lang === "ru" ? "Университет" : "University";

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
            <span style={{ color: "#c8a96e" }}>{t.nav_about}</span>
          </div>
          <h1
            style={{
              color: "white",
              fontWeight: 900,
              fontSize: "clamp(2rem,5vw,3rem)",
              marginBottom: 12,
            }}
          >
            {lang === "uz" ? "Litsey haqida" : lang === "ru" ? "О лицее" : "About the Lyceum"}
          </h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1rem", maxWidth: 600 }}>
            {t.about_p1}
          </p>
        </div>
      </div>

      {/* ===== ABOUT SECTION ===== */}
      <section id="about" style={{ padding: "96px 0", background: "#f8f9fc" }}>
        <div className="container-custom">
          <div style={{ maxWidth: 680, marginBottom: 20 }}>
            <h2 className="section-title accent-underline" style={{ marginBottom: 32 }}>
              {t.about_title}
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
              gap: 40,
              alignItems: "start",
            }}
          >
            <div>
              <p style={{ color: "#4b5563", lineHeight: 1.85, marginBottom: 18, fontSize: "0.97rem" }}>
                {t.about_p1}
              </p>
              <p style={{ color: "#4b5563", lineHeight: 1.85, marginBottom: 18, fontSize: "0.97rem" }}>
                {t.about_p2}
              </p>
              <p style={{ color: "#4b5563", lineHeight: 1.85, fontSize: "0.97rem" }}>
                {t.about_p3}
              </p>

              <div
                style={{
                  marginTop: 28,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 12,
                  background: "linear-gradient(135deg,#0f2347,#1a3a6e)",
                  borderRadius: 14,
                  padding: "16px 24px",
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <div style={{ color: "#c8a96e", fontSize: "1.8rem", fontWeight: 800, lineHeight: 1 }}>
                    1993
                  </div>
                  <div style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.73rem", marginTop: 4 }}>
                    {estLabel}
                  </div>
                </div>
                <div style={{ width: 1, height: 40, background: "rgba(255,255,255,0.15)" }} />
                <div style={{ textAlign: "center" }}>
                  <div style={{ color: "#c8a96e", fontSize: "1.8rem", fontWeight: 800, lineHeight: 1 }}>
                    TATU
                  </div>
                  <div style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.73rem", marginTop: 4 }}>
                    {uniLabel}
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {values.map((v, i) => (
                <div
                  key={i}
                  className="card-hover"
                  style={{
                    background: "white",
                    borderRadius: 14,
                    padding: "22px 18px",
                    boxShadow: "0 4px 20px rgba(26,58,110,0.06)",
                    border: "1px solid rgba(26,58,110,0.07)",
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 10,
                      marginBottom: 14,
                      background: "linear-gradient(135deg,rgba(26,58,110,0.08),rgba(26,58,110,0.04))",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <v.icon size={20} color="#1a3a6e" />
                  </div>
                  <h3 style={{ fontWeight: 700, color: "#1a1f2e", fontSize: "0.9rem", marginBottom: 8 }}>
                    {v.title}
                  </h3>
                  <p style={{ color: "#6b7280", fontSize: "0.8rem", lineHeight: 1.6 }}>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== LEADERSHIP ===== */}
      <section id="leadership" style={{ padding: "96px 0", background: "white" }}>
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
              {lang === "uz" ? "Rahbariyat" : lang === "ru" ? "Руководство" : "Leadership"}
            </div>
            <h2 className="section-title" style={{ marginBottom: 12 }}>
              {lang === "uz" ? "Litsey rahbariyati" : lang === "ru" ? "Руководство лицея" : "Lyceum Leadership"}
            </h2>
          </div>

          <div
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 24 }}
          >
            {LEADERSHIP.map((person, i) => {
              const name = lang === "uz" ? person.nameUz : lang === "ru" ? person.nameRu : person.nameEn;
              const role = lang === "uz" ? person.roleUz : lang === "ru" ? person.roleRu : person.roleEn;
              return (
                <div
                  key={i}
                  className="card-hover"
                  style={{
                    background: "white",
                    borderRadius: 18,
                    padding: "32px 24px",
                    border: "1px solid rgba(26,58,110,0.08)",
                    boxShadow: "0 4px 20px rgba(26,58,110,0.06)",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: "50%",
                      background: `linear-gradient(135deg, ${person.color}, ${person.color}aa)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 20px",
                      fontSize: "1.6rem",
                      fontWeight: 900,
                      color: "white",
                    }}
                  >
                    {person.initials}
                  </div>
                  <h3 style={{ color: "#1a1f2e", fontWeight: 700, fontSize: "1rem", marginBottom: 8, lineHeight: 1.3 }}>
                    {name}
                  </h3>
                  <p style={{ color: person.color, fontSize: "0.82rem", fontWeight: 600, marginBottom: 18 }}>
                    {role}
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <a
                      href={`tel:${person.phone}`}
                      style={{ color: "#6b7280", fontSize: "0.82rem", textDecoration: "none" }}
                    >
                      <FaPhoneAlt size={12} style={{ marginRight: 6 }} /> {person.phone}
                    </a>
                    <a
                      href={`mailto:${person.email}`}
                      style={{ color: "#6b7280", fontSize: "0.82rem", textDecoration: "none" }}
                    >
                      <FaEnvelope size={12} style={{ marginRight: 6 }} /> {person.email}
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== TEACHERS / DEPARTMENTS ===== */}
      <section id="teachers" style={{ padding: "96px 0", background: "#f8f9fc" }}>
        <div className="container-custom">
          <div style={{ textAlign: "center", maxWidth: 580, margin: "0 auto 56px" }}>
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
              <Users size={13} />
              {lang === "uz" ? "Pedagog xodimlar" : lang === "ru" ? "Педагогический состав" : "Teaching Staff"}
            </div>
            <h2 className="section-title" style={{ marginBottom: 12 }}>
              {lang === "uz" ? "Kafedra va bo'limlar" : lang === "ru" ? "Кафедры и отделы" : "Departments"}
            </h2>
            <p style={{ color: "#6b7280", fontSize: "0.97rem", lineHeight: 1.6 }}>
              {lang === "uz"
                ? "85+ malakali pedagoglar 6 ta kafedrada dars olib boradi"
                : lang === "ru"
                ? "85+ квалифицированных педагогов ведут занятия на 6 кафедрах"
                : "85+ qualified teachers conduct classes in 6 departments"}
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
              gap: 20,
            }}
          >
            {DEPARTMENTS.map((dept, i) => {
              const name = lang === "uz" ? dept.nameUz : lang === "ru" ? dept.nameRu : dept.nameEn;
              return (
                <div
                  key={i}
                  className="card-hover"
                  style={{
                    background: "white",
                    borderRadius: 16,
                    padding: "24px",
                    border: "1px solid rgba(26,58,110,0.07)",
                    boxShadow: "0 4px 16px rgba(26,58,110,0.05)",
                    borderLeft: `4px solid ${dept.color}`,
                  }}
                >
                  <h3 style={{ color: "#1a1f2e", fontWeight: 700, fontSize: "0.97rem", marginBottom: 10 }}>
                    {name}
                  </h3>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div
                      style={{
                        background: `${dept.color}18`,
                        color: dept.color,
                        fontSize: "0.82rem",
                        fontWeight: 700,
                        padding: "4px 12px",
                        borderRadius: 50,
                        border: `1px solid ${dept.color}30`,
                      }}
                    >
                      {dept.teachersCount} {lang === "uz" ? "o'qituvchi" : lang === "ru" ? "педагогов" : "teachers"}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Total teachers badge */}
          <div
            style={{
              marginTop: 48,
              background: "linear-gradient(135deg,#0f2347,#1a3a6e)",
              borderRadius: 20,
              padding: "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 24,
            }}
          >
            <div>
              <div style={{ color: "#c8a96e", fontSize: "3rem", fontWeight: 900, lineHeight: 1 }}>
                85+
              </div>
              <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "1rem", marginTop: 6 }}>
                {lang === "uz" ? "Pedagog xodimlar" : lang === "ru" ? "Педагогических работников" : "Teaching staff members"}
              </div>
            </div>
            <div style={{ height: 60, width: 1, background: "rgba(255,255,255,0.15)" }} />
            <div>
              <div style={{ color: "#c8a96e", fontSize: "3rem", fontWeight: 900, lineHeight: 1 }}>
                40+
              </div>
              <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "1rem", marginTop: 6 }}>
                {lang === "uz" ? "Fan nomzodlari va doktorlar" : lang === "ru" ? "Кандидаты и доктора наук" : "PhD & Doctors of Science"}
              </div>
            </div>
            <div style={{ height: 60, width: 1, background: "rgba(255,255,255,0.15)" }} />
            <div>
              <div style={{ color: "#c8a96e", fontSize: "3rem", fontWeight: 900, lineHeight: 1 }}>
                30+
              </div>
              <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "1rem", marginTop: 6 }}>
                {lang === "uz" ? "Yillik pedagogik tajriba" : lang === "ru" ? "Лет педагогического опыта" : "Years of pedagogical experience"}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FACILITIES ===== */}
      <section id="facilities" style={{ padding: "96px 0", background: "white" }}>
        <div className="container-custom">
          <div style={{ textAlign: "center", maxWidth: 580, margin: "0 auto 56px" }}>
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
              <Building2 size={13} />
              {lang === "uz" ? "Moddiy-texnik baza" : lang === "ru" ? "Материально-техническая база" : "Facilities"}
            </div>
            <h2 className="section-title" style={{ marginBottom: 12 }}>
              {lang === "uz"
                ? "Zamonaviy o'quv muhiti"
                : lang === "ru"
                ? "Современная учебная среда"
                : "Modern Learning Environment"}
            </h2>
          </div>

          <div
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 24 }}
          >
            {FACILITIES.map((f, i) => {
              const title = lang === "uz" ? f.titleUz : lang === "ru" ? f.titleRu : f.titleEn;
              const desc = lang === "uz" ? f.descUz : lang === "ru" ? f.descRu : f.descEn;
              return (
                <div
                  key={i}
                  className="card-hover"
                  style={{
                    background: "#f8f9fc",
                    borderRadius: 18,
                    padding: "32px 24px",
                    border: "1px solid rgba(26,58,110,0.07)",
                    boxShadow: "0 4px 18px rgba(26,58,110,0.05)",
                  }}
                >
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: 14,
                      background: `${f.color}18`,
                      border: `1px solid ${f.color}30`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 20,
                    }}
                  >
                    <f.icon size={26} color={f.color} />
                  </div>
                  <h3 style={{ color: "#1a1f2e", fontWeight: 700, fontSize: "1rem", marginBottom: 10 }}>
                    {title}
                  </h3>
                  <p style={{ color: "#6b7280", fontSize: "0.84rem", lineHeight: 1.65 }}>{desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section id="faq" style={{ padding: "96px 0", background: "#f8f9fc" }}>
        <div className="container-custom">
          <div style={{ maxWidth: 860, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
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
                FAQ
              </div>
              <h2 className="section-title" style={{ marginBottom: 0 }}>
                {t.faq_title}
              </h2>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {t.faq_items.map((item, i) => (
                <div
                  key={i}
                  className="faq-item"
                  style={{
                    boxShadow: openFaq === i ? "0 8px 32px rgba(26,58,110,0.1)" : undefined,
                    borderColor: openFaq === i ? "rgba(26,58,110,0.15)" : "#e5e7eb",
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    style={{
                      width: "100%",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "20px 24px",
                      textAlign: "left",
                    }}
                  >
                    <span
                      style={{
                        fontWeight: 600,
                        fontSize: "0.97rem",
                        color: openFaq === i ? "#1a3a6e" : "#1a1f2e",
                        flex: 1,
                        paddingRight: 16,
                      }}
                    >
                      {item.q}
                    </span>
                    <div
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 8,
                        flexShrink: 0,
                        background: openFaq === i ? "linear-gradient(135deg,#1a3a6e,#2d5bb5)" : "rgba(26,58,110,0.07)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all 0.25s ease",
                      }}
                    >
                      {openFaq === i ? (
                        <ChevronUp size={16} color="white" />
                      ) : (
                        <ChevronDown size={16} color="#1a3a6e" />
                      )}
                    </div>
                  </button>
                  {openFaq === i && (
                    <div style={{ padding: "0 24px 22px", animation: "fadeInUp 0.3s ease" }}>
                      <div style={{ height: 1, background: "rgba(26,58,110,0.08)", marginBottom: 16 }} />
                      <p style={{ color: "#4b5563", lineHeight: 1.8, fontSize: "0.9rem" }}>
                        {item.a}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* CTA to admission */}
            <div
              style={{
                marginTop: 48,
                background: "linear-gradient(135deg,#0f2347,#1a3a6e)",
                borderRadius: 18,
                padding: "36px",
                textAlign: "center",
              }}
            >
              <h3 style={{ color: "white", fontWeight: 700, fontSize: "1.2rem", marginBottom: 12 }}>
                {lang === "uz"
                  ? "Qabul haqida ko'proq ma'lumot olish uchun"
                  : lang === "ru"
                  ? "Узнать больше о поступлении"
                  : "Learn more about admission"}
              </h3>
              <p style={{ color: "rgba(255,255,255,0.6)", marginBottom: 24, fontSize: "0.9rem" }}>
                {lang === "uz"
                  ? "Barcha savollaringizga javob topishingiz mumkin"
                  : lang === "ru"
                  ? "Вы можете найти ответы на все свои вопросы"
                  : "You can find answers to all your questions"}
              </p>
              <Link
                href="/admission"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "14px 32px",
                  background: "linear-gradient(135deg,#c8a96e,#dfc08a)",
                  color: "#0f2347",
                  borderRadius: 10,
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  textDecoration: "none",
                  transition: "all 0.3s",
                }}
              >
                {t.nav_admissions} →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer lang={lang} />
    </main>
  );
}
