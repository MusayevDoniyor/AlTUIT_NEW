"use client";

import { useState } from "react";
import Link from "next/link";
import { translations, type Lang } from "@/lib/i18n";
import { useAsyncData } from "@/lib/useAsyncData";
import { FileText, Download, Calendar } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getDocuments, type DocumentItem } from "@/lib/db";
import { PubBlock } from "@/components/Skeleton";

export default function DocumentsClient() {
  const [lang, setLang] = useState<Lang>("uz");
  const { data: docsData, loading } = useAsyncData(() => getDocuments(), []);
  const docs = docsData ?? [];
  const t = translations[lang];

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return d.toLocaleDateString(lang === "uz" ? "uz-UZ" : lang === "ru" ? "ru-RU" : "en-US", {
      year: "numeric", month: "long", day: "numeric",
    });
  };

  return (
    <main>
      <Navbar lang={lang} onLangChange={setLang} />

      <div className="page-banner" style={{ paddingTop: 140 }}>
        <div className="container-custom" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16, fontSize: "0.8rem", color: "rgba(255,255,255,0.6)" }}>
            <Link href="/" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>
              {t.nav_home}
            </Link>
            <span>/</span>
            <span style={{ color: "#c8a96e" }}>
              {lang === "uz" ? "Hujjatlar" : lang === "ru" ? "Документы" : "Documents"}
            </span>
          </div>
          <h1 style={{ color: "white", fontWeight: 900, fontSize: "clamp(2rem,5vw,3rem)", marginBottom: 12 }}>
            {lang === "uz" ? "Hujjatlar" : lang === "ru" ? "Документы" : "Documents"}
          </h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1rem", maxWidth: 600 }}>
            {lang === "uz"
              ? "Mandat natijalari va boshqa rasmiy hujjatlarni yuklab oling"
              : lang === "ru"
                ? "Скачайте результаты мандата и другие официальные документы"
                : "Download mandate results and other official documents"}
          </p>
        </div>
      </div>

      <section style={{ padding: "80px 0", background: "#f8f9fc" }}>
        <div className="container-custom">
          {loading ? (
            <div style={{ maxWidth: 700, margin: "0 auto", display: "flex", flexDirection: "column", gap: 16 }}>
              <PubBlock lines={1} height={18} />
              <PubBlock lines={2} height={14} />
              <PubBlock lines={1} height={18} />
            </div>
          ) : docs.length === 0 ? (
            <div style={{ textAlign: "center", padding: "48px 0", color: "#6b7280" }}>
              <FileText size={48} style={{ opacity: 0.3, marginBottom: 16 }} />
              <p style={{ fontSize: "1rem" }}>
                {lang === "uz"
                  ? "Hujjatlar mavjud emas"
                  : lang === "ru"
                    ? "Документы отсутствуют"
                    : "No documents available"}
              </p>
            </div>
          ) : (
            <div style={{ maxWidth: 700, margin: "0 auto", display: "flex", flexDirection: "column", gap: 12 }}>
              {docs.map((doc) => {
                const title = lang === "uz" ? doc.titleUz : lang === "ru" ? doc.titleRu : doc.titleEn;
                return (
                  <a
                    key={doc.id}
                    href={doc.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex", alignItems: "center", gap: 16,
                      padding: "20px 24px",
                      background: "white", borderRadius: 14,
                      border: "1px solid rgba(26,58,110,0.07)",
                      boxShadow: "0 2px 12px rgba(26,58,110,0.04)",
                      textDecoration: "none",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 4px 20px rgba(26,58,110,0.1)";
                      (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 2px 12px rgba(26,58,110,0.04)";
                      (e.currentTarget as HTMLAnchorElement).style.transform = "none";
                    }}
                  >
                    <div style={{
                      width: 48, height: 48, borderRadius: 12,
                      background: "rgba(200,169,110,0.12)",
                      border: "1px solid rgba(200,169,110,0.25)",
                      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                    }}>
                      <FileText size={22} color="#c8a96e" />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ color: "#1a3a6e", fontWeight: 700, fontSize: "0.95rem", margin: 0 }}>
                        {title}
                      </p>
                      <p style={{ color: "#6b7280", fontSize: "0.8rem", margin: "4px 0 0", display: "flex", gap: 12 }}>
                        {doc.createdAt && <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                          <Calendar size={12} /> {formatDate(doc.createdAt)}
                        </span>}
                        <span>{formatSize(doc.fileSize)}</span>
                      </p>
                    </div>
                    <div style={{
                      width: 40, height: 40, borderRadius: "50%",
                      background: "rgba(200,169,110,0.1)",
                      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                    }}>
                      <Download size={16} color="#c8a96e" />
                    </div>
                  </a>
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
