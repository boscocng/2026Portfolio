"use client";

import { motion } from "framer-motion";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
];

export default function Navbar() {
  return (
    <motion.nav
      className="fixed bottom-18 left-1/2 z-50 -translate-x-1/2 scale-110 origin-bottom"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="flex items-center gap-0">
        {/* Logo pill */}
        <a
          href="#"
          className="rounded-full border border-white/10 bg-white/[0.08] px-4.5 py-3.5 text-xl leading-none text-white backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,0,0,0.5)] transition-colors hover:bg-white/[0.12]"
          style={{ fontFamily: "var(--font-permanent-marker)", letterSpacing: "0.02em", WebkitTextStroke: "0.5px white" }}
        >
          Bosco
        </a>

        {/* Center links pill */}
        <div className="flex items-center rounded-full border border-white/10 bg-white/[0.08] px-2 backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-2.5 py-3 text-white transition-colors hover:text-white/70"
              style={{ fontFamily: "var(--font-season-sans)", fontSize: "12px", letterSpacing: "-0.1px" }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA pill */}
        <a
          href="#contact"
          className="rounded-full bg-amber-100 px-3.5 py-3 text-sm text-zinc-900 transition-all hover:bg-amber-200 hover:scale-105"
          style={{ fontFamily: "var(--font-lacquer)" }}
        >
          Contact
        </a>
      </div>
    </motion.nav>
  );
}
