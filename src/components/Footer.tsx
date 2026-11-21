"use client";

import MagneticButton from "@/components/animations/MagneticButton";

export default function Footer() {
  const currentYear = 2026;

  return (
    <footer className="relative py-12 border-t border-white/[0.08] bg-[#0c0c10]">
      <div className="max-w-[1240px] mx-auto px-6 md:px-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#7c4dff] flex items-center justify-center shadow-lg shadow-purple-600/30">
            <span className="text-white font-black text-sm italic">A</span>
          </div>
          <div>
            <span className="font-bold text-white text-sm tracking-tight">
              Arifa Nadia
            </span>
            <span className="text-xs text-zinc-500 block font-mono">
              Creative Technologist
            </span>
          </div>
        </div>

        {/* Tech attribution */}
        <p className="text-xs text-zinc-500 font-mono text-center sm:text-left">
          © {currentYear} Arifa Nadia • Architected with Next.js 15, Three.js & Tailwind CSS
        </p>

        {/* Back to top magnetic button */}
        <MagneticButton pullFactor={0.3}>
          <a
            href="#home"
            aria-label="Back to top"
            className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/10 hover:border-[#c6ff2e] hover:text-[#c6ff2e] text-zinc-400 flex items-center justify-center transition-colors text-sm"
          >
            ↑
          </a>
        </MagneticButton>
      </div>
    </footer>
  );
}
