"use client";

import { useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";

// The count is a function of the clock alone, so every visitor sees the same number
// at the same moment and a refresh never resets it: START_COUNT at START_TIME, then
// one more user every GROWTH_INTERVAL_MS (every 30 minutes is 48 a day).
const START_COUNT = 8400;
const START_TIME = Date.parse("2026-09-24T00:00:00Z");
const GROWTH_INTERVAL_MS = 30 * 60_000;

const countAt = (time: number) =>
  START_COUNT + Math.max(0, Math.floor((time - START_TIME) / GROWTH_INTERVAL_MS));

// Wakes React at each interval boundary, which is when the count goes up by one.
function subscribe(onTick: () => void) {
  let timeout: ReturnType<typeof setTimeout>;
  const schedule = () => {
    const elapsed = Date.now() - START_TIME;
    timeout = setTimeout(() => {
      onTick();
      schedule();
    }, GROWTH_INTERVAL_MS - (elapsed % GROWTH_INTERVAL_MS));
  };
  schedule();
  return () => clearTimeout(timeout);
}

const getCount = () => countAt(Date.now());
// The page is prerendered at build time, when any count would already be stale, so
// the server renders a placeholder and the real count takes over on hydration.
const getServerCount = () => null;

export default function ServeCount() {
  const count = useSyncExternalStore(subscribe, getCount, getServerCount);

  return (
    <span className="whitespace-nowrap">
      {count === null ? (
        // Invisible stand-in that holds the digits' width until hydration.
        <span className="invisible inline-block align-baseline">
          {START_COUNT.toLocaleString("en-US")}
        </span>
      ) : (
        // Only the digits animate on each tick; the label stays put.
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
        </AnimatePresence>
      )}{" "}
      users.
    </span>
  );
}
