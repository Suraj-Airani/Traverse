import React from "react";

// Reusable error state with message and retry button
export default function ErrorState({ message = "Something went wrong", onRetry }) {
  return (
    <div
      className="flex flex-col items-center justify-center py-12 px-6 text-center"
      role="alert"
    >
      {/* Warning icon */}
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        className="mb-4"
        aria-hidden="true"
      >
        <circle cx="24" cy="24" r="20" stroke="var(--accent)" strokeWidth="2" opacity="0.3" />
        <path
          d="M24 16v10M24 30v2"
          stroke="var(--accent)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      <p
        className="text-sm font-medium mb-4"
        style={{ color: "var(--text-h)" }}
      >
        {message}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-5 py-2 text-sm font-medium rounded-full border transition-all duration-200 hover:scale-105"
          style={{
            color: "var(--accent)",
            borderColor: "var(--accent-border)",
            background: "var(--accent-bg)",
            fontFamily: "var(--sans)",
          }}
        >
          Try Again
        </button>
      )}
    </div>
  );
}
