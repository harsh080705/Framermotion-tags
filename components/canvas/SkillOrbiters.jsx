'use client';

import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { Bvh } from '@react-three/drei';
import {
  SiCplusplus,
  SiPython,
  SiReact,
  SiNodedotjs,
  SiMongodb,
  SiMysql,
} from 'react-icons/si';

const SKILLS = [
  { label: 'C++', color: '#00599C', angle: 0, Icon: SiCplusplus },
  { label: 'Python', color: '#3776AB', angle: 60, Icon: SiPython },
  { label: 'React', color: '#61DAFB', angle: 120, Icon: SiReact },
  { label: 'Node.js', color: '#339933', angle: 180, Icon: SiNodedotjs },
  { label: 'MongoDB', color: '#47A248', angle: 240, Icon: SiMongodb },
  { label: 'MySQL', color: '#4479A1', angle: 300, Icon: SiMysql },
];

function SkillBadge({ skill, radius }) {
  const x = Math.cos((skill.angle * Math.PI) / 180) * radius;
  const y = Math.sin((skill.angle * Math.PI) / 180) * radius;
  const { Icon } = skill;

  return (
    <Html
      position={[x, y, 0]}
      center
      distanceFactor={6}
      occlude="blending"
      zIndexRange={[100, 0]}
    >
      <div
        className="flex items-center gap-1.5 rounded-full border border-white/20 bg-black/60 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur-md shadow-lg whitespace-nowrap"
        style={{
          boxShadow: `0 0 12px ${skill.color}55`,
          color: skill.color,
        }}
      >
        <Icon size={12} />
        <span className="text-white">{skill.label}</span>
      </div>
    </Html>
  );
}

export default function SkillOrbiters({ isLowPerf = false }) {
  const groupRef = useRef(null);
  const icoRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  const radius = 2.2;
  const segments = isLowPerf ? 1 : 2;

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.3;
    groupRef.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.4) * 0.1;

    if (icoRef.current) {
      icoRef.current.rotation.x -= delta * 0.2;
      icoRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <Bvh>
      <group ref={groupRef}>
        <mesh
          ref={icoRef}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          scale={hovered ? 1.1 : 1}
        >
          <icosahedronGeometry args={[1, segments]} />
          <meshStandardMaterial
            color="#6366f1"
            wireframe
            emissive="#8b5cf6"
            emissiveIntensity={0.4}
            roughness={0.3}
            metalness={0.8}
          />
        </mesh>

        {SKILLS.map((skill) => (
          <SkillBadge key={skill.label} skill={skill} radius={radius} />
        ))}
      </group>
    </Bvh>
  );
}
