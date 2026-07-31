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
  ConfirmDialog,
  useToast,
  ImageUpload,
  C,
  spinStyle,
  TableSkeleton,
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
  const [editing, setEditing] = useState<
    (Omit<LeadershipItem, "id"> & { id?: string }) | null
  >(null);
  const [lang, setLang] = useState<"uz" | "ru" | "en">("uz");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<LeadershipItem | null>(null);
  const { showToast } = useToast();

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
  };

  const handleImageUpload = async (file: File) => {
    if (!editing) return;
    setUploadingImage(true);
    try {
      const url = await uploadImage(file, "leadership");
      setEditing((prev) => (prev ? { ...prev, photoUrl: url } : prev));
    } catch {
      showToast("error", "Rasm yuklashda xatolik");
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
      showToast("success", editing.id ? "Tahrirlandi" : "Qo'shildi");
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
      await deleteLeadership(deleteTarget.id!);
      if (deleteTarget.photoUrl) await deleteImage(deleteTarget.photoUrl);
      showToast("success", `"${deleteTarget.nameUz}" o'chirildi`);
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
        title="Rahbariyat a'zosini o'chirish"
        message={`"${deleteTarget?.nameUz}"ni o'chirasizmi?`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
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
          <div style={{ padding: 16 }}>
            <TableSkeleton rows={5} />
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
                <ImageUpload
                  currentUrl={editing.photoUrl || ""}
                  onUpload={handleImageUpload}
                  onRemove={() => set("photoUrl", "")}
                  uploading={uploadingImage}
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
