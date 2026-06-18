"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { GlassCard } from "@/components/ui/glass-card";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { personalInfo } from "@/constants/data";
import { useSound } from "@/hooks/use-sound";

export function Contact() {
  const { playHover, playClick } = useSound();
  
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playClick();
    if (!formState.name || !formState.email || !formState.message) return;

    setStatus("sending");
    // Simulate API pipeline transmission
    setTimeout(() => {
      setStatus("sent");
      setFormState({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 3000);
    }, 1500);
  };

  const contactMethods = [
    {
      name: "Email",
      value: personalInfo.contact.email,
      href: `mailto:${personalInfo.contact.email}`,
      icon: Mail,
      color: "text-cyan-400 border-cyan-500/20 bg-cyan-500/5 hover:bg-cyan-500/10",
    },
    {
      name: "WhatsApp",
      value: personalInfo.contact.phone,
      href: `https://wa.me/${personalInfo.contact.phone.replace(/[+\s]/g, "")}`,
      icon: FaWhatsapp,
      color: "text-emerald-400 border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10",
    },
    {
      name: "LinkedIn",
      value: "LinkedIn Profile",
      href: personalInfo.contact.linkedin,
      icon: FaLinkedin,
      color: "text-indigo-400 border-indigo-500/20 bg-indigo-500/5 hover:bg-indigo-500/10",
    },
    {
      name: "GitHub",
      value: "GitHub Account",
      href: personalInfo.contact.github,
      icon: FaGithub,
      color: "text-neutral-300 border-white/10 bg-white/5 hover:bg-white/10",
    },
  ];

  return (
    <section
      id="contact"
      className="relative min-h-screen flex items-center justify-center py-20 px-4 md:px-8 max-w-7xl mx-auto z-10 scroll-mt-12"
    >
      <div className="w-full flex flex-col gap-12">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center">
          <h2 className="font-display font-black text-3xl md:text-5xl text-white tracking-tight uppercase">
            Connect{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500 text-glow-blue">
              With Me
            </span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-indigo-600 rounded-full mt-4" />
        </div>

        {/* Form and Social Channels Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Glass Form */}
          <div className="lg:col-span-7">
            <GlassCard
              glowColor="blue"
              className="p-8 border-white/5 bg-white/[0.02] backdrop-blur-xl h-full flex flex-col justify-between"
            >
              <form onSubmit={handleSubmit} className="space-y-6 text-left">
                <div className="flex items-center gap-2 mb-4 select-none">
                  <Mail className="w-4 h-4 text-cyan-400" />
                  <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest">
                    Message Channel
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="form-name" className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">
                      Your Name
                    </label>
                    <input
                      id="form-name"
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="e.g. Alan Turing"
                      className="px-4 py-3 rounded-xl bg-white/5 border border-white/5 text-white font-mono text-xs tracking-wide focus:outline-none focus:border-cyan-500/40 focus:ring-1 focus:ring-cyan-500/20 smooth-trans"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="form-email" className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">
                      Email Address
                    </label>
                    <input
                      id="form-email"
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="e.g. alan@turing.org"
                      className="px-4 py-3 rounded-xl bg-white/5 border border-white/5 text-white font-mono text-xs tracking-wide focus:outline-none focus:border-cyan-500/40 focus:ring-1 focus:ring-cyan-500/20 smooth-trans"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="form-message" className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">
                    Message
                  </label>
                  <textarea
                    id="form-message"
                    required
                    rows={5}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Write your message here..."
                    className="px-4 py-3 rounded-xl bg-white/5 border border-white/5 text-white font-mono text-xs tracking-wide focus:outline-none focus:border-cyan-500/40 focus:ring-1 focus:ring-cyan-500/20 smooth-trans resize-none"
                  />
                </div>

                <MagneticButton onHoverStart={playHover} className="w-fit pt-2">
                  <button
                    type="submit"
                    disabled={status !== "idle"}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 font-mono text-xs font-bold uppercase tracking-wider text-white select-none active:scale-95 disabled:opacity-50 smooth-trans cursor-pointer w-full justify-center"
                  >
                    <span>{status === "idle" ? "Send Message" : status === "sending" ? "Sending..." : "Message Sent"}</span>
                    <Send className="w-4 h-4" />
                  </button>
                </MagneticButton>
              </form>
            </GlassCard>
          </div>

          {/* Right Column: Clean Contact Pathways */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <GlassCard
              glowColor="purple"
              className="p-8 border-white/5 bg-white/[0.02] backdrop-blur-xl h-full flex flex-col justify-between"
            >
              <div className="space-y-6">
                <div className="text-left select-none">
                  <h3 className="font-display font-black text-xl text-white tracking-tight uppercase">
                    Direct Channels
                  </h3>
                  <p className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest mt-1">
                    Reach out directly on these networks
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  {contactMethods.map((method) => {
                    const Icon = method.icon;
                    return (
                      <a
                        key={method.name}
                        href={method.href}
                        target={method.name !== "Email" ? "_blank" : undefined}
                        rel={method.name !== "Email" ? "noopener noreferrer" : undefined}
                        onMouseEnter={playHover}
                        className="group flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 hover:bg-white/[0.04] smooth-trans select-none text-left"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-xl border ${method.color.split(" ")[1]} ${method.color.split(" ")[2]} ${method.color.split(" ")[0]} group-hover:scale-110 smooth-trans`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-wider block">
                              {method.name}
                            </span>
                            <span className="font-mono text-xs text-neutral-300 font-bold group-hover:text-white smooth-trans">
                              {method.value}
                            </span>
                          </div>
                        </div>
                        <div className="text-neutral-500 group-hover:text-white group-hover:translate-x-1 smooth-trans">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            </GlassCard>
          </div>

        </div>
      </div>
    </section>
  );
}
export default Contact;
