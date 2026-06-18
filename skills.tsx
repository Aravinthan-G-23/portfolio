"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { BrainCircuit, Cpu, Database, Terminal, Laptop } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { useSound } from "@/hooks/use-sound";
import { cn } from "@/utils/helpers";

// SVG/Inline paths for complex technical logos (guarantees compile-safety and zero asset dependencies)
const TECH_ICONS: Record<string, React.ReactNode> = {
  Python: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.933 0c-2.822.012-5.462 1.51-6.726 4.148-.258.541-.453 1.137-.584 1.751h7.324c.731 0 1.324.593 1.324 1.324v7.324c0 .73-.593 1.324-1.324 1.324h-7.324c.489 2.29 2.213 4.183 4.544 4.792 1.637.427 3.393.264 4.931-.462 2.638-1.264 4.135-3.924 4.122-6.758V6.634C18.232 2.973 15.594-.012 11.933 0zm-3.056 3.013c.489 0 .886.397.886.886s-.397.886-.886.886a.887.887 0 0 1-.886-.886c0-.49.397-.886.886-.886z" />
      <path d="M12.067 24c2.822-.012 5.462-1.51 6.726-4.148.258-.541.453-1.137.584-1.751h-7.324c-.731 0-1.324-.593-1.324-1.324V9.453c0-.73.593-1.324 1.324-1.324h7.324c-.489-2.29-2.213-4.183-4.544-4.792-1.637-.427-3.393-.264-4.931.462C7.264 5.063 5.767 7.723 5.78 10.557v6.809c-.032 3.661 2.606 6.646 6.287 6.634zm3.056-3.013a.887.887 0 0 1-.886-.886c0-.489.397-.886.886-.886s.886.397.886.886c0 .489-.397.886-.886.886z" />
    </svg>
  ),
  SQL: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
      <path d="M3 5V19A9 3 0 0 0 21 19V5"></path>
      <path d="M3 12A9 3 0 0 0 21 12"></path>
    </svg>
  ),
  HTML5: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
      <path d="M1.5 0h21l-1.9 21.2L12 24l-8.6-2.8L1.5 0zm15.4 7H7.3l.3 3h8.9l-.3 3.6-4.2 1.4-4.2-1.4-.2-2.3H5.2l.5 5.7 6.3 2.1 6.3-2.1.8-8.8.2-2.6z" />
    </svg>
  ),
  CSS3: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
      <path d="M1.5 0h21l-1.9 21.2L12 24l-8.6-2.8L1.5 0zm16.5 6H6l.3 3h11.1l-.6 6-4.8 1.6-4.8-1.6-.3-3H4.1l.5 5.5 7.4 2.5 7.4-2.5 1-11.5z" />
    </svg>
  ),
  "Machine Learning": <BrainCircuit className="w-6 h-6" />,
  "Deep Learning": <Cpu className="w-6 h-6" />,
  NLP: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      <path d="M8 10h.01M12 10h.01M16 10h.01" />
    </svg>
  ),
  "Generative AI": (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.5 11.25a.75.75 0 0 0-.75-.75h-3.3l2.4-2.4a.75.75 0 1 0-1.06-1.06l-3.67 3.67a2.25 2.25 0 0 0-.66 1.59v3.3h2.4a.75.75 0 1 0 0-1.5h-1.65v-1.8h3.3c.41 0 .75-.34.75-.75zM12 2.25a.75.75 0 0 0-.75.75v3.3L8.85 3.9a.75.75 0 0 0-1.06 1.06l3.67 3.67c.4.4.93.62 1.59.62h3.3v-2.4a.75.75 0 0 0-1.5 0v1.65h-1.8V3c0-.41-.34-.75-.75-.75zm-6.6 6.6a.75.75 0 0 0-1.06 0L.67 12.52a2.25 2.25 0 0 0 0 3.18l3.67 3.67a.75.75 0 0 0 1.06-1.06l-2.4-2.4h3.3a.75.75 0 0 0 0-1.5H4.65v-1.8h2.4a.75.75 0 0 0 0-1.5h-3.3l1.65-1.65a.75.75 0 0 0 0-1.06z" />
    </svg>
  ),
  "Scikit-Learn": (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0L2.7 5.4v10.8L12 21.6l9.3-5.4V5.4L12 0zm-1.1 14.8l-3.3-1.9 3.3-1.9 3.3 1.9-3.3 1.9zm0-5.7L7.6 7.2l3.3-1.9 3.3 1.9-3.3 1.9z" />
    </svg>
  ),
  Pandas: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.3 0H4.7C2.1 0 0 2.1 0 4.7v14.6C0 21.9 2.1 24 4.7 24h14.6c2.6 0 4.7-2.1 4.7-4.7V4.7C24 2.1 21.9 0 19.3 0zM12 18H8v-4h4v4zm4-6H8V8h8v4z" />
    </svg>
  ),
  Tableau: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.5 8.5v3h-3v1h3v3h1v-3h3v-1h-3v-3h-1zm-6 3.5v1h1v1h1v-1h1v-1h-1v-1h-1v1h-1zm12 0v1h1v1h1v-1h1v-1h-1v-1h-1v1h-1zm-6-8v1h1v1h1v-1h1v-1h-1v-1h-1v1h-1zm0 16v1h1v1h1v-1h1v-1h-1v-1h-1v1h-1z" />
    </svg>
  ),
  Excel: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
      <path d="M15 2H9C7.3 2 6 3.3 6 5v14c0 1.7 1.3 3 3 3h6c1.7 0 3-1.3 3-3V5c0-1.7-1.3-3-3-3zm-1 13.5l-1.5-1.5-1.5 1.5-1-1 1.5-1.5-1.5-1.5 1-1 1.5 1.5 1.5-1.5 1 1-1.5 1.5 1.5 1.5-1 1z" />
    </svg>
  ),
  Flask: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  ),
  Django: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.5 1.5H6v21h5.5c4.7 0 8.5-3.8 8.5-8.5s-3.8-8.5-8.5-8.5zm0 17H8V5h3.5c2.5 0 4.5 2 4.5 4.5S14 18.5 11.5 18.5z" />
    </svg>
  ),
  Streamlit: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L2 19h20L12 2zm0 4.6l6.4 10.9H5.6L12 6.6z" />
    </svg>
  ),
  MongoDB: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C7.2 0 4.8 4.2 4.8 7.2c0 4.6 4.8 9.6 7.2 16.8 2.4-7.2 7.2-12.2 7.2-16.8C19.2 4.2 16.8 0 12 0zm0 14.4c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3z" />
    </svg>
  ),
  ngrok: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="9" y1="9" x2="15" y2="15"></line>
      <line x1="15" y1="9" x2="9" y2="15"></line>
    </svg>
  ),
};

const SKILL_GROUPS = [
  {
    id: "prog",
    title: "Programming Foundation",
    icon: <Terminal className="w-5 h-5 text-cyan-400" />,
    skills: ["Python", "SQL", "HTML5", "CSS3"],
    details: "Strong fundamentals in Python programming, analytical databases, and modern front-end layouts.",
  },
  {
    id: "ds",
    title: "Data Science & AI",
    icon: <BrainCircuit className="w-5 h-5 text-indigo-400" />,
    skills: ["Machine Learning", "Deep Learning", "NLP", "Generative AI", "Scikit-Learn", "Pandas"],
    details: "Expertise in neural network models, classification pipelines, text tokenizers, and high-performance data processing.",
  },
  {
    id: "tools",
    title: "Analytics & Tools",
    icon: <Database className="w-5 h-5 text-purple-400" />,
    skills: ["Tableau", "Excel", "Flask", "Django", "Streamlit", "MongoDB", "ngrok"],
    details: "Experience in business intelligence reports, serving APIs, live dashboards, and database structuring.",
  },
];

export function Skills() {
  const [activeGroup, setActiveGroup] = useState<string>("prog");
  const { playHover, playClick } = useSound();

  const handleGroupSelect = (id: string) => {
    playClick();
    setActiveGroup(id);
  };

  // Extract current skill lists to highlight in orbit
  const highlightedSkills = SKILL_GROUPS.find((g) => g.id === activeGroup)?.skills || [];

  return (
    <section
      id="skills"
      className="relative min-h-screen flex items-center justify-center py-20 px-4 md:px-8 max-w-7xl mx-auto z-10 scroll-mt-12"
    >
      <div className="w-full flex flex-col gap-12">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-mono tracking-widest uppercase mb-4">
            <Laptop className="w-3 h-3" />
            <span>TECHNOLOGY INDEX</span>
          </div>
          <h2 className="font-display font-black text-3xl md:text-5xl text-white tracking-tight uppercase">
            Technical{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500 text-glow-blue">
              Index & Orbit
            </span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-indigo-600 rounded-full mt-4" />
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Side: Skill Category Cards */}
          <div className="lg:col-span-5 flex flex-col gap-5 text-left">
            {SKILL_GROUPS.map((group) => {
              const isActive = activeGroup === group.id;

              return (
                <button
                  key={group.id}
                  onClick={() => handleGroupSelect(group.id)}
                  onMouseEnter={playHover}
                  className={cn(
                    "w-full text-left transition-all duration-300",
                    isActive ? "scale-[1.02]" : "hover:scale-[1.01]"
                  )}
                >
                  <GlassCard
                    glowColor={group.id === "prog" ? "blue" : group.id === "ds" ? "indigo" : "purple"}
                    className={cn(
                      "p-6 border-white/5 bg-white/[0.01] hover:bg-white/[0.03] backdrop-blur-xl smooth-trans",
                      isActive && "border-cyan-500/25 bg-white/[0.04] shadow-[0_0_20px_rgba(6,182,212,0.1)]"
                    )}
                  >
                    <div className="flex items-center gap-3 mb-3 select-none">
                      <div className={cn(
                        "p-2.5 rounded-xl bg-white/5",
                        isActive ? "text-cyan-400" : "text-neutral-400"
                      )}>
                        {group.icon}
                      </div>
                      <h3 className="font-display font-bold text-md text-white">
                        {group.title}
                      </h3>
                    </div>
                    <p className="text-xs text-neutral-400 leading-relaxed font-sans mb-4 select-none">
                      {group.details}
                    </p>
                    
                    {/* Badge List inside card */}
                    <div className="flex flex-wrap gap-1.5 select-none">
                      {group.skills.map((skill) => (
                        <span
                          key={skill}
                          className={cn(
                            "text-[9px] font-mono px-2 py-0.5 rounded-full border transition-all duration-300",
                            isActive 
                              ? "text-cyan-300 border-cyan-500/20 bg-cyan-500/5"
                              : "text-neutral-500 border-white/5"
                          )}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </GlassCard>
                </button>
              );
            })}
          </div>

          {/* Right Side: Concentric Skill Orbit */}
          <div className="lg:col-span-7 flex items-center justify-center relative aspect-square max-w-[480px] lg:max-w-none mx-auto w-full overflow-hidden select-none">
            
            {/* Pulsating Core */}
            <motion.div
              animate={{ scale: [0.95, 1.05, 0.95] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-20 h-20 rounded-full glassmorphism border-cyan-500/20 flex flex-col items-center justify-center z-20 shadow-[0_0_30px_rgba(6,182,212,0.2)]"
            >
              <BrainCircuit className="w-7 h-7 text-cyan-400 animate-pulse" />
              <span className="text-[7px] font-mono font-bold text-neutral-400 mt-1 uppercase tracking-widest">AI CORE</span>
            </motion.div>

            {/* Inner Ring (Programming - radius 80px) - Rotates counter-clockwise */}
            <div className="absolute w-[180px] h-[180px] rounded-full border border-white/5 flex items-center justify-center animate-[spin_25s_linear_infinite_reverse] hover:[animation-play-state:paused] pointer-events-none lg:pointer-events-auto">
              {SKILL_GROUPS[0].skills.map((skill, idx, arr) => {
                const angle = (idx / arr.length) * 2 * Math.PI;
                const radius = 90; // px
                const x = radius * Math.cos(angle);
                const y = radius * Math.sin(angle);
                const isLit = highlightedSkills.includes(skill);

                return (
                  <div
                    key={skill}
                    style={{
                      transform: `translate(${x}px, ${y}px)`,
                    }}
                    className="absolute pointer-events-auto"
                  >
                    <motion.div
                      onMouseEnter={playHover}
                      whileHover={{ scale: 1.25 }}
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center glassmorphism cursor-pointer smooth-trans text-neutral-400 hover:text-cyan-400 border-white/5",
                        isLit && "border-cyan-500/35 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.25)] bg-white/5"
                      )}
                      title={skill}
                    >
                      {/* Anti-rotate container so icons stay vertical */}
                      <div className="animate-[spin_25s_linear_infinite] [animation-play-state:inherit]">
                        {TECH_ICONS[skill] || <Terminal className="w-5 h-5" />}
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </div>

            {/* Middle Ring (Data Science - radius 140px) - Rotates clockwise */}
            <div className="absolute w-[290px] h-[290px] rounded-full border border-white/5 flex items-center justify-center animate-[spin_40s_linear_infinite] hover:[animation-play-state:paused] pointer-events-none lg:pointer-events-auto">
              {SKILL_GROUPS[1].skills.map((skill, idx, arr) => {
                const angle = (idx / arr.length) * 2 * Math.PI;
                const radius = 145; // px
                const x = radius * Math.cos(angle);
                const y = radius * Math.sin(angle);
                const isLit = highlightedSkills.includes(skill);

                return (
                  <div
                    key={skill}
                    style={{
                      transform: `translate(${x}px, ${y}px)`,
                    }}
                    className="absolute pointer-events-auto"
                  >
                    <motion.div
                      onMouseEnter={playHover}
                      whileHover={{ scale: 1.25 }}
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center glassmorphism cursor-pointer smooth-trans text-neutral-400 hover:text-indigo-400 border-white/5",
                        isLit && "border-indigo-500/35 text-indigo-400 shadow-[0_0_15px_rgba(139,92,246,0.25)] bg-white/5"
                      )}
                      title={skill}
                    >
                      <div className="animate-[spin_40s_linear_infinite_reverse] [animation-play-state:inherit]">
                        {TECH_ICONS[skill] || <BrainCircuit className="w-5 h-5" />}
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </div>

            {/* Outer Ring (Frameworks - radius 200px) - Rotates counter-clockwise */}
            <div className="absolute w-[400px] h-[400px] rounded-full border border-white/5 flex items-center justify-center animate-[spin_60s_linear_infinite_reverse] hover:[animation-play-state:paused] pointer-events-none lg:pointer-events-auto">
              {SKILL_GROUPS[2].skills.map((skill, idx, arr) => {
                const angle = (idx / arr.length) * 2 * Math.PI;
                const radius = 200; // px
                const x = radius * Math.cos(angle);
                const y = radius * Math.sin(angle);
                const isLit = highlightedSkills.includes(skill);

                return (
                  <div
                    key={skill}
                    style={{
                      transform: `translate(${x}px, ${y}px)`,
                    }}
                    className="absolute pointer-events-auto"
                  >
                    <motion.div
                      onMouseEnter={playHover}
                      whileHover={{ scale: 1.25 }}
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center glassmorphism cursor-pointer smooth-trans text-neutral-400 hover:text-purple-400 border-white/5",
                        isLit && "border-purple-500/35 text-purple-400 shadow-[0_0_15px_rgba(139,92,246,0.25)] bg-white/5"
                      )}
                      title={skill}
                    >
                      <div className="animate-[spin_60s_linear_infinite] [animation-play-state:inherit]">
                        {TECH_ICONS[skill] || <Database className="w-5 h-5" />}
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
export default Skills;
