"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { personalInfo } from "@/constants/data";
import { GlassCard } from "@/components/ui/glass-card";

interface CounterProps {
  target: number;
  label: string;
  suffix?: string;
  glow: "blue" | "purple" | "indigo";
}

function CounterItem({ target, label, suffix = "", glow }: CounterProps) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!isInView) return;
    let startVal = 0;
    const duration = 1800; // Total count duration (1.8s)
    const stepTime = Math.max(Math.floor(duration / target), 20);

    const timer = setInterval(() => {
      startVal += 1;
      setValue(startVal);
      if (startVal >= target) {
        clearInterval(timer);
        setValue(target); // Force clean finish
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <div ref={ref} className="h-full">
      <GlassCard
        glowColor={glow}
        className="flex flex-col items-center justify-center p-8 bg-white/[0.01] border-white/5 h-full text-center group hover:border-white/10"
      >
        <h3 className="text-4xl md:text-5xl font-display font-black text-white tracking-widest mb-2 tabular-nums text-glow-blue group-hover:scale-105 transition-transform duration-300">
          {value}
          <span className="text-cyan-400 font-bold">{suffix}</span>
        </h3>
        <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest font-semibold block mt-1.5 select-none">
          {label}
        </span>
      </GlassCard>
    </div>
  );
}

export function Stats() {
  const statItems = [
    { target: personalInfo.stats.projects, label: "Core Projects Built", suffix: "+", glow: "blue" as const },
    { target: personalInfo.stats.internships, label: "Internships Completed", suffix: "", glow: "indigo" as const },
    { target: personalInfo.stats.skills, label: "Acquired Skills", suffix: "+", glow: "purple" as const },
    { target: personalInfo.stats.certifications, label: "Industry Certificates", suffix: "", glow: "blue" as const },
  ];

  return (
    <section className="relative py-16 px-4 md:px-8 max-w-5xl mx-auto z-10">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 filter blur-3xl opacity-30 pointer-events-none -z-10" />
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 items-stretch w-full">
        {statItems.map((item, idx) => (
          <CounterItem
            key={idx}
            target={item.target}
            label={item.label}
            suffix={item.suffix}
            glow={item.glow}
          />
        ))}
      </div>
    </section>
  );
}
export default Stats;
