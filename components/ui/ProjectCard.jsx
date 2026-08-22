'use client';

import { motion } from 'framer-motion';
import TiltCard from './TiltCard';
import SpoilerAlert from './SpoilerAlert';

export default function ProjectCard({ project, onOpen, onSelect }) {
  const handleOpen = () => {
    if (onOpen) onOpen(project);
    if (onSelect) onSelect(project);
  };

  return (
    <motion.div
      layout
      onClick={handleOpen}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="cursor-pointer h-full"
    >
      <TiltCard className="flex h-full flex-col p-0" intensity={8}>
        {/* Banner image / gradient header */}
        <div className="relative aspect-video w-full overflow-hidden rounded-t-2xl">
          <div
            className="absolute inset-0 bg-gradient-to-br opacity-80"
            style={{
              backgroundImage: `linear-gradient(135deg, ${project.from}, ${project.to})`,
            }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.2),transparent_60%)]" />
          <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
            <span className="text-2xl font-bold text-white/90 drop-shadow-lg">
              {project.title}
            </span>
          </div>
          <div className="absolute right-3 top-3">
            <span className="rounded-full border border-white/20 bg-black/50 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-white backdrop-blur-md">
              {project.category}
            </span>
          </div>
        </div>

        {/* Card body content */}
        <div className="flex flex-1 flex-col justify-between p-5 gap-3">
          <div>
            <h3 className="text-lg font-semibold text-white">{project.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-zinc-400">
              {project.summary}
            </p>
          </div>

          {/* Bottom stack & metric footer */}
          <div className="mt-auto flex items-center justify-between gap-2 border-t border-white/5 pt-3">
            <div className="flex flex-wrap gap-1.5">
              {project.stack.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-medium text-zinc-300"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div onClick={(e) => e.stopPropagation()} className="shrink-0">
              <SpoilerAlert label="Benchmark">
                <span className="rounded bg-emerald-950/80 px-2 py-0.5 font-mono text-[10px] font-semibold text-emerald-400 border border-emerald-500/30">
                  ⚡ 60 FPS
                </span>
              </SpoilerAlert>
            </div>
          </div>

          <motion.button
            whileHover={{ x: 4 }}
            onClick={(e) => {
              e.stopPropagation();
              handleOpen();
            }}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-300 transition-colors hover:text-indigo-200"
          >
            View details
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.button>
        </div>
      </TiltCard>
    </motion.div>
  );
}
