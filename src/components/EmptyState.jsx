import React from "react";

// Empty state matching reference: dashed border box, centered icon + text
export default function EmptyState({ message = "No places found", hint = "Try another region or search term." }) {
  return (
    <div
      className="flex flex-col items-center justify-center py-16 px-6 text-center rounded-lg"
      style={{
        border: "1px dashed var(--border)",
        borderRadius: "var(--radius-md)",
        minHeight: 240,
      }}
      role="status"
    >
      {/* Compass/slash icon */}
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" className="mb-5" aria-hidden="true">
        <circle cx="18" cy="18" r="14" stroke="var(--border)" strokeWidth="1.5" />
        <path d="M12 24L24 12" stroke="var(--border)" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <p className="text-sm font-medium mb-1" style={{ color: "var(--text-h)" }}>{message}</p>
      <p className="text-sm" style={{ color: "var(--text)" }}>{hint}</p>
    </div>
  );
}
