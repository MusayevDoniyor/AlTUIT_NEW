"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { translations, type Lang } from "@/lib/i18n";
import { Calendar, ArrowLeft, Tag } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getNewsById } from "@/lib/db";

export default function NewsDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const unwrappedParams = React.use(params);
  const id = unwrappedParams.id;
  const [lang, setLang] = useState<Lang>("uz");
  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const fetched = await getNewsById(id);
        if (fetched) {
          setItem(fetched);
        }
      } catch (err) {
        console.error("Failed to load news item:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  const t = translations[lang];

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

  if (!item) notFound();

  const title: string =
    (lang === "uz"
      ? item.titleUz
      : lang === "ru"
        ? item.titleRu
        : item.titleEn) || "";
  const body: string =
    (lang === "uz" ? item.bodyUz : lang === "ru" ? item.bodyRu : item.bodyEn) ||
    "";
  const tagStr: string =
    typeof item.tag === "string" ? item.tag : item.tag?.[lang] || "";

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
        <div
          className="container-custom"
          style={{ position: "relative", zIndex: 1 }}
        >
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
            <Link
              href="/"
              style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}
            >
              {t.nav_home}
            </Link>
            <span>/</span>
            <Link
              href="/news"
              style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}
            >
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
                (e.currentTarget as HTMLAnchorElement).style.background =
                  "rgba(26,58,110,0.12)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background =
                  "rgba(26,58,110,0.06)";
              }}
            >
              <ArrowLeft size={16} />
              {lang === "uz"
                ? "Yangiliklarga qaytish"
                : lang === "ru"
                  ? "Вернуться к новостям"
                  : "Back to news"}
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
              <Link
                href="/news"
                className="btn-primary"
                style={{ textDecoration: "none" }}
              >
                <ArrowLeft size={16} />
                {lang === "uz"
                  ? "Barcha yangiliklar"
                  : lang === "ru"
                    ? "Все новости"
                    : "All news"}
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
