'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye } from 'lucide-react';

export default function SpoilerAlert({
  children,
  label = 'Click to reveal',
  revealOnHover = false,
  className = '',
}) {
  const [isRevealed, setIsRevealed] = useState(false);

  const toggleReveal = () => setIsRevealed((prev) => !prev);

  return (
    <span
      role="button"
      tabIndex={0}
      aria-expanded={isRevealed}
      onClick={toggleReveal}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleReveal();
        }
      }}
      onMouseEnter={revealOnHover ? () => setIsRevealed(true) : undefined}
      onMouseLeave={revealOnHover ? () => setIsRevealed(false) : undefined}
      className={`group relative inline-flex items-center justify-center cursor-pointer select-none rounded-lg transition-all duration-300 shrink-0 ${className}`}
    >
      {/* Blurred / Revealed child content */}
      <motion.span
        animate={{
          filter: isRevealed ? 'blur(0px)' : 'blur(7px)',
          opacity: isRevealed ? 1 : 0.3,
          scale: isRevealed ? 1 : 0.98,
        }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className={`inline-flex items-center justify-center whitespace-nowrap ${
          !isRevealed ? 'pointer-events-none select-none' : 'select-auto'
        }`}
      >
        {children}
      </motion.span>

      {/* Concealed overlay badge */}
      <AnimatePresence>
        {!isRevealed && (
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute inset-0 m-auto flex h-fit w-fit items-center justify-center gap-1 rounded-full border border-indigo-400/30 bg-indigo-950/90 px-2 py-0.5 text-[9px] font-bold tracking-wider text-indigo-200 uppercase shadow-lg backdrop-blur-md whitespace-nowrap transition-colors group-hover:border-indigo-400/60 group-hover:bg-indigo-900 group-hover:text-white"
          >
            <Eye size={10} className="text-indigo-300 group-hover:text-indigo-200 shrink-0" />
            <span>{label}</span>
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
