'use client';

import { motion } from 'framer-motion';

import ClipPathTextReveal from './ClipPathTextReveal';
import SpoilerAlert from './SpoilerAlert';
import StaggerButton from './StaggerButton';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function HeroOverlay() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="flex h-full flex-col justify-center gap-6 px-6 py-10 md:px-12"
    >
      <motion.span
        variants={item}
        className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-wide text-indigo-300 backdrop-blur-md"
      >
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
        Full-Stack Developer
      </motion.span>

      <ClipPathTextReveal
        as="h1"
        direction="bottom-to-top"
        mode="animate"
        delay={0.15}
        className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl"
      >
        Building{' '}
        <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          immersive
        </span>{' '}
        digital experiences.
      </ClipPathTextReveal>

      <ClipPathTextReveal
        as="p"
        direction="left-to-right"
        mode="animate"
        delay={0.35}
        className="max-w-md text-base leading-relaxed text-zinc-400 sm:text-lg"
      >
        I craft high-performance web applications that blend elegant interfaces
        with interactive 3D graphics — turning ideas into polished, memorable
        products.
      </ClipPathTextReveal>

      <motion.div variants={item} className="mt-2 flex flex-wrap items-center gap-4">
        <StaggerButton
          href="#projects"
          text="View Projects"
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

        <div className="flex items-center gap-2">
          <SpoilerAlert label="Secret Stat" revealOnHover={true}>
            <span className="rounded border border-purple-500/30 bg-purple-950/60 px-2.5 py-1 font-mono text-xs font-semibold text-purple-300">
              ☕ 2,400+ Coffees Drank
            </span>
          </SpoilerAlert>
        </div>
      </motion.div>
    </motion.div>
  );
}
