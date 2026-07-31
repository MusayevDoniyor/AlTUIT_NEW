"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import DOMPurify from "dompurify";
import { translations } from "@/lib/i18n";
import { useLang } from "@/lib/useLang";
import { Calendar, ArrowLeft, FileText, Download } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface NewsDetail {
  id: string;
  titleUz: string;
  titleRu?: string;
  titleEn?: string;
  bodyUz: string;
  bodyRu?: string;
  bodyEn?: string;
  descUz: string;
  descRu?: string;
  descEn?: string;
  tag: { uz: string; ru: string; en: string } | string;
  color: string;
  imageUrl?: string;
  fileUrl?: string;
  fileName?: string;
  date: string;
}

export default function NewsDetailClient({ news }: { news: NewsDetail }) {
  const [lang, setLang] = useLang();

  const t = translations[lang];

  const title =
    lang === "uz"
      ? news.titleUz
      : lang === "ru"
        ? news.titleRu?.trim() || news.titleUz
        : news.titleEn?.trim() || news.titleUz;
  const body =
    lang === "uz"
      ? news.bodyUz
      : lang === "ru"
        ? news.bodyRu?.trim() || news.bodyUz
        : news.bodyEn?.trim() || news.bodyUz;
  const desc =
    lang === "uz"
      ? news.descUz
      : lang === "ru"
        ? news.descRu?.trim() || news.descUz
        : news.descEn?.trim() || news.descUz;
  const tagStr =
    typeof news.tag === "string"
      ? news.tag
      : news.tag?.[lang] || news.tag?.uz || news.tag?.en || "";

  /** Parse body text — handles both HTML (from RichTextEditor) and plain text with Markdown images */
  function renderBody(text: string) {
    // Check if text contains HTML tags
    const isHtml = /<[a-z][\s\S]*>/i.test(text);

    if (isHtml) {
      return (
        <div
          style={{
            fontSize: "1rem",
            color: "#374151",
            lineHeight: 1.85,
          }}
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(text) }}
        />
      );
    }

    // Fallback: plain text with Markdown image support ![alt](url)
    const parts = text.split(/(!\[.*?\]\(.*?\))/g);
    return parts.map((part, i) => {
      const imgMatch = part.match(/^!\[(.*?)\]\((.*?)\)$/);
      if (imgMatch) {
        const alt = imgMatch[1];
        const url = imgMatch[2];
        return (
          <div
            key={i}
            style={{
              position: "relative",
              width: "100%",
              height: 380,
              borderRadius: 14,
              overflow: "hidden",
              margin: "24px 0",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            }}
          >
            <Image
              src={url}
              alt={alt}
              fill
              sizes="(max-width: 860px) 100vw, 860px"
              style={{ objectFit: "cover" }}
            />
          </div>
        );
      }
      return (
        <p key={i} style={{ marginBottom: 18, whiteSpace: "pre-wrap" }}>
          {part || "\u00A0"}
        </p>
      );
    });
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
            <Link
              href="/news"
              style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}
            >
              {t.nav_news}
            </Link>
            <span>/</span>
            <span
              style={{
                color: "#c8a96e",
                maxWidth: 400,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {title}
            </span>
          </div>
          <h1
            style={{
              color: "white",
              fontWeight: 900,
              fontSize: "clamp(1.5rem,4vw,2.5rem)",
              marginBottom: 12,
              lineHeight: 1.2,
            }}
          >
            {title}
          </h1>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              color: "rgba(255,255,255,0.6)",
              fontSize: "0.85rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <Calendar size={14} />
              {news.date}
            </div>
            {tagStr && (
              <span
                style={{
                  background: `${news.color || "#1a3a6e"}30`,
                  color: news.color || "#c8a96e",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  padding: "3px 10px",
                  borderRadius: 50,
                  border: `1px solid ${news.color || "#1a3a6e"}40`,
                }}
              >
                {tagStr}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ===== ARTICLE CONTENT ===== */}
      <section
        style={{ padding: "64px 0", background: "#f8f9fc", minHeight: "60vh" }}
      >
        <div className="container-custom" style={{ maxWidth: 860 }}>
          {/* Back button */}
          <Link
            href="/news"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              color: "#1a3a6e",
              fontWeight: 600,
              fontSize: "0.9rem",
              textDecoration: "none",
              marginBottom: 32,
              transition: "gap 0.2s",
            }}
          >
            <ArrowLeft size={16} />
            {lang === "uz"
              ? "Yangiliklarga qaytish"
              : lang === "ru"
                ? "Вернуться к новостям"
                : "Back to news"}
          </Link>

          {/* Featured image */}
          {news.imageUrl && (
            <div
              style={{
                position: "relative",
                width: "100%",
                height: 420,
                borderRadius: 18,
                overflow: "hidden",
                marginBottom: 32,
                boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
              }}
            >
              <Image
                src={news.imageUrl}
                alt={title}
                fill
                sizes="(max-width: 860px) 100vw, 860px"
                style={{ objectFit: "cover" }}
                priority
              />
            </div>
          )}

          {/* Description */}
          <p
            style={{
              color: "#4b5563",
              fontSize: "1.1rem",
              lineHeight: 1.75,
              marginBottom: 32,
              fontWeight: 500,
            }}
          >
            {desc}
          </p>

          {/* Body */}
          {body && (
            <div
              style={{
                background: "white",
                borderRadius: 18,
                padding: "40px",
                boxShadow: "0 4px 20px rgba(26,58,110,0.06)",
                border: "1px solid rgba(26,58,110,0.07)",
                fontSize: "1rem",
                color: "#374151",
                lineHeight: 1.85,
              }}
            >
              {renderBody(body)}
            </div>
          )}

          {/* File download */}
          {news.fileUrl && (
            <div
              style={{
                marginTop: 32,
                background: "white",
                borderRadius: 18,
                padding: "24px 32px",
                boxShadow: "0 4px 20px rgba(26,58,110,0.06)",
                border: "1px solid rgba(26,58,110,0.07)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 16,
                flexWrap: "wrap",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: "rgba(200,169,110,0.12)",
                    border: "1px solid rgba(200,169,110,0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <FileText size={22} color="#c8a96e" />
                </div>
                <div>
                  <p style={{ color: "#1a3a6e", fontWeight: 700, fontSize: "0.9rem", margin: 0 }}>
                    {news.fileName || (lang === "uz" ? "Yuklab olish" : lang === "ru" ? "Скачать" : "Download")}
                  </p>
                  <p style={{ color: "#6b7280", fontSize: "0.8rem", margin: "4px 0 0" }}>
                    {lang === "uz" ? "PDF faylni yuklab olish" : lang === "ru" ? "Скачать PDF файл" : "Download PDF file"}
                  </p>
                </div>
              </div>
              <a
                href={news.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "12px 24px",
                  background: "linear-gradient(135deg,#c8a96e,#dfc08a)",
                  color: "#0f2347",
                  borderRadius: 10,
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 24px rgba(200,169,110,0.35)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.transform = "none";
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
                }}
              >
                <Download size={16} />
                {lang === "uz" ? "Yuklab olish" : lang === "ru" ? "Скачать" : "Download"}
              </a>
            </div>
          )}

          {/* Bottom navigation */}
          <div
            style={{
              marginTop: 40,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Link
              href="/news"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "14px 28px",
                background: "linear-gradient(135deg,#1a3a6e,#2d5bb5)",
                color: "white",
                borderRadius: 12,
                fontWeight: 700,
                fontSize: "0.95rem",
                textDecoration: "none",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.transform =
                  "translateY(-2px)";
                (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                  "0 8px 24px rgba(26,58,110,0.3)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.transform = "none";
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
              }}
            >
              <ArrowLeft size={16} />
              {lang === "uz"
                ? "Barcha yangiliklar"
                : lang === "ru"
                  ? "Все новости"
                  : "All news"}
            </Link>
          </div>
        </div>
      </section>

      <Footer lang={lang} />
    </main>
  );
}
