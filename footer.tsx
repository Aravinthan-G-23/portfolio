"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { personalInfo } from "@/constants/data";
import { useSound } from "@/hooks/use-sound";

export function Footer() {
  const { playHover, playClick } = useSound();

  const handleBackToTop = () => {
    playClick();
    document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative w-full py-12 px-4 md:px-8 max-w-7xl mx-auto z-10 overflow-hidden select-none font-mono">
      {/* Animated divider line drawing center-outwards */}
      <div className="relative w-full h-[1px] bg-neutral-900 mb-8 overflow-hidden">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50"
        />
      </div>

      <div className="flex flex-col items-center justify-center gap-6 text-xs text-neutral-500">
        
        {/* Centered Copyright */}
        <div className="text-center">
          <p>© {new Date().getFullYear()} {personalInfo.name}. All rights reserved.</p>
        </div>

        {/* Back to top */}
        <MagneticButton onHoverStart={playHover}>
          <button
            onClick={handleBackToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/5 hover:border-white/10 hover:text-white transition-all duration-300 group active:scale-95 cursor-pointer text-[10px] uppercase tracking-wider text-neutral-400"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 smooth-trans" />
          </button>
        </MagneticButton>

      </div>
    </footer>
  );
}
export default Footer;
