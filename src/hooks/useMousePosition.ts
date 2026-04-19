"use client";

import { useState, useEffect } from "react";

export function useMousePosition() {
  const [pos, setPos] = useState({
    x: 0,
    y: 0,
    normX: 0,
    normY: 0,
  });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      setPos({
        x: e.clientX,
        y: e.clientY,
        normX: (e.clientX / window.innerWidth) * 2 - 1,
        normY: -((e.clientY / window.innerHeight) * 2 - 1),
      });
    };
    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return pos;
}
