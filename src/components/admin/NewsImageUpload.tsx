"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { X, ImageIcon, Star, GripVertical, Upload } from "lucide-react";
import { uploadImage } from "@/lib/db";

export interface ImageItem {
  url: string;
  order: number;
  isMain: boolean;
}

interface NewsImageUploadProps {
  images: ImageItem[];
  onChange: (images: ImageItem[]) => void;
  maxImages?: number;
}

const C = {
  gold: "#c8a96e",
  goldLight: "rgba(200,169,110,0.15)",
  goldBorder: "rgba(200,169,110,0.25)",
  text: "white",
  textMuted: "rgba(255,255,255,0.45)",
  textDim: "rgba(255,255,255,0.25)",
  border: "rgba(255,255,255,0.07)",
  borderFocus: "rgba(200,169,110,0.5)",
  danger: "#ef4444",
  success: "#22c55e",
  surface: "rgba(255,255,255,0.04)",
};

function SortableSlot({
  item,
  index,
  onRemove,
  onSetMain,
  uploading,
}: {
  item: ImageItem;
  index: number;
  onRemove: () => void;
  onSetMain: () => void;
  uploading?: boolean;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.url });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={{
        ...style,
        position: "relative",
        aspectRatio: "16/9",
        borderRadius: 10,
        overflow: "hidden",
        border: `1px solid ${C.border}`,
        background: "rgba(255,255,255,0.03)",
      }}
    >
      {uploading ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            gap: 8,
            color: C.textMuted,
            fontSize: "0.8rem",
          }}
        >
          <div
            style={{
              width: 20,
              height: 20,
              border: `2px solid ${C.goldLight}`,
              borderTopColor: C.gold,
              borderRadius: "50%",
              animation: "spin 0.8s linear infinite",
            }}
          />
          Yuklanmoqda...
        </div>
      ) : (
        <>
          <Image
            src={item.url}
            alt={`Rasm ${index + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            style={{ objectFit: "cover" }}
          />

          {/* Order badge */}
          <div
            style={{
              position: "absolute",
              top: 6,
              left: 6,
              width: 24,
              height: 24,
              borderRadius: "50%",
              background: "rgba(0,0,0,0.6)",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.72rem",
              fontWeight: 700,
              zIndex: 2,
            }}
          >
            {index + 1}
          </div>

          {/* Drag handle */}
          <div
            {...attributes}
            {...listeners}
            style={{
              position: "absolute",
              top: 6,
              left: 34,
              width: 24,
              height: 24,
              borderRadius: 6,
              background: "rgba(0,0,0,0.6)",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "grab",
              zIndex: 2,
            }}
          >
            <GripVertical size={14} />
          </div>

          {/* Remove button */}
          <button
            type="button"
            onClick={onRemove}
            style={{
              position: "absolute",
              top: 6,
              right: 6,
              width: 24,
              height: 24,
              borderRadius: "50%",
              background: "rgba(239,68,68,0.8)",
              border: "none",
              color: "white",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 2,
            }}
          >
            <X size={14} />
          </button>

          {/* Set as main button */}
          {!item.isMain && (
            <button
              type="button"
              onClick={onSetMain}
              style={{
                position: "absolute",
                bottom: 6,
                left: 6,
                padding: "4px 8px",
                borderRadius: 6,
                background: "rgba(0,0,0,0.6)",
                border: "none",
                color: C.textMuted,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 4,
                fontSize: "0.7rem",
                zIndex: 2,
              }}
            >
              <Star size={12} /> Asosiy qil
            </button>
          )}

          {item.isMain && (
            <div
              style={{
                position: "absolute",
                bottom: 6,
                left: 6,
                padding: "4px 8px",
                borderRadius: 6,
                background: "rgba(200,169,110,0.8)",
                color: "#0f2347",
                display: "flex",
                alignItems: "center",
                gap: 4,
                fontSize: "0.7rem",
                fontWeight: 700,
                zIndex: 2,
              }}
            >
              <Star size={12} fill="currentColor" /> Asosiy
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default function NewsImageUpload({
  images,
  onChange,
  maxImages = 5,
}: NewsImageUploadProps) {
  const [dragOver, setDragOver] = useState(false);
  const [uploadingItems, setUploadingItems] = useState<Set<number>>(new Set());
  const inputRef = useRef<HTMLInputElement>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over || active.id === over.id) return;

      const oldIndex = images.findIndex((img) => img.url === active.id);
      const newIndex = images.findIndex((img) => img.url === over.id);
      if (oldIndex === -1 || newIndex === -1) return;

      const newImages = arrayMove(images, oldIndex, newIndex).map((img, i) => ({
        ...img,
        order: i,
      }));
      onChange(newImages);
    },
    [images, onChange],
  );

  const handleUpload = useCallback(
    async (files: FileList) => {
      const remaining = maxImages - images.length;
      const toUpload = Array.from(files).slice(0, remaining);
      if (toUpload.length === 0) return;

      const newImages = [...images];
      const uploadingSet = new Set<number>();

      for (let i = 0; i < toUpload.length; i++) {
        const idx = newImages.length;
        uploadingSet.add(idx);

        // Add placeholder
        newImages.push({ url: "", order: newImages.length, isMain: false });
      }

      setUploadingItems(uploadingSet);

      for (let i = 0; i < toUpload.length; i++) {
        const idx = images.length + i;
        try {
          const url = await uploadImage(toUpload[i], "news");
          newImages[idx] = {
            url,
            order: idx,
            isMain: idx === 0 && images.length === 0,
          };
        } catch {
          // Remove failed upload slot
          newImages.splice(idx, 1);
        }
      }

      setUploadingItems(new Set());
      onChange(newImages);
    },
    [images, maxImages, onChange],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      if (e.dataTransfer.files.length > 0) {
        handleUpload(e.dataTransfer.files);
      }
    },
    [handleUpload],
  );

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleUpload(e.target.files);
      e.target.value = "";
    }
  };

  const handleRemove = (index: number) => {
    const newImages = images
      .filter((_, i) => i !== index)
      .map((img, i) => ({ ...img, order: i }));
    // If we removed the main image, set first as main
    if (images[index].isMain && newImages.length > 0) {
      newImages[0].isMain = true;
    }
    onChange(newImages);
  };

  const handleSetMain = (index: number) => {
    const newImages = images.map((img, i) => ({
      ...img,
      isMain: i === index,
    }));
    onChange(newImages);
  };

  const emptySlots = maxImages - images.length;

  return (
    <div>
      {/* Grid */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={images.map((img) => img.url)}
          strategy={rectSortingStrategy}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 10,
              marginBottom: 10,
            }}
          >
            {images.map((item, i) => (
              <SortableSlot
                key={item.url || i}
                item={item}
                index={i}
                onRemove={() => handleRemove(i)}
                onSetMain={() => handleSetMain(i)}
                uploading={uploadingItems.has(i)}
              />
            ))}

            {/* Empty slots */}
            {Array.from({ length: emptySlots }).map((_, i) => (
              <div
                key={`empty-${i}`}
                style={{
                  aspectRatio: "16/9",
                  borderRadius: 10,
                  border: `2px dashed ${dragOver ? C.gold : C.border}`,
                  background: dragOver ? C.goldLight : "rgba(255,255,255,0.02)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                  cursor: "pointer",
                  color: C.textDim,
                  transition: "all 0.2s",
                }}
                onClick={() => inputRef.current?.click()}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
              >
                <ImageIcon size={24} />
                <span style={{ fontSize: "0.72rem", textAlign: "center" }}>
                  {images.length === 0 && i === 0 ? "Rasm qo'shish" : "Bo'sh"}
                </span>
              </div>
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {/* Upload area (hidden if full) */}
      {emptySlots > 0 && (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            padding: "14px 20px",
            border: `2px dashed ${dragOver ? C.gold : C.border}`,
            borderRadius: 10,
            cursor: "pointer",
            color: C.textMuted,
            background: dragOver ? C.goldLight : "transparent",
            transition: "all 0.2s",
            fontSize: "0.85rem",
          }}
        >
          <Upload size={16} />
          <span>
            Rasmlarni bu yerga tashlang yoki bosing ({images.length}/{maxImages}
            )
          </span>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        multiple
        style={{ display: "none" }}
        onChange={handleFileSelect}
      />

      {/* Info */}
      <p
        style={{
          color: C.textDim,
          fontSize: "0.72rem",
          margin: "8px 0 0",
        }}
      >
        JPG, PNG, WebP, GIF · Maks 5MB · Asosiy rasm ★ bilan belgilanadi
      </p>
    </div>
  );
}
