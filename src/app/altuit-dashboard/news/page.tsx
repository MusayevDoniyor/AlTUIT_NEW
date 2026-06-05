"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Newspaper, Plus, Pencil, Trash2, X, Check } from "lucide-react";
import {
  getNews,
  saveNews,
  deleteNews,
  uploadImage,
  deleteImage,
  NewsItem,
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

const COLORS = [
  "#1a3a6e",
  "#1d7a55",
  "#6032bf",
  "#b91c1c",
  "#c8a96e",
  "#0891b2",
];

const EMPTY: Omit<NewsItem, "id"> = {
  date: new Date().toISOString().slice(0, 10),
  titleUz: "",
  titleRu: "",
  titleEn: "",
  bodyUz: "",
  bodyRu: "",
  bodyEn: "",
  descUz: "",
  descRu: "",
  descEn: "",
  tag: { uz: "", ru: "", en: "" },
  color: COLORS[0],
  imageUrl: "",
  isPublished: true,
};

export default function AdminNewsPage() {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editing, setEditing] = useState<
    (Omit<NewsItem, "id"> & { id?: string }) | null
  >(null);
  const [lang, setLang] = useState<"uz" | "ru" | "en">("uz");
  const [uploadingImage, setUploadingImage] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      setItems(await getNews());
    } catch {
      setError("Ma'lumotlarni yuklashda xatolik");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const openNew = () =>
    setEditing({ ...EMPTY, date: new Date().toISOString().slice(0, 10) });
  const openEdit = (item: NewsItem) => setEditing({ ...item });
  const close = () => {
    setEditing(null);
    setError("");
    setSuccess("");
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0] || !editing) return;
    setUploadingImage(true);
    try {
      const url = await uploadImage(e.target.files[0], "news");
      setEditing((prev) => (prev ? { ...prev, imageUrl: url } : prev));
    } catch {
      setError("Rasm yuklashda xatolik");
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
      const { id: _id, ...data } = editing as NewsItem;
      await saveNews(id, data);
      setSuccess("Muvaffaqiyatli saqlandi!");
      await load();
      setTimeout(close, 1000);
    } catch {
      setError("Saqlashda xatolik yuz berdi");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (item: NewsItem) => {
    if (!confirm(`"${item.titleUz}" yangiligini o'chirasizmi?`)) return;
    try {
      await deleteNews(item.id!);
      if (item.imageUrl) await deleteImage(item.imageUrl);
      await load();
    } catch {
      setError("O'chirishda xatolik");
    }
  };

  const set = (field: string, val: unknown) =>
    setEditing((prev) => (prev ? { ...prev, [field]: val } : prev));
  const setTag = (l: string, val: string) =>
    setEditing((prev) =>
      prev ? { ...prev, tag: { ...prev.tag, [l]: val } } : prev,
    );

  return (
    <div>
      <style>{spinStyle}</style>
      <PageHeader
        title="Yangiliklar"
        description="Barcha yangiliklar ro'yxati"
        icon={<Newspaper size={18} color={C.gold} />}
        action={
          <Button onClick={openNew}>
            <Plus size={14} /> Qo'shish
          </Button>
        }
      />

      {error && <Alert type="error" message={error} />}

      {/* List */}
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
          <EmptyState message="Yangiliklar yo'q. Birinchi yangilikni qo'shing." />
        ) : (
          <div>
            {items.map((item, idx) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "14px 18px",
                  borderBottom:
                    idx < items.length - 1 ? `1px solid ${C.border}` : "none",
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.background =
                    C.surface;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.background =
                    "transparent";
                }}
              >
                {/* Color strip */}
                <div
                  style={{
                    width: 4,
                    height: 44,
                    borderRadius: 4,
                    background: item.color,
                    flexShrink: 0,
                  }}
                />

                {/* Image */}
                {item.imageUrl ? (
                  <div
                    style={{
                      width: 56,
                      height: 44,
                      borderRadius: 8,
                      overflow: "hidden",
                      flexShrink: 0,
                      background: "rgba(255,255,255,0.05)",
                    }}
                  >
                    <Image
                      src={item.imageUrl}
                      alt=""
                      width={56}
                      height={44}
                      style={{
                        objectFit: "cover",
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  </div>
                ) : (
                  <div
                    style={{
                      width: 56,
                      height: 44,
                      borderRadius: 8,
                      background: `${item.color}20`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Newspaper size={16} color={item.color} />
                  </div>
                )}

                <div style={{ flex: 1, minWidth: 0 }}>
                  <p
                    style={{
                      color: C.text,
                      fontWeight: 600,
                      fontSize: "0.88rem",
                      margin: "0 0 2px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.titleUz}
                  </p>
                  <p
                    style={{
                      color: C.textMuted,
                      fontSize: "0.75rem",
                      margin: 0,
                    }}
                  >
                    {item.date} · {item.tag?.uz || "—"}
                    {item.isPublished === false && " · 🔒 Chop etilmagan"}
                  </p>
                </div>

                <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
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

      {/* EDIT MODAL */}
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
              maxWidth: 680,
              padding: "28px",
              position: "relative",
              margin: "auto",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
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
                {editing.id ? "Yangilikni tahrirlash" : "Yangi yangilik"}
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
              {/* Date and published */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr auto",
                  gap: 12,
                  alignItems: "end",
                }}
              >
                <Input
                  label="Sana"
                  type="date"
                  value={editing.date}
                  onChange={(e) => set("date", e.target.value)}
                />
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    cursor: "pointer",
                    paddingBottom: 2,
                  }}
                >
                  <div
                    onClick={() => set("isPublished", !editing.isPublished)}
                    style={{
                      width: 44,
                      height: 24,
                      borderRadius: 12,
                      background:
                        editing.isPublished !== false
                          ? C.gold
                          : "rgba(255,255,255,0.1)",
                      border: "none",
                      cursor: "pointer",
                      position: "relative",
                      transition: "background 0.2s",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: 3,
                        left: editing.isPublished !== false ? 22 : 3,
                        width: 18,
                        height: 18,
                        borderRadius: "50%",
                        background: "white",
                        transition: "left 0.2s",
                      }}
                    />
                  </div>
                  <span style={{ color: C.textMuted, fontSize: "0.78rem" }}>
                    Chop etish
                  </span>
                </label>
              </div>

              {/* Language tabs */}
              <div>
                <SectionTitle>Matn (til bo'yicha)</SectionTitle>
                <LangTabs active={lang} onChange={setLang} />
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 12 }}
                >
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
                  />
                  <Textarea
                    label={`Qisqa tavsif (${lang.toUpperCase()})`}
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
                    style={{ minHeight: 80 }}
                  />
                  <Textarea
                    label={`To'liq matn (${lang.toUpperCase()})`}
                    value={
                      lang === "uz"
                        ? editing.bodyUz
                        : lang === "ru"
                          ? editing.bodyRu
                          : editing.bodyEn
                    }
                    onChange={(e) =>
                      set(
                        lang === "uz"
                          ? "bodyUz"
                          : lang === "ru"
                            ? "bodyRu"
                            : "bodyEn",
                        e.target.value,
                      )
                    }
                    style={{ minHeight: 120 }}
                  />
                  <Input
                    label={`Teg/Kategoriya (${lang.toUpperCase()})`}
                    value={
                      lang === "uz"
                        ? editing.tag.uz
                        : lang === "ru"
                          ? editing.tag.ru
                          : editing.tag.en
                    }
                    onChange={(e) => setTag(lang, e.target.value)}
                    placeholder="Masalan: Olimpiada, Sport..."
                  />
                </div>
              </div>

              {/* Color */}
              <div>
                <SectionTitle>Rang</SectionTitle>
                <div style={{ display: "flex", gap: 8 }}>
                  {COLORS.map((c) => (
                    <div
                      key={c}
                      onClick={() => set("color", c)}
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        background: c,
                        cursor: "pointer",
                        border:
                          editing.color === c
                            ? "3px solid white"
                            : "3px solid transparent",
                        transition: "border 0.2s",
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Image */}
              <div>
                <SectionTitle>Rasm</SectionTitle>
                {editing.imageUrl && (
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      height: 160,
                      borderRadius: 10,
                      overflow: "hidden",
                      marginBottom: 10,
                      background: "rgba(255,255,255,0.05)",
                    }}
                  >
                    <Image
                      src={editing.imageUrl}
                      alt=""
                      fill
                      sizes="(max-width: 680px) 100vw, 624px"
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
                        borderRadius: 6,
                        color: "white",
                        cursor: "pointer",
                        padding: 4,
                        display: "flex",
                      }}
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "10px 14px",
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

            {/* Actions */}
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
