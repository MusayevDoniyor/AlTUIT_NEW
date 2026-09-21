"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Users,
  Plus,
  Pencil,
  Trash2,
  Check,
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
  AdminModal,
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
      const data = { ...editing };
      delete (data as { id?: string }).id;
      await saveLeadership(id, data as LeadershipItem);
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
            <Plus size={14} /> Qo&apos;shish
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
      <AdminModal
        open={Boolean(editing)}
        onClose={close}
        maxWidth={780}
        title={editing?.id ? "Rahbariyat a'zosini tahrirlash" : "Yangi rahbariyat a'zosi"}
        subtitle="TATU akademik litseyi rahbariyati ma'lumotlari"
        footer={
          <>
            <Button variant="ghost" onClick={close}>
              Bekor qilish
            </Button>
            <Button onClick={handleSave} loading={saving}>
              <Check size={14} /> Saqlash
            </Button>
          </>
        }
      >
        {editing && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: 20,
              alignItems: "start",
            }}
          >
            {/* Left: Info */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <SectionTitle>Rahbariyat ma&apos;lumotlari</SectionTitle>
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
                  label="Boshlang'ich harflar"
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
                <SectionTitle>Mavzu rangi</SectionTitle>
                <div style={{ display: "flex", gap: 8 }}>
                  {COLORS.map((c) => (
                    <div
                      key={c}
                      onClick={() => set("color", c)}
                      style={{
                        width: 26,
                        height: 26,
                        borderRadius: "50%",
                        background: c,
                        cursor: "pointer",
                        border:
                          editing.color === c
                            ? "3px solid white"
                            : "2px solid transparent",
                        boxShadow:
                          editing.color === c
                            ? "0 0 8px rgba(255,255,255,0.4)"
                            : "none",
                        transition: "all 0.15s ease",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Photo */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <SectionTitle>Fotosurat</SectionTitle>
              <ImageUpload
                currentUrl={editing.photoUrl || ""}
                onUpload={handleImageUpload}
                onRemove={() => set("photoUrl", "")}
                uploading={uploadingImage}
              />
            </div>
          </div>
        )}
      </AdminModal>
    </div>
  );
}
