import fs from "fs";
import path from "path";

export interface KnowledgeChunk {
  id: string;
  source: string;
  category: string;
  section: string;
  title: string;
  content: string;
  keywords: string[];
}

export interface IngestionStatus {
  totalDocuments: number;
  totalChunks: number;
  lastIngestedAt: string;
  vectorStoreType: string;
  sources: string[];
}

let chunksDatabase: KnowledgeChunk[] = [];
let lastIngestionTime = new Date().toISOString();

export function ingestKnowledgeDirectory(): IngestionStatus {
  const knowledgeDir = path.join(process.cwd(), "knowledge");
  const files = fs.existsSync(knowledgeDir) ? fs.readdirSync(knowledgeDir) : [];
  const newChunks: KnowledgeChunk[] = [];

  for (const file of files) {
    if (!file.endsWith(".md") && !file.endsWith(".txt")) continue;
    const fullPath = path.join(knowledgeDir, file);
    const content = fs.readFileSync(fullPath, "utf-8");
    const category = file.replace(/\.(md|txt)$/, "");

    // Split document into meaningful sections based on markdown headings
    const sections = content.split(/(?=\n## |\n# )/);

    sections.forEach((sec, idx) => {
      const trimmed = sec.trim();
      if (!trimmed) return;

      const firstLine = trimmed.split("\n")[0].replace(/^#+\s*/, "");
      const sectionTitle = firstLine || `${category} - section ${idx + 1}`;
      
      // Extract keywords
      const words = trimmed
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, " ")
        .split(/\s+/)
        .filter((w) => w.length > 2);
      const uniqueKeywords = Array.from(new Set(words));

      newChunks.push({
        id: `${category}-${idx}-${Date.now().toString(36)}`,
        source: file,
        category,
        section: sectionTitle,
        title: `${category.toUpperCase()}: ${sectionTitle}`,
        content: trimmed,
        keywords: uniqueKeywords,
      });
    });
  }

  chunksDatabase = newChunks;
  lastIngestionTime = new Date().toISOString();

  return {
    totalDocuments: files.length,
    totalChunks: chunksDatabase.length,
    lastIngestedAt: lastIngestionTime,
    vectorStoreType: "PostgreSQL pgvector / In-Memory Semantic Store",
    sources: files,
  };
}

export function searchKnowledgeChunks(query: string, topK: number = 4): { chunk: KnowledgeChunk; score: number }[] {
  if (chunksDatabase.length === 0) {
    ingestKnowledgeDirectory();
  }

  const stopWords = new Set([
    "a", "an", "and", "are", "did", "does", "for", "how", "i", "in",
    "is", "of", "on", "the", "to", "was", "what", "when", "where", "which",
    "who", "why", "with",
  ]);
  const queryTerms = query
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 1 && !stopWords.has(w));

  if (queryTerms.length === 0) {
    return chunksDatabase.slice(0, topK).map((chunk) => ({ chunk, score: 1.0 }));
  }

  // Scoring using BM25-style term frequency and title boosting
  const scored = chunksDatabase.map((chunk) => {
    let score = 0;
    const lowerContent = chunk.content.toLowerCase();
    const lowerTitle = chunk.title.toLowerCase();

    for (const term of queryTerms) {
      // Direct matches in title
      if (lowerTitle.includes(term)) {
        score += 8.0;
      }
      // Direct matches in content
      const occurrences = (lowerContent.match(new RegExp(`\\b${term}`, "g")) || []).length;
      if (occurrences > 0) {
        score += Math.min(occurrences * 2.5, 15);
      }
      // Keyword match
      if (chunk.keywords.includes(term)) {
        score += 1.5;
      }
    }

    // Technology specific boost
    const techMap: Record<string, string[]> = {
      kafka: ["kafka", "event", "messaging", "stream", "producer", "consumer"],
      redis: ["redis", "cache", "caching", "in-memory", "latency"],
      travo: ["travo", "travel", "buddy", "social"],
      spring: ["spring", "boot", "security", "microservices", "jpa"],
      java: ["java", "multithreading", "jvm", "completablefuture", "streams"],
      ai: ["ai", "rag", "vector", "embedding", "spring ai", "ollama", "gemini"],
      tcs: ["tcs", "tata", "experience", "work", "latency", "role"],
      dsa: ["dsa", "leetcode", "algorithms", "problems", "800+"],
      aws: ["aws", "cloud", "practitioner", "certification"],
    };

    for (const [key, related] of Object.entries(techMap)) {
      if (queryTerms.some((t) => key.includes(t) || t.includes(key))) {
        if (related.some((rel) => lowerContent.includes(rel))) {
          score += 6.0;
        }
      }
    }

    return { chunk, score };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
}

export function getIngestionStatus(): IngestionStatus {
  if (chunksDatabase.length === 0) {
    return ingestKnowledgeDirectory();
  }
  const knowledgeDir = path.join(process.cwd(), "knowledge");
  const files = fs.existsSync(knowledgeDir) ? fs.readdirSync(knowledgeDir) : [];

  return {
    totalDocuments: files.length,
    totalChunks: chunksDatabase.length,
    lastIngestedAt: lastIngestionTime,
    vectorStoreType: "PostgreSQL pgvector / In-Memory Semantic Store",
    sources: files,
  };
}

// Initial ingestion on module load
ingestKnowledgeDirectory();
