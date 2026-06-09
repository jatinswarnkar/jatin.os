"use client";

import { useState } from "react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import { PROJECTS, type Project } from "@/lib/constants";

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <SectionWrapper id="projects">
        {/* Section heading */}
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Projects
          </h2>
          <p className="text-base md:text-lg max-w-xl mx-auto mt-3" style={{ color: "rgba(255,255,255,0.5)" }}>
            AI-powered systems built with cutting-edge technology
          </p>
          <div
            className="w-20 h-[2px] mx-auto mt-6"
            style={{
              background:
                "linear-gradient(90deg, transparent, #8B5CF6, transparent)",
            }}
          />
        </div>

        {/* Project Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full mx-auto px-4 md:px-8">
          {PROJECTS.map((project, index) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              description={project.description}
              technologies={project.technologies}
              capabilities={project.capabilities}
              demoUrl={project.demoUrl}
              githubUrl={project.githubUrl}
              index={index}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </SectionWrapper>

      {/* Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}
