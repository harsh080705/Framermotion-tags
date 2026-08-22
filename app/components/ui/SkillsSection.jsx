'use client';

import { motion } from 'framer-motion';
import OrbitCanvas from '../canvas/OrbitCanvas';
import Timeline from './Timeline';
import CharacterReveal from './CharacterReveal';
import ClipPathTextReveal from './ClipPathTextReveal';

const skillBars = [
  { name: 'WebGL / Three.js', level: 92 },
  { name: 'React / Next.js', level: 95 },
  { name: 'Node.js / Backend', level: 88 },
  { name: 'Python / Data', level: 82 },
  { name: 'Databases (SQL/NoSQL)', level: 85 },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="relative mx-auto max-w-7xl px-6 py-24 md:px-12">
      {/* Section header */}
      <div className="mb-14 max-w-2xl">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-3 inline-block text-sm font-medium tracking-widest text-indigo-400 uppercase"
        >
          Skills & Experience
        </motion.span>
        <ClipPathTextReveal
          as="h2"
          direction="bottom-to-top"
          mode="view"
          delay={0.1}
          className="text-4xl font-bold tracking-tight text-white sm:text-5xl"
        >
          My{' '}
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            journey
          </span>{' '}
          so far
        </ClipPathTextReveal>
      </div>

      {/* 2-column layout: timeline + orbit canvas */}
      <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
        {/* Left: animated timeline */}
        <div>
          <Timeline />
        </div>

        {/* Right: 3D skill orbiters + skill bars */}
        <div className="flex flex-col gap-10">
          <div className="relative">
            {/* Ambient glow behind canvas */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10"
            >
              <div className="absolute top-1/2 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/15 blur-[100px]" />
            </div>

            <OrbitCanvas />
          </div>

          {/* Skill proficiency bars */}
          <div className="space-y-5">
            {skillBars.map((skill, index) => (
              <div key={skill.name}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="font-medium text-zinc-300">{skill.name}</span>
                  <span className="text-xs font-semibold text-indigo-300">
                    {skill.level}%
                  </span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{
                      duration: 1.1,
                      delay: index * 0.12,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}