import { motion } from "framer-motion";

interface SectionHeadingProps {
  label: string;
  title: string;
  subtitle?: string;
}

export default function SectionHeading({
  label,
  title,
  subtitle,
}: SectionHeadingProps) {
  return (
    <div className="text-center mb-16">
      <motion.p
        className="font-mono text-space-cyan text-xs tracking-[0.4em] uppercase mb-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        ⟡ {label} ⟡
      </motion.p>
      <motion.h2
        className="font-display text-4xl md:text-5xl text-space-star mb-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        style={{ textShadow: "0 0 30px rgba(124,58,237,0.5)" }}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          className="text-space-star/60 max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {subtitle}
        </motion.p>
      )}
      <motion.div
        className="flex items-center justify-center gap-4 mt-6"
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="h-px w-24 bg-gradient-to-r from-transparent to-space-glow" />
        <div
          className="w-2 h-2 rounded-full bg-space-glow animate-pulse-glow"
        />
        <div className="h-px w-24 bg-gradient-to-l from-transparent to-space-glow" />
      </motion.div>
    </div>
  );
}
