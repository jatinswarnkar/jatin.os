"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FOOTER_TERMINAL } from "@/lib/constants";

export default function TerminalFooter() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  // Flatten all lines for sequential animation
  const allLines: { type: "command" | "output"; text: string }[] = [];
  FOOTER_TERMINAL.forEach((block) => {
    allLines.push({ type: "command", text: `$ ${block.command}` });
    block.output.forEach((line) => {
      allLines.push({ type: "output", text: line });
    });
  });
  // Final prompt
  allLines.push({ type: "command", text: "$" });

  return (
    <footer ref={ref} className="w-full mt-20">
      <div className="section-container">
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: "rgba(0,0,0,0.4)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {/* Terminal header */}
          <div
            className="px-4 py-2.5 flex items-center gap-3"
            style={{
              background: "rgba(255,255,255,0.03)",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/70" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <span className="w-3 h-3 rounded-full bg-green-500/70" />
            </div>
            <span
              className="text-xs ml-2"
              style={{
                color: "rgba(255,255,255,0.3)",
                fontFamily: "var(--font-space-grotesk), monospace",
              }}
            >
              jatin@os ~ %
            </span>
          </div>

          {/* Terminal body */}
          <div
            className="p-6 space-y-1"
            style={{
              fontFamily: "var(--font-space-grotesk), monospace",
              fontSize: "14px",
            }}
          >
            {allLines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={
                  isInView
                    ? { opacity: 1, x: 0 }
                    : { opacity: 0, x: -10 }
                }
                transition={{
                  delay: i * 0.08,
                  duration: 0.3,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {line.type === "command" ? (
                  <span style={{ color: "#00D9FF" }}>
                    {line.text}
                    {/* Blinking cursor on the last line */}
                    {i === allLines.length - 1 && (
                      <motion.span
                        className="inline-block w-[8px] h-[16px] ml-1 align-middle"
                        style={{ background: "#00D9FF" }}
                        animate={{ opacity: [1, 0] }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          repeatType: "reverse",
                        }}
                      />
                    )}
                  </span>
                ) : (
                  <span
                    className="pl-4"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    {line.text}
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center py-8">
          <p
            className="text-xs"
            style={{ color: "rgba(255,255,255,0.2)" }}
          >
            © {new Date().getFullYear()} JATIN.OS — Built with Next.js,
            Three.js, and Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
