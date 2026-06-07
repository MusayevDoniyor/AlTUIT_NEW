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
            "linear-gradient(90deg, rgba(0,33,71,0.06) 25%, rgba(0,33,71,0.12) 50%, rgba(0,33,71,0.06) 75%)",
          backgroundSize: "200% 100%",
          animation: "pubShimmer 1.5s infinite linear",
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

export function PubCard({ imageHeight = 180 }: { imageHeight?: number }) {
  return (
    <div
      style={{
        borderRadius: 18,
        overflow: "hidden",
        boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
        background: "white",
      }}
    >
      <PubSkeleton width="100%" height={imageHeight} borderRadius={0} />
      <div
        style={{
          padding: 24,
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <PubSkeleton width="75%" height={16} />
        <PubSkeleton width="100%" height={12} />
        <PubSkeleton width="60%" height={12} />
      </div>
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
