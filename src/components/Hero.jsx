import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Full-screen hero with looping background video — editorial style
export default function Hero() {
  return (
    <section
      className="relative w-full flex items-center overflow-hidden"
      style={{ minHeight: "100svh" }}
      aria-label="Hero section"
    >
      {/* Background video */}
      <video
        autoPlay loop muted playsInline
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden="true"
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      {/* Subtle dark overlay */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.45))" }}
        aria-hidden="true"
      />

      {/* Content — left-aligned editorial style */}
      <div className="relative z-10 px-8 mx-auto w-full" style={{ maxWidth: 1200 }}>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-xs font-semibold tracking-[0.2em] uppercase mb-6"
          style={{ color: "rgba(255,255,255,0.7)" }}
        >
          A world worth wandering
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          style={{
            fontFamily: "var(--heading)",
            fontSize: "clamp(3rem, 7vw, 5.5rem)",
            lineHeight: 1.05,
            fontWeight: 400,
            color: "#fff",
            margin: "0 0 24px",
            maxWidth: 700,
            letterSpacing: "-0.02em",
          }}
        >
          Go where<br />
          <em style={{ color: "var(--accent-light)", fontStyle: "italic" }}>
            you feel alive.
          </em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="text-base mb-10"
          style={{ color: "rgba(255,255,255,0.75)", maxWidth: 420 }}
        >
          Thoughtful guides for the places that stay with you.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <a
            href="/explore"
            className="inline-flex items-center gap-3 px-7 py-3.5 text-sm font-medium transition-all duration-300 hover:scale-105"
            style={{
              background: "#fff",
              color: "var(--text-h)",
              borderRadius: "var(--radius-sm)",
              fontFamily: "var(--sans)",
            }}
          >
            Find your next place
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </motion.div>
      </div>

      {/* Scroll cue — bottom left */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.5 }}
        className="absolute bottom-8 left-8 flex items-center gap-3 animate-bounce-down"
        aria-hidden="true"
      >
        <span className="text-xs uppercase tracking-[0.15em] text-white/60" style={{ fontFamily: "var(--sans)" }}>
          Scroll to explore
        </span>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M6 2v8M2.5 6.5L6 10l3.5-3.5" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
    </section>
  );
}
