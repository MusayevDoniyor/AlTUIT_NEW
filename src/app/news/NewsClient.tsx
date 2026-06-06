"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { translations, type Lang } from "@/lib/i18n";
import { Calendar, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getNews } from "@/lib/db";

export default function NewsClient() {
  const [lang, setLang] = useState<Lang>("uz");
  const [dbNews, setDbNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const fetched = await getNews();
        if (fetched && fetched.length > 0) {
          setDbNews(fetched);
        }
      } catch (err) {
        console.error("Failed to fetch news list:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const t = translations[lang];
  const activeNews = dbNews;

  if (loading) {
    return (
      <main
        style={{
          minHeight: "100vh",
          background: "#0f1117",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            border: "3px solid rgba(200,169,110,0.2)",
            borderTopColor: "#c8a96e",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
          }}
        />
        <style>{`@keyframes spin { to { transform: rotate(360deg); }}`}</style>
      </main>
    );
  }

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
          {activeNews.length === 0 ? (
            <div
              style={{ textAlign: "center", padding: "48px 0", width: "100%" }}
            >
              <p style={{ color: "#6b7280", fontSize: "1.1rem" }}>
                {lang === "uz"
                  ? "Yangiliklar topilmadi"
                  : lang === "ru"
                    ? "Новости не найдены"
                    : "No news found"}
              </p>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))",
                gap: 28,
              }}
            >
              {activeNews.map((item) => {
                const title =
                  lang === "uz"
                    ? item.titleUz
                    : lang === "ru"
                      ? item.titleRu
                      : item.titleEn;
                const desc =
                  lang === "uz"
                    ? item.descUz
                    : lang === "ru"
                      ? item.descRu
                      : item.descEn;
                const tagStr =
                  typeof item.tag === "string"
                    ? item.tag
                    : item.tag?.[lang] || "";

                return (
                  <Link
                    key={item.id}
                    href={`/news/${item.id}`}
                    className="news-card"
                    style={{
                      cursor: "pointer",
                      textDecoration: "none",
                      display: "block",
                      overflow: "hidden",
                    }}
                  >
                    {/* Color strip */}
                    <div
                      style={{
                        height: 4,
                        background: `linear-gradient(90deg, ${item.color || "#1a3a6e"}, ${item.color || "#1a3a6e"}88)`,
                      }}
                    />
                    {item.imageUrl && (
                      <div
                        style={{
                          position: "relative",
                          width: "100%",
                          height: 180,
                          overflow: "hidden",
                        }}
                      >
                        <Image
                          src={item.imageUrl}
                          alt={title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                    )}
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
                            background: `${item.color || "#1a3a6e"}15`,
                            color: item.color || "#1a3a6e",
                            fontSize: "0.74rem",
                            fontWeight: 700,
                            padding: "4px 10px",
                            borderRadius: 50,
                            border: `1px solid ${item.color || "#1a3a6e"}30`,
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
                          color: item.color || "#1a3a6e",
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
          )}
        </div>
      </section>

      <Footer lang={lang} />
    </main>
  );
}
