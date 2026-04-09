"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const experiences = [
  {
    logo: "/images/Clover.jpeg",
    role: "Software Engineer Intern",
    company: "Clover Labs",
    link: "https://cloverlabs.ai/",
    location: "Toronto, ON",
    dates: "May 2026 — Present",
    description:
      "Built internal tooling that automated deployment workflows across 12 engineering teams, reducing release cycle time by 40%. Owned the full stack from database migrations to the React dashboard used by 200+ engineers daily.",
  },
  {
    logo: "/images/cansbridge.jpeg",
    role: "Research",
    company: "Cansbridge Scholars",
    link: "https://www.cansbridgescholars.com/",
    location: "San Francisco, CA",
    dates: "Jan 2026 — April 2026",
    description:
      "Designed and shipped a real-time collaboration feature for the company's flagship product. Integrated WebSocket-based sync with conflict resolution, serving 5,000+ concurrent users across web and mobile clients.",
  },
  {
    logo: "/images/lawtonica.jpeg",
    role: "AI/ML Engineer Intern",
    company: "Lawtonica",
    link: "https://lawtonica.ca/",
    location: "Kingston, ON",
    dates: "Sept 2025 — Jan 2026",
    description:
      "Developed evaluation pipelines for large language model outputs, contributing to two published papers on retrieval-augmented generation. Built a custom annotation interface used by a team of 8 researchers.",
  },
  {
    logo: "/images/compsa.jpeg",
    role: "Technology Director",
    company: "Queen's University Computing Students' Association",
    link: "https://compsa.ca/",
    location: "Kingston, ON",
    dates: "April 2025 — Present",
    description:
      "Developed evaluation pipelines for large language model outputs, contributing to two published papers on retrieval-augmented generation. Built a custom annotation interface used by a team of 8 researchers.",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="relative w-full bg-black pt-8 pb-16">
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
          style={{
            fontFamily: "var(--font-lacquer)",
            fontSize: "19px",
            lineHeight: "19px",
            letterSpacing: "0px",
            color: "#FFFFFF",
          }}
        >
          Experience
        </h2>
        <div className="h-px w-full bg-white/10" />
      </motion.div>

      {/* Experience entries */}
      <div className="flex flex-col">
        {experiences.map((exp, i) => (
          <div key={i}>
            <motion.div
              className="mx-auto max-w-[1400px] px-6 md:px-6 lg:px-8 pt-10 pb-14"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ staggerChildren: 0.1 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr_minmax(0,280px)] gap-6 lg:gap-10 items-start">
                {/* Logo */}
                <motion.div
                  className="flex-shrink-0"
                  variants={fadeUp}
                  transition={{
                    duration: 0.6,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                >
                  <div
                    className="rounded-lg overflow-hidden"
                    style={{
                      width: 48,
                      height: 48,
                      backgroundColor: "#323332",
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={exp.logo}
                      alt={exp.company}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  </div>
                </motion.div>

                {/* Role + Company + Dates */}
                <motion.div
                  variants={fadeUp}
                  transition={{
                    duration: 0.6,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
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
                      {exp.role}
                    </span>{" "}
                    <a
                      href={exp.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-opacity hover:opacity-70"
                      style={{
                        fontFamily: "var(--font-season-mix)",
                        fontWeight: 400,
                      }}
                    >
                      {exp.company}
                    </a>
                  </p>
                  <p
                    className="mt-2"
                    style={{
                      fontFamily: "var(--font-season-sans)",
                      fontWeight: 400,
                      fontSize: "12px",
                      lineHeight: "15.6px",
                      color: "rgba(255,255,255,0.5)",
                    }}
                  >
                    {exp.location} &middot; {exp.dates}
                  </p>
                </motion.div>

                {/* Description */}
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
                  transition={{
                    duration: 0.6,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                >
                  {exp.description}
                </motion.p>
              </div>
            </motion.div>

            {i < experiences.length - 1 && (
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
