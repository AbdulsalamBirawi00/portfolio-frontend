"use client";

import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import SpaceShip from "./SpaceShip";

interface HeroCanvasProps {
  mouseX: number;
  mouseY: number;
}

export default function HeroCanvas({ mouseX, mouseY }: HeroCanvasProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 20], fov: 60 }}
      style={{ background: "transparent" }}
    >
      <Stars
        radius={200}
        depth={100}
        count={6000}
        factor={4}
        saturation={0}
        fade
        speed={0.5}
      />
      <SpaceShip mouseX={mouseX} mouseY={mouseY} />
      <ambientLight intensity={0.3} color="#7c3aed" />
      <pointLight position={[10, 10, 10]} color="#06b6d4" intensity={1} />
    </Canvas>
  );
}
