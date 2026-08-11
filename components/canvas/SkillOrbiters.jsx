'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';

const skills = [
  { label: 'C++', color: '#659ad2' },
  { label: 'Python', color: '#3776ab' },
  { label: 'React', color: '#61dafb' },
  { label: 'Node.js', color: '#8cc84b' },
  { label: 'MongoDB', color: '#47a248' },
  { label: 'MySQL', color: '#00758f' },
];

export default function SkillOrbiters({ isLowPerf = false, speed = 0.4 }) {
  const groupRef = useRef(null);
  const centralRef = useRef(null);

  // Distribute the 6 badges across two rotating orbital rings (3 each)
  const ringOne = useMemo(() => skills.slice(0, 3), []);
  const ringTwo = useMemo(() => skills.slice(3, 6), []);

  // Dynamic geometry density
  const detail = isLowPerf ? 0 : 1;

  // Per-token angles for continuous orbit
  const ringOneAngles = useRef([0, (Math.PI * 2) / 3, (Math.PI * 4) / 3]);
  const ringTwoAngles = useRef([Math.PI / 3, Math.PI, (Math.PI * 5) / 3]);

  useFrame((_, delta) => {
    const dt = delta * speed;

    // Rotate the whole group
    if (groupRef.current) {
      groupRef.current.rotation.y += dt * 0.3;
    }

    // Rotate central icosahedron
    if (centralRef.current) {
      centralRef.current.rotation.x += dt * 0.55;
      centralRef.current.rotation.y += dt * 0.75;
    }

    // Advance orbit angles (opposite directions)
    ringOneAngles.current.forEach((angle, i) => {
      ringOneAngles.current[i] = angle + dt * 1.6;
    });
    ringTwoAngles.current.forEach((angle, i) => {
      ringTwoAngles.current[i] = angle - dt * 1.1;
    });
  });

  const placeBadges = (badges, angles, radius) =>
    badges.map((skill, i) => {
      const angle = angles.current[i];
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;

      return (
        <group key={skill.label} position={[x, 0, z]}>
          <Html center distanceFactor={isLowPerf ? 12 : 10} style={{ pointerEvents: 'none' }}>
            <div
              className="flex items-center gap-1.5 rounded-full border border-white/10 bg-black/40 px-3 py-1.5 text-xs font-semibold text-white shadow-lg backdrop-blur-md"
              style={{ borderColor: `${skill.color}55`, color: skill.color }}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: skill.color }} />
              {skill.label}
            </div>
          </Html>
        </group>
      );
    });

  return (
    <group ref={groupRef}>
      {/* Central wireframe icosahedron */}
      <mesh ref={centralRef} scale={1.4}>
        <icosahedronGeometry args={[1, detail]} />
        <meshStandardMaterial
          color="#8b5cf6"
          wireframe
          transparent
          opacity={0.55}
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>

      {/* Inner glow core */}
      <mesh scale={0.45}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.25} />
      </mesh>

      {/* Subtle equatorial rings */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.6, 0.006, 8, 64]} />
        <meshBasicMaterial color="#a5b4fc" transparent opacity={0.3} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, Math.PI / 3]}>
        <torusGeometry args={[3.1, 0.004, 8, 64]} />
        <meshBasicMaterial color="#ec4899" transparent opacity={0.18} />
      </mesh>

      {/* Orbiting skill badges — Ring 1 (radius 2.5) */}
      {placeBadges(ringOne, ringOneAngles, 2.5)}

      {/* Orbiting skill badges — Ring 2 (radius 3.2) */}
      {placeBadges(ringTwo, ringTwoAngles, 3.2)}
    </group>
  );
}