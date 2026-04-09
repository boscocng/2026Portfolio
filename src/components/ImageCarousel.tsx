"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

interface ImageCarouselProps {
  images: { width: number; color?: string }[];
}

export default function ImageCarousel({ images }: ImageCarouselProps) {
  const [hovered, setHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Duplicate images for seamless loop
  const allImages = [...images, ...images];

  // Calculate total width of one set (image widths + gaps)
  const gap = 16;
  const totalWidth = images.reduce((sum, img) => sum + img.width + gap, 0);

  return (
    <div
      ref={containerRef}
      className="relative w-screen overflow-hidden"
      style={{ marginLeft: "calc(-50vw + 50%)" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        className="flex"
        style={{ gap: `${gap}px`, width: "max-content" }}
        animate={{ x: [0, -totalWidth] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: hovered ? 60 : 30,
            ease: "linear",
          },
        }}
      >
        {allImages.map((img, i) => (
          <div
            key={i}
            className="flex-shrink-0 rounded-lg overflow-hidden"
            style={{
              width: img.width,
              height: 420,
              backgroundColor: img.color || "#1a1a1a",
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}
