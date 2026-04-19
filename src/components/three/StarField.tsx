"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Stars({ count = 5000 }: { count?: number }) {
  const meshRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 400;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 400;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 400;
    }
    return pos;
  }, [count]);

  const sizes = useMemo(() => {
    const s = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      s[i] = Math.random() * 2 + 0.5;
    }
    return s;
  }, [count]);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.02;
      meshRef.current.rotation.x += delta * 0.005;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.3}
        sizeAttenuation
        color="#e8eaf6"
        transparent
        opacity={0.8}
      />
    </points>
  );
}

function ShootingStars() {
  const count = 8;
  const refs = useRef<(THREE.Mesh | null)[]>([]);
  const timers = useRef<number[]>(
    Array.from({ length: count }, () => Math.random() * 10)
  );

  useFrame((_, delta) => {
    refs.current.forEach((mesh, i) => {
      if (!mesh) return;
      timers.current[i] += delta;
      if (timers.current[i] > 8) {
        timers.current[i] = 0;
        mesh.position.set(
          (Math.random() - 0.5) * 200,
          (Math.random() - 0.5) * 100 + 50,
          (Math.random() - 0.5) * 50
        );
      }
      mesh.position.x -= delta * 60;
      mesh.position.y -= delta * 20;
      const material = mesh.material as THREE.MeshBasicMaterial;
      const life = timers.current[i] / 8;
      material.opacity = life < 0.5 ? life * 2 : (1 - life) * 2;
    });
  });

  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <mesh
          key={i}
          ref={(el) => { refs.current[i] = el; }}
          position={[
            (Math.random() - 0.5) * 200,
            (Math.random() - 0.5) * 100 + 50,
            (Math.random() - 0.5) * 50,
          ]}
        >
          <boxGeometry args={[3, 0.05, 0.05]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0}
          />
        </mesh>
      ))}
    </>
  );
}

interface StarFieldProps {
  count?: number;
}

export default function StarField({ count = 5000 }: StarFieldProps) {
  return (
    <Canvas
      className="absolute inset-0"
      camera={{ position: [0, 0, 50], fov: 75 }}
      style={{ background: "transparent" }}
    >
      <Stars count={count} />
      <ShootingStars />
      <ambientLight intensity={0.1} />
    </Canvas>
  );
}
