import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "JATIN.OS — AI Engineer & Software Engineer",
  description:
    "Software Engineer with experience in backend systems, AI-powered applications, cloud infrastructure, and data engineering. Building intelligent systems, analytics copilots, and agentic AI workflows.",
  keywords: [
    "AI Engineer",
    "Software Engineer",
    "LangGraph",
    "LangChain",
    "Python",
    "Portfolio",
    "Jatin Swarnkar",
  ],
  authors: [{ name: "Jatin Swarnkar" }],
  openGraph: {
    title: "JATIN.OS — AI Engineer & Software Engineer",
    description:
      "Building Intelligent Systems. AI-powered applications, cloud infrastructure, and agentic AI workflows.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}
    >
      <body className="min-h-screen bg-[#050816]">{children}</body>
    </html>
  );
}
