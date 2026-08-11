'use client';

import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  PerformanceMonitor,
  AdaptiveDpr,
  AdaptiveEvents,
  Preload,
} from '@react-three/drei';
import StarfieldGrid from './backgrounds/StarfieldGrid';
import SineWavePlane from './backgrounds/SineWavePlane';
import FloatingOrbs from './backgrounds/FloatingOrbs';

const VARIANTS = {
  stars: StarfieldGrid,
  waves: SineWavePlane,
  orbs: FloatingOrbs,
};

export default function GlobalBackgroundCanvas({
  variant = 'orbs',
  className = '',
}) {
  const [dpr, setDpr] = useState([0.75, 1.5]);
  const [isLowPerf, setIsLowPerf] = useState(false);
  const Scene = VARIANTS[variant] || FloatingOrbs;

  return (
    <div
      aria-hidden
      className={`pointer-events-none fixed inset-0 -z-20 ${className}`}
    >
      <Canvas
        dpr={dpr}
        camera={{ position: [0, 0, 10], fov: 55 }}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        performance={{ min: 0.4 }}
      >
        <PerformanceMonitor
          onDecline={() => {
            setDpr([0.5, 1]);
            setIsLowPerf(true);
          }}
          onIncline={() => {
            setDpr([0.75, 1.5]);
            setIsLowPerf(false);
          }}
          flipflops={3}
        />

        <AdaptiveDpr pixelated />
        <AdaptiveEvents />

        <Scene isLowPerf={isLowPerf} />

        <Preload all />
      </Canvas>
    </div>
  );
}
