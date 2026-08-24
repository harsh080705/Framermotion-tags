'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import ClipPathTextReveal from './ClipPathTextReveal';
import SpoilerAlert from './SpoilerAlert';
import StaggerButton from './StaggerButton';
import AnimatedTextReveal from './AnimatedTextReveal';

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

      <ClipPathTextReveal
        as="h1"
        direction="bottom-to-top"
        mode="animate"
        delay={0.15}
        className="text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
      >
        Crafting <span className="gradient-text">interactive</span>
        <br />
        digital experiences.
      </ClipPathTextReveal>

      <AnimatedTextReveal
        text="Full-stack developer specializing in high-performance web applications with immersive 3D graphics, elegant interfaces, and meticulous attention to detail."
        animationMode="color-shift"
        splitMode="word"
        baseColor="rgba(255, 255, 255, 0.35)"
        highlightColor="#c7d2fe"
        scrollStart={0.98}
        scrollEnd={0.8}
        smoothing={0.1}
        overlap={1.2}
        className="max-w-lg text-base font-medium leading-relaxed sm:text-lg"
      />

      <motion.div variants={item} className="mt-2 flex flex-wrap gap-4">
        <StaggerButton
          href="#projects"
          text="View Projects"
          icon={ArrowRight}
          variant="primary"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        <StaggerButton
          href="#contact"
          text="Contact Me"
          variant="secondary"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      </motion.div>

      <motion.div
        variants={item}
        className="mt-6 flex flex-wrap items-center gap-6 text-xs text-zinc-500"
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
        <div className="h-3 w-px bg-white/10" />
        <SpoilerAlert label="Secret Stat" revealOnHover={true}>
          <span className="font-mono text-xs font-semibold text-purple-300 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-500/30">
            ☕ 2,400+ Coffees
          </span>
        </SpoilerAlert>
      </motion.div>
    </motion.div>
  );
}
