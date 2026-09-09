import React, { useState } from "react";
import {
  Briefcase,
  Calendar,
  MapPin,
  TrendingDown,
  Zap,
  ShieldCheck,
  CheckCircle2,
  Terminal,
  Activity,
  Layers,
} from "lucide-react";
import { Experience } from "../types";

interface ExperienceSectionProps {
  experience: Experience[];
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  experience,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const currentJob = experience[0] || {
    id: "tcs-java-dev",
    company: "Tata Consultancy Services (TCS)",
    role: "Java Developer / Software Engineer",
    duration: "July 2024 – Present",
    location: "India",
    type: "Full-Time",
    impactMetrics: [
      { metric: "40%", label: "Processing Latency Reduction" },
      { metric: "25%", label: "API Response Time Improvement" },
      { metric: "99.9%", label: "Service Uptime with Circuit Breakers" },
    ],
    responsibilities: [
      "Engineered scalable RESTful microservices and enterprise backend services using Java 21, Spring Boot, and Spring Security.",
      "Decoupled synchronous request-response bottlenecks by migrating core workflows to asynchronous, event-driven pipelines using Apache Kafka topics and partition consumer groups.",
      "Engineered distributed caching strategies with Redis (Read-Through, Cache-Aside, and TTL management), reducing database query overhead and boosting API response times by 25%.",
      "Analyzed and tuned complex SQL queries in PostgreSQL and MySQL, achieving a 40% reduction in end-to-end data processing latency.",
      "Implemented Resilience4j Circuit Breaker, Retry, and Rate Limiting patterns to isolate downstream dependencies and eliminate cascading failures.",
      "Built stateless authentication & authorization filters using Spring Security with JSON Web Tokens (JWT) and role-based access control (RBAC).",
      "Developed WebSocket feeds for high-throughput live telemetry monitoring and sub-second anomaly inspection.",
      "Containerized microservice components using multi-stage Docker builds and coordinated automated JUnit 5 & Mockito test suites.",
    ],
    technologies: [
      "Java 21",
      "Spring Boot 3",
      "Spring Security",
      "Apache Kafka",
      "Redis",
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "Docker",
      "WebSockets",
      "JUnit 5",
      "Mockito",
    ],
  };

  return (
    <section id="experience" className="py-20 bg-[#090d18] relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-medium">
            <Briefcase size={13} />
            <span>ENTERPRISE ENGINEERING TRACK RECORD</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Professional Experience
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Hands-on enterprise Java development solving mission-critical distributed systems challenges and optimizing latency across real-world microservice workloads.
          </p>
        </div>

        {/* Experience Timeline Card */}
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl bg-[#0e1424] border border-slate-800/90 shadow-2xl p-6 sm:p-8 relative overflow-hidden">
            {/* Header / Company Info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800/80 gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2.5">
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {currentJob.role}
                  </h3>
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 font-semibold">
                    CURRENT ROLE
                  </span>
                </div>
                <div className="text-base font-semibold text-sky-400">
                  {currentJob.company}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1.5 bg-slate-900/80 px-2.5 py-1.5 rounded-lg border border-slate-800">
                  <Calendar size={13} className="text-sky-400" />
                  {currentJob.duration}
                </span>
                <span className="flex items-center gap-1.5 bg-slate-900/80 px-2.5 py-1.5 rounded-lg border border-slate-800">
                  <MapPin size={13} className="text-emerald-400" />
                  {currentJob.location}
                </span>
              </div>
            </div>

            {/* Measurable Impact Metric Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-6">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-sky-500/30 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-1.5 text-sky-400 font-mono text-2xl font-extrabold">
                  <TrendingDown size={20} />
                  <span>40%</span>
                </div>
                <div className="text-xs font-medium text-slate-300 mt-1">
                  Processing Latency Reduced
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Via SQL index profiling & Kafka async decoupling
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-emerald-500/30 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-1.5 text-emerald-400 font-mono text-2xl font-extrabold">
                  <Zap size={20} />
                  <span>25%</span>
                </div>
                <div className="text-xs font-medium text-slate-300 mt-1">
                  Faster API Response Times
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Through Redis Cache-Aside & TTL tuning
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-purple-500/30 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-1.5 text-purple-400 font-mono text-2xl font-extrabold">
                  <ShieldCheck size={20} />
                  <span>99.9%</span>
                </div>
                <div className="text-xs font-medium text-slate-300 mt-1">
                  Resilience & Uptime
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Zero cascading faults via Resilience4j
                </div>
              </div>
            </div>

            {/* Core Responsibilities Checklist */}
            <div className="space-y-3 my-6">
              <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                Key Contributions & Engineering Responsibilities
              </h4>
              <div className="grid grid-cols-1 gap-2.5">
                {currentJob.responsibilities.map((resp, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3 rounded-lg bg-slate-900/40 border border-slate-800/80 text-xs sm:text-sm text-slate-300 leading-relaxed"
                  >
                    <CheckCircle2 size={16} className="text-sky-400 shrink-0 mt-0.5" />
                    <span>{resp}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technologies Applied */}
            <div className="pt-4 border-t border-slate-800/80">
              <span className="text-xs font-mono text-slate-400 block mb-2 font-semibold">
                Technologies & Tools in Production:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {currentJob.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-800/80 border border-slate-700 text-slate-300 font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
