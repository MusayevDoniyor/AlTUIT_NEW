"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { translations, type Lang } from "@/lib/i18n";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  GraduationCap,
  Users2,
  TrendingUp,
  Trophy,
  Calculator,
  Globe,
  Microscope,
  BookOpen,
  Calendar,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  getHeroSlides,
  getStats,
  getNews,
  type StatItem,
  type HeroSlideItem,
  type NewsItem,
} from "@/lib/db";
import { useAsyncData } from "@/lib/useAsyncData";
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
  t,
  priority,
}: {
  slideImage: string;
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
              {t.hero_title}
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
              {t.hero_subtitle}
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
  const [lang, setLang] = useState<Lang>("uz");
  const [current, setCurrent] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [statsInView, setStatsInView] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const transitioningRef = useRef(false);

  const { data: homeData, loading } = useAsyncData(async () => {
    const [slides, stats, news] = await Promise.all([
      getHeroSlides(),
      getStats(),
      getNews(),
    ]);
    return {
      slides,
      stats,
      news: news.slice(0, 3),
    };
  }, []);
  const dbSlides = homeData?.slides ?? [];
  const dbStats = homeData?.stats ?? [];
  const dbNews = homeData?.news ?? [];

  const activeSlides = dbSlides.length > 0 ? dbSlides : [{ imageUrl: "" }];

  const t = translations[lang] as unknown as Record<string, string>;

  const slide = activeSlides[current];
  const slideImage = slide?.imageUrl || "";

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
      }, 1200);
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
            t={t}
            priority={current === 0}
          />
        </div>

        {/* Navigation Indicators */}
        <div
          className="container-custom"
          style={{
            position: "absolute",
            bottom: 60,
            left: 0,
            right: 0,
            zIndex: 10,
            display: "flex",
            gap: 12,
          }}
        >
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

      {/* ===== YEARLY STATISTICS ===== */}
      <section
        style={{
          padding: "96px 0",
          background: "linear-gradient(135deg, #002147, #003366)",
          color: "white",
        }}
      >
        <div className="container-custom">
          <div
            style={{
              textAlign: "center",
              maxWidth: 800,
              margin: "0 auto 64px",
            }}
          >
            <h2
              style={{ fontSize: "2.2rem", fontWeight: 800, marginBottom: 16 }}
            >
              {lang === "uz"
                ? "3 yillik o'quv statistikasi"
                : lang === "ru"
                  ? "3-летняя статистика обучения"
                  : "3-Year Educational Statistics"}
            </h2>
            <div
              style={{
                width: 80,
                height: 4,
                background: "#c8a96e",
                margin: "0 auto",
              }}
            ></div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 32,
            }}
          >
            {[
              { year: 2021, perc: 81, grad: 239, uni: 19 },
              { year: 2022, perc: 85, grad: 211, uni: 190 },
              { year: 2023, perc: 90, grad: 390, uni: 370 },
            ].map((stat, idx) => (
              <motion.div
                key={stat.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                style={{
                  background: "rgba(255,255,255,0.05)",
                  backdropFilter: "blur(10px)",
                  borderRadius: 24,
                  padding: "40px 32px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: -20,
                    right: -10,
                    fontSize: "6rem",
                    fontWeight: 900,
                    color: "rgba(255,255,255,0.03)",
                    zIndex: 0,
                  }}
                >
                  {stat.year}
                </div>

                <h3
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: 800,
                    color: "#c8a96e",
                    marginBottom: 32,
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  {stat.year}-yil
                </h3>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 24,
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  <div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: 8,
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.9rem",
                          color: "rgba(255,255,255,0.6)",
                        }}
                      >
                        {lang === "uz"
                          ? "OTMga kirish ko'rsatkichi"
                          : lang === "ru"
                            ? "Показатель поступления в ВУЗ"
                            : "Admission Rate"}
                      </span>
                      <span style={{ fontWeight: 800, color: "#c8a96e" }}>
                        {stat.perc}%
                      </span>
                    </div>
                    <div
                      style={{
                        height: 8,
                        background: "rgba(255,255,255,0.1)",
                        borderRadius: 10,
                      }}
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${stat.perc}%` }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        style={{
                          height: "100%",
                          background:
                            "linear-gradient(90deg, #c8a96e, #dfc08a)",
                          borderRadius: 10,
                        }}
                      />
                    </div>
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 20,
                      paddingTop: 10,
                    }}
                  >
                    <div
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        padding: "16px",
                        borderRadius: 16,
                      }}
                    >
                      <p
                        style={{
                          fontSize: "0.75rem",
                          color: "rgba(255,255,255,0.5)",
                          marginBottom: 4,
                        }}
                      >
                        {lang === "uz"
                          ? "Bitiruvchilar"
                          : lang === "ru"
                            ? "Выпускников"
                            : "Graduates"}
                      </p>
                      <p style={{ fontSize: "1.3rem", fontWeight: 800 }}>
                        {stat.grad}
                      </p>
                    </div>
                    <div
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        padding: "16px",
                        borderRadius: 16,
                      }}
                    >
                      <p
                        style={{
                          fontSize: "0.75rem",
                          color: "rgba(255,255,255,0.5)",
                          marginBottom: 4,
                        }}
                      >
                        {lang === "uz"
                          ? "OTMga kirganlar"
                          : lang === "ru"
                            ? "Поступили в ВУЗ"
                            : "Admitted"}
                      </p>
                      <p
                        style={{
                          fontSize: "1.3rem",
                          fontWeight: 800,
                          color: "#c8a96e",
                        }}
                      >
                        {stat.uni}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
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
              maxWidth: 500,
              margin: "0 auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: 180,
                height: 180,
                borderRadius: "50%",
                overflow: "hidden",
                border: "4px solid #c8a96e",
                boxShadow: "0 8px 32px rgba(0,33,71,0.15)",
                marginBottom: 28,
                flexShrink: 0,
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#1a3a6e15",
              }}
            >
              <Image
                src="/image.png"
                alt="Abdiyev Nosir Raximovich"
                width={180}
                height={180}
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                }}
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = "none";
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = `<span style="font-size:3.5rem;font-weight:900;color:#1a3a6e;">AN</span>`;
                  }
                }}
              />
            </div>

            <div
              style={{
                background: "rgba(255,255,255,0.9)",
                backdropFilter: "blur(10px)",
                borderRadius: 20,
                padding: "32px 40px",
                boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                border: "1px solid rgba(255,255,255,0.8)",
                width: "100%",
              }}
            >
              <h3
                style={{
                  color: "#1a1f2e",
                  fontWeight: 800,
                  fontSize: "1.35rem",
                  marginBottom: 6,
                  lineHeight: 1.3,
                }}
              >
                Abdiyev Nosir Raximovich
              </h3>
              <p
                style={{
                  color: "#6b7280",
                  fontSize: "0.92rem",
                  fontWeight: 500,
                  margin: 0,
                }}
              >
                {lang === "uz"
                  ? "Akademik litsey direktori"
                  : lang === "ru"
                    ? "Директор академического лицея"
                    : "Director of Academic Lyceum"}
              </p>
            </div>
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
