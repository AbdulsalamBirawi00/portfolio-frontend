import { motion } from "framer-motion";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = "", hover = true }: CardProps) {
  return (
    <motion.div
      className={`bg-space-deep/50 backdrop-blur-md border border-space-glow/20 rounded-2xl ${
        hover ? "hover:border-space-glow/50 hover:shadow-[0_0_30px_rgba(124,58,237,0.15)]" : ""
      } transition-all duration-300 ${className}`}
      whileHover={hover ? { y: -4 } : {}}
    >
      {children}
    </motion.div>
  );
}
