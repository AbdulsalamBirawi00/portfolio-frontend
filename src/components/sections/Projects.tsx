"use client";

import { motion } from "framer-motion";
import { Rocket, Zap, Globe2, Star, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import type { LucideIcon } from "lucide-react";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import SectionHeading from "@/components/ui/SectionHeading";
import type { ProjectData } from "@/types";

const DEFAULT_PROJECTS: ProjectData[] = [
  {
    id: 1,
    title: "MOOLA Expense Platform",
    description:
      "Real-time fintech platform for corporate expense management and card issuance. Built with Next.js, featuring live transaction sync, approval workflows, and budget tracking dashboards.",
    tags: ["Next.js", "TypeScript", "React", "Fintech", "Real-time"],
    image: { data: null },
    liveUrl: null,
    githubUrl: null,
    featured: true,
  },
  {
    id: 2,
    title: "Growth Hacker Web Suite",
    description:
      "High-performance marketing web applications with 40% improved load times. Implemented advanced code splitting, lazy loading, and React optimization patterns.",
    tags: ["React", "Performance", "Marketing", "TypeScript"],
    image: { data: null },
    liveUrl: null,
    githubUrl: null,
    featured: true,
  },
  {
    id: 3,
    title: "Uplink Enterprise Dashboard",
    description:
      "Enterprise-grade dashboard achieving 20% reduction in page load times via React DevTools profiling, bundle optimization, and efficient rendering patterns.",
    tags: ["React", "Optimization", "Jira Integration", "Agile"],
    image: { data: null },
    liveUrl: null,
    githubUrl: null,
    featured: false,
  },
  {
    id: 4,
    title: "University Graduation Project",
    description:
      "Best project in the faculty with 98% grade. Nominated for Syrian national competition. Full-stack web application demonstrating advanced software engineering principles.",
    tags: ["Full-Stack", "Award-winning", "React", "Node.js"],
    image: { data: null },
    liveUrl: null,
    githubUrl: null,
    featured: true,
  },
];

const TAG_COLORS = [
  "bg-space-glow/20 text-space-glow border-space-glow/30",
  "bg-space-cyan/10 text-space-cyan border-space-cyan/30",
  "bg-space-gold/10 text-space-gold border-space-gold/30",
  "bg-pink-500/10 text-pink-400 border-pink-500/30",
  "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
];

const PROJECT_ICONS: LucideIcon[] = [Rocket, Zap, Globe2, Star];

interface ProjectsProps {
  data?: ProjectData[] | null;
}

function ProjectCard({ project, index }: { project: ProjectData; index: number }) {
  const gradients = [
    "from-space-glow/20 to-space-cyan/10",
    "from-space-cyan/20 to-space-glow/10",
    "from-space-gold/20 to-space-glow/10",
    "from-pink-500/20 to-space-cyan/10",
  ];
  const gradient = gradients[index % gradients.length];
  const ProjectIcon = PROJECT_ICONS[index % PROJECT_ICONS.length];

  return (
    <motion.div
      variants={fadeInUp}
      className="group relative bg-space-deep/50 backdrop-blur-md border border-space-glow/20 rounded-2xl overflow-hidden hover:border-space-glow/50 transition-all duration-500"
      style={{ boxShadow: "0 4px 30px rgba(0,0,0,0.3)" }}
      whileHover={{
        y: -8,
        boxShadow: "0 20px 60px rgba(124,58,237,0.2)",
      }}
    >
      {/* Top gradient bar */}
      <div
        className={`h-32 bg-gradient-to-br ${gradient} flex items-center justify-center relative overflow-hidden`}
      >
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white/30 animate-twinkle"
              style={{
                width: Math.random() * 3 + 1 + "px",
                height: Math.random() * 3 + 1 + "px",
                top: Math.random() * 100 + "%",
                left: Math.random() * 100 + "%",
                animationDelay: Math.random() * 3 + "s",
              }}
            />
          ))}
        </div>

        <motion.div
          className="z-10 text-white/70 group-hover:text-white transition-colors duration-300"
          whileHover={{ scale: 1.15, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <ProjectIcon size={52} strokeWidth={1.2} />
        </motion.div>

        {project.featured && (
          <div className="absolute top-3 right-3 bg-space-gold/20 border border-space-gold/40 rounded-full px-3 py-1 flex items-center gap-1">
            <Star size={11} className="text-space-gold fill-space-gold" />
            <span className="font-mono text-space-gold text-xs tracking-widest">
              FEATURED
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-display text-lg text-space-star mb-2 group-hover:text-space-cyan transition-colors">
          {project.title}
        </h3>
        <p className="text-space-star/60 text-sm leading-relaxed mb-4">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, i) => (
            <span
              key={tag}
              className={`font-mono text-xs px-2 py-0.5 rounded-full border ${
                TAG_COLORS[i % TAG_COLORS.length]
              }`}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex gap-4">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-space-cyan hover:text-space-gold transition-colors flex items-center gap-1"
            >
              <ExternalLink size={12} />
              Live
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-space-star/50 hover:text-space-star transition-colors flex items-center gap-1"
            >
              <FaGithub size={13} />
              GitHub
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects({ data }: ProjectsProps) {
  const projects = data && data.length > 0 ? data : DEFAULT_PROJECTS;

  return (
    <section id="projects" className="relative py-24 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-space-black" />
      <div className="absolute inset-0 bg-nebula-gradient opacity-25" />

      <div className="absolute top-1/4 left-10 w-64 h-64 bg-space-glow/5 rounded-full blur-3xl animate-float" />
      <div
        className="absolute bottom-1/4 right-10 w-80 h-80 bg-space-cyan/5 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "3s" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        <SectionHeading
          label="Galaxy of Work"
          title="Missions Launched"
          subtitle="Projects that navigated through the cosmos of the web"
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {projects.map((project, i) => (
            <ProjectCard key={project.id ?? i} project={project} index={i} />
          ))}
        </motion.div>

        <motion.p
          className="text-center font-mono text-space-star/30 text-xs mt-12 tracking-widest"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          More projects available via{" "}
          <a
            href="https://linkedin.com/in/abdalsalam-albirawi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-space-cyan hover:text-space-gold transition-colors"
          >
            LinkedIn
          </a>
        </motion.p>
      </div>
    </section>
  );
}
