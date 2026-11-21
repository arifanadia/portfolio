"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

interface GraphicDesignItem {
  id: string;
  title: string;
  client: string;
  category: "Social Media & Promo" | "Brand Identity & Signage";
  year: string;
  image: string;
  palette: string[];
  description: string;
  badge: string;
  highlights: string[];
}

const GRAPHIC_DESIGNS: GraphicDesignItem[] = [
  {
    id: "co-signage",
    title: "CO Retail Brand Identity & Signage",
    client: "CO Retail & Smart Shopping",
    category: "Brand Identity & Signage",
    year: "2024",
    image: "/graphics/co-brand-signage.jpg",
    palette: ["#ea580c", "#18181b", "#ffffff"],
    badge: "IDENTITY & SIGNAGE",
    description:
      "Modern retail brand identity and circular storefront blade signage mockup. Seamlessly integrating dynamic shopping cart iconography with clean, minimalist typography for a smart, modern consumer experience.",
    highlights: ["Circular Blade Signage", "Minimalist Logo Mark", "Outdoor Architecture Mockup"],
  },
  {
    id: "ramen-promo",
    title: "Special Ramen Promotional Campaign",
    client: "Artisan Ramen House",
    category: "Social Media & Promo",
    year: "2024",
    image: "/graphics/ramen-promo.jpg",
    palette: ["#c2410c", "#facc15", "#1c1917"],
    badge: "SOCIAL BANNER",
    description:
      "Vibrant, appetizing promotional campaign poster designed for food delivery and restaurant social marketing. Features playful hand-drawn radial accents, high-contrast typography, and a 25% discount conversion hook.",
    highlights: ["Hand-Drawn Accents", "25% Discount Hook", "Social Media Advertising"],
  },
  {
    id: "tandoori-chicken",
    title: "Spicy Tandoori Chicken Limited Offer",
    client: "Tandoori Grill & BBQ",
    category: "Social Media & Promo",
    year: "2024",
    image: "/graphics/tandoori-chicken.jpg",
    palette: ["#eab308", "#27272a", "#d4d4d8"],
    badge: "PROMO POSTER",
    description:
      "Clean stone-textured promotional creative engineered for seasonal restaurant specials. Features circular focal dish framing, fresh ingredient garnish compositions, and high-visibility offer badges.",
    highlights: ["Texture Background", "Ingredient Composition", "Call-to-Action Layout"],
  },
  {
    id: "delicious-pizza",
    title: "Super Delicious Pizza Social Ad",
    client: "Artisan Pizza Kitchen",
    category: "Social Media & Promo",
    year: "2024",
    image: "/graphics/delicious-pizza.jpg",
    palette: ["#f59e0b", "#09090b", "#ef4444"],
    badge: "ADVERTISING CREATIVE",
    description:
      "High-impact dark chalkboard aesthetic promotional ad. Features a skillet handle composition with floating fresh pizza toppings, bold brush script typography, and an attention-grabbing 50% discount badge.",
    highlights: ["Dark Chalkboard Aesthetic", "Dynamic Composition", "Bold Brush Script"],
  },
  {
    id: "special-menu-noodle",
    title: "Today's Special Noodle Menu Poster",
    client: "Asian Cuisine & Noodle Bar",
    category: "Social Media & Promo",
    year: "2024",
    image: "/graphics/special-menu-noodle.jpg",
    palette: ["#1e3a8a", "#facc15", "#38bdf8"],
    badge: "CAMPAIGN POSTER",
    description:
      "Geometric dark-blue social banner with halftone dot grid textures and an angled food showcase window. Engineered for high CTR social media campaigns with clear delivery CTA and web navigation links.",
    highlights: ["Geometric Angle Framing", "Halftone Dot Patterns", "High CTR Architecture"],
  },
];

type GraphicFilter = "All" | "Social Media & Promo" | "Brand Identity & Signage";

export default function DesignGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const [filter, setFilter] = useState<GraphicFilter>("All");
  const [selectedItem, setSelectedItem] = useState<GraphicDesignItem | null>(null);

  const filteredDesigns =
    filter === "All"
      ? GRAPHIC_DESIGNS
      : GRAPHIC_DESIGNS.filter((d) => d.category === filter);

  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 75%",
        onEnter: () => {
          gsap.from(".design-header", {
            y: 30,
            opacity: 0,
            duration: 0.6,
            ease: "power3.out",
          });
          gsap.from(".design-card", {
            y: 40,
            opacity: 0,
            duration: 0.7,
            stagger: 0.08,
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
      id="design"
      ref={sectionRef}
      className="relative py-28 border-t border-white/[0.08] bg-[#0c0c10]"
    >
      <div className="max-w-[1240px] mx-auto px-6 md:px-10">
        
        {/* Section Header */}
        <div className="design-header flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/[0.08]">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#7c4dff] uppercase tracking-wider mb-2">
              <span className="w-2 h-2 rounded-full bg-[#7c4dff]" />
              <span>Graphic Design & Visual Brand Craft</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Graphic Design & Social Creatives
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-xl">
              Brand identity, promotional advertising posters, and social media marketing creatives crafted for maximum engagement and brand clarity.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: "All" as const, label: "All Graphics", count: GRAPHIC_DESIGNS.length },
              {
                id: "Social Media & Promo" as const,
                label: "Social Media & Promo",
                count: GRAPHIC_DESIGNS.filter((d) => d.category === "Social Media & Promo").length,
              },
              {
                id: "Brand Identity & Signage" as const,
                label: "Branding & Signage",
                count: GRAPHIC_DESIGNS.filter((d) => d.category === "Brand Identity & Signage").length,
              },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-2 ${
                  filter === tab.id
                    ? "bg-[#7c4dff] text-white shadow-lg shadow-purple-600/30 font-bold"
                    : "bg-white/[0.04] text-zinc-400 hover:text-white hover:bg-white/[0.08] border border-white/5"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    filter === tab.id
                      ? "bg-white/20 text-white font-mono font-bold"
                      : "bg-white/10 text-zinc-400 font-mono"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Graphics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-12">
          {filteredDesigns.map((design) => (
            <div
              key={design.id}
              onClick={() => setSelectedItem(design)}
              className="design-card group cursor-pointer relative bg-zinc-950/80 border border-white/10 hover:border-white/25 rounded-3xl p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 shadow-xl"
            >
              {/* Graphic Specimen Artboard */}
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-zinc-900 border border-white/10 flex flex-col justify-between">
                <Image
                  src={design.image}
                  alt={design.title}
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Subtle gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 opacity-60 group-hover:opacity-40 transition-opacity" />

                {/* Top header badge */}
                <div className="relative z-10 p-3.5 flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-black/75 text-zinc-300 border border-white/10 backdrop-blur-md">
                    {design.badge}
                  </span>
                  <span className="text-[11px] font-mono text-zinc-300 bg-black/75 px-2 py-0.5 rounded border border-white/10 backdrop-blur-md">
                    {design.year}
                  </span>
                </div>

                {/* Hover inspect pill */}
                <div className="relative z-10 p-3.5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-zinc-950 font-bold text-xs shadow-xl transform translate-y-1 group-hover:translate-y-0 transition-transform">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span>View Graphic</span>
                  </span>
                </div>

                {/* Bottom palette bar */}
                <div className="relative z-10 p-3.5 flex items-center justify-between bg-black/60 backdrop-blur-md border-t border-white/10">
                  <div className="flex items-center gap-1.5">
                    {design.palette.map((hex, i) => (
                      <span
                        key={i}
                        className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-sm"
                        style={{ backgroundColor: hex }}
                        title={hex}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] font-mono text-zinc-300 group-hover:text-[#c6ff2e] transition-colors">
                    Click to Zoom →
                  </span>
                </div>
              </div>

              {/* Title & Client details */}
              <div className="pt-4 flex items-start justify-between gap-3">
                <div>
                  <h4 className="text-base font-bold text-white tracking-tight group-hover:text-[#c6ff2e] transition-colors">
                    {design.title}
                  </h4>
                  <p className="text-xs text-zinc-400 mt-0.5 font-mono">
                    Client: {design.client}
                  </p>
                </div>
                <span className="text-[10px] font-mono text-zinc-400 px-2 py-1 rounded bg-white/5 border border-white/5 whitespace-nowrap">
                  {design.category === "Brand Identity & Signage" ? "Branding" : "Promo Ad"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Graphic Lightbox / Zoom Modal ── */}
      {selectedItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[92vh] bg-zinc-950 border border-white/15 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-zinc-900/90 backdrop-blur-md">
              <div>
                <span className="text-xs font-mono text-[#c6ff2e] uppercase tracking-wider">
                  {selectedItem.badge} • {selectedItem.year}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  {selectedItem.title}
                </h3>
              </div>

              <button
                onClick={() => setSelectedItem(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-zinc-400 hover:text-white flex items-center justify-center text-sm transition-colors"
                aria-label="Close Graphic View"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="relative flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 bg-zinc-950">
              
              {/* Graphic Display Area */}
              <div className="md:col-span-7 flex items-center justify-center">
                <div className="relative w-full max-w-[460px] aspect-square rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-zinc-900">
                  <Image
                    src={selectedItem.image}
                    alt={selectedItem.title}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>

              {/* Graphic Details */}
              <div className="md:col-span-5 flex flex-col justify-between space-y-5">
                <div>
                  <span className="text-xs font-mono text-zinc-400">
                    Client: <span className="text-white font-medium">{selectedItem.client}</span>
                  </span>
                  <h4 className="text-xl font-bold text-white mt-1">
                    Design Overview
                  </h4>
                  <p className="text-sm text-zinc-300 leading-relaxed mt-2 p-4 rounded-2xl bg-zinc-900/60 border border-white/10">
                    {selectedItem.description}
                  </p>

                  <div className="mt-5">
                    <p className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                      Key Highlights:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedItem.highlights.map((h) => (
                        <span
                          key={h}
                          className="px-2.5 py-1 rounded-md text-xs font-mono bg-white/5 border border-white/10 text-zinc-300"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5">
                    <p className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
                      Color Palette:
                    </p>
                    <div className="flex items-center gap-3">
                      {selectedItem.palette.map((col, i) => (
                        <div key={i} className="flex items-center gap-1.5">
                          <span
                            className="w-4 h-4 rounded-full border border-white/20 shadow-sm"
                            style={{ backgroundColor: col }}
                          />
                          <span className="text-xs font-mono text-zinc-400">{col}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-end">
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="px-5 py-2 rounded-full bg-white text-zinc-950 text-xs font-bold hover:bg-[#c6ff2e] transition-colors"
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
