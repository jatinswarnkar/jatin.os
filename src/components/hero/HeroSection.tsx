"use client";

import { Suspense } from "react";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import HeroGlobe from "./HeroGlobe";
import TypewriterEffect from "@/components/ui/TypewriterEffect";
import { PERSONAL, TYPING_STRINGS } from "@/lib/constants";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any },
  },
};

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ paddingTop: "80px" }}
    >
      <div className="section-container w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-4 items-center">
          {/* ====== Left Column: Text ====== */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-5 relative z-10"
          >
            {/* Greeting */}
            <motion.span
              variants={itemVariants}
              className="text-base md:text-lg tracking-[0.25em] uppercase font-medium"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              Hi, I&apos;m
            </motion.span>

            {/* Name */}
            <motion.h1
              variants={itemVariants}
              className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-extrabold tracking-tight leading-[0.95]"
              style={{
                fontFamily: "var(--font-space-grotesk)",
                color: "#FFFFFF",
                textShadow: "0 0 60px rgba(0,217,255,0.15)",
              }}
            >
              Jatin
              <br />
              <span
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #00D9FF 0%, #8B5CF6 50%, #00D9FF 100%)",
                  backgroundSize: "200% 200%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  animation: "gradient-shift 6s ease infinite",
                }}
              >
                Swarnkar
              </span>
            </motion.h1>

            {/* Role badges */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-3 mt-2"
            >
              {PERSONAL.roles.map((role) => (
                <span
                  key={role}
                  className="px-5 py-2 rounded-full text-sm font-semibold tracking-wide"
                  style={{
                    background: "rgba(0,217,255,0.08)",
                    border: "1px solid rgba(0,217,255,0.25)",
                    color: "#00D9FF",
                    boxShadow: "0 0 15px rgba(0,217,255,0.05)",
                  }}
                >
                  {role}
                </span>
              ))}
            </motion.div>

            {/* Tagline */}
            <motion.p
              variants={itemVariants}
              className="text-2xl md:text-3xl font-light"
              style={{ color: "rgba(255,255,255,0.8)" }}
            >
              {PERSONAL.tagline}
            </motion.p>

            {/* Typing effect */}
            <motion.div
              variants={itemVariants}
              className="h-10 flex items-center"
            >
              <TypewriterEffect
                strings={TYPING_STRINGS}
                className="text-lg md:text-xl font-medium"
                typeSpeed={50}
                deleteSpeed={25}
                pauseDuration={2500}
              />
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4 mt-6"
            >
              <button
                onClick={() => scrollToSection("experience")}
                className="px-8 py-3.5 rounded-xl cursor-pointer font-semibold text-base transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,217,255,0.15)] hover:-translate-y-0.5"
                style={{
                  background: "rgba(0,217,255,0.1)",
                  border: "1px solid rgba(0,217,255,0.3)",
                  color: "#00D9FF",
                }}
              >
                <svg
                  className="inline mr-2"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
                View Experience
              </button>
              <button
                onClick={() => scrollToSection("projects")}
                className="px-8 py-3.5 rounded-xl cursor-pointer font-semibold text-base transition-all duration-300 hover:bg-white/5 hover:border-white/20 hover:text-white hover:-translate-y-0.5"
                style={{
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                View Projects
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="px-8 py-3.5 rounded-xl cursor-pointer font-semibold text-base transition-all duration-300 hover:bg-white/5 hover:border-white/20 hover:text-white hover:-translate-y-0.5"
                style={{
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                Contact
              </button>
            </motion.div>
          </motion.div>

          {/* ====== Right Column: Globe ====== */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1.5,
              delay: 0.5,
              ease: [0.16, 1, 0.3, 1] as any,
            }}
            className="relative w-full h-[400px] md:h-[500px] lg:h-[600px]"
          >
            <Canvas
              camera={{ position: [0, 0.5, 5.5], fov: 45 }}
              dpr={[1, 2]}
              gl={{
                antialias: true,
                alpha: true,
                powerPreference: "high-performance",
                toneMapping: THREE.ACESFilmicToneMapping,
                toneMappingExposure: 1.5,
              }}
              style={{ background: "transparent" }}
            >
              <Suspense fallback={null}>
                <HeroGlobe />
                <ambientLight intensity={0.08} />
              </Suspense>
            </Canvas>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
