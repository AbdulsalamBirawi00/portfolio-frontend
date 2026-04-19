"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa";
import { fadeInLeft, fadeInRight } from "@/lib/animations";
import SectionHeading from "@/components/ui/SectionHeading";
import type { AboutData } from "@/types";

const DEFAULT_ABOUT: AboutData = {
  bio: `Astronaut of the digital frontier. I'm Abdalsalam, a Front-End Developer with 5+ years navigating the vast cosmos of web development. Currently piloting fintech missions at MOOLA in Riyadh, where I build real-time expense management interfaces that help corporations chart their financial galaxies.

My journey began at Craft Code in Syria, where I forged my foundation. I've since traveled through Uplink and Growth Hacker (Montreal), optimizing code, reducing load times, and leaving a trail of beautiful interfaces across the universe.

Graduated with distinction from Aleppo University (BSc Software Engineering, 98% — best in the faculty), my mission is simple: turn complex problems into elegant, performant solutions.`,
  photo: { data: null },
  highlights: [
    { label: "Years of Experience", value: "5+" },
    { label: "Companies Traveled", value: "4" },
    { label: "Graduation Grade", value: "98%" },
    { label: "Tech Stack", value: "React & Next.js" },
  ],
};

interface AboutProps {
  data?: AboutData | null;
}

function CountUp({ target }: { target: string }) {
  return (
    <span className="font-display text-3xl text-space-cyan">{target}</span>
  );
}

export default function About({ data }: AboutProps) {
  const about = data ?? DEFAULT_ABOUT;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-24 px-6 overflow-hidden"
    >
      <div className="absolute inset-0 bg-space-deep/50" />
      <div className="absolute inset-0 bg-nebula-gradient opacity-30" />

      <div className="absolute top-10 right-10 w-32 h-32 rounded-full bg-space-purple/20 blur-3xl animate-float" />
      <div
        className="absolute bottom-10 left-10 w-48 h-48 rounded-full bg-space-glow/10 blur-3xl animate-float"
        style={{ animationDelay: "2s" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        <SectionHeading
          label="Navigation Log"
          title="Mission Control"
          subtitle="Charting the course of a 5-year space odyssey in front-end development"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Avatar */}
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex justify-center lg:justify-start"
          >
            <div className="relative">
              <div
                className="relative w-64 h-64 md:w-80 md:h-80"
                style={{
                  clipPath:
                    "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                  background:
                    "linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)",
                  padding: "3px",
                }}
              >
                <div
                  className="w-full h-full flex items-center justify-center bg-space-deep"
                  style={{
                    clipPath:
                      "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                  }}
                >
                  {/* Astronaut SVG icon from react-icons */}
                  <svg
                    viewBox="0 0 64 64"
                    className="w-28 h-28 md:w-36 md:h-36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Helmet */}
                    <circle cx="32" cy="22" r="14" fill="#1a0533" stroke="#7c3aed" strokeWidth="2" />
                    <circle cx="32" cy="22" r="10" fill="#0a0e27" stroke="#06b6d4" strokeWidth="1.5" />
                    {/* Visor reflection */}
                    <ellipse cx="28" cy="18" rx="3" ry="2" fill="#06b6d4" opacity="0.5" />
                    {/* Body / suit */}
                    <path d="M18 40 C18 34 24 36 32 36 C40 36 46 34 46 40 L46 52 C46 54 44 56 42 56 L22 56 C20 56 18 54 18 52 Z" fill="#1a0533" stroke="#7c3aed" strokeWidth="1.5" />
                    {/* Chest panel */}
                    <rect x="26" y="40" width="12" height="8" rx="2" fill="#0a0e27" stroke="#06b6d4" strokeWidth="1" />
                    <circle cx="29" cy="44" r="1.5" fill="#7c3aed" />
                    <circle cx="32" cy="44" r="1.5" fill="#06b6d4" />
                    <circle cx="35" cy="44" r="1.5" fill="#fbbf24" />
                    {/* Arms */}
                    <path d="M18 40 L10 46 C9 48 10 50 12 50 L18 48" fill="#1a0533" stroke="#7c3aed" strokeWidth="1.5" />
                    <path d="M46 40 L54 46 C55 48 54 50 52 50 L46 48" fill="#1a0533" stroke="#7c3aed" strokeWidth="1.5" />
                    {/* Gloves */}
                    <circle cx="10" cy="51" r="3" fill="#7c3aed" />
                    <circle cx="54" cy="51" r="3" fill="#7c3aed" />
                    {/* Neck connector */}
                    <rect x="28" y="35" width="8" height="4" rx="1" fill="#7c3aed" />
                    {/* Antenna */}
                    <line x1="32" y1="8" x2="32" y2="2" stroke="#06b6d4" strokeWidth="1.5" />
                    <circle cx="32" cy="2" r="1.5" fill="#06b6d4" />
                  </svg>
                </div>
              </div>

              {/* Orbit ring */}
              <motion.div
                className="absolute rounded-full border border-space-glow/40"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                style={{
                  width: "110%",
                  height: "110%",
                  top: "-5%",
                  left: "-5%",
                  inset: "-5%",
                }}
              >
                <div className="w-3 h-3 bg-space-cyan rounded-full absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              </motion.div>

              {/* Status label */}
              <motion.div
                className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-space-glow/20 border border-space-glow/40 rounded-full px-4 py-1"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <span className="font-mono text-space-cyan text-xs tracking-widest">
                  ONLINE
                </span>
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Bio + highlights */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <p className="font-mono text-space-cyan text-xs tracking-[0.3em] uppercase mb-4">
              {"// Mission Briefing"}
            </p>
            <p className="text-space-star/80 leading-relaxed mb-8 whitespace-pre-line text-sm md:text-base">
              {about.bio}
            </p>

            <div className="grid grid-cols-2 gap-4">
              {about.highlights.map((h, i) => (
                <motion.div
                  key={h.label}
                  className="bg-space-black/40 border border-space-glow/20 rounded-xl p-4 hover:border-space-glow/50 transition-all duration-300"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.4 + i * 0.1 }}
                >
                  <CountUp target={h.value} />
                  <p className="font-mono text-space-star/50 text-xs mt-1 leading-tight">
                    {h.label}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 }}
            >
              <a
                href="https://linkedin.com/in/abdalsalam-albirawi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-space-cyan text-sm hover:text-space-gold transition-colors group"
              >
                <FaLinkedinIn size={15} />
                <span>View LinkedIn Profile</span>
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-2 transition-transform"
                />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
