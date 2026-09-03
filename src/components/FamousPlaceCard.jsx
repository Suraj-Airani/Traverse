import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getImage } from "../lib/api";

// Famous place card matching reference: numbered badge, image, name + description below
export default function FamousPlaceCard({ place, destinationName, index = 0 }) {
  const [image, setImage] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    getImage(`${place.name} ${destinationName} landmark`).then((url) => {
      if (!cancelled) setImage(url);
    });
    return () => { cancelled = true; };
  }, [place.name, destinationName]);

  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Divider above card */}
      <hr className="divider mb-5" />

      {/* Image */}
      <div
        className="relative overflow-hidden mb-4"
        style={{ height: 220, borderRadius: "var(--radius-sm)", background: "var(--bg-card)" }}
      >
        {image && (
          <img
            src={image}
            alt={`${place.name} in ${destinationName}`}
            className="w-full h-full object-cover transition-opacity duration-500"
            style={{ opacity: loaded ? 1 : 0 }}
            onLoad={() => setLoaded(true)}
          />
        )}
        {(!image || !loaded) && <div className="skeleton absolute inset-0" />}

        {/* Number badge */}
        <span
          className="absolute top-3 left-3 flex items-center justify-center text-xs font-medium text-white"
          style={{
            width: 30, height: 30, borderRadius: "50%",
            background: "var(--accent)", fontFamily: "var(--sans)",
          }}
        >
          {num}
        </span>
      </div>

      {/* Info */}
      <h3
        className="mb-2"
        style={{ fontFamily: "var(--heading)", fontWeight: 400, fontSize: 18, color: "var(--text-h)" }}
      >
        {place.name}
      </h3>
      <p className="text-sm" style={{ color: "var(--text)", lineHeight: 1.6 }}>
        {place.description}
      </p>
    </motion.div>
  );
}
