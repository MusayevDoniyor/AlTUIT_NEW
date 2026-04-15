"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { translations, type Lang } from "@/lib/i18n";
import {
  Menu,
  X,
  ChevronDown,
  Phone,
  Mail,
  MapPin,
  Clock,
  Bus,
  Search,
  Headset,
} from "lucide-react";

interface NavbarProps {
  lang: Lang;
  onLangChange: (l: Lang) => void;
}

type NavT = {
  nav_home: string;
  nav_about: string;
  nav_about_short: string;
  nav_leadership: string;
  nav_teachers: string;
  nav_base: string;
  nav_admissions: string;
  nav_directions: string;
  nav_rules: string;
  nav_docs: string;
  nav_faq: string;
  nav_science: string;
  nav_partners: string;
  nav_achievements: string;
  nav_news: string;
  nav_contact: string;
  header_admin: string;
  header_hours: string;
  header_transport: string;
  contact_address_val: string;
  contact_phone_val: string;
  contact_email_val: string;
  contact_schedule_val: string;
};

const navItems = (t: NavT) => [
  { label: t.nav_home, href: "#" },
  {
    label: t.nav_about,
    children: [
      { label: t.nav_about_short, href: "#about" },
      { label: t.nav_leadership, href: "#leadership" },
      { label: t.nav_teachers, href: "#teachers" },
      { label: t.nav_base, href: "#facilities" },
    ],
  },
  {
    label: t.nav_admissions,
    children: [
      { label: t.nav_directions, href: "#directions" },
      { label: t.nav_rules, href: "#admission" },
      { label: t.nav_docs, href: "#documents" },
      { label: t.nav_faq, href: "#faq" },
    ],
  },
  {
    label: t.nav_science,
    children: [
      { label: t.nav_partners, href: "#partners" },
      { label: t.nav_achievements, href: "#achievements" },
    ],
  },
  { label: t.nav_news, href: "#news" },
  { label: t.nav_contact, href: "#contact" },
];

export default function Navbar({ lang, onLangChange }: NavbarProps) {
  const t = translations[lang] as unknown as NavT;
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 120);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const items = navItems(t);

  const scrollTo = (href: string) => {
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMobileOpen(false);
  };

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          width: "100%",
          transition: "all 0.4s",
        }}
      >
        {/* 1. TOP INFO BAR */}
        <div className={`header-top ${scrolled ? "shrunk" : ""}`}>
          <div className="container-custom" style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ display: "flex", gap: 40 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <MapPin size={14} color="#c8a96e" />
                <span>{t.contact_address_val}</span>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: 8 }}
                className="hidden-tablet"
              >
                <Bus size={14} color="#c8a96e" />
                <span>{t.header_transport}</span>
              </div>
            </div>
            <div style={{ display: "flex", gap: 40 }}>
              <div
                style={{ display: "flex", alignItems: "center", gap: 8 }}
                className="hidden-tablet"
              >
                <Mail size={14} color="#c8a96e" />
                <span>info@tatual.uz</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Clock size={14} color="#c8a96e" />
                <span>{t.header_hours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. LOGO & ADMIN BAR */}
        <div className={`header-middle ${scrolled ? "shrunk" : ""}`}>
          <div className="container-custom" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Link
              href="/"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("#");
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
                textDecoration: "none",
              }}
            >
              <div
                style={{
                  width: scrolled ? 54 : 70,
                  height: scrolled ? 54 : 70,
                  transition: "all 0.4s",
                }}
              >
                <Image
                  src="/logo.png"
                  alt="TATU Logo"
                  width={70}
                  height={70}
                  priority
                  style={{
                    objectFit: "contain",
                    width: "auto",
                    height: "auto",
                    maxWidth: "100%",
                    maxHeight: "100%",
                  }}
                />
              </div>
              <div>
                <div
                  style={{
                    color: "#002147",
                    fontWeight: 900,
                    fontSize: scrolled ? "1.1rem" : "1.5rem",
                    transition: "all 0.4s",
                    lineHeight: 1.1,
                  }}
                >
                  Al-Xorazmiy
                </div>
                <div
                  style={{
                    color: "#c8a96e",
                    fontSize: scrolled ? "0.75rem" : "0.9rem",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    marginTop: 2,
                  }}
                >
                  Akademik Litseyi
                </div>
              </div>
            </Link>

            <div
              className="hidden-mobile"
              style={{ display: "flex", alignItems: "center", gap: 20 }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  background: "#f0f4f8",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.3s",
                }}
              >
                <Headset size={24} color="#c8a96e" />
              </div>
              <div style={{ textAlign: "right" }}>
                <div
                  style={{
                    color: "#64748b",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    marginBottom: 2,
                  }}
                >
                  {t.header_admin}
                </div>
                <a
                  href="tel:+998712350369"
                  style={{
                    color: "#002147",
                    fontSize: "1.3rem",
                    fontWeight: 800,
                    textDecoration: "none",
                    transition: "all 0.3s",
                  }}
                >
                  +998 71 235 03 69
                </a>
              </div>
            </div>

            <button
              className="show-mobile"
              onClick={() => setMobileOpen(true)}
              style={{
                background: "none",
                border: "none",
                color: "#002147",
                cursor: "pointer",
                padding: 10,
              }}
            >
              <Menu size={32} />
            </button>
          </div>
        </div>

        {/* 3. NAVIGATION BAR */}
        <nav
          className={`header-bottom ${scrolled ? "sticky" : ""}`}
          style={{ background: "white" }}
        >
          <div className="container-custom" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <ul
              style={{
                display: "flex",
                listStyle: "none",
                padding: 0,
                margin: 0,
              }}
              className="hidden-mobile"
            >
              {items.map((item, i) => (
                <li
                  key={i}
                  className="nav-item"
                  style={{ position: "relative" }}
                >
                  {item.children ? (
                    <>
                      <button className="nav-link">
                        {item.label}{" "}
                        <ChevronDown size={14} style={{ opacity: 0.5 }} />
                      </button>
                      <div className="dropdown-menu">
                        {item.children.map((child, j) => (
                          <button
                            key={j}
                            onClick={() => scrollTo(child.href)}
                            style={{
                              display: "block",
                              width: "100%",
                              textAlign: "left",
                              padding: "14px 24px",
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                              fontSize: "0.9rem",
                              color: "#334155",
                              fontWeight: 600,
                              transition: "all 0.2s",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = "#f1f5f9";
                              e.currentTarget.style.color = "#c8a96e";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = "none";
                              e.currentTarget.style.color = "#334155";
                            }}
                          >
                            {child.label}
                          </button>
                        ))}
                      </div>
                    </>
                  ) : (
                    <button
                      className="nav-link"
                      onClick={() => scrollTo(item.href!)}
                    >
                      {item.label}
                    </button>
                  )}
                </li>
              ))}
            </ul>

            <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
              <button
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#64748b",
                  padding: 8,
                }}
                aria-label="Search"
              >
                <Search size={20} />
              </button>
              <div
                style={{ width: 1, height: 24, background: "#e2e8f0" }}
                className="hidden-mobile"
              />
              <div style={{ display: "flex", gap: 10 }}>
                {(["uz", "ru", "en"] as Lang[]).map((l) => (
                  <button
                    key={l}
                    className={`lang-btn ${lang === l ? "active" : ""}`}
                    onClick={() => onLangChange(l)}
                    style={{ padding: "8px 4px" }}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* MOBILE SIDEBAR */}
      <div
        className={`mobile-overlay ${mobileOpen ? "open" : ""}`}
        onClick={() => setMobileOpen(false)}
      />
      <div className={`mobile-menu ${mobileOpen ? "open" : ""}`}>
        <div
          style={{
            padding: "30px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #f1f5f9",
          }}
        >
          <div
            style={{
              fontWeight: 900,
              color: "#002147",
              letterSpacing: "0.1em",
            }}
          >
            MENU
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            style={{
              background: "#f1f5f9",
              border: "none",
              borderRadius: "50%",
              width: 40,
              height: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <X size={24} color="#002147" />
          </button>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "20px 0" }}>
          {items.map((item, i) => (
            <div key={i}>
              <button
                onClick={() =>
                  item.children
                    ? setMobileExpanded(mobileExpanded === i ? null : i)
                    : scrollTo(item.href!)
                }
                style={{
                  width: "100%",
                  textAlign: "left",
                  padding: "18px 30px",
                  background: "none",
                  border: "none",
                  fontSize: "1rem",
                  fontWeight: 800,
                  color: "#1e293b",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                {item.label}
                {item.children && (
                  <ChevronDown
                    size={18}
                    style={{
                      transform:
                        mobileExpanded === i ? "rotate(180deg)" : "none",
                      transition: "transform 0.3s",
                      opacity: 0.4,
                    }}
                  />
                )}
              </button>
              {item.children && mobileExpanded === i && (
                <div style={{ background: "#f8fafc", padding: "8px 0" }}>
                  {item.children.map((child, j) => (
                    <button
                      key={j}
                      onClick={() => scrollTo(child.href)}
                      style={{
                        width: "100%",
                        textAlign: "left",
                        padding: "14px 45px",
                        background: "none",
                        border: "none",
                        fontSize: "0.95rem",
                        color: "#475569",
                        fontWeight: 600,
                      }}
                    >
                      {child.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div
          style={{
            padding: "30px",
            borderTop: "1px solid #f1f5f9",
            background: "#f8fafc",
          }}
        >
          <div
            style={{
              fontSize: "0.85rem",
              color: "#64748b",
              fontWeight: 600,
              marginBottom: 8,
            }}
          >
            {t.header_admin}
          </div>
          <a
            href="tel:+998712350369"
            style={{
              fontSize: "1.4rem",
              fontWeight: 900,
              color: "#002147",
              textDecoration: "none",
            }}
          >
            +998 71 235 03 69
          </a>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1100px) {
          .hidden-tablet {
            display: none !important;
          }
        }
        @media (max-width: 1024px) {
          .hidden-mobile {
            display: none !important;
          }
          .show-mobile {
            display: block !important;
          }
        }
        @media (min-width: 1025px) {
          .show-mobile {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
