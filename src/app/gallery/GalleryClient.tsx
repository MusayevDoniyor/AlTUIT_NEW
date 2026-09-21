"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useLang } from "@/lib/useLang";
import { getGallery, type GalleryItem } from "@/lib/db";
import { useAsyncData } from "@/lib/useAsyncData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { GalleryCardSkeleton } from "@/components/Skeleton";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

const CATEGORIES: Record<string, { label: string; value: string }[]> = {
  uz: [
    { label: "Hammasi", value: "" },
    { label: "Tadbirlar", value: "Tadbirlar" },
    { label: "O'quv jarayoni", value: "O'quv jarayoni" },
    { label: "Bino va sharoitlar", value: "Binolar" },
    { label: "Sport hayoti", value: "Sport" },
    { label: "Boshqa", value: "Boshqa" },
  ],
  ru: [
    { label: "Все", value: "" },
    { label: "Мероприятия", value: "Tadbirlar" },
    { label: "Учебный процесс", value: "O'quv jarayoni" },
    { label: "Здания и условия", value: "Binolar" },
    { label: "Спорт", value: "Sport" },
    { label: "Другое", value: "Boshqa" },
  ],
  en: [
    { label: "All", value: "" },
    { label: "Events", value: "Tadbirlar" },
    { label: "Academic Process", value: "O'quv jarayoni" },
    { label: "Campus & Facilities", value: "Binolar" },
    { label: "Sports", value: "Sport" },
    { label: "Other", value: "Boshqa" },
  ],
};

export default function GalleryClient() {
  const [lang, setLang] = useLang();
  const [category, setCategory] = useState("");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const { data: items, loading } = useAsyncData(() => getGallery(), []);
  const allItems = items ?? [];

  const filtered =
    category === "" ? allItems : allItems.filter((i) => i.category === category);

  useEffect(() => {
    if (selectedIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowLeft") {
        setSelectedIndex((prev) => (prev !== null ? (prev - 1 + filtered.length) % filtered.length : null));
      }
      if (e.key === "ArrowRight") {
        setSelectedIndex((prev) => (prev !== null ? (prev + 1) % filtered.length : null));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, filtered.length]);

  const activeItem = selectedIndex !== null ? filtered[selectedIndex] : null;

  return (
    <main>
      <Navbar lang={lang} onLangChange={setLang} />

      <section className="page-banner">
        <div className="container-custom" style={{ position: "relative" }}>
          <h1
            style={{
              color: "white",
              fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
              fontWeight: 900,
              marginBottom: 10,
            }}
          >
            {lang === "uz"
              ? "Galereya"
              : lang === "ru"
                ? "Галерея"
                : "Gallery"}
          </h1>
          <p style={{ color: "rgba(255,255,255,0.75)", maxWidth: 560, margin: 0 }}>
            {lang === "uz"
              ? "Litsey hayoti — tadbirlar, o'quv jarayoni va yutuqlar fotosuratlar bilan"
              : lang === "ru"
                ? "Жизнь лицея — события, учебный процесс и достижения в фотографиях"
                : "Lyceum life — events, learning process and achievements in photos"}
          </p>
        </div>
      </section>

      <section style={{ padding: "64px 0", background: "#f8f9fc" }}>
        <div className="container-custom">
          <div
            style={{
              display: "flex",
              gap: 10,
              flexWrap: "wrap",
              marginBottom: 40,
            }}
          >
            {(CATEGORIES[lang] || CATEGORIES.uz).map((c) => (
              <button
                key={c.value}
                onClick={() => setCategory(c.value)}
                style={{
                  padding: "9px 20px",
                  borderRadius: 50,
                  border:
                    category === c.value
                      ? "1px solid #c8a96e"
                      : "1px solid rgba(26,58,110,0.15)",
                  background:
                    category === c.value ? "linear-gradient(135deg,#c8a96e,#dfc08a)" : "white",
                  color: category === c.value ? "#0f2347" : "#1a3a6e",
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  transition: "all 0.2s",
                }}
              >
                {c.label}
              </button>
            ))}
          </div>

          {loading ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fill,minmax(300px,1fr))",
                gap: 24,
              }}
            >
              {Array.from({ length: 6 }).map((_, i) => (
                <GalleryCardSkeleton key={i} />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 20px" }}>
              <p style={{ color: "#6b7280", fontSize: "1rem", margin: 0 }}>
                {lang === "uz"
                  ? "Rasmlar mavjud emas"
                  : lang === "ru"
                    ? "Фотографии отсутствуют"
                    : "No photos available"}
              </p>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fill,minmax(300px,1fr))",
                gap: 24,
              }}
            >
              {filtered.map((item: GalleryItem, idx: number) => (
                <figure
                  key={item.id}
                  className="card-hover group"
                  style={{
                    margin: 0,
                    background: "white",
                    borderRadius: 18,
                    overflow: "hidden",
                    border: "1px solid rgba(26,58,110,0.08)",
                    boxShadow: "0 4px 18px rgba(26,58,110,0.06)",
                    cursor: "pointer",
                  }}
                  onClick={() => setSelectedIndex(idx)}
                >
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      aspectRatio: "4/3",
                      background: "rgba(26,58,110,0.04)",
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      src={item.imageUrl}
                      alt={captionFor(item, lang)}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{ objectFit: "cover", transition: "transform 0.4s ease" }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "rgba(15, 35, 71, 0.35)",
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
                          width: 44,
                          height: 44,
                          borderRadius: "50%",
                          background: "rgba(255,255,255,0.9)",
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
                  <figcaption
                    style={{
                      padding: "14px 18px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 12,
                    }}
                  >
                    <span
                      style={{
                        color: "#1a1f2e",
                        fontSize: "0.9rem",
                        fontWeight: 600,
                      }}
                    >
                      {captionFor(item, lang) || "—"}
                    </span>
                    {item.category && (
                      <span
                        style={{
                          flexShrink: 0,
                          background: "rgba(26,58,110,0.08)",
                          color: "#1a3a6e",
                          fontSize: "0.7rem",
                          fontWeight: 700,
                          padding: "3px 10px",
                          borderRadius: 50,
                        }}
                      >
                        {item.category}
                      </span>
                    )}
                  </figcaption>
                </figure>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {activeItem && selectedIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            backgroundColor: "rgba(10, 18, 38, 0.94)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            animation: "fadeIn 0.2s ease-out",
          }}
          onClick={() => setSelectedIndex(null)}
        >
          {/* Top Bar / Close Button */}
          <div
            style={{
              position: "absolute",
              top: 20,
              left: 24,
              right: 24,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              zIndex: 10,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                color: "rgba(255,255,255,0.7)",
                fontSize: "0.9rem",
                fontWeight: 600,
                background: "rgba(255,255,255,0.1)",
                padding: "6px 14px",
                borderRadius: 20,
              }}
            >
              {selectedIndex + 1} / {filtered.length}
            </div>

            <button
              onClick={() => setSelectedIndex(null)}
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
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.3)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.15)")}
            >
              <X size={24} />
            </button>
          </div>

          {/* Navigation Prev Button */}
          {filtered.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIndex((selectedIndex - 1 + filtered.length) % filtered.length);
              }}
              aria-label="Oldingi"
              style={{
                position: "absolute",
                left: 20,
                top: "50%",
                transform: "translateY(-50%)",
                background: "rgba(255,255,255,0.15)",
                border: "none",
                borderRadius: "50%",
                width: 48,
                height: 48,
                color: "white",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 10,
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.3)";
                e.currentTarget.style.transform = "translateY(-50%) scale(1.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.15)";
                e.currentTarget.style.transform = "translateY(-50%) scale(1)";
              }}
            >
              <ChevronLeft size={28} />
            </button>
          )}

          {/* Navigation Next Button */}
          {filtered.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIndex((selectedIndex + 1) % filtered.length);
              }}
              aria-label="Keyingi"
              style={{
                position: "absolute",
                right: 20,
                top: "50%",
                transform: "translateY(-50%)",
                background: "rgba(255,255,255,0.15)",
                border: "none",
                borderRadius: "50%",
                width: 48,
                height: 48,
                color: "white",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 10,
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.3)";
                e.currentTarget.style.transform = "translateY(-50%) scale(1.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.15)";
                e.currentTarget.style.transform = "translateY(-50%) scale(1)";
              }}
            >
              <ChevronRight size={28} />
            </button>
          )}

          {/* Image & Caption Container */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              maxWidth: "88vw",
              maxHeight: "82vh",
              zIndex: 5,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                position: "relative",
                width: "min(88vw, 1000px)",
                height: "min(70vh, 650px)",
              }}
            >
              <Image
                src={activeItem.imageUrl}
                alt={captionFor(activeItem, lang)}
                fill
                sizes="(max-width: 1200px) 90vw, 1000px"
                style={{ objectFit: "contain" }}
                priority
              />
            </div>

            {/* Caption & Category pill below */}
            <div
              style={{
                marginTop: 16,
                display: "flex",
                alignItems: "center",
                gap: 12,
                flexWrap: "wrap",
                justifyContent: "center",
                maxWidth: 800,
                textAlign: "center",
              }}
            >
              <span
                style={{
                  color: "white",
                  fontSize: "1.05rem",
                  fontWeight: 600,
                  textShadow: "0 2px 8px rgba(0,0,0,0.5)",
                }}
              >
                {captionFor(activeItem, lang)}
              </span>
              {activeItem.category && (
                <span
                  style={{
                    background: "rgba(200, 169, 110, 0.25)",
                    border: "1px solid rgba(200, 169, 110, 0.5)",
                    color: "#f5d799",
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    padding: "3px 12px",
                    borderRadius: 50,
                  }}
                >
                  {activeItem.category}
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer lang={lang} />
    </main>
  );
}

function captionFor(item: GalleryItem, lang: string): string {
  return lang === "uz"
    ? item.captionUz
    : lang === "ru"
      ? item.captionRu || item.captionUz
      : item.captionEn || item.captionUz;
}
