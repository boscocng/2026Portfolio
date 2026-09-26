"use client";

import { motion } from "framer-motion";

const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/bosco-c-ng/" },
  { label: "GitHub", href: "https://github.com/boscocng" },
  { label: "Twitter", href: "https://x.com/boscocng" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function Footer() {
  return (
    // The tall bottom padding keeps the social links clear of the fixed bottom navbar.
    <footer id="contact" className="relative w-full bg-black pt-8 pb-35">
      <motion.div
        className="mx-auto max-w-[1400px] px-6 md:px-6 lg:px-8 flex flex-col items-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ staggerChildren: 0.12 }}
      >
        {/* Subheading */}
        <motion.p
          className="uppercase mb-12"
          style={{
            fontFamily: "var(--font-lacquer)",
            fontSize: "20px",
            lineHeight: "20px",
            letterSpacing: "0px",
            color: "#FFFFFF",
          }}
          variants={fadeUp}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          Connect with me:
        </motion.p>

        {/* Social links. Phones stack them in a centred column, as poch.studio does, where a
            wrapping row would leave Twitter alone under the other two. */}
        <motion.div
          className="flex flex-wrap items-baseline justify-center gap-x-12 md:gap-x-16 gap-y-4 max-sm:flex-col max-sm:items-center max-sm:gap-y-2.5"
          variants={fadeUp}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[length:clamp(32px,5vw,50px)] text-white transition-opacity hover:opacity-70 max-sm:text-[2.5rem]"
              style={{
                fontFamily: "var(--font-season-sans)",
                fontWeight: 600,
                lineHeight: "1",
                letterSpacing: "0px",
              }}
            >
              {link.label}
              <span
                className="inline-block ml-1"
                style={{ fontSize: "0.5em", verticalAlign: "super" }}
              >
                &#x2197;
              </span>
            </a>
          ))}
        </motion.div>
      </motion.div>
    </footer>
  );
}
