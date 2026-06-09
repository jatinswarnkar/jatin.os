"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  capabilities: string[];
  demoUrl?: string;
  githubUrl?: string;
  index: number;
  onClick: () => void;
}

export default function ProjectCard({
  title,
  description,
  technologies,
  capabilities,
  demoUrl,
  githubUrl,
  index,
  onClick,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glowX, setGlowX] = useState(50);
  const [glowY, setGlowY] = useState(50);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    setRotateX((y - 0.5) * -10);
    setRotateY((x - 0.5) * 10);
    setGlowX(x * 100);
    setGlowY(y * 100);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlowX(50);
    setGlowY(50);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        delay: index * 0.2,
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="w-full"
      style={{ perspective: "1000px" }}
    >
      <div
        ref={cardRef}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative p-8 rounded-2xl cursor-pointer transition-all duration-300"
        style={{
          background: "rgba(255,255,255,0.04)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.08)",
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transformStyle: "preserve-3d",
          transition: "transform 0.1s ease-out",
        }}
      >
        {/* Mouse glow effect */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(0,217,255,0.08) 0%, transparent 60%)`,
          }}
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Title */}
          <h3
            className="text-2xl font-bold mb-2"
            style={{
              fontFamily: "var(--font-space-grotesk)",
              color: "rgba(255,255,255,0.95)",
            }}
          >
            {title}
          </h3>

          {/* Description */}
          <p
            className="text-sm mb-5"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            {description}
          </p>

          {/* Capabilities */}
          <div className="mb-5">
            <p
              className="text-xs uppercase tracking-wider mb-2"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              Capabilities
            </p>
            <div className="flex flex-wrap gap-2">
              {capabilities.map((cap) => (
                <span
                  key={cap}
                  className="text-xs px-3 py-1 rounded-full"
                  style={{
                    background: "rgba(139,92,246,0.1)",
                    border: "1px solid rgba(139,92,246,0.2)",
                    color: "rgba(139,92,246,0.8)",
                  }}
                >
                  {cap}
                </span>
              ))}
            </div>
          </div>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <span key={tech} className="tech-tag">
                {tech}
              </span>
            ))}
          </div>

          {/* View details indicator & Links */}
          <div className="flex items-center justify-between mt-5">
            <span
              className="text-xs"
              style={{ color: "rgba(0,217,255,0.6)" }}
            >
              Click to view details →
            </span>
            <div className="flex items-center gap-3">
              {demoUrl && (
                <a
                  href={demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-xs font-medium hover:underline transition-all"
                  style={{ color: "#00D9FF" }}
                >
                  Demo ↗
                </a>
              )}
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-xs font-medium hover:underline transition-all"
                  style={{ color: "rgba(255,255,255,0.7)" }}
                >
                  GitHub ↗
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Corner accent */}
        <div
          className="absolute top-0 right-0 w-16 h-16 opacity-20"
          style={{
            background:
              "linear-gradient(225deg, rgba(0,217,255,0.3) 0%, transparent 70%)",
            borderRadius: "0 16px 0 0",
          }}
        />
      </div>
    </motion.div>
  );
}
