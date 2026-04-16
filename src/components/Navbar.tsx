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
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {/* ROW 1: UPPER INFO BAR */}
        <div 
          className="header-top" 
          style={{ 
            background: "#002147", 
            color: "rgba(255,255,255,0.9)",
            fontSize: "0.72rem",
            padding: scrolled ? "0" : "8px 0",
            height: scrolled ? "0" : "auto",
            overflow: "hidden",
            opacity: scrolled ? 0 : 1,
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            borderBottom: "1px solid rgba(255,255,255,0.1)"
          }}
        >
          <div className="container-custom" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", gap: 30 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <MapPin size={12} color="#c8a96e" />
                <span>{t.contact_address_val}</span>
              </div>
              <div className="hidden-tablet" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Bus size={12} color="#c8a96e" />
                <span>{t.header_transport}: 19, 38, 50, 63, 115</span>
              </div>
            </div>
            <div style={{ display: "flex", gap: 30 }}>
              <div className="hidden-tablet" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Mail size={12} color="#c8a96e" />
                <span>info@tatual.uz</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Clock size={12} color="#c8a96e" />
                <span>{t.header_hours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ROW 2: MAIN SLIM BAR (Sticky) */}
        <div 
          className={`header-main ${scrolled ? "scrolled" : ""}`}
          style={{
            background: scrolled ? "rgba(255, 255, 255, 0.95)" : "white",
            backdropFilter: scrolled ? "blur(10px)" : "none",
            padding: scrolled ? "8px 0" : "12px 0",
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            boxShadow: scrolled ? "0 10px 30px rgba(0,0,0,0.08)" : "0 4px 20px rgba(0,0,0,0.05)",
            borderBottom: "1px solid #f1f5f9"
          }}
        >
          <div className="container-custom" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            {/* LOGO */}
            <Link
              href="/"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("#");
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                textDecoration: "none",
              }}
            >
              <div
                style={{
                  width: scrolled ? 40 : 52,
                  height: scrolled ? 40 : 52,
                  transition: "all 0.4s",
                }}
              >
                <Image
                  src="/logo.png"
                  alt="TATU Logo"
                  width={52}
                  height={52}
                  priority
                  style={{
                    objectFit: "contain",
                    width: "100%",
                    height: "100%",
                  }}
                />
              </div>
              <div className="hidden-mobile">
                <div
                  style={{
                    color: "#002147",
                    fontWeight: 900,
                    fontSize: scrolled ? "1rem" : "1.2rem",
                    transition: "all 0.4s",
                    lineHeight: 1.1,
                  }}
                >
                  Al-Xorazmiy
                </div>
                <div
                  style={{
                    color: "#c8a96e",
                    fontSize: scrolled ? "0.6rem" : "0.75rem",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    marginTop: 1,
                  }}
                >
                  Akademik Litseyi
                </div>
              </div>
            </Link>

            {/* NAV MENU */}
            <nav className="hidden-mobile" style={{ flex: 1, display: "flex", justifyContent: "center" }}>
              <ul
                style={{
                  display: "flex",
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  gap: 4,
                }}
              >
                {items.map((item, i) => (
                  <li key={i} className="nav-item" style={{ position: "relative" }}>
                    {item.children ? (
                      <>
                        <button className="nav-link" style={{ padding: "10px 14px", fontSize: "0.75rem" }}>
                          {item.label}
                          <ChevronDown size={11} style={{ opacity: 0.5, marginLeft: 3 }} />
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
                                padding: "10px 18px",
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                fontSize: "0.82rem",
                                color: "#334155",
                                fontWeight: 600,
                                transition: "all 0.2s",
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
                        style={{ padding: "10px 14px", fontSize: "0.75rem" }}
                        onClick={() => scrollTo(item.href!)}
                      >
                        {item.label}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            {/* ACTIONS */}
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <button
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#002147",
                  padding: 8,
                  opacity: 0.6,
                }}
                aria-label="Search"
              >
                <Search size={18} />
              </button>
              <div style={{ width: 1, height: 18, background: "#e2e8f0" }} className="hidden-mobile" />
              <div style={{ display: "flex", gap: 2 }}>
                {(["uz", "ru", "en"] as Lang[]).map((l) => (
                  <button
                    key={l}
                    className={`lang-btn ${lang === l ? "active" : ""}`}
                    onClick={() => onLangChange(l)}
                    style={{ padding: "4px", fontSize: "0.68rem" }}
                  >
                    {l}
                  </button>
                ))}
              </div>
              
              <a
                href="tel:+998712350369"
                className="hidden-mobile"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "6px 14px",
                  background: "#002147",
                  color: "white",
                  borderRadius: 50,
                  textDecoration: "none",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  transition: "all 0.3s",
                }}
              >
                <Phone size={12} />
                <span>+998 71 235 03 69</span>
              </a>

              <button
                className="show-mobile"
                onClick={() => setMobileOpen(true)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#002147",
                  cursor: "pointer",
                  padding: 4,
                }}
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
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
        @media (max-width: 768px) {
          .header-top {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
