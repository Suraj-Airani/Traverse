import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ChatBot from "./components/ChatBot";
import LandingPage from "./components/LandingPage";
import ExplorePage from "./components/ExplorePage";
import DestinationPage from "./components/DestinationPage";

// App shell — routing, geolocation, persistent navbar and chatbot
export default function App() {
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [guideDestination, setGuideDestination] = useState(null);

  const handleOpenGuide = (destName) => {
    if (destName && typeof destName === "string") {
      setGuideDestination(destName);
    }
    setIsGuideOpen(true);
  };

  const handleCloseGuide = () => {
    setIsGuideOpen(false);
  };

  const [userLocation, setUserLocation] = useState({
    lat: null,
    lng: null,
    error: null,
    loading: true,
  });

  // Request geolocation on first load
  useEffect(() => {
    if (!navigator.geolocation) {
      setUserLocation({
        lat: null,
        lng: null,
        error: "Geolocation is not supported by your browser",
        loading: false,
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          error: null,
          loading: false,
        });
      },
      (err) => {
        setUserLocation({
          lat: null,
          lng: null,
          error: err.message,
          loading: false,
        });
      },
      { timeout: 10000 }
    );
  }, []);

  return (
    <>
      <Navbar onOpenGuide={() => handleOpenGuide()} />
      <Routes>
        <Route
          path="/"
          element={
            <LandingPage
              userLocation={userLocation}
              onOpenGuide={handleOpenGuide}
            />
          }
        />
        <Route
          path="/explore"
          element={<ExplorePage onOpenGuide={handleOpenGuide} />}
        />
        <Route
          path="/destination/:id"
          element={<DestinationPage onOpenGuide={handleOpenGuide} />}
        />
      </Routes>
      <ChatBot
        isOpen={isGuideOpen}
        onOpen={() => setIsGuideOpen(true)}
        onClose={handleCloseGuide}
        initialDestination={guideDestination}
      />
    </>
  );
}