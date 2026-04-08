"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";

export default function Home() {

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
          style={{ fontSize: "clamp(1.6rem, 2.9vw, 2.9rem)", lineHeight: 1.15 }}
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

{/* ── Bottom navbar ── */}
      <Navbar />
    </main>
  );
}
