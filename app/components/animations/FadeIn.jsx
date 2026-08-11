'use client';

import { motion } from 'framer-motion';

const directions = {
  up: { x: 0, y: 24 },
  down: { x: 0, y: -24 },
  left: { x: 24, y: 0 },
  right: { x: -24, y: 0 },
};

export default function FadeIn({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  distance,
  once = true,
  className = '',
  as = 'div',
}) {
  const MotionTag = motion[as];
  const offset = directions[direction] || directions.up;
  const d = distance ?? 24;

  const variants = {
    hidden: { opacity: 0, x: offset.x * (d / 24), y: offset.y * (d / 24) },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration, delay, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <MotionTag
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.2 }}
      variants={variants}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
