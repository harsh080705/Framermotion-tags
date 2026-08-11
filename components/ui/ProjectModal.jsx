'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

export default function ProjectModal({ project, onClose }) {
  // Close on Escape key
  useEffect(() => {
    if (!project) return;
    const handleKey = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    // Lock body scroll while modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key={`modal-${project.id}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} details`}
        >
          {/* Modal panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            onClick={(event) => event.stopPropagation()}
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/10 bg-bg-soft/95 p-6 shadow-2xl backdrop-blur-xl sm:p-8"
          >
            {/* Brand gradient wash */}
            <div
              aria-hidden
              className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20`}
            />

            {/* Close button */}
            <motion.button
              type="button"
              onClick={onClose}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-400 backdrop-blur-md transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Close modal"
            >
              ✕
            </motion.button>

            <div className="relative">
              {/* Header */}
              <div className="flex items-center gap-4">
                <motion.span
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 18, delay: 0.1 }}
                  className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-3xl backdrop-blur-md"
                >
                  {project.icon}
                </motion.span>
                <div>
                  <span className={`text-sm font-semibold tracking-wide uppercase ${project.accent}`}>
                    {project.category}
                  </span>
                  <h3 className="text-xl font-bold text-white sm:text-2xl">
                    {project.title}
                  </h3>
                  <p className="mt-0.5 text-xs text-zinc-500">{project.year}</p>
                </div>
              </div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.35 }}
                className="mt-6 text-sm leading-relaxed text-zinc-300 sm:text-base"
              >
                {project.description}
              </motion.p>

              {/* Features list */}
              <div className="mt-7">
                <motion.h4
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                  className="mb-3 text-xs font-semibold tracking-widest text-zinc-500 uppercase"
                >
                  Key Features
                </motion.h4>
                <ul className="space-y-2.5">
                  {project.features.map((feature, index) => (
                    <motion.li
                      key={feature}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.25 + index * 0.07, duration: 0.3 }}
                      className="flex items-start gap-3 text-sm text-zinc-300"
                    >
                      <motion.span
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 1.6, delay: index * 0.2 }}
                        className={`mt-0.5 text-xs ${project.accent}`}
                      >
                        ◆
                      </motion.span>
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Tech tags */}
              <div className="mt-7">
                <motion.h4
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                  className="mb-3 text-xs font-semibold tracking-widest text-zinc-500 uppercase"
                >
                  Tech Stack
                </motion.h4>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, index) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + index * 0.06, type: 'spring', stiffness: 400, damping: 20 }}
                      whileHover={{ y: -3, scale: 1.08 }}
                      className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-zinc-200 backdrop-blur-md"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Demo links */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <motion.a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30"
                >
                  <span>Live Demo</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.a>

                <motion.a
                  href={project.codeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45, duration: 0.3 }}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex flex-1 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/10"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 2.87-.39c.97 0 1.95.13 2.87.39 2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.73.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.25 5.67.41.35.78 1.05.78 2.11 0 1.52-.01 2.75-.01 3.13 0 .31.21.67.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
                  </svg>
                  <span>View Code</span>
                </motion.a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}