"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import DemoVideo, { type DemoVideoHandle } from "./DemoVideo";
import ImageCarousel, { type CarouselItem } from "./ImageCarousel";
import { useCardReveal } from "./useCardReveal";

interface ProjectCardProps {
  title: string;
  description: string;
  detailLeft: string;
  detailRight: string;
  tags: string[];
  link: string;
  images: CarouselItem[];
  /** When set, a Watch Demo button opens this video in a macOS-style window. */
  demoVideo?: { src: string; aspectRatio: number };
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

// Shared by the Visit Project, See Full Case and Watch Demo pills.
const ACTION_CLASS =
  "items-center gap-1.5 rounded-full border border-white/[0.06] px-3.5 py-1.5 transition-colors hover:bg-white/[0.15]";
const ACTION_STYLE = {
  fontFamily: "var(--font-season-sans)",
  fontSize: "12px",
  lineHeight: "15.6px",
  fontWeight: 600,
  color: "#FFFFFF",
  background: "#323332",
};

function WatchDemoButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex cursor-pointer ${ACTION_CLASS}`}
      style={ACTION_STYLE}
    >
      Watch Demo
      {/* h-5 matches the text-sm line box around the Visit Project arrow, so both pills are one height. */}
      <span className="flex h-5 items-center">
        <svg width="8" height="9" viewBox="0 0 8 9" aria-hidden="true">
          <path d="M0 0.5v8l7.5-4z" fill="currentColor" />
        </svg>
      </span>
    </button>
  );
}

export default function ProjectCard({
  title,
  description,
  detailLeft,
  detailRight,
  tags,
  link,
  images,
  demoVideo,
}: ProjectCardProps) {
  const demoRef = useRef<DemoVideoHandle>(null);
  const openDemo = () => demoRef.current?.open();
  const cardRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const carouselHeight = useCardReveal(cardRef, infoRef, carouselRef);

  return (
    <div ref={cardRef} className="w-full">
      {/* Info section */}
      <motion.div
        ref={infoRef}
        className="mx-auto max-w-[1400px] px-6 md:px-6 lg:px-8 pb-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ staggerChildren: 0.1 }}
      >
        {/* Tags row + See Full Case */}
        <motion.div
          className="flex items-center justify-between mb-6"
          variants={fadeUp}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/[0.06] px-3.5 py-1.5"
                style={{
                  fontFamily: "var(--font-season-sans)",
                  fontSize: "12px",
                  lineHeight: "15.6px",
                  color: "#FFFFFF",
                  background: "#323332",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="hidden sm:flex flex-shrink-0 items-center gap-2">
            {demoVideo && <WatchDemoButton onClick={openDemo} />}
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex ${ACTION_CLASS}`}
              style={ACTION_STYLE}
            >
              Visit Project
              <span className="text-sm">&#x2197;</span>
            </a>
          </div>
        </motion.div>

        {/* Title + Description + Detail columns */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,280px)_minmax(0,280px)] gap-6 lg:gap-10">
          {/* Left: Title + description flowing together */}
          <motion.div
            className="max-w-[360px]"
            variants={fadeUp}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <p
              style={{
                fontSize: "25px",
                lineHeight: "27.5px",
                letterSpacing: "0px",
                color: "#FFFFFF",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-season-sans)",
                  fontWeight: 600,
                }}
              >
                {title}
              </span>{" "}
              <span
                style={{
                  fontFamily: "var(--font-season-mix)",
                  fontWeight: 400,
                }}
              >
                {description}
              </span>
            </p>
          </motion.div>

          {/* Center: Detail paragraph */}
          <motion.p
            style={{
              fontFamily: "var(--font-season-sans)",
              fontWeight: 400,
              fontSize: "12px",
              lineHeight: "15.6px",
              letterSpacing: "0px",
              color: "#FFFFFF",
            }}
            variants={fadeUp}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {detailLeft}
          </motion.p>

          {/* Right: Detail paragraph */}
          <motion.p
            style={{
              fontFamily: "var(--font-season-sans)",
              fontWeight: 400,
              fontSize: "12px",
              lineHeight: "15.6px",
              letterSpacing: "0px",
              color: "#FFFFFF",
            }}
            variants={fadeUp}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {detailRight}
          </motion.p>
        </div>

        {/* Mobile: Watch Demo + See Full Case */}
        <div className="sm:hidden mt-6 flex items-center gap-2">
          {demoVideo && <WatchDemoButton onClick={openDemo} />}
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex ${ACTION_CLASS}`}
            style={ACTION_STYLE}
          >
            See Full Case
            <span className="text-sm">&#x2197;</span>
          </a>
        </div>
      </motion.div>

      {/*
        Opens as the card scrolls up and folds away once it has been passed. Held open by CSS
        under reduced motion and when printing, where the inline height would clip it.
      */}
      <motion.div
        className="overflow-hidden motion-reduce:h-auto! print:h-auto!"
        style={{ height: carouselHeight }}
      >
        <div ref={carouselRef}>
          {/* Image carousel — aligned with content */}
          <motion.div
            className="mx-auto max-w-[1400px] px-6 md:px-6 lg:px-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <ImageCarousel images={images} />
          </motion.div>
        </div>
      </motion.div>

      {demoVideo && (
        <DemoVideo
          ref={demoRef}
          src={demoVideo.src}
          aspectRatio={demoVideo.aspectRatio}
          title={`${title.replace(/:$/, "")} Demo`}
        />
      )}
    </div>
  );
}
