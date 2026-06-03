"use client";

import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";

const projects = [
  {
    title: "Merch Store:",
    description:
      "a custom e-commerce platform for Queen's University's Computing Students' Association",
    detailLeft:
      "Merch Store is a full-stack e-commerce platform I led our Tech Team to build from scratch so Queen's Computing students can browse, buy, and pick up club merch. It replaces a generic third-party storefront with purpose-built infrastructure.",
    detailRight:
      "The platform runs on Next.js and Supabase with Stripe checkout, live inventory sync, and automated transactional emails. A campus pickup slot system and per-variant admin stock controls make merch season a repeatable process.",
    tags: ["Full-Stack", "AI/ML", "Leadership"],
    link: "https://merch.compsa.ca/",
    images: [
      { width: 320, color: "#2a2a2a" },
      { width: 380, color: "#1e1e1e" },
      { width: 400, color: "#252525" },
      { width: 340, color: "#222" },
      { width: 360, color: "#2c2c2c" },
    ],
  },
  {
    title: "TubeWatcher:",
    description:
      "a SaaS platform that places strategic comments on YouTube videos to influence purchase decisions",
    detailLeft:
      "TubeWatcher is a full-stack SaaS platform I built that helps brands engage in the comment sections of YouTube product reviews. It identifies high-opportunity videos, analyzes them with AI, and drafts relevant marketing comments.",
    detailRight:
      "The model is trained on a proprietary dataset of 11,000 real comments across 8 industries. A scoring formula surfaces videos where one comment reaches the most viewers, and a multi-company dashboard lets clients generate comments in seconds.",
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
    <section id="projects" className="relative w-full bg-black pt-8 pb-16">
      {/* Section header */}
      <motion.div
        className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-16 mb-2"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <h2
          className="text-center uppercase mb-10"
          style={{ fontFamily: "var(--font-lacquer)", fontSize: "19px", lineHeight: "19px", letterSpacing: "0px", color: "#FFFFFF" }}
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
