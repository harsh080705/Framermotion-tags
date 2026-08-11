'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function HeroOverlay() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="flex h-full flex-col justify-center gap-6 px-6 py-10 md:px-12 lg:px-16"
    >
      <motion.span
        variants={item}
        className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-wide text-indigo-300 backdrop-blur-md animate-glow-pulse"
      >
        <Sparkles size={12} className="text-indigo-300" />
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
        Available for new opportunities
      </motion.span>

      <motion.h1
        variants={item}
        className="text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
      >
        Crafting{' '}
        <span className="gradient-text">interactive</span>
        <br />
        digital experiences.
      </motion.h1>

      <motion.p
        variants={item}
        className="max-w-lg text-base leading-relaxed text-zinc-400 sm:text-lg"
      >
        Full-stack developer specializing in high-performance web applications
        with immersive 3D graphics, elegant interfaces, and meticulous attention
        to detail.
      </motion.p>

      <motion.div variants={item} className="mt-2 flex flex-wrap gap-4">
        <motion.a
          href="#projects"
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 400, damping: 18 }}
          className="group relative rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition-shadow hover:shadow-indigo-500/60"
        >
          <span className="relative z-10 inline-flex items-center gap-2">
            View Projects
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </span>
          <span className="absolute inset-0 -z-0 rounded-full bg-gradient-to-r from-indigo-400 to-pink-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </motion.a>

        <motion.a
          href="#contact"
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 400, damping: 18 }}
          className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition-all hover:border-indigo-400/50 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(99,102,241,0.3)]"
        >
          Contact Me
        </motion.a>
      </motion.div>

      <motion.div
        variants={item}
        className="mt-6 flex items-center gap-6 text-xs text-zinc-500"
      >
        <div className="flex items-center gap-2">
          <span className="font-mono text-zinc-300">5+</span>
          <span>years building</span>
        </div>
        <div className="h-3 w-px bg-white/10" />
        <div className="flex items-center gap-2">
          <span className="font-mono text-zinc-300">40+</span>
          <span>projects shipped</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
