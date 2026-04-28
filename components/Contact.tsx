"use client";
// components/Contact.tsx

import { useState, useEffect, useRef } from "react";
import { Send, CheckCircle, AlertCircle, Mail } from "lucide-react";

// ─── BRAND ICONS ──────────────────────────────────────────────────────────
// lucide-react v1 removed brand icons — using inline SVGs instead.

function IconInstagram({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function IconYouTube({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
    </svg>
  );
}

function IconTikTok({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );
}

function IconTwitch({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 2H3v16h5v4l4-4h5l4-4V2zM11 11V7m5 4V7" />
    </svg>
  );
}

// ─── TYPES ────────────────────────────────────────────────────────────────

const inquiryTypes = [
  "General Inquiry",
  "Collaboration",
  "Job Opportunity",
  "Freelance Work",
  "University / Academic",
  "Other",
];

interface FormState {
  name: string;
  email: string;
  subject: string;
  inquiryType: string;
  message: string;
}

interface FormErrors {
  email?: string;
}

// ─── COMPONENT ────────────────────────────────────────────────────────────

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    inquiryType: "General Inquiry",
    message: "",
  });

  const [errors, setErrors]   = useState<FormErrors>({});
  const [status, setStatus]   = useState<"idle" | "loading" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    sectionRef.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.email.trim())
      newErrors.email = "Please enter your email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Please enter a valid email address.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading" || !validate()) return;
    setStatus("loading");
    try {
      const res  = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setStatusMessage(data.message || "Message sent!");
        setForm({ name: "", email: "", subject: "", inquiryType: "General Inquiry", message: "" });
        setErrors({});
      } else {
        setStatus("error");
        setStatusMessage(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setStatusMessage("Could not send your message. Please check your connection or email me directly.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors])
      setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  return (
    <section id="contact" ref={sectionRef} className="py-24 md:py-36 bg-cream">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="reveal mb-16">
          <p className="section-label">Get in Touch</p>
          <h2 className="font-display text-[clamp(2.4rem,6vw,5rem)] font-light leading-tight text-charcoal">
            Contact
          </h2>
        </div>

        <div className="grid md:grid-cols-12 gap-12 md:gap-16">

          {/* ── Left column ─────────────────────────────────────────────── */}
          <div className="md:col-span-4 space-y-10">

            <div className="reveal reveal-delay-1">
              <p className="text-warm-gray leading-relaxed">
                Whether you&apos;re looking to collaborate, have a project in mind,
                or just want to say hello  I&apos;d love to hear from you.
              </p>
            </div>

            {/* Email — UPDATE with Jolene's real email */}
            <div className="reveal reveal-delay-2">
              <p className="form-label">Email</p>
              <a href="mailto:tjzoomer1@gmail.com"
                className="flex items-center gap-2.5 text-charcoal hover:text-terracotta transition-colors group">
                <Mail size={16} className="text-terracotta" />
                <span className="text-sm font-medium group-hover:underline">
                  tjzoomer1@gmail.com
                </span>
              </a>
            </div>

            {/* Social links */}
            <div className="reveal reveal-delay-3">
              <p className="form-label mb-4">Social</p>
              <div className="space-y-3">
                <a href="https://instagram.com/tjzoomer" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-warm-gray hover:text-terracotta transition-colors">
                  <IconInstagram size={16} />
                  <span className="text-sm">Instagram</span>
                </a>
                <a href="https://youtube.com/@tjzoomer" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-warm-gray hover:text-terracotta transition-colors">
                  <IconYouTube size={16} />
                  <span className="text-sm">YouTube</span>
                </a>
                <a href="https://tiktok.com/@tjzoomer" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-warm-gray hover:text-terracotta transition-colors">
                  <IconTikTok size={16} />
                  <span className="text-sm">TikTok</span>
                </a>
                <a href="https://twitch.tv/tjzoomer" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-warm-gray hover:text-terracotta transition-colors">
                  <IconTwitch size={16} />
                  <span className="text-sm">Twitch</span>
                </a>
              </div>
            </div>

            {/* Availability */}
            <div className="reveal reveal-delay-4">
              <div className="inline-flex items-center gap-2 bg-warm-white border border-border rounded-full px-4 py-2">
                <span className="w-2 h-2 rounded-full bg-sage animate-pulse" />
                <span className="text-xs text-warm-gray font-medium">
                  Available for opportunities
                </span>
              </div>
            </div>
          </div>

          {/* ── Right column: form ───────────────────────────────────────── */}
          <div className="md:col-span-8">
            {status === "success" ? (
              <div className="reveal flex flex-col items-center justify-center text-center py-16 px-8 bg-warm-white rounded-2xl border border-border">
                <CheckCircle size={48} className="text-sage mb-5" />
                <h3 className="font-display text-3xl font-light text-charcoal mb-3">
                  Message received!
                </h3>
                <p className="text-warm-gray leading-relaxed max-w-sm">{statusMessage}</p>
                <button onClick={() => setStatus("idle")} className="btn-secondary mt-8">
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="reveal reveal-delay-1 space-y-8" noValidate>

                {/* Name + Email */}
                <div className="grid sm:grid-cols-2 gap-8">
                  <div>
                    <label htmlFor="name" className="form-label">Name</label>
                    <input id="name" name="name" type="text" value={form.name}
                      onChange={handleChange} placeholder="Your full name"
                      className="form-input" autoComplete="name" />
                  </div>
                  <div>
                    <label htmlFor="email" className="form-label">Email *</label>
                    <input id="email" name="email" type="email" value={form.email}
                      onChange={handleChange} placeholder="your@email.com"
                      className="form-input" autoComplete="email" />
                    {errors.email && <p className="text-xs text-red-500 mt-1.5">{errors.email}</p>}
                  </div>
                </div>

                {/* Inquiry type + Subject */}
                <div className="grid sm:grid-cols-2 gap-8">
                  <div>
                    <label htmlFor="inquiryType" className="form-label">Inquiry Type</label>
                    <select id="inquiryType" name="inquiryType" value={form.inquiryType}
                      onChange={handleChange} className="form-input cursor-pointer">
                      {inquiryTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="subject" className="form-label">Subject</label>
                    <input id="subject" name="subject" type="text" value={form.subject}
                      onChange={handleChange} placeholder="What's it about?"
                      className="form-input" />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="form-label">Message</label>
                  <textarea id="message" name="message" value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project, inquiry, or just say hi…"
                    rows={5} className="form-input" />
                </div>

                {/* Error banner */}
                {status === "error" && (
                  <div className="flex items-start gap-3 bg-red-50 border border-red-100 rounded-lg p-4">
                    <AlertCircle size={16} className="text-red-500 mt-0.5 shrink-0" />
                    <p className="text-sm text-red-600">{statusMessage}</p>
                  </div>
                )}

                {/* Submit */}
                <div className="flex items-center justify-between gap-4 pt-2">
                  <p className="text-xs text-warm-gray">* Email is required</p>
                  <button type="submit" disabled={status === "loading"}
                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed">
                    {status === "loading" ? (
                      <>
                        <span className="w-4 h-4 border-2 border-cream/40 border-t-cream rounded-full animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send size={14} />
                        Send Message
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}