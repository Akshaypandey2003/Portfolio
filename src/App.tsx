import React, { useState, useEffect } from "react";
import {
  Profile,
  Project,
  SkillCategory,
  Experience,
  Achievement,
  ArchitectureNode,
} from "./types";
import {
  fetchProfile,
  fetchProjects,
  fetchSkills,
  fetchExperience,
  fetchAchievements,
  fetchArchitecture,
} from "./services/api";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { AboutSection } from "./components/AboutSection";
import { ExperienceSection } from "./components/ExperienceSection";
import { SkillsSection } from "./components/SkillsSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { ArchitectureShowcase } from "./components/ArchitectureShowcase";
import { AiAssistantSection } from "./components/AiAssistantSection";
import { AchievementsSection } from "./components/AchievementsSection";
import { EducationSection } from "./components/EducationSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { ResumeModal } from "./components/ResumeModal";

export default function App() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<SkillCategory[]>([]);
  const [experience, setExperience] = useState<Experience[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [architecture, setArchitecture] = useState<ArchitectureNode[]>([]);
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadPortfolioData() {
      try {
        const [
          profileData,
          projectsData,
          skillsData,
          expData,
          achievementsData,
          archData,
        ] = await Promise.allSettled([
          fetchProfile(),
          fetchProjects(),
          fetchSkills(),
          fetchExperience(),
          fetchAchievements(),
          fetchArchitecture(),
        ]);

        if (profileData.status === "fulfilled") setProfile(profileData.value);
        if (projectsData.status === "fulfilled") setProjects(projectsData.value);
        if (skillsData.status === "fulfilled") setSkills(skillsData.value);
        if (expData.status === "fulfilled") setExperience(expData.value);
        if (achievementsData.status === "fulfilled") setAchievements(achievementsData.value);
        if (archData.status === "fulfilled") setArchitecture(archData.value);
      } catch (err) {
        console.error("Error loading portfolio data:", err);
      } finally {
        setIsLoading(false);
      }
    }

    loadPortfolioData();
  }, []);

  const handleToggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-[#07090e] text-slate-100" : "bg-slate-950 text-slate-100"}`}>
      {/* Top Sticky Navigation */}
      <Navbar
        onOpenResume={() => setIsResumeOpen(true)}
        isDarkMode={isDarkMode}
        onToggleTheme={handleToggleTheme}
      />

      {/* Main Content Sections */}
      <main id="main-content">
        {/* 1. Hero Section */}
        <HeroSection
          profile={profile}
          onOpenResume={() => setIsResumeOpen(true)}
        />

        {/* 2. About & Philosophy Section */}
        <AboutSection profile={profile} />

        {/* 3. Experience Timeline (TCS) */}
        <ExperienceSection experience={experience} />

        {/* 4. Skills & Technical Matrix */}
        <SkillsSection skillsData={skills} />

        {/* 5. Featured Projects & Case Studies (TRAVO, Root Cause Drilldown, RAG) */}
        <ProjectsSection projects={projects} />

        {/* 6. System Design Visualizer (How I Think About Systems) */}
        <ArchitectureShowcase nodes={architecture} />

        {/* 7. Grounded AI Portfolio Assistant (RAG Pipeline) */}
        <AiAssistantSection />

        {/* 8. Key Achievements & Certifications */}
        <AchievementsSection achievements={achievements} />

        {/* 9. Academic Foundation */}
        <EducationSection />

        {/* 10. Contact & Connectivity */}
        <ContactSection />
      </main>

      {/* Engineering Footer */}
      <Footer />

      {/* Interactive Resume View & Download Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        profile={profile}
        experience={experience}
        achievements={achievements}
      />
    </div>
  );
}
