import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getImage } from "../lib/api";

// Destination card matching reference: image with numbered badge, name + country + arrow below
export default function DestinationCard({ destination, index = 0 }) {
  const [image, setImage] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    getImage(`${destination.name} ${destination.country} travel landmark`).then((url) => {
      if (!cancelled) setImage(url);
    });
    return () => { cancelled = true; };
  }, [destination.name, destination.country]);

  // Zero-padded index number (01, 02, etc.)
  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
    >
      <Link
        to={`/destination/${destination.id}`}
        className="block group"
        aria-label={`Explore ${destination.name}, ${destination.country}`}
      >
        {/* Image */}
        <div
          className="relative overflow-hidden mb-4"
          style={{
            height: 240,
            borderRadius: "var(--radius-sm)",
            background: "var(--bg-card)",
          }}
        >
          {image && (
            <img
              src={image}
              alt={`${destination.name}, ${destination.country}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.5s, transform 0.5s" }}
              onLoad={() => setLoaded(true)}
            />
          )}
          {(!image || !loaded) && <div className="skeleton absolute inset-0" />}

          {/* Number badge — teal circle top-left */}
          <span
            className="absolute top-4 left-4 flex items-center justify-center text-xs font-medium text-white"
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "var(--accent)",
              fontFamily: "var(--sans)",
            }}
          >
            {num}
          </span>
        </div>

        {/* Info row: name + arrow left, country below */}
        <div className="flex items-start justify-between mb-1">
          <h3
            className="text-lg"
            style={{
              fontFamily: "var(--heading)",
              fontWeight: 400,
              color: "var(--text-h)",
              fontSize: 18,
            }}
          >
            {destination.name}
          </h3>
          <span
            className="flex items-center justify-center flex-shrink-0 mt-0.5 transition-transform duration-200 group-hover:translate-x-1"
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              border: "1px solid var(--border)",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M3 6h6M6.5 3.5L9 6l-2.5 2.5" stroke="var(--text)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
        <p className="flex items-center gap-1 text-sm" style={{ color: "var(--text)" }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M6 1C4.07 1 2.5 2.57 2.5 4.5 2.5 7.75 6 11 6 11s3.5-3.25 3.5-6.5C9.5 2.57 7.93 1 6 1z" stroke="var(--text)" strokeWidth="1" fill="none" />
            <circle cx="6" cy="4.5" r="1.25" stroke="var(--text)" strokeWidth="1" fill="none" />
          </svg>
          {destination.country}
        </p>

        {/* Bottom divider */}
        <hr className="divider mt-4" />
      </Link>
    </motion.div>
  );
}
