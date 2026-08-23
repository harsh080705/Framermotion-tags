'use client';

import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerformanceMonitor, AdaptiveDpr, OrbitControls, Bvh } from '@react-three/drei';
import MorphingMesh from './MorphingMesh';

export default function HeroCanvas() {
  const [dpr, setDpr] = useState(2);
  const [isLowPerf, setIsLowPerf] = useState(false);

  return (
    <div className="relative h-[60vh] w-full md:h-full">
      <Canvas
        dpr={[1, dpr]}
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        {/* Performance adaptive DPR (1x–2x) */}
        <PerformanceMonitor
          onDecline={() => {
            setDpr(1);
            setIsLowPerf(true);
          }}
          onIncline={() => {
            setDpr(2);
            setIsLowPerf(false);
          }}
        >
          <AdaptiveDpr pixelated />
        </PerformanceMonitor>

        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} color="#a5b4fc" />
        <directionalLight position={[-5, -3, -5]} intensity={0.8} color="#ec4899" />
        <pointLight position={[0, 0, 4]} intensity={1.0} color="#8b5cf6" />

        <Bvh>
          <MorphingMesh
            color="#2e0854"
            speed={2}
            distort={0.4}
            scale={1.7}
            isLowPerf={isLowPerf}
          />
        </Bvh>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
          autoRotate
          autoRotateSpeed={isLowPerf ? 0.25 : 0.4}
        />
      </Canvas>
    </div>
  );
}