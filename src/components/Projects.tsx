"use client";

import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";

const projects = [
  {
    title: "Pobi:",
    description:
      "an AI-powered betting platform that turns sportsbook promos into the highest expected-value parlays",
    detailLeft:
      "Pobi is a subscription SaaS I co-founded that tells sports bettors which parlays to place with the promos their sportsbooks offer, priced on live odds from 9 books. It reached 100+ users and $1.5K MRR in 31 days.",
    detailRight:
      "A pricing engine fits a score distribution to each game's lines to price correlated same-game parlays. GPT vision and Whisper read promos from screenshots and voice, and a Cloudflare cron auto-settles bets across 8 leagues.",
    tags: ["Full-Stack", "AI/ML", "Startup"],
    link: "https://www.pobi.bet/",
    // The founders' intro from pobi.bet/welcome, served from Pobi's public storage bucket.
    demoVideo: {
      src: "https://arnoboqouzoynghefvhf.supabase.co/storage/v1/object/public/logo/pobi-intro.mp4",
      aspectRatio: 16 / 9,
    },
    images: [
      {
        width: 350,
        src: "/images/projects/pobi/pobi-scroll.webp",
        video: "/images/projects/pobi/pobi-scroll.mp4",
        alt: "The Pobi landing page scrolling in a window over a pine canopy",
      },
      {
        width: 350,
        src: "/images/projects/pobi/pobi-laptop.webp",
        alt: "The Pobi app on a MacBook resting on sunlit stone steps",
      },
      {
        width: 350,
        src: "/images/projects/pobi/pobi-slides.webp",
        video: "/images/projects/pobi/pobi-slides.mp4",
        alt: "Sections of the Pobi site cycling on black",
      },
      {
        width: 350,
        src: "/images/projects/pobi/pobi-mountains.webp",
        alt: "Pobi's track record section floating over green mountains",
      },
      {
        width: 350,
        src: "/images/projects/pobi/pobi-phone.webp",
        alt: "Pobi's boost intake chat on an iPhone in dappled leaf shadow",
      },
    ],
  },
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
    // The store walkthrough, a 1280x960 screen recording in the same public bucket as Pobi's intro.
    demoVideo: {
      src: "https://arnoboqouzoynghefvhf.supabase.co/storage/v1/object/public/logo/COMPSA%20Merch%20Store%20Demo%20(compressed).mp4",
      aspectRatio: 4 / 3,
    },
    images: [
      {
        width: 350,
        src: "/images/projects/merch/merch-scroll.webp",
        video: "/images/projects/merch/merch-scroll.mp4",
        alt: "The COMPSA Merch Store home page scrolling in a window above a misty lake",
      },
      {
        width: 350,
        src: "/images/projects/merch/merch-laptop.webp",
        alt: "The merch catalog on a MacBook on a picnic table covered in autumn leaves",
      },
      {
        width: 350,
        src: "/images/projects/merch/merch-slides.webp",
        video: "/images/projects/merch/merch-slides.mp4",
        alt: "Pages of the merch store cycling on oxblood, from catalog to pickup slots",
      },
      {
        width: 350,
        src: "/images/projects/merch/merch-hills.webp",
        alt: "The grey hoodie product page floating over autumn hills and a river",
      },
      {
        width: 350,
        src: "/images/projects/merch/merch-phone.webp",
        alt: "The merch store home page on an iPhone lying in fallen maple leaves",
      },
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
