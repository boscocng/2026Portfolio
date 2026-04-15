"use client";

import { motion } from "framer-motion";
import ImageCarousel from "./ImageCarousel";

interface ProjectCardProps {
  title: string;
  description: string;
  detailLeft: string;
  detailRight: string;
  tags: string[];
  link: string;
  images: { width: number; color?: string }[];
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function ProjectCard({
  title,
  description,
  detailLeft,
  detailRight,
  tags,
  link,
  images,
}: ProjectCardProps) {
  return (
    <div className="w-full">
      {/* Info section */}
      <motion.div
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
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex flex-shrink-0 items-center gap-1.5 rounded-full border border-white/[0.06] px-3.5 py-1.5 transition-colors hover:bg-white/[0.15]"
            style={{
              fontFamily: "var(--font-season-sans)",
              fontSize: "12px",
              lineHeight: "15.6px",
              fontWeight: 600,
              color: "#FFFFFF",
              background: "#323332",
            }}
          >
            Visit Project
            <span className="text-sm">&#x2197;</span>
          </a>
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

        {/* Mobile: See Full Case */}
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="sm:hidden mt-6 inline-flex items-center gap-1.5 rounded-full border border-white/[0.06] px-3.5 py-1.5 transition-colors hover:bg-white/[0.15]"
          style={{
            fontFamily: "var(--font-season-sans)",
            fontSize: "12px",
            lineHeight: "15.6px",
            fontWeight: 600,
            color: "#FFFFFF",
            background: "#323332",
          }}
        >
          See Full Case
          <span className="text-sm">&#x2197;</span>
        </a>
      </motion.div>

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
  );
}
