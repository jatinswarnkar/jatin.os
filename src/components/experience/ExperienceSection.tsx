"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { EXPERIENCE } from "@/lib/constants";

const timelineVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export default function ExperienceSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <SectionWrapper id="experience">
      {/* Section heading */}
      <div className="text-center mb-16">
        <h2
          className="text-4xl md:text-5xl font-bold text-white mb-4"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          Experience
        </h2>
        <div
          className="w-20 h-[2px] mx-auto mt-4"
          style={{
            background:
              "linear-gradient(90deg, transparent, #00D9FF, transparent)",
          }}
        />
      </div>

      {/* Timeline */}
      <div className="relative w-full mx-auto px-4 md:px-8">
        {/* Center vertical line */}
        <div
          className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] md:-translate-x-1/2"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,217,255,0.4), rgba(139,92,246,0.2), transparent)",
          }}
        />

        {/* Entries */}
        <div className="flex flex-col gap-12">
          {EXPERIENCE.map((entry, index) => (
            <motion.div
              key={entry.year}
              custom={index}
              variants={timelineVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className={`relative pl-16 md:pl-0 ${
                index % 2 === 0
                  ? "md:pr-[calc(50%+40px)]"
                  : "md:pl-[calc(50%+40px)]"
              }`}
            >
              {/* Timeline node */}
              <div
                className="absolute left-4 md:left-1/2 top-4 w-5 h-5 rounded-full md:-translate-x-1/2 z-10"
                style={{
                  background: "#050816",
                  border: "2px solid #00D9FF",
                  boxShadow: "0 0 15px rgba(0,217,255,0.4)",
                }}
              />

              {/* Year label */}
              <div
                className={`absolute top-3 hidden md:block ${
                  index % 2 === 0
                    ? "left-[calc(50%+20px)]"
                    : "right-[calc(50%+20px)]"
                }`}
              >
                <span
                  className="text-sm font-bold tracking-wider"
                  style={{
                    fontFamily: "var(--font-space-grotesk)",
                    color: "#00D9FF",
                  }}
                >
                  {entry.year}
                </span>
              </div>

              {/* Mobile year */}
              <div className="md:hidden mb-2">
                <span
                  className="text-sm font-bold tracking-wider"
                  style={{
                    fontFamily: "var(--font-space-grotesk)",
                    color: "#00D9FF",
                  }}
                >
                  {entry.year}
                </span>
              </div>

              {/* Card */}
              <motion.div
                className="glass-card p-6 cursor-pointer"
                onClick={() =>
                  setExpandedIndex(expandedIndex === index ? null : index)
                }
                whileHover={{
                  y: -3,
                  boxShadow:
                    "0 0 25px rgba(0,217,255,0.08), inset 0 0 25px rgba(0,217,255,0.02)",
                }}
              >
                {/* Role & Company */}
                <h3
                  className="text-lg font-semibold mb-1"
                  style={{
                    fontFamily: "var(--font-space-grotesk)",
                    color: "rgba(255,255,255,0.95)",
                  }}
                >
                  {entry.role}
                </h3>
                <p
                  className="text-sm mb-1"
                  style={{ color: "#8B5CF6" }}
                >
                  {entry.company}
                </p>
                <p
                  className="text-xs mb-3"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  {entry.duration}
                </p>

                {/* Expand indicator */}
                <div className="flex items-center gap-2 mb-2">
                  <motion.svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    animate={{
                      rotate: expandedIndex === index ? 90 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <path
                      d="M4 2L8 6L4 10"
                      stroke="rgba(0,217,255,0.5)"
                      strokeWidth="1.5"
                      fill="none"
                    />
                  </motion.svg>
                  <span
                    className="text-xs"
                    style={{ color: "rgba(255,255,255,0.4)" }}
                  >
                    {expandedIndex === index
                      ? "Click to collapse"
                      : "Click to expand"}
                  </span>
                </div>

                {/* Expandable highlights */}
                <AnimatePresence>
                  {expandedIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <ul className="space-y-2 pt-2">
                        {entry.highlights.map((highlight, hIndex) => (
                          <motion.li
                            key={hIndex}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: hIndex * 0.05 }}
                            className="flex items-start gap-2 text-sm"
                            style={{ color: "rgba(255,255,255,0.6)" }}
                          >
                            <span
                              className="mt-2 w-1.5 h-1.5 rounded-full shrink-0"
                              style={{ background: "#00D9FF" }}
                            />
                            {highlight}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
