'use client';

import { useRef, useMemo, useEffect, useState, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerformanceMonitor, AdaptiveDpr, AdaptiveEvents, Preload } from '@react-three/drei';
import * as THREE from 'three';

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform vec2 uPointer;
  uniform float uAmplitude;

  varying vec2 vUv;
  varying float vElevation;

  void main() {
    vUv = uv;
    vec3 pos = position;

    // Ambient fluid wave calculations
    float wave1 = sin(pos.x * 0.4 + uTime * 0.8) * uAmplitude;
    float wave2 = cos(pos.y * 0.5 + uTime * 0.6) * uAmplitude * 0.7;
    float wave3 = sin((pos.x + pos.y) * 0.3 + uTime * 0.5) * uAmplitude * 0.4;

    // Dynamic mouse pointer ripple calculation
    vec2 pointerUV = uPointer * 0.5 + 0.5; // Map from [-1, 1] to [0, 1]
    float dist = length(vUv - pointerUV);
    float ripple = sin(dist * 18.0 - uTime * 3.5) * exp(-dist * 4.5) * 0.8;

    float totalElevation = wave1 + wave2 + wave3 + ripple;
    pos.z += totalElevation;
    vElevation = totalElevation;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uColorBase;
  uniform vec3 uColorWaveA;
  uniform vec3 uColorWaveB;

  varying vec2 vUv;
  varying float vElevation;

  void main() {
    float normElevation = (vElevation + 1.2) / 2.4;
    vec3 color = mix(uColorBase, uColorWaveA, smoothstep(0.1, 0.6, normElevation));
    color = mix(color, uColorWaveB, smoothstep(0.4, 0.9, normElevation));

    // Edge vignette
    float distFromCenter = length(vUv - 0.5);
    float vignette = smoothstep(0.9, 0.2, distFromCenter);

    float alpha = (0.55 + normElevation * 0.45) * vignette;
    gl_FragColor = vec4(color, alpha);
  }
`;

function WaveMesh({ isLowPerf }) {
  const meshRef = useRef(null);
  const targetPointer = useRef(new THREE.Vector2(0, 0));

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uAmplitude: { value: 0.7 },
      uColorBase: { value: new THREE.Color('#020617') },
      uColorWaveA: { value: new THREE.Color('#4f46e5') },
      uColorWaveB: { value: new THREE.Color('#ec4899') },
    }),
    []
  );

  useEffect(() => {
    const handlePointerMove = (e) => {
      // Normalize mouse coordinates to [-1, 1]
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      targetPointer.current.set(x, y);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const mat = meshRef.current.material;
    mat.uniforms.uTime.value += delta;

    // Smooth lerp pointer uniform for fluid ripple physics
    mat.uniforms.uPointer.value.x += (targetPointer.current.x - mat.uniforms.uPointer.value.x) * 0.08;
    mat.uniforms.uPointer.value.y += (targetPointer.current.y - mat.uniforms.uPointer.value.y) * 0.08;
  });

  const segments = isLowPerf ? 45 : 90;

  return (
    <>
      <fog attach="fog" args={['#020617', 6, 28]} />
      <mesh
        ref={meshRef}
        rotation={[-Math.PI / 2.3, 0, 0]}
        position={[0, -5, -4]}
      >
        <planeGeometry args={[32, 32, segments, segments]} />
        <shaderMaterial
          uniforms={uniforms}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          transparent
          depthWrite={false}
          wireframe={false}
        />
      </mesh>

      {/* Glowing wireframe overlay mesh */}
      <mesh
        rotation={[-Math.PI / 2.3, 0, 0]}
        position={[0, -5, -3.95]}
      >
        <planeGeometry args={[32, 32, Math.floor(segments / 2), Math.floor(segments / 2)]} />
        <meshBasicMaterial
          color="#8b5cf6"
          wireframe
          transparent
          opacity={0.12}
        />
      </mesh>
    </>
  );
}

export default function InteractiveWaveBackground({ className = '' }) {
  const [dpr, setDpr] = useState(1);
  const [isLowPerf, setIsLowPerf] = useState(false);

  const handleDecline = useCallback(() => {
    setDpr(0.75);
    setIsLowPerf(true);
  }, []);

  const handleIncline = useCallback(() => {
    setDpr(1);
    setIsLowPerf(false);
  }, []);

  return (
    <div
      aria-hidden
      className={`pointer-events-none fixed inset-0 z-0 opacity-70 ${className}`}
    >
      <Canvas
        dpr={dpr}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        camera={{ position: [0, 0, 9], fov: 55 }}
      >
        <PerformanceMonitor
          onDecline={handleDecline}
          onIncline={handleIncline}
          flipflops={3}
        />
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />

        <WaveMesh isLowPerf={isLowPerf} />

        <Preload all />
      </Canvas>
    </div>
  );
}
