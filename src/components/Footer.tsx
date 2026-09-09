import React from "react";
import { Github, Linkedin, Mail, Heart, ArrowUp, Code2, Sparkles } from "lucide-react";

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#05070c] border-t border-slate-900 py-12 text-slate-400 text-xs font-mono relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-sky-400 to-indigo-600 flex items-center justify-center text-white font-bold text-xs">
            AP
          </div>
          <div>
            <div className="font-semibold text-white font-sans text-sm">
              Akshay Pandey
            </div>
            <div className="text-[11px] text-slate-500">
              Full Stack Java Developer & Distributed Systems Architect
            </div>
          </div>
        </div>

        {/* System Architecture Tag */}
        <div className="text-center sm:text-left text-[11px] text-slate-500">
          Crafted with Java 21, Spring Boot 3, React 19, Kafka, Redis & Spring AI RAG
        </div>

        {/* Back to top and socials */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/akshaypandey-dev"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub Profile"
            className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
          >
            <Github size={15} />
          </a>
          <a
            href="https://linkedin.com/in/akshay-pandey-dev"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn Profile"
            className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
          >
            <Linkedin size={15} />
          </a>
          <button
            onClick={scrollToTop}
            aria-label="Back to Top"
            className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
            title="Scroll to Top"
          >
            <ArrowUp size={15} />
          </button>
        </div>
      </div>
    </footer>
  );
};
