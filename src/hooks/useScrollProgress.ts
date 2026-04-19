"use client";

import { useState, useEffect } from "react";

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handler = () => {
      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      const current = window.scrollY;
      setScrollY(current);
      setProgress(max > 0 ? current / max : 0);
    };
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return { progress, scrollY };
}
