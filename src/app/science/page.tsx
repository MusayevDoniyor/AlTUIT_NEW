"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { translations, type Lang } from "@/lib/i18n";
import { Trophy } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  getAchievements,
  getStats,
  type AchievementItem,
  type StatItem,
} from "@/lib/db";



export default function SciencePage() {
  const [lang, setLang] = useState<Lang>("uz");
  const [achievements, setAchievements] = useState<AchievementItem[]>([]);
  const [stats, setStats] = useState<StatItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [achData, statsData] = await Promise.all([
          getAchievements(),
          getStats(),
        ]);
        setAchievements(achData);
        setStats(statsData);
      } catch (err) {
        console.error("Failed to load science page data:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const t = translations[lang];

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
              style={{
                color: "rgba(255,255,255,0.6)",
                textDecoration: "none",
              }}
            >
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
            {lang === "uz"
              ? "Yutuqlar"
              : lang === "ru"
                ? "Достижения"
                : "Achievements"}
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.7)",
              fontSize: "1rem",
              maxWidth: 600,
            }}
          >
            {t.ach_subtitle}
          </p>
        </div>
      </div>

      {/* ===== ACHIEVEMENTS ===== */}
      <section style={{ padding: "96px 0", background: "white" }}>
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
                ? "Yutuqlar"
                : lang === "ru"
                  ? "Достижения"
                  : "Achievements"}
            </div>
            <h2 className="section-title" style={{ marginBottom: 12 }}>
              {t.ach_title}
            </h2>
            <p
              style={{
                color: "#6b7280",
                fontSize: "0.97rem",
                lineHeight: 1.6,
              }}
            >
              {t.ach_subtitle}
            </p>
          </div>

          {loading ? (
            <div style={{ textAlign: "center", padding: "48px 0" }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  border: "3px solid rgba(26,58,110,0.15)",
                  borderTopColor: "#1a3a6e",
                  borderRadius: "50%",
                  animation: "spin 0.8s linear infinite",
                  margin: "0 auto",
                }}
              />
              <style>{`@keyframes spin { to { transform: rotate(360deg); }}`}</style>
            </div>
          ) : achievements.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "48px 24px",
                background: "#f8f9fc",
                borderRadius: 18,
                border: "1px solid rgba(26,58,110,0.07)",
              }}
            >
              <Trophy
                size={36}
                color="#c8a96e"
                style={{ marginBottom: 12, opacity: 0.5 }}
              />
              <p style={{ color: "#6b7280", fontSize: "1rem", margin: 0 }}>
                {lang === "uz"
                  ? "Yutuqlar hozircha mavjud emas"
                  : lang === "ru"
                    ? "Достижения пока отсутствуют"
                    : "No achievements available yet"}
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
              {(achievements as any[]).map((a, i) => {
                const title =
                  lang === "uz"
                    ? a.titleUz
                    : lang === "ru"
                      ? a.titleRu
                      : a.titleEn;
                const desc =
                  lang === "uz"
                    ? a.descUz
                    : lang === "ru"
                      ? a.descRu
                      : a.descEn;
                const color = a.color || "#c8a96e";
                return (
                  <div
                    key={a.id || i}
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
                          background: `${color}22`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          overflow: "hidden",
                        }}
                      >
                        {a.imageUrl ? (
                          <Image
                            src={a.imageUrl}
                            alt={title}
                            width={50}
                            height={50}
                            style={{ objectFit: "cover" }}
                          />
                        ) : (
                          <Trophy size={24} color={color} />
                        )}
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
                    <p
                      style={{
                        color: "#6b7280",
                        fontSize: "0.83rem",
                        lineHeight: 1.65,
                      }}
                    >
                      {desc}
                    </p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Stats summary — from DB or hidden when empty */}
          {!loading && stats.length > 0 && (
            <div
              style={{
                marginTop: 64,
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
                gap: 24,
              }}
            >
              {(stats as any[]).map((s, i) => {
                const label =
                  lang === "uz"
                    ? s.labelUz
                    : lang === "ru"
                      ? s.labelRu
                      : s.labelEn;
                return (
                  <div
                    key={s.id || i}
                    style={{
                      background: "linear-gradient(135deg,#0f2347,#1a3a6e)",
                      borderRadius: 16,
                      padding: "28px 20px",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        color: "#c8a96e",
                        fontSize: "2.5rem",
                        fontWeight: 900,
                        lineHeight: 1,
                        marginBottom: 8,
                      }}
                    >
                      {s.value}
                      {s.suffix}
                    </div>
                    <div
                      style={{
                        color: "rgba(255,255,255,0.7)",
                        fontSize: "0.87rem",
                      }}
                    >
                      {label}
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
