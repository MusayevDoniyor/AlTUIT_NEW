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
      setScrolled(window.scrollY > 80);
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
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
    setMobileOpen(false);
  };

  return (
    <header style={{ position: "relative", zIndex: 100, width: "100%" }}>
      {/* 1. TOP INFO BAR */}
      <div className={`header-top ${scrolled ? "shrunk" : ""}`}>
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 24px",
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", gap: 30 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <MapPin size={13} color="#c8a96e" />
              <span>{t.nav_contact}</span>
            </div>
            <div
              style={{ display: "flex", alignItems: "center", gap: 6 }}
              className="hidden-mobile"
            >
              <Bus size={13} color="#c8a96e" />
              <span>{t.header_transport}</span>
            </div>
          </div>
          <div style={{ display: "flex", gap: 30 }}>
            <div
              style={{ display: "flex", alignItems: "center", gap: 6 }}
              className="hidden-mobile"
            >
              <Mail size={13} color="#c8a96e" />
              <span>info@tatual.uz</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Clock size={13} color="#c8a96e" />
              <span>{t.header_hours}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. LOGO & ADMIN BAR */}
      <div className={`header-middle ${scrolled ? "shrunk" : ""}`}>
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            onClick={(e) => {
              e.preventDefault();
              scrollTo("#");
            }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 15,
              textDecoration: "none",
            }}
          >
            <div
              style={{
                width: scrolled ? 50 : 64,
                height: scrolled ? 50 : 64,
                transition: "all 0.4s",
              }}
            >
              <Image
                src="/tuit.png"
                alt="TATU Logo"
                width={64}
                height={64}
                style={{ objectFit: "contain" }}
              />
            </div>
            <div>
              <div
                style={{
                  color: "#002147",
                  fontWeight: 800,
                  fontSize: scrolled ? "1rem" : "1.3rem",
                  transition: "all 0.4s",
                  lineHeight: 1.1,
                }}
              >
                Al-Xorazmiy
              </div>
              <div
                style={{
                  color: "#c8a96e",
                  fontSize: scrolled ? "0.7rem" : "0.8rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                Akademik Litseyi
              </div>
            </div>
          </Link>

          {/* Admin Support (Hidden on mobile) */}
          <div
            className="hidden-mobile"
            style={{ display: "flex", alignItems: "center", gap: 15 }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: "#f8f9fa",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid #eee",
              }}
            >
              <Headset size={22} color="#c8a96e" />
            </div>
            <div style={{ textAlign: "right" }}>
              <div
                style={{ color: "#666", fontSize: "0.75rem", fontWeight: 600 }}
              >
                {t.header_admin}
              </div>
              <a
                href="tel:+998712350369"
                style={{
                  color: "#002147",
                  fontSize: "1.2rem",
                  fontWeight: 800,
                  textDecoration: "none",
                }}
              >
                +998 71 235 03 69
              </a>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="show-mobile"
            onClick={() => setMobileOpen(true)}
            style={{
              background: "none",
              border: "none",
              color: "#002147",
              cursor: "pointer",
            }}
          >
            <Menu size={28} />
          </button>
        </div>
      </div>

      {/* 3. NAVIGATION BAR (Sticky) */}
      <nav className={`header-bottom ${scrolled ? "sticky" : ""}`}>
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: scrolled ? "0 24px" : "0 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
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
              <li key={i} className="nav-item" style={{ position: "relative" }}>
                {item.children ? (
                  <>
                    <button className="nav-link">
                      {item.label} <ChevronDown size={14} />
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
                            padding: "12px 20px",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            fontSize: "0.85rem",
                            color: "#444",
                            fontWeight: 500,
                            transition: "all 0.2s",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = "#f8f9fa";
                            e.currentTarget.style.color = "#c8a96e";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "none";
                            e.currentTarget.style.color = "#444";
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

          {/* Right: Search & Language */}
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <button
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#333",
              }}
              aria-label="Search"
            >
              <Search size={18} />
            </button>
            <div style={{ width: 1, height: 20, background: "#eee" }} />
            <div style={{ display: "flex", gap: 8 }}>
              {(["uz", "ru", "en"] as Lang[]).map((l) => (
                <button
                  key={l}
                  className={`lang-btn ${lang === l ? "active" : ""}`}
                  onClick={() => onLangChange(l)}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* MOBILE SIDEBAR */}
      <div
        className={`mobile-overlay ${mobileOpen ? "open" : ""}`}
        onClick={() => setMobileOpen(false)}
      />
      <div className={`mobile-menu ${mobileOpen ? "open" : ""}`}>
        <div
          style={{
            padding: "25px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #f0f0f0",
          }}
        >
          <div style={{ fontWeight: 800, color: "#002147" }}>MENU</div>
          <button
            onClick={() => setMobileOpen(false)}
            style={{ background: "none", border: "none" }}
          >
            <X size={24} color="#002147" />
          </button>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "10px 0" }}>
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
                  padding: "15px 25px",
                  background: "none",
                  border: "none",
                  fontSize: "0.9rem",
                  fontWeight: 700,
                  color: "#333",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  textTransform: "uppercase",
                }}
              >
                {item.label}
                {item.children && (
                  <ChevronDown
                    size={16}
                    style={{
                      transform:
                        mobileExpanded === i ? "rotate(180deg)" : "none",
                    }}
                  />
                )}
              </button>
              {item.children && mobileExpanded === i && (
                <div style={{ background: "#f9f9f9", padding: "5px 0" }}>
                  {item.children.map((child, j) => (
                    <button
                      key={j}
                      onClick={() => scrollTo(child.href)}
                      style={{
                        width: "100%",
                        textAlign: "left",
                        padding: "12px 40px",
                        background: "none",
                        border: "none",
                        fontSize: "0.85rem",
                        color: "#666",
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
            padding: "25px",
            borderTop: "1px solid #f0f0f0",
            background: "#fcfcfc",
          }}
        >
          <div style={{ fontSize: "0.8rem", color: "#999", marginBottom: 10 }}>
            {t.header_admin}
          </div>
          <a
            href="tel:+998712350369"
            style={{
              fontSize: "1.2rem",
              fontWeight: 800,
              color: "#002147",
              textDecoration: "none",
            }}
          >
            +998 71 235 03 69
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: block !important; }
        }
        @media (min-width: 1025px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </header>
  );
}
