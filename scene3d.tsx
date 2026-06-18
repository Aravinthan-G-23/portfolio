"use client";

import React from "react";

export function Scene3D() {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden bg-[#050816]">
      {/* Cyber Grid Layer */}
      <div className="absolute inset-0 cyber-grid radial-mask opacity-40" />

      {/* Aurora gradients */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#4f46e5]/8 via-transparent to-[#06b6d4]/8 animate-aurora mix-blend-screen pointer-events-none" />

      {/* Moving blurred ambient glow blobs */}
      <div className="absolute inset-0 opacity-35">
        <div 
          className="absolute top-[10%] left-[15%] w-[320px] h-[320px] rounded-full bg-[#8b5cf6]/8 blur-[100px] animate-pulse-glow" 
          style={{ willChange: "transform, opacity" }} 
        />
        <div 
          className="absolute top-[55%] right-[8%] w-[420px] h-[420px] rounded-full bg-[#06b6d4]/8 blur-[120px] animate-pulse-glow" 
          style={{ animationDelay: "-6s", willChange: "transform, opacity" }} 
        />
        <div 
          className="absolute bottom-[8%] left-[12%] w-[350px] h-[350px] rounded-full bg-[#4f46e5]/5 blur-[110px] animate-pulse-glow" 
          style={{ animationDelay: "-3s", willChange: "transform, opacity" }} 
        />
      </div>

      {/* Floating SVG/CSS particles (GPU hardware-accelerated via transform rules) */}
      <div className="absolute inset-0 opacity-25">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="glow-cyan" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="glow-purple" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="18%" cy="25%" r="60" fill="url(#glow-cyan)" className="animate-[pulse_5s_infinite_alternate]" />
          <circle cx="82%" cy="18%" r="75" fill="url(#glow-purple)" className="animate-[pulse_6s_infinite_alternate]" style={{ animationDelay: "-1s" }} />
          <circle cx="48%" cy="72%" r="65" fill="url(#glow-cyan)" className="animate-[pulse_7s_infinite_alternate]" style={{ animationDelay: "-2s" }} />
          <circle cx="12%" cy="88%" r="50" fill="url(#glow-purple)" className="animate-[pulse_5s_infinite_alternate]" style={{ animationDelay: "-3s" }} />
          <circle cx="78%" cy="62%" r="80" fill="url(#glow-cyan)" className="animate-[pulse_6s_infinite_alternate]" style={{ animationDelay: "-1.5s" }} />
        </svg>
      </div>
    </div>
  );
}
export default Scene3D;
