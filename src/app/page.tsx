"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import BootScreen from "@/components/boot/BootScreen";
import HeroSection from "@/components/hero/HeroSection";
import Navbar from "@/components/nav/Navbar";
import MetricsSection from "@/components/metrics/MetricsSection";
import AIArchitectureSection from "@/components/architecture/AIArchitectureSection";
import ExperienceSection from "@/components/experience/ExperienceSection";
import ProjectsSection from "@/components/projects/ProjectsSection";
import AIPlaygroundSection from "@/components/playground/AIPlaygroundSection";
import ContactSection from "@/components/contact/ContactSection";
import TerminalFooter from "@/components/footer/TerminalFooter";

// Lazy load heavy 3D components
const NeuralBackground = dynamic(
  () => import("@/components/background/NeuralBackground"),
  { ssr: false }
);

const SkillsSection = dynamic(
  () => import("@/components/skills/SkillsSection"),
  { ssr: false }
);

export default function Home() {
  const [booted, setBooted] = useState(false);

  const handleBootComplete = useCallback(() => {
    setBooted(true);
  }, []);

  return (
    <>
      {/* Boot Screen */}
      <AnimatePresence mode="wait">
        {!booted && <BootScreen onBootComplete={handleBootComplete} />}
      </AnimatePresence>

      {/* Main Application — only after boot */}
      {booted && (
        <>
          {/* Neural Network Background — fixed behind everything */}
          <NeuralBackground />

          {/* Navigation */}
          <Navbar />

          {/* Content Layer */}
          <motion.div
            className="content-layer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            {/* 1. Hero */}
            <HeroSection />

            {/* 2. Metrics Dashboard */}
            <MetricsSection />

            {/* 3. AI Analytics Architecture */}
            <AIArchitectureSection />

            {/* 4. Experience Timeline */}
            <ExperienceSection />

            {/* 5. Projects */}
            <ProjectsSection />

            {/* 6. Tech Radar (Skills) */}
            <SkillsSection />

            {/* 7. AI Playground */}
            <AIPlaygroundSection />

            {/* 8. Contact */}
            <ContactSection />

            {/* 9. Terminal Footer */}
            <TerminalFooter />
          </motion.div>
        </>
      )}
    </>
  );
}
