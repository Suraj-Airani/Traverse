import React from "react";
import { motion } from "framer-motion";

// Renders parsed itinerary JSON as a vertical timeline with day cards
export default function ItineraryTimeline({ itinerary }) {
  if (!itinerary || !itinerary.days || itinerary.days.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-3 w-full">
      {itinerary.days.map((day, i) => (
        <motion.div
          key={day.day}
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: i * 0.1 }}
          className="relative flex gap-3"
        >
          {/* Timeline line + dot */}
          <div className="flex flex-col items-center flex-shrink-0" style={{ width: 24 }}>
            <div
              className="w-3 h-3 rounded-full flex-shrink-0 mt-1"
              style={{ background: "var(--accent)", border: "2px solid var(--bg)" }}
            />
            {i < itinerary.days.length - 1 && (
              <div
                className="w-px flex-1 mt-1"
                style={{ background: "var(--border)" }}
              />
            )}
          </div>

          {/* Day card */}
          <div
            className="flex-1 p-3 rounded-lg mb-1"
            style={{
              background: "var(--bg-secondary)",
              borderRadius: "var(--radius-sm)",
              border: "1px solid var(--border)",
            }}
          >
            <p
              className="text-xs font-semibold uppercase tracking-wide mb-1"
              style={{ color: "var(--accent)", fontFamily: "var(--sans)" }}
            >
              Day {day.day}
            </p>
            {day.title && (
              <p
                className="text-sm font-medium mb-2"
                style={{ color: "var(--text-h)", fontFamily: "var(--sans)" }}
              >
                {day.title}
              </p>
            )}
            <ul className="flex flex-col gap-1.5 m-0 p-0 list-none">
              {day.activities.map((activity, j) => (
                <li key={j} className="flex items-start gap-2 text-sm" style={{ color: "var(--text)" }}>
                  <span
                    className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full"
                    style={{ background: "var(--accent)", opacity: 0.5 }}
                    aria-hidden="true"
                  />
                  {activity}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
