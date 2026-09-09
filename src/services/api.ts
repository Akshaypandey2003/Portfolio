import {
  Profile,
  Project,
  SkillCategory,
  Experience,
  Achievement,
  ArchitectureNode,
  ChatSource,
  IngestionStatus,
} from "../types";

export const API_BASE = "/api/v1";

export async function fetchProfile(): Promise<Profile> {
  const res = await fetch(`${API_BASE}/profile`);
  if (!res.ok) throw new Error("Failed to fetch profile");
  const data = await res.json();
  return data.data;
}

export async function fetchProjects(): Promise<Project[]> {
  const res = await fetch(`${API_BASE}/projects`);
  if (!res.ok) throw new Error("Failed to fetch projects");
  const data = await res.json();
  return data.data;
}

export async function fetchSkills(): Promise<SkillCategory[]> {
  const res = await fetch(`${API_BASE}/skills`);
  if (!res.ok) throw new Error("Failed to fetch skills");
  const data = await res.json();
  return data.data;
}

export async function fetchExperience(): Promise<Experience[]> {
  const res = await fetch(`${API_BASE}/experience`);
  if (!res.ok) throw new Error("Failed to fetch experience");
  const data = await res.json();
  return data.data;
}

export async function fetchAchievements(): Promise<Achievement[]> {
  const res = await fetch(`${API_BASE}/achievements`);
  if (!res.ok) throw new Error("Failed to fetch achievements");
  const data = await res.json();
  return data.data;
}

export async function fetchArchitecture(): Promise<ArchitectureNode[]> {
  const res = await fetch(`${API_BASE}/architecture`);
  if (!res.ok) throw new Error("Failed to fetch architecture");
  const data = await res.json();
  return data.data;
}

export async function sendContactMessage(payload: {
  name: string;
  email: string;
  subject?: string;
  message: string;
}): Promise<{ success: boolean; message: string }> {
  const res = await fetch(`${API_BASE}/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to submit contact message");
  return data;
}

export async function fetchKnowledgeStatus(): Promise<IngestionStatus> {
  const res = await fetch(`${API_BASE}/knowledge/status`);
  if (!res.ok) throw new Error("Failed to fetch knowledge status");
  const data = await res.json();
  return data.data;
}

export async function triggerKnowledgeIngest(): Promise<{
  success: boolean;
  message: string;
  data: IngestionStatus;
}> {
  const res = await fetch(`${API_BASE}/knowledge/ingest`, {
    method: "POST",
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to ingest knowledge");
  return data;
}

export async function streamAiChat(
  message: string,
  conversationId?: string,
  onStart?: (data: { conversationId: string; sources: ChatSource[] }) => void,
  onChunk?: (text: string) => void,
  onEnd?: () => void,
  onError?: (err: Error) => void
): Promise<void> {
  try {
    const response = await fetch(`${API_BASE}/ai/stream`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, conversationId }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const reader = response.body?.getReader();
    if (!reader) throw new Error("ReadableStream not supported by browser");

    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        if (line.startsWith("data: ")) {
          const jsonStr = line.replace(/^data:\s*/, "");
          try {
            const parsed = JSON.parse(jsonStr);
            if (parsed.type === "start") {
              onStart?.({
                conversationId: parsed.conversationId,
                sources: parsed.sources || [],
              });
            } else if (parsed.type === "chunk") {
              onChunk?.(parsed.text);
            } else if (parsed.type === "end") {
              onEnd?.();
            }
          } catch (e) {
            console.warn("Failed to parse SSE line:", line, e);
          }
        }
      }
    }
  } catch (err: any) {
    console.error("Stream AI Chat error:", err);
    onError?.(err);
  }
}
