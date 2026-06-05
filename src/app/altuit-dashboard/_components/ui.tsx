import React, { CSSProperties } from "react";

// ─── Colors ──────────────────────────────────────────────────
export const C = {
  bg: "#0f1117",
  surface: "rgba(255,255,255,0.04)",
  surfaceHover: "rgba(255,255,255,0.07)",
  border: "rgba(255,255,255,0.07)",
  borderFocus: "rgba(200,169,110,0.5)",
  text: "white",
  textMuted: "rgba(255,255,255,0.45)",
  textDim: "rgba(255,255,255,0.25)",
  gold: "#c8a96e",
  goldLight: "rgba(200,169,110,0.15)",
  goldBorder: "rgba(200,169,110,0.25)",
  danger: "#ef4444",
  dangerBg: "rgba(239,68,68,0.1)",
  dangerBorder: "rgba(239,68,68,0.25)",
  success: "#22c55e",
  successBg: "rgba(34,197,94,0.1)",
  successBorder: "rgba(34,197,94,0.25)",
};

// ─── Page Header ─────────────────────────────────────────────
export function PageHeader({
  title,
  description,
  icon,
  action,
}: {
  title: string;
  description?: string;
  icon: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 16,
        marginBottom: 28,
        flexWrap: "wrap",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: C.goldLight,
            border: `1px solid ${C.goldBorder}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {icon}
        </div>
        <div>
          <h1
            style={{
              color: C.text,
              fontWeight: 800,
              fontSize: "1.4rem",
              margin: 0,
            }}
          >
            {title}
          </h1>
          {description && (
            <p style={{ color: C.textMuted, fontSize: "0.8rem", margin: 0 }}>
              {description}
            </p>
          )}
        </div>
      </div>
      {action}
    </div>
  );
}

// ─── Card ─────────────────────────────────────────────────────
export function Card({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        background: C.surface,
        border: `1px solid ${C.border}`,
        borderRadius: 16,
        overflow: "hidden",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ─── Input ────────────────────────────────────────────────────
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}
export function Input({ label, style, ...props }: InputProps) {
  return (
    <div>
      {label && (
        <label
          style={{
            display: "block",
            color: C.textMuted,
            fontSize: "0.78rem",
            fontWeight: 600,
            marginBottom: 6,
          }}
        >
          {label}
        </label>
      )}
      <input
        {...props}
        style={{
          width: "100%",
          padding: "10px 14px",
          background: "rgba(255,255,255,0.05)",
          border: `1px solid ${C.border}`,
          borderRadius: 10,
          color: C.text,
          fontSize: "0.88rem",
          outline: "none",
          transition: "border-color 0.2s",
          boxSizing: "border-box",
          fontFamily: "inherit",
          ...style,
        }}
        onFocus={(e) => {
          e.target.style.borderColor = C.borderFocus;
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          e.target.style.borderColor = C.border;
          props.onBlur?.(e);
        }}
      />
    </div>
  );
}

// ─── Textarea ─────────────────────────────────────────────────
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}
export function Textarea({ label, style, ...props }: TextareaProps) {
  return (
    <div>
      {label && (
        <label
          style={{
            display: "block",
            color: C.textMuted,
            fontSize: "0.78rem",
            fontWeight: 600,
            marginBottom: 6,
          }}
        >
          {label}
        </label>
      )}
      <textarea
        {...props}
        style={{
          width: "100%",
          padding: "10px 14px",
          background: "rgba(255,255,255,0.05)",
          border: `1px solid ${C.border}`,
          borderRadius: 10,
          color: C.text,
          fontSize: "0.88rem",
          outline: "none",
          transition: "border-color 0.2s",
          boxSizing: "border-box",
          fontFamily: "inherit",
          resize: "vertical",
          minHeight: 90,
          ...style,
        }}
        onFocus={(e) => {
          e.target.style.borderColor = C.borderFocus;
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          e.target.style.borderColor = C.border;
          props.onBlur?.(e);
        }}
      />
    </div>
  );
}

// ─── Button ───────────────────────────────────────────────────
type Variant = "primary" | "danger" | "ghost" | "outline";
export function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled,
  style,
  loading,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: Variant;
  disabled?: boolean;
  style?: CSSProperties;
  loading?: boolean;
}) {
  const styles: Record<Variant, CSSProperties> = {
    primary: {
      background: "linear-gradient(135deg,#c8a96e,#dfc08a)",
      color: "#0f2347",
      border: "none",
      fontWeight: 700,
    },
    danger: {
      background: C.dangerBg,
      color: C.danger,
      border: `1px solid ${C.dangerBorder}`,
      fontWeight: 600,
    },
    ghost: {
      background: "transparent",
      color: C.textMuted,
      border: `1px solid ${C.border}`,
      fontWeight: 500,
    },
    outline: {
      background: C.goldLight,
      color: C.gold,
      border: `1px solid ${C.goldBorder}`,
      fontWeight: 600,
    },
  };
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "9px 16px",
        borderRadius: 10,
        fontSize: "0.85rem",
        cursor: disabled || loading ? "not-allowed" : "pointer",
        opacity: disabled || loading ? 0.6 : 1,
        transition: "all 0.2s",
        fontFamily: "inherit",
        whiteSpace: "nowrap",
        ...styles[variant],
        ...style,
      }}
    >
      {loading ? (
        <div
          style={{
            width: 14,
            height: 14,
            border: "2px solid rgba(0,0,0,0.3)",
            borderTopColor: "#0f2347",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
          }}
        />
      ) : null}
      {children}
    </button>
  );
}

// ─── Badge ────────────────────────────────────────────────────
export function Badge({
  children,
  color = "#1a3a6e",
}: {
  children: React.ReactNode;
  color?: string;
}) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "2px 10px",
        background: `${color}20`,
        color,
        border: `1px solid ${color}30`,
        borderRadius: 20,
        fontSize: "0.72rem",
        fontWeight: 700,
      }}
    >
      {children}
    </span>
  );
}

// ─── Alert ────────────────────────────────────────────────────
export function Alert({
  type,
  message,
}: {
  type: "error" | "success";
  message: string;
}) {
  const isError = type === "error";
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        background: isError ? C.dangerBg : C.successBg,
        border: `1px solid ${isError ? C.dangerBorder : C.successBorder}`,
        borderRadius: 10,
        padding: "12px 14px",
        marginBottom: 16,
      }}
    >
      <span style={{ fontSize: "1rem" }}>{isError ? "⚠️" : "✅"}</span>
      <p
        style={{
          color: isError ? C.danger : C.success,
          fontSize: "0.83rem",
          margin: 0,
        }}
      >
        {message}
      </p>
    </div>
  );
}

// ─── Empty state ──────────────────────────────────────────────
export function EmptyState({ message }: { message: string }) {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "48px 24px",
        color: C.textDim,
        fontSize: "0.9rem",
      }}
    >
      <div style={{ fontSize: "2.5rem", marginBottom: 12, opacity: 0.4 }}>
        📭
      </div>
      {message}
    </div>
  );
}

// ─── Section title ────────────────────────────────────────────
export function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        color: C.textDim,
        fontSize: "0.7rem",
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.1em",
        marginBottom: 12,
        marginTop: 0,
      }}
    >
      {children}
    </p>
  );
}

// ─── Language tabs ────────────────────────────────────────────
export function LangTabs({
  active,
  onChange,
}: {
  active: "uz" | "ru" | "en";
  onChange: (l: "uz" | "ru" | "en") => void;
}) {
  const langs: { key: "uz" | "ru" | "en"; label: string }[] = [
    { key: "uz", label: "🇺🇿 O'zbek" },
    { key: "ru", label: "🇷🇺 Rus" },
    { key: "en", label: "🇬🇧 Ingliz" },
  ];
  return (
    <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
      {langs.map((l) => (
        <button
          key={l.key}
          onClick={() => onChange(l.key)}
          style={{
            padding: "7px 14px",
            borderRadius: 8,
            border:
              active === l.key
                ? `1px solid ${C.goldBorder}`
                : `1px solid ${C.border}`,
            background: active === l.key ? C.goldLight : "transparent",
            color: active === l.key ? C.gold : C.textMuted,
            fontSize: "0.8rem",
            fontWeight: active === l.key ? 700 : 500,
            cursor: "pointer",
            fontFamily: "inherit",
            transition: "all 0.2s",
          }}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}

export const spinStyle = `@keyframes spin { to { transform: rotate(360deg); }} input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.2); }`;
