"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export interface CarouselItem {
  width: number;
  /** Placeholder fill, shown when the tile has no media yet. */
  color?: string;
  /** A still image, and the poster frame when the tile also has a video. */
  src?: string;
  /** A muted clip that loops in place of the still once it can play. */
  video?: string;
  alt?: string;
}

interface ImageCarouselProps {
  images: CarouselItem[];
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
      className="relative overflow-hidden"
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
            duration: hovered ? 120 : 60,
            ease: "linear",
          },
        }}
      >
        {allImages.map((img, i) => (
          <div
            key={i}
            // The second copy only exists to make the loop seamless, so screen readers skip it.
            aria-hidden={i >= images.length || undefined}
            className="relative flex-shrink-0 rounded-lg overflow-hidden"
            style={{
              width: img.width,
              height: 350,
              backgroundColor: img.color || "#1a1a1a",
            }}
          >
            {img.video ? (
              <video
                // In Low Power Mode iOS refuses autoplay and draws its own play button; the poster shows instead.
                className="h-full w-full object-cover [&::-webkit-media-controls-start-playback-button]:hidden!"
                src={img.video}
                poster={img.src}
                aria-label={img.alt}
                autoPlay
                muted
                loop
                playsInline
              />
            ) : img.src ? (
              <Image
                src={img.src}
                alt={img.alt ?? ""}
                fill
                sizes={`${img.width}px`}
                className="object-cover"
                draggable={false}
              />
            ) : null}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
