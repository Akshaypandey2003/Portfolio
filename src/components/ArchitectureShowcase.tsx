import React, { useState } from "react";
import {
  Cpu,
  Zap,
  Layers,
  Database,
  Shield,
  Activity,
  Play,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Server,
  RefreshCw,
} from "lucide-react";
import { ArchitectureNode } from "../types";

interface ArchitectureShowcaseProps {
  nodes: ArchitectureNode[];
}

export const ArchitectureShowcase: React.FC<ArchitectureShowcaseProps> = ({
  nodes,
}) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>("gateway");
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simulatedStep, setSimulatedStep] = useState<number>(-1);

  const simulationSteps = [
    { id: "client", name: "1. Client Request", desc: "User triggers trip creation with JWT token" },
    { id: "gateway", name: "2. API Gateway", desc: "Validates JWT signature & applies rate limiter" },
    { id: "service", name: "3. Microservice", desc: "Executes business validation & starts transaction" },
    { id: "cache", name: "4. Redis Cache", desc: "Checks hot session data (<2ms read)" },
    { id: "messaging", name: "5. Kafka Event Bus", desc: "Publishes TRIP_CREATED event for background workers" },
    { id: "database", name: "6. PostgreSQL / Mongo", desc: "Persists durable state & updates indexes" },
  ];

  const handleSimulate = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSimulatedStep(0);

    const stepInterval = setInterval(() => {
      setSimulatedStep((prev) => {
        if (prev >= simulationSteps.length - 1) {
          clearInterval(stepInterval);
          setTimeout(() => {
            setIsSimulating(false);
            setSimulatedStep(-1);
          }, 1200);
          return prev;
        }
        const next = prev + 1;
        setSelectedNodeId(simulationSteps[next].id);
        return next;
      });
    }, 1100);
  };

  const selectedNode =
    nodes.find((n) => n.id === selectedNodeId) || nodes[0] || {
      id: "gateway",
      name: "API Gateway (Spring Cloud Gateway)",
      type: "gateway",
      description:
        "Central entry point providing SSL termination, JWT authentication filter chains, token-bucket rate limiting, and dynamic service routing.",
      rationale:
        "Protects internal microservices from direct public exposure, unifies cross-cutting concerns (CORS, security, logging), and eliminates repetitive auth logic.",
      connections: ["Auth Service", "User Service", "Trip Service"],
    };

  return (
    <section id="architecture" className="py-20 bg-[#07090e] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-mono font-medium">
            <Cpu size={13} />
            <span>HOW I THINK ABOUT SYSTEMS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Interactive Distributed System Design
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Click any architectural layer to inspect design decisions, trade-offs, cache invalidation policies, and resilience mechanics under load.
          </p>
        </div>

        {/* System Simulation & Diagram Container */}
        <div className="rounded-2xl bg-[#0c111e] border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-8">
          {/* Top Control Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div className="space-y-1">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Server size={18} className="text-sky-400" />
                <span>Enterprise Distributed Microservices Pipeline</span>
              </h3>
              <p className="text-xs text-slate-400">
                Click any component below or trigger a simulated live request
              </p>
            </div>

            <button
              id="simulate-request-flow-btn"
              onClick={handleSimulate}
              disabled={isSimulating}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                isSimulating
                  ? "bg-sky-500/20 text-sky-300 border border-sky-500/40 cursor-wait"
                  : "bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white shadow-md shadow-sky-500/20 hover:scale-[1.02]"
              }`}
            >
              {isSimulating ? (
                <>
                  <RefreshCw size={14} className="animate-spin" />
                  <span>Simulating Request Flow ({simulatedStep + 1}/6)...</span>
                </>
              ) : (
                <>
                  <Play size={14} />
                  <span>Simulate End-to-End Request</span>
                </>
              )}
            </button>
          </div>

          {/* Visual Architecture Topology Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {nodes.map((node, index) => {
              const isSelected = selectedNodeId === node.id;
              const isCurrentStep =
                isSimulating && simulationSteps[simulatedStep]?.id === node.id;

              return (
                <button
                  key={node.id}
                  id={`arch-node-${node.id}`}
                  onClick={() => setSelectedNodeId(node.id)}
                  className={`p-4 rounded-xl border text-left flex flex-col justify-between transition-all relative ${
                    isCurrentStep
                      ? "bg-sky-500/30 border-sky-400 text-white shadow-lg shadow-sky-500/30 scale-105"
                      : isSelected
                      ? "bg-slate-900 border-sky-500/60 text-white shadow-md"
                      : "bg-slate-900/40 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900/70"
                  }`}
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-sky-400">
                      Layer 0{index + 1}
                    </span>
                    <h4 className="text-xs font-bold text-white leading-tight">
                      {node.name.split("(")[0]}
                    </h4>
                  </div>

                  <div className="mt-4 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span>{node.type}</span>
                    {isSelected && (
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Node Deep Dive Inspector */}
          <div className="rounded-xl bg-slate-950/90 border border-slate-800/90 p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
              <div>
                <span className="text-[11px] font-mono text-sky-400 font-semibold uppercase">
                  ARCHITECTURE COMPONENT DEEP DIVE
                </span>
                <h4 className="text-lg font-bold text-white mt-0.5">
                  {selectedNode.name}
                </h4>
              </div>
              <span className="px-3 py-1 rounded-lg text-xs font-mono bg-slate-900 border border-slate-700 text-slate-300">
                Type: {selectedNode.type}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="space-y-1">
                  <span className="text-xs font-mono font-bold text-slate-400 uppercase">
                    Role & Operational Responsibility:
                  </span>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {selectedNode.description}
                  </p>
                </div>

                <div className="space-y-1 pt-2">
                  <span className="text-xs font-mono font-bold text-sky-400 uppercase">
                    Downstream Connections & Targets:
                  </span>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {selectedNode.connections.map((target) => (
                      <span
                        key={target}
                        className="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-900 border border-slate-800 text-slate-300"
                      >
                        &rarr; {target}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold font-mono text-emerald-400">
                  <CheckCircle2 size={14} />
                  <span>ENGINEERING RATIONALE & TRADE-OFFS</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {selectedNode.rationale}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
