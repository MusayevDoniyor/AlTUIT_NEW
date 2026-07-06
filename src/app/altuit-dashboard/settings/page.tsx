"use client";

import { useEffect, useState } from "react";
import { Settings, AlertTriangle, CheckCircle2 } from "lucide-react";
import { getSiteSettings, saveSiteSettings } from "@/lib/db";
import { useSiteSettings } from "@/lib/site-settings-context";
import {
  PageHeader,
  Card,
  Button,
  Alert,
  useToast,
  C,
  spinStyle,
} from "../_components/ui";

export default function AdminSettingsPage() {
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const { refresh } = useSiteSettings();
  const { showToast } = useToast();

  useEffect(() => {
    getSiteSettings()
      .then((settings) => {
        setMaintenanceMode(settings.maintenanceMode);
      })
      .catch(() => {
        setError("Sozlamalarni yuklab bo'lmadi.");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleToggle = async () => {
    const next = !maintenanceMode;
    setSaving(true);
    setError("");
    try {
      await saveSiteSettings({ maintenanceMode: next });
      setMaintenanceMode(next);
      await refresh();
      showToast(
        "success",
        next
          ? "Texnik ishlar rejimi yoqildi"
          : "Texnik ishlar rejimi o'chirildi",
      );
    } catch {
      setError("Saqlashda xatolik yuz berdi");
      showToast("error", "Saqlashda xatolik yuz berdi");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <>
        <style>{spinStyle}</style>
        <div style={{ display: "flex", justifyContent: "center", padding: 80 }}>
          <div
            style={{
              width: 40,
              height: 40,
              border: "3px solid rgba(200,169,110,0.2)",
              borderTopColor: C.gold,
              borderRadius: "50%",
              animation: "spin 0.8s linear infinite",
            }}
          />
        </div>
      </>
    );
  }

  return (
    <div>
      <PageHeader
        icon={Settings}
        title="Sayt sozlamalari"
        subtitle="Saytning umumiy holatini boshqarish"
      />

      {error && (
        <div style={{ marginBottom: 20 }}>
          <Alert type="error">{error}</Alert>
        </div>
      )}

      <Card>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 20,
            flexWrap: "wrap",
          }}
        >
          <div style={{ flex: 1, minWidth: 260 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 10,
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: maintenanceMode
                    ? "rgba(245,158,11,0.15)"
                    : "rgba(34,197,94,0.12)",
                  border: `1px solid ${maintenanceMode ? "rgba(245,158,11,0.3)" : "rgba(34,197,94,0.25)"}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {maintenanceMode ? (
                  <AlertTriangle size={18} color="#f59e0b" />
                ) : (
                  <CheckCircle2 size={18} color="#22c55e" />
                )}
              </div>
              <div>
                <h2
                  style={{
                    color: "white",
                    fontWeight: 700,
                    fontSize: "1rem",
                    margin: 0,
                  }}
                >
                  Texnik ishlar rejimi
                </h2>
                <p
                  style={{
                    color: C.textMuted,
                    fontSize: "0.8rem",
                    margin: "4px 0 0",
                  }}
                >
                  Hozir:{" "}
                  <strong style={{ color: maintenanceMode ? "#f59e0b" : "#22c55e" }}>
                    {maintenanceMode ? "Yoqilgan" : "O'chirilgan"}
                  </strong>
                </p>
              </div>
            </div>
            <p style={{ color: C.textMuted, fontSize: "0.85rem", lineHeight: 1.6, margin: 0 }}>
              Yoqilganda saytning barcha sahifalarida foydalanuvchilarga texnik
              ishlar olib borilayotgani haqida ogohlantirish banneri ko&apos;rinadi.
              Bog&apos;lanish sahifasida ham qo&apos;shimcha eslatma chiqadi.
            </p>
          </div>

          <Button
            onClick={handleToggle}
            disabled={saving}
            style={{
              minWidth: 180,
              background: maintenanceMode
                ? "rgba(34,197,94,0.15)"
                : "rgba(245,158,11,0.15)",
              border: `1px solid ${maintenanceMode ? "rgba(34,197,94,0.35)" : "rgba(245,158,11,0.35)"}`,
              color: maintenanceMode ? "#22c55e" : "#f59e0b",
            }}
          >
            {saving
              ? "Saqlanmoqda..."
              : maintenanceMode
                ? "Rejimni o'chirish"
                : "Rejimni yoqish"}
          </Button>
        </div>
      </Card>
    </div>
  );
}
