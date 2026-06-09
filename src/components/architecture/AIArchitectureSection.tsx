"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { AI_ARCHITECTURE_NODES } from "@/lib/constants";

const nodeVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.15,
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as any,
    },
  }),
};

export default function AIArchitectureSection() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  return (
    <SectionWrapper id="ai-architecture">
      {/* Section heading */}
      <div className="text-center mb-16">
        <h2
          className="text-4xl md:text-5xl font-bold text-white mb-4"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          AI Analytics Architecture
        </h2>
        <p className="text-base md:text-lg max-w-xl mx-auto mt-3" style={{ color: "rgba(255,255,255,0.5)" }}>
          End-to-end AI-driven analytics pipeline — from natural language to
          actionable insights
        </p>
        <div
          className="w-20 h-[2px] mx-auto mt-6"
          style={{
            background:
              "linear-gradient(90deg, transparent, #8B5CF6, transparent)",
          }}
        />
        <p
          className="text-sm md:text-base text-center max-w-2xl mx-auto mt-6"
          style={{ color: "rgba(255,255,255,0.5)", lineHeight: "1.7" }}
        >
          Architecture of the{" "}
          <span style={{ color: "#00D9FF" }}>AI Analytics Copilot</span>{" "}
          I built at Perceptiviti — a production system used to query 25+ datasets
          in plain English with self-healing SQL and dynamic chart generation.
        </p>
      </div>

      {/* Flow Diagram */}
      <div className="relative w-full mx-auto px-4 md:px-8">
        {/* Vertical connection line */}
        <div
          className="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,217,255,0.3), rgba(139,92,246,0.3), rgba(0,217,255,0.1))",
          }}
        />

        {/* Animated pulse on the line */}
        <motion.div
          className="absolute left-1/2 w-[2px] h-16 -translate-x-1/2"
          style={{
            background:
              "linear-gradient(180deg, transparent, #00D9FF, transparent)",
            filter: "blur(1px)",
          }}
          animate={{
            top: ["0%", "100%"],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Nodes */}
        <div className="relative flex flex-col items-center gap-4">
          {AI_ARCHITECTURE_NODES.map((node, index) => (
            <div key={node.id} className="relative w-full md:w-3/4 lg:w-1/2">
              <motion.div
                custom={index}
                variants={nodeVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-30px" }}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                className="relative glass-card px-6 py-5 text-center cursor-default mx-auto w-full"
                style={{
                  borderColor:
                    hoveredNode === node.id
                      ? "rgba(0,217,255,0.3)"
                      : undefined,
                  boxShadow:
                    hoveredNode === node.id
                      ? "0 0 25px rgba(0,217,255,0.1), inset 0 0 25px rgba(0,217,255,0.03)"
                      : undefined,
                }}
                whileHover={{ scale: 1.03 }}
              >
                {/* Node index */}
                <div
                  className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold"
                  style={{
                    background: "rgba(0,217,255,0.15)",
                    border: "1px solid rgba(0,217,255,0.3)",
                    color: "#00D9FF",
                    fontFamily: "var(--font-space-grotesk)",
                  }}
                >
                  {index + 1}
                </div>

                {/* Label */}
                <span
                  className="text-sm font-semibold"
                  style={{
                    fontFamily: "var(--font-space-grotesk)",
                    color:
                      hoveredNode === node.id
                        ? "#00D9FF"
                        : "rgba(255,255,255,0.85)",
                  }}
                >
                  {node.label}
                </span>

                {/* Hover tooltip */}
                <AnimatePresence>
                  {hoveredNode === node.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 5, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 5, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-full top-1/2 -translate-y-1/2 ml-4 w-64 p-4 z-10 hidden lg:block"
                      style={{
                        background: "rgba(10,15,30,0.95)",
                        backdropFilter: "blur(20px)",
                        border: "1px solid rgba(0,217,255,0.15)",
                        borderRadius: "12px",
                      }}
                    >
                      <p
                        className="text-xs leading-relaxed"
                        style={{ color: "rgba(255,255,255,0.6)" }}
                      >
                        {node.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Connection arrow */}
              {index < AI_ARCHITECTURE_NODES.length - 1 && (
                <motion.div
                  className="flex justify-center my-1"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 + 0.3 }}
                >
                  <svg width="12" height="16" viewBox="0 0 12 16">
                    <path
                      d="M6 0L6 12M6 12L2 8M6 12L10 8"
                      stroke="rgba(0,217,255,0.3)"
                      strokeWidth="1.5"
                      fill="none"
                    />
                  </svg>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
