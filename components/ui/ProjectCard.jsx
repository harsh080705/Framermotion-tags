'use client';

import { useRef } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';

export default function ProjectCard({ project, onSelect }) {
  const ref = useRef(null);

  // Mouse position normalized to [-0.5, 0.5]
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring-smoothed rotation values
  const springConfig = { stiffness: 260, damping: 20, mass: 0.6 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), springConfig);

  // Spotlight position for the border overlay
  const spotlightX = useSpring(
    useTransform(x, [-0.5, 0.5], ['20%', '80%']),
    { stiffness: 260, damping: 25 }
  );
  const spotlightY = useSpring(
    useTransform(y, [-0.5, 0.5], ['20%', '80%']),
    { stiffness: 260, damping: 25 }
  );

  const handleMouseMove = (event) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((event.clientX - rect.left) / rect.width - 0.5);
    y.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className="group relative h-full"
    >
      {/* Spotlight border overlay */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at ${spotlightX} ${spotlightY}, rgba(165,180,252,0.35) 0%, transparent 60%)`,
          WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />

      <motion.button
        type="button"
        onClick={() => onSelect(project)}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 400, damping: 22 }}
        className="relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 text-left backdrop-blur-md transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.08]"
      >
        {/* Gradient wash on hover */}
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
        />

        {/* Header: icon + year */}
        <div className="relative flex items-start justify-between">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-2xl backdrop-blur-md">
            {project.icon}
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-zinc-400 backdrop-blur-md">
            {project.year}
          </span>
        </div>

        {/* Title + category */}
        <div className="relative mt-4 flex items-baseline justify-between gap-3">
          <h3 className="text-lg leading-snug font-semibold text-white">
            {project.title}
          </h3>
          <span className={`shrink-0 text-xs font-semibold tracking-wide uppercase ${project.accent}`}>
            {project.category}
          </span>
        </div>

        {/* Description */}
        <p className="relative mt-2 flex-1 text-sm leading-relaxed text-zinc-400">
          {project.description}
        </p>

        {/* Dynamic tech badges */}
        <div className="relative mt-5 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <motion.span
              key={tech}
              whileHover={{ scale: 1.08, y: -2 }}
              transition={{ type: 'spring', stiffness: 500, damping: 20 }}
              className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-zinc-300 backdrop-blur-md transition-colors hover:border-indigo-400/40 hover:text-indigo-200"
            >
              {tech}
            </motion.span>
          ))}
        </div>

        {/* CTA footer */}
        <div className="relative mt-6 flex items-center justify-between border-t border-white/5 pt-4">
          <span className="text-sm font-medium text-indigo-300">View Details</span>
          <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
            className="text-lg text-indigo-300"
          >
            →
          </motion.span>
        </div>
      </motion.button>
    </motion.div>
  );
}