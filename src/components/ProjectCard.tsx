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
        className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-16 pb-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ staggerChildren: 0.1 }}
      >
        {/* Tags row + See Full Case */}
        <motion.div
          className="flex items-start justify-between mb-6"
          variants={fadeUp}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white/[0.1] border border-white/[0.08] px-3.5 py-1.5 text-xs text-white"
                style={{ fontFamily: "var(--font-season-sans)" }}
              >
                {tag}
              </span>
            ))}
          </div>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex flex-shrink-0 items-center gap-1.5 rounded-full border border-white/20 px-4 py-2 text-xs text-white transition-colors hover:bg-white/[0.08]"
            style={{ fontFamily: "var(--font-season-sans)" }}
          >
            See Full Case
            <span className="text-sm">&#x2197;</span>
          </a>
        </motion.div>

        {/* Title + Description + Detail columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10">
          {/* Left: Title + short description */}
          <motion.div
            className="lg:col-span-1"
            variants={fadeUp}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h3
              className="text-white text-[1.5rem] md:text-[1.75rem] leading-[1.2] mb-3"
              style={{ fontFamily: "var(--font-season-sans)", fontWeight: 600 }}
            >
              {title}
            </h3>
            <p
              className="text-white/70 text-[0.95rem] leading-[1.6]"
              style={{ fontFamily: "var(--font-season-mix)" }}
            >
              {description}
            </p>
          </motion.div>

          {/* Center: Detail paragraph */}
          <motion.p
            className="text-white/50 text-[0.88rem] leading-[1.7]"
            style={{ fontFamily: "var(--font-season-mix)" }}
            variants={fadeUp}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {detailLeft}
          </motion.p>

          {/* Right: Detail paragraph */}
          <motion.p
            className="text-white/50 text-[0.88rem] leading-[1.7]"
            style={{ fontFamily: "var(--font-season-mix)" }}
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
          className="sm:hidden mt-6 inline-flex items-center gap-1.5 rounded-full border border-white/20 px-4 py-2 text-xs text-white transition-colors hover:bg-white/[0.08]"
          style={{ fontFamily: "var(--font-season-sans)" }}
        >
          See Full Case
          <span className="text-sm">&#x2197;</span>
        </a>
      </motion.div>

      {/* Image carousel — full bleed */}
      <motion.div
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
