"use client";

import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/utils/helpers";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: "blue" | "purple" | "indigo";
}

export function GlassCard({ children, className, glowColor = "indigo" }: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);

  const rotateX = useSpring(0, { stiffness: 120, damping: 20 });
  const rotateY = useSpring(0, { stiffness: 120, damping: 20 });
  
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;

    // 15 degrees max rotation
    rotateX.set(-mouseY / (height / 15));
    rotateY.set(mouseX / (width / 15));

    const pctX = ((e.clientX - rect.left) / width) * 100;
    const pctY = ((e.clientY - rect.top) / height) * 100;
    glowX.set(pctX);
    glowY.set(pctY);
  };

  const handleMouseEnter = () => {
    setHovering(true);
  };

  const handleMouseLeave = () => {
    setHovering(false);
    rotateX.set(0);
    rotateY.set(0);
  };

  const glowStyles = {
    blue: "rgba(6, 182, 212, 0.15)",
    purple: "rgba(139, 92, 246, 0.15)",
    indigo: "rgba(79, 70, 229, 0.15)"
  };

  const backgroundGlow = useTransform(
    [glowX, glowY],
    ([x, y]) => `radial-gradient(300px circle at ${x}% ${y}%, ${glowStyles[glowColor]}, transparent 80%)`
  );

  return (
    <motion.div
      ref={cardRef}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "glassmorphism relative overflow-hidden rounded-2xl p-6 transition-all duration-300",
        hovering && "border-white/20 shadow-2xl",
        hovering && (glowColor === "blue" ? "shadow-cyan-500/10" : glowColor === "purple" ? "shadow-purple-500/10" : "shadow-indigo-500/10"),
        className
      )}
    >
      {/* Magnetic spotlight overlay */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300"
        style={{
          background: backgroundGlow,
          opacity: hovering ? 1 : 0,
        }}
      />

      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
export default GlassCard;
