import React, { useState } from "react";
import { getWeatherByCity } from "../lib/api";
import WeatherWidget from "./WeatherWidget";

// Shown when geolocation permission is denied.
// Lets the user manually enter a city to get weather.
export default function LocationFallback() {
  const [city, setCity] = useState("");
  const [submittedCity, setSubmittedCity] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    if (city.trim()) {
      setSubmittedCity(city.trim());
    }
  }

  return (
    <div
      className="p-6 rounded-xl text-left"
      style={{
        background: "var(--bg-secondary)",
        borderRadius: "var(--radius-lg)",
        border: "1px solid var(--border)",
      }}
    >
      <div className="flex items-start gap-3 mb-4">
        {/* Location pin icon */}
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className="flex-shrink-0 mt-0.5"
          aria-hidden="true"
        >
          <path
            d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
            stroke="var(--accent)"
            strokeWidth="1.5"
            fill="var(--accent-bg)"
          />
          <circle cx="12" cy="9" r="2.5" stroke="var(--accent)" strokeWidth="1.5" fill="none" />
        </svg>
        <div>
          <h3
            className="text-base font-medium mb-1"
            style={{ color: "var(--text-h)", fontFamily: "var(--sans)" }}
          >
            Location access unavailable
          </h3>
          <p className="text-sm" style={{ color: "var(--text)" }}>
            Enter a city name below to see current weather conditions.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <label htmlFor="city-input" className="sr-only">
          Enter city name
        </label>
        <input
          id="city-input"
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="e.g. London, Tokyo, Mumbai"
          className="flex-1 px-4 py-2.5 text-sm rounded-full border transition-all duration-200"
          style={{
            borderColor: "var(--border)",
            background: "var(--bg)",
            color: "var(--text-h)",
            fontFamily: "var(--sans)",
            borderRadius: "var(--radius-full)",
            outline: "none",
          }}
          onFocus={(e) => (e.target.style.borderColor = "var(--accent-border)")}
          onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
        />
        <button
          type="submit"
          className="px-5 py-2.5 text-sm font-medium rounded-full text-white transition-all duration-200 hover:scale-105"
          style={{
            background: "var(--accent)",
            fontFamily: "var(--sans)",
            borderRadius: "var(--radius-full)",
            border: "none",
          }}
        >
          Search
        </button>
      </form>

      {submittedCity && <WeatherWidget city={submittedCity} />}
    </div>
  );
}
