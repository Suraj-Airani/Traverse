import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

// Minimal navbar matching reference: logo left, Explore + "Plan a trip" right
export default function Navbar({ onOpenGuide }) {
  const location = useLocation();
  const isDetail = location.pathname.startsWith("/destination/");

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: isDetail ? "var(--bg)" : "transparent",
        borderBottom: isDetail ? "1px solid var(--border)" : "none",
      }}
      role="navigation"
      aria-label="Main navigation"
    >
      <div
        className="flex items-center justify-between px-8 py-5 mx-auto"
        style={{ maxWidth: 1200 }}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2" aria-label="Traverse home">
          <img src="/logo.png" alt="Traverse logo" className="h-9 w-auto" />
        </Link>

        {/* Right nav */}
        <div className="flex items-center gap-6">
          <Link
            to="/explore"
            className="text-sm font-medium hidden sm:block transition-colors duration-200"
            style={{
              color: isDetail ? "var(--text-h)" : "#fff",
              fontFamily: "var(--sans)",
            }}
          >
            Explore
          </Link>
          <button
            onClick={onOpenGuide}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105"
            style={{
              background: "var(--text-h)",
              color: "#fff",
              border: "none",
              fontFamily: "var(--sans)",
            }}
          >
            Plan a trip
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M7 1l2 2.5L12 4.5 9.5 7l.5 3.5L7 9 3.5 10.5 4 7 1.5 4.5 4.5 3.5z" stroke="currentColor" strokeWidth="1" fill="none" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
