"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_LINES = [
  { text: "> Initializing JATIN.OS...", delay: 0 },
  { text: "> Loading neural networks...", delay: 400 },
  { text: "> Calibrating AI modules...", delay: 800 },
  { text: "> Establishing secure connections...", delay: 1200 },
  { text: "> Mounting experience database...", delay: 1600 },
  { text: "> Rendering interface...", delay: 2000 },
  { text: "> System ready.", delay: 2400 },
];

const TOTAL_BOOT_DURATION = 3200; // Time before the boot screen fades out

interface BootScreenProps {
  onBootComplete: () => void;
}

export default function BootScreen({ onBootComplete }: BootScreenProps) {
  const [phase, setPhase] = useState<"idle" | "booting" | "complete">("idle");
  const [visibleLines, setVisibleLines] = useState<number>(0);

  const startBoot = useCallback(() => {
    setPhase("booting");

    // Animate boot lines sequentially
    BOOT_LINES.forEach((line, index) => {
      setTimeout(() => {
        setVisibleLines(index + 1);
      }, line.delay);
    });

    // Complete after all lines + pause
    setTimeout(() => {
      setPhase("complete");
    }, TOTAL_BOOT_DURATION);
  }, []);

  // Trigger onBootComplete after exit animation
  useEffect(() => {
    if (phase === "complete") {
      const timer = setTimeout(onBootComplete, 800);
      return () => clearTimeout(timer);
    }
  }, [phase, onBootComplete]);

  return (
    <AnimatePresence>
      {phase !== "complete" && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ background: "#050816" }}
          exit={{
            opacity: 0,
            scale: 1.05,
            filter: "blur(20px)",
          }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Subtle radial glow behind title */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(0,217,255,0.08) 0%, transparent 70%)",
            }}
          />

          {/* Scanline overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)",
            }}
          />

          <div className="relative flex flex-col items-center gap-8">
            {/* JATIN.OS Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <h1
                className="text-6xl md:text-8xl font-bold tracking-tight"
                style={{
                  fontFamily: "var(--font-space-grotesk), monospace",
                  backgroundImage: "linear-gradient(135deg, #00D9FF 0%, #8B5CF6 50%, #00D9FF 100%)",
                  backgroundSize: "200% 200%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  animation: "gradient-shift 6s ease infinite",
                  textShadow:
                    "0 0 40px rgba(0,217,255,0.4), 0 0 80px rgba(0,217,255,0.15), 0 0 120px rgba(0,217,255,0.05)",
                }}
              >
                JATIN.OS
              </h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="mt-4 flex items-center justify-center gap-3"
              >
                <span
                  className="text-sm tracking-[0.3em] uppercase"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  AI Engineer
                </span>
                <span
                  className="w-1 h-1 rounded-full"
                  style={{ background: "rgba(0,217,255,0.5)" }}
                />
                <span
                  className="text-sm tracking-[0.3em] uppercase"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  Software Engineer
                </span>
              </motion.div>
            </motion.div>

            {/* Boot sequence or Initialize button */}
            {phase === "idle" ? (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                onClick={startBoot}
                className="group relative mt-4 px-10 py-4 rounded-xl cursor-pointer transition-all duration-500"
                style={{
                  background: "rgba(0,217,255,0.05)",
                  border: "1px solid rgba(0,217,255,0.2)",
                }}
                whileHover={{
                  scale: 1.02,
                  boxShadow:
                    "0 0 30px rgba(0,217,255,0.2), 0 0 60px rgba(0,217,255,0.05)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Animated border glow */}
                <div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(0,217,255,0.1), rgba(139,92,246,0.1))",
                  }}
                />

                <span
                  className="relative text-base font-medium tracking-[0.15em] uppercase"
                  style={{
                    fontFamily: "var(--font-space-grotesk), monospace",
                    color: "#00D9FF",
                  }}
                >
                  [ Initialize ]
                </span>

                {/* Pulsing dot */}
                <motion.span
                  className="absolute -top-1 -right-1 w-2 h-2 rounded-full"
                  style={{ background: "#00D9FF" }}
                  animate={{
                    opacity: [1, 0.3, 1],
                    scale: [1, 1.3, 1],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.button>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="mt-4 w-[340px] md:w-[420px]"
              >
                {/* Boot log container */}
                <div
                  className="rounded-xl p-5 space-y-2"
                  style={{
                    background: "rgba(0,0,0,0.4)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    fontFamily: "var(--font-space-grotesk), monospace",
                  }}
                >
                  {BOOT_LINES.map((line, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={
                        index < visibleLines
                          ? { opacity: 1, x: 0 }
                          : { opacity: 0, x: -10 }
                      }
                      transition={{
                        duration: 0.3,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="text-sm"
                      style={{
                        color:
                          line.text === "> System ready."
                            ? "#00D9FF"
                            : "rgba(255,255,255,0.5)",
                      }}
                    >
                      {line.text}
                      {index === visibleLines - 1 &&
                        line.text !== "> System ready." && (
                          <motion.span
                            className="inline-block w-2 h-4 ml-1 align-middle"
                            style={{ background: "#00D9FF" }}
                            animate={{ opacity: [1, 0] }}
                            transition={{
                              duration: 0.5,
                              repeat: Infinity,
                              repeatType: "reverse",
                            }}
                          />
                        )}
                    </motion.div>
                  ))}
                </div>

                {/* Progress bar */}
                <div
                  className="mt-3 h-[2px] rounded-full overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.06)" }}
                >
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      background:
                        "linear-gradient(90deg, #00D9FF, #8B5CF6)",
                    }}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{
                      duration: TOTAL_BOOT_DURATION / 1000,
                      ease: "easeInOut",
                    }}
                  />
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
