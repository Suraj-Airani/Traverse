import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { askGemini, getItinerary } from "../lib/api";
import ItineraryTimeline from "./ItineraryTimeline";
import destinations from "../data/destinations";

// Right-side slide-out drawer AI guide — matches reference "Traverse guide" panel
export default function ChatBot({
  isOpen: controlledIsOpen,
  onOpen,
  onClose,
  initialDestination,
}) {
  // Support both controlled and uncontrolled states
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

  const handleOpen = () => {
    setInternalIsOpen(true);
    if (typeof onOpen === "function") {
      onOpen();
    }
  };

  const handleClose = () => {
    setInternalIsOpen(false);
    if (typeof onClose === "function") {
      onClose();
    }
  };

  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Tell me where you're headed, and I'll help you make the most of it.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Itinerary planner state
  const [planDest, setPlanDest] = useState(
    initialDestination || destinations[0]?.name || "Kyoto"
  );
  const [planDays, setPlanDays] = useState("3");

  // Keep planDest updated if initialDestination changes
  useEffect(() => {
    if (initialDestination) {
      setPlanDest(initialDestination);
    }
  }, [initialDestination]);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Build itinerary via planner dropdowns
  async function handleBuildItinerary() {
    if (loading) return;
    setLoading(true);
    setMessages((prev) => [
      ...prev,
      { role: "user", text: `Plan ${planDays} days in ${planDest}` },
    ]);

    try {
      const itinerary = await getItinerary(planDest, parseInt(planDays));
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: `Here's your ${planDays}-day itinerary for ${planDest}:`,
          itinerary,
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: `Could not generate itinerary for ${planDest}: ${err.message || "Please try again."}`,
          isError: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  // Extract itinerary intent from user text (e.g. "Plan me a 4-day trip to India", "3 days in Tokyo")
  function extractItineraryRequest(rawText) {
    const patterns = [
      /(?:plan|create|make|build|give\s+me)(?:\s+me)?(?:\s+a)?\s+(\d+)\s*[- ]*(?:day|days)(?:\s+trip|\s+itinerary|\s+tour|\s+vacation)?\s+(?:to|for|in|at)\s+([^.!?]+)/i,
      /(\d+)\s*[- ]*(?:day|days?)(?:\s+trip|\s+itinerary|\s+tour|\s+vacation)?\s+(?:to|for|in|at)\s+([^.!?]+)/i,
      /(?:itinerary|trip|plan|tour)\s+(?:for|to|in)\s+([^.!?]+?)\s+(?:for|of)\s+(\d+)\s*[- ]*(?:day|days)/i,
      /(?:itinerary|trip|plan|tour)\s+(?:for|to|in)\s+([^.!?]+)/i,
    ];

    for (const pattern of patterns) {
      const m = rawText.match(pattern);
      if (m) {
        if (pattern === patterns[2]) {
          return { destination: m[1].trim().replace(/[.,!?]+$/, ""), days: Math.min(Math.max(parseInt(m[2], 10), 1), 14) };
        }
        if (pattern === patterns[3]) {
          return { destination: m[1].trim().replace(/[.,!?]+$/, ""), days: 3 };
        }
        return { days: Math.min(Math.max(parseInt(m[1], 10), 1), 14), destination: m[2].trim().replace(/[.,!?]+$/, "") };
      }
    }
    return null;
  }

  // Send free-form chat message
  async function handleSend(e) {
    if (e) e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    setMessages((prev) => [...prev, { role: "user", text }]);
    setInput("");
    setLoading(true);

    try {
      // Check for itinerary pattern
      const tripIntent = extractItineraryRequest(text);

      if (tripIntent) {
        const { destination: targetDest, days: targetDays } = tripIntent;
        const itinerary = await getItinerary(targetDest, targetDays);
        setMessages((prev) => [
          ...prev,
          {
            role: "bot",
            text: `Here's your ${targetDays}-day itinerary for ${targetDest}:`,
            itinerary,
          },
        ]);
      } else {
        const prompt = `You are Traverse, a knowledgeable and thoughtful travel assistant. Answer this travel question concisely (2-3 short paragraphs max). Provide specific highlights, seasonal advice, and cultural context when relevant.\n\nQuestion: ${text}`;
        const reply = await askGemini(prompt);
        setMessages((prev) => [...prev, { role: "bot", text: reply }]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: `I ran into a temporary hiccup reaching the AI service (${err.message || "High demand spike"}). You can try again in a moment, or use the "Plan my days" builder below.`,
          isError: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  const quickSuggestions = [
    `Top 3 places to visit in ${planDest}`,
    `Best time to visit ${planDest}`,
    `What to eat in ${planDest}`,
  ];

  return (
    <>
      {/* Floating "Ask a guide" button — bottom right, always visible when drawer is closed */}
      {!isOpen && (
        <motion.button
          onClick={handleOpen}
          className="fixed z-50 flex items-center gap-2 rounded-full shadow-lg px-5 py-3 text-sm font-medium text-white cursor-pointer"
          style={{
            bottom: 24,
            right: 24,
            background: "var(--accent)",
            border: "none",
            fontFamily: "var(--sans)",
            boxShadow: "0 4px 20px rgba(13, 148, 136, 0.35)",
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          aria-label="Open travel guide"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M8 1l2.5 3.5L14 6l-3 3 .5 4L8 11.5 4.5 13l.5-4-3-3 3.5-1.5z"
              stroke="currentColor"
              strokeWidth="1"
              fill="none"
            />
          </svg>
          Ask a guide
        </motion.button>
      )}

      {/* Slide-out drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 cursor-pointer"
              style={{ background: "rgba(0,0,0,0.25)" }}
              onClick={handleClose}
              aria-hidden="true"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-50 flex flex-col"
              style={{
                width: 420,
                maxWidth: "92vw",
                background: "var(--bg)",
                borderLeft: "1px solid var(--border)",
                boxShadow: "-4px 0 28px rgba(0,0,0,0.15)",
              }}
              role="dialog"
              aria-label="Traverse travel guide"
            >
              {/* Header */}
              <div
                className="flex items-center justify-between px-6 py-5"
                style={{ borderBottom: "1px solid var(--border)", background: "var(--bg)" }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white"
                    style={{ background: "var(--accent)" }}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path
                        d="M8 1l2.5 3.5L14 6l-3 3 .5 4L8 11.5 4.5 13l.5-4-3-3 3.5-1.5z"
                        stroke="white"
                        strokeWidth="1"
                        fill="none"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "var(--text-h)" }}>
                      Traverse guide
                    </p>
                    <p className="text-xs" style={{ color: "var(--accent)" }}>
                      Here to help you wander
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  className="p-2 rounded-full transition-colors hover:bg-black/5 cursor-pointer"
                  style={{ background: "none", border: "none" }}
                  aria-label="Close guide"
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path
                      d="M5 5l8 8M13 5L5 13"
                      stroke="var(--text-h)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>

              {/* Messages area */}
              <div
                className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-3 chat-scroll"
                style={{ minHeight: 0 }}
              >
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className="max-w-[90%] px-4 py-3 text-sm"
                      style={{
                        background: msg.role === "user" ? "var(--text-h)" : "var(--bg-weather)",
                        color:
                          msg.role === "user"
                            ? "#fff"
                            : msg.isError
                            ? "#dc2626"
                            : "var(--text-h)",
                        borderRadius:
                          msg.role === "user"
                            ? "var(--radius-md) var(--radius-md) 4px var(--radius-md)"
                            : "var(--radius-md) var(--radius-md) var(--radius-md) 4px",
                        lineHeight: 1.6,
                        fontFamily: "var(--sans)",
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
                      }}
                    >
                      {msg.text}
                      {msg.itinerary && (
                        <div className="mt-3">
                          <ItineraryTimeline itinerary={msg.itinerary} />
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {loading && (
                  <div className="flex justify-start">
                    <div
                      className="px-4 py-3 flex gap-1.5 items-center"
                      style={{
                        background: "var(--bg-weather)",
                        borderRadius:
                          "var(--radius-md) var(--radius-md) var(--radius-md) 4px",
                      }}
                    >
                      <span className="typing-dot" />
                      <span className="typing-dot" />
                      <span className="typing-dot" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick suggestions chips */}
              <div className="px-6 py-2 flex flex-wrap gap-1.5" style={{ background: "var(--bg)" }}>
                {quickSuggestions.map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setInput(suggestion);
                      inputRef.current?.focus();
                    }}
                    className="text-xs px-2.5 py-1 rounded-full border transition-colors hover:border-teal-600 hover:text-teal-700 cursor-pointer"
                    style={{
                      borderColor: "var(--border)",
                      color: "var(--text)",
                      background: "transparent",
                    }}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>

              {/* Itinerary planner section */}
              <div className="px-6 py-4" style={{ borderTop: "1px solid var(--border)" }}>
                <p
                  className="flex items-center gap-2 text-sm font-medium mb-3"
                  style={{ color: "var(--accent)" }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path
                      d="M7 1l2 2.5L12 4.5 9.5 7l.5 3.5L7 9 3.5 10.5 4 7 1.5 4.5 4.5 3.5z"
                      stroke="currentColor"
                      strokeWidth="1"
                      fill="none"
                    />
                  </svg>
                  Plan my days
                </p>
                <div className="flex gap-2 mb-3">
                  <select
                    value={planDest}
                    onChange={(e) => setPlanDest(e.target.value)}
                    className="flex-1 px-3 py-2 text-sm rounded-lg border cursor-pointer"
                    style={{
                      borderColor: "var(--border)",
                      background: "var(--bg)",
                      color: "var(--text-h)",
                      fontFamily: "var(--sans)",
                      outline: "none",
                    }}
                    aria-label="Select destination"
                  >
                    {destinations.map((d) => (
                      <option key={d.id} value={d.name}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                  <select
                    value={planDays}
                    onChange={(e) => setPlanDays(e.target.value)}
                    className="px-3 py-2 text-sm rounded-lg border cursor-pointer"
                    style={{
                      borderColor: "var(--border)",
                      background: "var(--bg)",
                      color: "var(--text-h)",
                      fontFamily: "var(--sans)",
                      outline: "none",
                      width: 90,
                    }}
                    aria-label="Number of days"
                  >
                    {[1, 2, 3, 4, 5, 7, 10, 14].map((n) => (
                      <option key={n} value={n}>
                        {n} day{n > 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={handleBuildItinerary}
                  disabled={loading}
                  className="w-full py-2.5 text-sm font-medium rounded-lg text-white transition-all duration-200 hover:opacity-90 cursor-pointer disabled:cursor-not-allowed"
                  style={{
                    background: "var(--accent)",
                    border: "none",
                    fontFamily: "var(--sans)",
                    opacity: loading ? 0.6 : 1,
                  }}
                >
                  {loading ? "Generating itinerary..." : "Build itinerary"}
                </button>
              </div>

              {/* Chat input */}
              <form
                onSubmit={handleSend}
                className="flex items-center gap-2 px-6 py-4"
                style={{ borderTop: "1px solid var(--border)" }}
              >
                <label htmlFor="guide-input" className="sr-only">
                  Ask about a destination
                </label>
                <input
                  ref={inputRef}
                  id="guide-input"
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about a destination..."
                  disabled={loading}
                  className="flex-1 px-4 py-2.5 text-sm rounded-full border outline-none"
                  style={{
                    borderColor: "var(--border)",
                    background: "var(--bg-card)",
                    color: "var(--text-h)",
                    fontFamily: "var(--sans)",
                    opacity: loading ? 0.6 : 1,
                  }}
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="flex items-center justify-center w-9 h-9 rounded-full flex-shrink-0 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{
                    background: input.trim() ? "var(--accent)" : "var(--border)",
                    border: "none",
                  }}
                  aria-label="Send message"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M12 2L6 8M12 2L8.5 12 6.5 7.5 2 5.5z"
                      stroke="white"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
