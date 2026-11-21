"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import MagneticButton from "@/components/animations/MagneticButton";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "Graphics", href: "#design" },
  { label: "Skills", href: "#skills" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useGSAP(
    () => {
      const tl = gsap.timeline({ delay: 0.1 });
      tl.from(logoRef.current, {
        x: -20,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
      }).from(
        linksRef.current?.querySelectorAll("li") ?? [],
        {
          y: -15,
          opacity: 0,
          duration: 0.5,
          stagger: 0.05,
          ease: "power2.out",
        },
        "-=0.3"
      );
    },
    { scope: navRef }
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = NAV_LINKS.map((l) =>
        document.querySelector(l.href)
      ) as HTMLElement[];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i];
        if (el && window.scrollY >= el.offsetTop - 140) {
          setActive(NAV_LINKS[i].label.toLowerCase());
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      ref={navRef}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0f0f14]/85 backdrop-blur-xl border-b border-white/[0.08] shadow-2xl shadow-black/40"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="flex items-center justify-between max-w-[1240px] mx-auto px-6 md:px-10 h-[74px]">
        
        {/* Brand Monogram */}
        <div ref={logoRef} className="flex items-center gap-6">
          <a href="#home" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#7c4dff] to-[#9d71fd] flex items-center justify-center shadow-lg shadow-purple-600/30 group-hover:scale-105 transition-transform">
              <span className="text-white font-black text-sm italic leading-none">
                A
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-white text-[15px] tracking-tight leading-none">
                Arifa Nadia
              </span>
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mt-0.5">
                Studio
              </span>
            </div>
          </a>

          {/* Availability pill */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/5 text-[11px] font-mono text-zinc-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Open for Projects</span>
          </div>
        </div>

        {/* Desktop Links */}
        <ul ref={linksRef} className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((link) => {
            const isActive = active === link.label.toLowerCase();
            return (
              <li key={link.label}>
                <a
                  href={link.href}
                  className={`text-[13px] font-medium tracking-wide transition-colors duration-200 relative py-1 ${
                    isActive
                      ? "text-white font-semibold"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#c6ff2e] rounded-full" />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Action CTA */}
        <MagneticButton className="hidden md:inline-block" pullFactor={0.3}>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-white hover:bg-zinc-200 text-zinc-950 text-xs font-bold px-5 py-2.5 rounded-full transition-all duration-200 shadow-md active:scale-95"
          >
            <span>Let&apos;s Talk</span>
            <span className="text-zinc-600">→</span>
          </a>
        </MagneticButton>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen((p) => !p)}
          className="md:hidden w-10 h-10 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center text-white"
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-zinc-950/95 backdrop-blur-2xl border-b border-white/10 px-6 py-6 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`text-sm font-medium transition-colors ${
                active === link.label.toLowerCase()
                  ? "text-[#c6ff2e] font-bold"
                  : "text-zinc-400"
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="inline-flex w-full justify-center items-center gap-2 bg-[#c6ff2e] text-zinc-950 text-xs font-black py-3 rounded-full mt-2"
          >
            Let&apos;s Talk →
          </a>
        </div>
      )}
    </header>
  );
}
