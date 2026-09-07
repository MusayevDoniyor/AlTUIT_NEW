"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { translations } from "@/lib/i18n";
import {
  ArrowRight,
  GraduationCap,
  Users2,
  TrendingUp,
  Trophy,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  getHeroSlides,
  getStats,
  getNews,
  getLeadership,
  type StatItem,
  type NewsItem,
} from "@/lib/db";
import { useAsyncData } from "@/lib/useAsyncData";
import { useLang } from "@/lib/useLang";
import { PubStatBlock, PubCard } from "@/components/Skeleton";
import { dirColors, dirIcons, dirSubjects } from "@/lib/static";

// ===== COUNTER COMPONENT =====
function Counter({
  to,
  active,
  suffix = "",
}: {
  to: number;
  active: boolean;
  suffix?: string;
}) {
  const [val, setVal] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    if (!active || started.current) return;
    started.current = true;
    const d = 1800;
    const s = Date.now();
    const tick = () => {
      const p = Math.min((Date.now() - s) / d, 1);
      const e = 1 - (1 - p) ** 4;
      setVal(Math.round(e * to));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [to, active]);
  return (
    <>
      {val}
      {suffix}
    </>
  );
}

// ===== HERO SLIDE WRAPPER =====
function HeroSlide({
  slideImage,
  title,
  subtitle,
  t,
  priority,
}: {
  slideImage: string;
  title: string;
  subtitle: string;
  t: Record<string, string>;
  priority: boolean;
}) {
  return (
    <>
      {slideImage && (
        <Image
          src={slideImage}
          alt="Hero background"
          fill
          priority={priority}
          className="object-cover"
          style={{ zIndex: -1 }}
          sizes="100vw"
        />
      )}
      <div
        className="carousel-overlay"
        style={{
          background:
            "linear-gradient(to right, rgba(0,33,71,0.95) 20%, rgba(0,33,71,0.3) 100%)",
        }}
      />
      <div
        className="container-custom"
        style={{
          position: "relative",
          zIndex: 2,
          height: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div style={{ maxWidth: 850 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 28,
                background: "rgba(255,255,255,0.08)",
                backdropFilter: "blur(5px)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: 100,
                padding: "8px 24px",
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#c8a96e",
                }}
              />
              <span
                style={{
                  color: "white",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                {t.hero_badge}
              </span>
            </div>

            <h1
              style={{
                color: "white",
                fontWeight: 900,
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                lineHeight: 1.1,
                marginBottom: 25,
              }}
            >
              {title || t.hero_title}
            </h1>

            <p
              style={{
                color: "rgba(255,255,255,0.85)",
                fontSize: "clamp(1.1rem, 1.5vw, 1.3rem)",
                lineHeight: 1.6,
                marginBottom: 40,
                maxWidth: 650,
              }}
            >
              {subtitle || t.hero_subtitle}
            </p>

            <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
              <Link
                href="/admission"
                className="btn-primary"
                style={{
                  padding: "18px 40px",
                  borderRadius: 12,
                  fontSize: "1rem",
                  background: "#c8a96e",
                  color: "#002147",
                }}
              >
                {t.hero_cta} <ArrowRight size={20} />
              </Link>
              <Link
                href="/about"
                className="btn-outline"
                style={{
                  padding: "18px 40px",
                  borderRadius: 12,
                  fontSize: "1rem",
                  borderColor: "rgba(255,255,255,0.4)",
                  borderWidth: 2,
                }}
              >
                {t.hero_cta2}
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}

// ===== MAIN PAGE =====
export default function Home() {
  const [lang, setLang] = useLang();
  const [current, setCurrent] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [statsInView, setStatsInView] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const transitioningRef = useRef(false);

  const { data: homeData, loading } = useAsyncData(async () => {
    const [slides, stats, news, leadership] = await Promise.all([
      getHeroSlides().catch(() => []),
      getStats().catch(() => []),
      getNews().catch(() => []),
      getLeadership().catch(() => []),
    ]);
    return {
      slides,
      stats,
      news: news.slice(0, 3),
      leadership,
    };
  }, []);
  const dbSlides = homeData?.slides ?? [];
  const dbStats = homeData?.stats ?? [];
  const dbNews = homeData?.news ?? [];
  const dbLeadership = homeData?.leadership ?? [];

  const activeSlides =
    dbSlides.length > 0
      ? dbSlides
      : [{ imageUrl: "", orderIndex: 0, isActive: true }];

  const t = translations[lang] as unknown as Record<string, string>;

  const slide = activeSlides[current];
  const slideImage = slide?.imageUrl || "";
  const slideTitle =
    lang === "uz"
      ? slide?.titleUz || ""
      : lang === "ru"
        ? slide?.titleRu || slide?.titleUz || ""
        : slide?.titleEn || slide?.titleUz || "";
  const slideSubtitle =
    lang === "uz"
      ? slide?.descUz || ""
      : lang === "ru"
        ? slide?.descRu || slide?.descUz || ""
        : slide?.descEn || slide?.descUz || "";

  const prevSlide = activeSlides[prevIndex];
  const prevImage = prevSlide?.imageUrl || "";

  const goTo = useCallback(
    (i: number) => {
      if (transitioningRef.current) return;
      transitioningRef.current = true;
      setPrevIndex(current);
      setCurrent(i);
      setTimeout(() => {
        transitioningRef.current = false;
      }, 600);
    },
    [current],
  );

  const next = useCallback(
    () => goTo((current + 1) % activeSlides.length),
    [goTo, current, activeSlides.length],
  );
  const prev = useCallback(
    () => goTo((current - 1 + activeSlides.length) % activeSlides.length),
    [goTo, current, activeSlides.length],
  );

  useEffect(() => {
    if (activeSlides.length === 0) return;
    const timer = setInterval(
      () => goTo((current + 1) % activeSlides.length),
      7000,
    );
    return () => clearInterval(timer);
  }, [goTo, current, activeSlides.length]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setStatsInView(true);
      },
      { threshold: 0.3 },
    );
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  const dirs = [
    { name: t.dir1_name, desc: t.dir1_desc },
    { name: t.dir2_name, desc: t.dir2_desc },
  ];

  const subjects = dirSubjects[lang];

  const activeStats =
    dbStats.length > 0
      ? dbStats.map((s: StatItem) => {
          let Icon = GraduationCap;
          if (s.key === "teachers") Icon = Users2;
          else if (s.key === "uni_rate") Icon = TrendingUp;
          else if (s.key === "olympiad_winners") Icon = Trophy;
          return {
            icon: Icon,
            value: s.value,
            suffix: s.suffix,
            label:
              lang === "uz" ? s.labelUz : lang === "ru" ? s.labelRu : s.labelEn,
            color: s.color,
          };
        })
      : [];

  const activeNews = dbNews;

  return (
    <main>
      <Navbar lang={lang} onLangChange={setLang} />

      {/* ===== HERO CAROUSEL (crossfade) ===== */}
      <section
        className="carousel-container"
        style={{ height: "100vh", background: "#002147", overflow: "hidden" }}
      >
        {/* Prev slide fading out */}
        <div
          key={"prev-" + prevIndex}
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0,
            animation: "heroFadeOut 0.8s ease forwards",
          }}
        >
          {prevImage && (
            <Image
              src={prevImage}
              alt=""
              fill
              className="object-cover"
              style={{ zIndex: -1 }}
              sizes="100vw"
            />
          )}
          {prevImage && (
            <div
              className="carousel-overlay"
              style={{
                background:
                  "linear-gradient(to right, rgba(0,33,71,0.95) 20%, rgba(0,33,71,0.3) 100%)",
              }}
            />
          )}
        </div>

        {/* Current slide fading in */}
        <div
          key={"cur-" + current}
          style={{
            position: "absolute",
            inset: 0,
            animation: "heroFadeIn 1s ease forwards",
          }}
        >
          <HeroSlide
            slideImage={slideImage}
            title={slideTitle}
            subtitle={slideSubtitle}
            t={t}
            priority={current === 0}
          />
        </div>

        {/* Navigation Indicators & Arrows */}
        <div
          className="container-custom"
          style={{
            position: "absolute",
            bottom: 60,
            left: 0,
            right: 0,
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            {activeSlides.map((_, i: number) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Slayd ${i + 1}`}
                style={{
                  width: current === i ? 40 : 10,
                  height: 10,
                  borderRadius: 5,
                  background: current === i ? "#c8a96e" : "rgba(255,255,255,0.3)",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.4s",
                }}
              />
            ))}
          </div>

          {activeSlides.length > 1 && (
            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={prev}
                aria-label="Oldingi slayd"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.1)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(200,169,110,0.3)";
                  e.currentTarget.style.borderColor = "#c8a96e";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                }}
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={next}
                aria-label="Keyingi slayd"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.1)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(200,169,110,0.3)";
                  e.currentTarget.style.borderColor = "#c8a96e";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                }}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>

        <style jsx>{`
          @media (max-width: 768px) {
            .hidden-mobile {
              display: none !important;
            }
          }
          @keyframes heroFadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          @keyframes heroFadeOut {
            from {
              opacity: 0.8;
            }
            to {
              opacity: 0;
            }
          }
        `}</style>
      </section>

      {/* ===== STATS ===== */}
      <section
        ref={statsRef}
        style={{
          padding: "72px 0",
          background: "linear-gradient(135deg,#f0f4ff,#e8eeff)",
        }}
      >
        <div className="container-custom">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
              gap: 24,
            }}
          >
            {loading ? (
              <div style={{ gridColumn: "1 / -1" }}>
                <PubStatBlock count={4} />
              </div>
            ) : activeStats.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "24px 0",
                  width: "100%",
                  gridColumn: "1 / -1",
                }}
              >
                <p style={{ color: "#6b7280", fontSize: "0.95rem", margin: 0 }}>
                  {lang === "uz"
                    ? "Statistikalar mavjud emas"
                    : lang === "ru"
                      ? "Статистика отсутствует"
                      : "No stats available"}
                </p>
              </div>
            ) : (
              activeStats.map((s, i: number) => (
                <div
                  key={i}
                  style={{ textAlign: "center", padding: "24px 16px" }}
                >
                  <div
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 16,
                      margin: "0 auto 16px",
                      background: `${s.color}18`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: `1px solid ${s.color}28`,
                    }}
                  >
                    <s.icon size={26} color={s.color} />
                  </div>
                  <div
                    style={{
                      fontSize: "2.8rem",
                      fontWeight: 900,
                      color: s.color,
                      lineHeight: 1,
                      marginBottom: 8,
                    }}
                  >
                    <Counter
                      to={s.value}
                      active={statsInView}
                      suffix={s.suffix}
                    />
                  </div>
                  <div
                    style={{
                      color: "#6b7280",
                      fontSize: "0.88rem",
                      fontWeight: 500,
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ===== DIRECTIONS ===== */}
      <section
        id="directions"
        style={{ padding: "96px 0", background: "white" }}
      >
        <div className="container-custom">
          <div
            style={{
              textAlign: "center",
              maxWidth: 620,
              margin: "0 auto 56px",
            }}
          >
            <div
              style={{
                display: "inline-block",
                background: "rgba(26,58,110,0.08)",
                color: "#1a3a6e",
                fontSize: "0.78rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                padding: "5px 14px",
                borderRadius: 50,
                marginBottom: 16,
                textTransform: "uppercase",
              }}
            >
              {lang === "uz"
                ? "Yo'nalishlar"
                : lang === "ru"
                  ? "Направления"
                  : "Directions"}
            </div>
            <h2 className="section-title" style={{ marginBottom: 12 }}>
              {t.dir_title}
            </h2>
            <p className="section-subtitle" style={{ margin: "0 auto" }}>
              {t.dir_subtitle}
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
              gap: 24,
            }}
          >
            {dirs.map((dir, i) => {
              const Icon = dirIcons[i];
              const color = dirColors[i];
              return (
                <div
                  key={i}
                  className="card-hover"
                  style={{
                    borderRadius: 18,
                    overflow: "hidden",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{ background: color.bg, padding: "28px 24px 24px" }}
                  >
                    <div
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 12,
                        background: "rgba(255,255,255,0.12)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: 18,
                      }}
                    >
                      <Icon size={24} color={color.accent} />
                    </div>
                    <h3
                      style={{
                        color: "white",
                        fontWeight: 700,
                        fontSize: "1.05rem",
                        marginBottom: 10,
                        lineHeight: 1.3,
                      }}
                    >
                      {dir.name}
                    </h3>
                    <p
                      style={{
                        color: "rgba(255,255,255,0.7)",
                        fontSize: "0.84rem",
                        lineHeight: 1.65,
                      }}
                    >
                      {dir.desc}
                    </p>
                  </div>
                  <div
                    style={{
                      background: "white",
                      padding: "20px 24px",
                      flex: 1,
                    }}
                  >
                    <p
                      style={{
                        color: "#6b7280",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        marginBottom: 12,
                      }}
                    >
                      {lang === "uz"
                        ? "Asosiy fanlar"
                        : lang === "ru"
                          ? "Основные предметы"
                          : "Core Subjects"}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 8,
                        marginBottom: 18,
                      }}
                    >
                      {subjects[i].map((s, j) => (
                        <span
                          key={j}
                          style={{
                            background: "rgba(26,58,110,0.06)",
                            color: "#1a3a6e",
                            fontSize: "0.78rem",
                            fontWeight: 600,
                            padding: "4px 12px",
                            borderRadius: 50,
                            border: "1px solid rgba(26,58,110,0.1)",
                          }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                    <Link
                      href="/admission"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        color: "#1a3a6e",
                        fontWeight: 600,
                        fontSize: "0.84rem",
                        textDecoration: "none",
                        transition: "gap 0.2s",
                      }}
                    >
                      {lang === "uz"
                        ? "Qabul →"
                        : lang === "ru"
                          ? "Поступление →"
                          : "Apply →"}{" "}
                      <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== LEADERSHIP ===== */}
      <section
        style={{
          padding: "96px 0",
          background: "linear-gradient(135deg,#f0f4ff,#e8eeff)",
        }}
      >
        <div className="container-custom">
          <div
            style={{
              textAlign: "center",
              maxWidth: 620,
              margin: "0 auto 56px",
            }}
          >
            <div
              style={{
                display: "inline-block",
                background: "rgba(26,58,110,0.08)",
                color: "#1a3a6e",
                fontSize: "0.78rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                padding: "5px 14px",
                borderRadius: 50,
                marginBottom: 16,
                textTransform: "uppercase",
              }}
            >
              {lang === "uz"
                ? "Rahbariyat"
                : lang === "ru"
                  ? "Руководство"
                  : "Leadership"}
            </div>
            <h2 className="section-title" style={{ marginBottom: 12 }}>
              {lang === "uz"
                ? "Litsey rahbariyati"
                : lang === "ru"
                  ? "Руководство лицея"
                  : "Lyceum Leadership"}
            </h2>
            <p className="section-subtitle" style={{ margin: "0 auto" }}>
              {lang === "uz"
                ? "Akademik litsey ma'muriyati va rahbarlari"
                : lang === "ru"
                  ? "Администрация и руководители академического лицея"
                  : "Administration and leaders of the academic lyceum"}
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
              gap: 28,
              maxWidth: 1100,
              margin: "0 auto",
            }}
          >
            {loading ? (
              <div style={{ gridColumn: "1 / -1" }}>
                <PubCard />
              </div>
            ) : dbLeadership.length === 0 ? (
              <p
                style={{
                  color: "#6b7280",
                  fontSize: "0.95rem",
                  margin: 0,
                  gridColumn: "1 / -1",
                  textAlign: "center",
                }}
              >
                {lang === "uz"
                  ? "Rahbariyat haqida ma'lumot mavjud emas"
                  : lang === "ru"
                    ? "Информация о руководстве отсутствует"
                    : "No leadership info available"}
              </p>
            ) : (
              dbLeadership.map((m) => {
                const name =
                  lang === "uz"
                    ? m.nameUz
                    : lang === "ru"
                      ? m.nameRu || m.nameUz
                      : m.nameEn || m.nameUz;
                const role =
                  lang === "uz"
                    ? m.roleUz
                    : lang === "ru"
                      ? m.roleRu || m.roleUz
                      : m.roleEn || m.roleUz;
                const initials =
                  m.initials ||
                  name
                    .split(" ")
                    .map((w) => w[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase();
                return (
                  <div
                    key={m.id || name}
                    style={{
                      background: "rgba(255,255,255,0.9)",
                      backdropFilter: "blur(10px)",
                      borderRadius: 20,
                      padding: "36px 28px",
                      boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                      border: "1px solid rgba(255,255,255,0.8)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        width: 140,
                        height: 140,
                        borderRadius: "50%",
                        overflow: "hidden",
                        border: "4px solid #c8a96e",
                        boxShadow: "0 8px 32px rgba(0,33,71,0.15)",
                        marginBottom: 24,
                        flexShrink: 0,
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: `${m.color || "#1a3a6e"}18`,
                      }}
                    >
                      {m.photoUrl ? (
                        <Image
                          src={m.photoUrl}
                          alt={name}
                          fill
                          sizes="140px"
                          style={{ objectFit: "cover" }}
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      ) : (
                        <span
                          style={{
                            fontSize: "2.4rem",
                            fontWeight: 900,
                            color: m.color || "#1a3a6e",
                          }}
                        >
                          {initials}
                        </span>
                      )}
                    </div>
                    <h3
                      style={{
                        color: "#1a1f2e",
                        fontWeight: 800,
                        fontSize: "1.2rem",
                        marginBottom: 6,
                        lineHeight: 1.3,
                      }}
                    >
                      {name}
                    </h3>
                    <p
                      style={{
                        color: "#6b7280",
                        fontSize: "0.9rem",
                        fontWeight: 500,
                        margin: 0,
                      }}
                    >
                      {role}
                    </p>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* ===== NEWS PREVIEW ===== */}
      <section style={{ padding: "96px 0", background: "#f8f9fc" }}>
        <div className="container-custom">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: 48,
              flexWrap: "wrap",
              gap: 16,
            }}
          >
            <div>
              <div
                style={{
                  display: "inline-block",
                  background: "rgba(26,58,110,0.08)",
                  color: "#1a3a6e",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  padding: "5px 14px",
                  borderRadius: 50,
                  marginBottom: 14,
                  textTransform: "uppercase",
                }}
              >
                {lang === "uz"
                  ? "Yangiliklar"
                  : lang === "ru"
                    ? "Новости"
                    : "News"}
              </div>
              <h2 className="section-title">{t.news_title}</h2>
            </div>
            <Link
              href="/news"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                background: "none",
                border: "1.5px solid #1a3a6e",
                borderRadius: 8,
                color: "#1a3a6e",
                fontWeight: 600,
                fontSize: "0.87rem",
                padding: "10px 20px",
                textDecoration: "none",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background =
                  "#1a3a6e";
                (e.currentTarget as HTMLAnchorElement).style.color = "white";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background =
                  "none";
                (e.currentTarget as HTMLAnchorElement).style.color = "#1a3a6e";
              }}
            >
              {t.news_all} <ArrowRight size={15} />
            </Link>
          </div>

          {loading ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: 24,
              }}
            >
              <PubCard />
              <PubCard />
              <PubCard />
            </div>
          ) : activeNews.length === 0 ? (
            <div
              style={{ textAlign: "center", padding: "48px 0", width: "100%" }}
            >
              <p style={{ color: "#6b7280", fontSize: "1rem", margin: 0 }}>
                {lang === "uz"
                  ? "Yangiliklar mavjud emas"
                  : lang === "ru"
                    ? "Новости отсутствуют"
                    : "No news available"}
              </p>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: 24,
              }}
            >
              {activeNews.map((item: NewsItem) => {
                const title =
                  (lang === "uz"
                    ? item.titleUz
                    : lang === "ru"
                      ? item.titleRu
                      : item.titleEn) ?? "";
                const desc =
                  (lang === "uz"
                    ? item.descUz
                    : lang === "ru"
                      ? item.descRu
                      : item.descEn) ?? "";
                const tagStr =
                  typeof item.tag === "string"
                    ? item.tag
                    : item.tag?.[lang] || "";

                return (
                  <Link
                    key={item.id}
                    href={`/news/${item.id}`}
                    className="news-card"
                    style={{
                      cursor: "pointer",
                      textDecoration: "none",
                      display: "block",
                    }}
                  >
                    <div
                      style={{
                        height: 4,
                        background: `linear-gradient(90deg, ${item.color || "#1a3a6e"}, ${item.color || "#1a3a6e"}88)`,
                      }}
                    />
                    {item.imageUrl && (
                      <div
                        style={{
                          position: "relative",
                          width: "100%",
                          height: 160,
                          overflow: "hidden",
                        }}
                      >
                        <Image
                          src={item.imageUrl}
                          alt={title || ""}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                    )}
                    <div style={{ padding: "24px" }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: 16,
                        }}
                      >
                        <span
                          style={{
                            background: `${item.color || "#1a3a6e"}15`,
                            color: item.color || "#1a3a6e",
                            fontSize: "0.74rem",
                            fontWeight: 700,
                            padding: "4px 10px",
                            borderRadius: 50,
                            border: `1px solid ${item.color || "#1a3a6e"}30`,
                          }}
                        >
                          {tagStr}
                        </span>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 5,
                            color: "#9ca3af",
                            fontSize: "0.77rem",
                          }}
                        >
                          <Calendar size={13} />
                          {item.date}
                        </div>
                      </div>
                      <h3
                        style={{
                          color: "#1a1f2e",
                          fontWeight: 700,
                          fontSize: "1rem",
                          lineHeight: 1.45,
                          marginBottom: 12,
                        }}
                      >
                        {title}
                      </h3>
                      <p
                        style={{
                          color: "#6b7280",
                          fontSize: "0.84rem",
                          lineHeight: 1.7,
                          marginBottom: 18,
                        }}
                      >
                        {desc}
                      </p>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                          color: item.color || "#1a3a6e",
                          fontSize: "0.83rem",
                          fontWeight: 600,
                        }}
                      >
                        {t.news_read} <ArrowRight size={14} />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Footer lang={lang} />
    </main>
  );
}
