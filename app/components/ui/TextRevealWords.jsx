'use client';

import { motion } from 'framer-motion';

export default function TextRevealWords({
  text = '',
  className = '',
  delay = 0,
  stagger = 0.08,
  once = true,
  as: Component = 'div',
}) {
  const words = typeof text === 'string' ? text.trim().split(/\s+/) : [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      filter: 'blur(8px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      as={Component}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.3 }}
      className={`flex flex-wrap ${className}`}
    >
      {words.map((word, idx) => (
        <motion.span
          key={`${word}-${idx}`}
          variants={wordVariants}
          className="inline-block mr-[0.28em] whitespace-nowrap"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}
