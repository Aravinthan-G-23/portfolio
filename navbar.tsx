"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/utils/helpers";
import { useActiveSection } from "@/hooks/use-active-section";
import { useSound } from "@/hooks/use-sound";

const NAV_ITEMS = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const activeSection = useActiveSection(NAV_ITEMS.map((item) => item.id));
  const { playHover, playClick } = useSound();

  const handleNavClick = (id: string) => {
    playClick();
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-4 left-4 right-4 z-40 flex items-center justify-between px-6 py-3 rounded-full glassmorphism border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.4)] max-w-7xl mx-auto"
      >
        {/* Logo */}
        <div 
          onClick={() => handleNavClick("hero")}
          onMouseEnter={playHover}
          className="flex items-center gap-2 cursor-pointer font-display font-bold text-lg tracking-wider text-white select-none group"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500 group-hover:text-glow-blue transition-all duration-300">
            ARAVINTHAN
          </span>
          <span className="text-indigo-400 font-light">G</span>
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
        </div>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-1.5">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                onMouseEnter={playHover}
                className={cn(
                  "relative px-4 py-1.5 text-xs font-mono font-medium tracking-wide uppercase rounded-full smooth-trans select-none",
                  isActive 
                    ? "text-cyan-400" 
                    : "text-neutral-400 hover:text-white"
                )}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="activeNavTab"
                    className="absolute inset-0 -z-10 rounded-full bg-white/5 border border-white/10 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Mobile controls & Toggle */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={() => {
              playClick();
              setIsOpen(!isOpen);
            }}
            onMouseEnter={playHover}
            className="p-2 text-neutral-400 hover:text-white rounded-full bg-white/5 border border-white/5 hover:border-white/15"
            aria-label="Toggle Navigation Menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Glass Overlay Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-4 top-20 z-50 rounded-3xl p-6 bg-[#050816]/98 backdrop-blur-2xl border border-white/10 md:hidden flex flex-col gap-4 shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
          >
            <div className="flex flex-col gap-2">
              {NAV_ITEMS.map((item, idx) => {
                const isActive = activeSection === item.id;
                return (
                  <motion.button
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    onMouseEnter={playHover}
                    className={cn(
                      "w-full text-left px-4 py-3 rounded-xl font-mono text-sm uppercase tracking-wider smooth-trans",
                      isActive
                        ? "bg-gradient-to-r from-cyan-500/10 to-indigo-500/10 text-cyan-400 border border-cyan-500/20"
                        : "text-neutral-400 hover:text-white hover:bg-white/5"
                    )}
                  >
                    {item.label}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
export default Navbar;
