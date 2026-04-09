"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("bosco.c.ng@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = "bosco.c.ng@gmail.com";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log({ name, email, message });
  };

  return (
    <section id="contact" className="relative w-full bg-black">
      {/* Statement / Illustration area */}
      <div className="flex min-h-screen w-full flex-col items-center justify-center px-6">
        <motion.div
          className="flex flex-col items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ staggerChildren: 0.15 }}
        >
          {/* Illustration */}
          <motion.div
            className="mb-12"
            variants={fadeUp}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/contact.png"
              alt="Wizard on a bicycle"
              className="h-auto"
              style={{ width: "clamp(140px, 20vw, 220px)" }}
            />
          </motion.div>

          {/* Text */}
          <motion.p
            className="text-center text-white"
            style={{
              fontSize: "clamp(28px, 5vw, 50px)",
              lineHeight: 1,
              letterSpacing: "0px",
            }}
            variants={fadeUp}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <span
              style={{
                fontFamily: "var(--font-season-sans)",
                fontWeight: 600,
              }}
            >
              That&apos;s my story.
            </span>
            <br />
            <span
              style={{
                fontFamily: "var(--font-season-mix)",
                fontWeight: 400,
              }}
            >
              Now what&apos;s yours?
            </span>
          </motion.p>

          {/* Chat + Email buttons */}
          <motion.div
            className="mt-10 flex items-center gap-4"
            variants={fadeUp}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Chat button */}
            <a
              href="https://cal.com/boscocng/15min"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-white/[0.06] px-6 py-2.5 text-white transition-colors hover:bg-white/[0.15]"
              style={{
                fontFamily: "var(--font-season-sans)",
                fontWeight: 600,
                fontSize: "12px",
                lineHeight: "15.6px",
                background: "#323332",
              }}
            >
              {/* Video chat icon */}
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="23 7 16 12 23 17 23 7" />
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
              </svg>
              Chat
            </a>

            {/* Email button */}
            <button
              type="button"
              onClick={handleCopyEmail}
              className="relative flex items-center gap-2 rounded-full border border-white/[0.06] px-6 py-2.5 text-white transition-colors hover:bg-white/[0.15]"
              style={{
                fontFamily: "var(--font-season-sans)",
                fontWeight: 600,
                fontSize: "12px",
                lineHeight: "15.6px",
                background: "#323332",
              }}
            >
              {/* Envelope icon */}
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M22 7l-10 7L2 7" />
              </svg>
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.span
                    key="copied"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                  >
                    Copied!
                  </motion.span>
                ) : (
                  <motion.span
                    key="email"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                  >
                    Email
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </motion.div>
        </motion.div>

        {/* Contact form — centered, max-width for readability */}
        <motion.div
          className="w-full max-w-[560px] px-6 mt-16 pb-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        transition={{ staggerChildren: 0.1 }}
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          {/* Name */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <label
              htmlFor="contact-name"
              className="block mb-3"
              style={{
                fontFamily: "var(--font-season-sans)",
                fontWeight: 600,
                fontSize: "14px",
                lineHeight: "18px",
                letterSpacing: "0px",
                color: "#FFFFFF",
              }}
            >
              Name
            </label>
            <input
              id="contact-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Paul McCartney"
              className="w-full bg-transparent pb-3 text-white placeholder:text-white/25 focus:outline-none"
              style={{
                fontFamily: "var(--font-season-sans)",
                fontWeight: 400,
                fontSize: "14px",
                lineHeight: "20px",
                borderBottom: "1px solid rgba(255,255,255,0.15)",
              }}
            />
          </motion.div>

          {/* Email */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <label
              htmlFor="contact-email"
              className="block mb-3"
              style={{
                fontFamily: "var(--font-season-sans)",
                fontWeight: 600,
                fontSize: "14px",
                lineHeight: "18px",
                letterSpacing: "0px",
                color: "#FFFFFF",
              }}
            >
              Email
            </label>
            <input
              id="contact-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full bg-transparent pb-3 text-white placeholder:text-white/25 focus:outline-none"
              style={{
                fontFamily: "var(--font-season-sans)",
                fontWeight: 400,
                fontSize: "14px",
                lineHeight: "20px",
                borderBottom: "1px solid rgba(255,255,255,0.15)",
              }}
            />
          </motion.div>

          {/* Message */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <label
              htmlFor="contact-message"
              className="block mb-3"
              style={{
                fontFamily: "var(--font-season-sans)",
                fontWeight: 600,
                fontSize: "14px",
                lineHeight: "18px",
                letterSpacing: "0px",
                color: "#FFFFFF",
              }}
            >
              Message
            </label>
            <textarea
              id="contact-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Your message..."
              rows={5}
              className="w-full resize-none bg-transparent pb-3 text-white placeholder:text-white/25 focus:outline-none"
              style={{
                fontFamily: "var(--font-season-sans)",
                fontWeight: 400,
                fontSize: "14px",
                lineHeight: "20px",
                borderBottom: "1px solid rgba(255,255,255,0.15)",
              }}
            />
          </motion.div>

          {/* Submit button */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <button
              type="submit"
              className="w-full rounded-full py-4 text-black transition-opacity hover:opacity-90"
              style={{
                fontFamily: "var(--font-season-sans)",
                fontWeight: 600,
                fontSize: "14px",
                lineHeight: "18px",
                background: "#FFA5C6",
              }}
            >
              Submit{" "}
              <span className="inline-block ml-1" style={{ fontSize: "1em" }}>
                ✧→
              </span>
            </button>
          </motion.div>
        </form>
      </motion.div>
      </div>
    </section>
  );
}
