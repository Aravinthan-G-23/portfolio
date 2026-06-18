"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  onComplete: () => void;
}

const BOOT_LOGS = [
  "INITIALIZING DATA SCIENCE PORTFOLIO...",
  "ESTABLISHING CONSTELLATION WEBGL GRID...",
  "LOADING NEURAL NETWORK MODELS...",
  "IMPORTING PANDAS & SCIKIT-LEARN ENGINE...",
  "RESOLVING GAZE TRACKING HCI SYSTEM...",
  "RENDERING 3D GEOMETRIC SPHERES...",
  "COMPLETING PIPELINE DEPLOYMENT...",
];

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [logIdx, setLogIdx] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Increment percentage counter
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setIsDone(true);
          setTimeout(onComplete, 1200); // Allow fade-out animation to complete
          return 100;
        }
        // Random incremental hops
        const hop = Math.floor(Math.random() * 8) + 4;
        return Math.min(prev + hop, 100);
      });
    }, 100);

    // Rotate status logs
    const logInterval = setInterval(() => {
      setLogIdx((prev) => (prev < BOOT_LOGS.length - 1 ? prev + 1 : prev));
    }, 400);

    return () => {
      clearInterval(progressInterval);
      clearInterval(logInterval);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="loader"
          exit={{ opacity: 0, filter: "blur(30px)" }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 bg-[#050816] z-50 flex flex-col items-center justify-center font-mono select-none overflow-hidden"
        >
          {/* Cyber matrix background elements */}
          <div className="absolute inset-0 cyber-grid radial-mask opacity-15" />

          {/* Core visual container */}
          <div className="relative flex flex-col items-center max-w-sm w-full px-8 text-center z-10">
            {/* Pulsating Glowing Logo Center */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: [0.95, 1.05, 0.95], opacity: 1 }}
              transition={{
                opacity: { duration: 0.8 },
                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
              }}
              className="relative w-24 h-24 rounded-2xl flex items-center justify-center border border-indigo-500/20 bg-indigo-500/5 shadow-[0_0_50px_rgba(79,70,229,0.15)] mb-8"
            >
              {/* Corner brackets */}
              <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t-2 border-l-2 border-cyan-400" />
              <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b-2 border-r-2 border-indigo-400" />

              <span className="font-display font-black text-3xl tracking-widest text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 via-indigo-400 to-purple-500">
                AG
              </span>
            </motion.div>

            {/* Percentage Number Counter */}
            <div className="relative mb-3">
              <span className="text-5xl font-black text-white tracking-widest tabular-nums text-glow-blue">
                {String(progress).padStart(3, "0")}
              </span>
              <span className="text-sm font-bold text-cyan-400 ml-1">%</span>
            </div>

            {/* Status terminal logs */}
            <div className="h-5 overflow-hidden mb-6 w-full">
              <motion.p
                key={logIdx}
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-[9px] text-cyan-400/80 tracking-wider font-semibold uppercase"
              >
                {BOOT_LOGS[logIdx]}
              </motion.p>
            </div>

            {/* Glowing Linear Progress Bar */}
            <div className="relative w-full h-[3px] bg-neutral-900 rounded-full overflow-hidden border border-white/5">
              <motion.div
                className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-600 rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Absolute decorative details */}
          <div className="absolute bottom-6 left-6 text-[8px] text-neutral-600 tracking-widest uppercase">
            SYS STATUS: ONLINE
          </div>
          <div className="absolute bottom-6 right-6 text-[8px] text-neutral-600 tracking-widest uppercase">
            SECURE LINK V1.0.0
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
export default LoadingScreen;
