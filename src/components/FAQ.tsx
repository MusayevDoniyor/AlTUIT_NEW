"use client";

import { useState } from "react";
import { translations, type Lang } from "@/lib/i18n";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQProps {
  lang: Lang;
}

export default function FAQ({ lang }: FAQProps) {
  const t = translations[lang];
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" style={{ padding: "96px 0", background: "#f8f9fc" }}>
      <div className="container-custom">
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
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
              FAQ
            </div>
            <h2 className="section-title" style={{ marginBottom: 0 }}>
              {t.faq_title}
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {t.faq_items.map((item, i) => (
              <div
                key={i}
                className="faq-item"
                style={{
                  boxShadow:
                    open === i ? "0 8px 32px rgba(26,58,110,0.1)" : undefined,
                  borderColor: open === i ? "rgba(26,58,110,0.15)" : "#e5e7eb",
                }}
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  style={{
                    width: "100%",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "20px 24px",
                    textAlign: "left",
                  }}
                >
                  <span
                    style={{
                      fontWeight: 600,
                      fontSize: "0.97rem",
                      color: open === i ? "#1a3a6e" : "#1a1f2e",
                      flex: 1,
                      paddingRight: 16,
                    }}
                  >
                    {item.q}
                  </span>
                  <div
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 8,
                      flexShrink: 0,
                      background:
                        open === i
                          ? "linear-gradient(135deg,#1a3a6e,#2d5bb5)"
                          : "rgba(26,58,110,0.07)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.25s ease",
                    }}
                  >
                    {open === i ? (
                      <ChevronUp size={16} color="white" />
                    ) : (
                      <ChevronDown size={16} color="#1a3a6e" />
                    )}
                  </div>
                </button>
                {open === i && (
                  <div
                    style={{
                      padding: "0 24px 22px",
                      animation: "fadeInUp 0.3s ease",
                    }}
                  >
                    <div
                      style={{
                        height: 1,
                        background: "rgba(26,58,110,0.08)",
                        marginBottom: 16,
                      }}
                    />
                    <p
                      style={{
                        color: "#4b5563",
                        lineHeight: 1.8,
                        fontSize: "0.9rem",
                      }}
                    >
                      {item.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
