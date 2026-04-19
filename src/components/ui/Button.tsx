import { forwardRef } from "react";
import { motion } from "framer-motion";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  href?: string;
  children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", href, children, className = "", ...props }, ref) => {
    const base =
      "inline-flex items-center gap-2 font-mono text-sm tracking-widest uppercase px-8 py-3 rounded-full transition-all duration-300 cursor-pointer";

    const variants = {
      primary:
        "bg-space-glow text-white hover:bg-space-glow/80 border border-space-glow hover:shadow-[0_0_30px_rgba(124,58,237,0.6)]",
      secondary:
        "bg-transparent text-space-cyan border border-space-cyan hover:bg-space-cyan/10 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]",
      ghost:
        "bg-transparent text-space-star/60 hover:text-space-star border border-space-star/20 hover:border-space-star/60",
    };

    if (href) {
      return (
        <motion.a
          href={href}
          className={`${base} ${variants[variant]} ${className}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {children}
        </motion.a>
      );
    }

    return (
      <motion.button
        ref={ref}
        className={`${base} ${variants[variant]} ${className}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        {...(props as object)}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
