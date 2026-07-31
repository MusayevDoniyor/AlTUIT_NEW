"use client";

import { useState } from "react";
import Link from "next/link";
import { translations } from "@/lib/i18n";
import { useLang } from "@/lib/useLang";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaRegClock,
  FaPaperPlane,
} from "react-icons/fa";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MaintenanceBanner from "@/components/MaintenanceBanner";
import { useSiteSettings } from "@/lib/site-settings-context";

export default function ContactClient() {
  const [lang, setLang] = useLang();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    telegram: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const t = translations[lang];
  const { maintenanceMode } = useSiteSettings();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;

    setSending(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Xatolik yuz berdi");
      }

      setSent(true);
      setForm({ name: "", phone: "", telegram: "", message: "" });
      setTimeout(() => setSent(false), 5000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Xatolik yuz berdi";
      setError(msg);
      setTimeout(() => setError(""), 5000);
    } finally {
      setSending(false);
    }
  };

  const info = [
    {
      icon: FaMapMarkerAlt,
      label: t.contact_address,
      value: t.contact_address_val,
      color: "#1a3a6e",
    },
    {
      icon: FaPhoneAlt,
      label: t.contact_phone,
      value: t.contact_phone_val,
      color: "#2d5bb5",
      href: "tel:+998712350369",
    },
    {
      icon: FaPhoneAlt,
      label: t.contact_phone_mobile,
      value: t.contact_phone_mobile_val,
      color: "#6032bf",
      href: "tel:+998931033245",
    },
    {
      icon: FaEnvelope,
      label: t.contact_email,
      value: t.contact_email_val,
      color: "#1d7a55",
      href: "mailto:info@tatual.uz",
    },
    {
      icon: FaRegClock,
      label: t.contact_schedule,
      value: t.contact_schedule_val,
      color: "#c8a96e",
    },
  ];

  return (
    <main>
      <Navbar lang={lang} onLangChange={setLang} />

      {/* PAGE BANNER */}
      <div className="page-banner" style={{ paddingTop: 140 }}>
        <div
          className="container-custom"
          style={{ position: "relative", zIndex: 1 }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 16,
              fontSize: "0.8rem",
              color: "rgba(255,255,255,0.6)",
            }}
          >
            <Link
              href="/"
              style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}
            >
              {t.nav_home}
            </Link>
            <span>/</span>
            <span style={{ color: "#c8a96e" }}>{t.nav_contact}</span>
          </div>
          <h1
            style={{
              color: "white",
              fontWeight: 900,
              fontSize: "clamp(2rem,5vw,3rem)",
              marginBottom: 12,
            }}
          >
            {t.contact_title}
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.7)",
              fontSize: "1rem",
              maxWidth: 600,
            }}
          >
            {lang === "uz"
              ? "Har qanday savol yoki murojaat uchun biz bilan bog'laning"
              : lang === "ru"
                ? "Свяжитесь с нами по любому вопросу"
                : "Contact us for any questions or inquiries"}
          </p>
        </div>
      </div>

      {/* ===== CONTACT INFO + FORM ===== */}
      <section style={{ padding: "96px 0", background: "#f8f9fc" }}>
        <div className="container-custom">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
              gap: 40,
            }}
          >
            {/* Info cards */}
            <div>
              <h2
                style={{
                  color: "#1a3a6e",
                  fontWeight: 800,
                  fontSize: "1.3rem",
                  marginBottom: 28,
                }}
              >
                {lang === "uz"
                  ? "Aloqa ma'lumotlari"
                  : lang === "ru"
                    ? "Контактные данные"
                    : "Contact Details"}
              </h2>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  marginBottom: 36,
                }}
              >
                {info.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      gap: 16,
                      alignItems: "flex-start",
                      background: "white",
                      borderRadius: 14,
                      padding: "18px 20px",
                      boxShadow: "0 4px 16px rgba(26,58,110,0.06)",
                      border: "1px solid rgba(26,58,110,0.06)",
                    }}
                  >
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 10,
                        flexShrink: 0,
                        background: `${item.color}15`,
                        border: `1px solid ${item.color}25`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <item.icon size={20} color={item.color} />
                    </div>
                    <div>
                      <p
                        style={{
                          color: "#9ca3af",
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          marginBottom: 4,
                        }}
                      >
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          style={{
                            color: "#1a1f2e",
                            fontWeight: 600,
                            fontSize: "0.88rem",
                            lineHeight: 1.5,
                            textDecoration: "none",
                          }}
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p
                          style={{
                            color: "#1a1f2e",
                            fontWeight: 600,
                            fontSize: "0.88rem",
                            lineHeight: 1.5,
                          }}
                        >
                          {item.value}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Map embed */}
              <div
                style={{
                  borderRadius: 16,
                  overflow: "hidden",
                  height: 240,
                  background: "linear-gradient(135deg,#1a3a6e,#2d5bb5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid rgba(26,58,110,0.1)",
                  position: "relative",
                  cursor: "pointer",
                }}
                onClick={() =>
                  window.open(
                    "https://maps.google.com/?q=Tashkent+Bogishamol+112",
                    "_blank",
                  )
                }
              >
                <div
                  style={{
                    textAlign: "center",
                    color: "rgba(255,255,255,0.9)",
                    padding: "24px",
                  }}
                >
                  <FaMapMarkerAlt
                    size={40}
                    style={{ marginBottom: 12, opacity: 0.8 }}
                  />
                  <p
                    style={{
                      fontSize: "0.9rem",
                      fontWeight: 700,
                      marginBottom: 4,
                    }}
                  >
                    {lang === "uz"
                      ? "Toshkent, Yunusobod tumani"
                      : lang === "ru"
                        ? "Ташкент, Юнусабадский район"
                        : "Tashkent, Yunusabad"}
                  </p>
                  <p
                    style={{
                      fontSize: "0.8rem",
                      opacity: 0.7,
                      marginBottom: 14,
                    }}
                  >
                    Bog'ishamol ko'chasi, 112
                  </p>
                  <span
                    style={{
                      background: "rgba(200,169,110,0.3)",
                      border: "1px solid rgba(200,169,110,0.5)",
                      color: "#c8a96e",
                      fontSize: "0.78rem",
                      fontWeight: 700,
                      padding: "6px 16px",
                      borderRadius: 50,
                    }}
                  >
                    {lang === "uz"
                      ? "Xaritada ko'rish →"
                      : lang === "ru"
                        ? "Открыть на карте →"
                        : "View on map →"}
                  </span>
                </div>
              </div>
            </div>

            {/* Contact form */}
            <div
              style={{
                background: "white",
                borderRadius: 20,
                padding: "40px 36px",
                boxShadow: "0 8px 40px rgba(26,58,110,0.08)",
                border: "1px solid rgba(26,58,110,0.07)",
              }}
            >
              {maintenanceMode && (
                <div style={{ marginBottom: 20 }}>
                  <MaintenanceBanner lang={lang} compact />
                </div>
              )}
              <h3
                style={{
                  color: "#1a1f2e",
                  fontWeight: 700,
                  fontSize: "1.2rem",
                  marginBottom: 8,
                }}
              >
                ✉️ {t.contact_send}
              </h3>
              <p
                style={{
                  color: "#6b7280",
                  fontSize: "0.85rem",
                  marginBottom: 28,
                }}
              >
                {maintenanceMode
                  ? lang === "uz"
                    ? "Sayt hozir yangilanmoqda. Murojaatingiz qabul qilinadi, lekin javob biroz kechikishi mumkin."
                    : lang === "ru"
                      ? "Сайт обновляется. Ваше обращение будет принято, но ответ может прийти с задержкой."
                      : "The site is being updated. Your message will be received, but a reply may be delayed."
                  : lang === "uz"
                    ? "Xabaringizga 48 soat ichida javob beramiz"
                    : lang === "ru"
                      ? "Мы ответим на ваше сообщение в течение 48 часов"
                      : "We will respond to your message within 48 hours"}
              </p>

              <form
                onSubmit={handleSubmit}
                style={{ display: "flex", flexDirection: "column", gap: 18 }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 16,
                  }}
                >
                  <div>
                    <label
                      style={{
                        display: "block",
                        color: "#374151",
                        fontSize: "0.84rem",
                        fontWeight: 600,
                        marginBottom: 8,
                      }}
                    >
                      {t.contact_name}
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, name: e.target.value }))
                      }
                      placeholder={
                        lang === "uz"
                          ? "Ismingiz"
                          : lang === "ru"
                            ? "Ваше имя"
                            : "Your name"
                      }
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        borderRadius: 10,
                        border: "1.5px solid #e5e7eb",
                        fontSize: "0.9rem",
                        outline: "none",
                        transition: "border-color 0.2s",
                        boxSizing: "border-box",
                        fontFamily: "Inter, sans-serif",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "#1a3a6e")}
                      onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                    />
                  </div>
                  <div>
                    <label
                      style={{
                        display: "block",
                        color: "#374151",
                        fontSize: "0.84rem",
                        fontWeight: 600,
                        marginBottom: 8,
                      }}
                    >
                      {lang === "uz"
                        ? "Telefon raqamingiz"
                        : lang === "ru"
                          ? "Номер телефона"
                          : "Phone number"}
                    </label>
                    <input
                      type="text"
                      required
                      value={form.phone}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, phone: e.target.value }))
                      }
                      placeholder="+998 (90) 123-45-67"
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        borderRadius: 10,
                        border: "1.5px solid #e5e7eb",
                        fontSize: "0.9rem",
                        outline: "none",
                        transition: "border-color 0.2s",
                        boxSizing: "border-box",
                        fontFamily: "Inter, sans-serif",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "#1a3a6e")}
                      onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                    />
                  </div>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 16,
                  }}
                >
                  <div>
                    <label
                      style={{
                        display: "block",
                        color: "#374151",
                        fontSize: "0.84rem",
                        fontWeight: 600,
                        marginBottom: 8,
                      }}
                    >
                      {lang === "uz"
                        ? "Telegram (ixtiyoriy)"
                        : lang === "ru"
                          ? "Telegram (опция)"
                          : "Telegram (optional)"}
                    </label>
                    <input
                      type="text"
                      value={form.telegram}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, telegram: e.target.value }))
                      }
                      placeholder="@username"
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        borderRadius: 10,
                        border: "1.5px solid #e5e7eb",
                        fontSize: "0.9rem",
                        outline: "none",
                        transition: "border-color 0.2s",
                        boxSizing: "border-box",
                        fontFamily: "Inter, sans-serif",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "#1a3a6e")}
                      onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                    />
                  </div>
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      color: "#374151",
                      fontSize: "0.84rem",
                      fontWeight: 600,
                      marginBottom: 8,
                    }}
                  >
                    {t.contact_msg}
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, message: e.target.value }))
                    }
                    placeholder={
                      lang === "uz"
                        ? "Xabaringizni yozing..."
                        : lang === "ru"
                          ? "Напишите ваше сообщение..."
                          : "Write your message..."
                    }
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      borderRadius: 10,
                      border: "1.5px solid #e5e7eb",
                      fontSize: "0.9rem",
                      outline: "none",
                      transition: "border-color 0.2s",
                      boxSizing: "border-box",
                      resize: "vertical",
                      fontFamily: "Inter, sans-serif",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#1a3a6e")}
                    onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                  />
                </div>

                <button
                  type="submit"
                  disabled={sent || sending}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    padding: "15px",
                    borderRadius: 10,
                    border: "none",
                    cursor: sent || sending ? "default" : "pointer",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    fontFamily: "Inter, sans-serif",
                    background: sent
                      ? "linear-gradient(135deg,#1d7a55,#134e3a)"
                      : error
                        ? "linear-gradient(135deg,#b91c1c,#991b1b)"
                        : "linear-gradient(135deg,#1a3a6e,#2d5bb5)",
                    color: "white",
                    transition: "all 0.3s ease",
                    opacity: sending ? 0.7 : 1,
                  }}
                  onMouseEnter={(e) => {
                    if (!sent && !sending)
                      (e.currentTarget as HTMLButtonElement).style.transform =
                        "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.transform =
                      "none";
                  }}
                >
                  {sent ? (
                    <>
                      ✓{" "}
                      {lang === "uz"
                        ? "Yuborildi!"
                        : lang === "ru"
                          ? "Отправлено!"
                          : "Sent!"}
                    </>
                  ) : sending ? (
                    <>
                      {lang === "uz"
                        ? "Yuborilmoqda..."
                        : lang === "ru"
                          ? "Отправка..."
                          : "Sending..."}
                    </>
                  ) : (
                    <>
                      <FaPaperPlane size={16} /> {t.contact_submit}
                    </>
                  )}
                </button>

                {error && (
                  <div
                    style={{
                      background: "rgba(185,28,28,0.08)",
                      border: "1px solid rgba(185,28,28,0.2)",
                      borderRadius: 10,
                      padding: "12px 16px",
                      color: "#b91c1c",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      textAlign: "center",
                    }}
                  >
                    ⚠️ {error}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer lang={lang} />
    </main>
  );
}
