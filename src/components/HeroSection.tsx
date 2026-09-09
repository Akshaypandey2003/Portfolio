import React, { useState, useEffect } from "react";
import { Aws } from '@lobehub/icons';
import {
  Sparkles,
  ArrowRight,
  FileText,
  Terminal,
  Cpu,
  Zap,
  ShieldCheck,
  CheckCircle2,
  Database,
  Activity,
  Layers,
  Code2,
} from "lucide-react";
import { Profile } from "../types";

interface HeroSectionProps {
  profile: Profile | null;
  onOpenResume: () => void;
}

const ROLES = [
  "Full Stack Java Developer",
  "Distributed Systems Engineer",
  "Spring Boot & Microservices Specialist",
  "Spring AI & RAG Architect",
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  profile,
  onOpenResume,
}) => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedRole, setDisplayedRole] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [activeTelemetryNode, setActiveTelemetryNode] =
    useState<string>("kafka");

  // Typewriter effect for roles
  useEffect(() => {
    const currentFullRole = ROLES[roleIndex];
    const typingSpeed = isDeleting ? 35 : 70;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayedRole(
          currentFullRole.substring(0, displayedRole.length + 1),
        );
        if (displayedRole === currentFullRole) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setDisplayedRole(
          currentFullRole.substring(0, displayedRole.length - 1),
        );
        if (displayedRole === "") {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % ROLES.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedRole, isDeleting, roleIndex]);

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] pt-28 pb-16 flex items-center justify-center overflow-hidden bg-grid-pattern"
    >
      {/* Radiant Glow Lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-radial-glow pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[350px] bg-radial-violet pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Hero Narrative & Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Status pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-sky-500/30 text-sky-300 text-xs font-medium backdrop-blur-md shadow-sm shadow-sky-500/10">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for High-Impact Software Engineering Roles</span>
            </div>

            {/* Main Greeting & Name */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Hello, I'm{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-300 to-cyan-300">
                  {profile?.name || "Akshay Pandey"}
                </span>
              </h1>

              {/* Dynamic Animated Role */}
              <div className="h-10 sm:h-12 flex items-center justify-center lg:justify-start">
                <p className="text-lg sm:text-2xl font-semibold text-slate-300 font-mono flex items-center">
                  <span className="text-sky-400 mr-2">&gt;</span>
                  <span>{displayedRole}</span>
                  <span className="w-2 h-6 bg-sky-400 ml-1 inline-block animate-pulse" />
                </p>
              </div>
            </div>

            {/* Value Proposition Subtitle */}
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {profile?.summary ||
                "Full Stack Java Developer with ~2 years of experience building resilient microservices, high-throughput event-driven systems with Apache Kafka, sub-second Redis caching, and intelligent Spring AI RAG applications."}
            </p>

            {/* Core Tech Stack Pills */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1">
              {[
                {
                  name: "Java 21",
                  color: "border-amber-500/30 bg-amber-500/10 text-amber-300",
                },
                {
                  name: "Spring Boot 3",
                  color:
                    "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
                },
                {
                  name: "Microservices",
                  color: "border-sky-500/30 bg-sky-500/10 text-sky-300",
                },
                {
                  name: "Apache Kafka",
                  color:
                    "border-indigo-500/30 bg-indigo-500/10 text-indigo-300",
                },
                {
                  name: "Redis",
                  color: "border-red-500/30 bg-red-500/10 text-red-300",
                },
                {
                  name: "React & TS",
                  color: "border-cyan-500/30 bg-cyan-500/10 text-cyan-300",
                },
                {
                  name: "Spring AI & RAG",
                  color:
                    "border-purple-500/30 bg-purple-500/10 text-purple-300",
                },
                {
                  name: "PostgreSQL / pgvector",
                  color: "border-blue-500/30 bg-blue-500/10 text-blue-300",
                },
              ].map((tech) => (
                <span
                  key={tech.name}
                  className={`px-2.5 py-1 rounded-md text-xs font-mono border ${tech.color} font-medium`}
                >
                  {tech.name}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-4">
              <a
                id="hero-view-work-btn"
                href="#projects"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 via-sky-600 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-semibold text-sm flex items-center gap-2 shadow-lg shadow-sky-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>View My Work</span>
                <ArrowRight size={16} />
              </a>

              <a
                id="hero-ask-ai-btn"
                href="#ai-assistant"
                className="px-6 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-sky-300 font-semibold text-sm flex items-center gap-2 border border-sky-500/40 shadow-md shadow-sky-500/10 transition-all hover:border-sky-400 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Sparkles
                  size={16}
                  className="text-sky-400 animate-spin"
                  style={{ animationDuration: "6s" }}
                />
                <span>Ask My AI</span>
              </a>

              <button
                id="hero-download-resume-btn"
                onClick={onOpenResume}
                className="px-5 py-3 rounded-xl bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-white font-medium text-sm flex items-center gap-2 border border-slate-800 transition-colors"
              >
                <FileText size={16} />
                <span>Resume</span>
              </button>
            </div>

            {/* Key Measurable Metric Counters */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-slate-800/80">
              {/* <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800/80 text-left">
                <div className="text-xl sm:text-2xl font-bold text-sky-400 font-mono">40%</div>
                <div className="text-[11px] text-slate-400 font-medium leading-tight mt-0.5">
                  Latency Reduction
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800/80 text-left">
                <div className="text-xl sm:text-2xl font-bold text-emerald-400 font-mono">25%</div>
                <div className="text-[11px] text-slate-400 font-medium leading-tight mt-0.5">
                  Faster API Queries
                </div>
              </div> */}
              <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800/80 text-left">
                {/* <div className="text-xl sm:text-2xl font-bold text-purple-400 font-mono">800+</div> */}
                <div className="flex items-center gap-6">
                  <div className="text-xl sm:text-2xl font-bold text-purple-400 font-mono">
                    800+
                  </div>

                  <div className="flex items-center gap-3.5">
                    <a
                      href="https://leetcode.com/u/rakshaypandey/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LeetCode Profile"
                    >
                      <img
                        src="/logo/leetcode.svg"
                        alt="LeetCode"
                        className="w-5 h-5 object-contain transition-transform duration-200 hover:scale-110"
                      />
                    </a>
                    <a
                      href="https://www.geeksforgeeks.org/profile/rakshaypandey"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GeeksforGeeks Profile"
                    >
                      <img
                        src="/logo/geeksforgeeks.svg"
                        alt="GeeksforGeeks"
                        className="w-5 h-5 object-contain transition-transform duration-200 hover:scale-110"
                      />
                    </a>
                  </div>
                </div>
                <div className="text-[11px] text-slate-400 font-medium leading-tight mt-0.5">
                  DSA Problems Solved
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800/80 text-left">
                <div className="flex items-center gap-6">
                 
                  <div className="flex items-center gap-3.5">
                    <a
                      href="https://www.credly.com/badges/5f69d81d-a53d-4b8f-9dee-bbf187dcc26e/linked_in?t=sy5k4v"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LeetCode Profile"
                    >
                    <Aws size={31} className="text-amber-400" />
                    </a>
                  </div>
                </div>
                <div className="text-[11px] text-slate-400 font-medium leading-tight mt-0.5">
                  Cloud Certified
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Developer Representation & Microservice Telemetry Console */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Decorative Ambient Outer Ring */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-sky-500 via-indigo-500 to-cyan-500 rounded-3xl opacity-30 blur-xl animate-pulse" />

              {/* Main Technical Frame */}
              <div className="relative rounded-2xl bg-[#0c101b] border border-slate-800/90 shadow-2xl p-5 overflow-hidden">
                {/* Header Terminal Bar */}
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800/80">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
                    <Activity
                      size={12}
                      className="text-sky-400 animate-pulse"
                    />
                    <span>system.telemetry.live</span>
                  </div>
                </div>

                {/* Developer Avatar & Microservice Nodes */}
                <div className="relative p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col items-center justify-center text-center overflow-hidden">
                  {/* Background grid lines */}
                  <div className="absolute inset-0 bg-grid-pattern opacity-40" />

                  {/* High-Craft Developer Tech Avatar Icon */}
                  <div className="relative z-10 w-28 h-28 rounded-2xl bg-gradient-to-tr from-slate-900 via-[#131b2e] to-slate-800 p-1 border border-sky-500/40 shadow-inner flex items-center justify-center mb-3">
                    <div className="w-full h-full rounded-[14px] bg-[#07090e] flex flex-col items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-radial-glow opacity-50" />
                      <Code2 size={42} className="text-sky-400 mb-1" />
                      <span className="text-[10px] font-mono font-bold text-slate-300 tracking-wider">
                        AKSHAY.DEV
                      </span>
                    </div>
                  </div>

                  {/* Engineer Identity Details */}
                  <div className="relative z-10 space-y-1">
                    <h2 className="text-base font-bold text-white tracking-wide">
                      Akshay Pandey
                    </h2>
                    <p className="text-xs text-sky-400 font-mono">
                      Tata Consultancy Services (TCS)
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Java 21 • Spring Boot 3 • Kafka • Redis • React
                    </p>
                  </div>
                </div>

                {/* Interactive Telemetry Node Selector */}
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 px-1">
                    <span>LIVE PIPELINE TELEMETRY</span>
                    <span className="text-emerald-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      ONLINE
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <button
                      id="node-kafka-btn"
                      onClick={() => setActiveTelemetryNode("kafka")}
                      className={`p-2 rounded-lg text-left text-xs border transition-all ${
                        activeTelemetryNode === "kafka"
                          ? "bg-sky-500/20 border-sky-500/60 text-white shadow-sm"
                          : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      <div className="font-mono font-semibold flex items-center gap-1">
                        <Zap size={11} className="text-sky-400" />
                        Kafka
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        10k events/s
                      </div>
                    </button>

                    <button
                      id="node-redis-btn"
                      onClick={() => setActiveTelemetryNode("redis")}
                      className={`p-2 rounded-lg text-left text-xs border transition-all ${
                        activeTelemetryNode === "redis"
                          ? "bg-red-500/20 border-red-500/60 text-white shadow-sm"
                          : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      <div className="font-mono font-semibold flex items-center gap-1">
                        <Database size={11} className="text-red-400" />
                        Redis
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        &lt;2ms latency
                      </div>
                    </button>

                    <button
                      id="node-ai-btn"
                      onClick={() => setActiveTelemetryNode("ai")}
                      className={`p-2 rounded-lg text-left text-xs border transition-all ${
                        activeTelemetryNode === "ai"
                          ? "bg-purple-500/20 border-purple-500/60 text-white shadow-sm"
                          : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      <div className="font-mono font-semibold flex items-center gap-1">
                        <Sparkles size={11} className="text-purple-400" />
                        Spring AI
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        RAG pgvector
                      </div>
                    </button>
                  </div>

                  {/* Telemetry Node Detail Inspector */}
                  <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800/80 text-[11px] font-mono text-slate-300">
                    {activeTelemetryNode === "kafka" && (
                      <div>
                        <span className="text-sky-400 font-bold">
                          [Kafka Cluster]:
                        </span>{" "}
                        Asynchronous event partitions handling decoupled booking
                        & telemetry feeds. Zero cascading failures.
                      </div>
                    )}
                    {activeTelemetryNode === "redis" && (
                      <div>
                        <span className="text-red-400 font-bold">
                          [Redis In-Memory]:
                        </span>{" "}
                        Cache-Aside strategy reducing SQL query frequency by
                        60%, delivering sub-5ms responses.
                      </div>
                    )}
                    {activeTelemetryNode === "ai" && (
                      <div>
                        <span className="text-purple-400 font-bold">
                          [Spring AI + pgvector]:
                        </span>{" "}
                        Cosine similarity ranking with markdown ETL chunking for
                        zero-hallucination assistant.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
