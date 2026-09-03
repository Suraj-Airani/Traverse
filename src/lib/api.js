// API helper functions for OpenWeather, Pexels, and Gemini
const WEATHER_KEY = import.meta.env.VITE_OPENWEATHER_KEY;
const PEXELS_KEY = import.meta.env.VITE_PEXELS_KEY;
const GEMINI_KEY = import.meta.env.VITE_GEMINI_KEY;

// Fallback placeholder when Pexels returns no results
const FALLBACK_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400'%3E%3Crect width='600' height='400' fill='%23e5e4e7'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='system-ui' font-size='18' fill='%236b6375'%3ENo image available%3C/text%3E%3C/svg%3E";

/**
 * Fetch current weather by latitude/longitude
 */
export async function getWeather(lat, lng) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${WEATHER_KEY}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Weather fetch failed");
  }
  return await response.json();
}

/**
 * Fetch current weather by city name (fallback when geolocation is denied)
 */
export async function getWeatherByCity(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${WEATHER_KEY}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Weather fetch failed for city: " + city);
  }
  return await response.json();
}

/**
 * Fetch a single image from Pexels by search query.
 * Returns the image URL or a fallback placeholder.
 */
export async function getImage(query, size = "large") {
  try {
    const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1`;
    const response = await fetch(url, {
      headers: { Authorization: PEXELS_KEY },
    });
    if (!response.ok) {
      throw new Error("Pexels fetch failed");
    }
    const data = await response.json();
    if (data.photos && data.photos.length > 0) {
      return data.photos[0].src[size] || data.photos[0].src.large;
    }
    return FALLBACK_IMAGE;
  } catch {
    return FALLBACK_IMAGE;
  }
}

/**
 * Fetch multiple images from Pexels by search query.
 * Returns an array of image URLs.
 */
export async function getImages(query, count = 3) {
  try {
    const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${count}`;
    const response = await fetch(url, {
      headers: { Authorization: PEXELS_KEY },
    });
    if (!response.ok) {
      throw new Error("Pexels fetch failed");
    }
    const data = await response.json();
    if (data.photos && data.photos.length > 0) {
      return data.photos.map((p) => p.src.large);
    }
    return [];
  } catch {
    return [];
  }
}

// Primary and backup Gemini models to handle temporary demand spikes
const GEMINI_MODELS = [
  "gemini-3.6-flash",
  "gemini-flash-latest-high-res-exp",
  "gemini-3.8-flash",
];

export async function askGemini(message) {
  let lastError = null;

  for (const model of GEMINI_MODELS) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_KEY}`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: message }] }],
        }),
      });

      // If this model is experiencing high demand (503) or rate limit (429), try next model
      if (response.status === 503 || response.status === 429) {
        const errorData = await response.json().catch(() => ({}));
        lastError = new Error(errorData?.error?.message || `Model ${model} experiencing high demand`);
        continue;
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        lastError = new Error(errorData?.error?.message || "Gemini API request failed");
        continue;
      }

      const data = await response.json();
      if (
        data.candidates &&
        data.candidates[0] &&
        data.candidates[0].content &&
        data.candidates[0].content.parts &&
        data.candidates[0].content.parts[0]
      ) {
        return data.candidates[0].content.parts[0].text;
      }
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError || new Error("AI assistant is temporarily busy. Please try again in a few moments.");
}

/**
 * Fallback curated itinerary generator when API servers experience temporary 503 high demand spikes.
 */
function createCuratedItinerary(destinationName, days) {
  const dayThemes = [
    {
      title: "Arrival, Historic Heart & First Impressions",
      activities: [
        `Arrive in ${destinationName}, check into accommodations, and get your bearings`,
        `Explore the historic center and stroll through the most iconic squares and scenic lanes`,
        `Enjoy authentic local cuisine and welcome tea or drinks at a renowned neighborhood spot`,
        `Evening walk along scenic viewpoints or illuminated architectural landmarks`,
      ],
    },
    {
      title: "Landmarks, Culture & Heritage",
      activities: [
        `Morning visit to the premier cultural landmarks and architectural masterpieces in ${destinationName}`,
        `Guided exploration of prominent local museums and heritage centers`,
        `Lunch featuring traditional regional delicacies and street food specialties`,
        `Sunset photography at the city's most breathtaking lookout point`,
      ],
    },
    {
      title: "Nature, Landscapes & Scenic Views",
      activities: [
        `Day trip to breathtaking natural scenery, serene gardens, or nearby coastal / mountain trails`,
        `Picnic lunch amidst picturesque surroundings`,
        `Visit local artisan workshops, craft studios, and boutique markets`,
        `Relaxing evening dining experience featuring local specialties`,
      ],
    },
    {
      title: "Local Life, Markets & Hidden Gems",
      activities: [
        `Early morning visit to bustling local morning markets and bakeries`,
        `Wander through creative districts, galleries, and hidden alleys off the beaten tourist path`,
        `Afternoon coffee or tea tasting in a historic café`,
        `Memorable farewell dinner showcasing ${destinationName}'s finest culinary traditions`,
      ],
    },
    {
      title: "Adventure & Immersion",
      activities: [
        `Outdoor excursion or walking tour highlighting hidden historical secrets of ${destinationName}`,
        `Visit ancient spiritual sites, temples, or botanical reserves`,
        `Shopping for authentic locally crafted souvenirs and spices`,
        `Evening cultural show or rooftop gathering under the stars`,
      ],
    },
  ];

  const resultDays = [];
  for (let i = 1; i <= days; i++) {
    const themeIndex = (i - 1) % dayThemes.length;
    const theme = dayThemes[themeIndex];
    resultDays.push({
      day: i,
      title: `Day ${i}: ${theme.title}`,
      activities: theme.activities,
    });
  }

  return { days: resultDays };
}

/**
 * Request a day-by-day itinerary from Gemini with multi-model failover and curated fallback.
 */
export async function getItinerary(destinationName, days) {
  const prompt = `Create a ${days}-day travel itinerary for ${destinationName}.
Reply ONLY with valid JSON in this exact format, no markdown, no explanation:
{"days":[{"day":1,"title":"Day title here","activities":["activity 1","activity 2","activity 3"]}]}
Each day must have 3-4 concise activities. Make the title descriptive of the day's theme.`;

  try {
    const reply = await askGemini(prompt);

    // Extract JSON object safely
    const jsonMatch = reply.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
  } catch (err) {
    console.warn("AI generation encountered issue, using curated itinerary for", destinationName, err);
  }

  // Graceful fallback if Gemini API is in a temporary 503 spike
  return createCuratedItinerary(destinationName, days);
}