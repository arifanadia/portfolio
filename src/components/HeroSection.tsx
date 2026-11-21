"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import ThreeCanvas from "@/components/animations/ThreeCanvas";
import MagneticButton from "@/components/animations/MagneticButton";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ delay: 0.2 });

      tl.from(".hero-badge", {
        y: 16,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
      })
        .from(".hero-title-line", {
          y: 36,
          opacity: 0,
          stagger: 0.12,
          duration: 0.8,
          ease: "power3.out",
        }, "-=0.2")
        .from(".hero-bio", {
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
        }, "-=0.4")
        .from(".hero-tags", {
          y: 16,
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
        }, "-=0.3")
        .from(".hero-actions", {
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
        }, "-=0.3")
        .from(mediaRef.current, {
          x: 40,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        }, "-=0.7");

      // Scroll parallax
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          if (videoRef.current) {
            gsap.set(videoRef.current, { y: self.progress * 40 });
          }
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-[92vh] flex items-center pt-24 pb-16 overflow-hidden bg-[#0f0f14]"
    >
      {/* ── 3D Atmospheric Background Canvas ── */}
      <ThreeCanvas className="opacity-90" />

      {/* ── Radial Ambient Lighting ── */}
      <div
        className="absolute top-1/4 -left-32 w-[550px] h-[550px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(124,77,255,0.12) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-10 right-1/4 w-[450px] h-[450px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(198,255,46,0.06) 0%, transparent 70%)",
        }}
      />

      {/* ── Main Container ── */}
      <div className="relative z-10 max-w-[1240px] mx-auto px-6 md:px-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* ════ LEFT COLUMN: Editorial Content ════ */}
          <div ref={contentRef} className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Status Pill */}
            <div className="hero-badge flex items-center">
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md text-xs font-medium text-zinc-300">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span>Available for Select Projects & Roles</span>
                <span className="text-zinc-600">•</span>
                <span className="text-[#c6ff2e] font-mono text-[11px]">2026</span>
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-[4.25rem] font-black tracking-tight text-white leading-[1.06]">
              <span className="hero-title-line block">
                Designing with intent.
              </span>
              <span className="hero-title-line block text-zinc-400">
                Engineering{" "}
                <span className="text-white relative inline-block">
                  for scale
                  <span className="absolute bottom-1 left-0 w-full h-[3px] bg-[#c6ff2e] rounded-full" />
                </span>
                .
              </span>
            </h1>

            {/* Human Introduction */}
            <div className="hero-bio max-w-xl">
              <p className="text-zinc-300 text-lg font-medium leading-relaxed">
                I&apos;m <span className="text-white font-bold">Arifa Nadia</span> — a Full-Stack Engineer, WordPress CMS Specialist & Visual Designer.
              </p>
              <p className="text-zinc-400 text-[15px] leading-relaxed mt-2">
                I bridge the gap between creative direction, CMS architecture, and software engineering.
                From high-performing Next.js applications and custom WordPress/WooCommerce solutions to tactile UI design,
                I build digital platforms where technical rigor meets aesthetic craft.
              </p>
            </div>

            {/* Semantic Metadata Strip */}
            <div className="hero-tags flex flex-wrap items-center gap-x-5 gap-y-2 py-3 border-y border-white/[0.08] text-xs font-mono text-zinc-400">
              <span className="flex items-center gap-1.5 text-zinc-300">
                <span className="text-[#c6ff2e]">01</span> Full-Stack Web & Next.js
              </span>
              <span className="text-zinc-700">•</span>
              <span className="flex items-center gap-1.5 text-zinc-300">
                <span className="text-[#7c4dff]">02</span> CMS & WordPress Architecture
              </span>
              <span className="text-zinc-700">•</span>
              <span className="flex items-center gap-1.5 text-zinc-300">
                <span className="text-[#38bdf8]">03</span> E-Commerce & WooCommerce
              </span>
              <span className="text-zinc-700">•</span>
              <span className="text-zinc-400">Dhaka (UTC+6)</span>
            </div>

            {/* Call to Actions & Social Links */}
            <div className="hero-actions flex flex-wrap items-center gap-4 pt-1">
              <MagneticButton>
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2.5 bg-[#c6ff2e] hover:bg-[#b5f019] text-[#0f0f14] font-black text-sm px-7 py-3.5 rounded-full transition-all duration-200 shadow-lg shadow-lime-400/20 active:scale-95"
                >
                  <span>Explore Selected Work</span>
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M10 3a.75.75 0 01.75.75v10.638l3.96-4.158a.75.75 0 111.08 1.04l-5.25 5.5a.75.75 0 01-1.08 0l-5.25-5.5a.75.75 0 111.08-1.04l3.96 4.158V3.75A.75.75 0 0110 3z" clipRule="evenodd" />
                  </svg>
                </a>
              </MagneticButton>

              <MagneticButton>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 hover:border-white/30 text-white font-semibold text-sm px-6 py-3.5 rounded-full transition-all duration-200 backdrop-blur-sm active:scale-95"
                >
                  <span>Get in Touch</span>
                  <span className="text-[#c6ff2e]">→</span>
                </a>
              </MagneticButton>

              {/* Social vectors */}
              <div className="flex items-center gap-2 pl-2">
                {[
                  {
                    label: "GitHub",
                    href: "https://github.com/arifanadia",
                    icon: (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                      </svg>
                    ),
                  },
                  {
                    label: "LinkedIn",
                    href: "https://www.linkedin.com/in/arifa-nadiaa/",
                    icon: (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.79v8.37H6.46v-8.37M7.86 6.54a1.63 1.63 0 1 0 0 3.25 1.63 1.63 0 0 0 0-3.25z" />
                      </svg>
                    ),
                  },
                  {
                    label: "Instagram",
                    href: "https://www.instagram.com/arifanadia5/",
                    icon: (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    ),
                  },
                ].map((s) => (
                  <MagneticButton key={s.label} pullFactor={0.35}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/10 hover:border-[#c6ff2e] hover:text-[#c6ff2e] text-zinc-400 flex items-center justify-center transition-all duration-200"
                    >
                      {s.icon}
                    </a>
                  </MagneticButton>
                ))}
              </div>
            </div>
          </div>

          {/* ════ RIGHT COLUMN: Cinematic Media Showcase ════ */}
          <div ref={mediaRef} className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-[420px] lg:max-w-none">
              
              {/* Outer Glow Halo */}
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-[#7c4dff]/40 to-[#c6ff2e]/30 rounded-3xl blur-xl opacity-50" />

              {/* Framed Media Container */}
              <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-zinc-900/80 shadow-2xl backdrop-blur-md">
                
                {/* Browser-style bar top */}
                <div className="flex items-center justify-between px-4 py-3 bg-zinc-950/60 border-b border-white/10 text-xs font-mono text-zinc-400">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                  </div>
                  <span className="text-[11px] text-zinc-400">arifa-nadia.studio</span>
                  <span className="text-[10px] text-[#c6ff2e] font-semibold">LIVE</span>
                </div>

                {/* Media Window (Video with fallback) */}
                <div className="relative aspect-[4/5] sm:aspect-[3/3.8] w-full overflow-hidden bg-zinc-950">
                  <video
                    ref={videoRef}
                    src="/hero-video.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover object-center"
                  />

                  {/* Cinematic Shadow Vignetters */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(15,15,20,0.2) 0%, transparent 40%, rgba(15,15,20,0.85) 100%)",
                    }}
                  />

                  {/* Floating Proof Card Bottom */}
                  <div className="absolute bottom-4 inset-x-4 p-4 rounded-2xl bg-zinc-950/85 backdrop-blur-md border border-white/10 shadow-xl flex items-center justify-between">
                    <div>
                      <p className="text-white font-bold text-xs tracking-tight">
                        Creative Technologist
                      </p>
                      <p className="text-zinc-400 text-[11px] mt-0.5">
                        Design Systems & Engineering
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-[#c6ff2e] font-mono text-xs font-extrabold">
                        99+ Score
                      </span>
                      <p className="text-zinc-400 text-[10px]">Core Web Vitals</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Minimal floating accent badge */}
              <div className="hidden sm:flex absolute -bottom-5 -left-5 bg-[#18181f]/95 border border-white/10 rounded-2xl px-4 py-2.5 shadow-2xl items-center gap-3 backdrop-blur-md">
                <div className="w-8 h-8 rounded-xl bg-[#7c4dff]/20 border border-[#7c4dff]/40 flex items-center justify-center text-[#c6ff2e] font-mono text-xs font-bold">
                  ✦
                </div>
                <div>
                  <p className="text-[11px] font-mono uppercase text-zinc-400">Craft Standard</p>
                  <p className="text-xs font-bold text-white">Full-Stack & Design</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
