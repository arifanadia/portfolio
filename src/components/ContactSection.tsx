"use client";

import { useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import MagneticButton from "@/components/animations/MagneticButton";

const INQUIRY_TYPES = [
  "Full-Stack Web App",
  "WordPress & CMS Website",
  "E-Commerce & WooCommerce",
  "Full-Time Role / Contract",
] as const;

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedType, setSelectedType] = useState<string>("Full-Stack Web App");
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 75%",
        onEnter: () => {
          gsap.from(".contact-header", {
            y: 30,
            opacity: 0,
            duration: 0.6,
            ease: "power3.out",
          });
          gsap.from(".contact-card-box", {
            y: 40,
            opacity: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
          });
        },
        once: true,
      });
    },
    { scope: sectionRef }
  );

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("contactarifanadia@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Please enter your name";
    if (!form.email.trim()) errs.email = "Please enter your email";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Please enter a valid email address";
    if (!form.message.trim()) errs.message = "Please write a brief project description";
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-28 border-t border-white/[0.08] bg-[#0f0f14]"
    >
      <div className="max-w-[1240px] mx-auto px-6 md:px-10">
        
        {/* Section Header */}
        <div className="contact-header max-w-2xl pb-14 border-b border-white/[0.08]">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#c6ff2e] uppercase tracking-wider mb-2">
            <span className="w-2 h-2 rounded-full bg-[#c6ff2e]" />
            <span>Initiate Collaboration</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Let&apos;s Build Something Memorable
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mt-3">
            Have a project in mind, an architectural challenge, or an opportunity to discuss?
            Reach out directly or send an inquiry below.
          </p>
        </div>

        {/* 2-Column Contact Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mt-14">
          
          {/* Left Column: Direct channels & Information */}
          <div className="contact-card-box lg:col-span-5 flex flex-col justify-between gap-10">
            <div className="space-y-6">
              
              {/* Direct Email Card */}
              <div className="p-6 rounded-3xl bg-zinc-950/80 border border-white/10 backdrop-blur-md">
                <p className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">
                  Direct Inquiry Email
                </p>
                <div className="flex items-center justify-between gap-3">
                  <a
                    href="mailto:contactarifanadia@gmail.com"
                    className="text-base sm:text-lg font-bold text-white hover:text-[#c6ff2e] transition-colors truncate"
                  >
                    contactarifanadia@gmail.com
                  </a>
                  <button
                    onClick={handleCopyEmail}
                    className="px-3 py-1.5 rounded-full text-xs font-mono bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 transition-colors shrink-0"
                  >
                    {copied ? "Copied! ✓" : "Copy"}
                  </button>
                </div>
              </div>

              {/* Status & Availability Strip */}
              <div className="p-6 rounded-3xl bg-zinc-950/80 border border-white/10 space-y-4">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-400">Response Window</span>
                  <span className="text-emerald-400 font-semibold">&lt; 24 Hours</span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono pt-3 border-t border-white/5">
                  <span className="text-zinc-400">Primary Timezone</span>
                  <span className="text-white">Dhaka, Bangladesh (UTC+6)</span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono pt-3 border-t border-white/5">
                  <span className="text-zinc-400">Open For</span>
                  <span className="text-white">Contract, Consulting & Roles</span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-4">
                External Profiles & Repositories
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  { label: "GitHub", href: "https://github.com/arifanadia" },
                  { label: "LinkedIn", href: "https://www.linkedin.com/in/arifa-nadiaa/" },
                  { label: "Instagram", href: "https://www.instagram.com/arifanadia5/" },
                ].map((s) => (
                  <MagneticButton key={s.label} pullFactor={0.3}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-full text-xs font-semibold bg-white/[0.03] border border-white/10 hover:border-[#c6ff2e] hover:text-[#c6ff2e] text-zinc-300 transition-colors inline-block"
                    >
                      {s.label} ↗
                    </a>
                  </MagneticButton>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Typed Inquiry Form */}
          <div className="contact-card-box lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-zinc-950/80 border border-white/10 backdrop-blur-md shadow-2xl">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-[#c6ff2e]/10 border border-[#c6ff2e]/30 text-[#c6ff2e] flex items-center justify-center mx-auto text-xl font-bold">
                    ✓
                  </div>
                  <h3 className="text-2xl font-black text-white tracking-tight">
                    Inquiry Received
                  </h3>
                  <p className="text-sm text-zinc-400 max-w-md mx-auto leading-relaxed">
                    Thank you for reaching out. I will review your project brief and respond
                    within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({ name: "", email: "", message: "" });
                    }}
                    className="mt-4 px-6 py-2.5 rounded-full text-xs font-bold bg-white/10 hover:bg-white/20 text-white transition-colors"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Project type pills */}
                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-400 tracking-wider mb-3">
                      Project Discipline
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {INQUIRY_TYPES.map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setSelectedType(type)}
                          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                            selectedType === type
                              ? "bg-white text-zinc-950 font-bold shadow-md"
                              : "bg-white/[0.04] text-zinc-400 hover:text-white border border-white/5"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name field */}
                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-400 tracking-wider mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      placeholder="Jane Doe"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/10 focus:border-[#c6ff2e] focus:outline-none text-sm text-white placeholder-zinc-600 transition-colors"
                    />
                    {errors.name && (
                      <p className="text-xs text-rose-400 font-mono mt-1.5">{errors.name}</p>
                    )}
                  </div>

                  {/* Email field */}
                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-400 tracking-wider mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="jane@company.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/10 focus:border-[#c6ff2e] focus:outline-none text-sm text-white placeholder-zinc-600 transition-colors"
                    />
                    {errors.email && (
                      <p className="text-xs text-rose-400 font-mono mt-1.5">{errors.email}</p>
                    )}
                  </div>

                  {/* Message field */}
                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-400 tracking-wider mb-2">
                      Project Scope & Goals
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Tell me about what you are building, timeline expectations, and ideal outcomes..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/10 focus:border-[#c6ff2e] focus:outline-none text-sm text-white placeholder-zinc-600 transition-colors resize-none"
                    />
                    {errors.message && (
                      <p className="text-xs text-rose-400 font-mono mt-1.5">{errors.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <MagneticButton className="w-full">
                    <button
                      type="submit"
                      className="w-full py-4 rounded-full bg-[#c6ff2e] hover:bg-[#b5f019] text-[#0f0f14] font-black text-sm tracking-tight transition-all duration-200 shadow-xl shadow-lime-400/20 active:scale-95"
                    >
                      Transmit Project Inquiry →
                    </button>
                  </MagneticButton>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
