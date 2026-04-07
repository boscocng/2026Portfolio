"use client";

import { motion } from "framer-motion";

interface FloatingObjectProps {
  /** CSS color or gradient for the placeholder */
  color: string;
  /** Width/height in px */
  size: number;
  /** Absolute position from left (%) */
  x: number;
  /** Absolute position from top (%) */
  y: number;
  /** Parallax strength — how much the object reacts to mouse (px) */
  parallaxFactor: number;
  /** Mouse position as fraction 0-1 */
  mouseX: number;
  mouseY: number;
  /** Floating animation delay (s) */
  delay?: number;
  /** Optional border-radius override (default fully round) */
  borderRadius?: string;
  /** Optional emoji to display inside */
  emoji?: string;
  /** Hide on mobile */
  hideOnMobile?: boolean;
}

export default function FloatingObject({
  color,
  size,
  x,
  y,
  parallaxFactor,
  mouseX,
  mouseY,
  delay = 0,
  borderRadius = "50%",
  emoji,
  hideOnMobile = false,
}: FloatingObjectProps) {
  // Convert mouse fraction (0-1) to offset from center (-0.5 to 0.5), then multiply by factor
  const offsetX = (mouseX - 0.5) * parallaxFactor;
  const offsetY = (mouseY - 0.5) * parallaxFactor;

  return (
    <motion.div
      className={`absolute pointer-events-none select-none ${hideOnMobile ? "hidden md:block" : ""}`}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
      }}
      // Entrance animation
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 1,
        delay: 0.6 + delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {/* Parallax wrapper — smoothly follows mouse */}
      <motion.div
        animate={{ x: offsetX, y: offsetY }}
        transition={{ type: "tween", duration: 0.6, ease: "easeOut" }}
        className="w-full h-full"
      >
        {/* Bobbing animation */}
        <motion.div
          animate={{
            y: [0, -14, 0],
            rotate: [0, 3, -2, 0],
          }}
          transition={{
            duration: 5 + delay * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: delay,
          }}
          className="w-full h-full flex items-center justify-center"
          style={{
            background: color,
            borderRadius,
            boxShadow: `0 8px 32px ${color}44`,
          }}
        >
          {emoji && (
            <span
              className="select-none"
              style={{ fontSize: size * 0.45 }}
            >
              {emoji}
            </span>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
