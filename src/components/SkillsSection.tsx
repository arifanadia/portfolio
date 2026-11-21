"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

const CAPABILITIES = [
  {
    category: "01. Modern Frontend & Web Architecture",
    description: "Building responsive, zero-layout-shift web applications with high visual polish.",
    accentColor: "#c6ff2e",
    skills: [
      { name: "Next.js 15 & React 19", level: "Production Expert", tag: "App Router / RSC" },
      { name: "TypeScript & JavaScript", level: "Strict Mode", tag: "End-to-End Type Safety" },
      { name: "Tailwind CSS & shadcn/ui", level: "Design Tokens", tag: "Accessible Primitives" },
      { name: "GSAP & ScrollTrigger", level: "Micro-Interactions", tag: "Tactile UI Motion" },
      { name: "Three.js & WebGL", level: "Spatial Canvases", tag: "Interactive 3D" },
      { name: "HTML5 & Semantic CSS", level: "Standards", tag: "Clean Modular Layouts" },
    ],
  },
  {
    category: "02. CMS & WordPress Engineering",
    description: "Developing bespoke WordPress themes, WooCommerce storefronts, and headless CMS integrations.",
    accentColor: "#38bdf8",
    skills: [
      { name: "WordPress Custom Theme Dev", level: "PHP & Hooks", tag: "Tailored Architecture" },
      { name: "WooCommerce & E-Commerce", level: "Store Solutions", tag: "Cart, Checkout & Inventory" },
      { name: "Elementor Pro & Gutenberg", level: "Block Development", tag: "Dynamic Templates" },
      { name: "ACF Pro & Custom Post Types", level: "Content Architecture", tag: "Structured Data / CPT" },
      { name: "Headless WordPress & REST API", level: "Decoupled Next.js", tag: "Jamstack & GraphQL" },
      { name: "WordPress Speed & Security", level: "Optimization", tag: "WP Rocket / Cloudflare / SSL" },
    ],
  },
  {
    category: "03. Backend & Data Architecture",
    description: "Designing resilient API layers, server actions, and type-safe databases.",
    accentColor: "#7c4dff",
    skills: [
      { name: "Node.js & Next Actions", level: "Server Architecture", tag: "Edge Runtime" },
      { name: "Supabase Platform", level: "PostgreSQL & Auth", tag: "Row Level Security" },
      { name: "PostgreSQL & SQL", level: "Data Modeling", tag: "Relational Queries" },
      { name: "Zod Schema Validation", level: "Data Integrity", tag: "Runtime Checking" },
      { name: "REST & Webhook APIs", level: "Integration", tag: "Event-Driven Services" },
      { name: "Realtime WebSocket Sync", level: "Live Presence", tag: "Low Latency" },
    ],
  },
  {
    category: "04. UI/UX Design & Performance Craft",
    description: "Creating high-converting user interfaces, brand identities, and lightning-fast web experiences.",
    accentColor: "#22c55e",
    skills: [
      { name: "Figma & Design Systems", level: "Component Libraries", tag: "Token Architecture" },
      { name: "Adobe Photoshop & Illustrator", level: "Vector & Imagery", tag: "Brand Identity" },
      { name: "UI/UX & Wireframing", level: "Interface Architecture", tag: "Conversion Focused" },
      { name: "Core Web Vitals Optimization", level: "99+ Metric", tag: "LCP / INP / CLS" },
      { name: "WCAG 2.1 Accessibility", level: "Standard AA", tag: "Universal Usability" },
      { name: "Git, CI/CD & Vercel Deploy", level: "DevOps Workflow", tag: "Continuous Delivery" },
    ],
  },
];

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 75%",
        onEnter: () => {
          gsap.from(".skills-header", {
            y: 30,
            opacity: 0,
            duration: 0.6,
            ease: "power3.out",
          });
          gsap.from(".capability-card", {
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

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-28 bg-[#0f0f14]"
    >
      <div className="max-w-[1240px] mx-auto px-6 md:px-10">
        
        {/* Header */}
        <div className="skills-header max-w-2xl pb-14 border-b border-white/[0.08]">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#c6ff2e] uppercase tracking-wider mb-2">
            <span className="w-2 h-2 rounded-full bg-[#c6ff2e]" />
            <span>Capability Matrix</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Technical & Creative Stack
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mt-3">
            A comprehensive breakdown of the languages, frameworks, design software,
            and engineering standards I use to deliver production-ready software.
          </p>
        </div>

        {/* 2x2 Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
          {CAPABILITIES.map((cap) => (
            <div
              key={cap.category}
              className="capability-card relative bg-zinc-950/70 border border-white/10 rounded-3xl p-7 flex flex-col justify-between hover:border-white/20 transition-all duration-300 backdrop-blur-md"
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-2">
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    {cap.category}
                  </h3>
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: cap.accentColor }}
                  />
                </div>
                <p className="text-xs text-zinc-400 mb-6 leading-relaxed">
                  {cap.description}
                </p>

                {/* List of skills */}
                <div className="space-y-3">
                  {cap.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                        <span className="text-sm font-semibold text-zinc-200">
                          {skill.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="hidden sm:inline-block text-[11px] font-mono text-zinc-500">
                          {skill.tag}
                        </span>
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-400 border border-white/5">
                          {skill.level}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-zinc-500">
                <span>PRODUCTION GRADE</span>
                <span className="text-zinc-400">ACTIVE STACK 2026</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
