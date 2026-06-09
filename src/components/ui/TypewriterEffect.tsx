"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

interface TypewriterEffectProps {
  strings: readonly string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseDuration?: number;
  className?: string;
}

export default function TypewriterEffect({
  strings,
  typeSpeed = 60,
  deleteSpeed = 30,
  pauseDuration = 2000,
  className = "",
}: TypewriterEffectProps) {
  const [currentStringIndex, setCurrentStringIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const tick = useCallback(() => {
    const fullText = strings[currentStringIndex];

    if (isPaused) return;

    if (!isDeleting) {
      // Typing
      if (currentText.length < fullText.length) {
        setCurrentText(fullText.slice(0, currentText.length + 1));
      } else {
        // Finished typing — pause
        setIsPaused(true);
        setTimeout(() => {
          setIsPaused(false);
          setIsDeleting(true);
        }, pauseDuration);
      }
    } else {
      // Deleting
      if (currentText.length > 0) {
        setCurrentText(fullText.slice(0, currentText.length - 1));
      } else {
        // Finished deleting — move to next
        setIsDeleting(false);
        setCurrentStringIndex((prev) => (prev + 1) % strings.length);
      }
    }
  }, [
    currentText,
    currentStringIndex,
    isDeleting,
    isPaused,
    strings,
    pauseDuration,
  ]);

  useEffect(() => {
    const speed = isDeleting ? deleteSpeed : typeSpeed;
    const timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [tick, isDeleting, typeSpeed, deleteSpeed]);

  return (
    <span className={className}>
      <span className="text-[rgba(255,255,255,0.5)]">&gt; </span>
      {currentText}
      <motion.span
        className="inline-block w-[2px] h-[1.1em] ml-1 align-middle"
        style={{ background: "#00D9FF" }}
        animate={{ opacity: [1, 0] }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
    </span>
  );
}
