'use client';

import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerformanceMonitor, AdaptiveDpr, OrbitControls, Bvh } from '@react-three/drei';
import SkillOrbiters from './SkillOrbiters';

export default function OrbitCanvas() {
  const [dpr, setDpr] = useState(2);
  const [isLowPerf, setIsLowPerf] = useState(false);

  return (
    <div className="relative h-[380px] w-full sm:h-[440px] lg:h-[520px]">
      <Canvas
        dpr={[1, dpr]}
        camera={{ position: [0, 0, 9], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
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

        <ambientLight intensity={0.6} />
        <directionalLight position={[4, 5, 6]} intensity={1.1} color="#a5b4fc" />
        <pointLight position={[-4, -2, -4]} intensity={0.5} color="#ec4899" />

        <Bvh>
          <SkillOrbiters isLowPerf={isLowPerf} speed={isLowPerf ? 0.25 : 0.4} />
        </Bvh>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 4}
          autoRotate
          autoRotateSpeed={isLowPerf ? 0.3 : 0.5}
        />
      </Canvas>
    </div>
  );
}