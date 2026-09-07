"use client";

import { useEffect, useState } from "react";
import { Building2, Plus, Pencil, Trash2, X, Check } from "lucide-react";
import {
  getDepartments,
  saveDepartment,
  deleteDepartment,
  getTeachers,
  saveTeacher,
  DepartmentItem,
  TeacherItem,
} from "@/lib/db";
import {
  PageHeader,
  Card,
  Input,
  Button,
  EmptyState,
  ConfirmDialog,
  useToast,
  C,
  spinStyle,
  TableSkeleton,
} from "../_components/ui";

const EMPTY: Omit<DepartmentItem, "id"> = {
  nameUz: "",
  nameRu: "",
  nameEn: "",
  headTeacherId: null,
  orderIndex: 0,
};

export default function AdminDepartmentsPage() {
  const [items, setItems] = useState<DepartmentItem[]>([]);
  const [teachers, setTeachers] = useState<TeacherItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState<(DepartmentItem & { isNew?: boolean }) | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<DepartmentItem | null>(null);
  const [lang, setLang] = useState<"uz" | "ru" | "en">("uz");
  const { showToast } = useToast();

  const load = async () => {
    setLoading(true);
    try {
      const [depts, teachers] = await Promise.all([
        getDepartments(),
        getTeachers(),
      ]);
      setItems(depts);
      setTeachers(teachers);
    } catch {
      showToast("error", "Yuklashda xatolik");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openNew = () => setEditing({ ...EMPTY, orderIndex: items.length, isNew: true });
  const openEdit = (item: DepartmentItem) => setEditing({ ...item, isNew: false });
  const close = () => setEditing(null);

  const handleSave = async () => {
    if (!editing || !editing.nameUz) {
      showToast("error", "Nomi majburiy");
      return;
    }
    setSaving(true);
    try {
      const id = editing.isNew ? Date.now().toString() : editing.id!;
      const data = { ...editing };
      delete (data as { isNew?: boolean }).isNew;
      delete (data as { id?: string }).id;
      await saveDepartment(id, data as Omit<DepartmentItem, "id">);

      // Auto-assign the head teacher to this department
      if (editing.headTeacherId) {
        const head = teachers.find((t) => t.id === editing.headTeacherId);
        if (head && head.departmentId !== id) {
          const { id: hid, ...headData } = head as TeacherItem;
          await saveTeacher(hid!, { ...headData, departmentId: id });
        }
      }

      showToast("success", editing.isNew ? "Qo'shildi" : "Tahrirlandi");
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
      await deleteDepartment(deleteTarget.id!);
      // Clear department assignment from its teachers
      for (const t of teachers.filter((t) => t.departmentId === deleteTarget.id)) {
        const { id: tid, ...tData } = t as TeacherItem;
        await saveTeacher(tid!, { ...tData, departmentId: "" });
      }
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

  const teachersInDept = (deptId?: string) =>
    teachers.filter((t) => t.departmentId === deptId);

  const headTeacherName = (headId?: string | null) => {
    if (!headId) return "";
    const t = teachers.find((t) => t.id === headId);
    if (!t) return "";
    return lang === "uz" ? t.fullNameUz : lang === "ru" ? t.fullNameRu || t.fullNameUz : t.fullNameEn || t.fullNameUz;
  };

  return (
    <div>
      <style>{spinStyle}</style>
      <ConfirmDialog
        open={!!deleteTarget}
        title="Kafedrani o'chirish"
        message={`"${deleteTarget?.nameUz}" kafedrasini o'chirasizmi?`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
      <PageHeader
        title="Kafedralar"
        description="Kafedralarni boshqarish va mudirlarni belgilash"
        icon={<Building2 size={18} color={C.gold} />}
        action={
          <Button onClick={openNew}>
            <Plus size={14} /> Qo&apos;shish
          </Button>
        }
      />

      <Card>
        {loading ? (
          <div style={{ padding: 16 }}><TableSkeleton rows={6} /></div>
        ) : items.length === 0 ? (
          <EmptyState message="Kafedralar mavjud emas." />
        ) : (
          <div>
            {items.map((item, idx) => {
              const name = lang === "uz" ? item.nameUz : lang === "ru" ? item.nameRu : item.nameEn;
              const tCount = teachersInDept(item.id).length;
              const head = headTeacherName(item.headTeacherId);
              return (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    padding: "16px 20px",
                    borderBottom: idx < items.length - 1 ? `1px solid ${C.border}` : "none",
                  }}
                >
                  <div style={{
                    width: 40, height: 40, borderRadius: 10,
                    background: "rgba(200,169,110,0.1)",
                    border: "1px solid rgba(200,169,110,0.25)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, color: C.gold,
                  }}>
                    <Building2 size={18} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ color: C.text, fontWeight: 600, fontSize: "0.9rem", margin: 0 }}>{name}</p>
                    <p style={{ color: C.textMuted, fontSize: "0.78rem", margin: "4px 0 0" }}>
                      {tCount} ta o&apos;qituvchi{head ? ` · Mudir: ${head}` : ""}
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: 6 }}>
                    <Button variant="ghost" onClick={() => openEdit(item)} style={{ padding: "6px 10px" }}>
                      <Pencil size={13} />
                    </Button>
                    <Button variant="danger" onClick={() => setDeleteTarget(item)} style={{ padding: "6px 10px" }}>
                      <Trash2 size={13} />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>

      {editing && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 100,
          display: "flex", alignItems: "flex-start", justifyContent: "center",
          background: "rgba(5, 12, 26, 0.78)", backdropFilter: "blur(8px)",
          overflowY: "auto", padding: "20px",
        }}>
          <div style={{
            background: "linear-gradient(180deg, #10264e 0%, #0b1a37 100%)",
            border: `1px solid ${C.border}`,
            borderRadius: 20, width: "100%", maxWidth: 500,
            padding: "28px", margin: "auto",
            boxShadow: "0 24px 64px rgba(0,0,0,0.6), 0 0 40px rgba(26,58,110,0.25)",
          }}>
            <div style={{
              display: "flex", alignItems: "center",
              justifyContent: "space-between", marginBottom: 24,
            }}>
              <h2 style={{ color: C.text, fontWeight: 800, fontSize: "1.1rem", margin: 0 }}>
                {editing.isNew ? "Yangi kafedra" : "Tahrirlash"}
              </h2>
              <button onClick={close} style={{ background: "none", border: "none", color: C.textMuted, cursor: "pointer", padding: 4 }}>
                <X size={20} />
              </button>
            </div>

            {/* Language tabs */}
            <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
              {(["uz", "ru", "en"] as const).map((l) => (
                <button key={l} onClick={() => setLang(l)}
                  style={{
                    padding: "7px 14px", borderRadius: 8,
                    border: lang === l ? `1px solid ${C.goldBorder}` : `1px solid ${C.border}`,
                    background: lang === l ? C.goldLight : "transparent",
                    color: lang === l ? C.gold : C.textMuted,
                    fontSize: "0.8rem", fontWeight: lang === l ? 700 : 500,
                    cursor: "pointer", fontFamily: "inherit",
                  }}
                >{l === "uz" ? "O'zbek" : l === "ru" ? "Rus" : "Ingliz"}</button>
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <Input
                label={`Nomi (${lang.toUpperCase()})`}
                value={
                  lang === "uz" ? editing.nameUz : lang === "ru" ? editing.nameRu : editing.nameEn
                }
                onChange={(e) => set(
                  lang === "uz" ? "nameUz" : lang === "ru" ? "nameRu" : "nameEn",
                  e.target.value,
                )}
                placeholder={lang === "uz" ? "Masalan: Matematika va fizika" : "Kafedra nomi"}
              />
              <Input
                label="Tartib raqami"
                type="number"
                value={editing.orderIndex}
                onChange={(e) => set("orderIndex", parseInt(e.target.value) || 0)}
              />
              <div>
                <label style={{ display: "block", color: C.textMuted, fontSize: "0.78rem", fontWeight: 600, marginBottom: 6 }}>
                  Kafedra mudiri
                </label>
                <select
                  value={editing.headTeacherId || ""}
                  onChange={(e) => set("headTeacherId", e.target.value || null)}
                  style={{
                    width: "100%", padding: "10px 14px",
                    background: "rgba(255,255,255,0.05)",
                    border: `1px solid ${C.border}`, borderRadius: 10,
                    color: C.text, fontSize: "0.88rem", outline: "none",
                    boxSizing: "border-box", fontFamily: "inherit", cursor: "pointer",
                  }}
                >
                  <option value="" style={{ background: "#0f2347" }}>— Mudir belgilanmagan —</option>
                  {teachers.map((t) => (
                    <option key={t.id} value={t.id} style={{ background: "#0f2347" }}>
                      {t.fullNameUz} ({t.subjectUz})
                    </option>
                  ))}
                </select>
                <p style={{ color: C.textDim, fontSize: "0.72rem", margin: "4px 0 0" }}>
                  Mudir tanlanganda o&apos;qituvchi avtomatik shu kafedraga biriktiriladi
                </p>
              </div>
            </div>

            <div style={{
              display: "flex", gap: 10, justifyContent: "flex-end",
              marginTop: 24, paddingTop: 20, borderTop: `1px solid ${C.border}`,
            }}>
              <Button variant="ghost" onClick={close}>Bekor qilish</Button>
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
