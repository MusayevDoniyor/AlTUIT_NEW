"use client";

import { useEffect, useState, useRef } from "react";
import { FileText, Plus, Trash2, X, Check, Download, ExternalLink } from "lucide-react";
import {
  getDocuments,
  saveDocument,
  deleteDocument,
  uploadFile,
  deleteFile,
  DocumentItem,
} from "@/lib/db";
import {
  PageHeader,
  Card,
  Button,
  EmptyState,
  ConfirmDialog,
  useToast,
  C,
  spinStyle,
  TableSkeleton,
} from "../_components/ui";

const EMPTY: Omit<DocumentItem, "id"> = {
  titleUz: "",
  titleRu: "",
  titleEn: "",
  fileUrl: "",
  fileSize: 0,
};

export default function AdminDocumentsPage() {
  const [items, setItems] = useState<DocumentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editing, setEditing] = useState<(DocumentItem & { isNew?: boolean }) | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<DocumentItem | null>(null);
  const { showToast } = useToast();
  const fileRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      setItems(await getDocuments());
    } catch {
      showToast("error", "Yuklashda xatolik");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const openNew = () => {
    setEditing({ ...EMPTY, fileUrl: "", fileSize: 0, isNew: true });
    setSelectedFile(null);
  };

  const openEdit = (item: DocumentItem) => {
    setEditing({ ...item, isNew: false });
    setSelectedFile(null);
  };

  const close = () => {
    setEditing(null);
    setSelectedFile(null);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setSelectedFile(file);
  };

  const handleSave = async () => {
    if (!editing) return;
    if (!editing.titleUz) {
      showToast("error", "Sarlavha majburiy");
      return;
    }
    setSaving(true);
    try {
      let fileUrl = editing.fileUrl;
      let fileSize = editing.fileSize;
      if (selectedFile) {
        setUploading(true);
        fileUrl = await uploadFile(selectedFile, "documents");
        fileSize = selectedFile.size;
        if (editing.fileUrl && !editing.isNew) {
          await deleteFile(editing.fileUrl);
        }
        setUploading(false);
      }
      const id = editing.isNew ? Date.now().toString() : editing.id!;
      await saveDocument(id, { ...editing, fileUrl, fileSize });
      showToast("success", editing.isNew ? "Qo'shildi" : "Tahrirlandi");
      await load();
      close();
    } catch {
      showToast("error", "Saqlashda xatolik");
    } finally {
      setSaving(false);
      setUploading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteFile(deleteTarget.fileUrl);
      await deleteDocument(deleteTarget.id!);
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

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  return (
    <div>
      <style>{spinStyle}</style>
      <ConfirmDialog
        open={!!deleteTarget}
        title="Hujjatni o'chirish"
        message={`"${deleteTarget?.titleUz}" hujjatini o'chirasizmi?`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
      <PageHeader
        title="Hujjatlar"
        description="PDF va boshqa hujjatlarni boshqarish (mandat natijalari va boshqalar)"
        icon={<FileText size={18} color={C.gold} />}
        action={
          <Button onClick={openNew}>
            <Plus size={14} /> Yuklash
          </Button>
        }
      />

      <Card>
        {loading ? (
          <div style={{ padding: 16 }}>
            <TableSkeleton rows={5} />
          </div>
        ) : items.length === 0 ? (
          <EmptyState message="Hujjatlar mavjud emas. Yuklash tugmasi orqali yangi hujjat qo'shing." />
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
                  borderBottom: idx < items.length - 1 ? `1px solid ${C.border}` : "none",
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: "rgba(200,169,110,0.1)",
                    border: "1px solid rgba(200,169,110,0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    color: C.gold,
                  }}
                >
                  <FileText size={18} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ color: C.text, fontWeight: 600, fontSize: "0.9rem", margin: 0 }}>
                    {item.titleUz}
                  </p>
                  <p style={{ color: C.textMuted, fontSize: "0.78rem", margin: "4px 0 0" }}>
                    {formatSize(item.fileSize)}
                  </p>
                </div>
                <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  <a
                    href={item.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      padding: "6px 10px",
                      borderRadius: 8,
                      background: "rgba(200,169,110,0.1)",
                      color: C.gold,
                      fontSize: "0.78rem",
                      fontWeight: 600,
                      textDecoration: "none",
                    }}
                  >
                    <ExternalLink size={12} />
                  </a>
                  <Button variant="ghost" onClick={() => openEdit(item)} style={{ padding: "6px 10px" }}>
                    <FileText size={13} />
                  </Button>
                  <Button variant="danger" onClick={() => setDeleteTarget(item)} style={{ padding: "6px 10px" }}>
                    <Trash2 size={13} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {editing && (
        <div
          style={{
            position: "fixed", inset: 0, zIndex: 100,
            display: "flex", alignItems: "flex-start", justifyContent: "center",
            background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)",
            overflowY: "auto", padding: "20px",
          }}
        >
          <div
            style={{
              background: "#141620", border: `1px solid ${C.border}`,
              borderRadius: 20, width: "100%", maxWidth: 500,
              padding: "28px", margin: "auto",
            }}
          >
            <div
              style={{
                display: "flex", alignItems: "center",
                justifyContent: "space-between", marginBottom: 24,
              }}
            >
              <h2 style={{ color: C.text, fontWeight: 800, fontSize: "1.1rem", margin: 0 }}>
                {editing.isNew ? "Yangi hujjat yuklash" : "Tahrirlash"}
              </h2>
              <button onClick={close} style={{ background: "none", border: "none", color: C.textMuted, cursor: "pointer", padding: 4, display: "flex" }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label style={{ display: "block", color: C.textMuted, fontSize: "0.78rem", fontWeight: 600, marginBottom: 6 }}>
                  Sarlavha (O'zbek)
                </label>
                <input
                  value={editing.titleUz}
                  onChange={(e) => set("titleUz", e.target.value)}
                  placeholder="Masalan: Mandat natijalari 2026"
                  style={{
                    width: "100%", padding: "10px 14px",
                    background: "rgba(255,255,255,0.05)",
                    border: `1px solid ${C.border}`, borderRadius: 10,
                    color: C.text, fontSize: "0.88rem", outline: "none",
                    boxSizing: "border-box", fontFamily: "inherit",
                  }}
                />
              </div>
              <div>
                <label style={{ display: "block", color: C.textMuted, fontSize: "0.78rem", fontWeight: 600, marginBottom: 6 }}>
                  Sarlavha (Rus)
                </label>
                <input
                  value={editing.titleRu}
                  onChange={(e) => set("titleRu", e.target.value)}
                  placeholder="Например: Результаты мандата 2025"
                  style={{
                    width: "100%", padding: "10px 14px",
                    background: "rgba(255,255,255,0.05)",
                    border: `1px solid ${C.border}`, borderRadius: 10,
                    color: C.text, fontSize: "0.88rem", outline: "none",
                    boxSizing: "border-box", fontFamily: "inherit",
                  }}
                />
              </div>
              <div>
                <label style={{ display: "block", color: C.textMuted, fontSize: "0.78rem", fontWeight: 600, marginBottom: 6 }}>
                  Sarlavha (Ingliz)
                </label>
                <input
                  value={editing.titleEn}
                  onChange={(e) => set("titleEn", e.target.value)}
                  placeholder="E.g.: Mandate results 2025"
                  style={{
                    width: "100%", padding: "10px 14px",
                    background: "rgba(255,255,255,0.05)",
                    border: `1px solid ${C.border}`, borderRadius: 10,
                    color: C.text, fontSize: "0.88rem", outline: "none",
                    boxSizing: "border-box", fontFamily: "inherit",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", color: C.textMuted, fontSize: "0.78rem", fontWeight: 600, marginBottom: 6 }}>
                  Fayl (PDF)
                </label>
                {editing.fileUrl && !selectedFile && (
                  <div
                    style={{
                      display: "flex", alignItems: "center", gap: 10,
                      padding: "10px 14px", background: "rgba(255,255,255,0.05)",
                      borderRadius: 10, marginBottom: 10, border: `1px solid ${C.border}`,
                    }}
                  >
                    <FileText size={16} color={C.gold} />
                    <span style={{ color: C.textMuted, fontSize: "0.82rem", flex: 1 }}>
                      Fayl yuklangan
                    </span>
                    <a
                      href={editing.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: C.gold, display: "flex" }}
                    >
                      <ExternalLink size={14} />
                    </a>
                  </div>
                )}
                <div
                  onClick={() => fileRef.current?.click()}
                  style={{
                    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                    gap: 8, padding: "24px 20px",
                    border: `2px dashed ${selectedFile ? C.gold : C.border}`,
                    borderRadius: 12, cursor: "pointer", color: C.textMuted,
                    background: selectedFile ? C.goldLight : "rgba(255,255,255,0.02)",
                    transition: "all 0.2s",
                  }}
                >
                  {uploading ? (
                    <div style={{ width: 24, height: 24, border: `3px solid ${C.goldLight}`, borderTopColor: C.gold, borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                  ) : (
                    <>
                      <FileText size={28} color={selectedFile ? C.gold : C.textDim} />
                      <span style={{ fontSize: "0.85rem", fontWeight: 500 }}>
                        {selectedFile ? selectedFile.name : "Faylni tanlash uchun bosing"}
                      </span>
                      <span style={{ fontSize: "0.72rem", opacity: 0.7 }}>
                        PDF, DOC, DOCX formatlar
                      </span>
                    </>
                  )}
                  <input
                    ref={fileRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    style={{ display: "none" }}
                    onChange={handleFileSelect}
                    disabled={uploading}
                  />
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex", gap: 10, justifyContent: "flex-end",
                marginTop: 24, paddingTop: 20, borderTop: `1px solid ${C.border}`,
              }}
            >
              <Button variant="ghost" onClick={close}>Bekor qilish</Button>
              <Button onClick={handleSave} loading={saving || uploading}>
                <Check size={14} /> Saqlash
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
