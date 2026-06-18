"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Eye, BarChart2 } from "lucide-react";
import { useSound } from "@/hooks/use-sound";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { personalInfo } from "@/constants/data";

// Typing titles definition
const TYPING_TITLES = [
  "Aspiring Data Scientist",
  "Data Analytics Specialist",
  "Deep Learning Enthusiast",
  "AI Solutions Architect",
];

interface PlexusNode {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

function SVGPlexus() {
  const containerRef = useRef<SVGSVGElement>(null);
  const [nodes, setNodes] = useState<PlexusNode[]>([]);
  const [mouse, setMouse] = useState({ x: 0, y: 0, active: false });

  // Initialize nodes inside 400x400 space
  useEffect(() => {
    const count = 30;
    const initialNodes: PlexusNode[] = [];
    for (let i = 0; i < count; i++) {
      initialNodes.push({
        id: i,
        x: Math.random() * 400,
        y: Math.random() * 400,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
      });
    }
    setNodes(initialNodes);
  }, []);

  // Animation frame loop
  useEffect(() => {
    let animId: number;
    const update = () => {
      setNodes((prevNodes) =>
        prevNodes.map((node) => {
          let nx = node.x + node.vx;
          let ny = node.y + node.vy;
          let nvx = node.vx;
          let nvy = node.vy;

          // Boundary collision check
          if (nx < 0 || nx > 400) nvx *= -1;
          if (ny < 0 || ny > 400) nvy *= -1;

          nx = Math.max(0, Math.min(400, nx));
          ny = Math.max(0, Math.min(400, ny));

          // Attract nodes to mouse cursor
          if (mouse.active) {
            const dx = mouse.x - nx;
            const dy = mouse.y - ny;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 100) {
              nvx += dx * 0.0002;
              nvy += dy * 0.0002;
              // Speed limit
              const maxSpeed = 1.2;
              const speed = Math.sqrt(nvx * nvx + nvy * nvy);
              if (speed > maxSpeed) {
                nvx = (nvx / speed) * maxSpeed;
                nvy = (nvy / speed) * maxSpeed;
              }
            }
          }

          return { ...node, x: nx, y: ny, vx: nvx, vy: nvy };
        })
      );
      animId = requestAnimationFrame(update);
    };

    animId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animId);
  }, [mouse]);

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scaleX = 400 / rect.width;
    const scaleY = 400 / rect.height;
    setMouse({
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
      active: true,
    });
  };

  const handleMouseLeave = () => {
    setMouse((prev) => ({ ...prev, active: false }));
  };

  const lines: React.ReactNode[] = [];
  const maxDistance = 75;

  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < maxDistance) {
        const opacity = (1 - dist / maxDistance) * 0.4;
        lines.push(
          <line
            key={`${nodes[i].id}-${nodes[j].id}`}
            x1={nodes[i].x}
            y1={nodes[i].y}
            x2={nodes[j].x}
            y2={nodes[j].y}
            stroke="#06b6d4"
            strokeWidth="0.8"
            strokeOpacity={opacity}
          />
        );
      }
    }
  }

  return (
    <svg
      ref={containerRef}
      viewBox="0 0 400 400"
      className="w-full h-full cursor-crosshair select-none"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <defs>
        <radialGradient id="mesh-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="200" cy="200" r="180" fill="url(#mesh-grad)" stroke="#06b6d4" strokeWidth="0.5" strokeOpacity="0.08" />
      {lines}
      {nodes.map((node) => (
        <g key={node.id}>
          <circle cx={node.x} cy={node.y} r="2" fill="#8b5cf6" />
          <circle cx={node.x} cy={node.y} r="4.5" fill="none" stroke="#06b6d4" strokeWidth="0.5" strokeOpacity="0.3" />
        </g>
      ))}
      {mouse.active && (
        <circle cx={mouse.x} cy={mouse.y} r="12" fill="none" stroke="#8b5cf6" strokeWidth="0.8" strokeOpacity="0.5" className="animate-pulse" />
      )}
    </svg>
  );
}

export function Hero() {
  const { playHover, playClick } = useSound();
  const [titleIdx, setTitleIdx] = useState(0);
  const [subText, setSubText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Telemetry numbers
  const [telemetry, setTelemetry] = useState({ accuracy: 98.2, loss: 0.0124, fps: 60 });

  // Typist effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentFullText = TYPING_TITLES[titleIdx];
    
    if (isDeleting) {
      timer = setTimeout(() => {
        setSubText((prev) => prev.slice(0, -1));
      }, 50);
    } else {
      timer = setTimeout(() => {
        setSubText(currentFullText.slice(0, subText.length + 1));
      }, 100);
    }

    if (!isDeleting && subText === currentFullText) {
      timer = setTimeout(() => setIsDeleting(true), 1500); // Hold before deleting
    } else if (isDeleting && subText === "") {
      setIsDeleting(false);
      setTitleIdx((prev) => (prev + 1) % TYPING_TITLES.length);
    }

    return () => clearTimeout(timer);
  }, [subText, isDeleting, titleIdx]);

  // Telemetry updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry((prev) => ({
        accuracy: +(prev.accuracy + (Math.random() - 0.5) * 0.1).toFixed(2),
        loss: +(Math.max(0.005, prev.loss + (Math.random() - 0.5) * 0.0005)).toFixed(5),
        fps: Math.random() > 0.8 ? (Math.random() > 0.5 ? 59 : 61) : 60,
      }));
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id: string) => {
    playClick();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden px-4 md:px-8 max-w-7xl mx-auto z-10"
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-6">
        
        {/* Left Side: Typography */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left">
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-display font-black text-5xl md:text-7xl lg:text-[5.5rem] tracking-tight leading-none text-white select-none"
          >
            <span className="block mb-2">I&apos;m Aravinthan</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500 text-glow-blue">
              G
            </span>
          </motion.h1>

          {/* Typing titles */}
          <div className="h-10 mt-4 flex items-center select-none font-mono">
            <span className="text-neutral-400 text-sm md:text-lg uppercase tracking-widest mr-2 select-none">
              &gt;
            </span>
            <span className="text-white text-md md:text-xl font-bold uppercase tracking-widest text-glow-blue border-r-2 border-cyan-400 pr-1 animate-[pulse_0.8s_infinite]">
              {subText}
            </span>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-neutral-400 text-md md:text-lg max-w-xl mt-6 leading-relaxed font-sans select-none"
          >
            {personalInfo.tagline}. {personalInfo.shortTagline}
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap gap-4 mt-8"
          >
            <MagneticButton onHoverStart={playHover}>
              <button
                onClick={() => scrollToSection("projects")}
                className="group relative flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-600 font-mono text-xs font-bold uppercase tracking-wider text-white overflow-hidden shadow-lg shadow-indigo-500/20 active:scale-95 smooth-trans"
              >
                <span className="relative z-10">Explore Projects</span>
                <ArrowUpRight className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </button>
            </MagneticButton>

            <MagneticButton onHoverStart={playHover}>
              <button
                onClick={() => scrollToSection("contact")}
                className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 font-mono text-xs font-bold uppercase tracking-wider text-white active:scale-95 smooth-trans"
              >
                <span>Contact Me</span>
              </button>
            </MagneticButton>
          </motion.div>
        </div>

        {/* Right Side: 3D Visualization */}
        <div className="lg:col-span-5 relative w-full aspect-square md:max-w-md lg:max-w-none mx-auto flex items-center justify-center">
          
          {/* Central interactive plexus viewport */}
          <div className="w-full h-full absolute inset-0 z-10">
            <SVGPlexus />
          </div>

          {/* Interactive UI Glass overlays (Gaze tracking details) */}
          
          {/* Widget 1: Top Right Telemetry */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.9, type: "spring" }}
            className="absolute top-[8%] right-[5%] z-20 glassmorphism p-3.5 rounded-xl border border-white/10 flex items-center gap-3 backdrop-blur-xl shadow-lg w-[190px]"
          >
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
              <Eye className="w-4 h-4 animate-[pulse_1.2s_infinite]" />
            </div>
            <div className="font-mono text-left">
              <p className="text-[8px] text-neutral-500 uppercase tracking-wider">Gaze Tracker Acc</p>
              <h4 className="text-sm font-bold text-white tracking-widest tabular-nums text-glow-blue">{telemetry.accuracy}%</h4>
            </div>
          </motion.div>

          {/* Widget 2: Bottom Left Real-Time Graph */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: -20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 1.1, type: "spring" }}
            className="absolute bottom-[10%] left-[2%] z-20 glassmorphism p-3.5 rounded-xl border border-white/10 backdrop-blur-xl shadow-lg w-[180px]"
          >
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-[8px] font-mono text-neutral-500 uppercase tracking-widest">Neural Loss</span>
              <span className="text-[9px] font-mono text-purple-400 font-bold tabular-nums">{telemetry.loss}</span>
            </div>
            
            {/* SVG Sparkline */}
            <svg className="w-full h-8 overflow-visible" viewBox="0 0 100 30">
              <path
                d={`M 0 25 Q 15 ${10 + Math.random() * 8} 30 18 T 60 ${12 + Math.random() * 6} T 90 ${5 + Math.random() * 5} L 100 5`}
                fill="none"
                stroke="#8b5cf6"
                strokeWidth="2"
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
              <path
                d={`M 0 25 Q 15 ${10 + Math.random() * 8} 30 18 T 60 ${12 + Math.random() * 6} T 90 ${5 + Math.random() * 5} L 100 5 L 100 30 L 0 30 Z`}
                fill="url(#sparklineGrad)"
                className="transition-all duration-1000"
              />
              <defs>
                <linearGradient id="sparklineGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>

          {/* Widget 3: Bottom Right System Stats */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 1.3, type: "spring" }}
            className="absolute bottom-[5%] right-[5%] z-20 glassmorphism p-3.5 rounded-xl border border-white/10 backdrop-blur-xl shadow-lg w-[160px]"
          >
            <div className="flex items-center justify-between font-mono text-left text-[9px]">
              <span className="text-neutral-500 uppercase">TELEMETRY FPS:</span>
              <span className="text-cyan-400 font-bold tabular-nums">{telemetry.fps}</span>
            </div>
            <div className="flex items-center justify-between font-mono text-left text-[9px] mt-1">
              <span className="text-neutral-500 uppercase">MODEL PARAM:</span>
              <span className="text-white font-bold">142M</span>
            </div>
          </motion.div>

          {/* Glowing node connections lines as background visual (behind widgets) */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500/5 to-purple-500/5 filter blur-3xl pointer-events-none animate-pulse-glow -z-10" />
        </div>
      </div>
    </section>
  );
}
export default Hero;
