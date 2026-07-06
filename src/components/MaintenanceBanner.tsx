"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import { translations, type Lang } from "@/lib/i18n";
import { useSiteSettings } from "@/lib/site-settings-context";

interface MaintenanceBannerProps {
  lang: Lang;
  compact?: boolean;
}

export default function MaintenanceBanner({
  lang,
  compact = false,
}: MaintenanceBannerProps) {
  const { maintenanceMode, loading } = useSiteSettings();

  useEffect(() => {
    if (loading || !maintenanceMode) {
      delete document.body.dataset.maintenance;
      return;
    }

    document.body.dataset.maintenance = "true";
    return () => {
      delete document.body.dataset.maintenance;
    };
  }, [loading, maintenanceMode]);

  if (loading || !maintenanceMode) return null;

  const t = translations[lang];

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        background: "linear-gradient(90deg, #92400e, #b45309)",
        color: "white",
        fontSize: compact ? "0.78rem" : "0.8rem",
        lineHeight: 1.5,
        padding: compact ? "10px 14px" : "10px 16px",
        borderBottom: "1px solid rgba(255,255,255,0.15)",
      }}
    >
      <div
        className="container-custom"
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 10,
        }}
      >
        <AlertTriangle
          size={16}
          color="#fde68a"
          style={{ flexShrink: 0, marginTop: 2 }}
        />
        <p style={{ margin: 0, fontWeight: 500 }}>{t.maintenance_notice}</p>
      </div>
    </div>
  );
}
