"use client";

import { useEffect, useSyncExternalStore } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";

const MINUTE_MS = 60_000;

// Count-up timing follows CountUp.js, the library most sites use for this: start at zero
// and spend two seconds on an exponential ease-out, so the digits race up and then
// visibly settle on the live number.
const COUNT_UP_SECONDS = 2;
const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - 2 ** (-10 * t));

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

const format = (value: number) => Math.round(value).toLocaleString("en-US");

interface LiveCountProps {
  /** Maps a timestamp to the count; see liveCounts.ts. */
  countAt: (time: number) => number;
  /** Holds the count-up until the number is on screen; by default it starts on mount. */
  play?: boolean;
}

export default function LiveCount({ countAt, play = true }: LiveCountProps) {
  const count = useSyncExternalStore(
    subscribe,
    () => countAt(Date.now()),
    getServerCount,
  );
  const reduceMotion = useReducedMotion();
  const shown = useMotionValue(0);
  const text = useTransform(shown, format);

  // Counts up from zero once `play` turns on, then eases to each new value as the live
  // count ticks. Reduced motion skips straight to the number.
  useEffect(() => {
    if (count === null || !play) return;
    if (reduceMotion) {
      shown.set(count);
      return;
    }
    const controls = animate(shown, count, {
      duration: COUNT_UP_SECONDS,
      ease: easeOutExpo,
    });
    return () => controls.stop();
  }, [count, play, reduceMotion, shown]);

  // Tabular digits give every number of the count the same width, and an invisible copy
  // of the final number reserves that width, so the words around the count never shift.
  // Before hydration the copy holds the opening value (every count starts after 1970).
  return (
    <span className="relative inline-block tabular-nums">
      <span className="invisible">{format(count ?? countAt(0))}</span>
      {count !== null && (
        <motion.span className="absolute inset-0 text-right">{text}</motion.span>
      )}
    </span>
  );
}
