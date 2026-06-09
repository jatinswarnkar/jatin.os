// ============================================
// JATIN.OS — All content data & types
// Source of truth: /content/*.md
// ============================================

// --- Types ---

export interface ExperienceEntry {
  year: string;
  role: string;
  company: string;
  duration: string;
  highlights: string[];
}

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  capabilities: string[];
  architecture?: string[];
  hasScreenshots?: boolean;
  demoUrl?: string;
  githubUrl?: string;
}

export interface SkillNode {
  name: string;
  category: "core" | "ai" | "database" | "cloud" | "tools";
}

export interface SocialLink {
  label: string;
  url: string;
  icon: string;
}

export interface AIArchitectureNode {
  id: string;
  label: string;
  description: string;
}

// --- Content ---

export const PERSONAL = {
  name: "Jatin Swarnkar",
  roles: ["AI Engineer", "Software Engineer"],
  tagline: "AI Engineer. Backend Systems. LLM Pipelines.",
  about:
    "AI Engineer with 1+ year building production LangChain agents, RAG pipelines, and NL-to-SQL systems at Perceptiviti Data Solutions. Experienced in backend engineering with Django, PostgreSQL, and cloud deployments on AWS and Azure. Passionate about agentic AI workflows and intelligent data systems.",
  location: "India",
  availability: "Open to AI Engineer and Software Engineer roles — India / Remote",
} as const;

export const TYPING_STRINGS = [
  "Building NL-to-SQL Pipelines",
  "Designing Multi-Agent Systems",
  "Building RAG-Powered Applications",
  "Engineering Self-Healing AI Agents",
  "Deploying Cloud-Native Backends",
] as const;

export const CURRENT_FOCUS = [
  "LangGraph Agents",
  "AI Systems",
  "Cloud Platforms",
  "Retrieval-Augmented Generation",
] as const;

export const AI_ARCHITECTURE_NODES: AIArchitectureNode[] = [
  {
    id: "user-question",
    label: "User Question",
    description:
      "Natural language query from the analyst seeking data insights.",
  },
  {
    id: "planner",
    label: "Planner",
    description:
      "Orchestrates the query pipeline, determines required steps and data sources.",
  },
  {
    id: "schema-retrieval",
    label: "Schema Retrieval",
    description:
      "Retrieves relevant database schema context using vector similarity search.",
  },
  {
    id: "sql-generator",
    label: "SQL Generator",
    description:
      "Generates optimized SQL queries from natural language using LLM with schema context.",
  },
  {
    id: "query-execution",
    label: "Query Execution",
    description:
      "Executes generated SQL against PostgreSQL and returns raw result sets.",
  },
  {
    id: "self-healing",
    label: "Self-Healing",
    description:
      "Automatically detects and corrects SQL errors through iterative LLM-based correction.",
  },
  {
    id: "chart-generation",
    label: "Chart Generation",
    description:
      "Dynamically generates visualizations based on query results and data patterns.",
  },
  {
    id: "insights",
    label: "Insights",
    description:
      "Produces actionable insights and summaries from data analysis results.",
  },
];

export const EXPERIENCE: ExperienceEntry[] = [
  {
    year: "2025",
    role: "Software Engineer",
    company: "Perceptiviti Data Solutions",
    duration: "July 2025 – Present · Gurgaon, India",
    highlights: [
      "Built an AI-powered natural language-to-SQL platform using LangChain, Azure AI Foundry, and Azure OpenAI — analysts can query 25+ relational datasets in plain English, improving efficiency by 60%",
      "Implemented self-healing SQL correction, context-aware schema retrieval, token-based conversational memory, and dynamic chart generation in the analytics copilot pipeline",
      "Developed a configurable Case Management System with RBAC, multi-stage audit workflows, bulk PostgreSQL processing, and concurrency-safe transitions using row-level locking",
      "Optimized backend APIs for the analytics platform using Django REST Framework and PostgreSQL — improved maintainability and system performance across 8+ endpoints",
      "Contributed to the core Fraud Detection Platform — implemented backend features and optimized database operations on high-volume transaction data",
      "Built multithreaded ETL pipelines for Oracle → transformation → MySQL, reducing data migration time significantly",
    ],
  },
  {
    year: "2024",
    role: "Software Engineer Intern",
    company: "Perceptiviti Data Solutions",
    duration: "Nov 2024 – June 2025 · Gurgaon, India · (Converted to full-time)",
    highlights: [
      "Automated 3 manual reporting workflows using Python — reduced generation time from 2 days to under 2 hours, eliminating repetitive manual tasks",
      "Configured and deployed applications across AWS (RDS) and Microsoft Azure (VMs, PostgreSQL Flexible Server) to improve deployment and data accessibility",
      "Developed custom detection rules for Sherlock's rule-based AI using Python and MySQL, tailoring fraud detection solutions to client requirements",
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    title: "AI Interview Copilot",
    description: "A LangGraph multi-agent system that analyzes resumes against job descriptions, detects skill gaps, generates targeted interview questions, and builds personalized learning roadmaps — all in one orchestrated pipeline.",
    technologies: [
      "LangGraph",
      "Azure OpenAI",
      "FAISS",
      "RAG",
      "Django",
      "PostgreSQL",
      "React",
    ],
    capabilities: [
      "Resume Analysis",
      "JD Analysis",
      "Skill Gap Detection",
      "Interview Question Generation",
      "Learning Roadmaps",
    ],
    architecture: [
      "Resume + Job Description",
      "Resume Agent",
      "JD Agent",
      "Gap Agent",
      "Question Agent",
      "Roadmap Agent",
    ],
    hasScreenshots: true,
    demoUrl: "https://interview-copilot-frontend.onrender.com/",
    githubUrl: "https://github.com/jatinswarnkar/AI_interview_prep",
  },
  {
    title: "Highlightly",
    description: "An AI video pipeline that transcribes content with OpenAI Whisper, scores segments using emotion, visual, and audio analysis via HuggingFace, then auto-clips and stores highlights to Azure Blob Storage.",
    technologies: [
      "OpenAI Whisper",
      "HuggingFace",
      "FFmpeg",
      "Django",
      "Tailwind CSS",
    ],
    capabilities: [
      "Transcription",
      "Emotion Analysis",
      "Scene Detection",
      "Audio Peak Analysis",
      "Automatic Clipping",
    ],
    architecture: [
      "User Request (Django UI)",
      "Asynchronous Hand-off",
      "Data Preparation (yt-dlp + FFmpeg)",
      "Scoring Pipeline (Visual, Audio, AI)",
      "Highlight Generation",
      "Cloud Storage (Azure Blob)",
    ],
    hasScreenshots: true,
    demoUrl: "https://highlightly-demo.azurewebsites.net/",
    githubUrl: "https://github.com/jatinswarnkar/Highlightly-AI-powered-YouTube-video-highlights-generator",
  },
  {
    title: "Chat Sphere",
    description: "A Django Channels WebSocket application demonstrating real-time room broadcasting, online presence tracking, and message persistence via Redis channel layers and PostgreSQL.",
    technologies: [
      "Django",
      "Django Channels",
      "WebSockets",
      "Redis",
      "Python",
      "JavaScript",
    ],
    capabilities: [
      "Real-time Messaging",
      "Room-based Broadcasting",
      "Online User Tracking",
      "Message Persistence",
    ],
    architecture: [
      "Client (WebSockets)",
      "Django Channels (ASGI)",
      "Redis Channel Layer",
      "Django ORM",
      "PostgreSQL / SQLite",
    ],
    hasScreenshots: false,
    githubUrl: "https://github.com/jatinswarnkar/realtime_chat_app",
  },
];

export const CENTER_SKILL: SkillNode = {
  name: "Python",
  category: "core",
};

export const ORBITING_SKILLS: SkillNode[] = [
  // Ring 1 — Core (closest)
  { name: "Django", category: "core" },
  { name: "DRF", category: "core" },

  // Ring 2 — AI/ML
  { name: "LangChain", category: "ai" },
  { name: "LangGraph", category: "ai" },
  { name: "Azure OpenAI", category: "ai" },
  { name: "FAISS", category: "ai" },

  // Ring 3 — Database
  { name: "PostgreSQL", category: "database" },
  { name: "MySQL", category: "database" },
  { name: "Oracle", category: "database" },

  // Ring 4 — Cloud + Tools
  { name: "AWS", category: "cloud" },
  { name: "Azure", category: "cloud" },
  { name: "Git", category: "tools" },
  { name: "Linux", category: "tools" },
];

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: "GitHub",
    url: "https://github.com/jatinswarnkar",
    icon: "github",
  },
  {
    label: "LinkedIn",
    url: "https://linkedin.com/in/jatinswarnkar",
    icon: "linkedin",
  },
  {
    label: "Email",
    url: "mailto:jatinswarnkar04@gmail.com",
    icon: "email",
  },
  {
    label: "Resume",
    url: "/assets/Resume_Jatin_Swarnkar.pdf",
    icon: "resume",
  },
];

export const FOOTER_TERMINAL = [
  { command: "whoami", output: ["Software Engineer", "AI Engineer", "Backend Developer"] },
  {
    command: "currently_building",
    output: ["LangGraph Agents", "AI Systems", "Cloud Platforms"],
  },
];
