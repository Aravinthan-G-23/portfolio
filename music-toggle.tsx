"use client";

import React, { useEffect, useRef, useState } from "react";
import { useSound } from "@/hooks/use-sound";
import { cn } from "@/utils/helpers";

export function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const synthNodesRef = useRef<any[]>([]);
  const { playClick } = useSound();

  const startAmbientSynth = () => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0, ctx.currentTime);
      masterGain.gain.linearRampToValueAtTime(0.07, ctx.currentTime + 2.5); // Smooth fade in

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(280, ctx.currentTime);

      masterGain.connect(filter);
      filter.connect(ctx.destination);

      // C3 (130.81Hz), G3 (196.00Hz), C4 (261.63Hz), E4 (329.63Hz)
      const baseFreqs = [130.81, 196.00, 261.63, 329.63];
      const oscillators: any[] = [];
      const gains: any[] = [];

      baseFreqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();

        // Alternate voice shapes for rich harmonics
        osc.type = idx % 2 === 0 ? "triangle" : "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        osc.detune.setValueAtTime((Math.random() - 0.5) * 16, ctx.currentTime); // Chorus feel

        // Distribute gain across frequencies
        oscGain.gain.setValueAtTime(0.025, ctx.currentTime);

        osc.connect(oscGain);
        oscGain.connect(masterGain);
        osc.start();

        oscillators.push(osc);
        gains.push(oscGain);
      });

      let step = 0;
      const interval = setInterval(() => {
        if (!ctx || ctx.state === "closed") return;
        const time = ctx.currentTime;

        // Modulate filter cutoff slowly
        const nextCutoff = 280 + Math.sin(step * 0.12) * 100;
        filter.frequency.exponentialRampToValueAtTime(nextCutoff, time + 2);

        // Slow chord change progression: Alternates C Major 7 and F Major 7
        const isFMajor = step % 4 >= 2;
        const targetFreqs = isFMajor
          ? [174.61, 220.00, 261.63, 349.23] // F3, A3, C4, F4
          : [130.81, 196.00, 261.63, 329.63]; // C3, G3, C4, E4

        oscillators.forEach((osc, i) => {
          osc.frequency.exponentialRampToValueAtTime(targetFreqs[i], time + 3.5);
        });

        step++;
      }, 4500);

      synthNodesRef.current = [masterGain, filter, oscillators, gains, interval];
    } catch (e) {
      console.warn("AudioContext error:", e);
    }
  };

  const stopAmbientSynth = () => {
    try {
      const [masterGain, filter, oscillators, gains, interval] = synthNodesRef.current;
      if (interval) clearInterval(interval);

      if (masterGain && audioCtxRef.current) {
        masterGain.gain.setValueAtTime(masterGain.gain.value, audioCtxRef.current.currentTime);
        masterGain.gain.linearRampToValueAtTime(0, audioCtxRef.current.currentTime + 1.2);
      }

      setTimeout(() => {
        if (oscillators) {
          oscillators.forEach((osc: any) => {
            try {
              osc.stop();
            } catch (err) {}
          });
        }
      }, 1500);

      synthNodesRef.current = [];
    } catch (e) {
      console.warn("Audio stop error:", e);
    }
  };

  const handleToggle = () => {
    playClick();
    if (isPlaying) {
      stopAmbientSynth();
    } else {
      startAmbientSynth();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    return () => {
      stopAmbientSynth();
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return (
    <button
      onClick={handleToggle}
      className="flex items-center gap-2.5 px-3 py-1.5 rounded-full glassmorphism text-xs font-mono font-medium smooth-trans select-none text-white hover:text-cyan-400 hover:border-cyan-500/30 border-white/5 active:scale-95"
      aria-label="Toggle ambient background music"
    >
      <span className="relative flex h-2 w-2">
        {isPlaying && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
        )}
        <span className={cn(
          "relative inline-flex rounded-full h-2 w-2 transition-colors duration-300",
          isPlaying ? "bg-cyan-500" : "bg-neutral-500"
        )}></span>
      </span>
      <span>AMBIENT</span>
      
      {/* Equalizer animation */}
      <div className="flex gap-0.5 items-end h-2.5">
        <div className={cn("w-[2px] bg-current rounded-sm transition-all duration-300", isPlaying ? "animate-[pulse_0.8s_infinite_alternate] h-2.5" : "h-1.5")} style={{ animationDelay: "0.1s" }} />
        <div className={cn("w-[2px] bg-current rounded-sm transition-all duration-300", isPlaying ? "animate-[pulse_0.6s_infinite_alternate] h-3" : "h-2")} style={{ animationDelay: "0.3s" }} />
        <div className={cn("w-[2px] bg-current rounded-sm transition-all duration-300", isPlaying ? "animate-[pulse_0.7s_infinite_alternate] h-1.5" : "h-1")} style={{ animationDelay: "0.5s" }} />
      </div>
    </button>
  );
}
export default MusicToggle;
