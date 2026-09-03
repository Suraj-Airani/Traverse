import React, { useState, useEffect } from "react";
import { getWeather, getWeatherByCity } from "../lib/api";

// Weather widget matching reference: muted green/sage card, minimal layout
export default function WeatherWidget({ lat, lng, city, compact = false }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function fetchWeather() {
    setLoading(true);
    setError(null);
    const promise = city ? getWeatherByCity(city) : getWeather(lat, lng);
    promise
      .then((data) => { setWeather(data); setLoading(false); })
      .catch((err) => { setError(err.message); setLoading(false); });
  }

  useEffect(() => {
    if (city || (lat !== undefined && lng !== undefined)) fetchWeather();
  }, [lat, lng, city]);

  // Loading
  if (loading) {
    return (
      <div
        className="p-6 rounded-lg"
        style={{ background: "var(--bg-weather)", borderRadius: "var(--radius-md)" }}
        role="status"
        aria-label="Loading weather"
      >
        <p className="text-sm" style={{ color: "var(--text)" }}>Reading the sky...</p>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div
        className="p-6 rounded-lg flex items-center justify-between"
        style={{ background: "var(--bg-weather)", borderRadius: "var(--radius-md)" }}
        role="alert"
      >
        <p className="text-sm" style={{ color: "var(--text)" }}>Unable to load weather</p>
        <button
          onClick={fetchWeather}
          className="text-sm font-medium px-3 py-1 rounded-full"
          style={{ color: "var(--accent)", background: "var(--accent-bg)", border: "none", fontFamily: "var(--sans)" }}
        >
          Retry
        </button>
      </div>
    );
  }

  if (!weather) return null;

  const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
  const temp = Math.round(weather.main.temp);
  const description = weather.weather[0].description;
  const feelsLike = Math.round(weather.main.feels_like);
  const humidity = weather.main.humidity;
  const locationName = weather.name;

  return (
    <div
      className="p-6 rounded-lg"
      style={{ background: "var(--bg-weather)", borderRadius: "var(--radius-md)" }}
      aria-label={`Weather in ${locationName}: ${temp}°C, ${description}`}
    >
      {/* City name */}
      <p className="text-sm font-medium mb-3" style={{ color: "var(--text-h)" }}>
        {locationName}
      </p>

      {/* Icon + temp row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={iconUrl} alt={description} width={36} height={36} />
          <span className="text-2xl font-light" style={{ color: "var(--text-h)", fontFamily: "var(--heading)" }}>
            {temp}°
          </span>
        </div>
        <div className="text-right">
          <p className="text-sm" style={{ color: "var(--text)" }}>Feels {feelsLike}°</p>
          <p className="text-sm" style={{ color: "var(--text)" }}>Humidity {humidity}%</p>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm capitalize mt-2" style={{ color: "var(--text)" }}>
        {description}
      </p>
    </div>
  );
}
