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
import { PubSkeleton, PubBlock } from "@/components/Skeleton";

const LEADERSHIP: any[] = [];

interface Dept {
  nameUz: string;
  nameRu: string;
  nameEn: string;
  color: string;
  keywords: string[];
}
const DEPARTMENTS: Dept[] = [
  {
    nameUz: "Matematika va fizika",
    nameRu: "Математика и физика",
    nameEn: "Mathematics & Physics",
    color: "#1a3a6e",
    keywords: ["matematik", "fizik", "algebra", "geometri"],
  },
  {
    nameUz: "Informatika va texnologiya",
    nameRu: "Информатика и технологии",
    nameEn: "Informatics & Technology",
    color: "#2d5bb5",
    keywords: ["informatik", "texnolog", "dasturlash", "kompyuter"],
  },
  {
    nameUz: "Kimyo va biologiya",
    nameRu: "Химия и биология",
    nameEn: "Chemistry & Biology",
    color: "#1d7a55",
    keywords: ["kimyo", "biologi"],
  },
  {
    nameUz: "Tarix va ijtimoiy fanlar",
    nameRu: "История и обществознание",
    nameEn: "History & Social Studies",
    color: "#c8a96e",
    keywords: ["tarix", "ijtimoiy", "huquq", "iqtisod"],
  },
  {
    nameUz: "Chet tillari",
    nameRu: "Иностранные языки",
    nameEn: "Foreign Languages",
    color: "#6032bf",
    keywords: ["ingliz", "chet tili", "nemis", "fransuz"],
  },
  {
    nameUz: "Ona tili va adabiyot",
    nameRu: "Родной язык и литература",
    nameEn: "Native Language & Literature",
    color: "#b91c1c",
    keywords: ["ona tili", "adabiyot"],
  },
];

export default function AboutClient() {
  const [lang, setLang] = useState<Lang>("uz");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const [dbLeadership, setDbLeadership] = useState<LeadershipItem[]>([]);
  const [dbTeachers, setDbTeachers] = useState<TeacherItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDept, setOpenDept] = useState<number | null>(null);
  const [selectedTeacher, setSelectedTeacher] = useState<TeacherItem | null>(null);

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

          {loading ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
                gap: 24,
              }}
            >
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  style={{
                    background: "white",
                    borderRadius: 18,
                    padding: "32px 24px",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <PubSkeleton width={90} height={90} borderRadius={45} />
                  <PubSkeleton width="60%" height={16} />
                  <PubSkeleton width="40%" height={12} />
                </div>
              ))}
            </div>
          ) : dbLeadership.length === 0 ? (
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
                      {
                        dbTeachers.filter((t) => {
                          const subj = (t.subjectUz || "").toLowerCase();
                          return dept.keywords.some((k) => subj.includes(k));
                        }).length
                      }{" "}
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

          {/* Kafedralar accordion */}
          {loading ? (
            <div
              style={{
                marginTop: 64,
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  style={{
                    background: "white",
                    borderRadius: 16,
                    padding: "20px 24px",
                  }}
                >
                  <PubSkeleton width="50%" height={18} />
                </div>
              ))}
            </div>
          ) : dbTeachers.length > 0 ? (
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
                  ? "Kafedralar bo'yicha pedagoglar"
                  : lang === "ru"
                    ? "Педагоги по кафедрам"
                    : "Teachers by Department"}
              </h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  maxWidth: 900,
                  margin: "0 auto",
                }}
              >
                {DEPARTMENTS.map((dept, di) => {
                  const deptName =
                    lang === "uz"
                      ? dept.nameUz
                      : lang === "ru"
                        ? dept.nameRu
                        : dept.nameEn;
                  const deptTeachers = dbTeachers.filter((t) => {
                    const subj = (t.subjectUz || "").toLowerCase();
                    return dept.keywords.some((k) => subj.includes(k));
                  });
                  const isOpen = openDept === di;
                  return (
                    <div
                      key={di}
                      style={{
                        background: "white",
                        borderRadius: 16,
                        border: "1px solid rgba(26,58,110,0.07)",
                        boxShadow: "0 4px 16px rgba(26,58,110,0.05)",
                        overflow: "hidden",
                      }}
                    >
                      <button
                        onClick={() => setOpenDept(isOpen ? null : di)}
                        style={{
                          width: "100%",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "18px 24px",
                          borderLeft: `4px solid ${dept.color}`,
                          fontFamily: "inherit",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                          }}
                        >
                          <h3
                            style={{
                              color: "#1a1f2e",
                              fontWeight: 700,
                              fontSize: "0.97rem",
                              margin: 0,
                            }}
                          >
                            {deptName}
                          </h3>
                          <span
                            style={{
                              background: `${dept.color}18`,
                              color: dept.color,
                              fontSize: "0.78rem",
                              fontWeight: 700,
                              padding: "2px 10px",
                              borderRadius: 50,
                              border: `1px solid ${dept.color}30`,
                            }}
                          >
                            {deptTeachers.length}{" "}
                            {lang === "uz"
                              ? "o'qituvchi"
                              : lang === "ru"
                                ? "педагогов"
                                : "teachers"}
                          </span>
                        </div>
                        {isOpen ? (
                          <ChevronUp size={18} color="#1a3a6e" />
                        ) : (
                          <ChevronDown size={18} color="#1a3a6e" />
                        )}
                      </button>
                      {isOpen && (
                        <div
                          style={{
                            padding: "0 24px 20px",
                            display: "grid",
                            gridTemplateColumns:
                              "repeat(auto-fill, minmax(180px, 1fr))",
                            gap: 16,
                          }}
                        >
                          {deptTeachers.length > 0 ? (
                            deptTeachers.map((t) => {
                              const name =
                                lang === "uz"
                                  ? t.fullNameUz
                                  : lang === "ru"
                                    ? t.fullNameRu
                                    : t.fullNameEn;
                              const subject =
                                lang === "uz"
                                  ? t.subjectUz
                                  : lang === "ru"
                                    ? t.subjectRu
                                    : t.subjectEn;
                              return (
                                <button
                                  key={t.id}
                                  type="button"
                                  onClick={() => setSelectedTeacher(t)}
                                  style={{
                                    background: "#f8f9fc",
                                    borderRadius: 12,
                                    padding: "16px 12px",
                                    textAlign: "center",
                                    border: "1px solid transparent",
                                    cursor: "pointer",
                                    transition: "all 0.2s",
                                  }}
                                >
                                  <div
                                    style={{
                                      width: 56,
                                      height: 56,
                                      borderRadius: "50%",
                                      overflow: "hidden",
                                      margin: "0 auto 10px",
                                      background: "rgba(200,169,110,0.1)",
                                      border: "2px solid rgba(200,169,110,0.2)",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                    }}
                                  >
                                    {t.photoUrl ? (
                                      <Image
                                        src={t.photoUrl}
                                        alt=""
                                        width={56}
                                        height={56}
                                        style={{
                                          objectFit: "cover",
                                          width: "100%",
                                          height: "100%",
                                        }}
                                      />
                                    ) : (
                                      <span style={{ fontSize: "1.4rem" }}>
                                        👨‍🏫
                                      </span>
                                    )}
                                  </div>
                                  <h4
                                    style={{
                                      color: "#1a1f2e",
                                      fontWeight: 700,
                                      fontSize: "0.82rem",
                                      margin: "0 0 4px",
                                      lineHeight: 1.3,
                                    }}
                                  >
                                    {name}
                                  </h4>
                                  <p
                                    style={{
                                      color: "#6b7280",
                                      fontSize: "0.72rem",
                                      margin: 0,
                                    }}
                                  >
                                    {subject}
                                  </p>
                                </button>
                              );
                            })
                          ) : (
                            <p
                              style={{
                                color: "#9ca3af",
                                fontSize: "0.85rem",
                                gridColumn: "1 / -1",
                                textAlign: "center",
                              }}
                            >
                              {lang === "uz"
                                ? "Hozircha o'qituvchilar mavjud emas"
                                : lang === "ru"
                                  ? "Педагоги пока отсутствуют"
                                  : "No teachers available yet"}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null}
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
                        <ChevronUp size={14} color="white" />
                      ) : (
                        <ChevronDown size={14} color="#1a3a6e" />
                      )}
                    </div>
                  </button>
                  <div
                    style={{
                      overflow: "hidden",
                      transition: "all 0.3s ease",
                      maxHeight: openFaq === i ? "500px" : "0",
                      opacity: openFaq === i ? 1 : 0,
                    }}
                  >
                    <p
                      style={{
                        padding: "0 24px 20px",
                        color: "#6b7280",
                        fontSize: "0.9rem",
                        lineHeight: 1.7,
                        margin: 0,
                      }}
                    >
                      {item.a}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {selectedTeacher && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1200,
            background: "rgba(0,0,0,0.65)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
          }}
          onClick={() => setSelectedTeacher(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: 720,
              background: "white",
              borderRadius: 24,
              overflow: "hidden",
              boxShadow: "0 30px 90px rgba(0,0,0,0.25)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 16,
                padding: "24px 28px",
                borderBottom: "1px solid #e2e8f0",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: "50%",
                    overflow: "hidden",
                    background: "rgba(200,169,110,0.1)",
                    border: "2px solid rgba(200,169,110,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {selectedTeacher.photoUrl ? (
                    <Image
                      src={selectedTeacher.photoUrl}
                      alt=""
                      width={72}
                      height={72}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  ) : (
                    <span style={{ fontSize: "2rem" }}>👨‍🏫</span>
                  )}
                </div>
                <div>
                  <h3
                    style={{
                      margin: 0,
                      fontSize: "1.2rem",
                      fontWeight: 800,
                      color: "#1a1f2e",
                    }}
                  >
                    {lang === "uz"
                      ? selectedTeacher.fullNameUz
                      : lang === "ru"
                        ? selectedTeacher.fullNameRu
                        : selectedTeacher.fullNameEn}
                  </h3>
                  <p
                    style={{
                      margin: "6px 0 0",
                      color: "#475569",
                      fontSize: "0.95rem",
                    }}
                  >
                    {lang === "uz"
                      ? selectedTeacher.subjectUz
                      : lang === "ru"
                        ? selectedTeacher.subjectRu
                        : selectedTeacher.subjectEn}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedTeacher(null)}
                style={{
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                  fontSize: "1.35rem",
                  lineHeight: 1,
                  color: "#475569",
                }}
                aria-label="Close teacher details"
              >
                ×
              </button>
            </div>
            <div style={{ padding: "24px 28px", display: "grid", gap: 20 }}>
              {(() => {
                const info =
                  lang === "uz"
                    ? selectedTeacher.infoUz
                    : lang === "ru"
                      ? selectedTeacher.infoRu
                      : selectedTeacher.infoEn;
                const certificates =
                  lang === "uz"
                    ? selectedTeacher.certificatesUz
                    : lang === "ru"
                      ? selectedTeacher.certificatesRu
                      : selectedTeacher.certificatesEn;
                return (
                  <>
                    {info && (
                      <div>
                        <h4
                          style={{
                            margin: 0,
                            fontSize: "1rem",
                            fontWeight: 700,
                            color: "#1a1f2e",
                          }}
                        >
                          {lang === "uz" ? "Ma'lumot" : lang === "ru" ? "Информация" : "Information"}
                        </h4>
                        <p
                          style={{
                            margin: "10px 0 0",
                            color: "#475569",
                            lineHeight: 1.8,
                          }}
                        >
                          {info}
                        </p>
                      </div>
                    )}
                    {certificates && (
                      <div>
                        <h4
                          style={{
                            margin: 0,
                            fontSize: "1rem",
                            fontWeight: 700,
                            color: "#1a1f2e",
                          }}
                        >
                          {lang === "uz" ? "Sertifikatlar" : lang === "ru" ? "Сертификаты" : "Certificates"}
                        </h4>
                        <p
                          style={{
                            margin: "10px 0 0",
                            color: "#475569",
                            lineHeight: 1.8,
                          }}
                        >
                          {certificates}
                        </p>
                      </div>
                    )}
                    {!info && !certificates && (
                      <p
                        style={{
                          margin: 0,
                          color: "#64748b",
                          fontSize: "0.95rem",
                          lineHeight: 1.7,
                        }}
                      >
                        {lang === "uz"
                          ? "O'qituvchi haqida qo'shimcha ma'lumotlar hali kiritilmagan."
                          : lang === "ru"
                            ? "Дополнительная информация об учителе пока не добавлена."
                            : "Additional teacher details have not been added yet."}
                      </p>
                    )}
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      )}

      <Footer lang={lang} />
    </main>
  );
}
