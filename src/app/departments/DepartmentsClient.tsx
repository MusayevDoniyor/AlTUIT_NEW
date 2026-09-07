"use client";

import Link from "next/link";
import Image from "next/image";
import { translations } from "@/lib/i18n";
import { useAsyncData } from "@/lib/useAsyncData";
import { useLang } from "@/lib/useLang";
import { Building2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getDepartments, getTeachers, DepartmentItem } from "@/lib/db";
import { PubBlock } from "@/components/Skeleton";

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

export default function DepartmentsClient() {
  const [lang, setLang] = useLang();
  const { data, loading } = useAsyncData(async () => {
    const [depts, teachers] = await Promise.all([
      getDepartments().catch(() => []),
      getTeachers().catch(() => []),
    ]);
    return { depts, teachers };
  }, []);

  const t = translations[lang];

  const depts = data?.depts ?? [];
  const teachers = data?.teachers ?? [];

  const teachersInDept = (deptId: string) =>
    teachers.filter((t) => t.departmentId === deptId);

  const headTeacher = (dept: DepartmentItem) =>
    dept.headTeacherId ? teachers.find((t) => t.id === dept.headTeacherId) : null;

  return (
    <main>
      <Navbar lang={lang} onLangChange={setLang} />

      <div className="page-banner" style={{ paddingTop: 140 }}>
        <div className="container-custom" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16, fontSize: "0.8rem", color: "rgba(255,255,255,0.6)" }}>
            <Link href="/" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>{t.nav_home}</Link>
            <span>/</span>
            <span style={{ color: "#c8a96e" }}>
              {lang === "uz" ? "Kafedralar" : lang === "ru" ? "Кафедры" : "Departments"}
            </span>
          </div>
          <h1 style={{ color: "white", fontWeight: 900, fontSize: "clamp(2rem,5vw,3rem)", marginBottom: 12 }}>
            {lang === "uz" ? "Kafedralar" : lang === "ru" ? "Кафедры" : "Departments"}
          </h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1rem", maxWidth: 600 }}>
            {lang === "uz"
              ? "Akademik litsey kafedralari va professor-o'qituvchilar tarkibi"
              : lang === "ru"
                ? "Кафедры академического лицея и состав преподавателей"
                : "Academic lyceum departments and teaching staff"}
          </p>
        </div>
      </div>

      <section style={{ padding: "80px 0", background: "#f8f9fc" }}>
        <div className="container-custom">
          {loading ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 700, margin: "0 auto" }}>
              {[1, 2, 3].map((i) => <PubBlock key={i} lines={3} height={16} />)}
            </div>
          ) : depts.length === 0 ? (
            <div style={{ textAlign: "center", padding: "48px 0", color: "#6b7280" }}>
              <Building2 size={48} style={{ opacity: 0.3, marginBottom: 16 }} />
              <p style={{ fontSize: "1rem" }}>
                {lang === "uz" ? "Kafedralar mavjud emas" : lang === "ru" ? "Кафедры отсутствуют" : "No departments"}
              </p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 860, margin: "0 auto" }}>
              {depts.map((dept) => {
                const name = lang === "uz" ? dept.nameUz : lang === "ru" ? dept.nameRu : dept.nameEn;
                const head = headTeacher(dept);
                const teacherList = teachersInDept(dept.id!);
                const headName = head
                  ? (lang === "uz" ? head.fullNameUz : lang === "ru" ? head.fullNameRu || head.fullNameUz : head.fullNameEn || head.fullNameUz)
                  : "";
                const headSubject = head
                  ? (lang === "uz" ? head.subjectUz : lang === "ru" ? head.subjectRu || head.subjectUz : head.subjectEn || head.subjectUz)
                  : "";

                return (
                  <div key={dept.id} style={{
                    background: "white", borderRadius: 18,
                    border: "1px solid rgba(26,58,110,0.07)",
                    boxShadow: "0 4px 20px rgba(26,58,110,0.05)",
                    overflow: "hidden",
                  }}>
                    {/* Header */}
                    <div style={{
                      padding: "24px 28px",
                      borderBottom: "1px solid rgba(26,58,110,0.07)",
                      display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap",
                    }}>
                      <div style={{
                        width: 48, height: 48, borderRadius: 12,
                        background: "rgba(200,169,110,0.12)",
                        border: "1px solid rgba(200,169,110,0.25)",
                        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                      }}>
                        <Building2 size={22} color="#c8a96e" />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <h2 style={{ color: "#1a3a6e", fontWeight: 800, fontSize: "1.15rem", margin: 0 }}>
                          {name}
                        </h2>
                        <p style={{ color: "#6b7280", fontSize: "0.82rem", margin: "4px 0 0" }}>
                          {teacherList.length} {lang === "uz" ? "ta o'qituvchi" : lang === "ru" ? "педагогов" : "teachers"}
                          {head ? ` · ${lang === "uz" ? "Mudir" : lang === "ru" ? "Зав. кафедрой" : "Head"}: ${headName}` : ""}
                        </p>
                      </div>
                    </div>

                    {/* Head teacher card */}
                    {head && (
                      <div style={{
                        display: "flex", alignItems: "center", gap: 16,
                        padding: "18px 28px", margin: "16px 20px 0",
                        background: "rgba(200,169,110,0.06)",
                        border: "1px solid rgba(200,169,110,0.15)",
                        borderRadius: 12,
                      }}>
                        <div style={{
                          width: 52, height: 52, borderRadius: "50%",
                          overflow: "hidden", flexShrink: 0,
                          background: "rgba(200,169,110,0.15)",
                          border: "2px solid #c8a96e",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          position: "relative",
                        }}>
                          {head.photoUrl ? (
                            <Image src={head.photoUrl} alt={headName} fill style={{ objectFit: "cover" }} sizes="52px" />
                          ) : (
                            <DefaultAvatar />
                          )}
                        </div>
                        <div>
                          <p style={{ color: "#c8a96e", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 0 2px" }}>
                            {lang === "uz" ? "Kafedra mudiri" : lang === "ru" ? "Зав. кафедрой" : "Head of Department"}
                          </p>
                          <p style={{ color: "#1a3a6e", fontWeight: 700, fontSize: "0.95rem", margin: 0 }}>
                            {headName}
                          </p>
                          <p style={{ color: "#6b7280", fontSize: "0.8rem", margin: "2px 0 0" }}>
                            {headSubject}
                          </p>
                        </div>
                        <div style={{
                          marginLeft: "auto",
                          background: "#c8a96e", color: "white",
                          fontSize: "0.72rem", fontWeight: 700,
                          padding: "3px 10px", borderRadius: 50,
                        }}>
                          {lang === "uz" ? "Mudir" : lang === "ru" ? "Зав." : "Head"}
                        </div>
                      </div>
                    )}

                    {/* Teachers list */}
                    <div style={{ padding: "16px 20px" }}>
                      {teacherList
                        .filter((t) => t.id !== dept.headTeacherId)
                        .map((t, i) => {
                          const tName = lang === "uz" ? t.fullNameUz : lang === "ru" ? t.fullNameRu || t.fullNameUz : t.fullNameEn || t.fullNameUz;
                          const tSubject = lang === "uz" ? t.subjectUz : lang === "ru" ? t.subjectRu || t.subjectUz : t.subjectEn || t.subjectUz;
                          return (
                            <div key={t.id} style={{
                              display: "flex", alignItems: "center", gap: 12,
                              padding: "12px 8px",
                              borderBottom: i < teacherList.length - 1 ? "1px solid rgba(26,58,110,0.05)" : "none",
                            }}>
                              <div style={{
                                width: 36, height: 36, borderRadius: "50%",
                                overflow: "hidden", flexShrink: 0,
                                background: "rgba(200,169,110,0.1)",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                position: "relative",
                              }}>
                                {t.photoUrl ? (
                                  <Image src={t.photoUrl} alt={tName} fill style={{ objectFit: "cover" }} sizes="36px" />
                                ) : (
                                  <DefaultAvatar />
                                )}
                              </div>
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <p style={{ color: "#1a3a6e", fontWeight: 600, fontSize: "0.88rem", margin: 0 }}>
                                  {tName}
                                </p>
                                <p style={{ color: "#6b7280", fontSize: "0.78rem", margin: "2px 0 0" }}>
                                  {tSubject}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      {teacherList.filter((t) => t.id !== dept.headTeacherId).length === 0 && !head && (
                        <p style={{ color: "#9ca3af", fontSize: "0.85rem", textAlign: "center", padding: "16px 0" }}>
                          {lang === "uz" ? "O'qituvchilar mavjud emas" : lang === "ru" ? "Нет преподавателей" : "No teachers"}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Footer lang={lang} />
    </main>
  );
}
