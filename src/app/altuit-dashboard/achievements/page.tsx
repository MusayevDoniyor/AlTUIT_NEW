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
  EmptyState,
  SectionTitle,
  LangTabs,
  ConfirmDialog,
  ImageUpload,
  useToast,
  Select,
  C,
  spinStyle,
  TableSkeleton,
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
  const [editing, setEditing] = useState<
    (Omit<AchievementItem, "id"> & { id?: string }) | null
  >(null);
  const [lang, setLang] = useState<"uz" | "ru" | "en">("uz");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<AchievementItem | null>(
    null,
  );
  const { showToast } = useToast();

  const load = async () => {
    setLoading(true);
    try {
      setItems(await getAchievements());
    } catch {
      showToast("error", "Ma'lumotlarni yuklashda xatolik");
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
  };

  const handleImageUpload = async (file: File) => {
    if (!editing) return;
    setUploadingImage(true);
    try {
      const url = await uploadImage(file, "achievements");
      setEditing((prev) => (prev ? { ...prev, imageUrl: url } : prev));
    } catch {
      showToast("error", "Rasm yuklashda xatolik");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      const id = editing.id || Date.now().toString();
      const { id: _id, ...data } = editing as AchievementItem;
      await saveAchievement(id, data);
      showToast(
        "success",
        editing.id ? "Yutuq tahrirlandi" : "Yutuq qo'shildi",
      );
      await load();
      close();
    } catch {
      showToast("error", "Saqlashda xatolik");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteAchievement(deleteTarget.id!);
      if (deleteTarget.imageUrl) await deleteImage(deleteTarget.imageUrl);
      showToast("success", `"${deleteTarget.titleUz}" o'chirildi`);
      await load();
    } catch {
      showToast("error", "O'chirishda xatolik");
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
        title="Yutuqni o'chirish"
        message={`"${deleteTarget?.titleUz}" yutug'ini o'chirasizmi?`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />

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

      <Card>
        {loading ? (
          <div style={{ padding: 16 }}>
            <TableSkeleton rows={5} />
          </div>
        ) : items.length === 0 ? (
          <EmptyState message="Yutuqlar ro'yxati bo'sh." />
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
                    onClick={() => setDeleteTarget(item)}
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
                <Select
                  label="Kategoriya"
                  value={editing.category}
                  onChange={(e) => set("category", e.target.value)}
                  options={CATEGORY_OPTIONS}
                />
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                }}
              >
                <Select
                  label="Mavzu rangi / Nishon turi"
                  value={editing.color}
                  onChange={(e) => set("color", e.target.value)}
                  options={COLOR_OPTIONS}
                />
                <Input
                  label="Tartib raqami"
                  type="number"
                  value={editing.orderIndex}
                  onChange={(e) =>
                    set("orderIndex", parseInt(e.target.value) || 0)
                  }
                />
              </div>

              <div>
                <SectionTitle>Rasm (ixtiyoriy)</SectionTitle>
                <ImageUpload
                  currentUrl={editing.imageUrl || ""}
                  onUpload={handleImageUpload}
                  onRemove={() => set("imageUrl", "")}
                  uploading={uploadingImage}
                  folder="achievements"
                />
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
