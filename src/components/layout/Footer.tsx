"use client";

import { Mail } from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative py-12 px-6 border-t border-space-glow/10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-mono text-space-star/40 text-sm">
          © {new Date().getFullYear()} Abdalsalam Al Birawi
        </p>

        <div className="flex items-center gap-6">
          <a
            href="mailto:abdalsalamalbirawi@gmail.com"
            className="flex items-center gap-2 font-mono text-space-star/40 hover:text-space-cyan text-sm transition-colors"
            aria-label="Email"
          >
            <Mail size={15} />
            Email
          </a>
          <a
            href="https://linkedin.com/in/abdalsalam-albirawi"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-mono text-space-star/40 hover:text-space-cyan text-sm transition-colors"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn size={15} />
            LinkedIn
          </a>
        </div>

        <p className="font-mono text-space-star/30 text-xs">
          Built with Next.js · Strapi · Three.js
        </p>
      </div>
    </footer>
  );
}
