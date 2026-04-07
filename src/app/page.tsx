"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import FloatingObject from "@/components/FloatingObject";
import Navbar from "@/components/Navbar";

/** Floating 3D placeholder objects — swap these for real assets later */
const floatingObjects = [
  {
    color: "linear-gradient(135deg, #ec4899, #f472b6)",
    size: 160,
    x: 8,
    y: 42,
    parallaxFactor: 40,
    delay: 0,
    borderRadius: "50%",
    emoji: "🎲",
  },
  {
    color: "linear-gradient(135deg, #a855f7, #c084fc)",
    size: 120,
    x: 28,
    y: 55,
    parallaxFactor: 25,
    delay: 0.3,
    borderRadius: "30%",
    emoji: "🪑",
  },
  {
    color: "linear-gradient(135deg, #22c55e, #86efac)",
    size: 180,
    x: 60,
    y: 48,
    parallaxFactor: 35,
    delay: 0.15,
    borderRadius: "40%",
    emoji: "🥒",
  },
  {
    color: "linear-gradient(135deg, #f59e0b, #fcd34d)",
    size: 100,
    x: 82,
    y: 38,
    parallaxFactor: 50,
    delay: 0.45,
    borderRadius: "50%",
    emoji: "🏀",
    hideOnMobile: true,
  },
  {
    color: "linear-gradient(135deg, #3b82f6, #93c5fd)",
    size: 90,
    x: 45,
    y: 35,
    parallaxFactor: 30,
    delay: 0.6,
    borderRadius: "50%",
    emoji: "💎",
    hideOnMobile: true,
  },
];

export default function Home() {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-start overflow-hidden bg-black">
      {/* Subtle radial glow behind the scene */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,rgba(120,80,200,0.08),transparent)]" />

      {/* ── Hero tagline ── */}
      <motion.div
        className="relative z-10 mt-[8vh] flex flex-col items-center px-6 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <h1
          className="whitespace-nowrap text-white"
          style={{ fontSize: "clamp(1.8rem, 3.2vw, 3.2rem)", lineHeight: 1.15 }}
        >
          <span
            className="font-semibold"
            style={{ fontFamily: "var(--font-season-sans)" }}
          >
            I&apos;m Bosco, a software engineer
          </span>
          <br />
          <span style={{ fontFamily: "var(--font-season-mix)" }}>
            who turns ideas into products that
          </span>
          <br />
          <span style={{ fontFamily: "var(--font-season-mix)" }}>
            serve thousands.
          </span>
        </h1>
      </motion.div>

      {/* ── Floating placeholder objects ── */}
      <div className="absolute inset-0 z-0">
        {floatingObjects.map((obj, i) => (
          <FloatingObject
            key={i}
            color={obj.color}
            size={obj.size}
            x={obj.x}
            y={obj.y}
            parallaxFactor={obj.parallaxFactor}
            mouseX={mousePos.x}
            mouseY={mousePos.y}
            delay={obj.delay}
            borderRadius={obj.borderRadius}
            emoji={obj.emoji}
            hideOnMobile={obj.hideOnMobile}
          />
        ))}
      </div>

      {/* ── Bottom navbar ── */}
      <Navbar />
    </main>
  );
}
