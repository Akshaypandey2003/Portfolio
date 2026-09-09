import React, { useState } from "react";
import {
  Code2,
  Cpu,
  Zap,
  Sparkles,
  CheckCircle2,
  Layers,
  ArrowRight,
  Terminal,
  Shield,
  Workflow,
} from "lucide-react";
import { Profile } from "../types";

interface AboutSectionProps {
  profile: Profile | null;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ profile }) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const philosophies = profile?.philosophy || [
    {
      title: "Build with Intent",
      description: "Writing clean, maintainable, and self-documenting code strictly applying SOLID principles, clean OOP, and proven Gang of Four design patterns.",
      icon: "Code2",
    },
    {
      title: "Scale Proactively",
      description: "Designing decoupled distributed microservices using asynchronous Kafka event buses, multi-consumer groups, and non-blocking I/O.",
      icon: "Cpu",
    },
    {
      title: "Optimize Rigorously",
      description: "Eliminating latency bottlenecks through multi-level Redis caching, database index profiling (EXPLAIN ANALYZE), and JVM memory tuning.",
      icon: "Zap",
    },
    {
      title: "Learn & Integrate AI",
      description: "Harnessing Spring AI, vector embeddings, and RAG pipelines to make enterprise software intuitively context-aware.",
      icon: "Sparkles",
    },
  ];

  const iconMap: Record<string, React.ReactNode> = {
    Code2: <Code2 size={20} className="text-sky-400" />,
    Cpu: <Cpu size={20} className="text-indigo-400" />,
    Zap: <Zap size={20} className="text-amber-400" />,
    Sparkles: <Sparkles size={20} className="text-purple-400" />,
  };

  const detailedDeepDives = [
    {
      title: "How I Approach Clean Architecture",
      items: [
        "Strict separation of concerns: Controllers -> Services -> Repositories -> Entities -> DTOs.",
        "Dependency Inversion and Interface Segregation for high testability with JUnit 5 & Mockito.",
        "Resilience4j Circuit Breakers to insulate against cascading downstream failures.",
        "Stateless JWT filter chains with Spring Security 6 and fine-grained method authorization.",
      ],
    },
    {
      title: "How I Approach Distributed Scalability",
      items: [
        "Decoupling synchronous request-response bottlenecks via Apache Kafka topics and partition keys.",
        "Designing idempotency keys and transactional outbox patterns to ensure reliable message delivery.",
        "Implementing horizontal pod autoscaling with lightweight container footprints.",
        "Using Spring Cloud Gateway for rate limiting, centralized telemetry, and dynamic routing.",
      ],
    },
    {
      title: "How I Hunt & Eliminate Latency",
      items: [
        "Multi-level caching: In-memory application caches + distributed Redis clusters with TTL invalidation.",
        "Deep query profiling: Analyzing execution plans, composite B-Tree indexes, and table partitions in PostgreSQL.",
        "Concurrency optimization: Utilizing CompletableFuture, Virtual Threads, and parallel streams in Java 21.",
        "Delivered a verified 40% reduction in processing latency across enterprise microservices.",
      ],
    },
    {
      title: "How I Architect AI & RAG Systems",
      items: [
        "End-to-end ETL pipelines: Automated markdown/PDF loaders, semantic chunking, and token budgeting.",
        "Vector database integration with PostgreSQL pgvector (HNSW indexing) and Qdrant.",
        "Strict system prompt engineering to enforce zero-hallucination and grounded portfolio citation.",
        "Seamless provider configuration: Local Ollama (Qwen/Llama3), Google Gemini 3.7 Flash, and OpenAI APIs.",
      ],
    },
  ];

  return (
    <section id="about" className="py-20 bg-[#07090e] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-mono font-medium">
            <Terminal size={13} />
            <span>ENGINEERING PHILOSOPHY & STORY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How I Think About Software & Systems
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            I'm a full-stack engineer deeply fascinated by how high-throughput systems operate under the hood—how microservices communicate asynchronously, how data flows through distributed queues, and how performance can be squeezed from every millisecond.
          </p>
        </div>

        {/* Narrative & Philosophy Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Interactive Philosophy Cards */}
          <div className="lg:col-span-6 space-y-3">
            <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider px-1">
              Core Engineering Pillars (Click to Inspect)
            </h3>

            <div className="space-y-3">
              {philosophies.map((phil, idx) => {
                const isSelected = activeTab === idx;
                return (
                  <div
                    key={phil.title}
                    id={`philosophy-card-${idx}`}
                    onClick={() => setActiveTab(idx)}
                    className={`p-4 sm:p-5 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? "bg-slate-900/90 border-sky-500/60 shadow-lg shadow-sky-500/10 scale-[1.01]"
                        : "bg-slate-900/40 border-slate-800/80 hover:bg-slate-900/60 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`p-2.5 rounded-lg border ${
                          isSelected
                            ? "bg-sky-500/20 border-sky-500/40"
                            : "bg-slate-800/80 border-slate-700"
                        }`}
                      >
                        {iconMap[phil.icon] || <Cpu size={20} className="text-sky-400" />}
                      </div>

                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <h4
                            className={`font-semibold text-sm sm:text-base ${
                              isSelected ? "text-white" : "text-slate-200"
                            }`}
                          >
                            {phil.title}
                          </h4>
                          {isSelected && (
                            <span className="text-[11px] font-mono text-sky-400 flex items-center gap-1">
                              ACTIVE
                              <ArrowRight size={12} />
                            </span>
                          )}
                        </div>
                        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                          {phil.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Technical Deep-Dive Inspector */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl bg-[#0d121f] border border-slate-800 p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-radial-glow opacity-30 pointer-events-none" />

              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-md bg-sky-500/20 text-sky-400">
                    <Workflow size={16} />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-slate-400">ARCHITECTURAL INSPECTOR</span>
                    <h3 className="text-sm sm:text-base font-bold text-white">
                      {detailedDeepDives[activeTab]?.title || "Architectural Principles"}
                    </h3>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded text-[11px] font-mono font-semibold bg-slate-800 text-sky-300 border border-slate-700">
                  PILLAR 0{activeTab + 1}
                </span>
              </div>

              {/* Deep Dive Checklist */}
              <div className="space-y-3.5 my-4">
                {detailedDeepDives[activeTab]?.items.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                    <CheckCircle2 size={16} className="text-sky-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>

              {/* Engineering Quote / Summary Callout */}
              <div className="mt-6 p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 font-mono text-xs text-slate-400 leading-relaxed">
                <span className="text-sky-400 font-bold">Akshay's Rule:</span>{" "}
                "A reliable distributed application is not just about writing code that works in happy paths—it's about anticipating network partitions, cache stamps, and designing self-healing microservices."
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
