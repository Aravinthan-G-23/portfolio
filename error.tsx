"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { RefreshCw, ShieldAlert } from "lucide-react";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { useSound } from "@/hooks/use-sound";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  const { playHover, playClick } = useSound();

  useEffect(() => {
    // Log telemetry error
    console.error("Pipeline failure:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#050816] font-mono px-6 relative overflow-hidden select-none">
      {/* Grid overlay background */}
      <div className="absolute inset-0 cyber-grid radial-mask opacity-15" />
      
      {/* Aurora glow blobs */}
      <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] rounded-full bg-rose-500/5 blur-[100px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] rounded-full bg-indigo-500/5 blur-[100px] animate-pulse-glow" style={{ animationDelay: "-3s" }} />

      <div className="relative flex flex-col items-center max-w-md text-center z-10">
        
        {/* Pulsating Glowing Alert */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 15 }}
          className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 shadow-[0_0_30px_rgba(245,158,11,0.1)] text-amber-500 mb-8"
        >
          <ShieldAlert className="w-10 h-10 animate-pulse" />
        </motion.div>

        {/* Header title */}
        <h1 className="text-4xl font-black text-white tracking-widest text-glow-purple mb-3 select-none">
          SYSTEM FAULT
        </h1>
        <h2 className="text-xs text-amber-500 uppercase tracking-widest font-bold mb-6 select-none">
          &gt; PIPELINE_STACK_COLLAPSED
        </h2>

        <p className="text-xs text-neutral-400 leading-relaxed mb-8 select-none">
          An exception occurred during neural routing or WebGL projection. Telemetry reports digest code: <span className="text-cyan-400 font-bold">{error.digest || "UNKNOWN_ERROR"}</span>
        </p>

        {/* Retry controls */}
        <div className="flex gap-4">
          <MagneticButton onHoverStart={playHover}>
            <button
              onClick={() => {
                playClick();
                reset();
              }}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 to-rose-600 font-bold text-xs uppercase tracking-wider text-white smooth-trans active:scale-95 cursor-pointer shadow-lg shadow-amber-500/10"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reset Pipeline</span>
            </button>
          </MagneticButton>
        </div>

      </div>
    </div>
  );
}
