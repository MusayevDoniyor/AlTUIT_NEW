"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLang } from "@/lib/useLang";
import { ArrowLeft, Home } from "lucide-react";

const text = {
  uz: {
    title: "Sahifa topilmadi",
    desc: "Siz qidirayotgan sahifa o'chirilgan, nomi o'zgartirilgan yoki vaqtincha mavjud emas.",
    btnHome: "Bosh sahifa",
    btnBack: "Ortga qaytish",
  },
  ru: {
    title: "Страница не найдена",
    desc: "Запрашиваемая страница перемещена, удалена или временно недоступна.",
    btnHome: "Главная страница",
    btnBack: "Назад",
  },
  en: {
    title: "Page Not Found",
    desc: "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.",
    btnHome: "Homepage",
    btnBack: "Go Back",
  },
};

export default function NotFoundClient() {
  const [lang, setLang] = useLang();
  const router = useRouter();
  const t = text[lang] || text.uz;

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "#ffffff",
        color: "#0f172a",
      }}
    >
      <Navbar lang={lang} onLangChange={setLang} />

      <main
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 140,
          paddingBottom: 90,
          paddingLeft: 20,
          paddingRight: 20,
        }}
      >
        <div
          style={{
            maxWidth: 520,
            width: "100%",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Litsey Logo */}
          <Link
            href="/"
            style={{
              display: "inline-block",
              marginBottom: 16,
              transition: "transform 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.04)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <Image
              src="/logo.png"
              alt="TATU Akademik Litseyi Logo"
              width={76}
              height={76}
              priority
              style={{ objectFit: "contain" }}
            />
          </Link>

          {/* Minimalist Crisp 404 */}
          <div
            style={{
              fontSize: "clamp(4.8rem, 11vw, 6.8rem)",
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: "-0.04em",
              color: "#002147",
              marginBottom: 12,
              userSelect: "none",
            }}
          >
            404
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: "clamp(1.45rem, 3vw, 1.85rem)",
              fontWeight: 700,
              color: "#0f172a",
              letterSpacing: "-0.02em",
              margin: "0 0 10px 0",
              lineHeight: 1.25,
            }}
          >
            {t.title}
          </h1>

          {/* Description */}
          <p
            style={{
              fontSize: "0.95rem",
              color: "#64748b",
              lineHeight: 1.6,
              margin: "0 0 28px 0",
              maxWidth: 440,
            }}
          >
            {t.desc}
          </p>

          {/* Two Clean Buttons: Back & Main */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              flexWrap: "wrap",
              width: "100%",
            }}
          >
            {/* Back Button */}
            <button
              type="button"
              onClick={handleBack}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                background: "#ffffff",
                color: "#1e293b",
                border: "1px solid #cbd5e1",
                borderRadius: 8,
                padding: "10px 20px",
                fontSize: "0.88rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.18s ease-out",
                boxShadow: "0 1px 2px rgba(0, 0, 0, 0.04)",
                fontFamily: "inherit",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#f8fafc";
                e.currentTarget.style.borderColor = "#94a3b8";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#ffffff";
                e.currentTarget.style.borderColor = "#cbd5e1";
              }}
            >
              <ArrowLeft size={16} strokeWidth={2} />
              <span>{t.btnBack}</span>
            </button>

            {/* Main (Home) Button */}
            <Link
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                background: "#002147",
                color: "#ffffff",
                border: "1px solid #002147",
                borderRadius: 8,
                padding: "10px 22px",
                fontSize: "0.88rem",
                fontWeight: 600,
                textDecoration: "none",
                transition: "all 0.18s ease-out",
                boxShadow: "0 2px 6px rgba(0, 33, 71, 0.18)",
                fontFamily: "inherit",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#073060";
                e.currentTarget.style.borderColor = "#073060";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#002147";
                e.currentTarget.style.borderColor = "#002147";
              }}
            >
              <Home size={16} strokeWidth={2} />
              <span>{t.btnHome}</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer lang={lang} />
    </div>
  );
}
