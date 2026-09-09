import React from "react";
import {
  X,
  Layers,
  Cpu,
  Zap,
  Github,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Project } from "../types";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
}) => {
  if (!project) return null;

  return (
    <div
      id="project-detail-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="project-detail-modal-container"
        className="bg-[#0b101c] border border-slate-700/90 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl relative p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="project-modal-close-btn"
          onClick={onClose}
          aria-label="Close Modal"
          className="absolute top-5 right-5 p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="space-y-2 pr-10">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono bg-sky-500/10 text-sky-300 border border-sky-500/30">
            <Layers size={12} />
            <span>{project.category}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {project.title}
          </h2>
          <p className="text-sm text-sky-400 font-medium">{project.tagline}</p>
        </div>

        {/* Action Links */}
        <div className="flex flex-wrap items-center gap-3">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white text-xs font-semibold flex items-center gap-2 transition-colors"
            >
              <Github size={15} />
              <span>View Source Code</span>
            </a>
          )}
          <div className="text-xs font-mono text-emerald-400 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
            <CheckCircle2 size={14} />
            <span>Architecture Tested & Deployed</span>
          </div>
        </div>

        {/* Technology Pills */}
        <div className="space-y-1.5">
          <span className="text-xs font-mono text-slate-400 font-semibold block">
            Complete Technology Stack:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-900 border border-slate-800 text-slate-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Problem vs Solution Comparison */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/40 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold font-mono text-rose-400">
              <AlertCircle size={14} />
              <span>THE ENGINEERING CHALLENGE</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {project.problem}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/40 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold font-mono text-emerald-400">
              <CheckCircle2 size={14} />
              <span>ARCHITECTURAL SOLUTION</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {project.solution}
            </p>
          </div>
        </div>

        {/* Architecture Flow Breakdown */}
        <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold font-mono text-sky-400">
              <Cpu size={15} />
              <span>REQUEST LIFECYCLE & DATA FLOW</span>
            </div>
            <span className="text-[11px] font-mono text-slate-400">
              Microservices Sequence
            </span>
          </div>

          <div className="space-y-2 font-mono text-xs">
            {project.architecture.flow.map((step, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-900/70 border border-slate-800/80 text-slate-300"
              >
                <span className="text-sky-400 font-bold shrink-0">0{idx + 1}.</span>
                <span>{step}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-400 italic pt-1">
            {project.architecture.description}
          </p>
        </div>

        {/* Key Features List */}
        <div className="space-y-2.5">
          <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
            Key Features & Implementations
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {project.keyFeatures.map((feat, i) => (
              <div
                key={i}
                className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-900/50 border border-slate-800/80 text-xs text-slate-300"
              >
                <Zap size={13} className="text-amber-400 shrink-0 mt-0.5" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Measurable Performance Metrics */}
        <div className="pt-2 border-t border-slate-800">
          <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-2">
            Performance Metrics & Verification
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {project.metrics.map((metric, i) => (
              <div
                key={i}
                className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-center"
              >
                <span className="text-xs font-mono text-sky-300 font-medium">
                  {metric}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
