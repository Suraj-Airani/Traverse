import React from "react";

// Skeleton card matching the reference editorial card layout
export default function SkeletonCard() {
  return (
    <div aria-hidden="true">
      <div
        className="skeleton mb-4"
        style={{ height: 240, borderRadius: "var(--radius-sm)" }}
      />
      <div className="flex items-center justify-between mb-2">
        <div className="skeleton" style={{ height: 18, width: "50%", borderRadius: 4 }} />
        <div className="skeleton" style={{ width: 28, height: 28, borderRadius: "50%" }} />
      </div>
      <div className="skeleton" style={{ height: 14, width: "35%", borderRadius: 4 }} />
      <hr className="divider mt-4" />
    </div>
  );
}
