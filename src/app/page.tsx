"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import PolaroidFan from "@/components/PolaroidFan";

const roles = ["engineer", "student", "builder", "leader", "musician"];

export default function Home() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="relative flex flex-col items-center justify-start overflow-hidden bg-black">
      {/* ── Hero section — full viewport ── */}
      <section className="relative flex h-screen w-full flex-col items-center justify-start">
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
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 3.5rem)", lineHeight: 1.15 }}
          >
            <span
              className="font-semibold"
              style={{ fontFamily: "var(--font-season-sans)" }}
            >
              I&apos;m Bosco,{" "}
              <span className="relative inline-block align-baseline">
                <span className="invisible">engineer</span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={roles[roleIndex]}
                    className="absolute left-0 top-0"
                    initial={{ opacity: 0, y: "0.3em" }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: "-0.3em" }}
                    transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    {roles[roleIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
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

        {/* ── Polaroid photos ── */}
        <div className="relative z-10 flex-1 w-full flex items-center justify-center">
          <PolaroidFan />
        </div>
      </section>

      {/* ── Projects section ── */}
      <Projects />

      {/* ── Bottom navbar ── */}
      <Navbar />
    </main>
  );
}
