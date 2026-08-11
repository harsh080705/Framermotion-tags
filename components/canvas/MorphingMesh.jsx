'use client';

import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';
import { Bvh } from '@react-three/drei';

export default function MorphingMesh({
  isLowPerf = false,
  color = '#8b5cf6',
  speed = 1.2,
  distort = 0.45,
}) {
  const meshRef = useRef(null);
  const target = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  const segments = isLowPerf ? 24 : 64;
  const distortAmt = isLowPerf ? distort * 0.6 : distort;
  const speedMul = isLowPerf ? speed * 0.7 : speed;

  const geometry = useMemo(
    () => <icosahedronGeometry args={[1.6, isLowPerf ? 3 : 6]} />,
    [isLowPerf]
  );

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
      <mesh ref={meshRef} scale={viewport.width < 6 ? 1.6 : 2.2}>
        {geometry}
        <MeshDistortMaterial
          color={color}
          wireframe
          distort={distortAmt}
          speed={speedMul}
          roughness={0.2}
          metalness={0.7}
        />
      </mesh>
    </Bvh>
  );
}
