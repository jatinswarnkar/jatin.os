"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Playground", href: "#playground" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      // Show/hide based on scroll direction
      if (currentY > lastScrollY && currentY > 100) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      setScrolled(currentY > 50);
      setLastScrollY(currentY);

      // Detect active section
      const sections = NAV_LINKS.map((l) => l.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as any }}
          className="fixed top-0 left-0 right-0 z-50"
          style={{
            background: scrolled
              ? "rgba(5,8,22,0.8)"
              : "transparent",
            backdropFilter: scrolled ? "blur(20px)" : "none",
            borderBottom: scrolled
              ? "1px solid rgba(255,255,255,0.06)"
              : "1px solid transparent",
            transition: "background 0.4s ease, backdrop-filter 0.4s ease, border-bottom 0.4s ease",
          }}
        >
          <div className="section-container flex items-center justify-between px-6 py-3">
            {/* Logo */}
            <a
              href="#hero"
              className="text-lg font-bold tracking-tight"
              style={{
                fontFamily: "var(--font-space-grotesk), monospace",
                backgroundImage: "linear-gradient(135deg, #00D9FF 0%, #8B5CF6 50%, #00D9FF 100%)",
                backgroundSize: "200% 200%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "gradient-shift 6s ease infinite",
                textShadow: "0 0 20px rgba(0,217,255,0.3)",
              }}
            >
              JATIN.OS
            </a>

            {/* Nav links — desktop */}
            <div className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="relative text-sm font-medium transition-colors duration-300"
                  style={{
                    fontFamily: "var(--font-space-grotesk)",
                    color:
                      activeSection === link.href.slice(1)
                        ? "#00D9FF"
                        : "rgba(255,255,255,0.5)",
                  }}
                >
                  {link.label}

                  {/* Active indicator */}
                  {activeSection === link.href.slice(1) && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-[2px]"
                      style={{
                        background: "#00D9FF",
                        boxShadow: "0 0 8px rgba(0,217,255,0.5)",
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </a>
              ))}
            </div>

            {/* Status indicator */}
            <div className="hidden md:flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full"
                style={{
                  background: "#00D9FF",
                  boxShadow: "0 0 8px rgba(0,217,255,0.5)",
                }}
              />
              <span
                className="text-xs"
                style={{
                  color: "rgba(255,255,255,0.3)",
                  fontFamily: "var(--font-space-grotesk)",
                }}
              >
                System Active
              </span>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white focus:outline-none p-2"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile menu dropdown */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden overflow-hidden"
                style={{
                  background: "rgba(5,8,22,0.95)",
                  backdropFilter: "blur(20px)",
                  borderTop: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div className="flex flex-col px-6 py-4 space-y-4">
                  {NAV_LINKS.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-sm font-medium py-2"
                      style={{
                        fontFamily: "var(--font-space-grotesk)",
                        color:
                          activeSection === link.href.slice(1)
                            ? "#00D9FF"
                            : "rgba(255,255,255,0.7)",
                      }}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
