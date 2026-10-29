"use client";

import { useState, useRef, useEffect } from "react";
import { type Lang } from "@/lib/i18n";
import FlagIcon from "@/components/FlagIcon";
import { ChevronDown, Check } from "lucide-react";

interface LanguageDropdownProps {
  lang: Lang;
  onChange: (l: Lang) => void;
  variant?: "compact" | "full";
  className?: string;
}

const languages = [
  { code: "uz" as const, label: "O'zbekcha", codeUpper: "UZ" },
  { code: "en" as const, label: "English", codeUpper: "EN" },
];

export default function LanguageDropdown({
  lang,
  onChange,
  variant = "compact",
  className = "",
}: LanguageDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const current = languages.find((l) => l.code === lang) || languages[0];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const isFull = variant === "full";

  return (
    <div
      ref={dropdownRef}
      className={className}
      style={{
        position: "relative",
        display: isFull ? "block" : "inline-block",
        width: isFull ? "100%" : "auto",
        userSelect: "none",
      }}
    >
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label={`Tilni tanlash / Select language (hozirgi: ${current.codeUpper})`}
        style={{
          width: isFull ? "100%" : "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: isFull ? "space-between" : "center",
          gap: 7,
          background: isOpen ? "#f8fafc" : "#f1f5f9",
          color: "#002147",
          border: "1px solid",
          borderColor: isOpen ? "#c8a96e" : "#e2e8f0",
          borderRadius: isFull ? 10 : 8,
          padding: isFull ? "10px 14px" : "6px 10px",
          fontSize: isFull ? "0.88rem" : "0.78rem",
          fontWeight: 700,
          cursor: "pointer",
          transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
          boxShadow: isOpen
            ? "0 0 0 2px rgba(200, 169, 110, 0.22)"
            : "0 1px 2px rgba(0,0,0,0.03)",
          fontFamily: "inherit",
          outline: "none",
        }}
        onMouseEnter={(e) => {
          if (!isOpen) {
            e.currentTarget.style.borderColor = "#cbd5e1";
            e.currentTarget.style.background = "#eef2f6";
          }
        }}
        onMouseLeave={(e) => {
          if (!isOpen) {
            e.currentTarget.style.borderColor = "#e2e8f0";
            e.currentTarget.style.background = "#f1f5f9";
          }
        }}
      >
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 7,
          }}
        >
          <FlagIcon
            code={current.code}
            width={isFull ? 20 : 17}
            height={isFull ? 14 : 11}
          />
          <span style={{ letterSpacing: "0.03em" }}>
            {isFull ? current.label : current.codeUpper}
          </span>
        </span>
        <ChevronDown
          size={isFull ? 16 : 13}
          style={{
            transform: isOpen ? "rotate(180deg)" : "none",
            transition: "transform 0.2s ease",
            color: isOpen ? "#c8a96e" : "#64748b",
            flexShrink: 0,
          }}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          role="menu"
          aria-orientation="vertical"
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            right: 0,
            left: isFull ? 0 : "auto",
            minWidth: isFull ? "100%" : 145,
            width: isFull ? "100%" : "auto",
            background: "#ffffff",
            borderRadius: 10,
            border: "1px solid #e2e8f0",
            boxShadow:
              "0 12px 28px -4px rgba(0, 33, 71, 0.16), 0 6px 12px -4px rgba(0, 33, 71, 0.08)",
            padding: 5,
            zIndex: 1100,
            animation: "customDropdownFadeIn 0.18s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {languages.map((item) => {
            const isSelected = current.code === item.code;
            return (
              <button
                key={item.code}
                type="button"
                role="menuitem"
                onClick={() => {
                  onChange(item.code);
                  setIsOpen(false);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  padding: "8px 10px",
                  borderRadius: 7,
                  border: "none",
                  background: isSelected
                    ? "rgba(200, 169, 110, 0.12)"
                    : "transparent",
                  color: isSelected ? "#002147" : "#334155",
                  fontWeight: isSelected ? 700 : 500,
                  fontSize: "0.82rem",
                  cursor: "pointer",
                  transition: "background 0.15s ease, color 0.15s ease",
                  textAlign: "left",
                  fontFamily: "inherit",
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.background = "#f8fafc";
                    e.currentTarget.style.color = "#002147";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "#334155";
                  }
                }}
              >
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <FlagIcon code={item.code} width={18} height={12} />
                  <span>{item.label}</span>
                </span>
                {isSelected && (
                  <Check
                    size={14}
                    color="#c8a96e"
                    strokeWidth={2.5}
                    style={{ marginLeft: 8, flexShrink: 0 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
