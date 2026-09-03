import React from "react";

// Minimal search input — borderless, just icon + text, matching reference
export default function SearchBar({ value, onChange, placeholder = "Search a destination" }) {
  return (
    <div className="relative w-full" style={{ maxWidth: 400 }}>
      <label htmlFor="search-input" className="sr-only">Search destinations</label>
      <svg
        width="16" height="16" viewBox="0 0 16 16" fill="none"
        className="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none"
        aria-hidden="true"
      >
        <circle cx="7" cy="7" r="5" stroke="var(--text)" strokeWidth="1.5" />
        <path d="M11 11l3.5 3.5" stroke="var(--text)" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <input
        id="search-input"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full py-2 pl-7 pr-2 text-sm bg-transparent border-none outline-none"
        style={{
          color: "var(--text-h)",
          fontFamily: "var(--sans)",
          borderBottom: "1px solid var(--border)",
        }}
      />
    </div>
  );
}
