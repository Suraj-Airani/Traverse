import React, { useState, useMemo } from "react";
import Hero from "./Hero";
import DestinationCard from "./DestinationCard";
import SkeletonCard from "./SkeletonCard";
import SearchBar from "./SearchBar";
import FilterChips from "./FilterChips";
import EmptyState from "./EmptyState";
import WeatherWidget from "./WeatherWidget";
import LocationFallback from "./LocationFallback";
import ScrollReveal from "./ScrollReveal";
import destinations from "../data/destinations";

const REGION_FILTERS = ["Europe", "Asia", "Americas", "Africa", "Nature"];

// Landing page matching reference:
// - Full-screen video hero
// - "Where will you begin?" collection with search + category filters
// - Grid of destination cards with 01..12 badges
// - "Read the weather" location-aware weather section
export default function LandingPage({ userLocation, onOpenGuide }) {
  const [search, setSearch] = useState("");
  const [selectedRegions, setSelectedRegions] = useState([]);

  function toggleRegion(region) {
    if (region === null) {
      setSelectedRegions([]);
      return;
    }
    setSelectedRegions((prev) =>
      prev.includes(region) ? prev.filter((r) => r !== region) : [...prev, region]
    );
  }

  const filtered = useMemo(() => {
    return destinations.filter((dest) => {
      const q = search.toLowerCase().trim();
      const matchesSearch =
        !q ||
        dest.name.toLowerCase().includes(q) ||
        dest.country.toLowerCase().includes(q) ||
        dest.tags.some((t) => t.toLowerCase().includes(q)) ||
        dest.region.toLowerCase().includes(q);

      const matchesRegion =
        selectedRegions.length === 0 ||
        selectedRegions.some((filter) => {
          if (filter === "Nature") {
            return dest.tags.includes("Nature") || dest.tags.includes("Mountain");
          }
          return dest.region === filter;
        });

      return matchesSearch && matchesRegion;
    });
  }, [search, selectedRegions]);

  return (
    <main style={{ background: "var(--bg)" }}>
      <Hero />

      {/* The Collection section */}
      <section id="collection" className="px-8 py-20 mx-auto" style={{ maxWidth: 1200 }}>
        <ScrollReveal>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div>
              <p
                className="text-xs font-semibold tracking-[0.2em] uppercase mb-3"
                style={{ color: "var(--accent)" }}
              >
                The collection
              </p>
              <h2
                style={{
                  fontFamily: "var(--heading)",
                  fontSize: "clamp(2.5rem, 5vw, 4rem)",
                  fontWeight: 400,
                  lineHeight: 1.08,
                  letterSpacing: "-0.02em",
                }}
              >
                Where will you<br />
                <em style={{ color: "var(--accent)", fontStyle: "italic" }}>
                  begin?
                </em>
              </h2>
            </div>
            <p
              className="text-base max-w-xs"
              style={{ color: "var(--text)", lineHeight: 1.6 }}
            >
              {destinations.length} places chosen for their texture, rhythm, and the stories waiting around the corner.
            </p>
          </div>
        </ScrollReveal>

        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 mb-10 border-b" style={{ borderColor: "var(--border)" }}>
          <SearchBar value={search} onChange={setSearch} />
          <FilterChips
            options={REGION_FILTERS}
            selected={selectedRegions}
            onToggle={toggleRegion}
            label="Filter destinations"
          />
        </div>

        {/* Destination Cards Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {filtered.map((dest, i) => (
              <DestinationCard key={dest.id} destination={dest} index={i} />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </section>

      <hr className="divider" />

      {/* Weather section — location aware */}
      <section className="px-8 py-24 mx-auto" style={{ maxWidth: 1200 }}>
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6">
              <p
                className="text-xs font-semibold tracking-[0.2em] uppercase mb-3"
                style={{ color: "var(--accent)" }}
              >
                Before you go
              </p>
              <h2
                style={{
                  fontFamily: "var(--heading)",
                  fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
                  fontWeight: 400,
                  lineHeight: 1.15,
                  margin: "0 0 12px",
                }}
              >
                Read the{" "}
                <em style={{ color: "var(--accent)", fontStyle: "italic" }}>
                  weather.
                </em>
              </h2>
              <p className="text-base" style={{ color: "var(--text)" }}>
                A small signal from wherever you are right now.
              </p>
            </div>

            <div className="lg:col-span-6">
              {userLocation.lat && userLocation.lng ? (
                <WeatherWidget lat={userLocation.lat} lng={userLocation.lng} />
              ) : (
                <LocationFallback />
              )}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Footer */}
      <footer
        className="px-8 py-10 text-center border-t"
        style={{ borderColor: "var(--border)" }}
      >
        <p className="text-xs" style={{ color: "var(--text)" }}>
          © {new Date().getFullYear()} Traverse. Crafted with love for travelers everywhere.
        </p>
      </footer>
    </main>
  );
}
