"use client";

import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLang } from "@/lib/useLang";
import { siteConfig } from "@/lib/config";
import {
  Home,
  ArrowLeft,
  GraduationCap,
  Compass,
  Trophy,
  BookOpen,
  PhoneCall,
  Mail,
  HelpCircle,
  ArrowRight,
} from "lucide-react";

const content = {
  uz: {
    badge: "Xatolik 404",
    title: "Sahifa topilmadi",
    desc: "Kechirasiz, siz qidirayotgan sahifa mavjud emas, ko'chirilgan yoki manzili noto'g'ri kiritilgan bo'lishi mumkin.",
    btnHome: "Bosh sahifaga qaytish",
    btnContact: "Bog'lanish",
    quickHeading: "Kerakli bo'limga o'ting",
    cardAboutTitle: "Litsey haqida",
    cardAboutDesc: "Tarix, rahbariyat, pedagoglar va litsey faoliyati",
    cardAdmissionTitle: "Qabul 2026",
    cardAdmissionDesc: "Yo'nalishlar, qabul qoidalari va talab qilinadigan hujjatlar",
    cardScienceTitle: "Ilmiy faoliyat",
    cardScienceDesc: "Olimpiada sovrindorlari va o'quvchilar yutuqlari",
    cardNewsTitle: "Yangiliklar",
    cardNewsDesc: "Litseyning so'nggi yangiliklari va muhim e'lonlari",
    helpTitle: "Yordam kerakmi?",
    helpDesc: "Qo'shimcha savollaringiz bo'lsa, litsey ma'muriyati bilan bog'lanishingiz mumkin:",
  },
  ru: {
    badge: "Ошибка 404",
    title: "Страница не найдена",
    desc: "Извините, запрашиваемая страница не существует, была перемещена или адрес введен с ошибкой.",
    btnHome: "Вернуться на главную",
    btnContact: "Связаться с нами",
    quickHeading: "Перейти в нужный раздел",
    cardAboutTitle: "О лицее",
    cardAboutDesc: "История, руководство, преподаватели и жизнь лицея",
    cardAdmissionTitle: "Поступление 2026",
    cardAdmissionDesc: "Направления, правила приема и необходимые документы",
    cardScienceTitle: "Наука и достижения",
    cardScienceDesc: "Призеры олимпиад и академические успехи учащихся",
    cardNewsTitle: "Новости",
    cardNewsDesc: "Актуальные события, новости и объявления лицея",
    helpTitle: "Нужна помощь?",
    helpDesc: "По любым вопросам вы можете обратиться к администрации лицея:",
  },
  en: {
    badge: "Error 404",
    title: "Page Not Found",
    desc: "Sorry, the page you are looking for does not exist, has been moved, or the URL was entered incorrectly.",
    btnHome: "Back to Homepage",
    btnContact: "Contact Us",
    quickHeading: "Explore Helpful Sections",
    cardAboutTitle: "About Lyceum",
    cardAboutDesc: "History, leadership, faculty and academic environment",
    cardAdmissionTitle: "Admissions 2026",
    cardAdmissionDesc: "Academic tracks, admission rules and required documents",
    cardScienceTitle: "Science & Achievements",
    cardScienceDesc: "Olympiad winners and student achievements",
    cardNewsTitle: "News & Announcements",
    cardNewsDesc: "Latest updates, upcoming events and announcements",
    helpTitle: "Need Assistance?",
    helpDesc: "If you have any questions, feel free to contact our administrative office:",
  },
};

export default function NotFoundClient() {
  const [lang, setLang] = useLang();
  const c = content[lang] || content.uz;

  const quickLinks = [
    {
      title: c.cardAboutTitle,
      desc: c.cardAboutDesc,
      href: "/about",
      icon: GraduationCap,
      color: "#c8a96e",
    },
    {
      title: c.cardAdmissionTitle,
      desc: c.cardAdmissionDesc,
      href: "/admission",
      icon: Compass,
      color: "#38bdf8",
    },
    {
      title: c.cardScienceTitle,
      desc: c.cardScienceDesc,
      href: "/science",
      icon: Trophy,
      color: "#4ade80",
    },
    {
      title: c.cardNewsTitle,
      desc: c.cardNewsDesc,
      href: "/news",
      icon: BookOpen,
      color: "#fb923c",
    },
  ];

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#001a38" }}>
      {/* BRAND NAVBAR WITH LANGUAGE SWITCHER */}
      <Navbar lang={lang} onLangChange={setLang} />

      {/* 404 MAIN HERO */}
      <section
        style={{
          flex: 1,
          paddingTop: 140,
          paddingBottom: 80,
          position: "relative",
          overflow: "hidden",
          background:
            "radial-gradient(ellipse at 50% 15%, rgba(200, 169, 110, 0.12) 0%, #001a38 55%, #001229 100%)",
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* Subtle decorative background circles */}
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "min(90vw, 750px)",
            height: "min(90vw, 750px)",
            borderRadius: "50%",
            border: "1px dashed rgba(200, 169, 110, 0.12)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "22%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "min(70vw, 520px)",
            height: "min(70vw, 520px)",
            borderRadius: "50%",
            border: "1px solid rgba(255, 255, 255, 0.04)",
            pointerEvents: "none",
          }}
        />

        <div className="container-custom" style={{ position: "relative", zIndex: 1, width: "100%" }}>
          <div style={{ maxWidth: 840, margin: "0 auto", textAlign: "center" }}>
            {/* Brand Logo Emblem */}
            <div
              style={{
                width: 76,
                height: 76,
                borderRadius: "50%",
                background: "rgba(255, 255, 255, 0.06)",
                border: "2px solid rgba(200, 169, 110, 0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
                boxShadow: "0 8px 30px rgba(0, 0, 0, 0.35)",
                backdropFilter: "blur(8px)",
              }}
            >
              <Image
                src="/logo.png"
                alt="TATU Litsey Logo"
                width={52}
                height={52}
                priority
                style={{ objectFit: "contain" }}
              />
            </div>

            {/* Status Pill */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(200, 169, 110, 0.15)",
                border: "1px solid rgba(200, 169, 110, 0.35)",
                borderRadius: 50,
                padding: "6px 16px",
                marginBottom: 12,
              }}
            >
              <HelpCircle size={14} color="#dfc08a" strokeWidth={1.75} />
              <span
                style={{
                  color: "#dfc08a",
                  fontSize: "0.76rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                {c.badge}
              </span>
            </div>

            {/* Giant 404 Typography */}
            <div
              style={{
                fontSize: "clamp(5.5rem, 14vw, 8.5rem)",
                fontWeight: 900,
                lineHeight: 0.95,
                background: "linear-gradient(180deg, #ffffff 35%, #dfc08a 85%, #c8a96e 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                letterSpacing: "-0.04em",
                userSelect: "none",
                margin: "8px 0 16px",
                filter: "drop-shadow(0 10px 30px rgba(0, 0, 0, 0.4))",
              }}
            >
              404
            </div>

            {/* Localized Main Title */}
            <h1
              style={{
                fontSize: "clamp(1.65rem, 3.2vw, 2.3rem)",
                fontWeight: 800,
                color: "#ffffff",
                marginBottom: 14,
                letterSpacing: "-0.01em",
              }}
            >
              {c.title}
            </h1>

            {/* Localized Description */}
            <p
              style={{
                fontSize: "clamp(0.92rem, 1.6vw, 1.05rem)",
                color: "rgba(255, 255, 255, 0.8)",
                lineHeight: 1.65,
                maxWidth: 580,
                margin: "0 auto 32px",
              }}
            >
              {c.desc}
            </p>

            {/* Action Buttons */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 14,
                justifyContent: "center",
                marginBottom: 56,
              }}
            >
              <Link
                href="/"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "linear-gradient(135deg, #c8a96e 0%, #dfc08a 100%)",
                  color: "#002147",
                  fontWeight: 800,
                  fontSize: "0.88rem",
                  padding: "13px 28px",
                  borderRadius: 10,
                  textDecoration: "none",
                  transition: "all 0.25s ease",
                  boxShadow: "0 6px 20px rgba(200, 169, 110, 0.35)",
                }}
              >
                <Home size={18} strokeWidth={2} />
                <span>{c.btnHome}</span>
              </Link>

              <Link
                href="/contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "rgba(255, 255, 255, 0.08)",
                  border: "1px solid rgba(255, 255, 255, 0.22)",
                  color: "#ffffff",
                  fontWeight: 700,
                  fontSize: "0.88rem",
                  padding: "13px 26px",
                  borderRadius: 10,
                  textDecoration: "none",
                  transition: "all 0.25s ease",
                  backdropFilter: "blur(6px)",
                }}
              >
                <PhoneCall size={16} strokeWidth={2} />
                <span>{c.btnContact}</span>
              </Link>
            </div>

            {/* Helpful Branded Shortcuts */}
            <div
              style={{
                borderTop: "1px solid rgba(255, 255, 255, 0.1)",
                paddingTop: 40,
                textAlign: "left",
              }}
            >
              <div
                style={{
                  color: "rgba(255, 255, 255, 0.55)",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: 20,
                  textAlign: "center",
                }}
              >
                {c.quickHeading}
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                  gap: 16,
                }}
              >
                {quickLinks.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={i}
                      href={item.href}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 14,
                        padding: "18px 20px",
                        background: "rgba(255, 255, 255, 0.04)",
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                        borderRadius: 12,
                        textDecoration: "none",
                        transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
                        e.currentTarget.style.borderColor = "rgba(200, 169, 110, 0.4)";
                        e.currentTarget.style.transform = "translateY(-2px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "rgba(255, 255, 255, 0.04)";
                        e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
                        e.currentTarget.style.transform = "none";
                      }}
                    >
                      <div
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 9,
                          background: "rgba(255, 255, 255, 0.06)",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <Icon size={20} color={item.color} strokeWidth={1.75} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            color: "#ffffff",
                            fontWeight: 700,
                            fontSize: "0.92rem",
                            marginBottom: 4,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <span>{item.title}</span>
                          <ArrowRight size={13} color="rgba(255, 255, 255, 0.4)" strokeWidth={2} />
                        </div>
                        <div
                          style={{
                            color: "rgba(255, 255, 255, 0.6)",
                            fontSize: "0.78rem",
                            lineHeight: 1.45,
                          }}
                        >
                          {item.desc}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* Assistance Callout */}
              <div
                style={{
                  marginTop: 32,
                  padding: "16px 20px",
                  background: "rgba(200, 169, 110, 0.08)",
                  border: "1px solid rgba(200, 169, 110, 0.2)",
                  borderRadius: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: 12,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <HelpCircle size={18} color="#c8a96e" strokeWidth={1.75} />
                  <span style={{ fontSize: "0.82rem", color: "rgba(255, 255, 255, 0.85)" }}>
                    {c.helpDesc}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <a
                    href={`tel:${siteConfig.phone.replace(/[^\d+]/g, "")}`}
                    style={{
                      color: "#dfc08a",
                      fontWeight: 700,
                      fontSize: "0.84rem",
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <PhoneCall size={13} strokeWidth={2} />
                    <span>{siteConfig.phone}</span>
                  </a>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    style={{
                      color: "rgba(255, 255, 255, 0.75)",
                      fontSize: "0.84rem",
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <Mail size={13} strokeWidth={2} />
                    <span>{siteConfig.email}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BRAND FOOTER */}
      <Footer lang={lang} />
    </div>
  );
}
