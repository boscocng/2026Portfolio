"use client";

import { useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MINUTE_MS = 60_000;

// Wakes React at each minute boundary. Every live count changes only on a whole minute,
// and useSyncExternalStore re-renders only when the number actually moved.
function subscribe(onTick: () => void) {
  let timeout: ReturnType<typeof setTimeout>;
  const schedule = () => {
    timeout = setTimeout(() => {
      onTick();
      schedule();
    }, MINUTE_MS - (Date.now() % MINUTE_MS));
  };
  schedule();
  return () => clearTimeout(timeout);
}

// The page is prerendered at build time, when any count would already be stale, so the
// server renders a placeholder and the real count takes over on hydration.
const getServerCount = () => null;

interface LiveCountProps {
  /** Maps a timestamp to the count; see liveCounts.ts. */
  countAt: (time: number) => number;
}

export default function LiveCount({ countAt }: LiveCountProps) {
  const count = useSyncExternalStore(
    subscribe,
    () => countAt(Date.now()),
    getServerCount,
  );

  if (count === null) {
    // Invisible stand-in that holds the digits' width until hydration. Every count
    // starts after 1970, so its value at time 0 is its opening value.
    return (
      <span className="invisible inline-block align-baseline">
        {countAt(0).toLocaleString("en-US")}
      </span>
    );
  }

  // Only the digits animate on each tick; the label around them stays put.
  return (
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
  );
}
