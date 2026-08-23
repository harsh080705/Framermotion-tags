'use client';

import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  OrbitControls,
  PerformanceMonitor,
  AdaptiveDpr,
  AdaptiveEvents,
  Preload,
} from '@react-three/drei';
import MorphingMesh from './MorphingMesh';

export default function HeroCanvas() {
  const [dpr, setDpr] = useState([1, 2]);
  const [isLowPerf, setIsLowPerf] = useState(false);

  return (
    <div className="relative h-[60vh] w-full md:h-full">
      <Canvas
        dpr={dpr}
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        performance={{ min: 0.5 }}
      >
        <PerformanceMonitor
          onDecline={() => {
            setDpr([1, 1.25]);
            setIsLowPerf(true);
          }}
          onIncline={() => {
            setDpr([1, 2]);
            setIsLowPerf(false);
          }}
          flipflops={3}
        />

        <AdaptiveDpr pixelated />
        <AdaptiveEvents />

        <ambientLight intensity={0.5} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1.5}
          color="#a5b4fc"
        />
        <directionalLight
          position={[-5, -3, -5]}
          intensity={0.8}
          color="#ec4899"
        />
        <pointLight position={[0, 0, 4]} intensity={1.0} color="#8b5cf6" />

        <MorphingMesh
          isLowPerf={isLowPerf}
          color="#2e0854"
          scale={1.7}
          distort={0.4}
          speed={2}
        />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
          autoRotate
          autoRotateSpeed={0.4}
        />

        <Preload all />
      </Canvas>
    </div>
  );
}
