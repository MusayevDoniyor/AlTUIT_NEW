"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import {
  LayoutDashboard,
  Newspaper,
  Users,
  GraduationCap,
  Trophy,
  FileText,
  BarChart2,
  ImageIcon,
  Sliders,
  Building2,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Settings,
} from "lucide-react";
import { ToastProvider } from "./_components/ui";

const navItems = [
  { label: "Dashboard", href: "/altuit-dashboard", icon: LayoutDashboard },
  { label: "Yangiliklar", href: "/altuit-dashboard/news", icon: Newspaper },
  { label: "Rahbariyat", href: "/altuit-dashboard/leadership", icon: Users },
  {
    label: "Pedagog xodimlar",
    href: "/altuit-dashboard/teachers",
    icon: GraduationCap,
  },
  { label: "Kafedralar", href: "/altuit-dashboard/departments", icon: Building2 },
  { label: "Yutuqlar", href: "/altuit-dashboard/achievements", icon: Trophy },
  {
    label: "Qabul",
    href: "/altuit-dashboard/admission",
    icon: FileText,
  },
  {
    label: "Statistika raqamlari",
    href: "/altuit-dashboard/stats",
    icon: BarChart2,
  },
  { label: "Galereya", href: "/altuit-dashboard/gallery", icon: ImageIcon },
  { label: "Hero slider", href: "/altuit-dashboard/hero", icon: Sliders },
  { label: "Hujjatlar", href: "/altuit-dashboard/documents", icon: FileText },
  { label: "Sozlamalar", href: "/altuit-dashboard/settings", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Check current session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUserEmail(session.user.email ?? null);
        setLoading(false);
      } else {
        document.cookie = "admin-session=; Max-Age=0; path=/";
        router.replace("/login");
      }
    });

    // Listen to auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUserEmail(session.user.email ?? null);
        setLoading(false);
      } else {
        document.cookie = "admin-session=; Max-Age=0; path=/";
        router.replace("/login");
      }
    });
    return () => subscription.unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    document.cookie = "admin-session=; Max-Age=0; path=/";
    router.replace("/login");
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0f1117",
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            border: "3px solid rgba(200,169,110,0.2)",
            borderTopColor: "#c8a96e",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
          }}
        />
        <style>{`@keyframes spin { to { transform: rotate(360deg); }}`}</style>
      </div>
    );
  }

  const isActive = (href: string) => {
    if (href === "/altuit-dashboard") return pathname === "/altuit-dashboard";
    return pathname.startsWith(href);
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0f1117" }}>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            zIndex: 40,
            backdropFilter: "blur(2px)",
          }}
        />
      )}

      {/* SIDEBAR */}
      <aside
        style={{
          position: "fixed",
          top: 0,
          left: sidebarOpen ? 0 : "-280px",
          width: 260,
          height: "100vh",
          background: "linear-gradient(180deg, #141620 0%, #0f1117 100%)",
          borderRight: "1px solid rgba(255,255,255,0.06)",
          zIndex: 50,
          display: "flex",
          flexDirection: "column",
          transition: "left 0.3s ease",
          overflowY: "auto",
        }}
        className="admin-sidebar"
      >
        {/* Logo */}
        <div
          style={{
            padding: "24px 20px 20px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              background: "rgba(200,169,110,0.15)",
              border: "1px solid rgba(200,169,110,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              overflow: "hidden",
            }}
          >
            <Image
              src="/logo.png"
              alt="Logo"
              width={32}
              height={32}
              style={{ objectFit: "contain", width: "auto", height: "auto" }}
            />
          </div>
          <div>
            <div
              style={{
                color: "white",
                fontWeight: 700,
                fontSize: "0.7rem",
                lineHeight: 1.25,
              }}
            >
              Muhammad Al-Xorazmiy nomidagi
            </div>
            <div
              style={{
                color: "white",
                fontWeight: 700,
                fontSize: "0.85rem",
                lineHeight: 1.2,
                marginTop: 2,
              }}
            >
              TATU akademik litseyi
            </div>
            <div
              style={{
                color: "#c8a96e",
                fontSize: "0.6rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginTop: 2,
              }}
            >
              Admin Panel
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, padding: "16px 12px" }}>
          <div style={{ marginBottom: 8 }}>
            <p
              style={{
                color: "rgba(255,255,255,0.25)",
                fontSize: "0.65rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                padding: "0 8px",
                marginBottom: 8,
              }}
            >
              Boshqaruv
            </p>
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "10px 12px",
                    borderRadius: 10,
                    marginBottom: 2,
                    background: active
                      ? "linear-gradient(135deg, rgba(200,169,110,0.18), rgba(200,169,110,0.08))"
                      : "transparent",
                    border: active
                      ? "1px solid rgba(200,169,110,0.2)"
                      : "1px solid transparent",
                    color: active ? "#c8a96e" : "rgba(255,255,255,0.5)",
                    textDecoration: "none",
                    fontSize: "0.83rem",
                    fontWeight: active ? 700 : 500,
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    if (!active) {
                      (e.currentTarget as HTMLAnchorElement).style.color =
                        "rgba(255,255,255,0.85)";
                      (e.currentTarget as HTMLAnchorElement).style.background =
                        "rgba(255,255,255,0.05)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      (e.currentTarget as HTMLAnchorElement).style.color =
                        "rgba(255,255,255,0.5)";
                      (e.currentTarget as HTMLAnchorElement).style.background =
                        "transparent";
                    }
                  }}
                >
                  <item.icon size={16} style={{ flexShrink: 0 }} />
                  <span style={{ flex: 1 }}>{item.label}</span>
                  {active && (
                    <ChevronRight size={12} style={{ opacity: 0.6 }} />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Divider */}
          <div
            style={{
              height: 1,
              background: "rgba(255,255,255,0.06)",
              margin: "12px 8px",
            }}
          />

          {/* View site link */}
          <Link
            href="/"
            target="_blank"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 12px",
              borderRadius: 10,
              color: "rgba(255,255,255,0.4)",
              textDecoration: "none",
              fontSize: "0.83rem",
              fontWeight: 500,
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color =
                "rgba(255,255,255,0.7)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color =
                "rgba(255,255,255,0.4)";
            }}
          >
            <svg
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            Saytni ko'rish
          </Link>
        </nav>

        {/* User info + logout */}
        <div
          style={{
            padding: "16px 12px",
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 12px",
              borderRadius: 10,
              background: "rgba(255,255,255,0.04)",
              marginBottom: 8,
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: "linear-gradient(135deg,#1a3a6e,#2d5bb5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.8rem",
                fontWeight: 700,
                color: "white",
                flexShrink: 0,
              }}
            >
              {userEmail?.charAt(0).toUpperCase() || "A"}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p
                style={{
                  color: "white",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  margin: 0,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {userEmail || "Admin"}
              </p>
              <p
                style={{
                  color: "rgba(255,255,255,0.35)",
                  fontSize: "0.68rem",
                  margin: 0,
                }}
              >
                Administrator
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "9px 12px",
              borderRadius: 10,
              border: "1px solid rgba(239,68,68,0.2)",
              background: "rgba(239,68,68,0.06)",
              color: "rgba(239,68,68,0.7)",
              fontSize: "0.82rem",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "rgba(239,68,68,0.12)";
              (e.currentTarget as HTMLButtonElement).style.color =
                "rgb(239,68,68)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "rgba(239,68,68,0.06)";
              (e.currentTarget as HTMLButtonElement).style.color =
                "rgba(239,68,68,0.7)";
            }}
          >
            <LogOut size={14} />
            Chiqish
          </button>
        </div>
      </aside>

      {/* DESKTOP SIDEBAR (always visible ≥ 1024px) */}
      <style>{`
        @media (min-width: 1024px) {
          .admin-sidebar {
            left: 0 !important;
            position: sticky !important;
            top: 0 !important;
            height: 100vh !important;
            flex-shrink: 0 !important;
          }
          .admin-main-content {
            margin-left: 0 !important;
          }
        }
        .admin-page {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
      `}</style>

      {/* MAIN CONTENT */}
      <div
        className="admin-main-content admin-page"
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
        }}
      >
        <ToastProvider>
          {/* TOP BAR (mobile) */}
          <div
            style={{
              position: "sticky",
              top: 0,
              zIndex: 30,
              background: "rgba(15,17,23,0.95)",
              backdropFilter: "blur(12px)",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              padding: "12px 20px",
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            <button
              onClick={() => setSidebarOpen(true)}
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 8,
                padding: "6px 8px",
                color: "white",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
              className="admin-mobile-menu-btn"
            >
              <Menu size={18} />
            </button>
            <span
              style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.82rem" }}
            >
              {navItems.find((i) => isActive(i.href))?.label || "Admin Panel"}
            </span>
            <style>{`
            @media (min-width: 1024px) {
              .admin-mobile-menu-btn { display: none !important; }
            }
          `}</style>
          </div>

          {/* PAGE CONTENT */}
          <div
            style={{
              flex: 1,
              padding: "32px 24px",
              maxWidth: 1200,
              width: "100%",
            }}
          >
            {children}
          </div>
        </ToastProvider>
      </div>
    </div>
  );
}
