"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { translations, type Lang } from "@/lib/i18n";
import {
  getLeadership,
  getTeachers,
  LeadershipItem,
  TeacherItem,
} from "@/lib/db";
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

const LEADERSHIP: any[] = [];

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

export default function AboutPage() {
  const [lang, setLang] = useState<Lang>("uz");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const [dbLeadership, setDbLeadership] = useState<LeadershipItem[]>([]);
  const [dbTeachers, setDbTeachers] = useState<TeacherItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const leaders = await getLeadership();
        if (leaders && leaders.length > 0) setDbLeadership(leaders);

        const teachers = await getTeachers();
        if (teachers && teachers.length > 0) setDbTeachers(teachers);
      } catch (err) {
        console.error("Failed to load about page data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const t = translations[lang];

  const values = [
    {
      icon: Target,
      title:
        lang === "uz"
          ? "Maqsadimiz"
          : lang === "ru"
            ? "Наша цель"
            : "Our Mission",
      desc:
        lang === "uz"
          ? "Iqtidorli yoshlarni topib, ularni aniq fanlar bo'yicha ilmiy va amaliy tayyorgarlikka yo'naltirish."
          : lang === "ru"
            ? "Найти талантливую молодежь и направить её на научную и практическую подготовку по точным наукам."
            : "Find talented youth and guide them into scientific and practical training in exact sciences.",
    },
    {
      icon: Eye,
      title:
        lang === "uz" ? "Qadriyatlar" : lang === "ru" ? "Ценности" : "Values",
      desc:
        lang === "uz"
          ? "Nazokat, mas'uliyat, hamkorlik va o'zbek milliy an'analariga hurmat."
          : lang === "ru"
            ? "Вежливость, ответственность, сотрудничество и уважение к узбекским национальным традициям."
            : "Courtesy, responsibility, collaboration and respect for Uzbek national traditions.",
    },
    {
      icon: Star,
      title:
        lang === "uz" ? "Natijalar" : lang === "ru" ? "Результаты" : "Results",
      desc:
        lang === "uz"
          ? "Bitiruvchilarimiz TATU va boshqa nufuzli oliygohlarga muvaffaqiyatli kirishadi."
          : lang === "ru"
            ? "Наши выпускники успешно поступают в ТУИТ и другие престижные вузы."
            : "Our graduates successfully enter TATU and other prestigious universities.",
    },
    {
      icon: BookOpen,
      title:
        lang === "uz"
          ? "O'quv jarayoni"
          : lang === "ru"
            ? "Процесс обучения"
            : "Learning Process",
      desc:
        lang === "uz"
          ? "Amaliy mashg'ulotlar, laboratoriya tajribalari va ta'lim resurslariga keng kirish imkoniyati."
          : lang === "ru"
            ? "Практические занятия, лабораторные эксперименты и широкий доступ к учебным ресурсам."
            : "Practical lessons, laboratory experiments and broad access to learning resources.",
    },
  ];

  const estLabel =
    lang === "uz"
      ? "Ta'sis etilgan"
      : lang === "ru"
        ? "Основан"
        : "Established";
  const uniLabel =
    lang === "uz"
      ? "Universitet"
      : lang === "ru"
        ? "Университет"
        : "University";

  return (
    <main>
      <Navbar lang={lang} onLangChange={setLang} />

      {/* PAGE BANNER */}
      <div className="page-banner" style={{ paddingTop: 140 }}>
        <div
          className="container-custom"
          style={{ position: "relative", zIndex: 1 }}
        >
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
            <Link
              href="/"
              style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}
            >
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
            {lang === "uz"
              ? "Litsey haqida"
              : lang === "ru"
                ? "О лицее"
                : "About the Lyceum"}
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.7)",
              fontSize: "1rem",
              maxWidth: 600,
            }}
          >
            {t.about_p1}
          </p>
        </div>
      </div>

      {/* ===== ABOUT SECTION ===== */}
      <section id="about" style={{ padding: "96px 0", background: "#f8f9fc" }}>
        <div className="container-custom">
          <div style={{ maxWidth: 680, marginBottom: 20 }}>
            <h2
              className="section-title accent-underline"
              style={{ marginBottom: 32 }}
            >
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
              <p
                style={{
                  color: "#4b5563",
                  lineHeight: 1.85,
                  marginBottom: 18,
                  fontSize: "0.97rem",
                }}
              >
                {t.about_p1}
              </p>
              <p
                style={{
                  color: "#4b5563",
                  lineHeight: 1.85,
                  marginBottom: 18,
                  fontSize: "0.97rem",
                }}
              >
                {t.about_p2}
              </p>
              <p
                style={{
                  color: "#4b5563",
                  lineHeight: 1.85,
                  fontSize: "0.97rem",
                }}
              >
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
                  <div
                    style={{
                      color: "#c8a96e",
                      fontSize: "1.8rem",
                      fontWeight: 800,
                      lineHeight: 1,
                    }}
                  >
                    1993
                  </div>
                  <div
                    style={{
                      color: "rgba(255,255,255,0.55)",
                      fontSize: "0.73rem",
                      marginTop: 4,
                    }}
                  >
                    {estLabel}
                  </div>
                </div>
                <div
                  style={{
                    width: 1,
                    height: 40,
                    background: "rgba(255,255,255,0.15)",
                  }}
                />
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      color: "#c8a96e",
                      fontSize: "1.8rem",
                      fontWeight: 800,
                      lineHeight: 1,
                    }}
                  >
                    TATU
                  </div>
                  <div
                    style={{
                      color: "rgba(255,255,255,0.55)",
                      fontSize: "0.73rem",
                      marginTop: 4,
                    }}
                  >
                    {uniLabel}
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
              }}
            >
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
                      background:
                        "linear-gradient(135deg,rgba(26,58,110,0.08),rgba(26,58,110,0.04))",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <v.icon size={20} color="#1a3a6e" />
                  </div>
                  <h3
                    style={{
                      fontWeight: 700,
                      color: "#1a1f2e",
                      fontSize: "0.9rem",
                      marginBottom: 8,
                    }}
                  >
                    {v.title}
                  </h3>
                  <p
                    style={{
                      color: "#6b7280",
                      fontSize: "0.8rem",
                      lineHeight: 1.6,
                    }}
                  >
                    {v.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== LEADERSHIP ===== */}
      <section
        id="leadership"
        style={{ padding: "96px 0", background: "white" }}
      >
        <div className="container-custom">
          <div
            style={{
              textAlign: "center",
              maxWidth: 580,
              margin: "0 auto 56px",
            }}
          >
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
              {lang === "uz"
                ? "Rahbariyat"
                : lang === "ru"
                  ? "Руководство"
                  : "Leadership"}
            </div>
            <h2 className="section-title" style={{ marginBottom: 12 }}>
              {lang === "uz"
                ? "Litsey rahbariyati"
                : lang === "ru"
                  ? "Руководство лицея"
                  : "Lyceum Leadership"}
            </h2>
          </div>

          {dbLeadership.length === 0 ? (
            <div
              style={{ textAlign: "center", padding: "48px 0", width: "100%" }}
            >
              <p style={{ color: "#6b7280", fontSize: "1.1rem", margin: 0 }}>
                {lang === "uz"
                  ? "Rahbariyat ma'lumotlari mavjud emas"
                  : lang === "ru"
                    ? "Информация о руководстве отсутствует"
                    : "No leadership information available"}
              </p>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
                gap: 24,
              }}
            >
              {dbLeadership.map((person, i) => {
                const name =
                  lang === "uz"
                    ? person.nameUz
                    : lang === "ru"
                      ? person.nameRu
                      : person.nameEn;
                const role =
                  lang === "uz"
                    ? person.roleUz
                    : lang === "ru"
                      ? person.roleRu
                      : person.roleEn;
                return (
                  <div
                    key={(person as any).id || i}
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
                        width: 90,
                        height: 90,
                        borderRadius: "50%",
                        overflow: "hidden",
                        margin: "0 auto 20px",
                        background: `linear-gradient(135deg, ${person.color || "#1a3a6e"}, ${person.color || "#1a3a6e"}aa)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "3px solid rgba(200,169,110,0.15)",
                      }}
                    >
                      {person.photoUrl ? (
                        <Image
                          src={person.photoUrl}
                          alt=""
                          width={90}
                          height={90}
                          style={{
                            objectFit: "cover",
                            width: "100%",
                            height: "100%",
                          }}
                        />
                      ) : (
                        <span
                          style={{
                            fontSize: "1.6rem",
                            fontWeight: 900,
                            color: "white",
                          }}
                        >
                          {person.initials || name.charAt(0)}
                        </span>
                      )}
                    </div>
                    <h3
                      style={{
                        color: "#1a1f2e",
                        fontWeight: 700,
                        fontSize: "1rem",
                        marginBottom: 8,
                        lineHeight: 1.3,
                      }}
                    >
                      {name}
                    </h3>
                    <p
                      style={{
                        color: person.color,
                        fontSize: "0.82rem",
                        fontWeight: 600,
                        marginBottom: 18,
                      }}
                    >
                      {role}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 8,
                      }}
                    >
                      <a
                        href={`tel:${person.phone}`}
                        style={{
                          color: "#6b7280",
                          fontSize: "0.82rem",
                          textDecoration: "none",
                        }}
                      >
                        <FaPhoneAlt size={12} style={{ marginRight: 6 }} />{" "}
                        {person.phone}
                      </a>
                      <a
                        href={`mailto:${person.email}`}
                        style={{
                          color: "#6b7280",
                          fontSize: "0.82rem",
                          textDecoration: "none",
                        }}
                      >
                        <FaEnvelope size={12} style={{ marginRight: 6 }} />{" "}
                        {person.email}
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ===== TEACHERS / DEPARTMENTS ===== */}
      <section
        id="teachers"
        style={{ padding: "96px 0", background: "#f8f9fc" }}
      >
        <div className="container-custom">
          <div
            style={{
              textAlign: "center",
              maxWidth: 580,
              margin: "0 auto 56px",
            }}
          >
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
              {lang === "uz"
                ? "Pedagog xodimlar"
                : lang === "ru"
                  ? "Педагогический состав"
                  : "Teaching Staff"}
            </div>
            <h2 className="section-title" style={{ marginBottom: 12 }}>
              {lang === "uz"
                ? "Kafedra va bo'limlar"
                : lang === "ru"
                  ? "Кафедры и отделы"
                  : "Departments"}
            </h2>
            <p
              style={{ color: "#6b7280", fontSize: "0.97rem", lineHeight: 1.6 }}
            >
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
              const name =
                lang === "uz"
                  ? dept.nameUz
                  : lang === "ru"
                    ? dept.nameRu
                    : dept.nameEn;
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
                  <h3
                    style={{
                      color: "#1a1f2e",
                      fontWeight: 700,
                      fontSize: "0.97rem",
                      marginBottom: 10,
                    }}
                  >
                    {name}
                  </h3>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
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
                      {dept.teachersCount}{" "}
                      {lang === "uz"
                        ? "o'qituvchi"
                        : lang === "ru"
                          ? "педагогов"
                          : "teachers"}
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
              <div
                style={{
                  color: "#c8a96e",
                  fontSize: "3rem",
                  fontWeight: 900,
                  lineHeight: 1,
                }}
              >
                85+
              </div>
              <div
                style={{
                  color: "rgba(255,255,255,0.7)",
                  fontSize: "1rem",
                  marginTop: 6,
                }}
              >
                {lang === "uz"
                  ? "Pedagog xodimlar"
                  : lang === "ru"
                    ? "Педагогических работников"
                    : "Teaching staff members"}
              </div>
            </div>
            <div
              style={{
                height: 60,
                width: 1,
                background: "rgba(255,255,255,0.15)",
              }}
            />
            <div>
              <div
                style={{
                  color: "#c8a96e",
                  fontSize: "3rem",
                  fontWeight: 900,
                  lineHeight: 1,
                }}
              >
                40+
              </div>
              <div
                style={{
                  color: "rgba(255,255,255,0.7)",
                  fontSize: "1rem",
                  marginTop: 6,
                }}
              >
                {lang === "uz"
                  ? "Fan nomzodlari va doktorlar"
                  : lang === "ru"
                    ? "Кандидаты и доктора наук"
                    : "PhD & Doctors of Science"}
              </div>
            </div>
            <div
              style={{
                height: 60,
                width: 1,
                background: "rgba(255,255,255,0.15)",
              }}
            />
            <div>
              <div
                style={{
                  color: "#c8a96e",
                  fontSize: "3rem",
                  fontWeight: 900,
                  lineHeight: 1,
                }}
              >
                30+
              </div>
              <div
                style={{
                  color: "rgba(255,255,255,0.7)",
                  fontSize: "1rem",
                  marginTop: 6,
                }}
              >
                {lang === "uz"
                  ? "Yillik pedagogik tajriba"
                  : lang === "ru"
                    ? "Лет педагогического опыта"
                    : "Years of pedagogical experience"}
              </div>
            </div>
          </div>

          {/* O'qituvchilar ro'yxati */}
          {dbTeachers.length > 0 && (
            <div style={{ marginTop: 64 }}>
              <h3
                style={{
                  color: "#1a1f2e",
                  fontWeight: 800,
                  fontSize: "1.4rem",
                  textAlign: "center",
                  marginBottom: 36,
                }}
              >
                {lang === "uz"
                  ? "Pedagoglarimiz"
                  : lang === "ru"
                    ? "Наши педагоги"
                    : "Our Teachers"}
              </h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                  gap: 24,
                }}
              >
                {dbTeachers.map((teacher) => {
                  const name =
                    lang === "uz"
                      ? teacher.fullNameUz
                      : lang === "ru"
                        ? teacher.fullNameRu
                        : teacher.fullNameEn;
                  const subject =
                    lang === "uz"
                      ? teacher.subjectUz
                      : lang === "ru"
                        ? teacher.subjectRu
                        : teacher.subjectEn;
                  return (
                    <div
                      key={teacher.id}
                      className="card-hover"
                      style={{
                        background: "white",
                        borderRadius: 16,
                        padding: "24px 16px",
                        border: "1px solid rgba(26,58,110,0.07)",
                        boxShadow: "0 4px 16px rgba(26,58,110,0.04)",
                        textAlign: "center",
                      }}
                    >
                      <div
                        style={{
                          width: 80,
                          height: 80,
                          borderRadius: "50%",
                          overflow: "hidden",
                          margin: "0 auto 16px",
                          background: "rgba(200,169,110,0.1)",
                          border: "2px solid rgba(200,169,110,0.2)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {teacher.photoUrl ? (
                          <Image
                            src={teacher.photoUrl}
                            alt=""
                            width={80}
                            height={80}
                            style={{
                              objectFit: "cover",
                              width: "100%",
                              height: "100%",
                            }}
                          />
                        ) : (
                          <span style={{ fontSize: "1.8rem" }}>👨‍🏫</span>
                        )}
                      </div>
                      <h4
                        style={{
                          color: "#1a1f2e",
                          fontWeight: 700,
                          fontSize: "0.9rem",
                          margin: "0 0 6px",
                          lineHeight: 1.3,
                        }}
                      >
                        {name}
                      </h4>
                      <p
                        style={{
                          color: "#6b7280",
                          fontSize: "0.78rem",
                          margin: 0,
                        }}
                      >
                        {subject}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
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
                    boxShadow:
                      openFaq === i
                        ? "0 8px 32px rgba(26,58,110,0.1)"
                        : undefined,
                    borderColor:
                      openFaq === i ? "rgba(26,58,110,0.15)" : "#e5e7eb",
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
                        background:
                          openFaq === i
                            ? "linear-gradient(135deg,#1a3a6e,#2d5bb5)"
                            : "rgba(26,58,110,0.07)",
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
                    <div
                      style={{
                        padding: "0 24px 22px",
                        animation: "fadeInUp 0.3s ease",
                      }}
                    >
                      <div
                        style={{
                          height: 1,
                          background: "rgba(26,58,110,0.08)",
                          marginBottom: 16,
                        }}
                      />
                      <p
                        style={{
                          color: "#4b5563",
                          lineHeight: 1.8,
                          fontSize: "0.9rem",
                        }}
                      >
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
              <h3
                style={{
                  color: "white",
                  fontWeight: 700,
                  fontSize: "1.2rem",
                  marginBottom: 12,
                }}
              >
                {lang === "uz"
                  ? "Qabul haqida ko'proq ma'lumot olish uchun"
                  : lang === "ru"
                    ? "Узнать больше о поступлении"
                    : "Learn more about admission"}
              </h3>
              <p
                style={{
                  color: "rgba(255,255,255,0.6)",
                  marginBottom: 24,
                  fontSize: "0.9rem",
                }}
              >
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
