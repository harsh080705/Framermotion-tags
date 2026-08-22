'use client';

import { motion } from 'framer-motion';

const VARIANTS = {
  primary:
    'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 border border-transparent',
  secondary:
    'border border-white/15 bg-white/5 text-white backdrop-blur-md hover:bg-white/10 hover:border-white/30',
  outline:
    'border border-indigo-400/40 text-indigo-300 hover:border-indigo-400 hover:bg-indigo-500/10',
};

const topCharVariants = {
  initial: { y: '0%' },
  hover: (i) => ({
    y: '-120%',
    transition: {
      duration: 0.3,
      delay: i * 0.02,
      ease: [0.33, 1, 0.68, 1],
    },
  }),
};

const bottomCharVariants = {
  initial: { y: '120%' },
  hover: (i) => ({
    y: '0%',
    transition: {
      duration: 0.3,
      delay: i * 0.02,
      ease: [0.33, 1, 0.68, 1],
    },
  }),
};

export default function StaggerButton({
  text,
  children,
  href,
  onClick,
  variant = 'primary',
  className = '',
  icon: Icon,
  type = 'button',
  ...props
}) {
  const labelText = text || (typeof children === 'string' ? children : '');
  const characters = labelText ? labelText.split('') : [];

  const Component = href ? motion.a : motion.button;
  const variantStyles = VARIANTS[variant] || VARIANTS.primary;

  return (
    <Component
      href={href}
      onClick={onClick}
      type={!href ? type : undefined}
      initial="initial"
      whileHover="hover"
      whileTap={{ scale: 0.97 }}
      className={`group relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 select-none ${variantStyles} ${className}`}
      {...props}
    >
      {/* Staggered text layer */}
      {characters.length > 0 ? (
        <span className="relative inline-flex overflow-hidden py-0.5">
          {/* Top text layer */}
          <span className="inline-flex">
            {characters.map((char, index) => (
              <motion.span
                key={`top-${index}-${char}`}
                custom={index}
                variants={topCharVariants}
                className="inline-block whitespace-pre"
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </span>

          {/* Bottom duplicate text layer */}
          <span className="absolute inset-0 flex items-center justify-center">
            {characters.map((char, index) => (
              <motion.span
                key={`bottom-${index}-${char}`}
                custom={index}
                variants={bottomCharVariants}
                className="inline-block whitespace-pre"
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </span>
        </span>
      ) : (
        <span>{children}</span>
      )}

      {/* Optional icon */}
      {Icon && (
        <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
          <Icon size={16} />
        </span>
      )}
    </Component>
  );
}
