"use client";

import { useState } from "react";
import Image from "next/image";
import { useLang } from "@/lib/useLang";
import { getGallery, type GalleryItem } from "@/lib/db";
import { useAsyncData } from "@/lib/useAsyncData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PubCard } from "@/components/Skeleton";

const CATEGORIES = [
  { label: "Hammasi", value: "" },
  { label: "Tadbirlar", value: "Tadbirlar" },
  { label: "O'quv jarayoni", value: "O'quv jarayoni" },
  { label: "Binolar & Sharoitlar", value: "Binolar" },
  { label: "Sport hayoti", value: "Sport" },
  { label: "Boshqa", value: "Boshqa" },
];

export default function GalleryClient() {
  const [lang, setLang] = useLang();
  const [category, setCategory] = useState("");

  const { data: items, loading } = useAsyncData(() => getGallery(), []);
  const allItems = items ?? [];

  const filtered =
    category === "" ? allItems : allItems.filter((i) => i.category === category);

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
            {CATEGORIES.map((c) => (
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
                <div key={i} style={{ aspectRatio: "4/3" }}>
                  <PubCard />
                </div>
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
              {filtered.map((item: GalleryItem) => (
                <figure
                  key={item.id}
                  className="card-hover"
                  style={{
                    margin: 0,
                    background: "white",
                    borderRadius: 18,
                    overflow: "hidden",
                    border: "1px solid rgba(26,58,110,0.08)",
                    boxShadow: "0 4px 18px rgba(26,58,110,0.06)",
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      aspectRatio: "4/3",
                      background: "rgba(26,58,110,0.04)",
                      overflow: "hidden",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      window.open(item.imageUrl, "_blank", "noopener")
                    }
                  >
                    <Image
                      src={item.imageUrl}
                      alt={captionFor(item, lang)}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{ objectFit: "cover" }}
                    />
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
