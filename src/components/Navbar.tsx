"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { translations, type Lang } from "@/lib/i18n";
import { siteConfig } from "@/lib/config";
import MaintenanceBanner from "@/components/MaintenanceBanner";
import { Menu, X, ChevronDown } from "lucide-react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaInstagram,
  FaTelegramPlane,
  FaClock,
} from "react-icons/fa";

interface NavbarProps {
  lang: Lang;
  onLangChange: (l: Lang) => void;
}

const navItems = (t: Record<string, string>) => [
  { label: t.nav_home, href: "/" },
  {
    label: t.nav_about,
    children: [
      { label: t.nav_about_short, href: "/about" },
      { label: t.nav_leadership, href: "/about#leadership" },
      { label: t.nav_teachers, href: "/about#teachers" },
    ],
  },
  {
    label: t.nav_admissions,
    children: [
      { label: t.nav_directions, href: "/#directions" },
      { label: t.nav_rules, href: "/admission" },
      { label: t.nav_docs, href: "/admission#documents" },
      { label: t.nav_faq, href: "/about#faq" },
    ],
  },
  { label: t.nav_science, href: "/science" },
  { label: t.nav_news, href: "/news" },
  { label: t.nav_contact, href: "/contact" },
];

export default function Navbar({ lang, onLangChange }: NavbarProps) {
  const t = translations[lang] as unknown as Record<string, string>;
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 120);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const items = navItems(t);

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    setMobileOpen(false);
    // If same page with hash, smooth scroll
    if (href.startsWith("/#") && pathname === "/") {
      e.preventDefault();
      const id = href.replace("/#", "");
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else if (href.includes("#") && href.startsWith(pathname + "#")) {
      e.preventDefault();
      const hash = href.split("#")[1];
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
    }
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
        <MaintenanceBanner lang={lang} />
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
            borderBottom: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <div
            className="container-custom"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", gap: 30 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <FaMapMarkerAlt size={12} color="#c8a96e" />
                <span>{t.contact_address_val}</span>
              </div>
              <div
                className="hidden-tablet"
                style={{ display: "flex", alignItems: "center", gap: 6 }}
              >
                <FaEnvelope size={12} color="#c8a96e" />
                <span>{siteConfig.email}</span>
              </div>
            </div>
            <div style={{ display: "flex", gap: 30, alignItems: "center" }}>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <a
                  href={siteConfig.telegram}
                  aria-label="Telegram"
                  style={{ color: "white", opacity: 0.8 }}
                >
                  <FaTelegramPlane size={14} />
                </a>
                <a
                  href={siteConfig.instagram}
                  aria-label="Instagram"
                  style={{ color: "white", opacity: 0.8 }}
                >
                  <FaInstagram size={14} />
                </a>
              </div>
              <div
                className="hidden-tablet"
                style={{ display: "flex", alignItems: "center", gap: 6 }}
              >
                <FaClock size={12} color="#c8a96e" />
                <span>{t.header_hours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ROW 2: MAIN NAV BAR */}
        <div
          className={`header-main ${scrolled ? "scrolled" : ""}`}
          style={{
            background: scrolled ? "rgba(255,255,255,0.97)" : "white",
            backdropFilter: scrolled ? "blur(12px)" : "none",
            padding: scrolled ? "8px 0" : "12px 0",
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            boxShadow: scrolled
              ? "0 10px 30px rgba(0,0,0,0.08)"
              : "0 4px 20px rgba(0,0,0,0.05)",
            borderBottom: "1px solid #f1f5f9",
          }}
        >
          <div
            className="container-custom"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* LOGO */}
            <Link
              href="/"
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
                    fontWeight: 800,
                    fontSize: scrolled ? "0.7rem" : "0.78rem",
                    transition: "all 0.4s",
                    lineHeight: 1.15,
                    maxWidth: 210,
                  }}
                >
                  Muhammad Al-Xorazmiy nomidagi
                </div>
                <div
                  style={{
                    color: "#c8a96e",
                    fontSize: scrolled ? "0.6rem" : "0.72rem",
                    fontWeight: 700,
                    letterSpacing: "0.05em",
                    marginTop: 1,
                    lineHeight: 1.2,
                  }}
                >
                  TATU akademik litseyi
                </div>
              </div>
            </Link>

            {/* NAV MENU */}
            <nav
              className="hidden-mobile"
              style={{ flex: 1, display: "flex", justifyContent: "center" }}
            >
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
                  <li
                    key={i}
                    className="nav-item"
                    style={{ position: "relative" }}
                  >
                    {item.children ? (
                      <>
                        <button
                          className="nav-link"
                          style={{ padding: "10px 14px", fontSize: "0.75rem" }}
                        >
                          {item.label}
                          <ChevronDown
                            size={11}
                            style={{ opacity: 0.5, marginLeft: 3 }}
                          />
                        </button>
                        <div className="dropdown-menu">
                          {item.children.map((child, j) => (
                            <Link
                              key={j}
                              href={child.href}
                              onClick={(e) => handleNavClick(e, child.href)}
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
                                textDecoration: "none",
                              }}
                              onMouseEnter={(e) => {
                                (
                                  e.currentTarget as HTMLAnchorElement
                                ).style.color = "#c8a96e";
                                (
                                  e.currentTarget as HTMLAnchorElement
                                ).style.paddingLeft = "22px";
                              }}
                              onMouseLeave={(e) => {
                                (
                                  e.currentTarget as HTMLAnchorElement
                                ).style.color = "#334155";
                                (
                                  e.currentTarget as HTMLAnchorElement
                                ).style.paddingLeft = "18px";
                              }}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </>
                    ) : (
                      <Link
                        href={item.href!}
                        className={`nav-link ${pathname === item.href ? "active" : ""}`}
                        style={{
                          padding: "10px 14px",
                          fontSize: "0.75rem",
                          textDecoration: "none",
                        }}
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            {/* ACTIONS */}
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div
                className="hidden-mobile"
                style={{
                  display: "flex",
                  gap: 6,
                  alignItems: "center",
                  borderRight: "1px solid #e2e8f0",
                  paddingRight: 14,
                }}
              >
                {(["uz", "ru", "en"] as Lang[]).map((l) => {
                  const isActive = lang === l;
                  return (
                    <button
                      key={l}
                      onClick={() => onLangChange(l)}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          (e.currentTarget as HTMLButtonElement).style.color =
                            "#c8a96e";
                          (
                            e.currentTarget as HTMLButtonElement
                          ).style.background = "rgba(200,169,110,0.1)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          (e.currentTarget as HTMLButtonElement).style.color =
                            "rgba(0,33,71,0.6)";
                          (
                            e.currentTarget as HTMLButtonElement
                          ).style.background = "transparent";
                        }
                      }}
                      style={{
                        background: isActive
                          ? "rgba(200,169,110,0.18)"
                          : "transparent",
                        color: isActive ? "#c8a96e" : "rgba(0,33,71,0.6)",
                        fontWeight: isActive ? 700 : 600,
                        border: "none",
                        borderRadius: 6,
                        padding: "4px 8px",
                        fontSize: "0.75rem",
                        cursor: "pointer",
                        transition: "all 0.2s",
                        textTransform: "uppercase",
                        fontFamily: "inherit",
                      }}
                    >
                      {l}
                    </button>
                  );
                })}
              </div>

              <a
                href={`tel:${siteConfig.phone.replace(/[^\d+]/g, "")}`}
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
                <FaPhoneAlt size={12} />
                <span>{siteConfig.phone}</span>
              </a>

              <button
                className="show-mobile"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
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
            aria-label="Close menu"
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
          {/* Mobile Language Switcher */}
          <div
            style={{
              display: "flex",
              gap: 8,
              justifyContent: "center",
              padding: "0 30px 20px 30px",
              borderBottom: "1px solid #f1f5f9",
              marginBottom: "10px",
            }}
          >
            {(["uz", "ru", "en"] as Lang[]).map((l) => {
              const isActive = lang === l;
              return (
                <button
                  key={l}
                  onClick={() => {
                    onLangChange(l);
                    setMobileOpen(false);
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLButtonElement).style.color =
                        "#c8a96e";
                      (e.currentTarget as HTMLButtonElement).style.background =
                        "rgba(200,169,110,0.1)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLButtonElement).style.color =
                        "rgba(0,33,71,0.6)";
                      (e.currentTarget as HTMLButtonElement).style.background =
                        "transparent";
                    }
                  }}
                  style={{
                    background: isActive
                      ? "rgba(200,169,110,0.18)"
                      : "transparent",
                    color: isActive ? "#c8a96e" : "rgba(0,33,71,0.6)",
                    fontWeight: isActive ? 700 : 600,
                    border: "none",
                    borderRadius: 8,
                    padding: "6px 14px",
                    fontSize: "0.82rem",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    textTransform: "uppercase",
                    fontFamily: "inherit",
                  }}
                >
                  {l.toUpperCase()}
                </button>
              );
            })}
          </div>

          {items.map((item, i) => (
            <div key={i}>
              {item.children ? (
                <>
                  <button
                    onClick={() =>
                      setMobileExpanded(mobileExpanded === i ? null : i)
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
                    <ChevronDown
                      size={18}
                      style={{
                        transform:
                          mobileExpanded === i ? "rotate(180deg)" : "none",
                        transition: "transform 0.3s",
                        opacity: 0.4,
                      }}
                    />
                  </button>
                  {mobileExpanded === i && (
                    <div style={{ background: "#f8fafc", padding: "8px 0" }}>
                      {item.children.map((child, j) => (
                        <Link
                          key={j}
                          href={child.href}
                          onClick={(e) => handleNavClick(e, child.href)}
                          style={{
                            display: "block",
                            width: "100%",
                            textAlign: "left",
                            padding: "14px 45px",
                            fontSize: "0.95rem",
                            color: "#475569",
                            fontWeight: 600,
                            textDecoration: "none",
                          }}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.href!}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "left",
                    padding: "18px 30px",
                    fontSize: "1rem",
                    fontWeight: 800,
                    color: pathname === item.href ? "#c8a96e" : "#1e293b",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    textDecoration: "none",
                  }}
                >
                  {item.label}
                </Link>
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
            href={`tel:${siteConfig.phone.replace(/[^\d+]/g, "")}`}
            style={{
              fontSize: "1.4rem",
              fontWeight: 900,
              color: "#002147",
              textDecoration: "none",
            }}
          >
            {siteConfig.phone}
          </a>
        </div>
      </div>
    </>
  );
}
