"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";

// Pre-configured Q&A about Jatin — demo mode (no API calls)
const DEMO_QA: Record<string, string> = {
  default:
    "I'm JATIN.OS AI assistant. I can answer questions about Jatin's experience, skills, and projects. Try asking about his work with AI, backend systems, or specific technologies.",
  experience:
    "Jatin is a Software Engineer at Perceptiviti Data Solutions with experience in backend systems, AI-powered applications, and cloud infrastructure. He has built an AI Analytics Copilot using LangChain, Azure AI Foundry, and Azure OpenAI that improved analyst efficiency by 60%. He also built Case Management Systems with RBAC and multi-stage workflows, ETL Pipelines with multithreaded execution, and Fraud Detection Platforms.",
  skills:
    "Jatin's core language is Python, with expertise in Django & DRF. In AI/ML: LangChain, LangGraph, Azure OpenAI, FAISS, RAG. Databases: PostgreSQL, MySQL, Oracle. Cloud: AWS, Azure. He has strong experience with ETL pipelines, multithreading, and building production-grade AI agents.",
  projects:
    "Two key projects: 1) AI Interview Copilot — a multi-agent platform using LangGraph, Azure OpenAI, FAISS, and RAG for resume analysis, skill gap detection, and interview question generation. 2) Highlightly — an AI-powered video highlights generator using OpenAI Whisper, HuggingFace, and FFmpeg for transcription, emotion analysis, and automatic clipping.",
  copilot:
    "The AI Analytics Copilot is Jatin's flagship project at Perceptiviti. It uses LangChain and Azure OpenAI to convert natural language questions into SQL queries with a self-healing mechanism. The pipeline includes: Planner → Schema Retrieval → SQL Generation → Query Execution → Self-Healing → Chart Generation → Insights. It improved analyst efficiency by 60% across 25+ datasets.",
};

function matchResponse(query: string): string {
  const q = query.toLowerCase();
  if (q.includes("experience") || q.includes("work") || q.includes("job"))
    return DEMO_QA.experience;
  if (
    q.includes("skill") ||
    q.includes("tech") ||
    q.includes("stack") ||
    q.includes("python")
  )
    return DEMO_QA.skills;
  if (q.includes("project") || q.includes("built") || q.includes("build"))
    return DEMO_QA.projects;
  if (
    q.includes("copilot") ||
    q.includes("analytics") ||
    q.includes("ai agent") ||
    q.includes("langchain")
  )
    return DEMO_QA.copilot;
  return DEMO_QA.default;
}

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

    // Simulate streaming delay
    setIsTyping(true);
    const response = matchResponse(userMessage);

    // Simulate streaming character by character
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: response },
      ]);
    }, 800 + Math.random() * 500);
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
          Chat with an AI assistant trained on Jatin&apos;s resume and experience
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
      <div className="relative w-full lg:w-3/4 mx-auto px-4 md:px-8 mt-12">
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
            className="h-[360px] overflow-y-auto p-5 space-y-4"
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
                  className="max-w-[85%] px-4 py-3 rounded-xl text-sm leading-relaxed"
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
                placeholder="Ask about Jatin's experience..."
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
            <p
              className="text-[10px] mt-2 text-center"
              style={{ color: "rgba(255,255,255,0.2)" }}
            >
              Demo mode — responses are pre-configured. V2 will include RAG +
              OpenAI integration.
            </p>
          </form>
        </div>
      </div>
    </SectionWrapper>
  );
}
