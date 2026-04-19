"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import type { ExperienceData } from "@/types";

const DEFAULT_EXPERIENCE: ExperienceData[] = [
  {
    id: 1,
    company: "MOOLA",
    role: "Front-End Developer",
    startDate: "2024-08-01",
    endDate: null,
    location: "Riyadh, KSA",
    description:
      "Leading front-end development of fintech solutions using Next.js for real-time expense management and corporate card issuance. Creating intuitive interfaces for employee expense tracking and budget management. Integrating complex APIs to automate financial workflows including expense approvals, transaction categorization, and reporting. Enabling real-time synchronization of corporate card transactions and spending limits.",
  },
  {
    id: 2,
    company: "Growth Hacker",
    role: "Front-End Developer",
    startDate: "2023-06-01",
    endDate: "2024-08-01",
    location: "Montreal, Canada",
    description:
      "Developed intuitive, visually appealing interfaces following industry best practices. Enhanced overall user experience and improved user engagement. Achieved substantial decrease in page load times and improved website responsiveness across all devices through front-end performance optimization and efficient coding practices.",
  },
  {
    id: 3,
    company: "Uplink",
    role: "Front-End Developer",
    startDate: "2021-06-01",
    endDate: "2023-06-01",
    location: "Remote",
    description:
      "Identified performance bottlenecks using Chrome DevTools and React DevTools. Implemented React best practices, code splitting, and optimized rendering processes — achieving a 20% reduction in page load times. Managed project workflow using Jira, maintaining Agile workflows for timely deliveries.",
  },
  {
    id: 4,
    company: "Craft Code",
    role: "Front-End Developer",
    startDate: "2020-02-01",
    endDate: "2021-05-01",
    location: "Syria",
    description:
      "Built a solid foundation in HTML, CSS, and JavaScript. Applied principles of responsive design and accessibility. Successfully transitioned from foundational role to dynamic Front-End Developer position.",
  },
];

const COMPANY_COLORS = [
  { primary: "#7c3aed", glow: "rgba(124,58,237,0.4)" },
  { primary: "#06b6d4", glow: "rgba(6,182,212,0.4)" },
  { primary: "#10b981", glow: "rgba(16,185,129,0.4)" },
  { primary: "#fbbf24", glow: "rgba(251,191,36,0.4)" },
];

function formatDate(dateStr: string | null) {
  if (!dateStr) return "Present";
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

function ExperienceCard({
  exp,
  index,
  colorScheme,
}: {
  exp: ExperienceData;
  index: number;
  colorScheme: (typeof COMPANY_COLORS)[0];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const isLeft = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`relative flex items-center gap-8 ${isLeft ? "flex-row" : "flex-row-reverse"} mb-16`}
    >
      {/* Card */}
      <motion.div
        className="flex-1"
        initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="bg-space-deep/60 backdrop-blur-md border rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
          style={{
            borderColor: colorScheme.primary + "40",
            "--hover-shadow": `0 0 30px ${colorScheme.glow}`,
          } as React.CSSProperties}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.boxShadow = `0 0 30px ${colorScheme.glow}`;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.boxShadow = "none";
          }}
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3
                className="font-display text-xl mb-1"
                style={{ color: colorScheme.primary, textShadow: `0 0 10px ${colorScheme.primary}` }}
              >
                {exp.company}
              </h3>
              <p className="text-space-star text-sm font-medium">{exp.role}</p>
            </div>
            <div className="text-right">
              <p className="font-mono text-xs text-space-star/50">
                {formatDate(exp.startDate)} — {formatDate(exp.endDate)}
              </p>
              <p className="font-mono text-xs text-space-star/40 mt-1">
                📍 {exp.location}
              </p>
            </div>
          </div>
          <p className="text-space-star/70 text-sm leading-relaxed">
            {exp.description}
          </p>

          {!exp.endDate && (
            <div className="mt-4 flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ background: colorScheme.primary }}
              />
              <span
                className="font-mono text-xs"
                style={{ color: colorScheme.primary }}
              >
                CURRENTLY ACTIVE
              </span>
            </div>
          )}
        </div>
      </motion.div>

      {/* Timeline node */}
      <motion.div
        className="relative z-10 flex-shrink-0"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div
          className="w-12 h-12 rounded-full border-2 flex items-center justify-center text-lg"
          style={{
            borderColor: colorScheme.primary,
            background: `radial-gradient(circle, ${colorScheme.primary}30, transparent)`,
            boxShadow: `0 0 20px ${colorScheme.glow}`,
          }}
        >
          🪐
        </div>
      </motion.div>

      {/* Empty spacer for alternating layout */}
      <div className="flex-1 hidden md:block" />
    </div>
  );
}

interface ExperienceProps {
  data?: ExperienceData[] | null;
}

export default function Experience({ data }: ExperienceProps) {
  const experiences =
    data && data.length > 0 ? data : DEFAULT_EXPERIENCE;
  const timelineRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="experience"
      className="relative py-24 px-6 overflow-hidden"
    >
      <div className="absolute inset-0 bg-space-deep/30" />
      <div className="absolute inset-0 bg-nebula-gradient opacity-20" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <SectionHeading
          label="Captain's Log"
          title="Space Journey"
          subtitle="Missions completed across the digital universe"
        />

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Center line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-space-glow/20 hidden md:block" />
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 top-0 w-px bg-space-glow hidden md:block"
            style={{ boxShadow: "0 0 8px #7c3aed" }}
            initial={{ height: "0%" }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: "easeOut" }}
          />

          {experiences.map((exp, index) => (
            <ExperienceCard
              key={exp.id ?? index}
              exp={exp}
              index={index}
              colorScheme={COMPANY_COLORS[index % COMPANY_COLORS.length]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
