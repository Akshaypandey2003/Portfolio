import React, { useState, useEffect } from "react";
import {
  Sparkles,
  FileText,
  Github,
  Linkedin,
  Menu,
  X,
  Cpu,
  Layers,
  Terminal,
  MessageSquare,
  Award,
  Mail,
  User,
  Sun,
  Moon,
} from "lucide-react";

interface NavbarProps {
  onOpenResume: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenResume,
  isDarkMode,
  onToggleTheme,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sections = [
        "hero",
        "about",
        "experience",
        "skills",
        "projects",
        "architecture",
        "ai-assistant",
        "achievements",
        "contact",
      ];

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "About", href: "#about", icon: User },
    { label: "Experience", href: "#experience", icon: Terminal },
    { label: "Skills", href: "#skills", icon: Cpu },
    { label: "Projects", href: "#projects", icon: Layers },
    { label: "System Design", href: "#architecture", icon: Cpu },
    { label: "Ask AI", href: "#ai-assistant", icon: Sparkles, highlight: true },
    { label: "Achievements", href: "#achievements", icon: Award },
    { label: "Contact", href: "#contact", icon: Mail },
  ];

  return (
    <nav
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#07090e]/90 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/40 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#hero"
          id="navbar-brand-logo"
          className="flex items-center gap-2.5 group"
        >
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-sky-400 via-indigo-500 to-cyan-400 p-[1.5px] shadow-sm shadow-sky-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#07090e] rounded-[7px] flex items-center justify-center">
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300 text-sm tracking-wider">
                AP
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sm tracking-tight text-white group-hover:text-sky-300 transition-colors">
              Akshay Pandey
            </span>
            <span className="text-[11px] text-slate-400 font-mono tracking-wider">
              Full Stack Java & AI
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-1 bg-slate-900/60 border border-slate-800/80 rounded-full px-3 py-1.5 backdrop-blur-sm">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.replace("#", "");
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                id={`nav-link-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                href={item.href}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 flex items-center gap-1.5 ${
                  item.highlight
                    ? isActive
                      ? "bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-md shadow-sky-500/30"
                      : "text-sky-400 hover:text-white hover:bg-sky-500/10 border border-sky-500/30"
                    : isActive
                    ? "bg-slate-800 text-white shadow-sm"
                    : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                }`}
              >
                <Icon
                  size={13}
                  className={item.highlight ? "text-sky-300 animate-pulse" : ""}
                />
                {item.label}
              </a>
            );
          })}
        </div>

        {/* Right CTA Actions */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Social Links */}
          <a
            id="nav-github-link"
            href="https://github.com/Akshaypandey2003"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub Profile"
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 border border-slate-800/60 transition-colors"
          >
            <Github size={16} />
          </a>
          <a
            id="nav-linkedin-link"
            href="https://www.linkedin.com/in/akshay-pandey-547829221/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn Profile"
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 border border-slate-800/60 transition-colors"
          >
            <Linkedin size={16} />
          </a>

          {/* Theme Toggle */}
          <button
            id="nav-theme-toggle-btn"
            onClick={onToggleTheme}
            aria-label="Toggle Theme"
            className="p-2 rounded-lg text-slate-400 hover:text-amber-300 hover:bg-slate-800/60 border border-slate-800/60 transition-colors"
          >
            {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {/* Resume Button */}
          {/* <button
            id="nav-resume-btn"
            onClick={onOpenResume}
            className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-sky-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <FileText size={14} />
            <span>Resume</span>
          </button> */}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            id="mobile-theme-toggle-btn"
            onClick={onToggleTheme}
            aria-label="Toggle Theme"
            className="p-2 rounded-lg text-slate-400 hover:text-white border border-slate-800"
          >
            {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="p-2 rounded-lg text-slate-300 hover:text-white bg-slate-900 border border-slate-800"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          className="lg:hidden bg-[#0a0f1d] border-b border-slate-800 px-4 pt-3 pb-6 mt-3 space-y-2 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200"
        >
          <div className="grid grid-cols-2 gap-2 pt-2 pb-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  id={`mobile-nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`p-2.5 rounded-lg text-xs font-medium flex items-center gap-2 border ${
                    item.highlight
                      ? "bg-sky-500/10 border-sky-500/40 text-sky-300"
                      : "bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <Icon size={14} className={item.highlight ? "text-sky-400" : "text-slate-400"} />
                  {item.label}
                </a>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-800/80 flex items-center gap-2">
            <button
              id="mobile-view-resume-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="flex-1 py-2.5 rounded-lg bg-gradient-to-r from-sky-500 to-indigo-600 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md shadow-sky-500/20"
            >
              <FileText size={14} />
              <span>View & Download Resume</span>
            </button>
            <a
              id="mobile-github-btn"
              href="https://github.com/Akshaypandey2003"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            >
              <Github size={16} />
            </a>
            <a
              id="mobile-linkedin-btn"
              href="https://linkedin.com/in/akshay-pandey-547829221"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            >
              <Linkedin size={16} />
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};
