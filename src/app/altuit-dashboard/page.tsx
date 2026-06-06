"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import {
  Newspaper,
  Users,
  GraduationCap,
  Trophy,
  ImageIcon,
  Sliders,
  TrendingUp,
  ArrowRight,
  LayoutDashboard,
} from "lucide-react";
import { siteConfig } from "@/lib/config";

interface Counts {
  news: number;
  leadership: number;
  teachers: number;
  achievements: number;
  gallery: number;
  heroSlides: number;
}

const quickLinks = [
  {
    label: "Yangilik qo'shish",
    href: "/altuit-dashboard/news",
    icon: Newspaper,
    color: "#1a3a6e",
    desc: "Yangiliklar bo'limini boshqarish",
  },
  {
    label: "Rahbariyat",
    href: "/altuit-dashboard/leadership",
    icon: Users,
    color: "#2d5bb5",
    desc: "Rahbariyat ma'lumotlarini yangilash",
  },
  {
    label: "Pedagog xodimlar",
    href: "/altuit-dashboard/teachers",
    icon: GraduationCap,
    color: "#1d7a55",
    desc: "O'qituvchilar ro'yxatini boshqarish",
  },
  {
    label: "Yutuqlar",
    href: "/altuit-dashboard/achievements",
    icon: Trophy,
    color: "#6032bf",
    desc: "Yutuqlarni qo'shish va o'chirish",
  },
  {
    label: "Hero slider",
    href: "/altuit-dashboard/hero",
    icon: Sliders,
    color: "#b91c1c",
    desc: "Bosh sahifa sliderini boshqarish",
  },
];

export default function AdminDashboard() {
  const [counts, setCounts] = useState<Counts>({
    news: 0,
    leadership: 0,
    teachers: 0,
    achievements: 0,
    gallery: 0,
    heroSlides: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCounts() {
      try {
        const tables = [
          "news",
          "leadership",
          "teachers",
          "achievements",
          "gallery",
          "hero_slides",
        ];
        const results = await Promise.all(
          tables.map((t) =>
            supabase.from(t).select("id", { count: "exact", head: true }),
          ),
        );
        setCounts({
          news: results[0].count ?? 0,
          leadership: results[1].count ?? 0,
          teachers: results[2].count ?? 0,
          achievements: results[3].count ?? 0,
          gallery: results[4].count ?? 0,
          heroSlides: results[5].count ?? 0,
        });
      } catch (e) {
        console.error("Failed to load counts:", e);
      } finally {
        setLoading(false);
      }
    }
    loadCounts();
  }, []);

  const stats = [
    {
      label: "Yangiliklar",
      value: counts.news,
      icon: Newspaper,
      color: "#1a3a6e",
      href: "/altuit-dashboard/news",
    },
    {
      label: "Rahbariyat",
      value: counts.leadership,
      icon: Users,
      color: "#2d5bb5",
      href: "/altuit-dashboard/leadership",
    },
    {
      label: "O'qituvchilar",
      value: counts.teachers,
      icon: GraduationCap,
      color: "#1d7a55",
      href: "/altuit-dashboard/teachers",
    },
    {
      label: "Yutuqlar",
      value: counts.achievements,
      icon: Trophy,
      color: "#c8a96e",
      href: "/altuit-dashboard/achievements",
    },
    {
      label: "Galereya rasmlari",
      value: counts.gallery,
      icon: ImageIcon,
      color: "#6032bf",
      href: "/altuit-dashboard/gallery",
    },
    {
      label: "Hero slaydlar",
      value: counts.heroSlides,
      icon: Sliders,
      color: "#b91c1c",
      href: "/altuit-dashboard/hero",
    },
  ];

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 8,
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: "rgba(200,169,110,0.15)",
              border: "1px solid rgba(200,169,110,0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LayoutDashboard size={18} color="#c8a96e" />
          </div>
          <h1
            style={{
              color: "white",
              fontWeight: 800,
              fontSize: "1.5rem",
              margin: 0,
            }}
          >
            Dashboard
          </h1>
        </div>
        <p
          style={{
            color: "rgba(255,255,255,0.4)",
            fontSize: "0.875rem",
            margin: 0,
          }}
        >
          Al-Xorazmiy Akademik Litseyi — Boshqaruv paneli
        </p>
      </div>

      {/* Stats cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
          gap: 16,
          marginBottom: 32,
        }}
      >
        {stats.map((s) => (
          <Link key={s.label} href={s.href} style={{ textDecoration: "none" }}>
            <div
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 16,
                padding: "20px 16px",
                transition: "all 0.2s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.background =
                  "rgba(255,255,255,0.07)";
                (e.currentTarget as HTMLDivElement).style.borderColor =
                  `${s.color}33`;
                (e.currentTarget as HTMLDivElement).style.transform =
                  "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.background =
                  "rgba(255,255,255,0.04)";
                (e.currentTarget as HTMLDivElement).style.borderColor =
                  "rgba(255,255,255,0.07)";
                (e.currentTarget as HTMLDivElement).style.transform = "none";
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: `${s.color}20`,
                  border: `1px solid ${s.color}30`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 14,
                }}
              >
                <s.icon size={18} color={s.color} />
              </div>
              <div
                style={{
                  color: "white",
                  fontWeight: 800,
                  fontSize: "1.8rem",
                  lineHeight: 1,
                  marginBottom: 6,
                }}
              >
                {loading ? "—" : s.value}
              </div>
              <div
                style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.78rem" }}
              >
                {s.label}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div style={{ marginBottom: 32 }}>
        <h2
          style={{
            color: "rgba(255,255,255,0.6)",
            fontSize: "0.75rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            marginBottom: 16,
          }}
        >
          Tezkor harakatlar
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: 12,
          }}
        >
          {quickLinks.map((ql) => (
            <Link
              key={ql.href}
              href={ql.href}
              style={{ textDecoration: "none" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 14,
                  padding: "16px 18px",
                  transition: "all 0.2s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.background =
                    "rgba(255,255,255,0.06)";
                  (e.currentTarget as HTMLDivElement).style.borderColor =
                    `${ql.color}33`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.background =
                    "rgba(255,255,255,0.03)";
                  (e.currentTarget as HTMLDivElement).style.borderColor =
                    "rgba(255,255,255,0.07)";
                }}
              >
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 10,
                    background: `${ql.color}18`,
                    border: `1px solid ${ql.color}25`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <ql.icon size={18} color={ql.color} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      color: "white",
                      fontWeight: 600,
                      fontSize: "0.88rem",
                      marginBottom: 2,
                    }}
                  >
                    {ql.label}
                  </div>
                  <div
                    style={{
                      color: "rgba(255,255,255,0.35)",
                      fontSize: "0.75rem",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {ql.desc}
                  </div>
                </div>
                <ArrowRight
                  size={14}
                  color="rgba(255,255,255,0.3)"
                  style={{ flexShrink: 0 }}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Site link banner */}
      <div
        style={{
          background:
            "linear-gradient(135deg, rgba(26,58,110,0.3), rgba(45,91,181,0.2))",
          border: "1px solid rgba(26,58,110,0.4)",
          borderRadius: 16,
          padding: "20px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <TrendingUp size={20} color="#c8a96e" />
          <div>
            <p
              style={{
                color: "white",
                fontWeight: 700,
                fontSize: "0.95rem",
                margin: 0,
              }}
            >
              Saytni ko'rish
            </p>
            <p
              style={{
                color: "rgba(255,255,255,0.4)",
                fontSize: "0.8rem",
                margin: 0,
              }}
            >
              Hozirgi holat va o'zgarishlarni tekshirish
            </p>
          </div>
        </div>
        <Link
          href="/"
          target="_blank"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 18px",
            background: "rgba(200,169,110,0.15)",
            border: "1px solid rgba(200,169,110,0.3)",
            borderRadius: 10,
            color: "#c8a96e",
            fontWeight: 600,
            fontSize: "0.85rem",
            textDecoration: "none",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background =
              "rgba(200,169,110,0.25)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background =
              "rgba(200,169,110,0.15)";
          }}
        >
          {new URL(siteConfig.url).hostname}
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
