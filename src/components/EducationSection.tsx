import React from "react";
import { GraduationCap, Calendar, MapPin, Award, BookOpen } from "lucide-react";

export const EducationSection: React.FC = () => {
  return (
    <section id="education" className="py-16 bg-[#090d18] relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl bg-[#0e1424] border border-slate-800/90 p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="p-3.5 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-400 shrink-0">
                <GraduationCap size={28} />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-white">
                    Bachelor of Technology (B.Tech) in Information Technology
                  </h3>
                </div>
                <div className="text-sm font-semibold text-sky-400">
                  Lakshmi Narain College of Technology (LNCT), Bhopal
                </div>
                <p className="text-xs text-slate-400">
                  Rigorous foundation in Data Structures, Algorithms, Operating Systems, Database Management Systems, Object-Oriented Software Design, and Distributed Networks.
                </p>
              </div>
            </div>

            <div className="flex sm:flex-col items-center sm:items-end gap-2 shrink-0 font-mono text-xs text-slate-300">
              <span className="px-3 py-1.5 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/40 font-bold text-sm">
                CGPA: 8.35 / 10.0
              </span>
              <span className="text-slate-400 text-[11px]">
                Graduation: 2024
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
