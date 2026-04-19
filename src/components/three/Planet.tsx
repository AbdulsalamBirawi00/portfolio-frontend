"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface PlanetProps {
  position?: [number, number, number];
  radius?: number;
  color?: string;
  emissiveColor?: string;
  ringColor?: string;
  hasRing?: boolean;
  rotationSpeed?: number;
}

export default function Planet({
  position = [0, 0, 0],
  radius = 2,
  color = "#7c3aed",
  emissiveColor = "#2d1b69",
  ringColor = "#9d73f5",
  hasRing = false,
  rotationSpeed = 0.3,
}: PlanetProps) {
  const planetRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (planetRef.current) {
      planetRef.current.rotation.y += delta * rotationSpeed;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.1;
    }
  });

  return (
    <group position={position}>
      <mesh ref={planetRef}>
        <sphereGeometry args={[radius, 32, 32]} />
        <meshStandardMaterial
          color={color}
          metalness={0.1}
          roughness={0.7}
          emissive={emissiveColor}
          emissiveIntensity={0.3}
        />
      </mesh>

      {hasRing && (
        <mesh ref={ringRef} rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[radius * 1.6, radius * 0.15, 8, 64]} />
          <meshStandardMaterial
            color={ringColor}
            metalness={0.5}
            roughness={0.5}
            transparent
            opacity={0.7}
          />
        </mesh>
      )}

      <pointLight
        position={[radius * 2, radius * 2, radius * 2]}
        color="#ffffff"
        intensity={0.8}
        distance={radius * 10}
      />
    </group>
  );
}
