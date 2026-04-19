"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import SpaceShip from "./SpaceShip";
import type { MousePosition } from "@/hooks/useMousePosition";

interface LayerProps {
  count: number;
  spread: number;
  depth: number;
  speed: number;
  drift: [number, number];
  size: number;
  color: string;
  opacity: number;
}

function StarLayer({ count, spread, depth, speed, drift, size, color, opacity }: LayerProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const posRef = useRef<Float32Array>(null!);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * spread;
      pos[i * 3 + 1] = (Math.random() - 0.5) * spread;
      pos[i * 3 + 2] = (Math.random() - 0.5) * depth;
    }
    posRef.current = pos;
    return pos;
  }, [count, spread, depth]);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    const pos = posRef.current;
    const step = speed * delta;
    const half = spread / 2;

    for (let i = 0; i < count; i++) {
      pos[i * 3]     += drift[0] * step;
      pos[i * 3 + 1] += drift[1] * step;

      if (pos[i * 3]     >  half) pos[i * 3]     -= spread;
      if (pos[i * 3]     < -half) pos[i * 3]     += spread;
      if (pos[i * 3 + 1] >  half) pos[i * 3 + 1] -= spread;
      if (pos[i * 3 + 1] < -half) pos[i * 3 + 1] += spread;
    }

    const attr = (pointsRef.current.geometry as THREE.BufferGeometry)
      .getAttribute("position") as THREE.BufferAttribute;
    attr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        sizeAttenuation
        color={color}
        transparent
        opacity={opacity}
        fog={false}
      />
    </points>
  );
}

interface HeroCanvasProps {
  mouseRef: React.RefObject<MousePosition>;
}

export default function HeroCanvas({ mouseRef }: HeroCanvasProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 20], fov: 60 }}
      style={{ background: "transparent" }}
      dpr={[1, 1.5]}
    >
      <StarLayer count={3000} spread={600} depth={400} speed={1.2} drift={[1, -0.3]}  size={0.18} color="#c7d2fe" opacity={0.6}  />
      <StarLayer count={1800} spread={500} depth={300} speed={2.8} drift={[0.8, 0.5]} size={0.32} color="#e8eaf6" opacity={0.82} />
      <StarLayer count={500}  spread={400} depth={200} speed={5}   drift={[-0.4, 0.9]} size={0.6}  color="#b4cafe" opacity={0.95} />
      <SpaceShip mouseRef={mouseRef} />
      <ambientLight intensity={0.3} color="#7c3aed" />
      <pointLight position={[10, 10, 10]} color="#06b6d4" intensity={1} />
    </Canvas>
  );
}
