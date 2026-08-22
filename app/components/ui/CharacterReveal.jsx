'use client';

import { motion } from 'framer-motion';

export default function CharacterReveal({
  text = '',
  className = '',
  delay = 0,
  stagger = 0.03,
  once = true,
}) {
  const words = typeof text === 'string' ? text.split(' ') : [];

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

  const charVariants = {
    hidden: {
      y: '110%',
      opacity: 0,
      rotateX: -30,
    },
    visible: {
      y: '0%',
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.55,
        ease: [0.16, 1, 0.3, 1], // snappy cubic-bezier mask entrance
      },
    },
  };

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.3 }}
      className={`inline-flex flex-wrap ${className}`}
    >
      {words.map((word, wordIdx) => (
        <span key={`${word}-${wordIdx}`} className="inline-block whitespace-nowrap mr-[0.25em]">
          {word.split('').map((char, charIdx) => (
            <span
              key={`${char}-${charIdx}`}
              className="inline-block overflow-hidden py-1 vertical-bottom"
            >
              <motion.span
                variants={charVariants}
                className="inline-block transform-gpu"
              >
                {char}
              </motion.span>
            </span>
          ))}
        </span>
      ))}
    </motion.span>
  );
}
