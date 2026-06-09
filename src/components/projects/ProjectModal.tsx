"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Project } from "@/lib/constants";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({
  project,
  isOpen,
  onClose,
}: ProjectModalProps) {
  // Close on escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handler);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && project && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: "rgba(5,8,22,0.85)",
              backdropFilter: "blur(10px)",
            }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl"
            style={{
              background: "rgba(10,15,30,0.95)",
              backdropFilter: "blur(30px)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center z-10 cursor-pointer"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
              aria-label="Close modal"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                stroke="rgba(255,255,255,0.5)"
                strokeWidth="1.5"
              >
                <path d="M1 1L13 13M13 1L1 13" />
              </svg>
            </button>

            <div className="p-8">
              {/* Title */}
              <h2
                className="text-3xl font-bold mb-2 gradient-text"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {project.title}
              </h2>

              <p
                className="text-base mb-6"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                {project.description}
              </p>

              {/* Action Links */}
              <div className="flex flex-wrap gap-4 mb-8">
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:bg-white/5"
                    style={{
                      background: "rgba(0,217,255,0.1)",
                      border: "1px solid rgba(0,217,255,0.3)",
                      color: "#00D9FF",
                    }}
                  >
                    View Demo
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:bg-white/5"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.15)",
                      color: "rgba(255,255,255,0.8)",
                    }}
                  >
                    GitHub Repository
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                )}
              </div>

              {/* Architecture Diagram */}
              {project.architecture && (
                <div className="mb-8">
                  <h3
                    className="text-sm uppercase tracking-wider mb-4"
                    style={{
                      color: "rgba(0,217,255,0.7)",
                      fontFamily: "var(--font-space-grotesk)",
                    }}
                  >
                    Architecture
                  </h3>

                  <div className="flex flex-col items-center gap-2">
                    {project.architecture.map((step, i) => (
                      <div key={i} className="flex flex-col items-center">
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                          className="px-5 py-2.5 rounded-xl text-center text-sm"
                          style={{
                            background: "rgba(0,217,255,0.06)",
                            border: "1px solid rgba(0,217,255,0.15)",
                            color: "rgba(255,255,255,0.8)",
                            fontFamily: "var(--font-space-grotesk)",
                          }}
                        >
                          {step}
                        </motion.div>
                        {i < project.architecture!.length - 1 && (
                          <svg
                            width="10"
                            height="14"
                            viewBox="0 0 10 14"
                            className="my-1"
                          >
                            <path
                              d="M5 0L5 10M5 10L2 7M5 10L8 7"
                              stroke="rgba(0,217,255,0.3)"
                              strokeWidth="1.5"
                              fill="none"
                            />
                          </svg>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Capabilities */}
              <div className="mb-6">
                <h3
                  className="text-sm uppercase tracking-wider mb-3"
                  style={{
                    color: "rgba(139,92,246,0.7)",
                    fontFamily: "var(--font-space-grotesk)",
                  }}
                >
                  Capabilities
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {project.capabilities.map((cap, i) => (
                    <motion.div
                      key={cap}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.05 }}
                      className="flex items-center gap-2 text-sm"
                      style={{ color: "rgba(255,255,255,0.6)" }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ background: "#8B5CF6" }}
                      />
                      {cap}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div>
                <h3
                  className="text-sm uppercase tracking-wider mb-3"
                  style={{
                    color: "rgba(0,217,255,0.7)",
                    fontFamily: "var(--font-space-grotesk)",
                  }}
                >
                  Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
