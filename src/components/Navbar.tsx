"use client";

import { animate, motion } from "framer-motion";

const navLinks: { label: string; href: string; external?: boolean }[] = [
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Resume", href: "/Bosco_Ng_Resume.pdf", external: true },
];

// Track the in-flight scroll so rapid clicks hand off instead of fighting.
let scrollControls: ReturnType<typeof animate> | null = null;
let settleFrame = 0;

// Settling ends once the landing spot has held still this many frames, or after the cap.
const SETTLE_STILL_FRAMES = 20;
const SETTLE_MAX_FRAMES = 150;
const USER_SCROLL_EVENTS = ["wheel", "touchstart", "keydown", "pointerdown"] as const;

/** Where a link lands: its target's live position, capped at the furthest reachable scroll. */
function landingFor(href: string): number {
  const top =
    href === "#"
      ? 0
      : (document.querySelector(href)?.getBoundingClientRect().top ?? 0) +
        window.scrollY;
  // The footer's top sits below the furthest reachable scroll position. Aim for that
  // limit instead, or the spring hits the page bottom at full speed and stops dead.
  const maxY = document.documentElement.scrollHeight - window.innerHeight;
  return Math.min(top, maxY);
}

/**
 * Holds the landing spot while the project cards finish opening or closing, because their height
 * changes move everything below them after the scroll has arrived. Any scroll by the visitor ends it.
 */
function settle(goal: () => number) {
  let still = 0;
  let frames = 0;
  const stop = () => {
    cancelAnimationFrame(settleFrame);
    USER_SCROLL_EVENTS.forEach((type) => window.removeEventListener(type, stop));
  };
  USER_SCROLL_EVENTS.forEach((type) =>
    window.addEventListener(type, stop, { passive: true }),
  );
  const step = () => {
    const y = goal();
    if (Math.abs(y - window.scrollY) >= 1) {
      window.scrollTo(0, y);
      still = 0;
    } else {
      still++;
    }
    if (still < SETTLE_STILL_FRAMES && ++frames < SETTLE_MAX_FRAMES) {
      settleFrame = requestAnimationFrame(step);
    } else {
      stop();
    }
  };
  settleFrame = requestAnimationFrame(step);
}

function smoothScrollTo(goal: () => number) {
  scrollControls?.stop();
  cancelAnimationFrame(settleFrame);
  const startY = window.scrollY;
  const firstGoal = goal();

  // Honor reduced-motion preferences with an instant jump.
  if (
    Math.abs(firstGoal - startY) < 1 ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    window.scrollTo(0, firstGoal);
    settle(goal);
    return;
  }

  // A spring gives the motion real momentum: it accelerates from rest, peaks
  // mid-flight (faster the farther it travels), then glides to a soft stop.
  scrollControls = animate(startY, firstGoal, {
    type: "spring",
    stiffness: 120,
    damping: 18,
    mass: 1,
    restDelta: 0.5,
    // Project cards open and close as the page passes them, moving everything below, so each
    // frame re-aims the same share of the journey at wherever the target is now.
    onUpdate: (y) => {
      const progress = (y - startY) / (firstGoal - startY);
      window.scrollTo(0, y + (goal() - firstGoal) * progress);
    },
    onComplete: () => settle(goal),
  });
}

function handleNavClick(
  e: React.MouseEvent<HTMLAnchorElement>,
  href: string,
) {
  // Only intercept in-page anchor links; let real links (e.g. the résumé) behave normally.
  if (!href.startsWith("#")) return;
  e.preventDefault();
  smoothScrollTo(() => landingFor(href));
}

export default function Navbar() {
  return (
    <motion.nav
      className="fixed bottom-16 left-1/2 z-50 -translate-x-1/2 scale-100 origin-bottom"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="flex items-center gap-0">
        {/* Logo pill */}
        <a
          href="#"
          onClick={(e) => handleNavClick(e, "#")}
          className="rounded-full border border-white/10 bg-white/[0.08] px-4.5 py-3.5 text-xl leading-none text-white backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,0,0,0.5)] transition-colors hover:bg-white/[0.12]"
          style={{ fontFamily: "var(--font-permanent-marker)", letterSpacing: "0.02em", WebkitTextStroke: "0.5px white" }}
        >
          Bosco
        </a>

        {/* Center links pill */}
        <div className="flex items-center rounded-full border border-white/10 bg-white/[0.08] px-2 backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="px-2.5 py-3 text-white transition-colors hover:text-white/70"
              style={{ fontFamily: "var(--font-season-sans)", fontSize: "12px", letterSpacing: "-0.1px" }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA pill */}
        <a
          href="#contact"
          onClick={(e) => handleNavClick(e, "#contact")}
          className="rounded-full bg-amber-100 px-3.5 py-3 text-sm text-zinc-900 transition-all hover:bg-amber-200 hover:scale-105"
          style={{ fontFamily: "var(--font-lacquer)" }}
        >
          Contact
        </a>
      </div>
    </motion.nav>
  );
}
