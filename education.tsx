"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award, BookOpen, Landmark } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { educationData } from "@/constants/data";
import { useSound } from "@/hooks/use-sound";

export function Education() {
  const { playHover } = useSound();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section
      id="education"
      className="relative min-h-[70vh] flex items-center justify-center py-20 px-4 md:px-8 max-w-7xl mx-auto z-10 scroll-mt-12"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-15%" }}
        className="w-full flex flex-col gap-12"
      >
        {/* Section Title */}
        <div className="flex flex-col items-center text-center">
          <motion.h2
            variants={cardVariants}
            className="font-display font-black text-3xl md:text-5xl text-white tracking-tight uppercase"
          >
            Education{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500 text-glow-blue">
              Milestones
            </span>
          </motion.h2>
          <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-indigo-600 rounded-full mt-4" />
        </div>

        {/* UG & PG Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-4xl mx-auto w-full">
          {educationData.map((edu, idx) => {
            const isPg = edu.id === "edu-pg";

            return (
              <motion.div key={edu.id} variants={cardVariants} className="flex flex-col">
                <GlassCard
                  glowColor={isPg ? "purple" : "blue"}
                  className="relative flex-1 flex flex-col justify-between p-8 border-white/5 bg-white/[0.02] backdrop-blur-xl group hover:border-white/10 h-full"
                >
                  <div>
                    {/* Icon, Institution, and Status Badge */}
                    <div className="flex justify-between items-start gap-4 mb-8">
                      <div className="flex items-center gap-3.5">
                        <div 
                          onMouseEnter={playHover}
                          className="p-3 rounded-xl bg-white/5 text-cyan-400 group-hover:scale-115 transition-transform duration-300 shrink-0"
                        >
                          {isPg ? <Award className="w-6 h-6 text-purple-400" /> : <BookOpen className="w-6 h-6 text-cyan-400" />}
                        </div>
                        <div className="text-left font-mono">
                          <span className="text-[10px] text-neutral-500 uppercase tracking-widest block">
                            {isPg ? "Post Graduate Degree" : "Undergraduate Degree"}
                          </span>
                          <h4 className="text-xs text-neutral-300 font-bold tracking-wider mt-0.5 select-none">
                            {edu.degree}
                          </h4>
                        </div>
                      </div>

                      {/* Status Indicator Badge */}
                      <div className={`select-none font-mono text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-full border shrink-0 mt-1 ${
                        isPg 
                          ? "text-cyan-400 border-cyan-500/20 bg-cyan-500/5 shadow-[0_0_10px_rgba(6,182,212,0.1)] animate-pulse" 
                          : "text-emerald-400 border-emerald-500/20 bg-emerald-500/5 shadow-[0_0_10px_rgba(16,185,129,0.1)]"
                      }`}>
                        {isPg ? "Ongoing" : "Graduated"}
                      </div>
                    </div>

                    {/* Degree Field */}
                    <div className="text-left mb-6 select-none">
                      <h3 className="font-display font-black text-2xl text-white group-hover:text-cyan-400 smooth-trans">
                        {edu.field}
                      </h3>
                      {edu.grade && (
                        <p className="text-xs text-emerald-400 font-mono tracking-wider mt-1.5 uppercase">
                          Result: {edu.grade}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Institution and Duration Footer */}
                  <div className="border-t border-white/5 pt-6 mt-4 flex justify-between items-center text-left font-mono text-[10px] text-neutral-500 uppercase select-none">
                    <div className="flex items-center gap-1.5">
                      <Landmark className="w-3.5 h-3.5 text-neutral-600" />
                      <span>{isPg ? "M.Sc Data Science" : "B.Sc Computer Science"}</span>
                    </div>
                    <div>{edu.duration}</div>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
export default Education;
