'use client';

import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { Bvh } from '@react-three/drei';
const CplusplusIcon = ({ size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.38 10.37v3.26h-1.63v1.63h-3.26v-1.63h-1.63v-3.26h1.63V8.74h3.26v1.63h1.63zM8.5 4.5c-4.14 0-7.5 3.36-7.5 7.5s3.36 7.5 7.5 7.5c2.97 0 5.56-1.73 6.75-4.25h-3.35C11.13 16.27 9.94 17 8.5 17c-2.76 0-5-2.24-5-5s2.24-5 5-5c1.44 0 2.63.73 3.4 1.75h3.35C14.06 6.23 11.47 4.5 8.5 4.5zm11.38 1.5v1.63h1.63v3.26h-1.63v1.63h-3.26V10.9h-1.63V7.63h1.63V6h3.26z" />
  </svg>
);

const PythonIcon = ({ size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.927 0C5.88 0 6.262 2.628 6.262 2.628l.006 2.719h5.755v.817H3.978S0 5.674 0 11.758c0 6.084 3.468 5.86 3.468 5.86h2.072v-2.915s-.112-3.468 3.42-3.468h5.888s3.284.056 3.284-3.172V3.468S18.572 0 11.927 0zM8.7 1.756a1.144 1.144 0 1 1 0 2.288 1.144 1.144 0 0 1 0-2.288zm3.373 22.244c6.047 0 5.665-2.628 5.665-2.628l-.006-2.719h-5.755v-.817h8.043S24 18.326 24 12.242c0-6.084-3.468-5.86-3.468-5.86h-2.072v2.915s.112 3.468-3.42 3.468h-5.888s-3.284-.056-3.284 3.172v4.832S5.428 24 12.073 24zm3.227-1.756a1.144 1.144 0 1 1 0-2.288 1.144 1.144 0 0 1 0 2.288z" />
  </svg>
);

const ReactIcon = ({ size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <ellipse cx="12" cy="12" rx="10" ry="4.5" />
    <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(60 12 12)" />
    <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(120 12 12)" />
    <circle cx="12" cy="12" r="2" fill="currentColor" />
  </svg>
);

const NodeIcon = ({ size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 1.608L1.754 7.525v11.838L12 23.28l10.246-3.917V7.525L12 1.608zm0 2.441l8.13 4.697v9.394L12 21.837l-8.13-4.697V8.746L12 4.049z" />
  </svg>
);

const MongoIcon = ({ size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0s-5.696 7.42-5.696 12.92C6.304 18.42 8.784 24 12 24s5.696-5.58 5.696-11.08C17.696 7.42 12 0 12 0zm0 21.6c-2.128 0-3.696-3.84-3.696-8.68C8.304 8.08 12 2.8 12 2.8s3.696 5.28 3.696 10.12c0 4.84-1.568 8.68-3.696 8.68z" />
  </svg>
);

const MysqlIcon = ({ size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm1 14.5h-2v-5h2v5zm-1-6.5c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
  </svg>
);

const SKILLS = [
  { label: 'C++', color: '#00599C', angle: 0, Icon: CplusplusIcon },
  { label: 'Python', color: '#3776AB', angle: 60, Icon: PythonIcon },
  { label: 'React', color: '#61DAFB', angle: 120, Icon: ReactIcon },
  { label: 'Node.js', color: '#339933', angle: 180, Icon: NodeIcon },
  { label: 'MongoDB', color: '#47A248', angle: 240, Icon: MongoIcon },
  { label: 'MySQL', color: '#4479A1', angle: 300, Icon: MysqlIcon },
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
