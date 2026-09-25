"use client";

import { useRef, type RefObject } from "react";
import {
  useAnimationFrame,
  useReducedMotion,
  useSpring,
  type MotionValue,
} from "framer-motion";

// Scroll positions as fractions of the viewport height, measured from poch.studio's project cards.
// A card starts opening when its top reaches 88% of the way down the window and is fully open by 54%.
const OPEN_START = 0.88;
const OPEN_END = 0.54;
// It folds away as its text block leaves the top: starting when the block's bottom edge is 15% down
// the window, finished as that edge goes off screen. Measured from the text block rather than the open
// card, so a card is always shut by the time the next section reaches the top, and nothing that lands
// there (a nav link, a reload, a #hash) ever finds it half open.
const CLOSE_SPAN = 0.15;

// Fitted to poch's own easing: a jump settles in about 0.9s with no overshoot. The rest thresholds stop
// the animation within half a pixel instead of writing sub-pixel heights for another second.
const SPRING = { stiffness: 26, damping: 9.5, restDelta: 0.5, restSpeed: 5 };

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/**
 * The height of a project card's carousel: 0 until the card scrolls up, the carousel's full height
 * once it has, and 0 again after the card has been scrolled past.
 *
 * It starts at 0, which is also what the server renders, so hydrating never moves the page. Only the
 * card's top and its text block feed the value, never the carousel's own height, so the animation
 * cannot feed back into what drives it. Positions are read every frame because the card above opening
 * or closing moves this one without the page scrolling.
 */
export function useCardReveal(
  card: RefObject<HTMLElement | null>,
  info: RefObject<HTMLElement | null>,
  carousel: RefObject<HTMLElement | null>,
): MotionValue<number> {
  const height = useSpring(0, SPRING);
  const reduceMotion = useReducedMotion();
  const target = useRef<number | null>(null);

  useAnimationFrame(() => {
    // With reduced motion the carousel is held open by CSS, so there is nothing to drive.
    if (reduceMotion || !card.current || !info.current || !carousel.current) return;
    const vh = window.innerHeight;
    const top = card.current.getBoundingClientRect().top;
    const textBottom = top + info.current.offsetHeight;
    const opening = clamp01((OPEN_START * vh - top) / ((OPEN_START - OPEN_END) * vh));
    const closing = clamp01((CLOSE_SPAN * vh - textBottom) / (CLOSE_SPAN * vh));
    const next = Math.round(carousel.current.offsetHeight * opening * (1 - closing));

    // Placed, not animated, the first time, so a card already in view on load does not slide open.
    if (target.current === null) height.jump(next);
    else if (next !== target.current) height.set(next);
    target.current = next;
  });

  return height;
}
