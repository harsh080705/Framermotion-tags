'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

export default function Tilt3DCard({
  children,
  className = '',
  intensity = 12,
  perspective = 1000,
  scale = 1.02,
  glare = true,
}) {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 200, damping: 18, mass: 0.5 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const rotateX = useTransform(ySpring, [-0.5, 0.5], [intensity, -intensity]);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], [-intensity, intensity]);

  const glareX = useTransform(xSpring, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(ySpring, [-0.5, 0.5], ['0%', '100%']);

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
      style={{ rotateX, rotateY, transformPerspective: perspective }}
      whileHover={{ scale }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      className={`relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-colors hover:border-white/20 hover:bg-white/[0.07] ${className}`}
    >
      {children}
      {glare && (
        <motion.div
          aria-hidden
          style={{
            background: `radial-gradient(circle at ${glareX.get()} ${glareY.get()}, rgba(255,255,255,0.15), transparent 60%)`,
          }}
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
      )}
    </motion.div>
  );
}
