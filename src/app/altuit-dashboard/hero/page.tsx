"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Sliders,
  Plus,
  Pencil,
  Trash2,
  X,
  Check,
  Eye,
  EyeOff,
} from "lucide-react";
import {
  getAllHeroSlides,
  saveHeroSlide,
  deleteHeroSlide,
  uploadImage,
  deleteImage,
  HeroSlideItem,
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
  ConfirmDialog,
  useToast,
  C,
  spinStyle,
  TableSkeleton,
} from "../_components/ui";

const EMPTY: Omit<HeroSlideItem, "id"> = {
  imageUrl: "",
  orderIndex: 0,
  isActive: true,
  titleUz: "",
  titleRu: "",
  titleEn: "",
  descUz: "",
  descRu: "",
  descEn: "",
};

export default function AdminHeroPage() {
  const [items, setItems] = useState<HeroSlideItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState<
    (Omit<HeroSlideItem, "id"> & { id?: string }) | null
  >(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<HeroSlideItem | null>(null);
  const [lang, setLang] = useState<"uz" | "ru" | "en">("uz");
  const { showToast } = useToast();

  const load = async () => {
    setLoading(true);
    try {
      setItems(await getAllHeroSlides());
    } catch {
      setError("Slaydlarni yuklashda xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const openNew = () => setEditing({ ...EMPTY, orderIndex: items.length });
  const openEdit = (item: HeroSlideItem) => setEditing({ ...item });
  const close = () => {
    setEditing(null);
    setError("");
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0] || !editing) return;
    setUploadingImage(true);
    try {
      const url = await uploadImage(e.target.files[0], "hero");
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
      await saveHeroSlide(id, data as HeroSlideItem);
      showToast(
        "success",
        editing.id ? "Slayd tahrirlandi" : "Slayd qo'shildi",
      );
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
      await deleteHeroSlide(deleteTarget.id!);
      await deleteImage(deleteTarget.imageUrl);
      showToast("success", "Slayd o'chirildi");
      await load();
    } catch {
      showToast("error", "O'chirishda xatolik yuz berdi");
    } finally {
      setDeleteTarget(null);
    }
  };

  const toggleActive = async (item: HeroSlideItem) => {
    try {
      const { id, ...data } = item;
      await saveHeroSlide(id!, { ...data, isActive: !data.isActive });
      await load();
    } catch {
      setError("Holatni o'zgartirishda xatolik yuz berdi");
    }
  };

  const set = (field: string, val: unknown) =>
    setEditing((prev) => (prev ? { ...prev, [field]: val } : prev));

  return (
    <div>
      <style>{spinStyle}</style>
      <ConfirmDialog
        open={!!deleteTarget}
        title="Slaydni o'chirish"
        message="Ushbu slaydni o'chirasizmi? Rasm ham serverdan o'chiriladi."
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
      <PageHeader
        title="Bosh sahifa slaydlar (Hero slider)"
        description="Bosh sahifa tepa qismida aylanuvchi premium rasmlarni boshqarish"
        icon={<Sliders size={18} color={C.gold} />}
        action={
          <Button onClick={openNew}>
            <Plus size={14} /> Slayd qo&apos;shish
          </Button>
        }
      />

      {error && <Alert type="error" message={error} />}

      {loading ? (
        <Card>
          <div style={{ padding: 16 }}>
            <TableSkeleton rows={5} />
          </div>
        </Card>
      ) : items.length === 0 ? (
        <Card>
          <EmptyState message="Slaydlar mavjud emas. Yangi slayd yuklash orqali bosh sahifani premium qiling." />
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
                opacity: item.isActive ? 1 : 0.6,
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
                    display: "flex",
                    gap: 6,
                  }}
                >
                  <span
                    style={{
                      background: "rgba(15,17,23,0.75)",
                      border: `1px solid ${C.border}`,
                      color: C.text,
                      fontSize: "0.68rem",
                      fontWeight: 700,
                      padding: "3px 8px",
                      borderRadius: 6,
                      backdropFilter: "blur(4px)",
                    }}
                  >
                    Tartib: {item.orderIndex}
                  </span>
                  <span
                    style={{
                      background: item.isActive
                        ? "rgba(34,197,94,0.85)"
                        : "rgba(239,68,68,0.85)",
                      color: "white",
                      fontSize: "0.68rem",
                      fontWeight: 700,
                      padding: "3px 8px",
                      borderRadius: 6,
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    {item.isActive ? <Eye size={10} /> : <EyeOff size={10} />}
                    {item.isActive ? "Faol" : "Nofaol"}
                  </span>
                </div>
              </div>

              <div
                style={{
                  padding: 16,
                  display: "flex",
                  gap: 8,
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Button
                  variant="outline"
                  onClick={() => toggleActive(item)}
                  style={{ padding: "6px 10px", fontSize: "0.78rem" }}
                >
                  {item.isActive ? "Nofaol qilish" : "Faol qilish"}
                </Button>
                <div style={{ display: "flex", gap: 6 }}>
                  <Button
                    variant="ghost"
                    onClick={() => openEdit(item)}
                    aria-label="Tahrirlash"
                    style={{ padding: "6px 10px" }}
                  >
                    <Pencil size={13} />
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => setDeleteTarget(item)}
                    aria-label="O'chirish"
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
            background: "rgba(5, 12, 26, 0.78)",
            backdropFilter: "blur(8px)",
            overflowY: "auto",
            padding: "20px",
          }}
        >
          <div
            style={{
              background: "linear-gradient(180deg, #10264e 0%, #0b1a37 100%)",
              border: `1px solid ${C.border}`,
              borderRadius: 20,
              width: "100%",
              maxWidth: 500,
              padding: "28px",
              margin: "auto",
              boxShadow: "0 24px 64px rgba(0,0,0,0.6), 0 0 40px rgba(26,58,110,0.25)",
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
                {editing.id ? "Tahrirlash" : "Yangi slayd qo'shish"}
              </h2>
              <button
                onClick={close}
                aria-label="Yopish"
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
              {/* Image upload */}
              <div>
                <SectionTitle>Slayd rasmi</SectionTitle>                {editing.imageUrl ? (
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
                      aria-label="Rasmni olib tashlash"
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
                      <Sliders size={32} color={C.textDim} />
                    )}
                    <span style={{ fontSize: "0.85rem", fontWeight: 500 }}>
                      {uploadingImage
                        ? "Yuklanmoqda..."
                        : "Rasm tanlash uchun bosing"}
                    </span>
                    <span style={{ fontSize: "0.72rem", opacity: 0.7 }}>
                      Keng formatdagi yuqori sifatli rasmlar tavsiya etiladi
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
                <SectionTitle>Slayd matni (ixtiyoriy)</SectionTitle>
                <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                  {(["uz", "ru", "en"] as const).map((l) => (
                    <button
                      key={l}
                      onClick={() => setLang(l)}
                      style={{
                        padding: "7px 14px",
                        borderRadius: 8,
                        border:
                          lang === l
                            ? `1px solid ${C.goldBorder}`
                            : `1px solid ${C.border}`,
                        background: lang === l ? C.goldLight : "transparent",
                        color: lang === l ? C.gold : C.textMuted,
                        fontSize: "0.8rem",
                        fontWeight: lang === l ? 700 : 500,
                        cursor: "pointer",
                        fontFamily: "inherit",
                      }}
                    >
                      {l === "uz" ? "O'zbek" : l === "ru" ? "Rus" : "Ingliz"}
                    </button>
                  ))}
                </div>
                <Input
                  label={`Sarlavha (${lang.toUpperCase()})`}
                  value={
                    lang === "uz"
                      ? editing.titleUz || ""
                      : lang === "ru"
                        ? editing.titleRu || ""
                        : editing.titleEn || ""
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
                  placeholder="Masalan: Bilim sari yo'l"
                />
                <div style={{ marginTop: 12 }}>
                  <Textarea
                    label={`Tavsif (${lang.toUpperCase()})`}
                    value={
                      lang === "uz"
                        ? editing.descUz || ""
                        : lang === "ru"
                          ? editing.descRu || ""
                          : editing.descEn || ""
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
                    placeholder="Slayd uchun qisqa tavsif (bo'sh bo'lsa umumiy matn ko'rsatiladi)"
                    rows={3}
                  />
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 16,
                  alignItems: "center",
                }}
              >
                <Input
                  label="Tartib raqami"
                  type="number"
                  value={editing.orderIndex}
                  onChange={(e) =>
                    set("orderIndex", parseInt(e.target.value) || 0)
                  }
                />

                <div>
                  <label
                    style={{
                      display: "block",
                      color: C.textMuted,
                      fontSize: "0.78rem",
                      fontWeight: 600,
                      marginBottom: 8,
                    }}
                  >
                    Holati
                  </label>
                  <label
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      cursor: "pointer",
                      color: C.text,
                      fontSize: "0.88rem",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={editing.isActive}
                      onChange={(e) => set("isActive", e.target.checked)}
                      style={{
                        accentColor: C.gold,
                        width: 16,
                        height: 16,
                        cursor: "pointer",
                      }}
                    />
                    Saytda ko&apos;rsatish (Faol)
                  </label>
                </div>
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
