import React from "react";

export type FlagCode = "uz" | "ru" | "en" | "gb";

interface FlagIconProps {
  code: FlagCode | string;
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function FlagIcon({
  code,
  width = 20,
  height = 14,
  className = "",
  style = {},
}: FlagIconProps) {
  const normalized = code.toLowerCase().trim();

  const baseStyle: React.CSSProperties = {
    display: "inline-block",
    verticalAlign: "middle",
    flexShrink: 0,
    borderRadius: 3,
    overflow: "hidden",
    boxShadow: "0 0 0 1px rgba(255,255,255,0.18), 0 1px 2px rgba(0,0,0,0.25)",
    ...style,
  };

  if (normalized === "uz") {
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 24 16"
        className={className}
        style={baseStyle}
        xmlns="http://www.w3.org/2000/svg"
        aria-label="O'zbekiston bayrog'i"
      >
        {/* Blue stripe */}
        <rect width="24" height="5.1" fill="#0099B5" />
        {/* Red stripe 1 */}
        <rect y="5.1" width="24" height="0.4" fill="#CE1126" />
        {/* White stripe */}
        <rect y="5.5" width="24" height="5" fill="#FFFFFF" />
        {/* Red stripe 2 */}
        <rect y="10.5" width="24" height="0.4" fill="#CE1126" />
        {/* Green stripe */}
        <rect y="10.9" width="24" height="5.1" fill="#1EB53A" />
        {/* Crescent */}
        <circle cx="3.8" cy="2.55" r="1.6" fill="#FFFFFF" />
        <circle cx="4.35" cy="2.55" r="1.35" fill="#0099B5" />
        {/* Stars (12 stars: 3, 4, 5) */}
        <circle cx="7.2" cy="1.3" r="0.32" fill="#FFFFFF" />
        <circle cx="8.3" cy="1.3" r="0.32" fill="#FFFFFF" />
        <circle cx="9.4" cy="1.3" r="0.32" fill="#FFFFFF" />
        <circle cx="6.1" cy="2.55" r="0.32" fill="#FFFFFF" />
        <circle cx="7.2" cy="2.55" r="0.32" fill="#FFFFFF" />
        <circle cx="8.3" cy="2.55" r="0.32" fill="#FFFFFF" />
        <circle cx="9.4" cy="2.55" r="0.32" fill="#FFFFFF" />
        <circle cx="5.0" cy="3.8" r="0.32" fill="#FFFFFF" />
        <circle cx="6.1" cy="3.8" r="0.32" fill="#FFFFFF" />
        <circle cx="7.2" cy="3.8" r="0.32" fill="#FFFFFF" />
        <circle cx="8.3" cy="3.8" r="0.32" fill="#FFFFFF" />
        <circle cx="9.4" cy="3.8" r="0.32" fill="#FFFFFF" />
      </svg>
    );
  }

  if (normalized === "ru") {
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 24 16"
        className={className}
        style={baseStyle}
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Rossiya bayrog'i"
      >
        <rect width="24" height="5.33" fill="#FFFFFF" />
        <rect y="5.33" width="24" height="5.34" fill="#0039A6" />
        <rect y="10.67" width="24" height="5.33" fill="#D52B1E" />
      </svg>
    );
  }

  // "en" or "gb" -> UK Flag
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 16"
      className={className}
      style={baseStyle}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Buyuk Britaniya bayrog'i"
    >
      <clipPath id="gb-flag-clip">
        <rect width="24" height="16" />
      </clipPath>
      <g clipPath="url(#gb-flag-clip)">
        <rect width="24" height="16" fill="#012169" />
        <path d="M0,0 L24,16 M24,0 L0,16" stroke="#FFFFFF" strokeWidth="3.2" />
        <path
          d="M0,0 L12,8 M24,0 L12,8 M24,16 L12,8 M0,16 L12,8"
          stroke="#C8102E"
          strokeWidth="1.6"
        />
        <path d="M12,0 V16 M0,8 H24" stroke="#FFFFFF" strokeWidth="5.2" />
        <path d="M12,0 V16 M0,8 H24" stroke="#C8102E" strokeWidth="3.2" />
      </g>
    </svg>
  );
}

export default FlagIcon;
