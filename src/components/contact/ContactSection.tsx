"use client";

import { motion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { SOCIAL_LINKS, PERSONAL } from "@/lib/constants";

const ICONS: Record<string, React.ReactNode> = {
  github: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  ),
  linkedin: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  email: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
  resume: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  ),
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as any,
    },
  }),
};

export default function ContactSection() {
  return (
    <SectionWrapper id="contact">
      {/* Section heading */}
      <div className="text-center mb-16">
        <h2
          className="text-4xl md:text-5xl font-bold text-white mb-4"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          Contact
        </h2>
        <div
          className="w-20 h-[2px] mx-auto mt-4"
          style={{
            background:
              "linear-gradient(90deg, transparent, #00D9FF, transparent)",
          }}
        />
      </div>

      {/* Info */}
      <div className="text-center mb-10">
        <p
          className="text-sm mb-1"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          📍 {PERSONAL.location}
        </p>
        <p
          className="text-sm"
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          {PERSONAL.availability}
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full mx-auto px-4 md:px-8">
        {SOCIAL_LINKS.map((link, index) => (
          <motion.a
            key={link.label}
            href={link.url}
            target={link.url.startsWith("http") ? "_blank" : undefined}
            rel={link.url.startsWith("http") ? "noopener noreferrer" : undefined}
            download={link.url.endsWith(".pdf") ? "Jatin_Swarnkar_Resume.pdf" : undefined}
            custom={index}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{
              y: -5,
              boxShadow:
                "0 0 30px rgba(0,217,255,0.1), 0 0 60px rgba(0,217,255,0.03)",
            }}
            className="glass-card p-6 text-center group block"
          >
            <div
              className="mb-3 mx-auto w-10 h-10 flex items-center justify-center rounded-xl transition-colors duration-300"
              style={{
                color: "rgba(255,255,255,0.4)",
                background: "rgba(255,255,255,0.03)",
              }}
            >
              {ICONS[link.icon]}
            </div>
            <span
              className="text-sm font-medium group-hover:text-[#00D9FF] transition-colors"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              {link.label}
            </span>
          </motion.a>
        ))}
      </div>

      <div className="text-center mt-8">
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>
          Or reach out directly:{" "}
          <a
            href="mailto:jatinswarnkar04@gmail.com"
            className="hover:text-[#00D9FF] transition-colors duration-300"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            jatinswarnkar04@gmail.com
          </a>
        </p>
      </div>
    </SectionWrapper>
  );
}
