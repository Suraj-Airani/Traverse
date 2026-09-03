import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getImage } from "../lib/api";
import destinations from "../data/destinations";
import WeatherWidget from "./WeatherWidget";
import FamousPlaceCard from "./FamousPlaceCard";
import ErrorState from "./ErrorState";
import ScrollReveal from "./ScrollReveal";

// Destination detail page matching reference:
// - Back to collection link
// - Side-by-side image and editorial info with "Plan my days" button
// - "The forecast in [City]" section
// - "Famous places" cards with numbered badges
export default function DestinationPage({ onOpenGuide }) {
  const { id } = useParams();
  const destination = destinations.find((d) => d.id === id);

  const [heroImage, setHeroImage] = useState(null);
  const [heroLoaded, setHeroLoaded] = useState(false);

  // Fetch destination photo from Pexels
  useEffect(() => {
    if (destination) {
      let cancelled = false;
      getImage(`${destination.name} ${destination.country} street landmark aesthetic`, "large").then(
        (url) => {
          if (!cancelled) setHeroImage(url);
        }
      );
      return () => {
        cancelled = true;
      };
    }
  }, [destination]);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Destination not found
  if (!destination) {
    return (
      <main className="pt-32 px-6 flex items-center justify-center" style={{ minHeight: "100svh" }}>
        <div className="text-center">
          <ErrorState message="Destination not found" />
          <Link
            to="/"
            className="inline-flex items-center gap-2 mt-6 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105"
            style={{
              color: "var(--accent)",
              background: "var(--accent-bg)",
              border: "1px solid var(--border)",
              fontFamily: "var(--sans)",
            }}
          >
            ← Back to collection
          </Link>
        </div>
      </main>
    );
  }

  const categoryLine = `${destination.region.toUpperCase()} / ${destination.tags.join(" / ").toUpperCase()}`;

  return (
    <main className="pt-24 pb-20" style={{ background: "var(--bg)", minHeight: "100svh" }}>
      <div className="px-8 mx-auto" style={{ maxWidth: 1200 }}>
        {/* Back link */}
        <div className="mb-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm transition-colors hover:text-teal-700"
            style={{ color: "var(--text)", fontFamily: "var(--sans)" }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path
                d="M11 7H3M6.5 3.5L3 7l3.5 3.5"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back to collection
          </Link>
        </div>

        {/* Hero split: Image on left, Editorial copy on right */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24">
          {/* Left: Image */}
          <div className="lg:col-span-6">
            <div
              className="relative overflow-hidden shadow-sm"
              style={{
                height: 520,
                maxHeight: "70vh",
                borderRadius: "var(--radius-sm)",
                background: "var(--bg-card)",
              }}
            >
              {heroImage && (
                <motion.img
                  src={heroImage}
                  alt={`${destination.name}, ${destination.country}`}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: heroLoaded ? 1 : 0, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  onLoad={() => setHeroLoaded(true)}
                />
              )}
              {(!heroImage || !heroLoaded) && <div className="skeleton absolute inset-0" />}
            </div>
          </div>

          {/* Right: Info */}
          <div className="lg:col-span-6">
            <ScrollReveal>
              <p
                className="text-xs font-semibold tracking-[0.2em] uppercase mb-4"
                style={{ color: "var(--accent)" }}
              >
                {categoryLine}
              </p>

              <h1
                style={{
                  fontFamily: "var(--heading)",
                  fontSize: "clamp(3rem, 6vw, 4.5rem)",
                  fontWeight: 400,
                  color: "var(--text-h)",
                  margin: "0 0 16px",
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                }}
              >
                {destination.name}.
              </h1>

              <p
                className="text-base leading-relaxed mb-8"
                style={{ color: "var(--text)", lineHeight: 1.75, maxWidth: 500 }}
              >
                {destination.description}
              </p>

              {/* Plan my days button — triggers AI guide with this destination */}
              <button
                onClick={() => onOpenGuide && onOpenGuide(destination.name)}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:opacity-90 cursor-pointer shadow-sm"
                style={{
                  background: "var(--text-h)",
                  fontFamily: "var(--sans)",
                  border: "none",
                }}
              >
                Plan my days
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path
                    d="M7 1l2 2.5L12 4.5 9.5 7l.5 3.5L7 9 3.5 10.5 4 7 1.5 4.5 4.5 3.5z"
                    stroke="currentColor"
                    strokeWidth="1"
                    fill="none"
                  />
                </svg>
              </button>
            </ScrollReveal>
          </div>
        </section>

        <hr className="divider mb-20" />

        {/* Weather section */}
        <section className="mb-24">
          <ScrollReveal>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7">
                <p
                  className="text-xs font-semibold tracking-[0.2em] uppercase mb-3"
                  style={{ color: "var(--accent)" }}
                >
                  Right now
                </p>
                <h2
                  style={{
                    fontFamily: "var(--heading)",
                    fontSize: "clamp(2rem, 4vw, 3rem)",
                    fontWeight: 400,
                    lineHeight: 1.15,
                  }}
                >
                  The forecast in{" "}
                  <em style={{ color: "var(--accent)", fontStyle: "italic" }}>
                    {destination.name}.
                  </em>
                </h2>
              </div>

              <div className="lg:col-span-5">
                <WeatherWidget lat={destination.lat} lng={destination.lng} />
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* Famous places section */}
        <section className="mb-24">
          <ScrollReveal>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
              <div>
                <p
                  className="text-xs font-semibold tracking-[0.2em] uppercase mb-3"
                  style={{ color: "var(--accent)" }}
                >
                  Don't miss
                </p>
                <h2
                  style={{
                    fontFamily: "var(--heading)",
                    fontSize: "clamp(2rem, 4vw, 3rem)",
                    fontWeight: 400,
                    lineHeight: 1.15,
                  }}
                >
                  Famous{" "}
                  <em style={{ color: "var(--accent)", fontStyle: "italic" }}>
                    places.
                  </em>
                </h2>
              </div>
              <p className="text-sm" style={{ color: "var(--text)" }}>
                A few coordinates worth making time for.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {destination.famousPlaces.map((place, i) => (
                <FamousPlaceCard
                  key={place.name}
                  place={place}
                  destinationName={destination.name}
                  index={i}
                />
              ))}
            </div>
          </ScrollReveal>
        </section>
      </div>

      {/* Footer */}
      <footer className="px-8 py-10 text-center border-t" style={{ borderColor: "var(--border)" }}>
        <p className="text-xs" style={{ color: "var(--text)" }}>
          © {new Date().getFullYear()} Traverse. Thoughtful guides for the places that stay with you.
        </p>
      </footer>
    </main>
  );
}
