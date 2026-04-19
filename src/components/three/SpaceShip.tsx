"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface SpaceShipProps {
  mouseX?: number;
  mouseY?: number;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export default function SpaceShip({ mouseX = 0, mouseY = 0 }: SpaceShipProps) {
  const groupRef = useRef<THREE.Group>(null);
  const targetX = useRef(0);
  const targetY = useRef(0);
  const exhaustRef = useRef<THREE.PointLight>(null);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    targetX.current = lerp(targetX.current, mouseX * 3, 0.05);
    targetY.current = lerp(targetY.current, mouseY * 2, 0.05);

    groupRef.current.position.x = targetX.current;
    groupRef.current.position.y = targetY.current;
    groupRef.current.rotation.z = lerp(
      groupRef.current.rotation.z,
      -mouseX * 0.15,
      0.05
    );
    groupRef.current.rotation.x = lerp(
      groupRef.current.rotation.x,
      mouseY * 0.1,
      0.05
    );

    if (exhaustRef.current) {
      exhaustRef.current.intensity =
        1.5 + Math.sin(Date.now() * 0.01) * 0.5;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 5]}>
      {/* Ship body */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.8, 3, 8]} />
        <meshStandardMaterial
          color="#1a1a3e"
          metalness={0.8}
          roughness={0.2}
          emissive="#0d0d2e"
        />
      </mesh>

      {/* Cockpit */}
      <mesh position={[0, 0, 1.2]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.3, 0.8, 8]} />
        <meshStandardMaterial
          color="#06b6d4"
          metalness={0.9}
          roughness={0.1}
          emissive="#0e7490"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Left wing */}
      <mesh position={[-1.2, 0, -0.3]} rotation={[0, 0, Math.PI / 6]}>
        <boxGeometry args={[1.5, 0.1, 0.8]} />
        <meshStandardMaterial
          color="#1e1e4e"
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>

      {/* Right wing */}
      <mesh position={[1.2, 0, -0.3]} rotation={[0, 0, -Math.PI / 6]}>
        <boxGeometry args={[1.5, 0.1, 0.8]} />
        <meshStandardMaterial
          color="#1e1e4e"
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>

      {/* Engine glow */}
      <pointLight
        ref={exhaustRef}
        position={[0, 0, -2]}
        color="#06b6d4"
        intensity={2}
        distance={8}
      />

      {/* Engine exhaust visual */}
      <mesh position={[0, 0, -1.8]}>
        <coneGeometry args={[0.2, 1, 8]} />
        <meshBasicMaterial
          color="#06b6d4"
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Ambient lighting */}
      <pointLight
        position={[0, 2, 0]}
        color="#7c3aed"
        intensity={0.5}
        distance={10}
      />
    </group>
  );
}
