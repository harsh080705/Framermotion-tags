'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Bvh } from '@react-three/drei';

export default function MorphingMesh({
  isLowPerf = false,
  color = '#2e0854',
  speed = 2,
  distort = 0.4,
  scale = 1.7,
}) {
  const meshRef = useRef(null);
  const target = useRef({ x: 0, y: 0 });

  const detail = isLowPerf ? 32 : 64;
  const distortAmt = isLowPerf ? distort * 0.7 : distort;
  const speedMul = isLowPerf ? speed * 0.7 : speed;

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const { pointer } = state;
    target.current.x = pointer.x * 0.6;
    target.current.y = pointer.y * 0.6;

    meshRef.current.rotation.x +=
      (target.current.y - meshRef.current.rotation.x) * 0.06;
    meshRef.current.rotation.y +=
      (target.current.x - meshRef.current.rotation.y) * 0.06;
    meshRef.current.rotation.z += delta * 0.15 * speedMul;
  });

  return (
    <Bvh>
      <mesh ref={meshRef} scale={scale}>
        <icosahedronGeometry args={[1, detail]} />
        <MeshDistortMaterial
          color={color}
          roughness={0.2}
          metalness={0.8}
          distort={distortAmt}
          speed={speedMul}
          wireframe
        />
      </mesh>
    </Bvh>
  );
}
