"use client";

import { CSSProperties } from "react";

const skeletonAnim = `
@keyframes pubShimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
`;

export function PubSkeleton({
  width,
  height,
  borderRadius = 8,
  style,
}: {
  width?: string | number;
  height?: string | number;
  borderRadius?: number;
  style?: CSSProperties;
}) {
  return (
    <>
      <style>{skeletonAnim}</style>
      <div
        style={{
          width: width ?? "100%",
          height: height ?? 16,
          borderRadius,
          background:
            "linear-gradient(90deg, rgba(26,58,110,0.06) 25%, rgba(200,169,110,0.14) 50%, rgba(26,58,110,0.06) 75%)",
          backgroundSize: "200% 100%",
          animation: "pubShimmer 1.8s infinite ease-in-out",
          ...style,
        }}
      />
    </>
  );
}

export function PubBlock({
  lines = 3,
  height = 14,
  gap = 10,
}: {
  lines?: number;
  height?: number;
  gap?: number;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap }}>
      {Array.from({ length: lines }).map((_, i) => (
        <PubSkeleton
          key={i}
          width={i === lines - 1 ? "55%" : "100%"}
          height={height}
        />
      ))}
    </div>
  );
}

/**
 * Modern skeleton matching News Cards (/news & Home latest news)
 */
export function NewsCardSkeleton({ imageHeight = 200 }: { imageHeight?: number }) {
  return (
    <div
      style={{
        borderRadius: 18,
        overflow: "hidden",
        boxShadow: "0 8px 30px rgba(26,58,110,0.06)",
        background: "white",
        border: "1px solid rgba(26,58,110,0.08)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <PubSkeleton width="100%" height={imageHeight} borderRadius={0} />
      <div
        style={{
          padding: 24,
          display: "flex",
          flexDirection: "column",
          gap: 14,
          flex: 1,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <PubSkeleton width={80} height={24} borderRadius={50} />
          <PubSkeleton width={90} height={14} borderRadius={6} />
        </div>
        <PubSkeleton width="90%" height={20} borderRadius={6} />
        <div style={{ display: "flex", flexDirection: "column", gap: 8, margin: "4px 0" }}>
          <PubSkeleton width="100%" height={13} borderRadius={4} />
          <PubSkeleton width="85%" height={13} borderRadius={4} />
        </div>
        <div style={{ marginTop: "auto", paddingTop: 8 }}>
          <PubSkeleton width={110} height={16} borderRadius={6} />
        </div>
      </div>
    </div>
  );
}

// Backwards compatibility for PubCard
export const PubCard = NewsCardSkeleton;

/**
 * Modern skeleton matching Gallery photo cards (/gallery)
 */
export function GalleryCardSkeleton() {
  return (
    <div
      style={{
        borderRadius: 18,
        overflow: "hidden",
        boxShadow: "0 4px 18px rgba(26,58,110,0.06)",
        background: "white",
        border: "1px solid rgba(26,58,110,0.08)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ width: "100%", aspectRatio: "4/3", position: "relative" }}>
        <PubSkeleton width="100%" height="100%" borderRadius={0} />
      </div>
      <div
        style={{
          padding: "14px 18px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 12,
        }}
      >
        <PubSkeleton width="60%" height={16} borderRadius={6} />
        <PubSkeleton width={70} height={22} borderRadius={50} />
      </div>
    </div>
  );
}

/**
 * Modern skeleton matching Department cards (/departments)
 */
export function DepartmentCardSkeleton() {
  return (
    <div
      style={{
        background: "white",
        borderRadius: 18,
        border: "1px solid rgba(26,58,110,0.08)",
        boxShadow: "0 4px 20px rgba(26,58,110,0.05)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "24px 28px",
          borderBottom: "1px solid rgba(26,58,110,0.07)",
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        <PubSkeleton width={48} height={48} borderRadius={12} />
        <div style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
          <PubSkeleton width="50%" height={20} borderRadius={6} />
          <PubSkeleton width="30%" height={14} borderRadius={4} />
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "24px 28px", display: "flex", flexDirection: "column", gap: 18 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <PubSkeleton width="100%" height={14} borderRadius={4} />
          <PubSkeleton width="75%" height={14} borderRadius={4} />
        </div>

        {/* Teacher list chips */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", paddingTop: 8 }}>
          {[1, 2, 3, 4].map((t) => (
            <div
              key={t}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "8px 14px",
                borderRadius: 50,
                background: "rgba(26,58,110,0.03)",
                border: "1px solid rgba(26,58,110,0.06)",
              }}
            >
              <PubSkeleton width={32} height={32} borderRadius={16} />
              <PubSkeleton width={90} height={14} borderRadius={4} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Modern skeleton matching Leadership cards (Home & About)
 */
export function LeadershipCardSkeleton() {
  return (
    <div
      style={{
        borderRadius: 20,
        overflow: "hidden",
        boxShadow: "0 8px 32px rgba(26,58,110,0.08)",
        background: "white",
        border: "1px solid rgba(26,58,110,0.08)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 24,
        gap: 16,
        textAlign: "center",
      }}
    >
      <PubSkeleton width={110} height={110} borderRadius={55} />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, width: "100%" }}>
        <PubSkeleton width="70%" height={18} borderRadius={6} />
        <PubSkeleton width="50%" height={14} borderRadius={4} />
      </div>
      <PubSkeleton width="80%" height={36} borderRadius={50} style={{ marginTop: 8 }} />
    </div>
  );
}

export function PubStatBlock({ count = 4 }: { count?: number }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(auto-fit, minmax(200px, 1fr))`,
        gap: 24,
      }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          style={{
            textAlign: "center",
            padding: "24px 16px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
          }}
        >
          <PubSkeleton width={60} height={60} borderRadius={16} />
          <PubSkeleton width={100} height={40} borderRadius={8} />
          <PubSkeleton width={140} height={14} />
        </div>
      ))}
    </div>
  );
}
