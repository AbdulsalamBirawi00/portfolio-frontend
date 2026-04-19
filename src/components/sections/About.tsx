"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
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

function CountUp({ target, suffix = "" }: { target: string; suffix?: string }) {
  return (
    <span className="font-display text-3xl text-space-cyan">
      {target}
      {suffix}
    </span>
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
      {/* Background */}
      <div className="absolute inset-0 bg-space-deep/50" />
      <div className="absolute inset-0 bg-nebula-gradient opacity-30" />

      {/* Decorative planets */}
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
          {/* Left: Avatar / decorative */}
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex justify-center lg:justify-start"
          >
            <div className="relative">
              {/* Hexagonal clip with glow */}
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
                  className="w-full h-full flex items-center justify-center text-8xl md:text-9xl bg-space-deep"
                  style={{
                    clipPath:
                      "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                  }}
                >
                  👨‍🚀
                </div>
              </div>

              {/* Orbit ring */}
              <motion.div
                className="absolute inset-0 rounded-full border border-space-glow/40"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                style={{ width: "110%", height: "110%", top: "-5%", left: "-5%" }}
              >
                <div className="w-3 h-3 bg-space-cyan rounded-full absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              </motion.div>

              {/* Label */}
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
              // Mission Briefing
            </p>
            <p className="text-space-star/80 leading-relaxed mb-8 whitespace-pre-line text-sm md:text-base">
              {about.bio}
            </p>

            {/* Highlights grid */}
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

            {/* CTA */}
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
                <span>View LinkedIn Profile</span>
                <span className="group-hover:translate-x-2 transition-transform">→</span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
