"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Trophy, Plus, Pencil, Trash2, X, Check } from "lucide-react";
import {
  getAchievements,
  saveAchievement,
  deleteAchievement,
  uploadImage,
  deleteImage,
  AchievementItem,
} from "@/lib/db";
import {
  PageHeader,
  Card,
  Input,
  Textarea,
  Button,
  Alert,
  EmptyState,
  SectionTitle,
  LangTabs,
  C,
  spinStyle,
} from "../_components/ui";

const EMPTY: Omit<AchievementItem, "id"> = {
  titleUz: "",
  titleRu: "",
  titleEn: "",
  descUz: "",
  descRu: "",
  descEn: "",
  year: new Date().getFullYear().toString(),
  color: "#c8a96e",
  category: "Olimpiada",
  orderIndex: 0,
};

const COLOR_OPTIONS = [
  { label: "Oltin (Premium)", value: "#c8a96e" },
  { label: "Kumush (Ikkinchi o'rin)", value: "#94a3b8" },
  { label: "Bronza (Uchinchi o'rin)", value: "#b45309" },
  { label: "Moviy (Xalqaro)", value: "#3b82f6" },
  { label: "Yashil (Sport)", value: "#22c55e" },
];

const CATEGORY_OPTIONS = [
  { label: "Olimpiadalar", value: "Olimpiada" },
  { label: "Sport yutuqlari", value: "Sport" },
  { label: "Tanlovlar & Grantlar", value: "Tanlov" },
  { label: "Ijodiy yutuqlar", value: "Ijodiy" },
  { label: "Boshqa", value: "Boshqa" },
];

export default function AdminAchievementsPage() {
  const [items, setItems] = useState<AchievementItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editing, setEditing] = useState<
    (Omit<AchievementItem, "id"> & { id?: string }) | null
  >(null);
  const [lang, setLang] = useState<"uz" | "ru" | "en">("uz");
  const [uploadingImage, setUploadingImage] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      setItems(await getAchievements());
    } catch {
      setError("Ma'lumotlarni yuklashda xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const openNew = () => setEditing({ ...EMPTY, orderIndex: items.length });
  const openEdit = (item: AchievementItem) => setEditing({ ...item });
  const close = () => {
    setEditing(null);
    setError("");
    setSuccess("");
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0] || !editing) return;
    setUploadingImage(true);
    try {
      const url = await uploadImage(e.target.files[0], "achievements");
      setEditing((prev) => (prev ? { ...prev, imageUrl: url } : prev));
    } catch {
      setError("Rasm yuklashda xatolik yuz berdi");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    setError("");
    try {
      const id = editing.id || Date.now().toString();
      const { id: _id, ...data } = editing as AchievementItem;
      await saveAchievement(id, data);
      setSuccess("Muvaffaqiyatli saqlandi!");
      await load();
      setTimeout(close, 1000);
    } catch {
      setError("Saqlashda xatolik yuz berdi");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (item: AchievementItem) => {
    if (!confirm(`"${item.titleUz}"ni o'chirasizmi?`)) return;
    try {
      await deleteAchievement(item.id!);
      if (item.imageUrl) await deleteImage(item.imageUrl);
      await load();
    } catch {
      setError("O'chirishda xatolik yuz berdi");
    }
  };

  const set = (field: string, val: unknown) =>
    setEditing((prev) => (prev ? { ...prev, [field]: val } : prev));

  return (
    <div>
      <style>{spinStyle}</style>
      <PageHeader
        title="Yutuqlar"
        description="Litsey o'quvchilari va ustozlarining yutuqlarini boshqarish"
        icon={<Trophy size={18} color={C.gold} />}
        action={
          <Button onClick={openNew}>
            <Plus size={14} /> Qo'shish
          </Button>
        }
      />

      {error && <Alert type="error" message={error} />}

      <Card>
        {loading ? (
          <div style={{ padding: 48, textAlign: "center" }}>
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
          <EmptyState message="Yutuqlar ro'yxati bo'sh. Qo'shish tugmasi orqali yangi yutuq kiriting." />
        ) : (
          <div>
            {items.map((item, idx) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  padding: "16px 20px",
                  borderBottom:
                    idx < items.length - 1 ? `1px solid ${C.border}` : "none",
                }}
              >
                <div
                  style={{
                    width: 60,
                    height: 44,
                    borderRadius: 8,
                    overflow: "hidden",
                    background: "rgba(255,255,255,0.05)",
                    border: `1px solid ${C.border}`,
                    display: "flex",
                    alignItems: "center",
                    justifyItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl}
                      alt=""
                      width={60}
                      height={44}
                      style={{
                        objectFit: "cover",
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  ) : (
                    <Trophy size={18} color={item.color || C.gold} />
                  )}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    <p
                      style={{
                        color: C.text,
                        fontWeight: 600,
                        fontSize: "0.9rem",
                        margin: 0,
                      }}
                    >
                      {item.titleUz}
                    </p>
                    <span
                      style={{
                        fontSize: "0.68rem",
                        padding: "1px 6px",
                        borderRadius: 4,
                        background: "rgba(255,255,255,0.08)",
                        color: C.textMuted,
                      }}
                    >
                      {item.year}
                    </span>
                    <span
                      style={{
                        fontSize: "0.68rem",
                        padding: "1px 6px",
                        borderRadius: 4,
                        background: `${item.color}20`,
                        color: item.color,
                        border: `1px solid ${item.color}35`,
                      }}
                    >
                      {item.category || "Olimpiada"}
                    </span>
                  </div>
                  <p
                    style={{
                      color: C.textMuted,
                      fontSize: "0.78rem",
                      margin: "4px 0 0",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.descUz}
                  </p>
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                  <Button
                    variant="ghost"
                    onClick={() => openEdit(item)}
                    style={{ padding: "6px 10px" }}
                  >
                    <Pencil size={13} />
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(item)}
                    style={{ padding: "6px 10px" }}
                  >
                    <Trash2 size={13} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

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
              maxWidth: 600,
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
                {editing.id ? "Tahrirlash" : "Yangi yutuq"}
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

            {error && <Alert type="error" message={error} />}
            {success && <Alert type="success" message={success} />}

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <SectionTitle>Ma'lumotlar (til bo'yicha)</SectionTitle>
              <LangTabs active={lang} onChange={setLang} />

              <Input
                label={`Sarlavha (${lang.toUpperCase()})`}
                value={
                  lang === "uz"
                    ? editing.titleUz
                    : lang === "ru"
                      ? editing.titleRu
                      : editing.titleEn
                }
                onChange={(e) =>
                  set(
                    lang === "uz"
                      ? "titleUz"
                      : lang === "ru"
                        ? "titleRu"
                        : "titleEn",
                    e.target.value,
                  )
                }
                placeholder="Masalan: Respublika fan olimpiadasi 1-o'rin"
              />

              <Textarea
                label={`Tavsif (${lang.toUpperCase()})`}
                value={
                  lang === "uz"
                    ? editing.descUz
                    : lang === "ru"
                      ? editing.descRu
                      : editing.descEn
                }
                onChange={(e) =>
                  set(
                    lang === "uz"
                      ? "descUz"
                      : lang === "ru"
                        ? "descRu"
                        : "descEn",
                    e.target.value,
                  )
                }
                placeholder="Yutuq haqida qisqacha ma'lumot..."
              />

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                }}
              >
                <Input
                  label="Yil"
                  value={editing.year}
                  onChange={(e) => set("year", e.target.value)}
                  placeholder="Masalan: 2024"
                />
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
                    Kategoriya
                  </label>
                  <select
                    value={editing.category}
                    onChange={(e) => set("category", e.target.value)}
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
                    {CATEGORY_OPTIONS.map((c) => (
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
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                }}
              >
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
                    Mavzu rangi / Nishon turi
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
                <Input
                  label="Tartib raqami"
                  type="number"
                  value={editing.orderIndex}
                  onChange={(e) =>
                    set("orderIndex", parseInt(e.target.value) || 0)
                  }
                />
              </div>

              {/* Image Upload */}
              <div>
                <SectionTitle>Rasm (ixtiyoriy)</SectionTitle>
                {editing.imageUrl && (
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      height: 160,
                      borderRadius: 12,
                      overflow: "hidden",
                      marginBottom: 10,
                      border: `1px solid ${C.border}`,
                    }}
                  >
                    <Image
                      src={editing.imageUrl}
                      alt=""
                      fill
                      sizes="(max-width: 600px) 100vw, 544px"
                      style={{ objectFit: "cover" }}
                    />
                    <button
                      onClick={() => set("imageUrl", "")}
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
                )}
                <label
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "9px 14px",
                    background: "rgba(255,255,255,0.05)",
                    border: `1px dashed ${C.border}`,
                    borderRadius: 10,
                    cursor: "pointer",
                    color: C.textMuted,
                    fontSize: "0.83rem",
                  }}
                >
                  {uploadingImage ? (
                    <div
                      style={{
                        width: 14,
                        height: 14,
                        border: `2px solid ${C.goldLight}`,
                        borderTopColor: C.gold,
                        borderRadius: "50%",
                        animation: "spin 0.8s linear infinite",
                      }}
                    />
                  ) : (
                    "📷"
                  )}
                  {uploadingImage ? "Yuklanmoqda..." : "Rasm yuklash"}
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleImageUpload}
                    disabled={uploadingImage}
                  />
                </label>
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
