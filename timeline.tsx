"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { internshipsData } from "@/constants/data";

export function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll tracking for vertical line drawing
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end center"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative min-h-screen py-20 px-4 md:px-8 max-w-4xl mx-auto z-10 scroll-mt-12"
    >
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-mono tracking-widest uppercase mb-4"
        >
          <Briefcase className="w-3 h-3" />
          <span>CAREER DIRECTORY</span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display font-black text-3xl md:text-5xl text-white tracking-tight uppercase"
        >
          Internship{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500 text-glow-blue">
            Timeline
          </span>
        </motion.h2>
        <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-indigo-600 rounded-full mt-4" />
      </div>

      <div className="relative mt-12 pl-6 sm:pl-10">
        {/* Draw Line Track - Left-aligned */}
        <div className="absolute left-0 sm:left-2 top-0 bottom-0 w-[2px] bg-neutral-900" />

        {/* Dynamic Glowing Line Progress */}
        <motion.div
          style={{ scaleY }}
          className="absolute left-0 sm:left-2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyan-400 via-indigo-500 to-purple-600 origin-top shadow-[0_0_10px_rgba(6,182,212,0.4)]"
        />

        {/* Timeline Items */}
        <div className="space-y-12">
          {internshipsData.map((internship, index) => {
            return (
              <div
                key={internship.id}
                className="relative pl-8 sm:pl-12 pb-2 last:pb-0 text-left"
              >
                {/* Visual Circle Node On Timeline Track */}
                <div className="absolute left-0 sm:left-2 top-6 -translate-x-1/2 z-20 flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-10%" }}
                    className="w-4 h-4 rounded-full bg-neutral-950 border-2 border-cyan-400 flex items-center justify-center"
                  >
                    {/* Inner pulse */}
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping absolute" />
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  </motion.div>
                </div>

                {/* Content Card (reveals on scroll) */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-15%" }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                >
                  <GlassCard
                    glowColor={index % 2 === 0 ? "blue" : "purple"}
                    className="border-white/5 bg-white/[0.02] hover:bg-white/[0.04] p-6 sm:p-8"
                  >
                    {/* Time Duration */}
                    <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono text-cyan-400 uppercase tracking-widest mb-3">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{internship.duration}</span>
                    </div>

                    {/* Header Details */}
                    <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/5 pb-4 mb-4 select-none">
                      <div>
                        <h3 className="font-display font-black text-lg md:text-xl text-white">
                          {internship.role}
                        </h3>
                        <p className="font-mono text-xs text-neutral-400 tracking-wider mt-1">
                          {internship.company}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 text-[10px] font-mono text-neutral-500 bg-white/5 border border-white/5 px-2.5 py-1 rounded-full uppercase">
                        <MapPin className="w-3 h-3 text-indigo-400" />
                        <span>{internship.duration.split("|")[0].trim()}</span>
                      </div>
                    </div>

                    {/* Bullet Achievements */}
                    <ul className="space-y-2.5 mb-6">
                      {internship.description.map((bullet, idx) => (
                        <li
                          key={idx}
                          className="text-neutral-400 text-xs sm:text-sm leading-relaxed flex items-start gap-2.5 font-sans"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0 mt-1.5" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Technical Skills Badges */}
                    <div className="flex flex-wrap gap-1.5 border-t border-white/5 pt-4">
                      {internship.skills.map((skill) => (
                        <span
                          key={skill}
                          className="text-[9px] font-mono font-medium text-neutral-300 bg-white/5 hover:bg-white/10 hover:text-cyan-400 border border-white/5 hover:border-cyan-500/20 px-2.5 py-1 rounded-full transition-all duration-300 cursor-default"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </GlassCard>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
export default Timeline;
