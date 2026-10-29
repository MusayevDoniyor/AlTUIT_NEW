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
  { code: "uz" as const, label: "UZ", codeUpper: "UZ" },
  { code: "en" as const, label: "EN", codeUpper: "EN" },
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
        flexShrink: 0,
        userSelect: "none",
      }}
    >
      {/* Trigger Button (Compact & Ultra-sleek) */}
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
          gap: isFull ? 6 : 4,
          background: isOpen ? "#f8fafc" : "#f1f5f9",
          color: "#002147",
          border: "1px solid",
          borderColor: isOpen ? "#c8a96e" : "#e2e8f0",
          borderRadius: isFull ? 8 : 6,
          padding: isFull ? "9px 12px" : "3px 7px",
          fontSize: isFull ? "0.85rem" : "0.72rem",
          fontWeight: 700,
          lineHeight: 1.2,
          cursor: "pointer",
          transition: "all 0.15s ease",
          boxShadow: isOpen
            ? "0 0 0 1.5px rgba(200, 169, 110, 0.25)"
            : "0 1px 2px rgba(0,0,0,0.02)",
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
            gap: isFull ? 6 : 4,
          }}
        >
          <FlagIcon
            code={current.code}
            width={isFull ? 18 : 13}
            height={isFull ? 12 : 9}
          />
          <span style={{ letterSpacing: "0.02em" }}>{current.label}</span>
        </span>
        <ChevronDown
          size={isFull ? 14 : 10}
          style={{
            transform: isOpen ? "rotate(180deg)" : "none",
            transition: "transform 0.15s ease",
            color: isOpen ? "#c8a96e" : "#64748b",
            flexShrink: 0,
            opacity: 0.8,
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
            top: "calc(100% + 4px)",
            right: 0,
            left: isFull ? 0 : "auto",
            minWidth: isFull ? "100%" : 84,
            width: isFull ? "100%" : "auto",
            background: "#ffffff",
            borderRadius: 8,
            border: "1px solid #e2e8f0",
            boxShadow:
              "0 8px 20px -3px rgba(0, 33, 71, 0.14), 0 4px 8px -3px rgba(0, 33, 71, 0.06)",
            padding: 3,
            zIndex: 1100,
            animation: "customDropdownFadeIn 0.15s cubic-bezier(0.16, 1, 0.3, 1)",
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
                  padding: "5px 7px",
                  borderRadius: 5,
                  border: "none",
                  background: isSelected
                    ? "rgba(200, 169, 110, 0.12)"
                    : "transparent",
                  color: isSelected ? "#002147" : "#334155",
                  fontWeight: isSelected ? 700 : 600,
                  fontSize: "0.74rem",
                  cursor: "pointer",
                  transition: "background 0.12s ease, color 0.12s ease",
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
                    gap: 6,
                  }}
                >
                  <FlagIcon code={item.code} width={13} height={9} />
                  <span>{item.label}</span>
                </span>
                {isSelected && (
                  <Check
                    size={11}
                    color="#c8a96e"
                    strokeWidth={2.5}
                    style={{ marginLeft: 4, flexShrink: 0 }}
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
