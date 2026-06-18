"use client";

import React from "react";
import { motion } from "framer-motion";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { useSound } from "@/hooks/use-sound";

export default function NotFound() {
  const { playHover, playClick } = useSound();

  const handleGoHome = () => {
    playClick();
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#050816] font-mono px-6 relative overflow-hidden select-none">
      {/* Grid overlay background */}
      <div className="absolute inset-0 cyber-grid radial-mask opacity-15" />
      
      {/* Aurora glow blobs */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-cyan-500/10 blur-[100px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-purple-500/10 blur-[100px] animate-pulse-glow" style={{ animationDelay: "-4s" }} />

      <div className="relative flex flex-col items-center max-w-md text-center z-10">
        
        {/* Glowing Warning Box */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 15 }}
          className="p-4 rounded-2xl bg-rose-500/5 border border-rose-500/20 shadow-[0_0_30px_rgba(244,63,94,0.1)] text-rose-400 mb-8"
        >
          <AlertCircle className="w-10 h-10 animate-bounce" />
        </motion.div>

        {/* 404 text */}
        <h1 className="text-7xl font-black text-white tracking-widest text-glow-purple mb-4 select-none">
          404
        </h1>
        <h2 className="text-xs text-cyan-400 uppercase tracking-widest font-bold mb-6 select-none">
          &gt; ERROR_NODE_NOT_FOUND
        </h2>
        
        <p className="text-xs text-neutral-400 leading-relaxed mb-8 select-none">
          The coordinate address you targeted is outside our current mapping parameters. It may have drifted into deep space or been permanently deleted.
        </p>

        {/* Home redirect */}
        <MagneticButton onHoverStart={playHover}>
          <button
            onClick={handleGoHome}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:border-white/20 text-xs font-bold uppercase tracking-wider text-white smooth-trans active:scale-95 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Home Node</span>
          </button>
        </MagneticButton>

      </div>
    </div>
  );
}
