'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
  uniform float uTime;
  uniform float uAmplitude;
  varying vec2 vUv;
  varying float vElevation;

  void main() {
    vUv = uv;
    vec3 pos = position;
    float wave1 = sin(pos.x * 0.6 + uTime * 0.8) * uAmplitude;
    float wave2 = sin(pos.y * 0.4 + uTime * 0.6) * uAmplitude * 0.6;
    float wave3 = sin((pos.x + pos.y) * 0.3 + uTime * 0.4) * uAmplitude * 0.3;
    pos.z += wave1 + wave2 + wave3;
    vElevation = (wave1 + wave2 + wave3) / (uAmplitude * 1.9);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorC;
  varying vec2 vUv;
  varying float vElevation;

  void main() {
    vec3 color = mix(uColorA, uColorB, vUv.y);
    color = mix(color, uColorC, smoothstep(-0.3, 0.7, vElevation));
    float alpha = 0.7 + vElevation * 0.3;
    gl_FragColor = vec4(color, alpha);
  }
`;

export default function SineWavePlane({ isLowPerf = false }) {
  const meshRef = useRef(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAmplitude: { value: 0.6 },
      uColorA: { value: new THREE.Color('#1e1b4b') },
      uColorB: { value: new THREE.Color('#6366f1') },
      uColorC: { value: new THREE.Color('#ec4899') },
    }),
    []
  );

  const segments = isLowPerf ? 40 : 80;

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.material.uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <>
      <fog attach="fog" args={['#050505', 8, 30]} />
      <ambientLight intensity={0.3} />

      <mesh
        ref={meshRef}
        rotation={[-Math.PI / 2.2, 0, 0]}
        position={[0, -6, -5]}
      >
        <planeGeometry args={[40, 40, segments, segments]} />
        <shaderMaterial
          uniforms={uniforms}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          transparent
          wireframe={false}
        />
      </mesh>

      <mesh
        rotation={[-Math.PI / 2.2, 0, 0]}
        position={[0, -6, -4.9]}
      >
        <planeGeometry args={[40, 40, segments, segments]} />
        <meshBasicMaterial
          color="#8b5cf6"
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>
    </>
  );
}
