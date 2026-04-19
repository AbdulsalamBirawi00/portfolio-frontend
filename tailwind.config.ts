import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          black: "#050714",
          deep: "#0a0e27",
          navy: "#0d1b3e",
          purple: "#1a0533",
          nebula: "#2d1b69",
          star: "#e8eaf6",
          glow: "#7c3aed",
          cyan: "#06b6d4",
          gold: "#fbbf24",
        },
      },
      fontFamily: {
        display: ["var(--font-orbitron)", "monospace"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-space-mono)", "monospace"],
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        orbit: "orbit 20s linear infinite",
        twinkle: "twinkle 3s ease-in-out infinite",
        shooting: "shooting 2s linear infinite",
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        pulseGlow: {
          "0%,100%": { boxShadow: "0 0 5px #7c3aed" },
          "50%": { boxShadow: "0 0 30px #7c3aed, 0 0 60px #7c3aed" },
        },
        orbit: {
          from: { transform: "rotate(0deg) translateX(120px) rotate(0deg)" },
          to: { transform: "rotate(360deg) translateX(120px) rotate(-360deg)" },
        },
        twinkle: {
          "0%,100%": { opacity: "1" },
          "50%": { opacity: "0.2" },
        },
        shooting: {
          "0%": {
            transform: "translateX(0) translateY(0)",
            opacity: "1",
          },
          "100%": {
            transform: "translateX(-500px) translateY(300px)",
            opacity: "0",
          },
        },
      },
      backgroundImage: {
        "space-gradient":
          "radial-gradient(ellipse at center, #1a0533 0%, #0a0e27 40%, #050714 100%)",
        "nebula-gradient":
          "radial-gradient(ellipse at 30% 50%, rgba(124,58,237,0.3) 0%, transparent 60%), radial-gradient(ellipse at 70% 20%, rgba(6,182,212,0.2) 0%, transparent 50%)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
