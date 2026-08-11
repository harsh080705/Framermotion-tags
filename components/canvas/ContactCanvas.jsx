'use client';

import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  PerformanceMonitor,
  AdaptiveDpr,
  AdaptiveEvents,
  Preload,
} from '@react-three/drei';
import FloatingIcons from './FloatingIcons';

export default function ContactCanvas() {
  const [dpr, setDpr] = useState([1, 2]);
  const [isLowPerf, setIsLowPerf] = useState(false);

  return (
    <div className="relative h-[360px] w-full md:h-full">
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

        <FloatingIcons isLowPerf={isLowPerf} />

        <Preload all />
      </Canvas>
    </div>
  );
}
