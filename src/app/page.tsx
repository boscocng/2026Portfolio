"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import DevDraggable from "@/components/DevDraggable";

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

      {/* ── Floating images — clustered in center ── */}
      <div className="absolute inset-0 z-0">
        {/* Pink Strat */}
        <DevDraggable name="pinkstrat" initialLeft="-8%" initialTop="16%" initialWidth="110vw">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [0, -14, 0],
              rotate: [-12, -10, -13, -12],
            }}
            transition={{
              opacity: { duration: 1, delay: 0.4 },
              scale: { duration: 1, delay: 0.4 },
              y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 7, repeat: Infinity, ease: "easeInOut" },
            }}
          >
            <Image
              src="/images/pinkstrat.png"
              alt="Pink Stratocaster"
              width={1920}
              height={1920}
              priority
              className="pointer-events-none select-none w-full"
              style={{ height: "auto" }}
            />
          </motion.div>
        </DevDraggable>

        {/* Rose */}
        <DevDraggable name="rose" initialLeft="50%" initialTop="54%" initialWidth="13vw" zIndex={1}>
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [0, -10, 0],
              rotate: [8, 10, 6, 8],
            }}
            transition={{
              opacity: { duration: 1, delay: 0.6 },
              scale: { duration: 1, delay: 0.6 },
              y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 8, repeat: Infinity, ease: "easeInOut" },
            }}
          >
            <Image
              src="/images/rose.png"
              alt="Rose"
              width={800}
              height={800}
              priority
              className="pointer-events-none select-none w-full"
              style={{ height: "auto" }}
            />
          </motion.div>
        </DevDraggable>
      </div>

      {/* ── Bottom navbar ── */}
      <Navbar />
    </main>
  );
}
