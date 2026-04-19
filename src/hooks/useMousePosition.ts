"use client";

import { useRef, useEffect } from "react";

export interface MousePosition {
  normX: number;
  normY: number;
}

export function useMousePosition() {
  const ref = useRef<MousePosition>({ normX: 0, normY: 0 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      ref.current.normX = (e.clientX / window.innerWidth) * 2 - 1;
      ref.current.normY = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return ref;
}
