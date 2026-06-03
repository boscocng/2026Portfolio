"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const START_COUNT = 8400;
const STORAGE_KEY = "serve-count";

const randInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

// Highest count this browser has ever shown. Persisted so reloads, client-side
// navigation, and hot-reloads resume climbing instead of snapping back down to
// START_COUNT (which is what made the number appear to go *down*).
const readHighWater = () => {
  if (typeof window === "undefined") return START_COUNT;
  const stored = Number(window.localStorage.getItem(STORAGE_KEY));
  return Number.isFinite(stored) && stored > START_COUNT ? stored : START_COUNT;
};

export default function ServeCount() {
  // Seed with the constant so SSR and the first client render agree (no
  // hydration mismatch); we snap up to the stored high-water mark on mount.
  const [count, setCount] = useState(START_COUNT);

  // ── Live counter: actually climbs 1–5 times every 1–10 minutes ──
  useEffect(() => {
    // The counter only ever climbs: every change adds, and we persist the new
    // high-water mark so it never resets downward on the next mount.
    const climb = (delta: number) =>
      setCount((c) => {
        const next = c + delta;
        window.localStorage.setItem(STORAGE_KEY, String(next));
        return next;
      });

    // Catch up to the highest value this browser has ever seen.
    setCount((c) => Math.max(c, readHighWater()));

    const timeouts: ReturnType<typeof setTimeout>[] = [];

    const scheduleWindow = () => {
      const windowMs = randInt(1, 10) * 60_000; // a random 1–10 minute window
      const bumps = randInt(1, 5); // with 1–5 increments inside it

      // fire each increment at a random moment within the window
      for (let i = 0; i < bumps; i++) {
        timeouts.push(setTimeout(() => climb(1), randInt(0, windowMs)));
      }
      // when the window closes, plan the next one
      timeouts.push(setTimeout(scheduleWindow, windowMs));
    };

    scheduleWindow();
    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <span className="whitespace-nowrap">
      {/* only the digits animate on each tick; the label stays put */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={count}
          className="inline-block align-baseline"
          initial={{ opacity: 0, y: "0.3em" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "-0.3em" }}
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {count.toLocaleString("en-US")}
        </motion.span>
      </AnimatePresence>{" "}
      users.
    </span>
  );
}
