'use client';

import { motion } from 'framer-motion';

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

      <motion.h1
        variants={item}
        className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl"
      >
        Building{' '}
        <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          immersive
        </span>{' '}
        digital experiences.
      </motion.h1>

      <motion.p
        variants={item}
        className="max-w-md text-base leading-relaxed text-zinc-400 sm:text-lg"
      >
        I craft high-performance web applications that blend elegant interfaces
        with interactive 3D graphics — turning ideas into polished, memorable
        products.
      </motion.p>

      <motion.div variants={item} className="mt-2 flex flex-wrap gap-4">
        <motion.a
          href="#projects"
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 400, damping: 18 }}
          className="rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition-shadow hover:shadow-indigo-500/50"
        >
          View Projects
        </motion.a>

        <motion.a
          href="#contact"
          whileHover={{ scale: 1.04, y: -2, borderColor: '#a5b4fc' }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 400, damping: 18 }}
          className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/10"
        >
          Contact Me
        </motion.a>
      </motion.div>
    </motion.div>
  );
}
