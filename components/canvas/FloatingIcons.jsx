'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';

function Torus({ position, color, speed = 1 }) {
  const ref = useRef(null);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * 0.3 * speed;
    ref.current.rotation.y += delta * 0.5 * speed;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.6} floatIntensity={1.2}>
      <mesh ref={ref} position={position}>
        <torusGeometry args={[0.5, 0.18, 16, 64]} />
        <meshStandardMaterial
          color={color}
          metalness={0.85}
          roughness={0.15}
          emissive={color}
          emissiveIntensity={0.25}
        />
      </mesh>
    </Float>
  );
}

function Octahedron({ position, color, speed = 1 }) {
  const ref = useRef(null);

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * 0.4 * speed;
    ref.current.rotation.z += delta * 0.2 * speed;
    ref.current.position.y =
      position[1] + Math.sin(state.clock.elapsedTime * 0.8) * 0.15;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.8} floatIntensity={0.9}>
      <mesh ref={ref} position={position}>
        <octahedronGeometry args={[0.55, 0]} />
        <meshStandardMaterial
          color={color}
          metalness={0.9}
          roughness={0.2}
          emissive={color}
          emissiveIntensity={0.3}
        />
      </mesh>
    </Float>
  );
}

function MorphingIcosahedron({ position, color, speed = 1 }) {
  const ref = useRef(null);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * 0.2 * speed;
    ref.current.rotation.y += delta * 0.3 * speed;
  });

  return (
    <Float speed={1} rotationIntensity={0.7} floatIntensity={1.5}>
      <mesh ref={ref} position={position} scale={0.7}>
        <icosahedronGeometry args={[1, 16]} />
        <MeshDistortMaterial
          color={color}
          wireframe
          distort={0.35}
          speed={1.5 * speed}
          roughness={0.2}
          metalness={0.7}
        />
      </mesh>
    </Float>
  );
}

export default function FloatingIcons({ isLowPerf = false }) {
  const segments = isLowPerf ? 12 : 16;

  return (
    <group>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#a5b4fc" />
      <pointLight position={[-3, -2, 4]} intensity={0.8} color="#ec4899" />
      <pointLight position={[3, 3, 2]} intensity={0.6} color="#8b5cf6" />

      <Torus position={[-2.2, 1.2, -1]} color="#6366f1" speed={0.9} />
      <Torus position={[2.4, -1.3, -2]} color="#ec4899" speed={1.1} />

      <Octahedron position={[2.1, 1.5, -0.5]} color="#8b5cf6" speed={1} />
      <Octahedron position={[-2.4, -1.4, 0.5]} color="#f59e0b" speed={0.85} />

      <MorphingIcosahedron
        position={[0, 0, -1.5]}
        color="#06b6d4"
        speed={1}
      />
    </group>
  );
}
