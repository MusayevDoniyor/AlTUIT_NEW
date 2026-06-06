"use client";

import { useEffect, useState } from "react";
import { BarChart2, Check, Pencil, Sliders, X } from "lucide-react";
import { getStats, saveStat, StatItem } from "@/lib/db";
import {
  PageHeader,
  Card,
  Input,
  Button,
  Alert,
  EmptyState,
  SectionTitle,
  LangTabs,
  ConfirmDialog,
  useToast,
  C,
  spinStyle,
} from "../_components/ui";

const COLOR_OPTIONS = [
  { label: "To'q ko'k", value: "#1a3a6e" },
  { label: "Moviy", value: "#2d5bb5" },
  { label: "Yashil", value: "#1d7a55" },
  { label: "Oltin", value: "#c8a96e" },
];

export default function AdminStatsPage() {
  const [items, setItems] = useState<StatItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editing, setEditing] = useState<
    (Omit<StatItem, "id"> & { id?: string }) | null
  >(null);
  const [lang, setLang] = useState<"uz" | "ru" | "en">("uz");
  const [deleteTarget, setDeleteTarget] = useState<StatItem | null>(null);
  const { showToast } = useToast();

  const load = async () => {
    setLoading(true);
    try {
      const data = await getStats();
      // Ensure we have the 4 default stats if Firestore is empty
      if (data.length === 0) {
        setItems([]);
      } else {
        setItems(data);
      }
    } catch {
      setError("Statistikalarni yuklashda xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const openEdit = (item: StatItem) => setEditing({ ...item });
  const close = () => {
    setEditing(null);
    setError("");
    setSuccess("");
  };

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    setError("");
    try {
      const id = editing.id || editing.key;
      const { id: _id, ...data } = editing as StatItem;
      await saveStat(id, data);
      showToast("success", "Statistika saqlandi");
      await load();
      close();
    } catch {
      showToast("error", "Saqlashda xatolik yuz berdi");
    } finally {
      setSaving(false);
    }
  };

  // If Firestore has no items, we can offer to initialize them
  const handleInitialize = async () => {
    setSaving(true);
    setError("");
    const initialStats: StatItem[] = [
      {
        key: "students",
        value: 1200,
        suffix: "+",
        labelUz: "O'quvchilar",
        labelRu: "Ученики",
        labelEn: "Students",
        color: "#1a3a6e",
      },
      {
        key: "teachers",
        value: 85,
        suffix: "+",
        labelUz: "Pedagog xodimlar",
        labelRu: "Педагоги",
        labelEn: "Teachers",
        color: "#2d5bb5",
      },
      {
        key: "uni_rate",
        value: 96,
        suffix: "%",
        labelUz: "Oliy ta'limga kirish ko'rsatkichi",
        labelRu: "Поступление в вузы",
        labelEn: "Uni Admission Rate",
        color: "#1d7a55",
      },
      {
        key: "olympiad_winners",
        value: 200,
        suffix: "+",
        labelUz: "Olimpiada g'oliblari",
        labelRu: "Победители олимпиад",
        labelEn: "Olympiad Winners",
        color: "#c8a96e",
      },
    ];

    try {
      for (const stat of initialStats) {
        await saveStat(stat.key, stat);
      }
      showToast("success", "Birlamchi statistika yaratildi!");
      await load();
    } catch {
      showToast("error", "Boshlang'ich ma'lumotlarni yaratishda xatolik");
    } finally {
      setSaving(false);
    }
  };

  const set = (field: string, val: unknown) =>
    setEditing((prev) => (prev ? { ...prev, [field]: val } : prev));

  return (
    <div>
      <style>{spinStyle}</style>
      <PageHeader
        title="Statistika raqamlari"
        description="Bosh sahifadagi asosiy ko'rsatkichlarni boshqarish"
        icon={<BarChart2 size={18} color={C.gold} />}
        action={
          items.length === 0 ? (
            <Button onClick={handleInitialize} loading={saving}>
              Birlamchi yuklash
            </Button>
          ) : undefined
        }
      />

      {error && <Alert type="error" message={error} />}
      {success && <Alert type="success" message={success} />}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 20,
        }}
      >
        {loading ? (
          <div
            style={{ padding: 48, textAlign: "center", gridColumn: "1 / -1" }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                border: `3px solid ${C.goldLight}`,
                borderTopColor: C.gold,
                borderRadius: "50%",
                animation: "spin 0.8s linear infinite",
                margin: "0 auto",
              }}
            />
          </div>
        ) : items.length === 0 ? (
          <div style={{ gridColumn: "1 / -1" }}>
            <EmptyState message="Statistika topilmadi. Boshlang'ich ko'rsatkichlarni yaratish uchun yuqoridagi 'Birlamchi yuklash' tugmasini bosing." />
          </div>
        ) : (
          items.map((item) => (
            <Card
              key={item.id || item.key}
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <div style={{ padding: 20, flex: 1 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 16,
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.72rem",
                      padding: "3px 8px",
                      borderRadius: 6,
                      background: "rgba(255,255,255,0.06)",
                      color: C.textMuted,
                      fontWeight: 700,
                    }}
                  >
                    {item.key.toUpperCase()}
                  </span>
                  <span
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      background: item.color,
                    }}
                  />
                </div>

                <div
                  style={{
                    fontSize: "2.2rem",
                    fontWeight: 900,
                    color: item.color,
                    marginBottom: 8,
                    lineHeight: 1,
                  }}
                >
                  {item.value}
                  {item.suffix}
                </div>

                <div
                  style={{
                    color: C.text,
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    marginBottom: 4,
                  }}
                >
                  🇺🇿 {item.labelUz}
                </div>
                <div
                  style={{
                    color: C.textMuted,
                    fontSize: "0.75rem",
                    marginBottom: 4,
                  }}
                >
                  🇷🇺 {item.labelRu}
                </div>
                <div style={{ color: C.textMuted, fontSize: "0.75rem" }}>
                  🇬🇧 {item.labelEn}
                </div>
              </div>

              <div
                style={{
                  padding: "12px 20px",
                  background: "rgba(0,0,0,0.15)",
                  borderTop: `1px solid ${C.border}`,
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  variant="outline"
                  onClick={() => openEdit(item)}
                  style={{ padding: "6px 12px", fontSize: "0.78rem" }}
                >
                  <Pencil size={12} /> Tahrirlash
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* MODAL */}
      {editing && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            background: "rgba(0,0,0,0.7)",
            backdropFilter: "blur(6px)",
            overflowY: "auto",
            padding: "20px",
          }}
        >
          <div
            style={{
              background: "#141620",
              border: `1px solid ${C.border}`,
              borderRadius: 20,
              width: "100%",
              maxWidth: 500,
              padding: "28px",
              margin: "auto",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyItems: "center",
                justifyContent: "space-between",
                marginBottom: 24,
              }}
            >
              <h2
                style={{
                  color: C.text,
                  fontWeight: 800,
                  fontSize: "1.1rem",
                  margin: 0,
                }}
              >
                Statistikani tahrirlash ({editing.key})
              </h2>
              <button
                onClick={close}
                style={{
                  background: "none",
                  border: "none",
                  color: C.textMuted,
                  cursor: "pointer",
                  padding: 4,
                  display: "flex",
                }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <SectionTitle>Nomlanishi (til bo'yicha)</SectionTitle>
              <LangTabs active={lang} onChange={setLang} />

              <Input
                label={`Nomi (${lang.toUpperCase()})`}
                value={
                  lang === "uz"
                    ? editing.labelUz
                    : lang === "ru"
                      ? editing.labelRu
                      : editing.labelEn
                }
                onChange={(e) =>
                  set(
                    lang === "uz"
                      ? "labelUz"
                      : lang === "ru"
                        ? "labelRu"
                        : "labelEn",
                    e.target.value,
                  )
                }
              />

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                }}
              >
                <Input
                  label="Qiymati (son)"
                  type="number"
                  value={editing.value}
                  onChange={(e) => set("value", parseInt(e.target.value) || 0)}
                />
                <Input
                  label="Qo'shimcha (Suffix)"
                  value={editing.suffix}
                  onChange={(e) => set("suffix", e.target.value)}
                  placeholder="Masalan: +, %"
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    color: C.textMuted,
                    fontSize: "0.78rem",
                    fontWeight: 600,
                    marginBottom: 6,
                  }}
                >
                  Rangi
                </label>
                <select
                  value={editing.color}
                  onChange={(e) => set("color", e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    background: "rgba(255,255,255,0.05)",
                    border: `1px solid ${C.border}`,
                    borderRadius: 10,
                    color: C.text,
                    fontSize: "0.88rem",
                    outline: "none",
                    boxSizing: "border-box",
                    fontFamily: "inherit",
                  }}
                >
                  {COLOR_OPTIONS.map((c) => (
                    <option
                      key={c.value}
                      value={c.value}
                      style={{ background: "#141620" }}
                    >
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                gap: 10,
                justifyContent: "flex-end",
                marginTop: 24,
                paddingTop: 20,
                borderTop: `1px solid ${C.border}`,
              }}
            >
              <Button variant="ghost" onClick={close}>
                Bekor qilish
              </Button>
              <Button onClick={handleSave} loading={saving}>
                <Check size={14} /> Saqlash
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
