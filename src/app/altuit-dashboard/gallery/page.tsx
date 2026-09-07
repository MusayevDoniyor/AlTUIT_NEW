"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ImageIcon, Plus, Pencil, Trash2, X, Check } from "lucide-react";
import {
  getGallery,
  saveGallery,
  deleteGallery,
  uploadImage,
  deleteImage,
  GalleryItem,
} from "@/lib/db";
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
  CardSkeleton,
} from "../_components/ui";

const EMPTY: Omit<GalleryItem, "id"> = {
  imageUrl: "",
  captionUz: "",
  captionRu: "",
  captionEn: "",
  category: "Tadbirlar",
  createdAt: 0,
};

const CATEGORIES = [
  { label: "Tadbirlar", value: "Tadbirlar" },
  { label: "O'quv jarayoni", value: "O'quv jarayoni" },
  { label: "Binolar & Sharoitlar", value: "Binolar" },
  { label: "Sport hayoti", value: "Sport" },
  { label: "Boshqa", value: "Boshqa" },
];

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState<
    (Omit<GalleryItem, "id"> & { id?: string }) | null
  >(null);
  const [lang, setLang] = useState<"uz" | "ru" | "en">("uz");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<GalleryItem | null>(null);
  const { showToast } = useToast();

  const load = async () => {
    setLoading(true);
    try {
      setItems(await getGallery());
    } catch {
      setError("Galereyani yuklashda xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const openNew = () => setEditing({ ...EMPTY, createdAt: Date.now() });
  const openEdit = (item: GalleryItem) => setEditing({ ...item });
  const close = () => {
    setEditing(null);
    setError("");
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0] || !editing) return;
    setUploadingImage(true);
    try {
      const url = await uploadImage(e.target.files[0], "gallery");
      setEditing((prev) => (prev ? { ...prev, imageUrl: url } : prev));
    } catch {
      setError("Rasm yuklashda xatolik yuz berdi");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSave = async () => {
    if (!editing || !editing.imageUrl) {
      showToast("error", "Rasm yuklash majburiy!");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const id = editing.id || Date.now().toString();
      const data = { ...editing };
      delete (data as { id?: string }).id;
      await saveGallery(id, data as GalleryItem);
      showToast("success", editing.id ? "Tahrirlandi" : "Rasm qo'shildi");
      await load();
      close();
    } catch {
      showToast("error", "Saqlashda xatolik yuz berdi");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteGallery(deleteTarget.id!);
      await deleteImage(deleteTarget.imageUrl);
      showToast("success", "Rasm o'chirildi");
      await load();
    } catch {
      showToast("error", "O'chirishda xatolik yuz berdi");
    } finally {
      setDeleteTarget(null);
    }
  };

  const set = (field: string, val: unknown) =>
    setEditing((prev) => (prev ? { ...prev, [field]: val } : prev));

  return (
    <div>
      <style>{spinStyle}</style>
      <ConfirmDialog
        open={!!deleteTarget}
        title="Rasmni o'chirish"
        message="Ushbu rasmni o'chirasizmi? Bu amalni qaytarib bo'lmaydi."
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
      <PageHeader
        title="Galereya"
        description="Litsey hayotidan olingan rasmlar va fotolavhalarni boshqarish"
        icon={<ImageIcon size={18} color={C.gold} />}
        action={
          <Button onClick={openNew}>
            <Plus size={14} /> Rasm qo&apos;shish
          </Button>
        }
      />

      {error && <Alert type="error" message={error} />}

      {loading ? (
        <CardSkeleton count={6} />
      ) : items.length === 0 ? (
        <Card>
          <EmptyState message="Galereya bo'sh. Sayt galereyasini to'ldirish uchun rasm qo'shing." />
        </Card>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 20,
          }}
        >
          {items.map((item) => (
            <Card
              key={item.id}
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: 180,
                  background: "rgba(255,255,255,0.02)",
                }}
              >
                <Image
                  src={item.imageUrl}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: "cover" }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: 12,
                    left: 12,
                    background: "rgba(15,17,23,0.75)",
                    border: `1px solid ${C.border}`,
                    color: C.gold,
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    padding: "3px 8px",
                    borderRadius: 6,
                    backdropFilter: "blur(4px)",
                  }}
                >
                  {item.category}
                </div>
              </div>
              <div
                style={{
                  padding: 16,
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <p
                  style={{
                    color: C.text,
                    fontSize: "0.83rem",
                    fontWeight: 500,
                    margin: "0 0 12px",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {item.captionUz || "(Izoh yo'q)"}
                </p>
                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    justifyContent: "flex-end",
                  }}
                >
                  <Button
                    variant="ghost"
                    onClick={() => openEdit(item)}
                    style={{ padding: "6px 10px" }}
                  >
                    <Pencil size={13} />
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => setDeleteTarget(item)}
                    style={{ padding: "6px 10px" }}
                  >
                    <Trash2 size={13} />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

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
                {editing.id ? "Tahrirlash" : "Yangi rasm yuklash"}
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

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {/* Image upload section (MUST be at the top) */}
              <div>
                <SectionTitle>Rasm yuklash</SectionTitle>
                {editing.imageUrl ? (
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      height: 200,
                      borderRadius: 12,
                      overflow: "hidden",
                      marginBottom: 12,
                      border: `1px solid ${C.border}`,
                    }}
                  >
                    <Image
                      src={editing.imageUrl}
                      alt=""
                      fill
                      sizes="(max-width: 500px) 100vw, 444px"
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
                ) : (
                  <label
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 10,
                      padding: "40px 20px",
                      border: `1px dashed ${C.border}`,
                      borderRadius: 12,
                      cursor: "pointer",
                      color: C.textMuted,
                      background: "rgba(255,255,255,0.02)",
                      transition: "all 0.2s",
                    }}
                  >
                    {uploadingImage ? (
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
                      {uploadingImage
                        ? "Rasm yuklanmoqda..."
                        : "Rasm tanlash uchun bosing"}
                    </span>
                    <span style={{ fontSize: "0.72rem", opacity: 0.7 }}>
                      PNG, JPG, WEBP formatlar
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleImageUpload}
                      disabled={uploadingImage}
                    />
                  </label>
                )}
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
                  {CATEGORIES.map((c) => (
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

              <SectionTitle>Rasm izohi (til bo&apos;yicha)</SectionTitle>
              <LangTabs active={lang} onChange={setLang} />

              <Input
                label={`Tavsif / Izoh (${lang.toUpperCase()})`}
                value={
                  lang === "uz"
                    ? editing.captionUz
                    : lang === "ru"
                      ? editing.captionRu
                      : editing.captionEn
                }
                onChange={(e) =>
                  set(
                    lang === "uz"
                      ? "captionUz"
                      : lang === "ru"
                        ? "captionRu"
                        : "captionEn",
                    e.target.value,
                  )
                }
                placeholder="Rasm ostida ko'rinadigan qisqa izoh..."
              />
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
              <Button
                onClick={handleSave}
                loading={saving}
                disabled={!editing.imageUrl}
              >
                <Check size={14} /> Saqlash
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
