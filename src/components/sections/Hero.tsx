"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useMousePosition } from "@/hooks/useMousePosition";
import { staggerContainer, letterVariant } from "@/lib/animations";
import { Button } from "@/components/ui/Button";
import type { HeroData } from "@/types";

const HeroCanvas = dynamic(() => import("@/components/three/HeroCanvas"), {
  ssr: false,
  loading: () => null,
});

const DEFAULT_HERO: HeroData = {
  title: "Abdalsalam Al Birawi",
  subtitle: "Front-End Developer",
  description:
    "Crafting stellar digital experiences with React, Next.js & TypeScript. 5+ years building fintech and enterprise applications.",
  ctaText: "Explore My Galaxy",
  ctaLink: "#projects",
};

interface HeroProps {
  data?: HeroData | null;
}

export default function Hero({ data }: HeroProps) {
  const hero = data ?? DEFAULT_HERO;
  const { normX, normY } = useMousePosition();
  const letters = hero.title.split("");

  return (
    <section
      id="hero"
      className="relative h-screen overflow-hidden bg-space-black flex flex-col items-center justify-center"
    >
      {/* Space background */}
      <div className="absolute inset-0 bg-space-gradient" />
      <div className="absolute inset-0 bg-nebula-gradient opacity-60" />

      {/* Three.js canvas */}
      <div className="absolute inset-0 z-0">
        <HeroCanvas mouseX={normX} mouseY={normY} />
      </div>

      {/* CSS star particles behind content */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-twinkle"
            style={{
              width: Math.random() * 2 + 1 + "px",
              height: Math.random() * 2 + 1 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
              animationDelay: Math.random() * 4 + "s",
              animationDuration: Math.random() * 3 + 2 + "s",
              opacity: Math.random() * 0.6 + 0.2,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.p
          className="font-mono text-space-cyan text-xs md:text-sm tracking-[0.4em] uppercase mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          ◈ Mission Control · Initiated ◈
        </motion.p>

        {/* Animated title */}
        <motion.h1
          className="font-display text-4xl sm:text-5xl md:text-7xl text-space-star mb-4 leading-tight"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          aria-label={hero.title}
        >
          {letters.map((letter, i) => (
            <motion.span
              key={i}
              variants={letterVariant}
              className={letter === " " ? "mr-4" : ""}
              style={{
                display: "inline-block",
                textShadow:
                  i < 10
                    ? "0 0 30px rgba(124,58,237,0.6)"
                    : "0 0 20px rgba(6,182,212,0.4)",
              }}
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          className="font-mono text-space-glow text-lg md:text-2xl tracking-widest mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          style={{ textShadow: "0 0 15px #7c3aed" }}
        >
          {hero.subtitle}
        </motion.p>

        <motion.p
          className="text-space-star/70 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          {hero.description}
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
        >
          <Button href={hero.ctaLink} variant="primary">
            🚀 {hero.ctaText}
          </Button>
          <Button href="#contact" variant="secondary">
            📡 Get In Touch
          </Button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span className="font-mono text-space-star/40 text-xs tracking-widest">
          SCROLL
        </span>
        <motion.div
          className="w-px h-12 bg-gradient-to-b from-space-glow to-transparent"
          animate={{ scaleY: [1, 0.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <motion.div
          className="text-space-glow text-lg"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          ↓
        </motion.div>
      </motion.div>
    </section>
  );
}
