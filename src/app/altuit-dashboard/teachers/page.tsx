"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { GraduationCap, Plus, Pencil, Trash2, X, Check } from "lucide-react";
import {
  getTeachers,
  saveTeacher,
  deleteTeacher,
  uploadImage,
  deleteImage,
  TeacherItem,
} from "@/lib/db";
import {
  PageHeader,
  Card,
  Input,
  Button,
  EmptyState,
  SectionTitle,
  LangTabs,
  ConfirmDialog,
  ImageUpload,
  useToast,
  C,
  spinStyle,
} from "../_components/ui";

const EMPTY: Omit<TeacherItem, "id"> = {
  fullNameUz: "",
  fullNameRu: "",
  fullNameEn: "",
  subjectUz: "",
  subjectRu: "",
  subjectEn: "",
  orderIndex: 0,
};

export default function AdminTeachersPage() {
  const [items, setItems] = useState<TeacherItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState<
    (Omit<TeacherItem, "id"> & { id?: string }) | null
  >(null);
  const [lang, setLang] = useState<"uz" | "ru" | "en">("uz");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<TeacherItem | null>(null);
  const { showToast } = useToast();

  const load = async () => {
    setLoading(true);
    try {
      setItems(await getTeachers());
    } catch {
      showToast("error", "Xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const openNew = () => setEditing({ ...EMPTY, orderIndex: items.length });
  const openEdit = (item: TeacherItem) => setEditing({ ...item });
  const close = () => {
    setEditing(null);
  };

  const handleImageUpload = async (file: File) => {
    if (!editing) return;
    setUploadingImage(true);
    try {
      const url = await uploadImage(file, "teachers");
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
    try {
      const id = editing.id || Date.now().toString();
      const { id: _id, ...data } = editing as TeacherItem;
      await saveTeacher(id, data);
      showToast(
        "success",
        editing.id ? "O'qituvchi tahrirlandi" : "O'qituvchi qo'shildi",
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
      await deleteTeacher(deleteTarget.id!);
      if (deleteTarget.photoUrl) await deleteImage(deleteTarget.photoUrl);
      showToast("success", `"${deleteTarget.fullNameUz}" o'chirildi`);
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
        title="O'qituvchini o'chirish"
        message={`"${deleteTarget?.fullNameUz}" o'qituvchisini o'chirasizmi?`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />

      <PageHeader
        title="Pedagog xodimlar"
        description="O'qituvchilar ro'yxati"
        icon={<GraduationCap size={18} color={C.gold} />}
        action={
          <Button onClick={openNew}>
            <Plus size={14} /> Qo'shish
          </Button>
        }
      />

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
          <EmptyState message="O'qituvchilar yo'q." />
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
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    overflow: "hidden",
                    background: "rgba(200,169,110,0.1)",
                    border: "2px solid rgba(200,169,110,0.2)",
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
                    <GraduationCap size={18} color={C.gold} />
                  )}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p
                    style={{
                      color: C.text,
                      fontWeight: 600,
                      fontSize: "0.88rem",
                      margin: "0 0 2px",
                    }}
                  >
                    {item.fullNameUz}
                  </p>
                  <p
                    style={{
                      color: C.textMuted,
                      fontSize: "0.75rem",
                      margin: 0,
                    }}
                  >
                    {item.subjectUz}
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
                {editing.id ? "Tahrirlash" : "Yangi o'qituvchi"}
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
              <SectionTitle>Ism va fan (til bo'yicha)</SectionTitle>
              <LangTabs active={lang} onChange={setLang} />
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                }}
              >
                <Input
                  label={`To'liq ism (${lang.toUpperCase()})`}
                  value={
                    lang === "uz"
                      ? editing.fullNameUz
                      : lang === "ru"
                        ? editing.fullNameRu
                        : editing.fullNameEn
                  }
                  onChange={(e) =>
                    set(
                      lang === "uz"
                        ? "fullNameUz"
                        : lang === "ru"
                          ? "fullNameRu"
                          : "fullNameEn",
                      e.target.value,
                    )
                  }
                />
                <Input
                  label={`Fan (${lang.toUpperCase()})`}
                  value={
                    lang === "uz"
                      ? editing.subjectUz
                      : lang === "ru"
                        ? editing.subjectRu
                        : editing.subjectEn
                  }
                  onChange={(e) =>
                    set(
                      lang === "uz"
                        ? "subjectUz"
                        : lang === "ru"
                          ? "subjectRu"
                          : "subjectEn",
                      e.target.value,
                    )
                  }
                />
              </div>
              <Input
                label="Tartib raqami"
                type="number"
                value={editing.orderIndex}
                onChange={(e) =>
                  set("orderIndex", parseInt(e.target.value) || 0)
                }
              />

              <div>
                <SectionTitle>Rasm</SectionTitle>
                <ImageUpload
                  currentUrl={editing.photoUrl || ""}
                  onUpload={handleImageUpload}
                  onRemove={() => set("photoUrl", "")}
                  uploading={uploadingImage}
                  folder="teachers"
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
