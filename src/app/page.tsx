"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import PolaroidFan from "@/components/PolaroidFan";
import Footer from "@/components/Footer";
import ServeCount from "@/components/ServeCount";

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
      {/* overflow-visible so the polaroids' hover glow + corner badge are never clipped */}
      {/* On phones the hero fills the height the browser's toolbars leave visible (svh) and keeps the
          floating nav's strip clear, so the polaroids centre between the headline and the nav. */}
      <section className="relative flex h-screen w-full flex-col items-center justify-start overflow-visible max-sm:h-auto max-sm:min-h-svh max-sm:pb-27">
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
            // Phones take poch.studio's mobile headline: larger, tighter type over five short lines,
            // because the long middle line cannot fit a phone's width at a readable size.
            className="whitespace-nowrap text-[length:clamp(1.8rem,3.5vw,3.5rem)] leading-[1.15] text-white max-sm:text-[length:min(10.5vw,2.5rem)] max-sm:leading-none"
          >
            <span
              className="font-semibold"
              style={{ fontFamily: "var(--font-season-sans)" }}
            >
              I&apos;m Bosco,{" "}
              {/* On phones the slot becomes a block, giving the word a line of its own (so the break
                  after it is dropped there). The word then spans the slot and is centred, where on
                  desktop it hugs the slot's left edge. */}
              <span className="relative inline-block align-baseline max-sm:block">
                <span className="invisible">engineer</span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={roles[roleIndex]}
                    className="absolute left-0 top-0 max-sm:right-0"
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
            <br className="max-sm:hidden" />
            {/* The newline is an ordinary space under the headline's nowrap, and a line break on
                phones, where this span switches to pre-line. */}
            <span
              className="max-sm:whitespace-pre-line"
              style={{ fontFamily: "var(--font-season-mix)" }}
            >
              {"who turns ideas\ninto products that"}
            </span>
            <br />
            <span style={{ fontFamily: "var(--font-season-mix)" }}>
              serve <ServeCount />
            </span>
          </h1>
        </motion.div>

        {/* ── Polaroid photos ── */}
        {/* The phone minimum is the fan's full swing, so on a short screen the hero scrolls instead
            of the polaroids riding up over the headline. */}
        <div className="relative z-10 flex-1 w-full flex items-center justify-center max-sm:min-h-68">
          <PolaroidFan />
        </div>
      </section>

      {/* ── Projects section ── */}
      <Projects />

      {/* ── Experience section ── */}
      <Experience />

      {/* ── Footer ── */}
      <Footer />

      {/* ── Bottom navbar ── */}
      <Navbar />
    </main>
  );
}
