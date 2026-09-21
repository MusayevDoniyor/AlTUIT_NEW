"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { translations } from "@/lib/i18n";
import { Calendar, ArrowRight, Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getNews, getNewsMainImage } from "@/lib/db";
import { useAsyncData } from "@/lib/useAsyncData";
import { useLang } from "@/lib/useLang";
import { NewsCardSkeleton } from "@/components/Skeleton";

export default function NewsClient() {
  const [lang, setLang] = useLang();
  const [search, setSearch] = useState("");
  const { data: dbNews, loading } = useAsyncData(() => getNews(), []);

  const t = translations[lang];
  const activeNews = dbNews ?? [];
  const filteredNews = activeNews.filter((item) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    const title = (
      lang === "uz"
        ? item.titleUz
        : lang === "ru"
          ? item.titleRu || item.titleUz
          : item.titleEn || item.titleUz
    ).toLowerCase();
    const desc = (
      lang === "uz"
        ? item.descUz
        : lang === "ru"
          ? item.descRu || item.descUz
          : item.descEn || item.descUz
    ).toLowerCase();
    return title.includes(q) || desc.includes(q);
  });

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
          {/* Search bar */}
          <div
            style={{
              maxWidth: 480,
              margin: "0 auto 48px",
              position: "relative",
            }}
          >
            <Search
              size={18}
              color="#9ca3af"
              style={{
                position: "absolute",
                left: 16,
                top: "50%",
                transform: "translateY(-50%)",
                pointerEvents: "none",
              }}
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={
                lang === "uz"
                  ? "Yangiliklarni qidirish..."
                  : lang === "ru"
                    ? "Поиск новостей..."
                    : "Search news..."
              }
              style={{
                width: "100%",
                padding: "14px 16px 14px 44px",
                borderRadius: 50,
                border: "1.5px solid #e5e7eb",
                background: "white",
                fontSize: "0.95rem",
                outline: "none",
                boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
                transition: "border-color 0.2s, box-shadow 0.2s",
                boxSizing: "border-box",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#1a3a6e";
                e.currentTarget.style.boxShadow =
                  "0 4px 16px rgba(26,58,110,0.1)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "#e5e7eb";
                e.currentTarget.style.boxShadow =
                  "0 2px 10px rgba(0,0,0,0.04)";
              }}
            />
          </div>

          {loading ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))",
                gap: 28,
              }}
            >
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <NewsCardSkeleton key={i} />
              ))}
            </div>
          ) : filteredNews.length === 0 ? (
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
              {filteredNews.map((item) => {
                const title =
                  lang === "uz"
                    ? item.titleUz
                    : lang === "ru"
                      ? item.titleRu?.trim() || item.titleUz
                      : item.titleEn?.trim() || item.titleUz;
                const desc =
                  lang === "uz"
                    ? item.descUz
                    : lang === "ru"
                      ? item.descRu?.trim() || item.descUz
                      : item.descEn?.trim() || item.descUz;
                const tagStr =
                  typeof item.tag === "string"
                    ? item.tag
                    : item.tag?.[lang] || item.tag?.uz || item.tag?.en || "";

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
                    {(() => {
                      const cardImage = item.imageUrl || getNewsMainImage(item);
                      return cardImage ? (
                        <div
                          style={{
                            position: "relative",
                            width: "100%",
                            height: 180,
                            overflow: "hidden",
                          }}
                        >
                          <Image
                            src={cardImage}
                            alt={title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            style={{ objectFit: "cover" }}
                          />
                        </div>
                      ) : null;
                    })()}
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
