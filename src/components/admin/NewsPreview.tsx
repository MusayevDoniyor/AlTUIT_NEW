"use client";

import { useState } from "react";
import Image from "next/image";
import DOMPurify from "dompurify";
import { Calendar, Eye, Monitor, Smartphone } from "lucide-react";

interface ImageItem {
  url: string;
  order: number;
  isMain: boolean;
}

interface PreviewData {
  title: string;
  desc: string;
  body: string;
  tag: string;
  color: string;
  date: string;
  images: ImageItem[];
}

interface NewsPreviewProps {
  data: PreviewData;
  lang?: "uz" | "ru" | "en";
}

const C = {
  gold: "#c8a96e",
  goldLight: "rgba(200,169,110,0.15)",
  goldBorder: "rgba(200,169,110,0.25)",
  text: "white",
  textMuted: "rgba(255,255,255,0.45)",
  textDim: "rgba(255,255,255,0.25)",
  border: "rgba(255,255,255,0.07)",
  danger: "#ef4444",
  success: "#22c55e",
  surface: "rgba(255,255,255,0.04)",
};

export default function NewsPreview({ data }: NewsPreviewProps) {
  const [viewMode, setViewMode] = useState<"desktop" | "mobile">("desktop");
  const [previewTab, setPreviewTab] = useState<"card" | "full">("card");

  const mainImage = data.images.find((img) => img.isMain) || data.images[0];
  const otherImages = data.images.filter(
    (img) => !img.isMain && img.url !== mainImage?.url,
  );

  const containerWidth = viewMode === "desktop" ? "100%" : "375px";
  const scaleStyles =
    viewMode === "mobile"
      ? { transform: "scale(0.85)", transformOrigin: "top center" }
      : {};

  return (
    <div
      style={{
        border: `1px solid ${C.border}`,
        borderRadius: 14,
        overflow: "hidden",
        background: "#091224",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 8,
          padding: "12px 16px",
          borderBottom: `1px solid ${C.border}`,
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            color: C.textMuted,
            fontSize: "0.85rem",
          }}
        >
          <Eye size={16} />
          Ko&apos;rinish
        </div>

        <div style={{ display: "flex", gap: 4 }}>
          <button
            type="button"
            onClick={() => setViewMode("desktop")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              padding: "4px 10px",
              borderRadius: 6,
              border: `1px solid ${viewMode === "desktop" ? C.goldBorder : C.border}`,
              background: viewMode === "desktop" ? C.goldLight : "transparent",
              color: viewMode === "desktop" ? C.gold : C.textMuted,
              cursor: "pointer",
              fontSize: "0.72rem",
              fontFamily: "inherit",
            }}
          >
            <Monitor size={13} /> Desktop
          </button>
          <button
            type="button"
            onClick={() => setViewMode("mobile")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              padding: "4px 10px",
              borderRadius: 6,
              border: `1px solid ${viewMode === "mobile" ? C.goldBorder : C.border}`,
              background: viewMode === "mobile" ? C.goldLight : "transparent",
              color: viewMode === "mobile" ? C.gold : C.textMuted,
              cursor: "pointer",
              fontSize: "0.72rem",
              fontFamily: "inherit",
            }}
          >
            <Smartphone size={13} /> Mobil
          </button>
        </div>

        <div style={{ display: "flex", gap: 4 }}>
          <button
            type="button"
            onClick={() => setPreviewTab("card")}
            style={{
              padding: "4px 10px",
              borderRadius: 6,
              border: `1px solid ${previewTab === "card" ? C.goldBorder : C.border}`,
              background: previewTab === "card" ? C.goldLight : "transparent",
              color: previewTab === "card" ? C.gold : C.textMuted,
              cursor: "pointer",
              fontSize: "0.72rem",
              fontFamily: "inherit",
            }}
          >
            Card
          </button>
          <button
            type="button"
            onClick={() => setPreviewTab("full")}
            style={{
              padding: "4px 10px",
              borderRadius: 6,
              border: `1px solid ${previewTab === "full" ? C.goldBorder : C.border}`,
              background: previewTab === "full" ? C.goldLight : "transparent",
              color: previewTab === "full" ? C.gold : C.textMuted,
              cursor: "pointer",
              fontSize: "0.72rem",
              fontFamily: "inherit",
            }}
          >
            Full Post
          </button>
        </div>
      </div>

      {/* Preview Content */}
      <div
        style={{
          padding: 16,
          display: "flex",
          justifyContent: "center",
          ...scaleStyles,
        }}
      >
        <div style={{ width: containerWidth, maxWidth: "100%" }}>
          {previewTab === "card" ? (
            <CardPreview data={data} mainImage={mainImage} />
          ) : (
            <FullPreview
              data={data}
              mainImage={mainImage}
              otherImages={otherImages}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function CardPreview({
  data,
  mainImage,
}: {
  data: PreviewData;
  mainImage?: ImageItem;
}) {
  return (
    <div
      style={{
        background: "white",
        borderRadius: 14,
        overflow: "hidden",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
      }}
    >
      {/* Image */}
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "16/9",
          background: "#f0f0f0",
        }}
      >
        {mainImage?.url ? (
          <Image
            src={mainImage.url}
            alt=""
            fill
            sizes="(max-width: 600px) 100vw, 400px"
            style={{ objectFit: "cover" }}
          />
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              color: "#ccc",
              fontSize: "0.85rem",
            }}
          >
            Rasm yo&apos;q
          </div>
        )}
      </div>

      <div style={{ padding: 20 }}>
        {/* Tag + Date */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          {data.tag ? (
            <span
              style={{
                background: `${data.color || "#1a3a6e"}15`,
                color: data.color || "#1a3a6e",
                fontSize: "0.72rem",
                fontWeight: 700,
                padding: "3px 10px",
                borderRadius: 50,
              }}
            >
              {data.tag}
            </span>
          ) : (
            <span style={{ fontSize: "0.72rem", color: "#ccc" }}>[Teg]</span>
          )}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              color: "#9ca3af",
              fontSize: "0.75rem",
            }}
          >
            <Calendar size={12} />
            {data.date || "Sana"}
          </div>
        </div>

        {/* Title */}
        <h3
          style={{
            color: "#1a1f2e",
            fontWeight: 700,
            fontSize: "1rem",
            lineHeight: 1.45,
            margin: "0 0 10px",
          }}
        >
          {data.title || "Sarlavha"}
        </h3>

        {/* Description */}
        <p
          style={{
            color: "#6b7280",
            fontSize: "0.84rem",
            lineHeight: 1.6,
            margin: 0,
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {data.desc || "Qisqa tavsif..."}
        </p>
      </div>
    </div>
  );
}

function FullPreview({
  data,
  mainImage,
  otherImages,
}: {
  data: PreviewData;
  mainImage?: ImageItem;
  otherImages: ImageItem[];
}) {
  return (
    <div
      style={{
        background: "white",
        borderRadius: 14,
        overflow: "hidden",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
      }}
    >
      {/* Hero Image */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: 300,
          background: "#f0f0f0",
        }}
      >
        {mainImage?.url ? (
          <Image
            src={mainImage.url}
            alt=""
            fill
            sizes="(max-width: 860px) 100vw, 860px"
            style={{ objectFit: "cover" }}
          />
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              color: "#ccc",
            }}
          >
            Rasm yo&apos;q
          </div>
        )}
      </div>

      <div style={{ padding: 24 }}>
        {/* Title */}
        <h1
          style={{
            fontSize: "1.5rem",
            fontWeight: 800,
            color: "#1a1f2e",
            margin: "0 0 12px",
            lineHeight: 1.25,
          }}
        >
          {data.title || "Sarlavha"}
        </h1>

        {/* Meta */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 20,
            color: "#9ca3af",
            fontSize: "0.82rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Calendar size={13} />
            {data.date || "Sana"}
          </div>
          {data.tag && (
            <span
              style={{
                background: `${data.color || "#1a3a6e"}15`,
                color: data.color || "#1a3a6e",
                padding: "2px 8px",
                borderRadius: 50,
                fontSize: "0.72rem",
                fontWeight: 700,
              }}
            >
              {data.tag}
            </span>
          )}
        </div>

        <hr
          style={{
            border: "none",
            borderTop: "1px solid #e5e7eb",
            margin: "0 0 20px",
          }}
        />

        {/* Description */}
        {data.desc && (
          <p
            style={{
              fontSize: "1rem",
              color: "#4b5563",
              fontWeight: 500,
              lineHeight: 1.7,
              marginBottom: 20,
            }}
          >
            {data.desc}
          </p>
        )}

        {/* Body (rendered HTML) */}
        {data.body ? (
          <div
            style={{
              fontSize: "0.95rem",
              color: "#374151",
              lineHeight: 1.8,
            }}
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.body) }}
          />
        ) : (
          <p style={{ color: "#9ca3af", fontSize: "0.9rem" }}>
            Matn kiritilmagan
          </p>
        )}

        {/* Other images grid */}
        {otherImages.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                otherImages.length === 1 ? "1fr" : "repeat(2, 1fr)",
              gap: 12,
              marginTop: 24,
            }}
          >
            {otherImages.map((img, i) => (
              <div
                key={i}
                style={{
                  position: "relative",
                  aspectRatio: "16/9",
                  borderRadius: 10,
                  overflow: "hidden",
                  border: "1px solid #e5e7eb",
                }}
              >
                <Image
                  src={img.url}
                  alt=""
                  fill
                  sizes="(max-width: 600px) 100vw, 400px"
                  style={{ objectFit: "cover" }}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
