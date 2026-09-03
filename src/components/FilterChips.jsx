import React from "react";

// Filter chip row matching reference: round pills, dark fill when active
export default function FilterChips({ options, selected, onToggle, label = "Filter" }) {
  return (
    <div className="flex flex-wrap gap-2 items-center" role="group" aria-label={label}>
      {/* All chip */}
      <button
        onClick={() => onToggle(null)}
        className="px-4 py-2 text-sm font-medium rounded-full border transition-all duration-200"
        style={{
          background: selected.length === 0 ? "var(--text-h)" : "transparent",
          color: selected.length === 0 ? "#fff" : "var(--text)",
          borderColor: selected.length === 0 ? "var(--text-h)" : "var(--border)",
          fontFamily: "var(--sans)",
        }}
        aria-pressed={selected.length === 0}
      >
        All
      </button>
      {options.map((option) => {
        const active = selected.includes(option);
        return (
          <button
            key={option}
            onClick={() => onToggle(option)}
            className="px-4 py-2 text-sm font-medium rounded-full border transition-all duration-200"
            style={{
              background: active ? "var(--text-h)" : "transparent",
              color: active ? "#fff" : "var(--text)",
              borderColor: active ? "var(--text-h)" : "var(--border)",
              fontFamily: "var(--sans)",
            }}
            aria-pressed={active}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
