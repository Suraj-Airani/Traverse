# Traverse — Thoughtful Travel & AI Guide

Traverse is a modern, front-end travel web application built with **React (Vite)** and **Tailwind CSS**. It delivers an editorial travel discovery experience, combining live photography, real-time weather, browser geolocation, and an AI-powered travel assistant with day-by-day itinerary planning.

![Traverse App Preview](/public/hero.mp4)

---

## Highlights & Features

- **Full-Screen Video Hero**: Looping background video with editorial typography and an animated scroll cue.
- **The Collection (Explorer)**: Responsive 4-column destination grid with numbered badges (`01`, `02`, ...), live search, and regional filter chips (`Europe`, `Asia`, `Americas`, `Africa`, `Nature`).
- **Live Photography via Pexels API**: Dynamic, search-driven photography for every destination and landmark with loading shimmer skeletons and graceful fallbacks.
- **Real-Time Weather (OpenWeather API)**: Current temperature, feels-like conditions, humidity, and weather descriptions rendered in custom sage-toned widgets.
- **Location Awareness & Fallback**: Automatically requests visitor geolocation on load. If permission is denied or unavailable, provides a manual city search with instant weather lookup.
- **Destination Detail Pages**: Split-screen editorial hero, curated descriptions, live city forecasts, and rich "Famous Places" landmark cards.
- **AI Travel Guide (Gemini API)**: Slide-out drawer with direct client-side integration to Google's Gemini API for answering destination queries, recommending attractions, and offering seasonal travel advice.
- **Structured Itinerary Planner**: Interactive day-by-day itinerary builder that extracts travel intents (e.g. *"Plan me a 4-day trip to India"*) and renders clean timeline cards with multi-model failover protection.
- **Unhappy Paths Handled by Design**: Skeleton loading cards, dashed empty search results, geolocation denial fallbacks, and API error states with retries.
- **Editorial Aesthetics & Accessibility**: Warm cream/beige background palette, Playfair Display serif headings, DM Sans body text, teal accents, semantic HTML, visible focus rings, and screen-reader utilities.

---

## Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vite.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) + Custom CSS Design System
- **Routing**: [React Router v7](https://reactrouter.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **External APIs**:
  - [OpenWeatherMap API](https://openweathermap.org/api) — Live weather data
  - [Pexels API](https://www.pexels.com/api/) — Curated destination & landmark photos
  - [Google Gemini API](https://ai.google.dev/) — Conversational travel assistant & itinerary parsing

---

## Folder Structure

```text
Traverse/
├── public/
│   ├── favicon.png        # App favicon
│   ├── hero.mp4           # Looping hero background video
│   └── logo.png           # Brand logo
├── src/
│   ├── components/
│   │   ├── ChatBot.jsx            # Slide-out AI travel guide & itinerary planner
│   │   ├── DestinationCard.jsx    # Editorial destination card with numbered badges
│   │   ├── DestinationPage.jsx    # Destination detail view with split hero & places
│   │   ├── EmptyState.jsx         # Search and filter empty state
│   │   ├── ErrorState.jsx         # Network and API error state with retry
│   │   ├── ExplorePage.jsx        # Destination explorer route
│   │   ├── FamousPlaceCard.jsx    # Landmark cards with live Pexels images
│   │   ├── FilterChips.jsx        # Category and region pill filters
│   │   ├── Hero.jsx               # Full-screen video hero with headline & CTA
│   │   ├── ItineraryTimeline.jsx  # Day-by-day timeline visualizer
│   │   ├── LandingPage.jsx        # Main landing page with collection & weather
│   │   ├── LocationFallback.jsx   # Manual city search fallback widget
│   │   ├── Navbar.jsx             # Minimal header with guide trigger
│   │   ├── ScrollReveal.jsx       # Scroll entrance animation wrapper
│   │   ├── SearchBar.jsx          # Search input with live debouncing
│   │   ├── SkeletonCard.jsx       # Shimmer placeholder for cards
│   │   └── WeatherWidget.jsx      # Live weather display widget
│   ├── data/
│   │   └── destinations.js        # Curated destinations dataset (15 destinations)
│   ├── lib/
│   │   └── api.js                 # OpenWeather, Pexels, and Gemini API helpers
│   ├── App.jsx                    # App shell, routing & geolocation provider
│   ├── index.css                  # Design tokens, fonts, and base styling
│   └── main.jsx                   # React entry point with BrowserRouter
├── .env                           # API keys (never committed)
├── .gitignore
├── index.html                     # HTML root template with SEO tags
├── package.json
└── vite.config.js
```

---

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Suraj-Airani/Traverse.git
   cd Traverse
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory:
   ```env
   VITE_OPENWEATHER_KEY=your_openweather_api_key
   VITE_PEXELS_KEY=your_pexels_api_key
   VITE_GEMINI_KEY=your_gemini_api_key
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

5. **Build for production**:
   ```bash
   npm run build
   ```

---

## License

MIT License. Crafted with love for travelers everywhere.
