'use client';

import { motion } from 'framer-motion';
import OrbitCanvas from '../canvas/OrbitCanvas';
import Timeline from './Timeline';
import CharacterReveal from './CharacterReveal';
import ClipPathTextReveal from './ClipPathTextReveal';

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="relative mx-auto max-w-7xl px-6 py-20 md:px-12 bg-transparent"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-indigo-400">
          Toolkit & Journey
        </p>
        <ClipPathTextReveal
          as="h2"
          direction="bottom-to-top"
          mode="view"
          delay={0.1}
          className="text-3xl font-bold tracking-tight text-white md:text-5xl"
        >
          Skills & <span className="gradient-text">experience</span>
        </ClipPathTextReveal>
      </motion.div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent p-6 backdrop-blur-md"
        >
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_50%,rgba(139,92,246,0.1),transparent_60%)]" />
          <h3 className="mb-4 text-lg font-semibold text-white">
            Technology orbit
          </h3>
          <p className="mb-4 text-sm text-zinc-400">
            Languages and frameworks I work with daily — orbiting around the
            core stack that powers most of my builds.
          </p>
          <OrbitCanvas />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-md md:p-8"
        >
          <h3 className="mb-6 text-lg font-semibold text-white">
            Career trajectory
          </h3>
          <Timeline />
        </motion.div>
      </div>
    </section>
  );
}
