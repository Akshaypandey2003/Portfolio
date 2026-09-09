import React, { useState } from "react";
import {
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  Github,
  Linkedin,
  MapPin,
  Sparkles,
  Phone,
  MessageSquare,
} from "lucide-react";
import { sendContactMessage } from "../services/api";

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMsg("Please fill in all required fields (Name, Email, Message).");
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    try {
      await sendContactMessage(formData);
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Could not send message. Please try emailing directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-[#07090e] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-mono font-medium">
            <Mail size={13} />
            <span>LET'S CONNECT & BUILD</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Get in Touch
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Interested in discussing distributed systems, Java backend roles, Spring AI projects, or architectural opportunities? Send a message directly or connect via social platforms.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-5xl mx-auto">
          {/* Left Column: Direct Links & Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl bg-[#0c101c] border border-slate-800 p-6 space-y-6 shadow-xl">
              <h3 className="text-lg font-bold text-white">
                Contact Information
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                <a
                  id="contact-email-link"
                  href="mailto:akshaypandey2k23@gmail.com"
                  className="flex items-start gap-3.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-300 hover:text-white hover:border-sky-500/40 transition-colors group"
                >
                  <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/30 group-hover:scale-110 transition-transform">
                    <Mail size={16} />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-slate-400">Email Address</div>
                    <div className="font-semibold text-white">akshaypandey2k23@gmail.com</div>
                  </div>
                </a>

                <div className="flex items-start gap-3.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-300">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-slate-400">Location</div>
                    <div className="font-semibold text-white">India (Open to Remote / Relocation)</div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-300">
                  <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/30">
                    <MessageSquare size={16} />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-slate-400">Current Status</div>
                    <div className="font-semibold text-emerald-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      Available for Software Engineer Roles
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-2 border-t border-slate-800/80 space-y-2">
                <span className="text-xs font-mono text-slate-400 font-semibold block">
                  Professional Profiles:
                </span>
                <div className="flex items-center gap-3">
                  <a
                    id="contact-github-btn"
                    href="https://github.com/AkshayPandey2003"
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                  >
                    <Github size={15} />
                    <span>GitHub</span>
                  </a>
                  <a
                    id="contact-linkedin-btn"
                    href="https://www.linkedin.com/in/akshay-pandey-547829221/"
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                  >
                    <Linkedin size={15} />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-[#0c101c] border border-slate-800 p-6 sm:p-8 shadow-xl relative overflow-hidden">
              {submitted ? (
                <div className="py-12 text-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/10">
                    <CheckCircle2 size={36} />
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-sm text-slate-300 max-w-md mx-auto">
                    Thank you for reaching out. Akshay has received your message and will follow up shortly.
                  </p>
                  <button
                    id="send-another-message-btn"
                    onClick={() => setSubmitted(false)}
                    className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <h3 className="text-base font-bold text-white">
                      Send a Message
                    </h3>
                    <span className="text-[11px] font-mono text-slate-400">
                      * Required fields
                    </span>
                  </div>

                  {errorMsg && (
                    <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-800/60 text-xs text-rose-300 flex items-center gap-2">
                      <AlertCircle size={14} className="shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-400 font-medium">
                        Your Name *
                      </label>
                      <input
                        id="contact-name-input"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="e.g. Jane Doe"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-600 focus:outline-none focus:border-sky-500 transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-400 font-medium">
                        Your Email *
                      </label>
                      <input
                        id="contact-email-input"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="e.g. jane@company.com"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-600 focus:outline-none focus:border-sky-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-400 font-medium">
                      Subject
                    </label>
                    <input
                      id="contact-subject-input"
                      type="text"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      placeholder="e.g. Senior Java Engineer Opportunity"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-600 focus:outline-none focus:border-sky-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-400 font-medium">
                      Message *
                    </label>
                    <textarea
                      id="contact-message-input"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Share details about the role, project, or topic..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-600 focus:outline-none focus:border-sky-500 transition-colors resize-none"
                    />
                  </div>

                  <button
                    id="contact-submit-btn"
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20 disabled:opacity-50 transition-all"
                  >
                    <Send size={15} />
                    <span>{loading ? "Transmitting..." : "Send Message to Akshay"}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
