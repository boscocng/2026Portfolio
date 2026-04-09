"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useSpring,
  useMotionValue,
  useTransform,
} from "framer-motion";
import Image from "next/image";

const polaroids = [
  { src: "/images/pic2.jpg", alt: "Bosco 2", rotation: -8, x: -220, delay: 0, parallax: 8 },
  { src: "/images/pic3.jpg", alt: "Bosco 3", rotation: 8, x: 220, delay: 0.1, parallax: 10 },
  { src: "/images/pic1.jpg", alt: "Bosco 1", rotation: 0, x: 0, delay: 0.05, parallax: 15 },
];

const floatConfigs = [
  { y: [0, -8, 0, 6, 0], rotate: [-8, -9.5, -6.5, -8.5, -8], duration: 5 },
  { y: [0, 6, 0, -7, 0], rotate: [8, 9.5, 6.5, 8.5, 8], duration: 5.5 },
  { y: [0, -6, 0, 5, 0], rotate: [0, 1.5, -1, 0.5, 0], duration: 6 },
];

function Polaroid({
  src,
  alt,
  rotation,
  xOffset,
  delay,
  parallaxFactor,
  floatConfig,
  zIndex,
  smoothX,
  smoothY,
}: {
  src: string;
  alt: string;
  rotation: number;
  xOffset: number;
  delay: number;
  parallaxFactor: number;
  floatConfig: (typeof floatConfigs)[0];
  zIndex: number;
  smoothX: ReturnType<typeof useSpring>;
  smoothY: ReturnType<typeof useSpring>;
}) {
  const px = useTransform(smoothX, (v) => v * parallaxFactor);
  const py = useTransform(smoothY, (v) => v * parallaxFactor);

  return (
    <motion.div
      className="absolute"
      style={{ zIndex }}
      initial={{ x: 0, y: 40, rotate: 0, opacity: 0, scale: 0.9 }}
      animate={{ x: xOffset, y: 0, rotate: rotation, opacity: 1, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 80,
        damping: 16,
        delay: 0.8 + delay,
      }}
    >
      <motion.div style={{ x: px, y: py }}>
        <motion.div
          animate={{ y: floatConfig.y, rotate: floatConfig.rotate }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: floatConfig.duration,
            ease: "easeInOut",
          }}
        >
          <div
            className="rounded-sm bg-white shadow-[0_8px_40px_rgba(0,0,0,0.5)]"
            style={{ padding: "10px 10px 36px 10px" }}
          >
            <div className="relative w-[160px] h-[200px] md:w-[220px] md:h-[270px] lg:w-[240px] lg:h-[300px] overflow-hidden rounded-sm">
              <Image
                src={src}
                alt={alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 160px, (max-width: 1024px) 220px, 240px"
                priority
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function PolaroidFan() {
  const [mounted, setMounted] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 2);
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 2);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  if (!mounted) return null;

  return (
    <div className="relative flex items-center justify-center w-full h-full">
      {polaroids.map((p, i) => (
        <Polaroid
          key={i}
          src={p.src}
          alt={p.alt}
          rotation={p.rotation}
          xOffset={p.x}
          delay={p.delay}
          parallaxFactor={p.parallax}
          floatConfig={floatConfigs[i]}
          zIndex={i === 2 ? 30 : i === 1 ? 20 : 10}
          smoothX={smoothX}
          smoothY={smoothY}
        />
      ))}
    </div>
  );
}
