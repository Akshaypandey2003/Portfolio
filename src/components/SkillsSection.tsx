import React, { useState, useEffect } from "react";
import {
  Cpu,
  Database,
  Layers,
  Sparkles,
  Terminal,
  Code2,
  Search,
  CheckCircle2,
  Workflow,
  Zap,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { SkillCategory } from "../types";

interface SkillsSectionProps {
  skillsData: SkillCategory[];
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ skillsData }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeDiagramNode, setActiveDiagramNode] = useState<string>("gateway");

  // Carousel state
  const [carouselIndex, setCarouselIndex] = useState<number>(0);
  const [itemsPerView, setItemsPerView] = useState<number>(3);

  const categories = ["All", ...skillsData.map((c) => c.category)];

  const filteredCategories = skillsData
    .filter(
      (cat) => selectedCategory === "All" || cat.category === selectedCategory,
    )
    .map((cat) => {
      const filteredSkills = cat.skills.filter(
        (skill) =>
          skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          skill.description.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      return { ...cat, skills: filteredSkills };
    })
    .filter((cat) => cat.skills.length > 0);

  // Responsive items-per-view, matching your existing grid breakpoints
  // (grid-cols-1 -> md:grid-cols-2 -> lg:grid-cols-3)
  useEffect(() => {
    const computeItemsPerView = () => {
      const width = window.innerWidth;
      if (width >= 1024) return 3; // lg
      if (width >= 768) return 2; // md
      return 1; // base
    };

    const handleResize = () => setItemsPerView(computeItemsPerView());

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Reset carousel position whenever the filtered list or items-per-view changes,
  // so we never end up pointing past the end of the array
  useEffect(() => {
    setCarouselIndex(0);
  }, [selectedCategory, searchQuery, itemsPerView]);

  const maxIndex = Math.max(0, filteredCategories.length - itemsPerView);

  const handlePrev = () => {
    setCarouselIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCarouselIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const visibleCategories = filteredCategories.slice(
    carouselIndex,
    carouselIndex + itemsPerView,
  );

  const showCarouselControls = filteredCategories.length > itemsPerView;

  const diagramNodes: Record<
    string,
    {
      title: string;
      subtitle: string;
      color: string;
      description: string;
      connectsTo: string;
    }
  > = {
    react: {
      title: "React 19 & TS Client",
      subtitle: "Dynamic UI & Telemetry",
      color: "border-cyan-500/40 text-cyan-300 bg-cyan-500/10",
      description:
        "Dispatches REST API calls, renders live SSE AI streams, and displays sub-second WebSocket telemetry dashboards.",
      connectsTo: "Spring Cloud API Gateway",
    },
    gateway: {
      title: "Spring Cloud Gateway",
      subtitle: "Security & Rate Limiting",
      color: "border-sky-500/40 text-sky-300 bg-sky-500/10",
      description:
        "Terminates SSL, validates JWT tokens, applies token-bucket rate limiting, and routes requests to domain microservices.",
      connectsTo: "Spring Boot Microservices Cluster",
    },
    microservices: {
      title: "Spring Boot Microservices",
      subtitle: "Java 21 Domain Services",
      color: "border-emerald-500/40 text-emerald-300 bg-emerald-500/10",
      description:
        "Stateless domain services implementing business logic, circuit breakers (Resilience4j), and transaction orchestrators.",
      connectsTo: "Apache Kafka & Redis Cache",
    },
    kafka: {
      title: "Apache Kafka Event Bus",
      subtitle: "Asynchronous Streaming",
      color: "border-indigo-500/40 text-indigo-300 bg-indigo-500/10",
      description:
        "Decoupled publish-subscribe topics guaranteeing high throughput and resilient event processing without locking request threads.",
      connectsTo: "Consumer Groups & Storage",
    },
    redis: {
      title: "Redis Distributed Cache",
      subtitle: "In-Memory Acceleration",
      color: "border-red-500/40 text-red-300 bg-red-500/10",
      description:
        "Cache-Aside and Write-Through caching layer delivering sub-5ms read latencies and session state replication.",
      connectsTo: "PostgreSQL & MongoDB",
    },
    databases: {
      title: "PostgreSQL & MongoDB",
      subtitle: "Polyglot Persistence",
      color: "border-blue-500/40 text-blue-300 bg-blue-500/10",
      description:
        "PostgreSQL handles transactional ACID records & pgvector embeddings; MongoDB stores flexible social graph documents.",
      connectsTo: "End of pipeline",
    },
  };

  return (
    <section id="skills" className="py-20 bg-[#07090e] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-mono font-medium">
            <Cpu size={13} />
            <span>TECHNICAL PROFICIENCY & ECOSYSTEM</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Skills & Technology Matrix
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            A comprehensive overview of backend, distributed streaming,
            database, AI/RAG, and computer science proficiencies built through
            real-world enterprise engineering.
          </p>
        </div>

        {/* Interactive Architecture Relationship Visualizer */}
        <div className="mb-16 rounded-2xl bg-[#0d121f] border border-slate-800 p-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-slate-800 gap-2">
            <div className="flex items-center gap-2">
              <Workflow size={18} className="text-sky-400" />
              <h3 className="text-base font-bold text-white">
                How These Technologies Connect in My Architecture
              </h3>
            </div>
            <span className="text-[11px] font-mono text-slate-400">
              Interactive Data Flow (Click any block)
            </span>
          </div>

          {/* Interactive Pipeline Diagram Blocks */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {Object.entries(diagramNodes).map(([key, node]) => {
              const isActive = activeDiagramNode === key;
              return (
                <button
                  key={key}
                  id={`diagram-node-${key}`}
                  onClick={() => setActiveDiagramNode(key)}
                  className={`p-3 rounded-xl border text-left transition-all relative ${
                    isActive
                      ? `${node.color} shadow-lg shadow-sky-500/15 scale-[1.02]`
                      : "bg-slate-900/50 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700"
                  }`}
                >
                  <div className="text-xs font-bold font-mono truncate">
                    {node.title}
                  </div>
                  <div className="text-[10px] text-slate-400 truncate mt-0.5">
                    {node.subtitle}
                  </div>
                  {isActive && (
                    <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Detailed Inspector for Selected Node */}
          {activeDiagramNode && diagramNodes[activeDiagramNode] && (
            <div className="mt-4 p-4 rounded-xl bg-slate-950/90 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div className="space-y-1">
                <span className="font-mono font-bold text-sky-400 text-sm">
                  {diagramNodes[activeDiagramNode].title}:
                </span>
                <p className="text-slate-300 leading-relaxed">
                  {diagramNodes[activeDiagramNode].description}
                </p>
              </div>
              <div className="shrink-0 font-mono text-[11px] px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
                Next Hop:{" "}
                <span className="text-emerald-400 font-semibold">
                  {diagramNodes[activeDiagramNode].connectsTo}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            {categories.map((category) => (
              <button
                key={category}
                id={`skill-filter-${category.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-sky-500 text-white shadow-sm shadow-sky-500/30"
                    : "bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
            />
            <input
              id="skill-search-input"
              type="text"
              placeholder="Search skill (e.g. Kafka, Redis, JPA)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/80 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-colors"
            />
          </div>
        </div>

        {/* Skills Cards Carousel */}
        <div className="relative">
          {/* Left Arrow */}
          {showCarouselControls && (
            <button
              id="skills-carousel-prev"
              onClick={handlePrev}
              disabled={carouselIndex === 0}
              aria-label="Previous skills"
              className={`hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 z-10 items-center justify-center w-10 h-10 rounded-full border transition-all ${
                carouselIndex === 0
                  ? "bg-slate-900/60 border-slate-800 text-slate-600 cursor-not-allowed"
                  : "bg-slate-900 border-slate-700 text-slate-300 hover:text-white hover:border-sky-500 hover:bg-slate-800 shadow-lg"
              }`}
            >
              <ChevronLeft size={18} />
            </button>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-10 py-5 items-stretch auto-rows-fr">
            {visibleCategories.map((category) => (
              <div
                key={category.category}
                className="rounded-2xl bg-[#0c101b] border border-slate-800/90 p-5 shadow-xl flex flex-col justify-between hover:border-slate-700 transition-all h-[420px]"
              >
                <div className="space-y-4 flex flex-col h-full min-h-0">
                  {/* Category Header */}
                  <div className="pb-3 border-b border-slate-800/80 shrink-0">
                    <h3 className="font-bold text-sm sm:text-base text-white tracking-wide flex items-center justify-between">
                      <span>{category.category}</span>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800/80 text-sky-400 border border-slate-700">
                        {category.skills.length} Skills
                      </span>
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-1 leading-normal">
                      {category.description}
                    </p>
                  </div>

                  {/* Individual Skill Items */}
                  <div className="space-y-3.5 overflow-y-auto pr-1 min-h-0 flex-1 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                    {category.skills.map((skill) => (
                      <div key={skill.name} className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-medium text-slate-200 flex items-center gap-1.5">
                            {skill.highlight && (
                              <Zap
                                size={12}
                                className="text-amber-400 shrink-0"
                              />
                            )}
                            {skill.name}
                          </span>
                          <span className="font-mono text-[11px] text-sky-400 font-semibold">
                            {skill.proficiency}%
                          </span>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full h-1.5 bg-slate-800/90 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full transition-all duration-500"
                            style={{ width: `${skill.proficiency}%` }}
                          />
                        </div>

                        <p className="text-[11px] text-slate-400 leading-tight">
                          {skill.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          {showCarouselControls && (
            <button
              id="skills-carousel-next"
              onClick={handleNext}
              disabled={carouselIndex === maxIndex}
              aria-label="Next skills"
              className={`hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 items-center justify-center w-10 h-10 rounded-full border transition-all ${
                carouselIndex === maxIndex
                  ? "bg-slate-900/60 border-slate-800 text-slate-600 cursor-not-allowed"
                  : "bg-slate-900 border-slate-700 text-slate-300 hover:text-white hover:border-sky-500 hover:bg-slate-800 shadow-lg"
              }`}
            >
              <ChevronRight size={18} />
            </button>
          )}

          {/* Mobile Nav Buttons (below cards, since arrows are hidden on small screens) */}
          {showCarouselControls && (
            <div className="flex md:hidden items-center justify-center gap-3 mt-6">
              <button
                onClick={handlePrev}
                disabled={carouselIndex === 0}
                aria-label="Previous skills"
                className={`flex items-center justify-center w-9 h-9 rounded-full border transition-all ${
                  carouselIndex === 0
                    ? "bg-slate-900/60 border-slate-800 text-slate-600 cursor-not-allowed"
                    : "bg-slate-900 border-slate-700 text-slate-300 hover:text-white hover:border-sky-500"
                }`}
              >
                <ChevronLeft size={16} />
              </button>

              {/* Dots indicator */}
              <div className="flex items-center gap-1.5">
                {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                  <span
                    key={i}
                    className={`w-1.5 h-1.5 rounded-full transition-all ${
                      i === carouselIndex ? "bg-sky-400 w-4" : "bg-slate-700"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                disabled={carouselIndex === maxIndex}
                aria-label="Next skills"
                className={`flex items-center justify-center w-9 h-9 rounded-full border transition-all ${
                  carouselIndex === maxIndex
                    ? "bg-slate-900/60 border-slate-800 text-slate-600 cursor-not-allowed"
                    : "bg-slate-900 border-slate-700 text-slate-300 hover:text-white hover:border-sky-500"
                }`}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
