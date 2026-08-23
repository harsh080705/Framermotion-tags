'use client';

import { useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

function ParticleNodes({ count = 110 }) {
  const pointsRef = useRef(null);
  const { viewport } = useThree();

  // Create positions, velocities, and initial random offsets
  const [positions, velocities, initialVelocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    const initVel = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      // Spread positions across camera view bounds
      pos[idx] = (Math.random() - 0.5) * 24;
      pos[idx + 1] = (Math.random() - 0.5) * 16;
      pos[idx + 2] = (Math.random() - 0.5) * 8;

      // Gentle random drift velocities
      const vx = (Math.random() - 0.5) * 0.015;
      const vy = (Math.random() - 0.5) * 0.015;
      const vz = (Math.random() - 0.5) * 0.008;

      vel[idx] = vx;
      vel[idx + 1] = vy;
      vel[idx + 2] = vz;

      initVel[idx] = vx;
      initVel[idx + 1] = vy;
      initVel[idx + 2] = vz;
    }

    return [pos, vel, initVel];
  }, [count]);

  const targetMouse = useRef(new THREE.Vector2(0, 0));

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    const geo = pointsRef.current.geometry;
    const posAttr = geo.attributes.position;
    const array = posAttr.array;

    // Convert normalized mouse pointer coordinates to 3D world space coordinates
    const mouseX = (state.pointer.x * viewport.width) / 2;
    const mouseY = (state.pointer.y * viewport.height) / 2;
    targetMouse.current.set(mouseX, mouseY);

    const boundX = (viewport.width / 2) + 2;
    const boundY = (viewport.height / 2) + 2;
    const boundZ = 5;

    for (let i = 0; i < count; i++) {
      const idx = i * 3;

      let px = array[idx];
      let py = array[idx + 1];
      let pz = array[idx + 2];

      // Distance to mouse pointer
      const dx = px - mouseX;
      const dy = py - mouseY;
      const distSq = dx * dx + dy * dy;
      const dist = Math.sqrt(distSq);

      const repulsionRadius = 3.2;
      if (dist < repulsionRadius && dist > 0.01) {
        const force = (1 - dist / repulsionRadius) * 0.08;
        velocities[idx] += (dx / dist) * force;
        velocities[idx + 1] += (dy / dist) * force;
      }

      // Gently damp velocity towards steady drift velocity
      velocities[idx] += (initialVelocities[idx] - velocities[idx]) * 0.04;
      velocities[idx + 1] += (initialVelocities[idx + 1] - velocities[idx + 1]) * 0.04;
      velocities[idx + 2] += (initialVelocities[idx + 2] - velocities[idx + 2]) * 0.04;

      // Update positions
      px += velocities[idx];
      py += velocities[idx + 1];
      pz += velocities[idx + 2];

      // Boundary wrap-around physics
      if (px > boundX) px = -boundX;
      if (px < -boundX) px = boundX;
      if (py > boundY) py = -boundY;
      if (py < -boundY) py = boundY;
      if (pz > boundZ) pz = -boundZ;
      if (pz < -boundZ) pz = boundZ;

      array[idx] = px;
      array[idx + 1] = py;
      array[idx + 2] = pz;
    }

    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.16}
        color="#818cf8"
        transparent
        opacity={0.75}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

export default function FloatingParticlesBackground({ className = '' }) {
  return (
    <div
      className={`pointer-events-none fixed inset-0 z-0 opacity-75 ${className}`}
      style={{ pointerEvents: 'none' }}
    >
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <ParticleNodes count={110} />
      </Canvas>
    </div>
  );
}
