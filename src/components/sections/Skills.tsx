"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import SectionHeading from "@/components/ui/SectionHeading";
import type { SkillData } from "@/types";

const DEFAULT_SKILLS: SkillData[] = [
  { name: "React", category: "frontend", level: 95, icon: "⚛️" },
  { name: "Next.js", category: "frontend", level: 92, icon: "▲" },
  { name: "TypeScript", category: "frontend", level: 90, icon: "🔷" },
  { name: "Angular", category: "frontend", level: 80, icon: "🔴" },
  { name: "JavaScript", category: "language", level: 95, icon: "⚡" },
  { name: "CSS / Tailwind", category: "frontend", level: 88, icon: "🎨" },
  { name: "React Native", category: "mobile", level: 82, icon: "📱" },
  { name: "Node.js", category: "backend", level: 65, icon: "🟢" },
  { name: "Python", category: "language", level: 55, icon: "🐍" },
  { name: "C++", category: "language", level: 50, icon: "⚙️" },
  { name: "Git", category: "tool", level: 88, icon: "🌿" },
  { name: "Figma / UI", category: "tool", level: 75, icon: "🎭" },
];

const CATEGORY_CONFIG: Record<
  string,
  { label: string; color: string; glow: string }
> = {
  frontend: {
    label: "Navigation Systems",
    color: "#7c3aed",
    glow: "rgba(124,58,237,0.4)",
  },
  mobile: {
    label: "Mobile Pods",
    color: "#06b6d4",
    glow: "rgba(6,182,212,0.4)",
  },
  backend: {
    label: "Engine Room",
    color: "#10b981",
    glow: "rgba(16,185,129,0.4)",
  },
  language: {
    label: "Communication Protocols",
    color: "#fbbf24",
    glow: "rgba(251,191,36,0.4)",
  },
  tool: {
    label: "Equipment Bay",
    color: "#f472b6",
    glow: "rgba(244,114,182,0.4)",
  },
};

interface SkillsProps {
  data?: SkillData[] | null;
}

function SkillBar({ skill, index }: { skill: SkillData; index: number }) {
  const cfg = CATEGORY_CONFIG[skill.category] ?? CATEGORY_CONFIG.tool;

  return (
    <motion.div
      className="mb-4"
      variants={fadeInUp}
      transition={{ delay: index * 0.05 }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-lg">{skill.icon}</span>
          <span className="font-mono text-space-star text-sm">{skill.name}</span>
        </div>
        <span
          className="font-mono text-xs"
          style={{ color: cfg.color }}
        >
          {skill.level}%
        </span>
      </div>
      <div className="h-1.5 bg-space-deep rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${cfg.color} 0%, ${cfg.color}88 100%)`,
            boxShadow: `0 0 8px ${cfg.glow}`,
          }}
          initial={{ width: "0%" }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut", delay: index * 0.05 }}
        />
      </div>
    </motion.div>
  );
}

export default function Skills({ data }: SkillsProps) {
  const skills = data && data.length > 0 ? data : DEFAULT_SKILLS;

  const grouped = skills.reduce<Record<string, SkillData[]>>((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <section id="skills" className="relative py-24 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-space-black" />

      {/* Star decoration */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-twinkle"
            style={{
              width: Math.random() * 2 + 1 + "px",
              height: Math.random() * 2 + 1 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
              animationDelay: Math.random() * 4 + "s",
              opacity: Math.random() * 0.3 + 0.1,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <SectionHeading
          label="System Status"
          title="Navigation Systems"
          subtitle="Technical proficiencies that power the mission"
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {Object.entries(grouped).map(([category, categorySkills]) => {
            const cfg =
              CATEGORY_CONFIG[category] ?? CATEGORY_CONFIG.tool;

            return (
              <motion.div
                key={category}
                className="bg-space-deep/40 backdrop-blur border border-space-glow/20 rounded-2xl p-6 hover:border-space-glow/40 transition-all duration-300"
                variants={fadeInUp}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{ background: cfg.color, boxShadow: `0 0 8px ${cfg.color}` }}
                  />
                  <h3
                    className="font-mono text-xs tracking-widest uppercase"
                    style={{ color: cfg.color }}
                  >
                    {cfg.label}
                  </h3>
                </div>

                {categorySkills.map((skill, i) => (
                  <SkillBar key={skill.name} skill={skill} index={i} />
                ))}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
