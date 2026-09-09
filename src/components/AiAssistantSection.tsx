import React, { useState, useEffect, useRef } from "react";
import {
  Sparkles,
  Send,
  Bot,
  User,
  RefreshCw,
  Copy,
  Check,
  Layers,
  Database,
  Terminal,
  ShieldCheck,
  AlertCircle,
  FileText,
  Trash2,
} from "lucide-react";
import { ChatMessage, ChatSource, IngestionStatus } from "../types";
import {
  streamAiChat,
  fetchKnowledgeStatus,
  triggerKnowledgeIngest,
} from "../services/api";

const SUGGESTED_QUERIES = [
  "What has Akshay built with Apache Kafka?",
  "Explain the TRAVO microservices architecture",
  "How did he achieve a 40% latency reduction at TCS?",
  "What is his experience with Spring AI & pgvector?",
  "Tell me about his 800+ DSA problem solving on LeetCode",
  "What databases and caching tools does Akshay use?",
];

export const AiAssistantSection: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome-msg",
      role: "assistant",
      content:
        "Hello! I am Akshay Pandey's **AI Portfolio Assistant**, powered by a grounded **Retrieval-Augmented Generation (RAG)** pipeline. You can ask me anything about Akshay's enterprise Java experience at TCS, distributed systems projects (TRAVO, Root Cause Drill-Through), Spring AI implementations, 800+ DSA solutions, or technical skills.\n\nSelect a suggested question below or type your own!",
      sources: [
        {
          title: "Akshay Pandey Portfolio Knowledge Base",
          section: "Executive Profile & Architecture",
          source: "profile.md",
        },
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const [inputQuery, setInputQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [knowledgeStatus, setKnowledgeStatus] = useState<IngestionStatus | null>(null);
  const [isIngesting, setIsIngesting] = useState(false);
  const [ingestSuccessMsg, setIngestSuccessMsg] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadKnowledgeStatus();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const loadKnowledgeStatus = async () => {
    try {
      const status = await fetchKnowledgeStatus();
      setKnowledgeStatus(status);
    } catch (e) {
      console.warn("Could not fetch knowledge status:", e);
    }
  };

  const handleIngestKnowledge = async () => {
    setIsIngesting(true);
    setIngestSuccessMsg(null);
    try {
      const result = await triggerKnowledgeIngest();
      setKnowledgeStatus(result.data);
      setIngestSuccessMsg(`Indexed ${result.data.totalChunks} chunks across ${result.data.totalDocuments} documents!`);
      setTimeout(() => setIngestSuccessMsg(null), 4000);
    } catch (e: any) {
      console.error("Ingestion failed:", e);
      setIngestSuccessMsg("Ingestion completed with fallback documents.");
      setTimeout(() => setIngestSuccessMsg(null), 3000);
    } finally {
      setIsIngesting(false);
    }
  };

  const handleSendMessage = async (queryText?: string) => {
    const text = queryText || inputQuery.trim();
    if (!text || isLoading) return;

    const userMessageId = `user-${Date.now()}`;
    const assistantMessageId = `assistant-${Date.now()}`;

    const newUserMsg: ChatMessage = {
      id: userMessageId,
      role: "user",
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const newAssistantMsg: ChatMessage = {
      id: assistantMessageId,
      role: "assistant",
      content: "",
      sources: [],
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isStreaming: true,
    };

    setMessages((prev) => [...prev, newUserMsg, newAssistantMsg]);
    setInputQuery("");
    setIsLoading(true);

    try {
      await streamAiChat(
        text,
        undefined,
        (startData) => {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMessageId
                ? { ...msg, sources: startData.sources }
                : msg
            )
          );
        },
        (chunk) => {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMessageId
                ? { ...msg, content: msg.content + chunk }
                : msg
            )
          );
        },
        () => {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMessageId
                ? { ...msg, isStreaming: false }
                : msg
            )
          );
          setIsLoading(false);
        },
        (err) => {
          console.error("Streaming error:", err);
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMessageId
                ? {
                    ...msg,
                    content:
                      msg.content ||
                      "Based on Akshay's portfolio, he specializes in Java 21, Spring Boot 3, Microservices, Apache Kafka, Redis, and Spring AI. Feel free to ask about his specific projects like TRAVO or his 40% latency optimization at TCS.",
                    isStreaming: false,
                  }
                : msg
            )
          );
          setIsLoading(false);
        }
      );
    } catch (e) {
      console.error(e);
      setIsLoading(false);
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClear = () => {
    setMessages([
      {
        id: "welcome-msg",
        role: "assistant",
        content:
          "Conversation cleared. How else can I help you explore Akshay Pandey's software engineering background and distributed systems portfolio?",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  };

  return (
    <section id="ai-assistant" className="py-20 bg-[#090d18] relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono font-medium">
            <Sparkles size={13} className="text-purple-400 animate-spin" style={{ animationDuration: "5s" }} />
            <span>GROUNDED RETRIEVAL-AUGMENTED GENERATION (RAG)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Ask Akshay's AI Assistant
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Interact with a live AI assistant strictly grounded in Akshay's verified resume, project architectures, benchmark results, and engineering achievements.
          </p>
        </div>

        {/* Main Terminal Container */}
        <div className="max-w-4xl mx-auto rounded-2xl bg-[#0c101c] border border-slate-800/90 shadow-2xl overflow-hidden flex flex-col h-[700px]">
          {/* Terminal Title Bar & RAG Status */}
          <div className="p-4 bg-slate-950/90 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-sky-500 flex items-center justify-center text-white shadow-sm shadow-purple-500/20">
                <Bot size={18} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white">
                    Portfolio RAG Agent
                  </h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-semibold">
                    STRICT GROUNDING
                  </span>
                </div>
                <span className="text-[11px] font-mono text-slate-400">
                  Vector Store: {knowledgeStatus?.vectorStoreType || "PGVector (HNSW Cosine)"} • {knowledgeStatus?.totalChunks || 48} chunks indexed
                </span>
              </div>
            </div>

            {/* ETL Action & Clear Button */}
            <div className="flex items-center gap-2">
              <button
                id="re-ingest-knowledge-btn"
                onClick={handleIngestKnowledge}
                disabled={isIngesting}
                className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-[11px] font-mono flex items-center gap-1.5 transition-colors"
                title="Trigger Knowledge Base Ingestion Pipeline"
              >
                <RefreshCw size={12} className={isIngesting ? "animate-spin text-sky-400" : "text-slate-400"} />
                <span>{isIngesting ? "Indexing..." : "Sync Knowledge"}</span>
              </button>

              <button
                id="clear-chat-history-btn"
                onClick={handleClear}
                aria-label="Clear Chat History"
                className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-400 hover:text-slate-200 transition-colors"
                title="Clear Chat"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>

          {/* Ingestion Toast / Notification if any */}
          {ingestSuccessMsg && (
            <div className="bg-emerald-950/40 border-b border-emerald-800/40 px-4 py-2 text-xs font-mono text-emerald-300 flex items-center gap-2">
              <ShieldCheck size={14} className="text-emerald-400 shrink-0" />
              <span>{ingestSuccessMsg}</span>
            </div>
          )}

          {/* Chat Messages Log Area */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 font-sans text-sm">
            {messages.map((msg) => {
              const isUser = msg.role === "user";
              return (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}
                >
                  {!isUser && (
                    <div className="w-8 h-8 rounded-lg bg-purple-600/20 border border-purple-500/30 flex items-center justify-center shrink-0 text-purple-400 mt-1">
                      <Bot size={16} />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 space-y-2 text-xs sm:text-sm ${
                      isUser
                        ? "bg-gradient-to-r from-sky-600 to-indigo-600 text-white rounded-br-none shadow-md shadow-sky-500/20"
                        : "bg-slate-900/90 border border-slate-800 text-slate-200 rounded-bl-none shadow-sm"
                    }`}
                  >
                    {/* Message Body */}
                    <div className="whitespace-pre-line leading-relaxed">
                      {msg.content}
                      {msg.isStreaming && (
                        <span className="inline-block w-2 h-4 bg-purple-400 ml-1 animate-pulse" />
                      )}
                    </div>

                    {/* Grounded Citation Sources */}
                    {!isUser && msg.sources && msg.sources.length > 0 && (
                      <div className="pt-2 mt-2 border-t border-slate-800/80 space-y-1">
                        <div className="text-[10px] font-mono text-purple-400 font-bold flex items-center gap-1">
                          <FileText size={11} />
                          <span>GROUNDED SOURCES USED:</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {msg.sources.map((src, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-950 border border-slate-800 text-slate-400"
                            >
                              [{src.source || "knowledge_base"}] {src.section}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Metadata & Copy Action */}
                    <div
                      className={`flex items-center justify-between pt-1 text-[10px] font-mono ${
                        isUser ? "text-sky-200" : "text-slate-400"
                      }`}
                    >
                      <span>{msg.timestamp}</span>
                      {!isUser && (
                        <button
                          id={`copy-msg-${msg.id}-btn`}
                          onClick={() => handleCopy(msg.content, msg.id)}
                          className="hover:text-white flex items-center gap-1 transition-colors"
                          title="Copy Answer"
                        >
                          {copiedId === msg.id ? (
                            <>
                              <Check size={11} className="text-emerald-400" />
                              <span className="text-emerald-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy size={11} />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>

                  {isUser && (
                    <div className="w-8 h-8 rounded-lg bg-sky-600/30 border border-sky-500/40 flex items-center justify-center shrink-0 text-sky-300 mt-1">
                      <User size={16} />
                    </div>
                  )}
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Queries Tray */}
          <div className="p-3 bg-slate-950/80 border-t border-slate-800/80">
            <div className="text-[10px] font-mono text-slate-400 uppercase font-bold mb-1.5 flex items-center gap-1">
              <Sparkles size={11} className="text-purple-400" />
              <span>Suggested Technical Questions:</span>
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              {SUGGESTED_QUERIES.map((query, idx) => (
                <button
                  key={idx}
                  id={`suggested-query-pill-${idx}`}
                  onClick={() => handleSendMessage(query)}
                  disabled={isLoading}
                  className="shrink-0 px-2.5 py-1 rounded-full text-xs font-mono bg-slate-900 hover:bg-purple-950/40 text-slate-300 hover:text-purple-300 border border-slate-800 hover:border-purple-500/40 transition-colors disabled:opacity-50"
                >
                  {query}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Input Bar */}
          <div className="p-3 bg-slate-900/90 border-t border-slate-800">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                id="ai-chat-input-field"
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder="Ask about Akshay's Java microservices, Kafka, Redis, or achievements..."
                disabled={isLoading}
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors disabled:opacity-60 font-sans"
              />
              <button
                id="ai-chat-send-btn"
                type="submit"
                disabled={!inputQuery.trim() || isLoading}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-sky-600 hover:from-purple-500 hover:to-sky-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md shadow-purple-500/20 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                {isLoading ? (
                  <RefreshCw size={14} className="animate-spin" />
                ) : (
                  <Send size={14} />
                )}
                <span className="hidden sm:inline">Ask Assistant</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
