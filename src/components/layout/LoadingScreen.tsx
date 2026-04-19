"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket } from "lucide-react";

export default function LoadingScreen() {
  const [count, setCount] = useState(3);
  const [phase, setPhase] = useState<"counting" | "launch" | "done">(
    "counting"
  );
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const seen = sessionStorage.getItem("loading-done");
      if (seen) {
        setShow(false);
        return;
      }
    }

    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setTimeout(() => setPhase("launch"), 200);
          setTimeout(() => {
            setPhase("done");
            setShow(false);
            sessionStorage.setItem("loading-done", "1");
          }, 1200);
          return 0;
        }
        return prev - 1;
      });
    }, 700);

    return () => clearInterval(interval);
  }, []);

  if (!show) return null;

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          key="loading"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-space-black"
          exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
        >
          {/* Stars background */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 80 }).map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-white animate-twinkle"
                style={{
                  width: Math.random() * 3 + 1 + "px",
                  height: Math.random() * 3 + 1 + "px",
                  top: Math.random() * 100 + "%",
                  left: Math.random() * 100 + "%",
                  animationDelay: Math.random() * 3 + "s",
                  opacity: Math.random() * 0.7 + 0.3,
                }}
              />
            ))}
          </div>

          <motion.div className="relative z-10 text-center">
            <motion.p
              className="font-mono text-space-cyan text-sm tracking-[0.3em] mb-8 uppercase"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              Initiating launch sequence
            </motion.p>

            <AnimatePresence mode="wait">
              {phase === "counting" && count > 0 && (
                <motion.div
                  key={count}
                  className="font-display text-[8rem] leading-none text-space-star"
                  initial={{ scale: 1.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  style={{ textShadow: "0 0 40px #7c3aed, 0 0 80px #7c3aed" }}
                >
                  {count}
                </motion.div>
              )}
              {phase === "launch" && (
                <motion.div
                  key="launch"
                  className="flex items-center justify-center gap-3 font-display text-4xl text-space-cyan"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ textShadow: "0 0 20px #06b6d4" }}
                >
                  <motion.div
                    animate={{ y: [0, -12, 0], rotate: [-5, 5, -5] }}
                    transition={{ duration: 0.6, repeat: Infinity }}
                  >
                    <Rocket size={40} className="text-space-cyan" />
                  </motion.div>
                  LAUNCH
                </motion.div>
              )}
            </AnimatePresence>

            <motion.p
              className="font-mono text-space-glow text-xs tracking-widest mt-8 uppercase"
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Abdalsalam Al Birawi · Portfolio
            </motion.p>
          </motion.div>

          {/* Progress bar */}
          <motion.div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-64">
            <div className="h-px bg-space-glow/20 w-full">
              <motion.div
                className="h-full bg-space-glow"
                initial={{ width: "0%" }}
                animate={{ width: phase === "launch" ? "100%" : `${(3 - count) * 33}%` }}
                transition={{ duration: 0.5 }}
                style={{ boxShadow: "0 0 10px #7c3aed" }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
