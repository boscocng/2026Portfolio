"use client";

import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";

const projects = [
  {
    title: "Avant-Garde Territory:",
    description:
      "visual language for telling the story of Ural's Avant-garde architecture in a modern way",
    detailLeft:
      "Avant-Garde Territory is a cultural project dedicated to preserving and promoting the Ural region's constructivist architecture. The project aims to reimagine the perception of the Avant-garde movement, giving it a modern look and turning this cultural legacy into a key tourist attraction.",
    detailRight:
      "We created a flexible identity that merges Avant-garde principles with a modern approach, combining bold colors, geometric forms, and neo-grotesque typography. At its center stands the region's iconic constructivist building, reimagined as a graphic symbol of cultural continuity.",
    tags: ["Full-Stack", "AI/ML", "Leadership"],
    link: "#",
    images: [
      { width: 320, color: "#2a2a2a" },
      { width: 380, color: "#1e1e1e" },
      { width: 400, color: "#252525" },
      { width: 340, color: "#222" },
      { width: 360, color: "#2c2c2c" },
    ],
  },
  {
    title: "Neural Canvas:",
    description:
      "an AI-powered creative tool that transforms rough sketches into polished illustrations in real-time",
    detailLeft:
      "Neural Canvas bridges the gap between ideation and execution for designers and artists. Using a custom-trained diffusion model, it interprets hand-drawn strokes and converts them into production-ready vector artwork while preserving the creator's original intent and style.",
    detailRight:
      "Built with a React frontend and Python ML backend, the system processes strokes in under 200ms. The architecture uses WebSocket streaming for real-time preview, with a plugin system that integrates directly into Figma and Adobe Illustrator workflows.",
    tags: ["Machine Learning", "React", "Python"],
    link: "#",
    images: [
      { width: 360, color: "#1f1f2e" },
      { width: 420, color: "#2a1f2e" },
      { width: 300, color: "#1e2a2e" },
      { width: 380, color: "#2e2a1f" },
      { width: 340, color: "#1f2e2a" },
    ],
  },
  {
    title: "Pulse Analytics:",
    description:
      "a real-time dashboard platform for monitoring distributed systems at scale",
    detailLeft:
      "Pulse Analytics was built to replace fragmented monitoring across a fleet of 200+ microservices. It aggregates logs, metrics, and traces into a unified timeline view, letting engineering teams diagnose incidents in seconds instead of minutes.",
    detailRight:
      "The platform handles 50k events/sec through a Kafka-backed ingestion pipeline with ClickHouse for sub-second queries. The frontend uses Next.js with WebGL-powered visualizations that render millions of data points without jank.",
    tags: ["TypeScript", "Go", "Infrastructure"],
    link: "#",
    images: [
      { width: 400, color: "#1e1e2a" },
      { width: 340, color: "#2a2a1e" },
      { width: 380, color: "#1e2a1e" },
      { width: 320, color: "#2a1e2a" },
      { width: 360, color: "#222a2a" },
    ],
  },
];

export default function Projects() {
  return (
    <section id="projects" className="relative w-full bg-black pt-24 pb-16">
      {/* Section header */}
      <motion.div
        className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-16 mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <h2
          className="text-center text-white text-base md:text-lg tracking-[0.25em] uppercase mb-10"
          style={{ fontFamily: "var(--font-lacquer)" }}
        >
          Projects
        </h2>
        <div className="h-px w-full bg-white/10" />
      </motion.div>

      {/* Project cards */}
      <div className="flex flex-col">
        {projects.map((project, i) => (
          <div key={i}>
            <div className="pt-10 pb-14">
              <ProjectCard {...project} />
            </div>
            {i < projects.length - 1 && (
              <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-16">
                <div className="h-px w-full bg-white/10" />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
