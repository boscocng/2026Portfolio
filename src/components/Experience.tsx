"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

// Translucent wash of pink (#FFA5C6), a soft highlighter reserved for the
// highest-signal facts: quantified impact and marquee credentials.
const HIGHLIGHT = "rgba(255, 165, 198, 0.4)";

function highlightDescription(text: string, phrases: string[]) {
  if (phrases.length === 0) return text;
  const pattern = phrases
    .map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|");
  return text.split(new RegExp(`(${pattern})`, "g")).map((part, i) =>
    phrases.includes(part) ? (
      <mark
        key={i}
        style={{
          backgroundColor: HIGHLIGHT,
          color: "inherit",
          padding: "0.02em 0.12em",
          borderRadius: "0.1em",
          boxDecorationBreak: "clone",
          WebkitBoxDecorationBreak: "clone",
        }}
      >
        {part}
      </mark>
    ) : (
      part
    ),
  );
}

interface Entry {
  logo: string;
  role: string;
  company: string;
  link: string;
  location: string;
  dates: string;
  description: string;
  highlights: string[];
}

const experiences: Entry[] = [
  {
    logo: "/images/Clover.jpeg",
    role: "Software Engineer Intern",
    company: "Clover Labs",
    link: "https://cloverlabs.ai/",
    location: "Toronto, ON",
    dates: "May 2026 – Present",
    description:
      "Building AI-powered vertical SaaS products at Canada's fastest-growing startup, which scaled from $0 to $8M ARR in 6 months. Developing web scrapers, customer-facing dashboards, and fine-tuned LLMs for SEO-optimized content generation.",
    highlights: ["$0 to $8M ARR in 6 months"],
  },
  {
    logo: "/images/pobi.jpeg",
    role: "Founder",
    company: "Pobi",
    link: "https://www.pobi.bet/",
    location: "Toronto, ON",
    dates: "Aug 2026 – Present",
    description:
      "Founded Pobi, an AI-powered prediction markets analyzer that hit 100+ users and $1.5K MRR in 31 days. Built a pricing engine for correlated same-game parlays on live odds from 9 sportsbooks, AI screenshot and voice intake, and automated bet settlement.",
    highlights: ["100+ users and $1.5K MRR in 31 days"],
  },
  {
    logo: "/images/lawtonica.jpeg",
    role: "AI Engineer Intern",
    company: "Lawtonica",
    link: "https://lawtonica.ca/",
    location: "Kingston, ON",
    dates: "Sept 2025 – Jan 2026",
    description:
      "Scaled an LLM-powered civic-tech assistant from 70% to 94% accuracy using Node.js, TypeScript, and LangChain. Designed APIs with JWT authentication and Stripe integration, making municipal by-laws accessible to residents and businesses.",
    highlights: ["70% to 94% accuracy"],
  },
];

const community: Entry[] = [
  {
    logo: "/images/cansbridge.jpeg",
    role: "Scholar",
    company: "Cansbridge Scholars",
    link: "https://www.cansbridgescholars.com/",
    location: "San Francisco, CA",
    dates: "Jan 2026 – April 2026",
    description:
      "Selected as 1 of 17 scholars in an elite 8-week entrepreneurship fellowship for Canada's top students. Built and pitched a venture project, mentored by Peter Thiel Fellows and YC-backed founders.",
    highlights: ["1 of 17", "Peter Thiel Fellows and YC-backed founders"],
  },
  {
    logo: "/images/compsa.jpeg",
    role: "Technology Director",
    company: "Queen's University Computing Students' Association",
    link: "https://compsa.ca/",
    location: "Kingston, ON",
    dates: "April 2025 – Present",
    description:
      "Leading a 14-member tech team building digital products for 1,800+ students. Directed 6 major projects accumulating 7,800+ users, including a room booking platform, e-commerce store, computing clubs hub, and AI chatbot.",
    highlights: ["14-member tech team", "7,800+ users"],
  },
  {
    logo: "/images/qweb.jpeg",
    role: "Lead Software Engineer",
    company: "Queen's University Web Development",
    link: "https://www.qweb.dev/",
    location: "Kingston, ON",
    dates: "Jan 2025 – May 2025",
    description:
      "Led a team of 4 developers to deliver a production-ready booking platform for a 600+ member student organization in 4 months. Built the React front end and Node.js back end, with Firebase authentication and Calendly-style scheduling for meetings and interviews.",
    highlights: ["600+ member student organization in 4 months"],
  },
  {
    logo: "/images/qtedt.jpeg",
    role: "Lead Project Engineer",
    company: "Queen's Themed Entertainment Development Team",
    link: "https://qtedt.ca/",
    location: "Kingston, ON",
    dates: "Sept 2024 – Sept 2025",
    description:
      "1 of 2 software engineers leading the team to qualify from 400+ participants across 32 universities for the 2025 TMU Thrill Design Invitational, advancing to challenges hosted by Universal Creative. Built a PyQt5 ride control system managing 19 carts across 6 scenes in a 1-month sprint.",
    highlights: [
      "400+ participants across 32 universities",
      "Universal Creative",
    ],
  },
];

function EntryTitle({ exp }: { exp: Entry }) {
  return (
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
        <span
          style={{
            fontFamily: "var(--font-season-mix)",
            fontWeight: 400,
          }}
        >
          {exp.company}
        </span>
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
  );
}

function EntryRow({ exp }: { exp: Entry }) {
  return (
    <motion.div
      className="mx-auto max-w-[1400px] px-6 md:px-6 lg:px-8 pt-10 pb-14"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ staggerChildren: 0.1 }}
    >
      <a
        href={exp.link}
        target="_blank"
        rel="noopener noreferrer"
        className="grid grid-cols-1 lg:grid-cols-[auto_1fr_minmax(0,280px)] gap-6 lg:gap-10 items-start transition-opacity hover:opacity-70"
      >
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
        <EntryTitle exp={exp} />

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
          {highlightDescription(exp.description, exp.highlights)}
        </motion.p>
      </a>
    </motion.div>
  );
}

interface EntrySectionProps {
  id: string;
  title: string;
  entries: Entry[];
}

function EntrySection({ id, title, entries }: EntrySectionProps) {
  return (
    <section id={id} className="relative w-full bg-black pt-8 pb-16">
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
          {title}
        </h2>
        <div className="h-px w-full bg-white/10" />
      </motion.div>

      {/* Entries */}
      <div className="flex flex-col">
        {entries.map((exp, i) => (
          <div key={i}>
            <EntryRow exp={exp} />

            {i < entries.length - 1 && (
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

export default function Experience() {
  return (
    <>
      <EntrySection id="experience" title="Experience" entries={experiences} />
      <EntrySection id="community" title="Community" entries={community} />
    </>
  );
}
