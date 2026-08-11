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
import SkillOrbiters from './SkillOrbiters';

export default function OrbitCanvas() {
  const [dpr, setDpr] = useState([1, 2]);
  const [isLowPerf, setIsLowPerf] = useState(false);

  return (
    <div className="relative h-[400px] w-full md:h-full">
      <Canvas
        dpr={dpr}
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={['#050505']} />

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
        <directionalLight position={[5, 5, 5]} intensity={1} color="#a5b4fc" />
        <pointLight position={[0, 0, 3]} intensity={1} color="#8b5cf6" />

        <SkillOrbiters isLowPerf={isLowPerf} />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.3}
        />

        <Preload all />
      </Canvas>
    </div>
  );
}
