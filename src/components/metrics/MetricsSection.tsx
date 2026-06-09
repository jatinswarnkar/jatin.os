"use client";

import { motion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import CountUpNumber from "./CountUpNumber";
import { METRICS } from "@/lib/constants";

const ICONS: Record<string, React.ReactNode> = {
  experience: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
  efficiency: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
    </svg>
  ),
  ai: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="10" rx="2"/>
      <circle cx="12" cy="5" r="2"/>
      <path d="M12 7v4"/>
      <line x1="8" y1="16" x2="8" y2="16"/>
      <line x1="16" y1="16" x2="16" y2="16"/>
    </svg>
  ),
  cloud: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>
    </svg>
  ),
  backend: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3"/>
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
    </svg>
  ),
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as any,
    },
  }),
};

export default function MetricsSection() {
  return (
    <SectionWrapper id="metrics">
      {/* Section heading */}
      <div className="text-center mb-16">
        <h2
          className="text-4xl md:text-5xl font-bold text-white mb-4"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          System Metrics
        </h2>
        <div
          className="w-20 h-[2px] mx-auto mt-4"
          style={{
            background:
              "linear-gradient(90deg, transparent, #00D9FF, transparent)",
          }}
        />
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {METRICS.map((metric, index) => (
          <motion.div
            key={metric.label}
            custom={index}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{
              y: -5,
              boxShadow:
                "0 0 30px rgba(0,217,255,0.1), 0 0 60px rgba(0,217,255,0.03)",
            }}
            className="glass-card p-6 text-center group cursor-default"
            style={{ animation: `float-slow ${6 + index * 0.5}s ease-in-out infinite` }}
          >
            {/* Icon */}
            <div 
              className="mb-4 mx-auto w-12 h-12 flex items-center justify-center rounded-xl"
              style={{
                color: "#00D9FF",
                background: "rgba(0,217,255,0.05)",
                border: "1px solid rgba(0,217,255,0.15)"
              }}
            >
              {ICONS[metric.icon]}
            </div>

            {/* Value */}
            <div
              className="text-3xl md:text-4xl font-bold mb-2"
              style={{
                fontFamily: "var(--font-space-grotesk)",
                color: "#00D9FF",
              }}
            >
              <CountUpNumber
                target={metric.value}
                suffix={metric.suffix}
                duration={2500}
              />
            </div>

            {/* Label */}
            <div
              className="text-sm font-medium"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              {metric.label}
            </div>

            {/* Bottom glow line */}
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] group-hover:w-3/4 transition-all duration-500"
              style={{
                background:
                  "linear-gradient(90deg, transparent, #00D9FF, transparent)",
              }}
            />
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
