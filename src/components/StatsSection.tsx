"use client";

import { useRef, useState, useEffect } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

const METRICS = [
  { value: 4, label: "Years of Full-Stack & CMS", suffix: "+", desc: "WordPress, Next.js & web platforms" },
  { value: 5, label: "Years of Visual & UI Design", suffix: "+", desc: "Brand identities, UI systems & typography" },
  { value: 30, label: "Client & Web Deployments", suffix: "+", desc: "CMS portals, eCommerce & custom apps" },
  { value: 99, label: "Lighthouse Performance", suffix: "%", desc: "Strict Core Web Vitals & speed optimization" },
];

function CountUp({
  target,
  suffix,
  started,
}: {
  target: number;
  suffix: string;
  started: boolean;
}) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!started) return;
    const duration = 1500;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(target * eased);
      setDisplay(current);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [started, target]);

  return (
    <span>
      {display}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [started, setStarted] = useState(false);

  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 85%",
        onEnter: () => {
          setStarted(true);
          gsap.from(".metric-item", {
            y: 30,
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
      ref={sectionRef}
      className="relative py-16 border-y border-white/[0.07] bg-zinc-950/40 backdrop-blur-sm"
    >
      <div className="max-w-[1240px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-white/[0.08]">
          {METRICS.map((metric, i) => (
            <div
              key={metric.label}
              className={`metric-item flex flex-col justify-between ${
                i > 0 ? "lg:pl-8" : ""
              } ${i < METRICS.length - 1 ? "lg:pr-8" : ""}`}
            >
              <div>
                <div
                  className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-2"
                  style={{ fontVariantNumeric: "tabular-nums" }}
                >
                  <CountUp
                    target={metric.value}
                    suffix={metric.suffix}
                    started={started}
                  />
                </div>
                <h3 className="text-sm font-semibold text-zinc-200 tracking-tight">
                  {metric.label}
                </h3>
              </div>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                {metric.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
