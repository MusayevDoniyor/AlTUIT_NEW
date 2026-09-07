"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { translations } from "@/lib/i18n";
import { useLang } from "@/lib/useLang";
import { getTeachers, getDepartments, getLeadership, TeacherItem } from "@/lib/db";
import { useAsyncData } from "@/lib/useAsyncData";
import { parseTeacherInfo, parseTeacherCertificates } from "@/lib/teacherUtils";
import {
  Target,
  Eye,
  Star,
  BookOpen,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Users,
  Award,
  Bell,
  Clock,
  Coffee,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PubSkeleton } from "@/components/Skeleton";

function DefaultAvatar() {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%", display: "block" }}
      aria-hidden="true"
    >
      <rect width="48" height="48" fill="#e2e8f0" />
      <circle cx="24" cy="17" r="7.5" fill="#94a3b8" />
      <path
        d="M8 43c0-7 5.5-12.5 13-13.5h6c7.5 1 13 6.5 13 13.5v5H8v-5z"
        fill="#94a3b8"
      />
    </svg>
  );
}

function TeacherAvatar({
  src,
  alt = "",
  size = 56,
}: {
  src?: string;
  alt?: string;
  size?: number;
}) {
  const [errorSrc, setErrorSrc] = useState<string | null>(null);

  if (!src || errorSrc === src) {
    return <DefaultAvatar />;
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      style={{
        objectFit: "cover",
        width: "100%",
        height: "100%",
      }}
      onError={() => setErrorSrc(src)}
    />
  );
}

export default function AboutClient() {
  const [lang, setLang] = useLang();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const { data: aboutData, loading } = useAsyncData(
    async () => {
      const [teachers, depts, leadership] = await Promise.all([
        getTeachers().catch(() => []),
        getDepartments().catch(() => []),
        getLeadership().catch(() => []),
      ]);
      return { teachers, depts, leadership };
    },
    [],
  );
  const dbTeachers = aboutData?.teachers ?? [];
  const dbDepartments = aboutData?.depts ?? [];
  const dbLeadership = aboutData?.leadership ?? [];
  const [openDept, setOpenDept] = useState<number | null>(null);
  const [selectedTeacher, setSelectedTeacher] = useState<TeacherItem | null>(
    null,
  );

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
                    2006
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
              maxWidth: 620,
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
            <p className="section-subtitle" style={{ margin: "0 auto" }}>
              {lang === "uz"
                ? "Akademik litsey ma'muriyati va rahbarlari"
                : lang === "ru"
                  ? "Администрация и руководители академического лицея"
                  : "Administration and leaders of the academic lyceum"}
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
              gap: 28,
              maxWidth: 1100,
              margin: "0 auto",
            }}
          >
            {loading ? (
              <div style={{ gridColumn: "1 / -1" }}>
                <PubSkeleton />
              </div>
            ) : dbLeadership.length === 0 ? (
              <p
                style={{
                  color: "#6b7280",
                  fontSize: "0.95rem",
                  margin: 0,
                  gridColumn: "1 / -1",
                  textAlign: "center",
                }}
              >
                {lang === "uz"
                  ? "Rahbariyat haqida ma'lumot mavjud emas"
                  : lang === "ru"
                    ? "Информация о руководстве отсутствует"
                    : "No leadership info available"}
              </p>
            ) : (
              dbLeadership.map((m) => {
                const name =
                  lang === "uz"
                    ? m.nameUz
                    : lang === "ru"
                      ? m.nameRu || m.nameUz
                      : m.nameEn || m.nameUz;
                const role =
                  lang === "uz"
                    ? m.roleUz
                    : lang === "ru"
                      ? m.roleRu || m.roleUz
                      : m.roleEn || m.roleUz;
                const initials =
                  m.initials ||
                  name
                    .split(" ")
                    .map((w) => w[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase();
                return (
                  <div
                    key={m.id || name}
                    style={{
                      background: "rgba(255,255,255,0.9)",
                      backdropFilter: "blur(10px)",
                      borderRadius: 20,
                      padding: "36px 28px",
                      boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                      border: "1px solid rgba(255,255,255,0.8)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        width: 140,
                        height: 140,
                        borderRadius: "50%",
                        overflow: "hidden",
                        border: "4px solid #c8a96e",
                        boxShadow: "0 8px 32px rgba(0,33,71,0.15)",
                        marginBottom: 24,
                        flexShrink: 0,
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: `${m.color || "#1a3a6e"}18`,
                      }}
                    >
                      {m.photoUrl ? (
                        <Image
                          src={m.photoUrl}
                          alt={name}
                          fill
                          sizes="140px"
                          style={{ objectFit: "cover" }}
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      ) : (
                        <span
                          style={{
                            fontSize: "2.4rem",
                            fontWeight: 900,
                            color: m.color || "#1a3a6e",
                          }}
                        >
                          {initials}
                        </span>
                      )}
                    </div>
                    <h3
                      style={{
                        color: "#1a1f2e",
                        fontWeight: 800,
                        fontSize: "1.2rem",
                        marginBottom: 6,
                        lineHeight: 1.3,
                      }}
                    >
                      {name}
                    </h3>
                    <p
                      style={{
                        color: "#6b7280",
                        fontSize: "0.9rem",
                        fontWeight: 500,
                        margin: 0,
                      }}
                    >
                      {role}
                    </p>
                  </div>
                );
              })
            )}
          </div>
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
                ? "Kafedralar"
                : lang === "ru"
                  ? "Кафедры"
                  : "Departments"}
            </h2>
            <p
              style={{ color: "#6b7280", fontSize: "0.97rem", lineHeight: 1.6 }}
            >
              {lang === "uz"
                ? `${dbTeachers.length} malakali pedagog ${dbDepartments.length} ta kafedrada dars olib boradi`
                : lang === "ru"
                  ? `${dbTeachers.length} квалифицированных педагогов ведут занятия на ${dbDepartments.length} кафедрах`
                  : `${dbTeachers.length} qualified teachers conduct classes in ${dbDepartments.length} departments`}
            </p>
          </div>

          <Link
            href="/departments"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 28,
              color: "#c8a96e",
              fontWeight: 600,
              fontSize: "0.88rem",
              textDecoration: "none",
              transition: "gap 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.gap = "12px";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.gap = "8px";
            }}
          >
            {lang === "uz"
              ? "Barcha kafedralarni ko'rish"
              : lang === "ru"
                ? "Все кафедры"
                : "View all departments"}
            <ChevronRight size={15} />
          </Link>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
              gap: 20,
            }}
          >
            {dbDepartments.length === 0 ? (
              <p
                style={{
                  color: "#6b7280",
                  fontSize: "0.95rem",
                  margin: 0,
                  gridColumn: "1 / -1",
                  textAlign: "center",
                  padding: "24px 0",
                }}
              >
                {lang === "uz"
                  ? "Kafedralar haqida ma'lumot mavjud emas"
                  : lang === "ru"
                    ? "Информация о кафедрах отсутствует"
                    : "No department information available"}
              </p>
            ) : (
              dbDepartments.map((dept, i) => {
              const name =
                lang === "uz"
                  ? dept.nameUz
                  : lang === "ru"
                    ? dept.nameRu
                    : dept.nameEn;
              const count = dbTeachers.filter(
                (t) => t.departmentId === dept.id,
              ).length;
              const colors = [
                "#1a3a6e", "#2d5bb5", "#1d7a55",
                "#c8a96e", "#6032bf", "#b91c1c",
                "#0891b2", "#0f766e", "#b45309",
              ];
              const color = colors[i % colors.length];
              return (
                <Link
                  key={dept.id}
                  href="/departments"
                  className="card-hover"
                  style={{
                    background: "white",
                    borderRadius: 16,
                    padding: "24px",
                    border: "1px solid rgba(26,58,110,0.07)",
                    boxShadow: "0 4px 16px rgba(26,58,110,0.05)",
                    borderLeft: `4px solid ${color}`,
                    textDecoration: "none",
                    transition: "all 0.2s",
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
                        background: `${color}18`,
                        color: color,
                        fontSize: "0.82rem",
                        fontWeight: 700,
                        padding: "4px 12px",
                        borderRadius: 50,
                        border: `1px solid ${color}30`,
                      }}
                    >
                      {count}{" "}
                      {lang === "uz"
                        ? "o'qituvchi"
                        : lang === "ru"
                          ? "педагогов"
                          : "teachers"}
                    </div>
                  </div>
                </Link>
              );
              })
            )}
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
                3+
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
                20+
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
                {(() => {
                  const accColors = ["#1a3a6e","#2d5bb5","#1d7a55","#c8a96e","#6032bf","#b91c1c","#0891b2","#0f766e","#b45309"];
                  return dbDepartments.map((dept, di) => {
                  const deptName =
                    lang === "uz"
                      ? dept.nameUz
                      : lang === "ru"
                        ? dept.nameRu
                        : dept.nameEn;
                  const deptTeachers = dbTeachers.filter(
                    (t) => t.departmentId === dept.id,
                  );
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
                          borderLeft: `4px solid ${accColors[di % accColors.length]}`,
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
                              background: `${accColors[di % accColors.length]}18`,
                              color: accColors[di % accColors.length],
                              fontSize: "0.78rem",
                              fontWeight: 700,
                              padding: "2px 10px",
                              borderRadius: 50,
                              border: `1px solid ${accColors[di % accColors.length]}30`,
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
                                (lang === "uz"
                                  ? t.fullNameUz
                                  : lang === "ru"
                                    ? t.fullNameRu
                                    : t.fullNameEn) || t.fullNameUz;
                              const subject =
                                (lang === "uz"
                                  ? t.subjectUz
                                  : lang === "ru"
                                    ? t.subjectRu
                                    : t.subjectEn) || t.subjectUz;
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
                                    <TeacherAvatar
                                      src={t.photoUrl}
                                      alt={name}
                                      size={56}
                                    />
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
                })})()}
              </div>
            </div>
          ) : (
            <p
              style={{
                color: "#6b7280",
                fontSize: "0.95rem",
                margin: "64px 0 0",
                textAlign: "center",
              }}
            >
              {lang === "uz"
                ? "O'qituvchilar haqida ma'lumot mavjud emas"
                : lang === "ru"
                  ? "Информация о педагогах отсутствует"
                  : "No teacher information available"}
            </p>
          )}
        </div>
      </section>

      {/* ===== BELL SCHEDULE (QO'NG'IROQLAR JADVALI) ===== */}
      <section id="schedule" style={{ padding: "96px 0", background: "white" }}>
        <div className="container-custom">
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                background: "rgba(200,169,110,0.12)",
                color: "#9c7c3c",
                fontSize: "0.78rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                padding: "6px 16px",
                borderRadius: 50,
                marginBottom: 16,
                textTransform: "uppercase",
              }}
            >
              <Bell size={14} />
              <span>
                {lang === "uz" ? "Kun tartibi" : lang === "ru" ? "Режим дня" : "Daily Routine"}
              </span>
            </div>
            <h2 className="section-title" style={{ marginBottom: 12 }}>
              {lang === "uz"
                ? "Dars va qo'ng'iroqlar jadvali"
                : lang === "ru"
                  ? "Расписание звонков и занятий"
                  : "Class & Bell Schedule"}
            </h2>
            <p
              style={{
                color: "#64748b",
                maxWidth: 600,
                margin: "0 auto",
                fontSize: "0.95rem",
                lineHeight: 1.6,
              }}
            >
              {lang === "uz"
                ? "O'quv mashg'ulotlari juftliklar asosida olib boriladi. Darslar va tanaffuslar vaqtlari bilan tanishing."
                : lang === "ru"
                  ? "Занятия проводятся парами. Ознакомьтесь с временем занятий и перемен."
                  : "Classes are held in double periods (pairs). Check out the class and recess schedules."}
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: 28,
              maxWidth: 1060,
              margin: "0 auto",
            }}
          >
            {/* Card 1: Academic Classes */}
            <div
              style={{
                background: "#f8f9fc",
                borderRadius: 20,
                padding: "32px 28px",
                border: "1px solid rgba(26,58,110,0.08)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: "linear-gradient(135deg, #1a3a6e, #2d5bb5)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                  }}
                >
                  <Clock size={22} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: "1.15rem", fontWeight: 700, color: "#1a3a6e" }}>
                    {lang === "uz" ? "Asosiy o'quv darslari" : lang === "ru" ? "Основные занятия" : "Main Academic Classes"}
                  </h3>
                  <span style={{ fontSize: "0.8rem", color: "#64748b" }}>
                    {lang === "uz" ? "Dushanba — Shanba (08:30 – 14:30)" : lang === "ru" ? "Понедельник — Суббота" : "Monday — Saturday"}
                  </span>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  {
                    pair: lang === "uz" ? "1-juftlik" : lang === "ru" ? "1-я пара" : "Pair 1",
                    time: "08:30 — 09:50",
                    breakNote: lang === "uz" ? "10 daqiqa tanaffus" : lang === "ru" ? "Перемена 10 минут" : "10 min break",
                    isLunch: false,
                  },
                  {
                    pair: lang === "uz" ? "2-juftlik" : lang === "ru" ? "2-я пара" : "Pair 2",
                    time: "10:00 — 11:20",
                    breakNote: lang === "uz" ? "20 daqiqa katta tanaffus (Tushlik)" : lang === "ru" ? "Большая перемена 20 минут" : "20 min lunch break",
                    isLunch: true,
                  },
                  {
                    pair: lang === "uz" ? "3-juftlik" : lang === "ru" ? "3-я пара" : "Pair 3",
                    time: "11:40 — 13:00",
                    breakNote: lang === "uz" ? "10 daqiqa tanaffus" : lang === "ru" ? "Перемена 10 минут" : "10 min break",
                    isLunch: false,
                  },
                  {
                    pair: lang === "uz" ? "4-juftlik" : lang === "ru" ? "4-я пара" : "Pair 4",
                    time: "13:10 — 14:30",
                    breakNote: lang === "uz" ? "Dars mashg'ulotlari yakuni" : lang === "ru" ? "Конец занятий" : "End of classes",
                    isLunch: false,
                  },
                ].map((slot, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: "white",
                      borderRadius: 14,
                      padding: "16px 18px",
                      border: "1px solid rgba(26,58,110,0.06)",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <span style={{ display: "block", fontWeight: 700, color: "#1a1f2e", fontSize: "0.95rem" }}>
                        {slot.pair}
                      </span>
                      <span style={{ display: "flex", alignItems: "center", gap: 4, color: slot.isLunch ? "#d97706" : "#64748b", fontSize: "0.78rem", marginTop: 3 }}>
                        {slot.isLunch && <Coffee size={12} />}
                        {slot.breakNote}
                      </span>
                    </div>
                    <span
                      style={{
                        fontFamily: "monospace",
                        fontWeight: 700,
                        fontSize: "0.95rem",
                        color: "#1a3a6e",
                        background: "rgba(26,58,110,0.06)",
                        padding: "4px 10px",
                        borderRadius: 8,
                      }}
                    >
                      {slot.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 2: Extracurricular Activities */}
            <div
              style={{
                background: "#f8f9fc",
                borderRadius: 20,
                padding: "32px 28px",
                border: "1px solid rgba(26,58,110,0.08)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: "linear-gradient(135deg, #c8a96e, #dfc08a)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#0f2347",
                  }}
                >
                  <BookOpen size={22} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: "1.15rem", fontWeight: 700, color: "#1a3a6e" }}>
                    {lang === "uz" ? "To'garaklar va laboratoriyalar" : lang === "ru" ? "Кружки и лаборатории" : "Clubs & Laboratories"}
                  </h3>
                  <span style={{ fontSize: "0.8rem", color: "#64748b" }}>
                    {lang === "uz" ? "Darsdan keyingi mashg'ulotlar (14:30 – 17:30)" : lang === "ru" ? "Внеурочная деятельность" : "After-school activities"}
                  </span>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  {
                    title: lang === "uz" ? "Fan to'garaklari & Olimpiada tayyorgarligi" : lang === "ru" ? "Предметные кружки и олимпиады" : "Subject Clubs & Olympiad Prep",
                    desc: lang === "uz" ? "Matematika, Fizika va Informatika chuqurlashtirilgan mashg'ulotlari" : lang === "ru" ? "Математика, физика и информатика" : "Advanced Math, Physics and CS",
                    time: "14:40 — 16:00",
                  },
                  {
                    title: lang === "uz" ? "Dasturlash (IT) va Robototexnika" : lang === "ru" ? "Программирование (IT) и робототехника" : "IT Programming & Robotics",
                    desc: lang === "uz" ? "Web dasturlash, Python, algoritmlar va sun'iy intellekt asoslari" : lang === "ru" ? "Веб-разработка, Python и алгоритмы" : "Web dev, Python and algorithms",
                    time: "16:10 — 17:30",
                  },
                  {
                    title: lang === "uz" ? "Xorijiy tillar klubi (IELTS / CEFR)" : lang === "ru" ? "Клуб иностранных языков" : "Foreign Languages Club",
                    desc: lang === "uz" ? "Ingliz tili so'zlashuv klubi va imtihonlarga tayyorlanish" : lang === "ru" ? "Разговорный клуб и подготовка к экзаменам" : "Speaking club and exam prep",
                    time: "15:00 — 16:30",
                  },
                  {
                    title: lang === "uz" ? "Sport to'garaklari" : lang === "ru" ? "Спортивные секции" : "Sports Sections",
                    desc: lang === "uz" ? "Futbol, shaxmat, stol tennisi va voleybol seksiyalari" : lang === "ru" ? "Футбол, шахматы, настольный теннис" : "Football, chess, table tennis",
                    time: "16:00 — 17:30",
                  },
                ].map((act, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: "white",
                      borderRadius: 14,
                      padding: "16px 18px",
                      border: "1px solid rgba(26,58,110,0.06)",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8, marginBottom: 4 }}>
                      <span style={{ fontWeight: 700, color: "#1a1f2e", fontSize: "0.92rem" }}>
                        {act.title}
                      </span>
                      <span
                        style={{
                          fontFamily: "monospace",
                          fontWeight: 700,
                          fontSize: "0.82rem",
                          color: "#9c7c3c",
                          background: "rgba(200,169,110,0.12)",
                          padding: "3px 8px",
                          borderRadius: 6,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {act.time}
                      </span>
                    </div>
                    <span style={{ color: "#64748b", fontSize: "0.78rem" }}>
                      {act.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>
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
                  <TeacherAvatar
                    src={selectedTeacher.photoUrl}
                    alt={selectedTeacher.fullNameUz}
                    size={72}
                  />
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
                    {(lang === "uz"
                      ? selectedTeacher.fullNameUz
                      : lang === "ru"
                        ? selectedTeacher.fullNameRu
                        : selectedTeacher.fullNameEn) ||
                      selectedTeacher.fullNameUz}
                  </h3>
                  <p
                    style={{
                      margin: "6px 0 0",
                      color: "#475569",
                      fontSize: "0.95rem",
                    }}
                  >
                    {(lang === "uz"
                      ? selectedTeacher.subjectUz
                      : lang === "ru"
                        ? selectedTeacher.subjectRu
                        : selectedTeacher.subjectEn) ||
                      selectedTeacher.subjectUz}
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
                const infoRaw =
                  lang === "uz"
                    ? selectedTeacher.infoUz
                    : lang === "ru"
                      ? selectedTeacher.infoRu
                      : selectedTeacher.infoEn;
                const certRaw =
                  lang === "uz"
                    ? selectedTeacher.certificatesUz
                    : lang === "ru"
                      ? selectedTeacher.certificatesRu
                      : selectedTeacher.certificatesEn;

                const { description, experience } = parseTeacherInfo(infoRaw);
                const { certificates } = parseTeacherCertificates(certRaw);

                return (
                  <>
                    {description && (
                      <div>
                        <h4
                          style={{
                            margin: "0 0 10px",
                            fontSize: "1rem",
                            fontWeight: 700,
                            color: "#1a1f2e",
                          }}
                        >
                          {lang === "uz"
                            ? "Ma'lumot (Tavsif)"
                            : lang === "ru"
                              ? "Информация"
                              : "About"}
                        </h4>
                        <p
                          style={{
                            margin: 0,
                            color: "#475569",
                            lineHeight: 1.8,
                            fontSize: "0.95rem",
                          }}
                        >
                          {description}
                        </p>
                      </div>
                    )}

                    {experience && experience.length > 0 && (
                      <div>
                        <h4
                          style={{
                            margin: "0 0 12px",
                            fontSize: "1rem",
                            fontWeight: 700,
                            color: "#1a1f2e",
                          }}
                        >
                          {lang === "uz"
                            ? "Tajriba"
                            : lang === "ru"
                              ? "Опыт работы"
                              : "Experience"}
                        </h4>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 10,
                          }}
                        >
                          {experience.map((exp, index) => (
                            <div
                              key={index}
                              style={{
                                display: "flex",
                                gap: 12,
                                alignItems: "flex-start",
                                background: "#f8f9fc",
                                padding: "12px 16px",
                                borderRadius: 12,
                                border: "1px solid #e2e8f0",
                              }}
                            >
                              <div
                                style={{
                                  width: 28,
                                  height: 28,
                                  borderRadius: 8,
                                  background: "rgba(26,58,110,0.08)",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  flexShrink: 0,
                                }}
                              >
                                <span style={{ fontSize: "0.85rem" }}>💼</span>
                              </div>
                              <p
                                style={{
                                  margin: 0,
                                  color: "#475569",
                                  fontSize: "0.9rem",
                                  lineHeight: 1.5,
                                  fontWeight: 550,
                                }}
                              >
                                {exp}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {certificates && certificates.length > 0 && (
                      <div>
                        <h4
                          style={{
                            margin: "0 0 12px",
                            fontSize: "1rem",
                            fontWeight: 700,
                            color: "#1a1f2e",
                          }}
                        >
                          {lang === "uz"
                            ? "Sertifikatlar va yutuqlar"
                            : lang === "ru"
                              ? "Сертификаты и достижения"
                              : "Certificates & Achievements"}
                        </h4>
                        <div
                          style={{ display: "flex", flexWrap: "wrap", gap: 8 }}
                        >
                          {certificates.map((cert, index) => (
                            <div
                              key={index}
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 6,
                                background: "rgba(200,169,110,0.1)",
                                border: "1px solid rgba(200,169,110,0.25)",
                                color: "#9c7c3c",
                                padding: "6px 14px",
                                borderRadius: 50,
                                fontSize: "0.82rem",
                                fontWeight: 600,
                              }}
                            >
                              <Award size={13} color="#c8a96e" />
                              <span>{cert}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {!description &&
                      (!experience || experience.length === 0) &&
                      (!certificates || certificates.length === 0) && (
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
