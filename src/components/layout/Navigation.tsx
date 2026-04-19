"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
  { label: "Mission", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Systems", href: "#skills" },
  { label: "Journey", href: "#experience" },
  { label: "Galaxy", href: "#projects" },
  { label: "Transmit", href: "#contact" },
];

export default function Navigation() {
  const [activeSection, setActiveSection] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) =>
      document.querySelector(item.href)
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div
          className={`max-w-6xl mx-auto flex items-center justify-between rounded-2xl px-6 py-3 transition-all duration-300 ${
            scrolled
              ? "bg-space-black/80 backdrop-blur-md border border-space-glow/20"
              : "bg-transparent"
          }`}
        >
          {/* Logo */}
          <button
            onClick={() => handleNavClick("#hero")}
            className="font-display text-space-cyan text-sm tracking-widest uppercase hover:text-space-gold transition-colors"
            style={{ textShadow: "0 0 10px currentColor" }}
          >
            AA<span className="text-space-glow">.</span>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.slice(1);
              return (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className={`font-mono text-xs tracking-widest uppercase transition-all duration-300 relative ${
                    isActive
                      ? "text-space-cyan"
                      : "text-space-star/60 hover:text-space-star"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-px bg-space-cyan"
                      style={{ boxShadow: "0 0 8px #06b6d4" }}
                    />
                  )}
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 w-6 h-5 justify-center"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="block h-px bg-space-star w-full"
                animate={{
                  rotate: menuOpen
                    ? i === 0
                      ? 45
                      : i === 2
                      ? -45
                      : 0
                    : 0,
                  y: menuOpen ? (i === 0 ? 6 : i === 2 ? -6 : 0) : 0,
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }}
                style={{ transformOrigin: "center" }}
              />
            ))}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-space-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {NAV_ITEMS.map((item, i) => (
              <motion.button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className="font-display text-3xl text-space-star hover:text-space-cyan transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                {item.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
