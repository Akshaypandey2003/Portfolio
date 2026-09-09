export interface Profile {
  name: string;
  title: string;
  tagline: string;
  yearsOfExperience: string;
  summary: string;
  philosophy: {
    title: string;
    description: string;
    icon: string;
  }[];
  metrics: {
    label: string;
    value: string;
    description: string;
  }[];
  socialLinks: {
    platform: string;
    url: string;
    username: string;
  }[];
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: string;
  featured: boolean;
  technologies: string[];
  summary: string;
  problem: string;
  solution: string;
  architecture: {
    flow: string[];
    description: string;
  };
  keyFeatures: string[];
  metrics: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export interface SkillItem {
  name: string;
  proficiency: number;
  highlight?: boolean;
  description: string;
}

export interface SkillCategory {
  category: string;
  description: string;
  skills: SkillItem[];
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  duration: string;
  location: string;
  type: string;
  impactMetrics: {
    metric: string;
    label: string;
  }[];
  responsibilities: string[];
  technologies: string[];
}

export interface Achievement {
  id: string;
  title: string;
  platform: string;
  category: string;
  description: string;
  icon: string;
  badge: string;
  highlight: boolean;
}

export interface ArchitectureNode {
  id: string;
  name: string;
  type: "client" | "gateway" | "service" | "messaging" | "cache" | "database" | "ai";
  description: string;
  rationale: string;
  connections: string[];
}

export interface ChatSource {
  title: string;
  section: string;
  source?: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  sources?: ChatSource[];
  timestamp: string;
  isStreaming?: boolean;
}

export interface IngestionStatus {
  totalDocuments: number;
  totalChunks: number;
  lastIngestedAt: string;
  vectorStoreType: string;
  sources: string[];
}
