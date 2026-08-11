'use client';

import { motion } from 'framer-motion';
import TiltCard from './TiltCard';

export default function ProjectCard({ project, onOpen }) {
  return (
    <motion.div layout whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
      <TiltCard className="flex h-full flex-col p-0" intensity={8}>
        <div className="relative aspect-video w-full overflow-hidden">
          <div
            className="absolute inset-0 bg-gradient-to-br opacity-80"
            style={{
              backgroundImage: `linear-gradient(135deg, ${project.from}, ${project.to})`,
            }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.2),transparent_60%)]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-white/90 drop-shadow-lg">
              {project.title}
            </span>
          </div>
          <div className="absolute right-3 top-3">
            <span className="rounded-full border border-white/20 bg-black/40 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-white backdrop-blur-md">
              {project.category}
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-3 p-5">
          <h3 className="text-lg font-semibold text-white">{project.title}</h3>
          <p className="text-sm leading-relaxed text-zinc-400">
            {project.summary}
          </p>

          <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
            {project.stack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-medium text-zinc-300"
              >
                {tech}
              </span>
            ))}
          </div>

          <motion.button
            whileHover={{ x: 4 }}
            onClick={() => onOpen(project)}
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-indigo-300 transition-colors hover:text-indigo-200"
          >
            View details
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.button>
        </div>
      </TiltCard>
    </motion.div>
  );
}
