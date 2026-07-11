"use client";

import Image from "next/image";
import Link from "next/link";
import { translations, type Lang } from "@/lib/i18n";
import { ExternalLink, Bus } from "lucide-react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaInstagram,
  FaFacebookF,
  FaTelegramPlane,
} from "react-icons/fa";

interface FooterProps {
  lang: Lang;
}

export default function Footer({ lang }: FooterProps) {
  const t = translations[lang];

  const links = [
    { label: t.nav_about_short, href: "/about" },
    { label: t.nav_directions, href: "/#directions" },
    { label: t.nav_rules, href: "/admission" },
    { label: t.nav_docs, href: "/admission#documents" },
    { label: t.nav_faq, href: "/about#faq" },
    { label: t.nav_achievements, href: "/science" },
    { label: t.nav_news, href: "/news" },
    { label: t.nav_contact, href: "/contact" },
  ];

  return (
    <footer style={{ background: "#10223e", color: "rgba(255,255,255,0.7)" }}>
      {/* Main footer */}
      <div className="container-custom" style={{ padding: "80px 40px 40px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 40,
          }}
        >
          {/* Brand */}
          <div style={{ maxWidth: 280 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 18,
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  background: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Image
                  src="/logo.png"
                  alt="TATU"
                  width={38}
                  height={38}
                  style={{
                    objectFit: "contain",
                    width: "auto",
                    height: "auto",
                  }}
                />
              </div>
              <div>
                <div
                  style={{
                    color: "white",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                  }}
                >
                  Al-Xorazmiy
                </div>
                <div style={{ color: "#c8a96e", fontSize: "0.72rem" }}>
                  Akademik Litsey
                </div>
              </div>
            </div>
            <p
              style={{
                fontSize: "0.84rem",
                lineHeight: 1.8,
                marginBottom: 22,
                color: "rgba(255,255,255,0.5)",
              }}
            >
              {t.footer_desc}
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              {[
                {
                  href: "https://t.me/tatu_akademik_litseyi",
                  label: "Telegram",
                  icon: FaTelegramPlane,
                },
                {
                  href: "https://www.instagram.com/tatu_lyceum/",
                  label: "Instagram",
                  icon: FaInstagram,
                },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  title={s.label}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1rem",
                    textDecoration: "none",
                    transition: "all 0.25s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background =
                      "rgba(200,169,110,0.2)";
                    (e.currentTarget as HTMLAnchorElement).style.borderColor =
                      "rgba(200,169,110,0.4)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background =
                      "rgba(255,255,255,0.07)";
                    (e.currentTarget as HTMLAnchorElement).style.borderColor =
                      "rgba(255,255,255,0.1)";
                  }}
                >
                  <s.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4
              style={{
                color: "white",
                fontWeight: 700,
                fontSize: "0.9rem",
                marginBottom: 22,
                letterSpacing: "0.02em",
              }}
            >
              {t.footer_links}
            </h4>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              {links.map((l, i) => (
                <li key={i}>
                  <Link
                    href={l.href}
                    style={{
                      color: "rgba(255,255,255,0.5)",
                      fontSize: "0.84rem",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      transition: "color 0.2s",
                      textDecoration: "none",
                    }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLAnchorElement).style.color =
                        "#c8a96e")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLAnchorElement).style.color =
                        "rgba(255,255,255,0.5)")
                    }
                  >
                    <span style={{ color: "#c8a96e", fontSize: "0.7rem" }}>
                      ›
                    </span>{" "}
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              style={{
                color: "white",
                fontWeight: 700,
                fontSize: "0.9rem",
                marginBottom: 22,
              }}
            >
              {t.footer_contact}
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { icon: FaMapMarkerAlt, text: t.contact_address_val },
                { icon: FaPhoneAlt, text: t.contact_phone_val },
                { icon: FaPhoneAlt, text: t.contact_phone_mobile_val },
                { icon: FaEnvelope, text: t.contact_email_val },
              ].map((c, i) => (
                <div
                  key={i}
                  style={{ display: "flex", alignItems: "flex-start", gap: 10 }}
                >
                  <c.icon
                    size={15}
                    color="#c8a96e"
                    style={{ flexShrink: 0, marginTop: 2 }}
                  />
                  <span style={{ fontSize: "0.84rem" }}>{c.text}</span>
                </div>
              ))}
              <div
                style={{ display: "flex", alignItems: "flex-start", gap: 10 }}
              >
                <Bus
                  size={15}
                  color="#c8a96e"
                  style={{ flexShrink: 0, marginTop: 2 }}
                />
                <span style={{ fontSize: "0.84rem" }}>19, 38, 50, 63, 115</span>
              </div>

              <div
                style={{
                  height: 1,
                  background: "rgba(255,255,255,0.06)",
                  margin: "8px 0",
                }}
              />

              <a
                href="https://tatu.uz"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  color: "#c8a96e",
                  fontSize: "0.83rem",
                  fontWeight: 600,
                  textDecoration: "none",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.opacity =
                    "0.75")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")
                }
              >
                <ExternalLink size={13} /> tatu.uz
              </a>
            </div>
          </div>

          {/* Telegram CTA */}
          <div>
            <h4
              style={{
                color: "white",
                fontWeight: 700,
                fontSize: "0.9rem",
                marginBottom: 22,
              }}
            >
              {lang === "uz" ? "Kanal" : lang === "ru" ? "Канал" : "Channel"}
            </h4>
            <a
              href="https://t.me/tatu_akademik_litseyi"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "block",
                background: "rgba(200,169,110,0.1)",
                border: "1px solid rgba(200,169,110,0.3)",
                borderRadius: 14,
                padding: "20px",
                textDecoration: "none",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background =
                  "rgba(200,169,110,0.18)";
                (e.currentTarget as HTMLAnchorElement).style.transform =
                  "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background =
                  "rgba(200,169,110,0.1)";
                (e.currentTarget as HTMLAnchorElement).style.transform = "none";
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 10,
                  background: "rgba(200,169,110,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 12,
                  color: "#c8a96e",
                }}
              >
                <FaTelegramPlane size={24} />
              </div>
              <p
                style={{
                  color: "white",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  marginBottom: 6,
                }}
              >
                Telegram
              </p>
              <p
                style={{
                  color: "rgba(255,255,255,0.5)",
                  fontSize: "0.78rem",
                  lineHeight: 1.5,
                }}
              >
                {lang === "uz"
                  ? "Yangiliklar va e'lonlar"
                  : lang === "ru"
                    ? "Новости и объявления"
                    : "News & announcements"}
              </p>
              <p
                style={{
                  color: "#c8a96e",
                  fontWeight: 600,
                  fontSize: "0.78rem",
                  marginTop: 10,
                }}
              >
                @altuit_lyceum →
              </p>
            </a>
          </div>
        </div>
      </div>

      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          padding: "20px 0",
        }}
      >
        <div
          className="container-custom"
          style={{
            padding: "0 40px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.3)" }}>
            © {new Date().getFullYear()} Al-Xorazmiy Akademik Litseyi (TATU).{" "}
            {t.footer_copy}
          </p>
          <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.25)" }}>
            tatual.uz
          </p>
        </div>
      </div>
    </footer>
  );
}
