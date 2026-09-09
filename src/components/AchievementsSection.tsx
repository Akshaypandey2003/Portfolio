import React from "react";
import {
  Award,
  Cloud,
  Code2,
  TrendingDown,
  GraduationCap,
  ExternalLink,
  CheckCircle2,
  Star,
  Zap,
} from "lucide-react";
import { Achievement } from "../types";

interface AchievementsSectionProps {
  achievements: Achievement[];
}

export const AchievementsSection: React.FC<AchievementsSectionProps> = ({
  achievements,
}) => {
  const iconMap: Record<string, React.ReactNode> = {
    Code2: <Code2 size={24} className="text-amber-400" />,
    Cloud: <Cloud size={24} className="text-sky-400" />,
    TrendingDown: <TrendingDown size={24} className="text-emerald-400" />,
    GraduationCap: <GraduationCap size={24} className="text-purple-400" />,
  };

  return (
    <section id="achievements" className="py-20 bg-[#07090e] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-medium">
            <Award size={13} />
            <span>CREDENTIALS & RIGOR</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Key Achievements & Certifications
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Demonstrated algorithmic problem solving, cloud architecture certification, production latency optimization, and solid academic foundations.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((item) => (
            <div
              key={item.id}
              id={`achievement-card-${item.id}`}
              className="rounded-2xl bg-[#0d121f] border border-slate-800/90 p-6 shadow-xl flex flex-col justify-between hover:border-slate-700 transition-all hover:scale-[1.02] group"
            >
              <div className="space-y-4">
                {/* Icon & Category Badge */}
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 shadow-inner group-hover:scale-110 transition-transform">
                    {iconMap[item.icon] || <Award size={24} className="text-sky-400" />}
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 font-semibold">
                    {item.badge}
                  </span>
                </div>

                {/* Title & Platform */}
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                    {item.title}
                  </h3>
                  <div className="text-xs font-mono text-sky-400">
                    {item.platform}
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Bottom verification badge */}
              {/* <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
                <CheckCircle2 size={13} />
                <span>Verified Credential</span>
              </div> */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
