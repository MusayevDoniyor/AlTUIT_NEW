"use client";

import { useEffect, useState } from "react";
import { FileText, Plus, Pencil, Trash2, X, Check } from "lucide-react";
import {
  getAdmissionRules,
  saveAdmissionRule,
  deleteAdmissionRule,
  AdmissionRuleItem,
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
  ConfirmDialog,
  useToast,
  C,
  spinStyle,
} from "../_components/ui";

const EMPTY: Omit<AdmissionRuleItem, "id"> = {
  titleUz: "",
  titleRu: "",
  titleEn: "",
  contentUz: "",
  contentRu: "",
  contentEn: "",
  orderIndex: 0,
};

export default function AdminAdmissionPage() {
  const [items, setItems] = useState<AdmissionRuleItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editing, setEditing] = useState<
    (Omit<AdmissionRuleItem, "id"> & { id?: string }) | null
  >(null);
  const [lang, setLang] = useState<"uz" | "ru" | "en">("uz");
  const [deleteTarget, setDeleteTarget] = useState<AdmissionRuleItem | null>(
    null,
  );
  const { showToast } = useToast();

  const load = async () => {
    setLoading(true);
    try {
      setItems(await getAdmissionRules());
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
  const openEdit = (item: AdmissionRuleItem) => setEditing({ ...item });
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
      const id = editing.id || Date.now().toString();
      const { id: _id, ...data } = editing as AdmissionRuleItem;
      await saveAdmissionRule(id, data);
      showToast("success", editing.id ? "Tahrirlandi" : "Qo'shildi");
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
      await deleteAdmissionRule(deleteTarget.id!);
      showToast("success", `"${deleteTarget.titleUz}" o'chirildi`);
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
        title="Qoidani o'chirish"
        message={`"${deleteTarget?.titleUz}" qoidasini o'chirasizmi?`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
      <PageHeader
        title="Kirish qoidalari"
        description="Qabul qilish tartibi, imtihonlar va kerakli hujjatlar qoidalarini boshqarish"
        icon={<FileText size={18} color={C.gold} />}
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
          <EmptyState message="Qoidalar ro'yxati bo'sh. Qo'shish tugmasi orqali yangi kirish qoidasi/bandini qo'shing." />
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
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: "rgba(200,169,110,0.1)",
                    border: "1px solid rgba(200,169,110,0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    color: C.gold,
                    fontWeight: 700,
                    fontSize: "0.85rem",
                  }}
                >
                  {item.orderIndex + 1}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
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
                    {item.contentUz}
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
                {editing.id ? "Tahrirlash" : "Yangi qoida bandi"}
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
                placeholder="Masalan: Kerakli hujjatlar"
              />

              <Textarea
                label={`Matn tarkibi (${lang.toUpperCase()})`}
                value={
                  lang === "uz"
                    ? editing.contentUz
                    : lang === "ru"
                      ? editing.contentRu
                      : editing.contentEn
                }
                onChange={(e) =>
                  set(
                    lang === "uz"
                      ? "contentUz"
                      : lang === "ru"
                        ? "contentRu"
                        : "contentEn",
                    e.target.value,
                  )
                }
                placeholder="Bu bandning to'liq matnini kiriting. Xohlasangiz, yangi qatorlar tashlashingiz mumkin..."
                style={{ minHeight: 180 }}
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
