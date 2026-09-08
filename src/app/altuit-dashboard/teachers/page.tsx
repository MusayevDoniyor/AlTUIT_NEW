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
  getDepartments,
  TeacherItem,
  DepartmentItem,
} from "@/lib/db";
import {
  parseTeacherInfo,
  parseTeacherCertificates,
  serializeTeacherInfo,
  serializeTeacherCertificates,
} from "@/lib/teacherUtils";
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
  AdminModal,
  ImageUpload,
  useToast,
  C,
  spinStyle,
  TableSkeleton,
} from "../_components/ui";

const EMPTY: Omit<TeacherItem, "id"> = {
  fullNameUz: "",
  subjectUz: "",
  infoUz: "",
  certificatesUz: "",
  departmentId: "",
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
  const [departments, setDepartments] = useState<DepartmentItem[]>([]);
  const { showToast } = useToast();

  // Local state for structured fields
  const [descUz, setDescUz] = useState("");
  const [descRu, setDescRu] = useState("");
  const [descEn, setDescEn] = useState("");
  const [expUz, setExpUz] = useState<string[]>([]);
  const [expRu, setExpRu] = useState<string[]>([]);
  const [expEn, setExpEn] = useState<string[]>([]);
  const [certsUz, setCertsUz] = useState<string[]>([]);
  const [certsRu, setCertsRu] = useState<string[]>([]);
  const [certsEn, setCertsEn] = useState<string[]>([]);

  // Local state for list inputs
  const [newExpInput, setNewExpInput] = useState("");
  const [newCertInput, setNewCertInput] = useState("");

  // Sync state when editing item changes
  useEffect(() => {
    if (editing) {
      const parsedUz = parseTeacherInfo(editing.infoUz);
      const parsedRu = parseTeacherInfo(editing.infoRu);
      const parsedEn = parseTeacherInfo(editing.infoEn);

      const parsedCertsUz = parseTeacherCertificates(editing.certificatesUz);
      const parsedCertsRu = parseTeacherCertificates(editing.certificatesRu);
      const parsedCertsEn = parseTeacherCertificates(editing.certificatesEn);

      setDescUz(parsedUz.description);
      setDescRu(parsedRu.description);
      setDescEn(parsedEn.description);

      setExpUz(parsedUz.experience);
      setExpRu(parsedRu.experience);
      setExpEn(parsedEn.experience);

      setCertsUz(parsedCertsUz.certificates);
      setCertsRu(parsedCertsRu.certificates);
      setCertsEn(parsedCertsEn.certificates);
    } else {
      setDescUz("");
      setDescRu("");
      setDescEn("");
      setExpUz([]);
      setExpRu([]);
      setExpEn([]);
      setCertsUz([]);
      setCertsRu([]);
      setCertsEn([]);
    }
    setNewExpInput("");
    setNewCertInput("");
  }, [editing]);

  // Clear sub-inputs when language tab changes
  useEffect(() => {
    setNewExpInput("");
    setNewCertInput("");
  }, [lang]);

  const addExperience = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newExpInput.trim()) return;
    if (lang === "uz") setExpUz([...expUz, newExpInput.trim()]);
    else if (lang === "ru") setExpRu([...expRu, newExpInput.trim()]);
    else setExpEn([...expEn, newExpInput.trim()]);
    setNewExpInput("");
  };

  const removeExperience = (index: number) => {
    if (lang === "uz") setExpUz(expUz.filter((_, i) => i !== index));
    else if (lang === "ru") setExpRu(expRu.filter((_, i) => i !== index));
    else setExpEn(expEn.filter((_, i) => i !== index));
  };

  const addCertificate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newCertInput.trim()) return;
    if (lang === "uz") setCertsUz([...certsUz, newCertInput.trim()]);
    else if (lang === "ru") setCertsRu([...certsRu, newCertInput.trim()]);
    else setCertsEn([...certsEn, newCertInput.trim()]);
    setNewCertInput("");
  };

  const removeCertificate = (index: number) => {
    if (lang === "uz") setCertsUz(certsUz.filter((_, i) => i !== index));
    else if (lang === "ru") setCertsRu(certsRu.filter((_, i) => i !== index));
    else setCertsEn(certsEn.filter((_, i) => i !== index));
  };

  const load = async () => {
    setLoading(true);
    try {
      const [teachers, depts] = await Promise.all([
        getTeachers(),
        getDepartments(),
      ]);
      setItems(teachers);
      setDepartments(depts);
    } catch {
      showToast("error", "Xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

    if (!editing.fullNameUz?.trim() || !editing.subjectUz?.trim()) {
      showToast("error", "Iltimos, ism va fanni kiriting");
      return;
    }

    setSaving(true);
    try {
      const id = editing.id || Date.now().toString();
      const rawEditing = { ...editing } as TeacherItem;
      delete (rawEditing as { id?: string }).id;

      // Auto-append any typed but un-added experience/certificate input before saving
      const finalExpUz =
        newExpInput.trim() && lang === "uz"
          ? [...expUz, newExpInput.trim()]
          : expUz;
      const finalExpRu =
        newExpInput.trim() && lang === "ru"
          ? [...expRu, newExpInput.trim()]
          : expRu;
      const finalExpEn =
        newExpInput.trim() && lang === "en"
          ? [...expEn, newExpInput.trim()]
          : expEn;

      const finalCertsUz =
        newCertInput.trim() && lang === "uz"
          ? [...certsUz, newCertInput.trim()]
          : certsUz;
      const finalCertsRu =
        newCertInput.trim() && lang === "ru"
          ? [...certsRu, newCertInput.trim()]
          : certsRu;
      const finalCertsEn =
        newCertInput.trim() && lang === "en"
          ? [...certsEn, newCertInput.trim()]
          : certsEn;

      const infoUz = serializeTeacherInfo(descUz, finalExpUz);
      const infoRu = serializeTeacherInfo(descRu, finalExpRu);
      const infoEn = serializeTeacherInfo(descEn, finalExpEn);

      const certificatesUz = serializeTeacherCertificates(finalCertsUz);
      const certificatesRu = serializeTeacherCertificates(finalCertsRu);
      const certificatesEn = serializeTeacherCertificates(finalCertsEn);

      const data: Omit<TeacherItem, "id"> = {
        fullNameUz: rawEditing.fullNameUz || "",
        fullNameRu: rawEditing.fullNameRu || "",
        fullNameEn: rawEditing.fullNameEn || "",
        subjectUz: rawEditing.subjectUz || "",
        subjectRu: rawEditing.subjectRu || "",
        subjectEn: rawEditing.subjectEn || "",
        photoUrl: rawEditing.photoUrl || "",
        departmentId: rawEditing.departmentId || "",
        orderIndex: rawEditing.orderIndex || 0,
        infoUz,
        infoRu,
        infoEn,
        certificatesUz,
        certificatesRu,
        certificatesEn,
      };

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
            <Plus size={14} /> Qo&apos;shish
          </Button>
        }
      />

      <Card>
        {loading ? (
          <div style={{ padding: 16 }}>
            <TableSkeleton rows={5} />
          </div>
        ) : items.length === 0 ? (
          <EmptyState message="O'qituvchilar yo'q." />
        ) : (
          <div>
            {items.map((item, idx) => {
              const dept = departments.find((d) => d.id === item.departmentId);
              return (
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
                    {dept
                      ? ` · ${
                          lang === "uz"
                            ? dept.nameUz
                            : lang === "ru"
                              ? dept.nameRu
                              : dept.nameEn
                        }`
                      : ""}
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
            );
            })}
          </div>
        )}
      </Card>

      {/* MODAL */}
      <AdminModal
        open={Boolean(editing)}
        onClose={close}
        maxWidth={840}
        title={editing?.id ? "O'qituvchini tahrirlash" : "Yangi o'qituvchi qo'shish"}
        subtitle="TATU akademik litseyi pedagog xodim ma'lumotlari"
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
              gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
              gap: 20,
              alignItems: "start",
            }}
          >
            {/* Left Column: Basic & Department Info */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <SectionTitle>Pedagog ma&apos;lumotlari</SectionTitle>
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
                  placeholder="Ism Familiya"
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
                  placeholder="Masalan: Fizika"
                />
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                }}
              >
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
                    Kafedra
                  </label>
                  <select
                    value={editing.departmentId || ""}
                    onChange={(e) => set("departmentId", e.target.value || "")}
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
                      cursor: "pointer",
                    }}
                  >
                    <option value="" style={{ background: "#0f2347" }}>
                      — Kafedra tanlanmagan —
                    </option>
                    {departments.map((d) => {
                      const deptName =
                        lang === "uz"
                          ? d.nameUz
                          : lang === "ru"
                            ? d.nameRu
                            : d.nameEn;
                      return (
                        <option
                          key={d.id}
                          value={d.id}
                          style={{ background: "#0f2347" }}
                        >
                          {deptName}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <Input
                  label="Tartib raqami"
                  type="number"
                  value={editing.orderIndex}
                  onChange={(e) =>
                    set("orderIndex", parseInt(e.target.value) || 0)
                  }
                />
              </div>

              <Textarea
                label={`Tavsif (${lang.toUpperCase()})`}
                value={
                  lang === "uz" ? descUz : lang === "ru" ? descRu : descEn
                }
                onChange={(e) => {
                  if (lang === "uz") setDescUz(e.target.value);
                  else if (lang === "ru") setDescRu(e.target.value);
                  else setDescEn(e.target.value);
                }}
                placeholder="O'qituvchi haqida batafsil ma'lumot..."
                rows={3}
                style={{ minHeight: 80 }}
              />
            </div>

            {/* Right Column: Photo & Qualifications */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <SectionTitle>O&apos;qituvchi fotosurati</SectionTitle>
                <ImageUpload
                  currentUrl={editing.photoUrl || ""}
                  onUpload={handleImageUpload}
                  onRemove={() => set("photoUrl", "")}
                  uploading={uploadingImage}
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    color: C.text,
                    fontSize: "0.82rem",
                    fontWeight: 600,
                    marginBottom: 6,
                  }}
                >
                  Tajriba (Experience) ({lang.toUpperCase()})
                </label>
                <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                  <div style={{ flex: 1 }}>
                    <Input
                      value={newExpInput}
                      onChange={(e) => setNewExpInput(e.target.value)}
                      placeholder="Tajriba qo'shish (masalan: 5 yil TATU litseyi)"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addExperience();
                        }
                      }}
                    />
                  </div>
                  <Button
                    type="button"
                    onClick={() => addExperience()}
                    style={{
                      height: "40px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "0 14px",
                    }}
                  >
                    <Plus size={15} />
                  </Button>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 6,
                    maxHeight: 110,
                    overflowY: "auto",
                    paddingRight: 4,
                  }}
                >
                  {(lang === "uz" ? expUz : lang === "ru" ? expRu : expEn).map(
                    (exp, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          background: "rgba(255,255,255,0.03)",
                          border: `1px solid ${C.border}`,
                          borderRadius: 8,
                          padding: "6px 10px",
                          fontSize: "0.8rem",
                          color: C.text,
                        }}
                      >
                        <span style={{ flex: 1, marginRight: 8 }}>{exp}</span>
                        <button
                          type="button"
                          onClick={() => removeExperience(idx)}
                          style={{
                            background: "none",
                            border: "none",
                            color: C.textMuted,
                            cursor: "pointer",
                            display: "flex",
                            padding: 2,
                          }}
                        >
                          <X size={13} />
                        </button>
                      </div>
                    ),
                  )}
                  {(lang === "uz" ? expUz : lang === "ru" ? expRu : expEn)
                    .length === 0 && (
                    <p
                      style={{
                        color: C.textMuted,
                        fontSize: "0.75rem",
                        fontStyle: "italic",
                        margin: 0,
                      }}
                    >
                      Hozircha tajriba qo&apos;shilmagan.
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    color: C.text,
                    fontSize: "0.82rem",
                    fontWeight: 600,
                    marginBottom: 6,
                  }}
                >
                  Sertifikatlar (Certificates) ({lang.toUpperCase()})
                </label>
                <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                  <div style={{ flex: 1 }}>
                    <Input
                      value={newCertInput}
                      onChange={(e) => setNewCertInput(e.target.value)}
                      placeholder="Sertifikat qo'shish (masalan: IELTS 7.5)"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addCertificate();
                        }
                      }}
                    />
                  </div>
                  <Button
                    type="button"
                    onClick={() => addCertificate()}
                    style={{
                      height: "40px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "0 14px",
                    }}
                  >
                    <Plus size={15} />
                  </Button>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 6,
                    maxHeight: 110,
                    overflowY: "auto",
                    paddingRight: 4,
                  }}
                >
                  {(lang === "uz"
                    ? certsUz
                    : lang === "ru"
                      ? certsRu
                      : certsEn
                  ).map((cert, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        background: "rgba(255,255,255,0.03)",
                        border: `1px solid ${C.border}`,
                        borderRadius: 8,
                        padding: "6px 10px",
                        fontSize: "0.8rem",
                        color: C.text,
                      }}
                    >
                      <span style={{ flex: 1, marginRight: 8 }}>{cert}</span>
                      <button
                        type="button"
                        onClick={() => removeCertificate(idx)}
                        style={{
                          background: "none",
                          border: "none",
                          color: C.textMuted,
                          cursor: "pointer",
                          display: "flex",
                          padding: 2,
                        }}
                      >
                        <X size={13} />
                      </button>
                    </div>
                  ))}
                  {(lang === "uz" ? certsUz : lang === "ru" ? certsRu : certsEn)
                    .length === 0 && (
                    <p
                      style={{
                        color: C.textMuted,
                        fontSize: "0.75rem",
                        fontStyle: "italic",
                        margin: 0,
                      }}
                    >
                      Hozircha sertifikat qo&apos;shilmagan.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </AdminModal>
    </div>
  );
}
