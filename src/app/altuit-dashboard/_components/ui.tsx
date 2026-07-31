import React, {
  CSSProperties,
  useState,
  useCallback,
  useEffect,
  useRef,
  createContext,
  useContext,
} from "react";
import Image from "next/image";
import { X, ImageIcon } from "lucide-react";

// ─── Colors ──────────────────────────────────────────────────
export const C = {
  bg: "#0f1117",
  surface: "rgba(255,255,255,0.04)",
  surfaceHover: "rgba(255,255,255,0.07)",
  border: "rgba(255,255,255,0.07)",
  borderFocus: "rgba(200,169,110,0.5)",
  borderError: "rgba(239,68,68,0.5)",
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

// ─── Skeleton loading component ─────────────────────────────
const skeletonAnim = `
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
`;
const skeletonBg = `linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.09) 50%, rgba(255,255,255,0.04) 75%)`;
const skeletonSize = `background-size: 200% 100%`;

export function Skeleton({
  width,
  height,
  borderRadius = 8,
  style,
}: {
  width?: string | number;
  height?: string | number;
  borderRadius?: number;
  style?: CSSProperties;
}) {
  return (
    <>
      <style>{skeletonAnim}</style>
      <div
        style={{
          width: width ?? "100%",
          height: height ?? 16,
          borderRadius,
          background: skeletonBg,
          backgroundSize: "200% 100%",
          animation: "shimmer 1.5s infinite linear",
          ...style,
        }}
      />
    </>
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            gap: 12,
            alignItems: "center",
            padding: "16px 20px",
            borderRadius: 12,
            background: "rgba(255,255,255,0.03)",
          }}
        >
          <Skeleton width={40} height={40} borderRadius={10} />
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: 6,
            }}
          >
            <Skeleton width="60%" height={14} />
            <Skeleton width="35%" height={11} />
          </div>
          <Skeleton width={70} height={30} borderRadius={8} />
        </div>
      ))}
    </div>
  );
}

export function CardSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
        gap: 16,
      }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          style={{
            borderRadius: 12,
            padding: 24,
            background: "rgba(255,255,255,0.03)",
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          <Skeleton width={48} height={48} borderRadius={12} />
          <Skeleton width="80%" height={16} />
          <Skeleton width="55%" height={12} />
          <Skeleton width="40%" height={12} />
        </div>
      ))}
    </div>
  );
}

// ─── Modal portal helper ────────────────────────────────────
export const spinStyle = `@keyframes spin { to { transform: rotate(360deg); }} input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.2); }`;

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
  error?: string;
}
export function Input({ label, error, style, ...props }: InputProps) {
  return (
    <div>
      {label && (
        <label
          style={{
            display: "block",
            color: error ? C.danger : C.textMuted,
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
          border: `1px solid ${error ? C.borderError : C.border}`,
          borderRadius: 10,
          color: C.text,
          fontSize: "0.88rem",
          outline: "none",
          transition: "border-color 0.2s, box-shadow 0.2s, background 0.2s",
          boxSizing: "border-box",
          fontFamily: "inherit",
          ...style,
        }}
        onFocus={(e) => {
          e.target.style.borderColor = error ? C.borderError : C.borderFocus;
          e.target.style.boxShadow = `0 0 0 3px ${
            error ? "rgba(239,68,68,0.15)" : "rgba(200,169,110,0.12)"
          }`;
          e.target.style.background = "rgba(255,255,255,0.07)";
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          e.target.style.borderColor = error ? C.borderError : C.border;
          e.target.style.boxShadow = "none";
          e.target.style.background = "rgba(255,255,255,0.05)";
          props.onBlur?.(e);
        }}
      />
      {error && (
        <p style={{ color: C.danger, fontSize: "0.72rem", margin: "4px 0 0" }}>
          {error}
        </p>
      )}
    </div>
  );
}

// ─── Textarea ─────────────────────────────────────────────────
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}
export function Textarea({ label, error, style, ...props }: TextareaProps) {
  return (
    <div>
      {label && (
        <label
          style={{
            display: "block",
            color: error ? C.danger : C.textMuted,
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
          border: `1px solid ${error ? C.borderError : C.border}`,
          borderRadius: 10,
          color: C.text,
          fontSize: "0.88rem",
          outline: "none",
          transition: "border-color 0.2s, box-shadow 0.2s, background 0.2s",
          boxSizing: "border-box",
          fontFamily: "inherit",
          resize: "vertical",
          minHeight: 90,
          ...style,
        }}
        onFocus={(e) => {
          e.target.style.borderColor = error ? C.borderError : C.borderFocus;
          e.target.style.boxShadow = `0 0 0 3px ${
            error ? "rgba(239,68,68,0.15)" : "rgba(200,169,110,0.12)"
          }`;
          e.target.style.background = "rgba(255,255,255,0.07)";
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          e.target.style.borderColor = error ? C.borderError : C.border;
          e.target.style.boxShadow = "none";
          e.target.style.background = "rgba(255,255,255,0.05)";
          props.onBlur?.(e);
        }}
      />
      {error && (
        <p style={{ color: C.danger, fontSize: "0.72rem", margin: "4px 0 0" }}>
          {error}
        </p>
      )}
    </div>
  );
}

// ─── Select ───────────────────────────────────────────────────
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { label: string; value: string }[];
}
export function Select({ label, options, style, ...props }: SelectProps) {
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
      <select
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
          transition: "border-color 0.2s, box-shadow 0.2s, background 0.2s",
          boxSizing: "border-box",
          fontFamily: "inherit",
          cursor: "pointer",
          ...style,
        }}
        onFocus={(e) => {
          e.target.style.borderColor = C.borderFocus;
          e.target.style.boxShadow = "0 0 0 3px rgba(200,169,110,0.12)";
          e.target.style.background = "rgba(255,255,255,0.07)";
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          e.target.style.borderColor = C.border;
          e.target.style.boxShadow = "none";
          e.target.style.background = "rgba(255,255,255,0.05)";
          props.onBlur?.(e);
        }}
      >
        {options.map((o) => (
          <option
            key={o.value}
            value={o.value}
            style={{ background: "#141620" }}
          >
            {o.label}
          </option>
        ))}
      </select>
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
        boxShadow: variant === "primary" ? "0 2px 12px rgba(200,169,110,0.2)" : "none",
        ...styles[variant],
        ...style,
      }}
      onMouseEnter={(e) => {
        if (disabled || loading) return;
        e.currentTarget.style.filter = "brightness(1.08)";
        e.currentTarget.style.transform = "translateY(-1px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.filter = "none";
        e.currentTarget.style.transform = "none";
      }}
    >
      {loading ? (
        <div
          style={{
            width: 14,
            height: 14,
            border: "2px solid currentColor",
            borderTopColor: "transparent",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
            opacity: 0.7,
          }}
        />
      ) : null}
      {children}
    </button>
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

// ─── Search Input ────────────────────────────────────────────
export function SearchInput({
  value,
  onChange,
  placeholder = "Qidirish...",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        width: "100%",
        maxWidth: 320,
        padding: "9px 14px",
        background: "rgba(255,255,255,0.05)",
        border: `1px solid ${C.border}`,
        borderRadius: 10,
        color: C.text,
        fontSize: "0.83rem",
        outline: "none",
        boxSizing: "border-box",
        fontFamily: "inherit",
      }}
      onFocus={(e) => {
        e.target.style.borderColor = C.borderFocus;
      }}
      onBlur={(e) => {
        e.target.style.borderColor = C.border;
      }}
    />
  );
}

// ─── Toast System ─────────────────────────────────────────────
interface ToastMessage {
  id: number;
  type: "success" | "error";
  message: string;
}

const ToastContext = createContext<{
  showToast: (type: "success" | "error", message: string) => void;
}>({ showToast: () => {} });

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const nextId = useRef(0);

  const showToast = useCallback(
    (type: "success" | "error", message: string) => {
      const id = nextId.current++;
      setToasts((prev) => [...prev, { id, type, message }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3500);
    },
    [],
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "12px 18px",
              borderRadius: 12,
              background: t.type === "error" ? C.dangerBg : C.successBg,
              border: `1px solid ${t.type === "error" ? C.dangerBorder : C.successBorder}`,
              backdropFilter: "blur(12px)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
              animation: "toastSlideIn 0.3s ease",
              minWidth: 240,
              maxWidth: 400,
            }}
          >
            <span>{t.type === "error" ? "⚠️" : "✅"}</span>
            <p
              style={{
                color: t.type === "error" ? C.danger : C.success,
                fontSize: "0.85rem",
                fontWeight: 600,
                margin: 0,
              }}
            >
              {t.message}
            </p>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes toastSlideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}

// ─── Confirm Dialog ───────────────────────────────────────────
export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "O'chirish",
  cancelLabel = "Bekor qilish",
  variant = "danger",
  onConfirm,
  onCancel,
  loading = false,
}: {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "primary";
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}) {
  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.7)",
        backdropFilter: "blur(4px)",
        padding: 20,
      }}
      onClick={onCancel}
    >
      <div
        style={{
          background: "#141620",
          border: `1px solid ${C.border}`,
          borderRadius: 20,
          width: "100%",
          maxWidth: 420,
          padding: "28px",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            background: variant === "danger" ? C.dangerBg : C.goldLight,
            border: `1px solid ${variant === "danger" ? C.dangerBorder : C.goldBorder}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 18,
            fontSize: "1.4rem",
          }}
        >
          {variant === "danger" ? "🗑️" : "ℹ️"}
        </div>
        <h3
          style={{
            color: C.text,
            fontWeight: 700,
            fontSize: "1.1rem",
            margin: "0 0 8px",
          }}
        >
          {title}
        </h3>
        <p
          style={{
            color: C.textMuted,
            fontSize: "0.88rem",
            margin: "0 0 24px",
            lineHeight: 1.5,
          }}
        >
          {message}
        </p>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <Button variant="ghost" onClick={onCancel} disabled={loading}>
            {cancelLabel}
          </Button>
          <Button
            variant={variant === "danger" ? "danger" : "primary"}
            onClick={onConfirm}
            loading={loading}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Image Upload with drag & drop ──────────────────────────
export function ImageUpload({
  currentUrl,
  onUpload,
  onRemove,
  uploading,
}: {
  currentUrl: string;
  onUpload: (file: File) => void;
  onRemove: () => void;
  uploading: boolean;
}) {
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files?.[0];
      if (file) onUpload(file);
    },
    [onUpload],
  );

  return (
    <div>
      {currentUrl ? (
        <div
          style={{
            position: "relative",
            width: "100%",
            height: 180,
            borderRadius: 12,
            overflow: "hidden",
            marginBottom: 10,
            border: `1px solid ${C.border}`,
          }}
        >
          <Image
            src={currentUrl}
            alt=""
            fill
            sizes="(max-width: 600px) 100vw, 544px"
            style={{ objectFit: "cover" }}
          />
          <button
            onClick={onRemove}
            style={{
              position: "absolute",
              top: 8,
              right: 8,
              background: "rgba(0,0,0,0.6)",
              border: "none",
              borderRadius: "50%",
              color: "white",
              cursor: "pointer",
              padding: 5,
              display: "flex",
            }}
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            padding: "32px 20px",
            border: `2px dashed ${dragOver ? C.gold : C.border}`,
            borderRadius: 12,
            cursor: "pointer",
            color: C.textMuted,
            background: dragOver ? C.goldLight : "rgba(255,255,255,0.02)",
            transition: "all 0.2s",
            marginBottom: 10,
          }}
        >
          {uploading ? (
            <div
              style={{
                width: 28,
                height: 28,
                border: `3px solid ${C.goldLight}`,
                borderTopColor: C.gold,
                borderRadius: "50%",
                animation: "spin 0.8s linear infinite",
              }}
            />
          ) : (
            <ImageIcon size={32} color={C.textDim} />
          )}
          <span style={{ fontSize: "0.85rem", fontWeight: 500 }}>
            {uploading
              ? "Yuklanmoqda..."
              : "Rasmni shu yerga tashlang yoki bosing"}
          </span>
          <span style={{ fontSize: "0.72rem", opacity: 0.7 }}>
            PNG, JPG, WEBP formatlar
          </span>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) onUpload(file);
            }}
            disabled={uploading}
          />
        </div>
      )}
    </div>
  );
}
