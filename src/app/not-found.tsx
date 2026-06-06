import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 — Sahifa topilmadi",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #0a0d14 0%, #0f1117 50%, #141620 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        padding: "20px",
      }}
    >
      <div style={{ textAlign: "center", maxWidth: 480 }}>
        <div
          style={{
            fontSize: "6rem",
            fontWeight: 900,
            color: "rgba(200,169,110,0.15)",
            lineHeight: 1,
            marginBottom: 8,
            userSelect: "none",
          }}
        >
          404
        </div>
        <h1
          style={{
            color: "white",
            fontWeight: 800,
            fontSize: "1.8rem",
            margin: "0 0 12px",
          }}
        >
          Sahifa topilmadi
        </h1>
        <p
          style={{
            color: "rgba(255,255,255,0.5)",
            fontSize: "0.95rem",
            lineHeight: 1.6,
            marginBottom: 32,
          }}
        >
          Kechirasiz, siz qidirayotgan sahifa mavjud emas yoki o'chirilgan
          bo'lishi mumkin.
        </p>
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "14px 32px",
            background: "linear-gradient(135deg, #c8a96e, #dfc08a)",
            color: "#0f2347",
            borderRadius: 12,
            fontWeight: 700,
            fontSize: "0.95rem",
            textDecoration: "none",
            transition: "all 0.3s ease",
          }}
        >
          ← Bosh sahifaga qaytish
        </Link>
      </div>
    </div>
  );
}
