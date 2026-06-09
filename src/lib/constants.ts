// ============================================
// JATIN.OS — All content data & types
// Source of truth: /content/*.md
// ============================================

// --- Types ---

export interface Metric {
  label: string;
  value: number;
  suffix: string;
  prefix?: string;
  icon: string;
}

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
  roles: ["Software Engineer", "AI Engineer"],
  tagline: "Building Intelligent Systems",
  about:
    "Software Engineer with experience in backend systems, AI-powered applications, cloud infrastructure, and data engineering. Passionate about building intelligent systems, analytics copilots, and agentic AI workflows.",
  location: "India",
  availability: "Open to Software Engineer and AI Engineer opportunities",
} as const;

export const TYPING_STRINGS = [
  "Building AI Agents",
  "Designing Analytics Copilots",
  "Orchestrating LLM Workflows",
  "Building Cloud-Native Platforms",
] as const;

export const CURRENT_FOCUS = [
  "LangGraph Agents",
  "AI Systems",
  "Cloud Platforms",
  "Retrieval-Augmented Generation",
] as const;

export const METRICS: Metric[] = [
  { label: "Years Experience", value: 1, suffix: "+", icon: "experience" },
  { label: "Efficiency Gain", value: 60, suffix: "%", icon: "efficiency" },
  { label: "Production AI Systems", value: 3, suffix: "+", icon: "ai" },
  { label: "Azure & AWS Platforms", value: 2, suffix: "+", icon: "cloud" },
  { label: "Complex Pipelines", value: 5, suffix: "+", icon: "backend" },
];

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
    duration: "July 2025 – Present",
    highlights: [
      "Built an AI-driven analytics copilot using LangChain, Azure AI Foundry, Azure OpenAI, and PostgreSQL",
      "Implemented Planning, Schema Retrieval, Conversational Memory, Self-Healing SQL Correction, Dynamic Chart Generation",
      "Improved analyst efficiency by 60%",
      "Built Case Management System with RBAC, multi-stage workflows, bulk PostgreSQL processing, row-level locking",
      "Built and optimized Analytics Platform APIs using Django REST Framework",
      "Built backend features and optimized database operations for Fraud Detection Platform",
      "Developed ETL Pipelines: Oracle → Transformation → MySQL with multithreaded execution",
    ],
  },
  {
    year: "2024",
    role: "Software Engineer Intern",
    company: "Perceptiviti Data Solutions",
    duration: "Nov 2024 – June 2025",
    highlights: [
      "Automated reporting process: 2 days → 2 hours",
      "Built custom rules for Sherlock AI",
      "Worked on AWS and Azure deployments",
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    title: "AI Interview Copilot",
    description: "Multi-agent interview preparation platform.",
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
    description: "AI-powered video highlights generator.",
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
    description: "Real-time room-based chat application using WebSockets and Redis channel layers.",
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
  { name: "Django", category: "core" },
  { name: "DRF", category: "core" },
  { name: "LangChain", category: "ai" },
  { name: "LangGraph", category: "ai" },
  { name: "Azure AI Foundry", category: "ai" },
  { name: "Azure OpenAI", category: "ai" },
  { name: "MCP", category: "ai" },
  { name: "PostgreSQL", category: "database" },
  { name: "MySQL", category: "database" },
  { name: "Oracle", category: "database" },
  { name: "FAISS", category: "ai" },
  { name: "RAG", category: "ai" },
  { name: "AWS", category: "cloud" },
  { name: "Azure", category: "cloud" },
  { name: "Git", category: "tools" },
  { name: "Linux", category: "tools" },
  { name: "ETL Pipelines", category: "tools" },
  { name: "Multithreading", category: "tools" },
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
