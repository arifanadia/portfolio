"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import TiltCard from "@/components/animations/TiltCard";

interface Project {
  id: string;
  title: string;
  subtitle: string;
  type: "coded" | "cms";
  categoryLabel: "Coded Website" | "CMS & WordPress";
  role: string;
  summary: string;
  tech: string[];
  metric: string;
  image: string;
  domain: string;
  accentColor: string;
  badge: string;
  liveUrl?: string;
  githubUrl?: string;
}

const PROJECTS: Project[] = [
  // ── 4 Coded Websites ──
  {
    id: "nestbazar",
    title: "NestBazar",
    subtitle: "High-Traffic Multi-Vendor Commerce Platform",
    type: "coded",
    categoryLabel: "Coded Website",
    role: "Full-Stack Web Development & UI Architecture",
    summary:
      "A high-volume multi-vendor commerce hub featuring live flash sales countdowns, vendor storefront management, multi-category navigation, and secure checkout pipelines.",
    tech: ["Next.js", "React", "Node.js", "Tailwind CSS", "PostgreSQL", "REST API"],
    metric: "10K+ Products • Multi-Vendor Engine",
    image: "/projects/nestbazar.jpg",
    domain: "nestbazar.store",
    accentColor: "#8b5cf6",
    badge: "CODED WEBSITE",
    liveUrl: "https://nestbazar.store",
    githubUrl: "https://github.com/arifanadia",
  },
  {
    id: "cratecraft",
    title: "CrateCraft",
    subtitle: "Organic Monthly Harvest & Curated Pantry Box",
    type: "coded",
    categoryLabel: "Coded Website",
    role: "Lead Frontend & Full-Stack Developer",
    summary:
      "A modern organic grocery and subscription harvest platform with dynamic bundle builders, custom dietary filters, bundle discount tiers, and lightning-fast checkout.",
    tech: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Stripe API", "Framer Motion"],
    metric: "Sub-50ms Cart • 25% Sub Growth",
    image: "/projects/cratecraft.jpg",
    domain: "cratecraft.io",
    accentColor: "#f97316",
    badge: "CODED WEBSITE",
    liveUrl: "https://cratecraft.io",
    githubUrl: "https://github.com/arifanadia",
  },
  {
    id: "farmtrail",
    title: "FarmTrail",
    subtitle: "Sustainable Farming & Fresh Harvest Agriculture",
    type: "coded",
    categoryLabel: "Coded Website",
    role: "Creative Frontend & Web Engineering",
    summary:
      "Dark-mode sustainable farming and agricultural commerce platform featuring seasonal harvest catalogs, farm-to-table delivery subscriptions, and interactive field showcases.",
    tech: ["Next.js", "React", "Tailwind CSS", "JavaScript", "GSAP Motion", "HTML5/CSS3"],
    metric: "Interactive 3D Assets • 60fps Motion",
    image: "/projects/farmtrail.jpg",
    domain: "farmtrail.org",
    accentColor: "#22c55e",
    badge: "CODED WEBSITE",
    liveUrl: "https://farmtrail.org",
    githubUrl: "https://github.com/arifanadia",
  },
  {
    id: "havenly",
    title: "Havenly Real Estate",
    subtitle: "Luxury Dream Home & Property Discovery Platform",
    type: "coded",
    categoryLabel: "Coded Website",
    role: "Full-Stack Development & Property UI",
    summary:
      "High-end property discovery web platform with interactive neighborhood exploration, dynamic property filters, mortgage calculators, and direct agent tour bookings.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Google Maps API", "REST API"],
    metric: "45K+ Listings • Instant Filter Engine",
    image: "/projects/havenly.jpg",
    domain: "havenly-realty.com",
    accentColor: "#f59e0b",
    badge: "CODED WEBSITE",
    liveUrl: "https://havenly-realty.com",
    githubUrl: "https://github.com/arifanadia",
  },

  // ── 2 CMS & WordPress Websites ──
  {
    id: "galaxy-cabinets",
    title: "Galaxy Cabinets & Remodeling",
    subtitle: "Kitchen & Bathroom Remodeling Contractor",
    type: "cms",
    categoryLabel: "CMS & WordPress",
    role: "WordPress Developer & UI/UX Designer",
    summary:
      "High-converting interior renovation business website for Orlando, FL. Features an interactive kitchen & bath estimate calculator, dynamic before/after galleries, and local SEO dominance.",
    tech: ["WordPress CMS", "Elementor Pro", "Custom PHP Theme", "ACF Pro", "Local Schema SEO"],
    metric: "213+ Remodels • Top Orlando Local SEO",
    image: "/projects/galaxy-cabinets.jpg",
    domain: "galaxycabinets.com",
    accentColor: "#06b6d4",
    badge: "WORDPRESS CMS",
    liveUrl: "https://galaxycabinets.com",
    githubUrl: "https://github.com/arifanadia",
  },
  {
    id: "venue-howell",
    title: "The Venue at Howell",
    subtitle: "Luxury Residential Living & Community Portal",
    type: "cms",
    categoryLabel: "CMS & WordPress",
    role: "CMS Specialist & UI Designer",
    summary:
      "Editorial luxury residential and senior living community portal in Howell Township, NJ. Features interactive architectural floorplans, virtual 3D tour integrations, and private appointment scheduling.",
    tech: ["WordPress CMS", "Custom Post Types", "Virtual Tour Integration", "Tailwind CSS", "Speed Optimization"],
    metric: "99+ PageSpeed • High Tour Conversions",
    image: "/projects/venue-howell.jpg",
    domain: "thevenueathowell.com",
    accentColor: "#10b981",
    badge: "WORDPRESS CMS",
    liveUrl: "https://thevenueathowell.com",
    githubUrl: "https://github.com/arifanadia",
  },
];

type FilterType = "all" | "coded" | "cms";

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [filter, setFilter] = useState<FilterType>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects =
    filter === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => p.type === filter);

  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 75%",
        onEnter: () => {
          gsap.from(".projects-heading", {
            y: 30,
            opacity: 0,
            duration: 0.6,
            ease: "power3.out",
          });
          gsap.from(".project-card-item", {
            y: 50,
            opacity: 0,
            duration: 0.7,
            stagger: 0.12,
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
      id="projects"
      ref={sectionRef}
      className="relative py-28 bg-[#0f0f14]"
    >
      <div className="max-w-[1240px] mx-auto px-6 md:px-10">
        
        {/* Section Header */}
        <div className="projects-heading flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/[0.08]">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#c6ff2e] uppercase tracking-wider mb-2">
              <span className="w-2 h-2 rounded-full bg-[#c6ff2e]" />
              <span>Selected Portfolio Works</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Coded & CMS Websites
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-xl">
              Explore 4 custom-coded web applications alongside 2 production WordPress CMS platforms,
              built with clean architecture and responsive craft.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: "all" as const, label: "All Projects", count: PROJECTS.length },
              {
                id: "coded" as const,
                label: "Coded Websites",
                count: PROJECTS.filter((p) => p.type === "coded").length,
              },
              {
                id: "cms" as const,
                label: "CMS & WordPress",
                count: PROJECTS.filter((p) => p.type === "cms").length,
              },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-2 ${
                  filter === tab.id
                    ? "bg-[#c6ff2e] text-zinc-950 shadow-md font-bold"
                    : "bg-white/[0.04] text-zinc-400 hover:text-white hover:bg-white/[0.08] border border-white/5"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    filter === tab.id
                      ? "bg-black/20 text-zinc-950 font-mono font-bold"
                      : "bg-white/10 text-zinc-400 font-mono"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
          {filteredProjects.map((project, idx) => (
            <TiltCard key={project.id} maxRotation={3} className="h-full">
              <div className="project-card-item group relative h-full flex flex-col justify-between bg-zinc-950/80 border border-white/10 hover:border-white/25 rounded-3xl p-5 sm:p-7 overflow-hidden transition-all duration-300 backdrop-blur-md shadow-xl">
                
                {/* ── Realistic Browser Device Mockup Frame ── */}
                <div className="relative w-full h-[380px] sm:h-[420px] rounded-2xl overflow-hidden border border-white/10 bg-[#09090e] flex flex-col shadow-inner">
                  
                  {/* Browser Window Header Bar */}
                  <div className="relative z-20 flex items-center justify-between px-4 py-2.5 bg-zinc-950/95 border-b border-white/10 backdrop-blur-md text-xs font-mono">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                      <div className="ml-2 flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-white/[0.04] border border-white/5 text-[11px] text-zinc-400">
                        <svg className="w-3 h-3 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v2H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-1V6a4 4 0 00-4-4zm2 6V6a2 2 0 10-4 0v2h4z" clipRule="evenodd" />
                        </svg>
                        <span className="truncate max-w-[120px] sm:max-w-[180px]">
                          https://{project.domain}
                        </span>
                      </div>
                    </div>

                    {/* Category Type Badge */}
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold tracking-wider border ${
                        project.type === "coded"
                          ? "bg-lime-500/10 border-lime-500/30 text-[#c6ff2e]"
                          : "bg-cyan-500/10 border-cyan-500/30 text-cyan-300"
                      }`}
                    >
                      {project.badge}
                    </span>
                  </div>

                  {/* Browser Viewport with Auto-Scroll on Hover */}
                  <div
                    onClick={() => setSelectedProject(project)}
                    className="relative flex-1 w-full overflow-hidden cursor-pointer group/viewport bg-gradient-to-b from-[#0e0e14] to-[#08080c] flex items-start justify-center p-2.5 sm:p-3"
                  >
                    {/* Centered Website Window */}
                    <div className="relative w-full max-w-[380px] h-full rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-zinc-900">
                      
                      {/* Full-length website screenshot with smooth hover scroll */}
                      <div className="relative w-full h-full overflow-hidden">
                        <Image
                          src={project.image}
                          alt={project.title}
                          width={480}
                          height={1200}
                          className="w-full h-auto object-cover object-top transition-transform duration-[7000ms] ease-in-out group-hover/viewport:-translate-y-[calc(100%-350px)] will-change-transform"
                          priority={idx < 2}
                        />
                      </div>

                      {/* Hover Action Overlay & Indicator */}
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/viewport:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3 pointer-events-none">
                        <div className="self-end">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-white border border-white/20 text-[11px] font-mono shadow-lg">
                            <span>Hovering auto-scrolls</span>
                            <span className="animate-bounce">↓</span>
                          </span>
                        </div>
                        <div className="self-center">
                          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-zinc-950 font-bold text-xs shadow-2xl transform translate-y-1 group-hover/viewport:translate-y-0 transition-transform">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            <span>Click for Full View</span>
                          </span>
                        </div>
                        <div />
                      </div>
                    </div>

                    {/* Metric badge bottom-left */}
                    <div className="absolute bottom-4 left-4 z-10 pointer-events-none">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/85 border border-white/15 text-[11px] font-mono text-white backdrop-blur-md shadow-lg">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: project.accentColor }} />
                        <span>{project.metric}</span>
                      </div>
                    </div>

                    {/* Index badge bottom-right */}
                    <div className="absolute bottom-4 right-4 z-10 text-[10px] font-mono text-zinc-400 bg-black/85 px-2.5 py-1 rounded-lg border border-white/15 backdrop-blur-md pointer-events-none">
                      PROJECT_0{idx + 1}
                    </div>
                  </div>
                </div>

                {/* ── Project Details ── */}
                <div className="mt-6 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
                            {project.role}
                          </span>
                          <span className="text-zinc-600">•</span>
                          <span
                            className={`text-[11px] font-mono font-bold ${
                              project.type === "coded" ? "text-[#c6ff2e]" : "text-cyan-300"
                            }`}
                          >
                            {project.categoryLabel}
                          </span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1 group-hover:text-[#c6ff2e] transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-xs font-mono text-zinc-400 mt-0.5">
                          {project.subtitle}
                        </p>
                      </div>

                      {/* Action Links */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedProject(project)}
                          title="View Full Page Screenshot"
                          className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/10 hover:border-white/30 text-zinc-400 hover:text-white flex items-center justify-center transition-colors text-xs"
                          aria-label="View Full Page Screenshot"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="View source repository"
                            title="Source Code"
                            className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/10 hover:border-white/30 text-zinc-400 hover:text-white flex items-center justify-center transition-colors text-xs"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                            </svg>
                          </a>
                        )}
                        <button
                          onClick={() => setSelectedProject(project)}
                          aria-label="Inspect project details"
                          title="Inspect Details"
                          className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/10 hover:border-[#c6ff2e] text-zinc-400 hover:text-[#c6ff2e] flex items-center justify-center transition-colors text-xs font-bold"
                        >
                          ↗
                        </button>
                      </div>
                    </div>

                    <p className="text-zinc-400 text-sm leading-relaxed mt-3">
                      {project.summary}
                    </p>
                  </div>

                  {/* Tech Badges */}
                  <div className="flex flex-wrap gap-2 pt-6 mt-4 border-t border-white/[0.06]">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-mono border transition-colors ${
                          t.toLowerCase().includes("wordpress") || t.toLowerCase().includes("elementor")
                            ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-300"
                            : t.toLowerCase().includes("next") || t.toLowerCase().includes("react")
                            ? "bg-purple-500/10 border-purple-500/30 text-purple-300"
                            : "bg-white/[0.03] border-white/[0.07] text-zinc-300"
                        }`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>

      {/* ── Full Screenshot Lightbox Modal ── */}
      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[92vh] bg-zinc-950 border border-white/15 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-zinc-900/95 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div
                  className="w-3.5 h-3.5 rounded-full"
                  style={{ backgroundColor: selectedProject.accentColor }}
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-base sm:text-lg font-bold text-white tracking-tight">
                      {selectedProject.title}
                    </h4>
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                        selectedProject.type === "coded"
                          ? "bg-lime-500/10 border-lime-500/30 text-[#c6ff2e]"
                          : "bg-cyan-500/10 border-cyan-500/30 text-cyan-300"
                      }`}
                    >
                      {selectedProject.badge}
                    </span>
                  </div>
                  <p className="text-xs font-mono text-zinc-400 mt-0.5">
                    {selectedProject.subtitle} • {selectedProject.domain}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="hidden sm:inline-block text-[11px] font-mono text-zinc-300 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                  {selectedProject.metric}
                </span>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors text-sm font-mono"
                  aria-label="Close Preview"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Modal Body: Left column preview, right column info */}
            <div className="relative flex-1 overflow-y-auto p-4 sm:p-6 bg-zinc-950 grid grid-cols-1 md:grid-cols-12 gap-6">
              
              {/* Screenshot Scrollable Column */}
              <div className="md:col-span-7 flex flex-col items-center">
                <div className="text-[11px] font-mono text-zinc-400 mb-2 flex items-center gap-2">
                  <span>Scroll down inside frame to inspect full page</span>
                  <span>↓</span>
                </div>
                <div className="w-full max-w-[420px] max-h-[580px] overflow-y-auto rounded-2xl border border-white/15 bg-zinc-900 shadow-2xl p-1 scrollbar-thin">
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    width={480}
                    height={1200}
                    className="w-full h-auto object-contain rounded-xl"
                    priority
                  />
                </div>
              </div>

              {/* Information Column */}
              <div className="md:col-span-5 flex flex-col justify-between space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-mono text-[#c6ff2e] uppercase tracking-wider mb-2">
                    <span>Deliverable & Scope</span>
                  </div>
                  <h5 className="text-xl font-bold text-white mb-2">
                    {selectedProject.title}
                  </h5>
                  <p className="text-xs font-mono text-zinc-400 mb-4">
                    Role: {selectedProject.role}
                  </p>

                  <div className="p-4 rounded-2xl bg-zinc-900/70 border border-white/10 text-xs text-zinc-300 leading-relaxed space-y-2">
                    <p className="font-semibold text-white">Project Overview:</p>
                    <p>{selectedProject.summary}</p>
                  </div>

                  <div className="mt-5">
                    <p className="text-xs font-mono text-zinc-400 mb-2">Technologies Used:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProject.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 rounded-md text-xs font-mono bg-white/5 border border-white/10 text-zinc-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer close button */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs font-mono text-zinc-500">
                    Category: {selectedProject.categoryLabel}
                  </span>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="px-5 py-2 rounded-full bg-white text-zinc-950 font-bold text-xs hover:bg-[#c6ff2e] transition-colors"
                  >
                    Done Viewing
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </section>
  );
}
