"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import DOMPurify from "dompurify";
import { translations } from "@/lib/i18n";
import { useLang } from "@/lib/useLang";
import {
  Calendar,
  ArrowLeft,
  FileText,
  Download,
  Share2,
  Check,
  Copy,
  ImageIcon,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
} from "lucide-react";
import { FaTelegramPlane, FaFacebookF } from "react-icons/fa";
import { parseNewsImages, getNewsMainImage, type ImageItem } from "@/lib/db";
import { siteConfig } from "@/lib/config";
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
  images?: string;
  fileUrl?: string;
  fileName?: string;
  date: string;
}

const BANNER_TAG_COLORS: Record<
  string,
  { bg: string; text: string; border: string; dot: string }
> = {
  "#1a3a6e": {
    bg: "rgba(96, 165, 250, 0.18)",
    text: "#93c5fd",
    border: "rgba(147, 197, 253, 0.45)",
    dot: "#60a5fa",
  },
  "#1d7a55": {
    bg: "rgba(52, 211, 153, 0.18)",
    text: "#6ee7b7",
    border: "rgba(110, 231, 183, 0.45)",
    dot: "#34d399",
  },
  "#6032bf": {
    bg: "rgba(167, 139, 250, 0.18)",
    text: "#c4b5fd",
    border: "rgba(196, 181, 253, 0.45)",
    dot: "#a78bfa",
  },
  "#b91c1c": {
    bg: "rgba(248, 113, 113, 0.18)",
    text: "#fca5a5",
    border: "rgba(252, 165, 165, 0.45)",
    dot: "#f87171",
  },
  "#c8a96e": {
    bg: "rgba(200, 169, 110, 0.22)",
    text: "#dfc08a",
    border: "rgba(223, 192, 138, 0.5)",
    dot: "#c8a96e",
  },
  "#0891b2": {
    bg: "rgba(56, 189, 248, 0.18)",
    text: "#7dd3fc",
    border: "rgba(125, 211, 252, 0.45)",
    dot: "#38bdf8",
  },
};

function getBannerTagStyle(color?: string) {
  if (!color) {
    return {
      bg: "rgba(200, 169, 110, 0.22)",
      text: "#dfc08a",
      border: "rgba(223, 192, 138, 0.5)",
      dot: "#c8a96e",
    };
  }
  const key = color.toLowerCase().trim();
  if (BANNER_TAG_COLORS[key]) {
    return BANNER_TAG_COLORS[key];
  }
  return {
    bg: "rgba(255, 255, 255, 0.16)",
    text: "#ffffff",
    border: "rgba(255, 255, 255, 0.3)",
    dot: color,
  };
}

export default function NewsDetailClient({ news }: { news: NewsDetail }) {
  const [lang, setLang] = useLang();
  const [copied, setCopied] = useState(false);
  const canonicalUrl = `${siteConfig.url}/news/${news.id}`;

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

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      const url = window.location.href || canonicalUrl;
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const allImages: ImageItem[] = parseNewsImages(news.images);
  const mainImage = news.imageUrl || getNewsMainImage(news) || allImages[0]?.url;

  // Unified list of images for in-page Lightbox Carousel
  const galleryList: { url: string; caption: string }[] = (() => {
    if (allImages.length > 0) {
      return allImages.map((img, i) => ({
        url: img.url,
        caption: img.caption?.trim() || `${title} - ${i + 1}`,
      }));
    }
    if (mainImage) {
      return [{ url: mainImage, caption: title }];
    }
    return [];
  })();

  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  useEffect(() => {
    if (lightboxIdx === null) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxIdx(null);
      } else if (e.key === "ArrowLeft") {
        setLightboxIdx((prev) =>
          prev !== null ? (prev - 1 + galleryList.length) % galleryList.length : null,
        );
      } else if (e.key === "ArrowRight") {
        setLightboxIdx((prev) =>
          prev !== null ? (prev + 1) % galleryList.length : null,
        );
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxIdx, galleryList.length]);

  function safeSanitize(html: string): string {
    if (
      typeof window !== "undefined" &&
      DOMPurify &&
      typeof DOMPurify.sanitize === "function"
    ) {
      return DOMPurify.sanitize(html, {
        ADD_ATTR: ["target", "rel", "class"],
      });
    }
    // Server-side fallback: strip executable script/iframe tags and event handlers
    return html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
      .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, "")
      .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, "")
      .replace(/on\w+\s*=\s*(["']).*?\1/gi, "");
  }

  /** Parse body text — handles both HTML (from RichTextEditor) and plain text with Markdown images */
  function renderBody(text: string) {
    // Check if text contains HTML tags
    const isHtml = /<[a-z][\s\S]*>/i.test(text);

    if (isHtml) {
      return (
        <div
          className="news-article-body"
          dangerouslySetInnerHTML={{ __html: safeSanitize(text) }}
        />
      );
    }

    // Fallback: plain text with Markdown image and URL auto-linking support
    const urlRegex = /(https?:\/\/[^\s]+)/g;
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
      const subParts = part.split(urlRegex);
      return (
        <p key={i} style={{ marginBottom: 18, whiteSpace: "pre-wrap" }}>
          {subParts.map((sub, j) =>
            sub.match(/^https?:\/\//) ? (
              <a
                key={j}
                href={sub}
                target="_blank"
                rel="noopener noreferrer"
                className="editor-link"
              >
                {sub}
              </a>
            ) : (
              sub || (j === 0 && subParts.length === 1 ? "\u00A0" : "")
            ),
          )}
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
            {tagStr && (() => {
              const tagStyle = getBannerTagStyle(news.color);
              return (
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    background: tagStyle.bg,
                    color: tagStyle.text,
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    padding: "4px 12px",
                    borderRadius: 50,
                    border: `1px solid ${tagStyle.border}`,
                    backdropFilter: "blur(6px)",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                    letterSpacing: "0.2px",
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      backgroundColor: tagStyle.dot,
                      boxShadow: `0 0 6px ${tagStyle.dot}`,
                      display: "inline-block",
                    }}
                  />
                  {tagStr}
                </span>
              );
            })()}
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
          {mainImage && (
            <div
              role="button"
              tabIndex={0}
              aria-label={
                lang === "uz"
                  ? "Rasmni to'liq ko'rish"
                  : lang === "ru"
                    ? "Увеличить изображение"
                    : "View full image"
              }
              style={{
                position: "relative",
                width: "100%",
                height: 420,
                borderRadius: 18,
                overflow: "hidden",
                marginBottom: 32,
                boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                cursor: galleryList.length > 0 ? "pointer" : "default",
              }}
              onClick={() => {
                if (galleryList.length > 0) setLightboxIdx(0);
              }}
              onKeyDown={(e) => {
                if ((e.key === "Enter" || e.key === " ") && galleryList.length > 0) {
                  e.preventDefault();
                  setLightboxIdx(0);
                }
              }}
            >
              <Image
                src={mainImage}
                alt={title}
                fill
                sizes="(max-width: 860px) 100vw, 860px"
                style={{ objectFit: "cover", transition: "transform 0.4s ease" }}
                className={galleryList.length > 0 ? "hover:scale-105" : ""}
                priority
              />
              {galleryList.length > 0 && (
                <div
                  style={{
                    position: "absolute",
                    bottom: 16,
                    right: 16,
                    background: "rgba(10, 18, 38, 0.78)",
                    backdropFilter: "blur(6px)",
                    color: "white",
                    padding: "6px 14px",
                    borderRadius: 20,
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    pointerEvents: "none",
                  }}
                >
                  <ZoomIn size={15} />
                  <span>
                    {lang === "uz"
                      ? "Kattalashtirish"
                      : lang === "ru"
                        ? "Просмотр"
                        : "Zoom"}
                  </span>
                </div>
              )}
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

          {/* Photo Gallery (if multiple photos attached) */}
          {allImages.length > 1 && (
            <div style={{ marginTop: 36 }}>
              <h3
                style={{
                  fontSize: "1.15rem",
                  fontWeight: 700,
                  color: "#1a3a6e",
                  marginBottom: 16,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <ImageIcon size={20} color="#c8a96e" />
                {lang === "uz"
                  ? "Fotolavhalar"
                  : lang === "ru"
                    ? "Фотогалерея"
                    : "Photo Gallery"}
                <span
                  style={{
                    fontSize: "0.82rem",
                    fontWeight: 600,
                    color: "#6b7280",
                    marginLeft: 4,
                  }}
                >
                  ({allImages.length})
                </span>
              </h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                  gap: 16,
                }}
              >
                {allImages.map((img, idx) => (
                  <div
                    key={idx}
                    role="button"
                    tabIndex={0}
                    aria-label={`${img.caption || title} (${idx + 1})`}
                    style={{
                      position: "relative",
                      aspectRatio: "4/3",
                      borderRadius: 14,
                      overflow: "hidden",
                      boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
                      border: "1px solid rgba(26,58,110,0.08)",
                      cursor: "pointer",
                      background: "#e5e7eb",
                    }}
                    onClick={() => setLightboxIdx(idx)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setLightboxIdx(idx);
                      }
                    }}
                  >
                    <Image
                      src={img.url}
                      alt={img.caption || `${title} - ${idx + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 300px"
                      style={{ objectFit: "cover", transition: "transform 0.3s ease" }}
                      className="hover:scale-105"
                    />
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "rgba(15, 35, 71, 0.3)",
                        opacity: 0,
                        transition: "opacity 0.2s ease",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      className="hover:opacity-100"
                    >
                      <div
                        style={{
                          width: 42,
                          height: 42,
                          borderRadius: "50%",
                          background: "rgba(255,255,255,0.92)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#1a3a6e",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                        }}
                      >
                        <ZoomIn size={22} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
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

          {/* Share card */}
          <div
            style={{
              marginTop: 32,
              background: "white",
              borderRadius: 14,
              padding: "12px 20px",
              boxShadow: "0 2px 12px rgba(26,58,110,0.05)",
              border: "1px solid rgba(26,58,110,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Share2 size={16} color="#1a3a6e" />
              <span
                style={{
                  fontWeight: 700,
                  fontSize: "0.88rem",
                  color: "#1a3a6e",
                }}
              >
                {lang === "uz"
                  ? "Ulashish"
                  : lang === "ru"
                    ? "Поделиться"
                    : "Share"}
              </span>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                flexWrap: "wrap",
              }}
            >
              {/* Telegram direct share */}
              <a
                href={`https://t.me/share/url?url=${encodeURIComponent(canonicalUrl)}&text=${encodeURIComponent(title)}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
                title="Telegram orqali ulashish"
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: "#229ED9",
                  color: "white",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textDecoration: "none",
                  transition: "all 0.2s",
                  boxShadow: "0 2px 6px rgba(34,158,217,0.25)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.transform =
                    "translateY(-1px)";
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                    "0 4px 10px rgba(34,158,217,0.35)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.transform =
                    "none";
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                    "0 2px 6px rgba(34,158,217,0.25)";
                }}
              >
                <FaTelegramPlane size={16} />
              </a>

              {/* Facebook direct share */}
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(canonicalUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                title="Facebook orqali ulashish"
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: "#1877F2",
                  color: "white",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textDecoration: "none",
                  transition: "all 0.2s",
                  boxShadow: "0 2px 6px rgba(24,119,242,0.25)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.transform =
                    "translateY(-1px)";
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                    "0 4px 10px rgba(24,119,242,0.35)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.transform =
                    "none";
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                    "0 2px 6px rgba(24,119,242,0.25)";
                }}
              >
                <FaFacebookF size={15} />
              </a>

              {/* Copy link button */}
              <button
                onClick={handleCopyLink}
                aria-label="Havolani nusxalash"
                title="Havolani nusxalash"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  height: 36,
                  padding: "0 13px",
                  borderRadius: 10,
                  background: copied ? "#10b981" : "rgba(26,58,110,0.07)",
                  color: copied ? "white" : "#1a3a6e",
                  border: "none",
                  fontWeight: 600,
                  fontSize: "0.82rem",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  if (!copied) {
                    (e.currentTarget as HTMLButtonElement).style.background =
                      "rgba(26,58,110,0.12)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!copied) {
                    (e.currentTarget as HTMLButtonElement).style.background =
                      "rgba(26,58,110,0.07)";
                  }
                }}
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                <span>
                  {copied
                    ? lang === "uz"
                      ? "Nusxalandi!"
                      : lang === "ru"
                        ? "Скопировано!"
                        : "Copied!"
                    : lang === "uz"
                      ? "Nusxalash"
                      : lang === "ru"
                        ? "Скопировать"
                        : "Copy"}
                </span>
              </button>
            </div>
          </div>

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

      {/* Lightbox Carousel Modal */}
      {lightboxIdx !== null && galleryList[lightboxIdx] && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            backgroundColor: "rgba(10, 18, 38, 0.95)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "20px 24px",
            animation: "fadeIn 0.2s ease-out",
          }}
          onClick={() => setLightboxIdx(null)}
        >
          {/* Top Bar */}
          <div
            style={{
              width: "100%",
              maxWidth: 1200,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              zIndex: 10,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span
                style={{
                  color: "white",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  background: "rgba(255,255,255,0.12)",
                  padding: "6px 14px",
                  borderRadius: 20,
                  border: "1px solid rgba(255,255,255,0.18)",
                }}
              >
                {lightboxIdx + 1} / {galleryList.length}
              </span>
              <span
                style={{
                  color: "rgba(255,255,255,0.75)",
                  fontSize: "0.85rem",
                  maxWidth: 420,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
                className="hidden sm:inline-block"
              >
                {title}
              </span>
            </div>

            <button
              onClick={() => setLightboxIdx(null)}
              aria-label="Yopish"
              style={{
                background: "rgba(255,255,255,0.15)",
                border: "none",
                borderRadius: "50%",
                width: 44,
                height: 44,
                color: "white",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(255,255,255,0.3)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "rgba(255,255,255,0.15)")
              }
            >
              <X size={24} />
            </button>
          </div>

          {/* Center Content: Navigation arrows + Image */}
          <div
            style={{
              position: "relative",
              width: "100%",
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "12px 0",
              minHeight: 0,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Prev button */}
            {galleryList.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIdx(
                    (lightboxIdx - 1 + galleryList.length) % galleryList.length,
                  );
                }}
                aria-label="Oldingi rasm"
                style={{
                  position: "absolute",
                  left: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "rgba(255,255,255,0.18)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: "50%",
                  width: 52,
                  height: 52,
                  color: "white",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 20,
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.35)";
                  e.currentTarget.style.transform = "translateY(-50%) scale(1.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.18)";
                  e.currentTarget.style.transform = "translateY(-50%) scale(1)";
                }}
              >
                <ChevronLeft size={32} />
              </button>
            )}

            {/* Active image */}
            <div
              style={{
                position: "relative",
                width: "min(92vw, 1100px)",
                height: "min(68vh, 620px)",
              }}
            >
              <Image
                src={galleryList[lightboxIdx].url}
                alt={galleryList[lightboxIdx].caption || `${title} - ${lightboxIdx + 1}`}
                fill
                sizes="(max-width: 1200px) 95vw, 1100px"
                style={{ objectFit: "contain" }}
                priority
              />
            </div>

            {/* Next button */}
            {galleryList.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIdx((lightboxIdx + 1) % galleryList.length);
                }}
                aria-label="Keyingi rasm"
                style={{
                  position: "absolute",
                  right: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "rgba(255,255,255,0.18)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: "50%",
                  width: 52,
                  height: 52,
                  color: "white",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 20,
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.35)";
                  e.currentTarget.style.transform = "translateY(-50%) scale(1.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.18)";
                  e.currentTarget.style.transform = "translateY(-50%) scale(1)";
                }}
              >
                <ChevronRight size={32} />
              </button>
            )}
          </div>

          {/* Bottom Bar: Caption & Thumbnail Carousel strip */}
          <div
            style={{
              width: "100%",
              maxWidth: 900,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 12,
              zIndex: 10,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Caption */}
            {galleryList[lightboxIdx].caption && (
              <p
                style={{
                  color: "rgba(255,255,255,0.92)",
                  fontSize: "0.95rem",
                  fontWeight: 500,
                  margin: 0,
                  textAlign: "center",
                  background: "rgba(0,0,0,0.35)",
                  padding: "6px 18px",
                  borderRadius: 20,
                  maxWidth: "90%",
                }}
              >
                {galleryList[lightboxIdx].caption}
              </p>
            )}

            {/* Thumbnail Carousel strip */}
            {galleryList.length > 1 && (
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  overflowX: "auto",
                  maxWidth: "100%",
                  padding: "6px 4px",
                }}
              >
                {galleryList.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setLightboxIdx(i)}
                    aria-label={`Rasm ${i + 1}`}
                    style={{
                      position: "relative",
                      width: 58,
                      height: 42,
                      borderRadius: 8,
                      overflow: "hidden",
                      flexShrink: 0,
                      border:
                        lightboxIdx === i
                          ? "2px solid #c8a96e"
                          : "2px solid transparent",
                      opacity: lightboxIdx === i ? 1 : 0.5,
                      cursor: "pointer",
                      padding: 0,
                      background: "transparent",
                      transition: "all 0.2s",
                    }}
                  >
                    <Image
                      src={img.url}
                      alt={`Thumbnail ${i + 1}`}
                      fill
                      sizes="60px"
                      style={{ objectFit: "cover" }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <Footer lang={lang} />
    </main>
  );
}
