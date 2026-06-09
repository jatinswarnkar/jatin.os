"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";

// API integration handles responses

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function AIPlaygroundSection() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Welcome to JATIN.OS AI interface. Ask me anything about Jatin's experience, skills, or projects.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsTyping(true);

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json", "anthropic-version": "2023-06-01", "x-api-key": process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY || "" },
        body: JSON.stringify({
          model: "claude-3-haiku-20240307",
          max_tokens: 250,
          system: `You are JATIN.OS, an AI assistant for Jatin Swarnkar's portfolio website.
Answer ONLY questions about Jatin. Be concise (2-3 sentences max). Be specific and factual.

JATIN'S BACKGROUND:
- Role: Software Engineer at Perceptiviti Data Solutions, Gurgaon (July 2025–Present)
- Previously: Software Engineer Intern at same company (Nov 2024–June 2025)
- Education: B.Tech Computer Science, Bennett University, CGPA 8.97, May 2025

KEY WORK:
- Built NL-to-SQL analytics copilot: LangChain + Azure OpenAI + PostgreSQL, 25+ datasets, 60% efficiency gain
- Case Management System with RBAC and row-level locking
- Fraud Detection Platform backend
- Multithreaded Oracle→MySQL ETL pipelines
- Intern: automated reports (2 days→2 hours), AWS/Azure deployments, Sherlock AI rules

SKILLS: Python, Django, DRF, LangChain, LangGraph, Azure OpenAI, Azure AI Foundry, FAISS, RAG, MCP, PostgreSQL, MySQL, Oracle, AWS, Azure, ETL, Git, Linux

PROJECTS:
1. AI Interview Copilot — LangGraph multi-agent: resume analysis, JD matching, skill-gap detection, question generation, learning roadmaps. Stack: LangGraph, Azure OpenAI, FAISS, Django, PostgreSQL, React. Demo: https://interview-copilot-frontend.onrender.com/
2. Highlightly — AI video highlights: Whisper transcription, HuggingFace emotion analysis, FFmpeg clipping, Azure Blob storage. Stack: Django, OpenAI Whisper, HuggingFace, FFmpeg. Demo: https://highlightly-demo.azurewebsites.net/
3. Chat Sphere — Django Channels WebSocket chat with Redis and PostgreSQL

OPEN TO: AI Engineer and Software Engineer roles, India or Remote.
CONTACT: jatinswarnkar04@gmail.com | linkedin.com/in/jatinswarnkar`,
          messages: [{ role: "user", content: userMessage }],
        }),
      });

      const data = await response.json();
      const reply =
        data.content?.[0]?.text ||
        "I couldn't process that request. Try asking about Jatin's experience, skills, or projects.";

      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Connection error. Try asking: 'What did Jatin build at Perceptiviti?' or 'What is the AI Interview Copilot?'",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <SectionWrapper id="playground">
      {/* Section heading */}
      <div className="text-center mb-12">
        <h2
          className="text-4xl md:text-5xl font-bold text-white mb-4"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          AI Playground
        </h2>
        <p className="text-base md:text-lg max-w-xl mx-auto mt-3" style={{ color: "rgba(255,255,255,0.5)" }}>
          Live AI — ask about experience, skills, or projects
        </p>
        <div
          className="w-20 h-[2px] mx-auto mt-6"
          style={{
            background:
              "linear-gradient(90deg, transparent, #8B5CF6, transparent)",
          }}
        />
      </div>

      {/* Playground Interface */}
      <div className="relative w-full sm:w-[95%] md:w-5/6 lg:w-3/4 mx-auto px-2 sm:px-4 md:px-8 mt-8 md:mt-12">
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.03)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {/* Header */}
          <div
            className="px-5 py-3 flex items-center gap-3"
            style={{
              background: "rgba(255,255,255,0.03)",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/60" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <span className="w-3 h-3 rounded-full bg-green-500/60" />
            </div>
            <span
              className="text-xs ml-2"
              style={{
                color: "rgba(255,255,255,0.4)",
                fontFamily: "var(--font-space-grotesk)",
              }}
            >
              jatin.os/ai-assistant
            </span>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="h-[300px] md:h-[360px] lg:h-[400px] overflow-y-auto p-3 sm:p-5 space-y-4"
          >
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className="max-w-[90%] md:max-w-[85%] px-3 py-2 sm:px-4 sm:py-3 rounded-xl text-xs sm:text-sm leading-relaxed"
                  style={{
                    background:
                      msg.role === "user"
                        ? "rgba(0,217,255,0.1)"
                        : "rgba(255,255,255,0.05)",
                    border: `1px solid ${
                      msg.role === "user"
                        ? "rgba(0,217,255,0.2)"
                        : "rgba(255,255,255,0.06)"
                    }`,
                    color: "rgba(255,255,255,0.75)",
                  }}
                >
                  {msg.content}
                </div>
              </motion.div>
            ))}

            {/* Typing indicator */}
            <AnimatePresence>
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex justify-start"
                >
                  <div
                    className="px-4 py-3 rounded-xl flex gap-1"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="w-2 h-2 rounded-full"
                        style={{ background: "rgba(0,217,255,0.5)" }}
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="px-5 py-3"
            style={{
              borderTop: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div
              className="flex items-center gap-3 rounded-xl px-4 py-2.5"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="e.g. What did Jatin build at Perceptiviti?"
                className="flex-1 bg-transparent outline-none text-sm"
                style={{ color: "rgba(255,255,255,0.8)" }}
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="px-4 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer disabled:opacity-30"
                style={{
                  background: "rgba(0,217,255,0.15)",
                  border: "1px solid rgba(0,217,255,0.3)",
                  color: "#00D9FF",
                }}
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </SectionWrapper>
  );
}
