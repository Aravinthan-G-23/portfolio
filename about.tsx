"use client";

import React from "react";
import { motion } from "framer-motion";
import { User, Terminal, Target, Database, Brain, BarChart3 } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { personalInfo } from "@/constants/data";
import { useSound } from "@/hooks/use-sound";

export function About() {
  const { playHover } = useSound();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  const corePillars = [
    {
      icon: <Brain className="w-6 h-6 text-cyan-400" />,
      title: "Machine Learning & DL",
      description: "Building predictive modeling, deep learning architectures, and gaze-tracking interfaces.",
      glow: "blue" as const,
    },
    {
      icon: <Database className="w-6 h-6 text-indigo-400" />,
      title: "Data Pipelines & SQL",
      description: "Managing databases (MySQL, MongoDB) and cleaning heavy sets using Pandas and NumPy.",
      glow: "indigo" as const,
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-purple-400" />,
      title: "Analytics & Visualization",
      description: "Translating flat data catalogs into business summaries via Tableau and custom Streamlit apps.",
      glow: "purple" as const,
    },
  ];

  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center justify-center py-20 px-4 md:px-8 max-w-7xl mx-auto z-10 scroll-mt-12"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-20%" }}
        className="w-full flex flex-col gap-12"
      >
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center">
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] font-mono tracking-widest uppercase mb-4"
          >
            <User className="w-3 h-3" />
            <span>ARAVINTHAN BIO</span>
          </motion.div>
          <motion.h2
            variants={itemVariants}
            className="font-display font-black text-3xl md:text-5xl text-white tracking-tight uppercase"
          >
            Deciphering Code, <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500 text-glow-blue">
              Discovering Insights
            </span>
          </motion.h2>
          <motion.div
            variants={itemVariants}
            className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full mt-4"
          />
        </div>

        {/* 2-Column Core Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Column 1: Core Story (GlassCard) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <GlassCard
              glowColor="indigo"
              className="h-full flex flex-col justify-between border-white/5 bg-white/[0.03] backdrop-blur-xl p-8 md:p-10"
            >
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <Terminal className="w-5 h-5 text-indigo-400" />
                  <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest">
                    SYSTEM_STORY_PROMPT
                  </span>
                </div>
                <h3 className="font-display font-bold text-xl md:text-2xl text-white mb-6 select-none">
                  Bridging Raw Mathematical Datasets with Adaptive Artificial Intelligence.
                </h3>
                <p className="text-neutral-400 text-sm md:text-base leading-relaxed mb-6 font-sans select-none">
                  {personalInfo.about}
                </p>
                <p className="text-neutral-400 text-sm md:text-base leading-relaxed font-sans select-none">
                  I enjoy mapping anomalies, automating workflows, and writing algorithms that give machines sight and forecast future market swings.
                </p>
              </div>

              {/* Core Goal Target */}
              <div className="mt-8 pt-6 border-t border-white/5 flex items-center gap-4">
                <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 flex-shrink-0">
                  <Target className="w-5 h-5 animate-pulse" />
                </div>
                <div className="text-left font-mono">
                  <h4 className="text-[10px] text-neutral-500 uppercase tracking-wider">Primary Career Objective</h4>
                  <p className="text-xs text-neutral-300 font-semibold tracking-wide">
                    Become an industry-leading AI and Data Science Professional.
                  </p>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Column 2: Pillars & Focus area */}
          <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
            {corePillars.map((pillar, idx) => (
              <GlassCard
                key={idx}
                glowColor={pillar.glow}
                className="flex-1 flex gap-4 p-6 border-white/5 bg-white/[0.02] backdrop-blur-xl group hover:border-white/10"
              >
                <div 
                  onMouseEnter={playHover}
                  className="p-3 rounded-xl bg-white/5 text-cyan-400 flex-shrink-0 h-fit transition-transform duration-300 group-hover:scale-110"
                >
                  {pillar.icon}
                </div>
                <div className="text-left">
                  <h4 className="font-display font-bold text-md text-white mb-1.5 group-hover:text-cyan-400 smooth-trans">
                    {pillar.title}
                  </h4>
                  <p className="text-xs text-neutral-400 leading-relaxed font-sans select-none">
                    {pillar.description}
                  </p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

      </motion.div>
    </section>
  );
}
export default About;
