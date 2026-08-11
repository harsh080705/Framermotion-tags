'use client';

import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';

export default function MorphingMesh({
  color = '#6366f1',
  speed = 1.2,
  distort = 0.4,
  roughness = 0.2,
  metalness = 0.6,
  isLowPerf = false,
}) {
  const meshRef = useRef(null);
  const target = useRef({ x: 0, y: 0 });

  // Dynamic geometry density + animation speed based on performance
  const segments = isLowPerf ? 24 : 64;
  const distortSpeed = isLowPerf ? speed * 0.6 : speed;
  const distortAmount = isLowPerf ? Math.max(distort, 0.5) : distort;

  const handlePointerMove = (event) => {
    if (typeof window === 'undefined') return;
    const { clientX, clientY } = event;
    target.current.x = (clientX / window.innerWidth - 0.5) * 0.9;
    target.current.y = (clientY / window.innerHeight - 0.5) * 0.9;
  };

  useEffect(() => {
    window.addEventListener('pointermove', handlePointerMove);
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const mesh = meshRef.current;

    // Smoothly chase mouse position
    mesh.rotation.x += (target.current.y - mesh.rotation.x) * 0.06;
    mesh.rotation.y += (target.current.x - mesh.rotation.y) * 0.06;
    mesh.rotation.z += delta * 0.15 * distortSpeed;

    // Subtle breathing scale
    const scale = 2.0 + Math.sin(performance.now() * 0.001) * 0.08;
    mesh.scale.setScalar(scale);
  });

  return (
    <mesh ref={meshRef} scale={2}>
      <icosahedronGeometry args={[1, segments]} />
      <MeshDistortMaterial
        color={color}
        wireframe
        distort={distortAmount}
        speed={distortSpeed}
        roughness={roughness}
        metalness={metalness}
      />
    </mesh>
  );
}