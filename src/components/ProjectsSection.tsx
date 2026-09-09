import React, { useState } from "react";
import {
  Layers,
  ArrowRight,
  ExternalLink,
  Github,
  Zap,
  Cpu,
  Sparkles,
  Shield,
  Activity,
  CheckCircle2,
} from "lucide-react";
import { Project } from "../types";
import { ProjectModal } from "./ProjectModal";

interface ProjectsSectionProps {
  projects: Project[];
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-20 bg-[#090d18] relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-mono font-medium">
            <Layers size={13} />
            <span>FEATURED SYSTEMS & CASE STUDIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Featured Engineering Projects
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Production-grade systems showcasing asynchronous Kafka event streaming, distributed Redis caching, microservice circuit breakers, and Spring AI RAG architectures.
          </p>
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {projects.map((project) => (
            <div
              key={project.id}
              id={`project-card-${project.id}`}
              className="rounded-2xl bg-[#0e1424] border border-slate-800/90 shadow-xl flex flex-col justify-between overflow-hidden hover:border-sky-500/40 transition-all hover:scale-[1.01] group"
            >
              <div className="p-6 space-y-5">
                {/* Project Category & Status */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-md bg-sky-500/10 text-sky-300 border border-sky-500/30">
                    {project.category}
                  </span>
                  {/* <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Production Ready
                  </span> */}
                </div>

                {/* Title & Tagline */}
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-white group-hover:text-sky-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-sky-400 font-medium font-mono">
                    {project.tagline}
                  </p>
                </div>

                {/* Summary */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-4">
                  {project.summary}
                </p>

                {/* Architecture Visual Preview Box */}
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 font-mono text-[11px] space-y-1.5">
                  <div className="text-slate-400 font-bold flex items-center gap-1.5">
                    <Cpu size={13} className="text-sky-400" />
                    <span>SYSTEM FLOW:</span>
                  </div>
                  <div className="text-slate-300 text-[11px] leading-tight line-clamp-2">
                    {project.architecture.flow[0]} &rarr; {project.architecture.flow[1]}
                  </div>
                </div>

                {/* Key Tech Stack Badges */}
                <div className="space-y-2">
                  <span className="text-[11px] font-mono text-slate-400 font-semibold block">
                    Core Technologies:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 6).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-900 border border-slate-800 text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 6 && (
                      <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-900 text-sky-400 border border-slate-800">
                        +{project.technologies.length - 6} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-6 pt-0">
                <button
                  id={`view-details-${project.id}-btn`}
                  onClick={() => setSelectedProject(project)}
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-sky-600/20 text-sky-300 hover:text-sky-200 border border-slate-800 hover:border-sky-500/50 text-xs font-semibold flex items-center justify-center gap-2 transition-all"
                >
                  <span>Inspect System Architecture</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Deep-Dive Project Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
