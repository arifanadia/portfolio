"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

const MILESTONES = [
  {
    period: "2021 — 2022",
    role: "Visual Designer & Identity Craft",
    summary:
      "Specialized in brand identity, editorial layouts, and vector typography. Developed a deep understanding of negative space, typographic grids, and kinetic storytelling.",
    badge: "FOUNDATIONS",
  },
  {
    period: "2022 — 2023",
    role: "WordPress CMS & Web Architecture",
    summary:
      "Engineered bespoke WordPress themes, custom WooCommerce storefronts, and tailored ACF architectures. Focused on high-speed page loads, SEO optimization, and intuitive client dashboards.",
    badge: "CMS & E-COMMERCE",
  },
  {
    period: "2023 — 2024",
    role: "Full-Stack Web Engineering",
    summary:
      "Mastered React, Next.js, and TypeScript. Began writing production-ready applications backed by Supabase PostgreSQL, Node.js Server Actions, and RESTful APIs.",
    badge: "ENGINEERING",
  },
  {
    period: "2024 — Present",
    role: "Creative Technologist & Full-Stack / CMS Lead",
    summary:
      "Delivering end-to-end web products — from custom Next.js applications and headless WordPress platforms to interactive 3D WebGL scenes and conversion-focused digital designs.",
    badge: "ACTIVE FOCUS",
  },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 75%",
        onEnter: () => {
          gsap.from(".about-content", {
            y: 30,
            opacity: 0,
            duration: 0.6,
            ease: "power3.out",
          });
          gsap.from(".milestone-row", {
            x: 24,
            opacity: 0,
            duration: 0.6,
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
      id="about"
      ref={sectionRef}
      className="relative py-28 border-t border-white/[0.08] bg-[#0c0c10]"
    >
      <div className="max-w-[1240px] mx-auto px-6 md:px-10">
        
        {/* Top Header */}
        <div className="about-content max-w-2xl pb-14 border-b border-white/[0.08]">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#c6ff2e] uppercase tracking-wider mb-2">
            <span className="w-2 h-2 rounded-full bg-[#c6ff2e]" />
            <span>Philosophy & Background</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            The Intersection of Code & Craft
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mt-3">
            I believe software should not merely function; it should feel deliberate,
            responsive, and aesthetically rigorous.
          </p>
        </div>

        {/* 2-Column Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mt-14 items-start">
          
          {/* Left Column: Portrait & Personal Manifesto */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div className="relative mx-auto max-w-[340px] lg:max-w-none w-full">
              
              {/* Outer frame */}
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/15 bg-zinc-900 shadow-2xl">
                <Image
                  src="/hero-avatar.jpg"
                  alt="Arifa Nadia"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 60%, rgba(12,12,16,0.85) 100%)",
                  }}
                />
                
                <div className="absolute bottom-5 inset-x-5 text-center">
                  <p className="text-white font-bold text-base">Arifa Nadia</p>
                  <p className="text-zinc-400 text-xs font-mono mt-0.5">
                    Dhaka, Bangladesh • Available Worldwide
                  </p>
                </div>
              </div>

              {/* Status capsule */}
              <div className="mt-4 p-4 rounded-2xl bg-zinc-950/80 border border-white/10 text-xs text-zinc-300 leading-relaxed font-mono">
                <span className="text-[#c6ff2e] font-bold">// CORE PHILOSOPHY</span>
                <p className="mt-1 text-zinc-400">
                  Engineering gives me the tools to build systems that scale; design gives me the empathy to make them unforgettable.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Milestones */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <div className="space-y-4 text-zinc-300 text-base leading-relaxed">
              <p>
                My journey began in visual communications and web development in 2021. I spent years obsessing over
                typography, responsive layouts, brand architecture, and CMS solutions. Early on, I recognized that
                clients needed not just sleek graphics, but performant, easily manageable websites powered by robust CMS platforms like WordPress and WooCommerce.
              </p>
              <p className="text-zinc-400 text-[15px]">
                As web architectures evolved, I expanded into modern full-stack development with Next.js, React, and TypeScript.
                Today, I build complete web ecosystems — from bespoke WordPress & WooCommerce sites to custom Next.js web applications,
                relational PostgreSQL databases, and fluid interactive micro-interactions.
              </p>
            </div>

            {/* Milestones Timeline */}
            <div className="mt-4 pt-6 border-t border-white/[0.08]">
              <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-6">
                Chronological Progression
              </h3>

              <div className="space-y-6">
                {MILESTONES.map((m) => (
                  <div
                    key={m.period}
                    className="milestone-row group p-5 rounded-2xl bg-zinc-950/60 border border-white/5 hover:border-white/15 transition-colors"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-mono text-[#c6ff2e]">
                        {m.period}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-400 border border-white/5">
                        {m.badge}
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-white tracking-tight">
                      {m.role}
                    </h4>
                    <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                      {m.summary}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
