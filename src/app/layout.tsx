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
  title: "Jatin Swarnkar — AI Engineer & Software Engineer",
  description:
    "AI Engineer with 1+ year building production LangChain agents, RAG pipelines, and NL-to-SQL systems. Open to AI Engineer and Software Engineer roles.",
  keywords: [
    "AI Engineer", "Software Engineer", "LangGraph", "LangChain",
    "Python", "Django", "RAG", "Azure OpenAI", "Portfolio", "Jatin Swarnkar",
  ],
  authors: [{ name: "Jatin Swarnkar" }],
  openGraph: {
    title: "Jatin Swarnkar — AI Engineer & Software Engineer",
    description:
      "AI Engineer building LangChain agents, RAG pipelines, and NL-to-SQL systems. 1+ year at Perceptiviti Data Solutions.",
    type: "website",
    url: "https://jatin-os.vercel.app",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Jatin Swarnkar — AI Engineer & Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jatin Swarnkar — AI Engineer & Software Engineer",
    description:
      "AI Engineer building LangChain agents, RAG pipelines, and NL-to-SQL systems.",
    images: ["/og-image.png"],
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
