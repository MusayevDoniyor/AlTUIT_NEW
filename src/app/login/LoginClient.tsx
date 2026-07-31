"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { Eye, EyeOff, LogIn, AlertCircle } from "lucide-react";

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/altuit-dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(true);

  // If already logged in, redirect
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        router.replace(from);
      } else {
        setChecking(false);
      }
    });
  }, [router, from]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      if (
        authError.message.includes("Invalid login credentials") ||
        authError.message.includes("invalid_credentials")
      ) {
        setError("Email yoki parol noto'g'ri. Qaytadan urinib ko'ring.");
      } else if (authError.message.includes("Email not confirmed")) {
        setError("Email tasdiqlangan emas. Iltimos emailingizni tasdiqlang.");
      } else {
        setError("Kirishda xatolik yuz berdi. Internet aloqasini tekshiring.");
      }
      setLoading(false);
      return;
    }

    router.replace(from);
  };

  if (checking) {
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
            width: 40,
            height: 40,
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

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #0a0d14 0%, #0f1117 50%, #141620 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        padding: "20px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background decoration */}
      <div
        style={{
          position: "absolute",
          top: -200,
          right: -200,
          width: 600,
          height: 600,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(26,58,110,0.15) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -150,
          left: -150,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(200,169,110,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          width: "100%",
          maxWidth: 420,
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 24,
          padding: "40px 36px",
          backdropFilter: "blur(20px)",
          boxShadow: "0 40px 80px rgba(0,0,0,0.4)",
          position: "relative",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "rgba(200,169,110,0.12)",
              border: "1px solid rgba(200,169,110,0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px",
              overflow: "hidden",
            }}
          >
            <Image
              src="/logo.png"
              alt="Logo"
              width={48}
              height={48}
              style={{ objectFit: "contain", width: "auto", height: "auto" }}
            />
          </div>
          <h1
            style={{
              color: "white",
              fontWeight: 800,
              fontSize: "1.5rem",
              margin: "0 0 8px",
            }}
          >
            Admin Panel
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.4)",
              fontSize: "0.85rem",
              margin: 0,
            }}
          >
            Al-Xorazmiy Akademik Litseyi
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: "rgba(239,68,68,0.1)",
              border: "1px solid rgba(239,68,68,0.25)",
              borderRadius: 10,
              padding: "12px 14px",
              marginBottom: 20,
            }}
          >
            <AlertCircle size={16} color="#ef4444" style={{ flexShrink: 0 }} />
            <p style={{ color: "#ef4444", fontSize: "0.83rem", margin: 0 }}>
              {error}
            </p>
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: 16 }}
        >
          {/* Email */}
          <div>
            <label
              style={{
                display: "block",
                color: "rgba(255,255,255,0.6)",
                fontSize: "0.8rem",
                fontWeight: 600,
                marginBottom: 8,
              }}
            >
              Email manzil
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email"
              style={{
                width: "100%",
                padding: "12px 16px",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 10,
                color: "white",
                fontSize: "0.9rem",
                outline: "none",
                transition: "border-color 0.2s",
                boxSizing: "border-box",
                fontFamily: "inherit",
              }}
              onFocus={(e) =>
                (e.target.style.borderColor = "rgba(200,169,110,0.5)")
              }
              onBlur={(e) =>
                (e.target.style.borderColor = "rgba(255,255,255,0.1)")
              }
            />
          </div>

          {/* Password */}
          <div>
            <label
              style={{
                display: "block",
                color: "rgba(255,255,255,0.6)",
                fontSize: "0.8rem",
                fontWeight: 600,
                marginBottom: 8,
              }}
            >
              Parol
            </label>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: "100%",
                  padding: "12px 44px 12px 16px",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 10,
                  color: "white",
                  fontSize: "0.9rem",
                  outline: "none",
                  transition: "border-color 0.2s",
                  boxSizing: "border-box",
                  fontFamily: "inherit",
                }}
                onFocus={(e) =>
                  (e.target.style.borderColor = "rgba(200,169,110,0.5)")
                }
                onBlur={(e) =>
                  (e.target.style.borderColor = "rgba(255,255,255,0.1)")
                }
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  color: "rgba(255,255,255,0.4)",
                  cursor: "pointer",
                  padding: 4,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              padding: "14px",
              background: loading
                ? "rgba(200,169,110,0.4)"
                : "linear-gradient(135deg, #c8a96e, #dfc08a)",
              border: "none",
              borderRadius: 10,
              color: loading ? "rgba(255,255,255,0.6)" : "#0f2347",
              fontWeight: 700,
              fontSize: "0.95rem",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "all 0.3s",
              fontFamily: "inherit",
              marginTop: 4,
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                (e.currentTarget as HTMLButtonElement).style.transform =
                  "translateY(-1px)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow =
                  "0 8px 24px rgba(200,169,110,0.3)";
              }
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = "none";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
            }}
          >
            {loading ? (
              <>
                <div
                  style={{
                    width: 16,
                    height: 16,
                    border: "2px solid rgba(0,0,0,0.3)",
                    borderTopColor: "#0f2347",
                    borderRadius: "50%",
                    animation: "spin 0.8s linear infinite",
                  }}
                />
                Kirish...
              </>
            ) : (
              <>
                <LogIn size={16} />
                Kirish
              </>
            )}
          </button>
        </form>

        <p
          style={{
            textAlign: "center",
            color: "rgba(255,255,255,0.2)",
            fontSize: "0.75rem",
            marginTop: 24,
            marginBottom: 0,
          }}
        >
          Faqat vakolatli foydalanuvchilar uchun
        </p>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); }}
        input::placeholder { color: rgba(255,255,255,0.25); }
      `}</style>
    </div>
  );
}

export default function LoginClient() {
  return (
    <Suspense
      fallback={
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
              width: 40,
              height: 40,
              border: "3px solid rgba(200,169,110,0.2)",
              borderTopColor: "#c8a96e",
              borderRadius: "50%",
              animation: "spin 0.8s linear infinite",
            }}
          />
          <style>{`@keyframes spin { to { transform: rotate(360deg); }}`}</style>
        </div>
      }
    >
      <AdminLoginForm />
    </Suspense>
  );
}
