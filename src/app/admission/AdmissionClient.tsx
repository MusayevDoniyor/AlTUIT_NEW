"use client";

import { useState } from "react";
import Link from "next/link";
import { translations, type Lang } from "@/lib/i18n";
import { useAsyncData } from "@/lib/useAsyncData";
import { ClipboardList, FileText, PenLine, CheckCircle } from "lucide-react";
import { FaFileAlt, FaCalendarAlt, FaPenNib, FaPhoneAlt } from "react-icons/fa";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getAdmissionRules, type AdmissionRuleItem } from "@/lib/db";
import { PubBlock } from "@/components/Skeleton";

const APPLY_BTN = {
  uz: "my.edu.uz orqali ro'yxatdan o'ting →",
  ru: "Зарегистрируйтесь на my.edu.uz →",
  en: "Register at my.edu.uz →",
};

export default function AdmissionClient() {
  const [lang, setLang] = useState<Lang>("uz");
  const { data: rulesData, loading: loadingRules } = useAsyncData(
    () => getAdmissionRules(),
    [],
  );
  const rules = rulesData ?? [];
  const t = translations[lang];

  const steps = [
    {
      icon: ClipboardList,
      title: t.adm_step1_title,
      desc: t.adm_step1_desc,
      num: "01",
    },
    {
      icon: FileText,
      title: t.adm_step2_title,
      desc: t.adm_step2_desc,
      num: "02",
    },
    {
      icon: PenLine,
      title: t.adm_step3_title,
      desc: t.adm_step3_desc,
      num: "03",
    },
    {
      icon: CheckCircle,
      title: t.adm_step4_title,
      desc: t.adm_step4_desc,
      num: "04",
    },
  ];

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
            <span style={{ color: "#c8a96e" }}>{t.nav_admissions}</span>
          </div>
          <h1
            style={{
              color: "white",
              fontWeight: 900,
              fontSize: "clamp(2rem,5vw,3rem)",
              marginBottom: 12,
            }}
          >
            {t.adm_title}
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.7)",
              fontSize: "1rem",
              maxWidth: 600,
            }}
          >
            {t.adm_subtitle}
          </p>
        </div>
      </div>

      {/* ===== ADMISSION STEPS ===== */}
      <section
        style={{
          padding: "96px 0",
          background:
            "linear-gradient(135deg,#0a1628 0%,#0f2347 50%,#1a3a6e 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(circle,rgba(200,169,110,0.08) 0%,transparent 70%)",
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -60,
            left: -60,
            width: 300,
            height: 300,
            borderRadius: "50%",
            background:
              "radial-gradient(circle,rgba(45,91,181,0.2) 0%,transparent 70%)",
            zIndex: 0,
          }}
        />

        <div
          className="container-custom"
          style={{ position: "relative", zIndex: 1 }}
        >
          <div
            style={{
              textAlign: "center",
              maxWidth: 580,
              margin: "0 auto 64px",
            }}
          >
            <div
              style={{
                display: "inline-block",
                background: "rgba(200,169,110,0.15)",
                color: "#c8a96e",
                fontSize: "0.78rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                padding: "5px 14px",
                borderRadius: 50,
                marginBottom: 16,
                textTransform: "uppercase",
                border: "1px solid rgba(200,169,110,0.25)",
              }}
            >
              {lang === "uz"
                ? "Qabul"
                : lang === "ru"
                  ? "Поступление"
                  : "Admissions"}
            </div>
            <h2
              style={{
                color: "white",
                fontWeight: 800,
                fontSize: "clamp(1.6rem,4vw,2.2rem)",
                marginBottom: 14,
              }}
            >
              {lang === "uz"
                ? "Qabul bosqichlari"
                : lang === "ru"
                  ? "Этапы поступления"
                  : "Admission Steps"}
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
              gap: 24,
              marginBottom: 56,
            }}
          >
            {steps.map((step, i) => (
              <div
                key={i}
                style={{
                  background: "rgba(255,255,255,0.05)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 18,
                  padding: "28px 24px",
                  position: "relative",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.background =
                    "rgba(255,255,255,0.09)";
                  (e.currentTarget as HTMLDivElement).style.transform =
                    "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.background =
                    "rgba(255,255,255,0.05)";
                  (e.currentTarget as HTMLDivElement).style.transform = "none";
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 16,
                    right: 18,
                    color: "rgba(200,169,110,0.18)",
                    fontSize: "3.5rem",
                    fontWeight: 900,
                    lineHeight: 1,
                    userSelect: "none",
                  }}
                >
                  {step.num}
                </div>
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 14,
                    marginBottom: 18,
                    background: "rgba(200,169,110,0.12)",
                    border: "1px solid rgba(200,169,110,0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <step.icon size={24} color="#c8a96e" />
                </div>
                <h3
                  style={{
                    color: "white",
                    fontWeight: 700,
                    fontSize: "1rem",
                    marginBottom: 10,
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    color: "rgba(255,255,255,0.55)",
                    fontSize: "0.85rem",
                    lineHeight: 1.7,
                  }}
                >
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== DOCUMENTS & DEADLINES ===== */}
      <section
        id="documents"
        style={{
          padding: "96px 0",
          background: "linear-gradient(135deg,#0a1628,#0f2347)",
        }}
      >
        <div className="container-custom">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
              gap: 24,
            }}
          >
            {/* Documents list */}
            <div
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 18,
                padding: "28px 26px",
                backdropFilter: "blur(12px)",
              }}
            >
              <h3
                style={{
                  color: "white",
                  fontWeight: 700,
                  fontSize: "1.05rem",
                  marginBottom: 22,
                }}
              >
                <FaFileAlt
                  size={16}
                  style={{ marginRight: 10, color: "#c8a96e" }}
                />{" "}
                {t.docs_title}
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {t.docs_list.map((doc: string, i: number) => (
                  <li
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 10,
                      padding: "10px 0",
                      borderBottom:
                        i < t.docs_list.length - 1
                          ? "1px solid rgba(255,255,255,0.08)"
                          : "none",
                    }}
                  >
                    <div
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: "#c8a96e",
                        flexShrink: 0,
                        marginTop: 7,
                      }}
                    />
                    <span
                      style={{
                        color: "rgba(255,255,255,0.75)",
                        fontSize: "0.87rem",
                        lineHeight: 1.5,
                      }}
                    >
                      {doc}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right column */}
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {/* Deadline */}
              <div
                style={{
                  background: "rgba(200,169,110,0.1)",
                  border: "1px solid rgba(200,169,110,0.25)",
                  borderRadius: 18,
                  padding: "22px 26px",
                  backdropFilter: "blur(12px)",
                }}
              >
                <p
                  style={{
                    color: "#c8a96e",
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    marginBottom: 8,
                  }}
                >
                  <FaCalendarAlt size={14} style={{ marginRight: 8 }} />{" "}
                  {t.docs_deadline}
                </p>
                <p
                  style={{
                    color: "white",
                    fontWeight: 600,
                    fontSize: "0.9rem",
                  }}
                >
                  {t.docs_deadline_val}
                </p>
              </div>

              {/* Exam */}
              <div
                style={{
                  background: "rgba(200,169,110,0.1)",
                  border: "1px solid rgba(200,169,110,0.25)",
                  borderRadius: 18,
                  padding: "22px 26px",
                  backdropFilter: "blur(12px)",
                }}
              >
                <p
                  style={{
                    color: "#c8a96e",
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    marginBottom: 8,
                  }}
                >
                  <FaPenNib size={14} style={{ marginRight: 8 }} />{" "}
                  {t.docs_exam}
                </p>
                <p
                  style={{
                    color: "white",
                    fontWeight: 600,
                    fontSize: "0.9rem",
                  }}
                >
                  {t.docs_exam_val}
                </p>
              </div>

              {/* CTA */}
              <a
                href="https://my.edu.uz"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  padding: "16px",
                  background: "linear-gradient(135deg,#c8a96e,#dfc08a)",
                  color: "#0f2347",
                  borderRadius: 14,
                  fontWeight: 700,
                  fontSize: "0.92rem",
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.transform =
                    "translateY(-2px)";
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                    "0 12px 32px rgba(200,169,110,0.35)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.transform =
                    "none";
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                    "none";
                }}
              >
                {APPLY_BTN[lang]}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== DYNAMIC RULES SECTION ===== */}
      {loadingRules ? (
        <section style={{ padding: "96px 0", background: "#f8f9fc" }}>
          <div
            className="container-custom"
            style={{ maxWidth: 800, margin: "0 auto" }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <PubBlock lines={2} height={20} />
              {[1, 2, 3, 4].map((i) => (
                <PubBlock key={i} lines={4} height={13} />
              ))}
            </div>
          </div>
        </section>
      ) : (
        !loadingRules &&
        rules.length > 0 && (
          <section
            style={{
              padding: "96px 0",
              background: "#f8f9fc",
            }}
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
                    ? "Qoidalar"
                    : lang === "ru"
                      ? "Правила"
                      : "Rules"}
                </div>
                <h2
                  className="section-title"
                  style={{
                    marginBottom: 12,
                    color: "#1a3a6e",
                    fontWeight: 800,
                    fontSize: "clamp(1.6rem,4vw,2.2rem)",
                    textAlign: "center",
                  }}
                >
                  {lang === "uz"
                    ? "Batafsil ma'lumot va qoidalar"
                    : lang === "ru"
                      ? "Подробная информация и правила"
                      : "Detailed Information & Rules"}
                </h2>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  gap: 24,
                  maxWidth: 800,
                  margin: "0 auto",
                }}
              >
                {rules.map((rule) => {
                  const title =
                    lang === "uz"
                      ? rule.titleUz
                      : lang === "ru"
                        ? rule.titleRu
                        : rule.titleEn;
                  const content =
                    lang === "uz"
                      ? rule.contentUz
                      : lang === "ru"
                        ? rule.contentRu
                        : rule.contentEn;
                  return (
                    <div
                      key={rule.id}
                      style={{
                        background: "white",
                        borderRadius: 18,
                        padding: "32px",
                        border: "1px solid rgba(26,58,110,0.07)",
                        boxShadow: "0 4px 18px rgba(26,58,110,0.05)",
                      }}
                    >
                      <h3
                        style={{
                          color: "#1a3a6e",
                          fontWeight: 700,
                          fontSize: "1.1rem",
                          marginBottom: 14,
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                        }}
                      >
                        <span
                          style={{
                            width: 28,
                            height: 28,
                            borderRadius: "50%",
                            background: "rgba(200,169,110,0.15)",
                            color: "#c8a96e",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "0.85rem",
                            fontWeight: 700,
                          }}
                        >
                          {rule.orderIndex + 1}
                        </span>
                        {title}
                      </h3>
                      <p
                        style={{
                          color: "#4b5563",
                          fontSize: "0.92rem",
                          lineHeight: 1.7,
                          margin: 0,
                          whiteSpace: "pre-line",
                        }}
                      >
                        {content}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )
      )}

      {/* ===== CONTACT CTA ===== */}
      <section style={{ padding: "72px 0", background: "#f8f9fc" }}>
        <div className="container-custom">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 32,
              flexWrap: "wrap",
            }}
          >
            <div>
              <h2
                style={{
                  color: "#1a3a6e",
                  fontWeight: 800,
                  fontSize: "1.4rem",
                  marginBottom: 8,
                }}
              >
                {lang === "uz"
                  ? "Savollaringiz bormi?"
                  : lang === "ru"
                    ? "Есть вопросы?"
                    : "Have questions?"}
              </h2>
              <p style={{ color: "#6b7280", fontSize: "0.97rem" }}>
                {lang === "uz"
                  ? "Litsey ma'muriyati bilan bog'laning"
                  : lang === "ru"
                    ? "Свяжитесь с администрацией лицея"
                    : "Contact the lyceum administration"}
              </p>
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a
                href="tel:+998712350369"
                className="btn-primary"
                style={{ textDecoration: "none" }}
              >
                <FaPhoneAlt size={12} style={{ marginRight: 8 }} /> +998 71 235-03-69
              </a>
              <a
                href="tel:+998932220611"
                className="btn-outline"
                style={{ color: "#1a3a6e", borderColor: "#1a3a6e", textDecoration: "none" }}
              >
                <FaPhoneAlt size={12} style={{ marginRight: 8 }} /> +998 93 222-06-11
              </a>
              <Link
                href="/contact"
                className="btn-outline"
                style={{ color: "#1a3a6e", borderColor: "#1a3a6e" }}
              >
                {t.nav_contact}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer lang={lang} />
    </main>
  );
}
