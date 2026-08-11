'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

export default function TiltCard({ children, className = '', intensity = 12 }) {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-0.5, 0.5], [intensity, -intensity]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-intensity, intensity]);

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
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      className={`rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-colors hover:border-white/20 hover:bg-white/[0.07] ${className}`}
    >
      {children}
    </motion.div>
  );
}
