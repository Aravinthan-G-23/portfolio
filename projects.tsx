"use client";

import React from "react";
import { motion } from "framer-motion";
import { FolderGit2, BarChart2, ShieldCheck, Check } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { GlassCard } from "@/components/ui/glass-card";
import { projectsData } from "@/constants/data";
import { useSound } from "@/hooks/use-sound";

// Custom premium SVG animations to represent project mockups without image dependencies
function ProjectPreview({ id }: { id: string }) {
  if (id === "certiguard") {
    return (
      <div className="relative w-full h-48 bg-neutral-950/40 rounded-xl overflow-hidden border border-white/5 flex items-center justify-center group-hover:border-purple-500/20 smooth-trans">
        <div className="absolute inset-0 cyber-grid opacity-20" />
        
        {/* Certificate document SVG skeleton */}
        <div className="w-24 h-32 rounded-lg bg-neutral-900 border border-white/10 p-3 flex flex-col justify-between relative">
          <div className="w-8 h-2 bg-indigo-500/30 rounded" />
          <div className="space-y-1.5">
            <div className="w-full h-1 bg-neutral-800 rounded" />
            <div className="w-14 h-1 bg-neutral-800 rounded" />
            <div className="w-16 h-1 bg-neutral-800 rounded" />
          </div>
          <div className="flex justify-between items-center">
            <div className="w-4 h-4 rounded-full border border-indigo-500/40" />
            <Check className="w-3.5 h-3.5 text-emerald-400 animate-[bounce_1.5s_infinite]" />
          </div>
          
          {/* Laser Scan line */}
          <motion.div
            animate={{ y: [0, 120, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_8px_rgba(6,182,212,0.6)]"
          />
        </div>

        <div className="absolute top-3 right-3 flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full text-[7px] font-mono text-emerald-400 uppercase tracking-widest select-none">
          <ShieldCheck className="w-2.5 h-2.5" />
          <span>VERIFIED</span>
        </div>
      </div>
    );
  }

  if (id === "twitter-sentiment") {
    return (
      <div className="relative w-full h-48 bg-neutral-950/40 rounded-xl overflow-hidden border border-white/5 flex items-center justify-center group-hover:border-cyan-500/20 smooth-trans">
        <div className="absolute inset-0 cyber-grid opacity-20" />
        
        {/* Animated Sentiment Bar Chart */}
        <div className="flex items-end gap-3 h-20 w-32 border-b border-white/10 pb-1 relative">
          <motion.div
            animate={{ height: ["20%", "75%", "50%", "85%", "65%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="w-4 bg-emerald-500/80 rounded-t shadow-[0_0_10px_rgba(16,185,129,0.3)]"
          />
          <motion.div
            animate={{ height: ["40%", "20%", "60%", "30%", "45%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="w-4 bg-rose-500/80 rounded-t shadow-[0_0_10px_rgba(244,63,94,0.3)]"
          />
          <motion.div
            animate={{ height: ["30%", "60%", "40%", "70%", "50%"] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="w-4 bg-neutral-500/80 rounded-t shadow-[0_0_10px_rgba(115,115,115,0.3)]"
          />
          
          <div className="absolute -top-6 left-0 right-0 text-center font-mono text-[7px] text-cyan-400 tracking-wider">
            NLP CLASSIFIER: ACTIVE
          </div>
        </div>

        <div className="absolute top-3 right-3 flex items-center gap-1 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded-full text-[7px] font-mono text-cyan-400 uppercase tracking-widest select-none">
          <BarChart2 className="w-2.5 h-2.5 animate-pulse" />
          <span>NLP ANALYSIS</span>
        </div>
      </div>
    );
  }

  if (id === "netflix-dashboard") {
    return (
      <div className="relative w-full h-48 bg-neutral-950/40 rounded-xl overflow-hidden border border-white/5 flex items-center justify-center group-hover:border-indigo-500/20 smooth-trans">
        <div className="absolute inset-0 cyber-grid opacity-20" />
        
        {/* Animated Dashboard Circle/Donut Chart */}
        <div className="relative w-20 h-20 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-neutral-800"
              strokeWidth="3.5"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 0.65 }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="text-red-500"
              strokeWidth="3.5"
              strokeDasharray="100"
              strokeLinecap="round"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 0.25 }}
              transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
              className="text-indigo-400"
              strokeWidth="3.5"
              strokeDasharray="100"
              strokeLinecap="round"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="font-display font-black text-red-500 text-xs">N</span>
            <span className="text-[6px] font-mono text-neutral-500 uppercase tracking-wider">STATS</span>
          </div>
        </div>

        <div className="absolute top-3 right-3 flex items-center gap-1 bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded-full text-[7px] font-mono text-red-400 uppercase tracking-widest select-none">
          <BarChart2 className="w-2.5 h-2.5 animate-pulse" />
          <span>ANALYTICS</span>
        </div>
      </div>
    );
  }

  return null;
}

export function Projects() {
  const { playHover, playClick } = useSound();
  const featuredList = projectsData.filter((p) => p.featured);

  return (
    <section
      id="projects"
      className="relative min-h-screen py-20 px-4 md:px-8 max-w-7xl mx-auto z-10 scroll-mt-12"
    >
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-mono tracking-widest uppercase mb-4">
          <FolderGit2 className="w-3.5 h-3.5" />
          <span>PORTFOLIO DIRECTORY</span>
        </div>
        <h2 className="font-display font-black text-3xl md:text-5xl text-white tracking-tight uppercase">
          Featured{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500 text-glow-blue">
            Projects
          </span>
        </h2>
        <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-indigo-600 rounded-full mt-4" />
      </div>

      {/* Featured Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-20">
        {featuredList.map((project) => (
          <div key={project.id} className="flex flex-col group h-full">
            <GlassCard
              glowColor={project.id === "twitter-sentiment" ? "blue" : project.id === "certiguard" ? "purple" : "indigo"}
              className="flex-1 flex flex-col justify-between p-6 border-white/5 bg-white/[0.02] hover:bg-white/[0.03] transition-all duration-500 group"
            >
              <div>
                {/* Simulated Graphical Preview */}
                <div className="mb-5">
                  <ProjectPreview id={project.id} />
                </div>

                {/* Header title */}
                <div className="text-left select-none mb-3">
                  <span className="text-[9px] font-mono text-cyan-400 uppercase tracking-widest block font-bold mb-1">
                    {project.subtitle}
                  </span>
                  <h3 className="font-display font-black text-lg md:text-xl text-white tracking-tight group-hover:text-cyan-400 smooth-trans">
                    {project.title}
                  </h3>
                </div>

                {/* Short description */}
                <p className="text-neutral-400 text-xs md:text-sm leading-relaxed text-left mb-6 font-sans select-none">
                  {project.description}
                </p>
              </div>

              {/* Badges and Buttons */}
              <div>
                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 border-t border-white/5 pt-4 mb-5 select-none">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      onMouseEnter={playHover}
                      className="text-[8px] font-mono text-neutral-300 bg-white/5 border border-white/5 px-2 py-0.5 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="text-[8px] font-mono text-neutral-500 bg-white/5 px-2 py-0.5 rounded-full font-bold">
                      +{project.technologies.length - 4} MORE
                    </span>
                  )}
                </div>

                {/* CTAs */}
                <div className="flex items-center gap-3">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={playHover}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/15 text-xs font-mono font-bold text-white uppercase tracking-wider smooth-trans active:scale-95 text-center cursor-pointer relative z-20"
                  >
                    <span>View Code</span>
                    <FaGithub className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </GlassCard>
          </div>
        ))}
      </div>
    </section>
  );
}
export default Projects;
