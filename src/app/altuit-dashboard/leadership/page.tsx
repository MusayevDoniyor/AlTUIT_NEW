"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Users,
  Plus,
  Pencil,
  Trash2,
  X,
  Check,
  GripVertical,
} from "lucide-react";
import {
  getLeadership,
  saveLeadership,
  deleteLeadership,
  uploadImage,
  deleteImage,
  LeadershipItem,
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
  "#9a3412",
  "#0f766e",
];

const EMPTY: Omit<LeadershipItem, "id"> = {
  nameUz: "",
  nameRu: "",
  nameEn: "",
  roleUz: "",
  roleRu: "",
  roleEn: "",
  phone: "",
  email: "",
  initials: "",
  color: COLORS[0],
  orderIndex: 0,
};

export default function AdminLeadershipPage() {
  const [items, setItems] = useState<LeadershipItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editing, setEditing] = useState<
    (Omit<LeadershipItem, "id"> & { id?: string }) | null
  >(null);
  const [lang, setLang] = useState<"uz" | "ru" | "en">("uz");
  const [uploadingImage, setUploadingImage] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      setItems(await getLeadership());
    } catch {
      setError("Xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const openNew = () => setEditing({ ...EMPTY, orderIndex: items.length });
  const openEdit = (item: LeadershipItem) => setEditing({ ...item });
  const close = () => {
    setEditing(null);
    setError("");
    setSuccess("");
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0] || !editing) return;
    setUploadingImage(true);
    try {
      const url = await uploadImage(e.target.files[0], "leadership");
      setEditing((prev) => (prev ? { ...prev, photoUrl: url } : prev));
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
      const { id: _id, ...data } = editing as LeadershipItem;
      await saveLeadership(id, data);
      setSuccess("Muvaffaqiyatli saqlandi!");
      await load();
      setTimeout(close, 1000);
    } catch {
      setError("Saqlashda xatolik");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (item: LeadershipItem) => {
    if (!confirm(`"${item.nameUz}"ni o'chirasizmi?`)) return;
    try {
      await deleteLeadership(item.id!);
      if (item.photoUrl) await deleteImage(item.photoUrl);
      await load();
    } catch {
      setError("O'chirishda xatolik");
    }
  };

  const set = (field: string, val: unknown) =>
    setEditing((prev) => (prev ? { ...prev, [field]: val } : prev));

  return (
    <div>
      <style>{spinStyle}</style>
      <PageHeader
        title="Rahbariyat"
        description="Litsey rahbariyati ma'lumotlari"
        icon={<Users size={18} color={C.gold} />}
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
          <EmptyState message="Rahbariyat ma'lumotlari yo'q." />
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
                }}
              >
                <GripVertical
                  size={14}
                  color={C.textDim}
                  style={{ flexShrink: 0 }}
                />

                {/* Avatar */}
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    overflow: "hidden",
                    background: item.photoUrl
                      ? "transparent"
                      : `${item.color}20`,
                    border: `2px solid ${item.color}30`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {item.photoUrl ? (
                    <Image
                      src={item.photoUrl}
                      alt=""
                      width={44}
                      height={44}
                      style={{
                        objectFit: "cover",
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  ) : (
                    <span
                      style={{
                        color: item.color,
                        fontWeight: 700,
                        fontSize: "0.9rem",
                      }}
                    >
                      {item.initials || "?"}
                    </span>
                  )}
                </div>

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
                    {item.nameUz}
                  </p>
                  <p
                    style={{
                      color: C.textMuted,
                      fontSize: "0.75rem",
                      margin: 0,
                    }}
                  >
                    {item.roleUz}
                  </p>
                </div>

                <p
                  style={{
                    color: C.textDim,
                    fontSize: "0.75rem",
                    flexShrink: 0,
                    display: "none",
                  }}
                >
                  {item.phone}
                </p>

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
              maxWidth: 620,
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
                {editing.id ? "Tahrirlash" : "Yangi rahbariyat a'zosi"}
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
              {/* Multilingual */}
              <SectionTitle>Ism va lavozim (til bo'yicha)</SectionTitle>
              <LangTabs active={lang} onChange={setLang} />
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                }}
              >
                <Input
                  label={`Ism (${lang.toUpperCase()})`}
                  value={
                    lang === "uz"
                      ? editing.nameUz
                      : lang === "ru"
                        ? editing.nameRu
                        : editing.nameEn
                  }
                  onChange={(e) =>
                    set(
                      lang === "uz"
                        ? "nameUz"
                        : lang === "ru"
                          ? "nameRu"
                          : "nameEn",
                      e.target.value,
                    )
                  }
                />
                <Input
                  label={`Lavozim (${lang.toUpperCase()})`}
                  value={
                    lang === "uz"
                      ? editing.roleUz
                      : lang === "ru"
                        ? editing.roleRu
                        : editing.roleEn
                  }
                  onChange={(e) =>
                    set(
                      lang === "uz"
                        ? "roleUz"
                        : lang === "ru"
                          ? "roleRu"
                          : "roleEn",
                      e.target.value,
                    )
                  }
                />
              </div>

              {/* Contact */}
              <SectionTitle>Aloqa ma'lumotlari</SectionTitle>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                }}
              >
                <Input
                  label="Telefon"
                  value={editing.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  placeholder="+998 90 123 45 67"
                />
                <Input
                  label="Email"
                  type="email"
                  value={editing.email}
                  onChange={(e) => set("email", e.target.value)}
                  placeholder="direktor@tatual.uz"
                />
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                }}
              >
                <Input
                  label="Boshlang'ich harflar (initials)"
                  value={editing.initials}
                  onChange={(e) => set("initials", e.target.value)}
                  placeholder="A.S"
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

              {/* Photo */}
              <div>
                <SectionTitle>Rasm</SectionTitle>
                {editing.photoUrl && (
                  <div
                    style={{
                      position: "relative",
                      width: 80,
                      height: 80,
                      borderRadius: "50%",
                      overflow: "hidden",
                      marginBottom: 10,
                    }}
                  >
                    <Image
                      src={editing.photoUrl}
                      alt=""
                      fill
                      sizes="80px"
                      style={{ objectFit: "cover" }}
                    />
                    <button
                      onClick={() => set("photoUrl", "")}
                      style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        background: "rgba(0,0,0,0.6)",
                        border: "none",
                        borderRadius: 6,
                        color: "white",
                        cursor: "pointer",
                        padding: 3,
                        display: "flex",
                      }}
                    >
                      <X size={12} />
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
