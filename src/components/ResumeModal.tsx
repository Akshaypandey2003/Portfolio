import React from "react";
import {
  X,
  Download,
  Printer,
  FileText,
  Briefcase,
  GraduationCap,
  Award,
  Code2,
  CheckCircle2,
  Mail,
  MapPin,
  Linkedin,
  Github,
} from "lucide-react";
import { Profile, Experience, Achievement } from "../types";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: Profile | null;
  experience: Experience[];
  achievements: Achievement[];
}

export const ResumeModal: React.FC<ResumeModalProps> = ({
  isOpen,
  onClose,
  profile,
  experience,
  achievements,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      id="resume-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="resume-modal-container"
        className="bg-[#0b101c] border border-slate-700/90 rounded-2xl w-full max-w-4xl max-h-[92vh] overflow-y-auto shadow-2xl relative p-6 sm:p-10 space-y-8 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <FileText size={20} className="text-sky-400" />
            <h2 className="text-lg font-bold text-white">
              Akshay Pandey – Curriculum Vitae
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="resume-modal-print-btn"
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Printer size={14} />
              <span>Print / PDF</span>
            </button>
            <button
              id="resume-modal-close-btn"
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Printable Resume Canvas */}
        <div className="space-y-6 text-slate-200 text-xs sm:text-sm">
          {/* Header */}
          <div className="text-center space-y-2 pb-6 border-b border-slate-800">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Akshay Pandey
            </h1>
            <p className="text-sm font-semibold text-sky-400">
              Full Stack Java Developer | Software Engineer
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1">
                <Mail size={12} /> akshaypandey.dev@gmail.com
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <MapPin size={12} /> India
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Github size={12} /> github.com/akshaypandey-dev
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Linkedin size={12} /> linkedin.com/in/akshay-pandey-dev
              </span>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="space-y-2">
            <h3 className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider">
              Professional Summary
            </h3>
            <p className="text-slate-300 leading-relaxed">
              Full Stack Java Developer with ~2 years of experience designing and implementing high-throughput distributed architectures, microservices, and asynchronous event streams using Java 21, Spring Boot 3, Apache Kafka, and Redis. Proven track record of reducing latency by 40% and improving API responsiveness by 25% across enterprise workloads. Hands-on expertise in Spring AI RAG applications, SQL query tuning, and cloud-native containerized deployments.
            </p>
          </div>

          {/* Skills Matrix */}
          <div className="space-y-2">
            <h3 className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider">
              Technical Skills
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                <span className="font-mono font-bold text-white">Backend & Core:</span>{" "}
                <span className="text-slate-300">Java 21, Spring Boot 3, Spring Security, Hibernate/JPA, REST APIs, Microservices, WebSockets, Resilience4j</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                <span className="font-mono font-bold text-white">Distributed & Caching:</span>{" "}
                <span className="text-slate-300">Apache Kafka (Event-Driven Architecture), Redis (Cache-Aside, TTL), Spring Cloud Gateway</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                <span className="font-mono font-bold text-white">Databases & AI:</span>{" "}
                <span className="text-slate-300">PostgreSQL (pgvector), MySQL, MongoDB, Spring AI, Vector Embeddings, RAG Architectures</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                <span className="font-mono font-bold text-white">Frontend & DevOps:</span>{" "}
                <span className="text-slate-300">React 19, TypeScript, Tailwind CSS, Docker, Docker Compose, Git, Maven, JUnit 5, Mockito</span>
              </div>
            </div>
          </div>

          {/* Experience */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider">
              Work Experience
            </h3>
            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                <div>
                  <h4 className="font-bold text-white">
                    Java Developer / Software Engineer
                  </h4>
                  <div className="text-xs font-semibold text-sky-400">
                    Tata Consultancy Services (TCS)
                  </div>
                </div>
                <span className="text-xs font-mono text-slate-400">
                  July 2024 – Present
                </span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300 list-disc list-inside leading-relaxed">
                <li>Engineered scalable microservices and RESTful backends using Java 21, Spring Boot, and Spring Security with stateless JWT authorization.</li>
                <li>Migrated core synchronous transaction paths to asynchronous Apache Kafka event queues, improving system throughput and fault tolerance.</li>
                <li>Implemented Redis multi-level caching strategies, achieving a 25% boost in API response latency.</li>
                <li>Analyzed query execution plans in PostgreSQL/MySQL, driving a verified 40% reduction in processing latency.</li>
                <li>Configured Resilience4j Circuit Breakers to insulate services from cascading failure modes.</li>
              </ul>
            </div>
          </div>

          {/* Key Projects */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider">
              Featured Engineering Projects
            </h3>
            <div className="space-y-2.5">
              <div className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between font-semibold text-white">
                  <span>TRAVO – Distributed Travel & Social Network Platform</span>
                  <span className="text-xs font-mono text-sky-400">Microservices Architecture</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Engineered modular microservices (Auth, User, Trip, Chat) with Spring Boot, Kafka event topics, Redis caching, WebSockets for instant messaging, and Resilience4j circuit breakers.
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between font-semibold text-white">
                  <span>Root Cause Drill-Through Telemetry System</span>
                  <span className="text-xs font-mono text-sky-400">Industrial Event Pipeline</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Real-time high-throughput equipment anomaly monitoring using Kafka partitions, PostgreSQL, and sub-second WebSocket drill-down dashboards in React.
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between font-semibold text-white">
                  <span>Spring AI RAG Knowledge Assistant</span>
                  <span className="text-xs font-mono text-sky-400">Spring AI + pgvector</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Automated ETL chunking, cosine vector similarity ranking with PostgreSQL pgvector, and grounded streaming AI chat assistant.
                </p>
              </div>
            </div>
          </div>

          {/* Education & Certifications */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider">
                Education
              </h3>
              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 space-y-0.5">
                <div className="font-bold text-white">B.Tech in Information Technology</div>
                <div className="text-xs text-slate-300">LNCT Bhopal (Graduated 2024)</div>
                <div className="text-xs font-mono text-purple-300 font-semibold">CGPA: 8.35 / 10.0</div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider">
                Certifications & Achievements
              </h3>
              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 space-y-0.5">
                <div className="font-bold text-white">AWS Certified Cloud Practitioner</div>
                <div className="text-xs text-slate-300">800+ Algorithmic DSA Problems Solved</div>
                <div className="text-xs font-mono text-emerald-300 font-semibold">LeetCode & GeeksforGeeks</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
