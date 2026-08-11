'use client';

import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.05,
    },
  },
};

const charVariants = {
  hidden: { opacity: 0, y: '100%' },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 16, filter: 'blur(8px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function TextReveal({
  text = '',
  mode = 'char',
  className = '',
  delay = 0,
  stagger = 0.04,
  once = true,
  as: Tag = 'p',
}) {
  const MotionTag = motion[Tag];
  const words = text.split(' ');

  const customContainer = {
    ...container,
    show: {
      ...container.show,
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };

  if (mode === 'word') {
    return (
      <MotionTag
        variants={customContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once, amount: 0.3 }}
        className={className}
      >
        {words.map((word, i) => (
          <motion.span
            key={i}
            variants={wordVariants}
            className="inline-block"
            style={{ marginRight: '0.25em' }}
          >
            {word}
          </motion.span>
        ))}
      </MotionTag>
    );
  }

  return (
    <MotionTag
      variants={customContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.3 }}
      className={className}
      aria-label={text}
    >
      {words.map((word, wordIndex) => (
        <span
          key={wordIndex}
          className="inline-block whitespace-nowrap"
          style={{ marginRight: '0.25em' }}
        >
          {word.split('').map((char, charIndex) => (
            <span
              key={charIndex}
              className="inline-block overflow-hidden align-baseline"
            >
              <motion.span variants={charVariants} className="inline-block">
                {char}
              </motion.span>
            </span>
          ))}
        </span>
      ))}
    </MotionTag>
  );
}
