'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ORB_COUNT = 7;
const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#06b6d4', '#f59e0b'];

function Orb({ color, basePos, isLowPerf }) {
  const meshRef = useRef(null);
  const lightRef = useRef(null);
  const phase = useMemo(() => Math.random() * Math.PI * 2, []);
  const freq = useMemo(() => 0.3 + Math.random() * 0.4, []);
  const driftSpeed = useMemo(() => 0.4 + Math.random() * 0.6, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.position.x =
      basePos[0] + Math.sin(t * freq + phase) * 1.8;
    meshRef.current.position.y =
      basePos[1] + Math.cos(t * freq * 0.7 + phase) * 1.4;
    meshRef.current.position.z =
      basePos[2] + Math.sin(t * freq * 0.5 + phase) * 0.8;

    if (lightRef.current) {
      lightRef.current.position.copy(meshRef.current.position);
      lightRef.current.intensity =
        1.5 + Math.sin(t * driftSpeed + phase) * 0.6;
    }
  });

  const segments = isLowPerf ? 12 : 24;

  return (
    <>
      <mesh ref={meshRef} position={basePos}>
        <icosahedronGeometry args={[0.18, 1]} />
        <meshBasicMaterial color={color} transparent opacity={0.9} />
      </mesh>

      <mesh ref={meshRef} position={basePos}>
        <icosahedronGeometry args={[0.5, segments]} />
        <meshBasicMaterial color={color} transparent opacity={0.12} />
      </mesh>

      <pointLight
        ref={lightRef}
        position={basePos}
        color={color}
        intensity={1.5}
        distance={8}
        decay={2}
      />
    </>
  );
}

export default function FloatingOrbs({ isLowPerf = false }) {
  const orbs = useMemo(() => {
    return Array.from({ length: ORB_COUNT }).map((_, i) => ({
      color: COLORS[i % COLORS.length],
      basePos: [
        (Math.random() - 0.5) * 16,
        (Math.random() - 0.5) * 10,
        -3 - Math.random() * 4,
      ],
    }));
  }, []);

  return (
    <>
      <ambientLight intensity={0.2} />

      {orbs.map((orb, i) => (
        <Orb key={i} {...orb} isLowPerf={isLowPerf} />
      ))}
    </>
  );
}
