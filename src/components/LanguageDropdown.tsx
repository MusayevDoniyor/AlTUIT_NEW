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
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label={`Tilni tanlash / Select language (hozirgi: ${current.codeUpper})`}
        style={{
          width: isFull ? "100%" : "auto",
          height: isFull ? 44 : 36,
          display: "flex",
          alignItems: "center",
          justifyContent: isFull ? "space-between" : "center",
          gap: isFull ? 8 : 6,
          background: isOpen ? "#ffffff" : "#f8fafc",
          color: "#002147",
          border: "1px solid",
          borderColor: isOpen ? "#c8a96e" : "#e2e8f0",
          borderRadius: isFull ? 10 : 8,
          padding: isFull ? "0 14px" : "0 11px",
          fontSize: isFull ? "0.88rem" : "0.8rem",
          fontWeight: 700,
          cursor: "pointer",
          transition: "all 0.18s cubic-bezier(0.4, 0, 0.2, 1)",
          boxShadow: isOpen
            ? "0 0 0 2px rgba(200, 169, 110, 0.25)"
            : "0 1px 2px rgba(0, 0, 0, 0.04)",
          fontFamily: "inherit",
          outline: "none",
          whiteSpace: "nowrap",
        }}
        onMouseEnter={(e) => {
          if (!isOpen) {
            e.currentTarget.style.borderColor = "#c8a96e";
            e.currentTarget.style.background = "#ffffff";
            e.currentTarget.style.boxShadow = "0 2px 6px rgba(0, 33, 71, 0.08)";
          }
        }}
        onMouseLeave={(e) => {
          if (!isOpen) {
            e.currentTarget.style.borderColor = "#e2e8f0";
            e.currentTarget.style.background = "#f8fafc";
            e.currentTarget.style.boxShadow = "0 1px 2px rgba(0, 0, 0, 0.04)";
          }
        }}
      >
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: isFull ? 8 : 6,
          }}
        >
          <FlagIcon
            code={current.code}
            width={isFull ? 20 : 17}
            height={isFull ? 14 : 11.5}
          />
          <span style={{ letterSpacing: "0.03em" }}>{current.label}</span>
        </span>
        <ChevronDown
          size={isFull ? 16 : 13}
          style={{
            transform: isOpen ? "rotate(180deg)" : "none",
            transition: "transform 0.18s ease",
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
            top: "calc(100% + 5px)",
            right: 0,
            left: isFull ? 0 : "auto",
            minWidth: isFull ? "100%" : 105,
            width: isFull ? "100%" : "auto",
            background: "#ffffff",
            borderRadius: 9,
            border: "1px solid #e2e8f0",
            boxShadow:
              "0 10px 25px -4px rgba(0, 33, 71, 0.15), 0 4px 10px -2px rgba(0, 33, 71, 0.06)",
            padding: 4,
            zIndex: 1100,
            animation: "customDropdownFadeIn 0.16s cubic-bezier(0.16, 1, 0.3, 1)",
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
                  height: 34,
                  padding: "0 10px",
                  borderRadius: 6,
                  border: "none",
                  background: isSelected
                    ? "rgba(200, 169, 110, 0.14)"
                    : "transparent",
                  color: isSelected ? "#002147" : "#334155",
                  fontWeight: isSelected ? 700 : 600,
                  fontSize: "0.8rem",
                  cursor: "pointer",
                  transition: "background 0.15s ease, color 0.15s ease",
                  textAlign: "left",
                  fontFamily: "inherit",
                  whiteSpace: "nowrap",
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
                    gap: 7,
                  }}
                >
                  <FlagIcon code={item.code} width={17} height={11.5} />
                  <span>{item.label}</span>
                </span>
                {isSelected && (
                  <Check
                    size={13}
                    color="#c8a96e"
                    strokeWidth={2.5}
                    style={{ marginLeft: 6, flexShrink: 0 }}
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
