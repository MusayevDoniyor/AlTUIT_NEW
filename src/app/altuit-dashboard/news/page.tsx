"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Newspaper, Plus, Pencil, Trash2, X, Save, Send, FileText, ExternalLink } from "lucide-react";
import {
  getAllNews,
  saveNews,
  deleteNewsWithImages,
  uploadImage,
  deleteImage,
  deleteFile,
  NewsItem,
  ImageItem,
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
  SearchInput,
  ConfirmDialog,
  useToast,
  C,
  spinStyle,
  TableSkeleton,
} from "../_components/ui";
import RichTextEditor from "@/components/admin/RichTextEditor";
import NewsImageUpload from "@/components/admin/NewsImageUpload";
import NewsPreview from "@/components/admin/NewsPreview";

const COLORS = [
  "#1a3a6e",
  "#1d7a55",
  "#6032bf",
  "#b91c1c",
  "#c8a96e",
  "#0891b2",
];

const EMPTY: Omit<NewsItem, "id"> = {
  date: new Date().toISOString().slice(0, 10),
  titleUz: "",
  titleRu: "",
  titleEn: "",
  bodyUz: "",
  bodyRu: "",
  bodyEn: "",
  descUz: "",
  descRu: "",
  descEn: "",
  tag: { uz: "", ru: "", en: "" },
  color: COLORS[0],
  imageUrl: "",
  fileUrl: "",
  fileName: "",
  isPublished: true,
};

export default function AdminNewsPage() {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState<
    (Omit<NewsItem, "id"> & { id?: string }) | null
  >(null);
  const [lang, setLang] = useState<"uz" | "ru" | "en">("uz");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [search, setSearch] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<NewsItem | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { showToast } = useToast();

  const load = async () => {
    setLoading(true);
    try {
      setItems(await getAllNews());
    } catch {
      setError("Ma'lumotlarni yuklashda xatolik");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  // Ctrl+S handler
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s" && editing) {
        e.preventDefault();
        handleSave();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [editing, lang]);

  const openNew = () => {
    setEditing({ ...EMPTY, date: new Date().toISOString().slice(0, 10) });
    setErrors({});
  };
  const openEdit = (item: NewsItem) => {
    setEditing({ ...item });
    setErrors({});
  };
  const close = () => {
    setEditing(null);
    setError("");
    setErrors({});
  };

  const handleImageUpload = async (file: File) => {
    if (!editing) return;
    setUploadingImage(true);
    try {
      const url = await uploadImage(file, "news");
      setEditing((prev) => (prev ? { ...prev, imageUrl: url } : prev));
    } catch {
      showToast("error", "Rasm yuklashda xatolik");
    } finally {
      setUploadingImage(false);
    }
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!editing) return false;
    if (!editing.titleUz.trim()) errs.titleUz = "Sarlavha (O'zbekcha) majburiy";
    if (!editing.descUz.trim())
      errs.descUz = "Qisqa tavsif (O'zbekcha) majburiy";
    if (!editing.bodyUz.trim())
      errs.bodyUz = "Yangilik matni (O'zbekcha) majburiy";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = async (publish = true) => {
    if (!editing || !validate() || saving) return;
    setSaving(true);
    setError("");
    try {
      const id = editing.id || Date.now().toString();
      const { id: _id, ...data } = editing as NewsItem;
      await saveNews(id, { ...data, isPublished: publish });
      showToast(
        "success",
        editing.id ? "Yangilik tahrirlandi" : "Yangilik qo'shildi",
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
      await deleteNewsWithImages(deleteTarget.id!);
      if (deleteTarget.fileUrl) {
        await deleteFile(deleteTarget.fileUrl);
      }
      showToast("success", `"${deleteTarget.titleUz}" o'chirildi`);
      await load();
    } catch {
      showToast("error", "O'chirishda xatolik");
    } finally {
      setDeleteTarget(null);
    }
  };

  const images: ImageItem[] = (() => {
    if (!editing?.images) return [];
    try {
      const parsed =
        typeof editing.images === "string"
          ? JSON.parse(editing.images)
          : editing.images;
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  })();

  const set = (field: string, val: unknown) =>
    setEditing((prev) => (prev ? { ...prev, [field]: val } : prev));
  const setTag = (l: string, val: string) =>
    setEditing((prev) =>
      prev ? { ...prev, tag: { ...prev.tag, [l]: val } } : prev,
    );

  const filteredItems = items.filter(
    (item) =>
      !search ||
      item.titleUz?.toLowerCase().includes(search.toLowerCase()) ||
      item.titleRu?.toLowerCase().includes(search.toLowerCase()) ||
      item.titleEn?.toLowerCase().includes(search.toLowerCase()) ||
      item.tag?.uz?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      <style>{spinStyle}</style>

      <ConfirmDialog
        open={!!deleteTarget}
        title="Yangilikni o'chirish"
        message={`"${deleteTarget?.titleUz}" yangiligini o'chirasizmi? Bu amalni qaytarib bo'lmaydi.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />

      <PageHeader
        title="Yangiliklar"
        description="Barcha yangiliklar ro'yxati"
        icon={<Newspaper size={18} color={C.gold} />}
        action={
          <Button onClick={openNew}>
            <Plus size={14} /> Qo'shish
          </Button>
        }
      />

      {/* Search */}
      <div style={{ marginBottom: 16 }}>
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Yangiliklardan qidirish..."
        />
      </div>

      {/* List */}
      <Card>
        {loading ? (
          <div style={{ padding: 16 }}>
            <TableSkeleton rows={5} />
          </div>
        ) : filteredItems.length === 0 ? (
          <EmptyState
            message={
              search
                ? "Qidiruv bo'yicha hech narsa topilmadi."
                : "Yangiliklar yo'q. Birinchi yangilikni qo'shing."
            }
          />
        ) : (
          <div>
            {filteredItems.map((item, idx) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "14px 18px",
                  borderBottom:
                    idx < filteredItems.length - 1
                      ? `1px solid ${C.border}`
                      : "none",
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.background =
                    C.surface;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.background =
                    "transparent";
                }}
              >
                {/* Color strip */}
                <div
                  style={{
                    width: 4,
                    height: 44,
                    borderRadius: 4,
                    background: item.color,
                    flexShrink: 0,
                  }}
                />

                {/* Image */}
                {item.imageUrl ? (
                  <div
                    style={{
                      width: 56,
                      height: 44,
                      borderRadius: 8,
                      overflow: "hidden",
                      flexShrink: 0,
                      background: "rgba(255,255,255,0.05)",
                    }}
                  >
                    <Image
                      src={item.imageUrl}
                      alt=""
                      width={56}
                      height={44}
                      style={{
                        objectFit: "cover",
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  </div>
                ) : (
                  <div
                    style={{
                      width: 56,
                      height: 44,
                      borderRadius: 8,
                      background: `${item.color}20`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Newspaper size={16} color={item.color} />
                  </div>
                )}

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
                    {item.titleUz}
                  </p>
                  <p
                    style={{
                      color: C.textMuted,
                      fontSize: "0.75rem",
                      margin: 0,
                    }}
                  >
                    {item.date} · {item.tag?.uz || "—"}
                    {item.isPublished === false && " · 🔒 Chop etilmagan"}
                  </p>
                </div>

                <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
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

      {/* EDIT MODAL */}
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
              maxWidth: 680,
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
                {editing.id ? "Yangilikni tahrirlash" : "Yangi yangilik"}
                <span
                  style={{
                    color: C.textDim,
                    fontSize: "0.75rem",
                    fontWeight: 500,
                    marginLeft: 10,
                  }}
                >
                  Ctrl+S
                </span>
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
              {/* Date and published */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr auto",
                  gap: 12,
                  alignItems: "end",
                }}
              >
                <Input
                  label="Sana"
                  type="date"
                  value={editing.date}
                  onChange={(e) => set("date", e.target.value)}
                />
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    cursor: "pointer",
                    paddingBottom: 2,
                  }}
                >
                  <div
                    onClick={() => set("isPublished", !editing.isPublished)}
                    style={{
                      width: 44,
                      height: 24,
                      borderRadius: 12,
                      background:
                        editing.isPublished !== false
                          ? C.gold
                          : "rgba(255,255,255,0.1)",
                      border: "none",
                      cursor: "pointer",
                      position: "relative",
                      transition: "background 0.2s",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: 3,
                        left: editing.isPublished !== false ? 22 : 3,
                        width: 18,
                        height: 18,
                        borderRadius: "50%",
                        background: "white",
                        transition: "left 0.2s",
                      }}
                    />
                  </div>
                  <span style={{ color: C.textMuted, fontSize: "0.78rem" }}>
                    Chop etish
                  </span>
                </label>
              </div>

              {/* Language tabs */}
              <div>
                <SectionTitle>Matn (til bo'yicha)</SectionTitle>
                <LangTabs active={lang} onChange={setLang} />
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 12 }}
                >
                  <Input
                    label={`Sarlavha (${lang.toUpperCase()})`}
                    value={
                      lang === "uz"
                        ? editing.titleUz
                        : lang === "ru"
                          ? (editing.titleRu ?? "")
                          : (editing.titleEn ?? "")
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
                    error={
                      errors[
                        lang === "uz"
                          ? "titleUz"
                          : lang === "ru"
                            ? "titleRu"
                            : "titleEn"
                      ] || ""
                    }
                    placeholder="Yangilik sarlavhasi"
                  />
                  <Textarea
                    label={`Qisqa tavsif (${lang.toUpperCase()})`}
                    value={
                      lang === "uz"
                        ? editing.descUz
                        : lang === "ru"
                          ? (editing.descRu ?? "")
                          : (editing.descEn ?? "")
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
                    error={
                      errors[
                        lang === "uz"
                          ? "descUz"
                          : lang === "ru"
                            ? "descRu"
                            : "descEn"
                      ]
                    }
                    style={{ minHeight: 80 }}
                    placeholder="Qisqa tavsif (maks 160 belgi)"
                  />
                  <Input
                    label={`Teg/Kategoriya (${lang.toUpperCase()})`}
                    value={
                      lang === "uz"
                        ? editing.tag.uz
                        : lang === "ru"
                          ? editing.tag.ru
                          : editing.tag.en
                    }
                    onChange={(e) => setTag(lang, e.target.value)}
                    placeholder="Masalan: Olimpiada, Sport..."
                  />
                </div>
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

              {/* Multiple Images */}
              <div>
                <SectionTitle>Rasmlar</SectionTitle>
                <NewsImageUpload
                  images={images}
                  onChange={(newImages) =>
                    set("images", JSON.stringify(newImages))
                  }
                  maxImages={5}
                />
              </div>

              {/* File attachment */}
              <div>
                <SectionTitle>Fayl biriktirish (PDF)</SectionTitle>
                <div>
                  {editing.fileUrl ? (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "10px 14px",
                        background: "rgba(255,255,255,0.05)",
                        borderRadius: 10,
                        marginBottom: 10,
                        border: `1px solid ${C.border}`,
                      }}
                    >
                      <FileText size={16} color={C.gold} />
                      <span style={{ color: C.textMuted, fontSize: "0.82rem", flex: 1 }}>
                        {editing.fileName || "Fayl biriktirilgan"}
                      </span>
                      <a
                        href={editing.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: C.gold, display: "flex" }}
                      >
                        <ExternalLink size={14} />
                      </a>
                      <button
                        onClick={() => {
                          set("fileUrl", "");
                          set("fileName", "");
                        }}
                        style={{ background: "none", border: "none", color: C.danger, cursor: "pointer", display: "flex" }}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ) : null}
                  <input
                    type="file"
                    accept=".pdf"
                    style={{ display: "none" }}
                    id="news-file-upload"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      try {
                        const { uploadFile } = await import("@/lib/db");
                        const url = await uploadFile(file, "news-files");
                        set("fileUrl", url);
                        set("fileName", file.name);
                      } catch {
                        showToast("error", "Fayl yuklashda xatolik");
                      }
                      e.target.value = "";
                    }}
                  />
                  <label
                    htmlFor="news-file-upload"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "9px 16px",
                      borderRadius: 10,
                      background: "rgba(200,169,110,0.1)",
                      border: `1px solid rgba(200,169,110,0.25)`,
                      color: C.gold,
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 0.2s",
                      fontFamily: "inherit",
                    }}
                  >
                    <FileText size={14} />
                    {editing.fileUrl ? "Faylni almashtirish" : "PDF fayl tanlash"}
                  </label>
                  <p style={{ color: C.textDim, fontSize: "0.72rem", margin: "6px 0 0" }}>
                    PDF format, maks 10MB
                  </p>
                </div>
              </div>

              {/* Full text body using RichTextEditor */}
              <div>
                <SectionTitle>To'liq matn ({lang.toUpperCase()})</SectionTitle>
                <RichTextEditor
                  content={
                    lang === "uz"
                      ? editing.bodyUz
                      : lang === "ru"
                        ? (editing.bodyRu ?? "")
                        : (editing.bodyEn ?? "")
                  }
                  onChange={(html) =>
                    set(
                      lang === "uz"
                        ? "bodyUz"
                        : lang === "ru"
                          ? "bodyRu"
                          : "bodyEn",
                      html,
                    )
                  }
                  placeholder={`Yangilik matnini yozing (${lang.toUpperCase()})...`}
                />
              </div>
            </div>

            {/* Preview */}
            <div style={{ marginTop: 24 }}>
              <SectionTitle>Ko'rinish</SectionTitle>
              <NewsPreview
                data={{
                  title:
                    lang === "uz"
                      ? editing.titleUz
                      : lang === "ru"
                        ? (editing.titleRu ?? "")
                        : (editing.titleEn ?? ""),
                  desc:
                    lang === "uz"
                      ? editing.descUz
                      : lang === "ru"
                        ? (editing.descRu ?? "")
                        : (editing.descEn ?? ""),
                  body:
                    lang === "uz"
                      ? editing.bodyUz
                      : lang === "ru"
                        ? (editing.bodyRu ?? "")
                        : (editing.bodyEn ?? ""),
                  tag: editing.tag[lang] || "",
                  color: editing.color,
                  date: editing.date,
                  images,
                }}
                lang={lang}
              />
            </div>

            {/* Actions — sticky */}
            <div
              style={{
                display: "flex",
                gap: 10,
                justifyContent: "flex-end",
                marginTop: 24,
                paddingTop: 20,
                borderTop: `1px solid ${C.border}`,
                position: "sticky",
                bottom: 0,
                background: "#141620",
              }}
            >
              <Button variant="ghost" onClick={close}>
                Bekor qilish
              </Button>
              <Button
                variant="outline"
                onClick={() => handleSave(false)}
                disabled={saving}
                style={{ color: C.textMuted, borderColor: C.border }}
              >
                <Save size={14} /> Draft
              </Button>
              <Button onClick={() => handleSave(true)} loading={saving}>
                <Send size={14} /> Chop etish
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
