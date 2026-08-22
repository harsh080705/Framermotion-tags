'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const DIRECTION_POLYGONS = {
  'bottom-to-top': {
    hidden: { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)', y: 24, opacity: 0 },
    visible: { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', y: 0, opacity: 1 },
  },
  'left-to-right': {
    hidden: { clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)', y: 12, opacity: 0 },
    visible: { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', y: 0, opacity: 1 },
  },
  'top-to-bottom': {
    hidden: { clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)', y: -24, opacity: 0 },
    visible: { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', y: 0, opacity: 1 },
  },
  'right-to-left': {
    hidden: { clipPath: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)', y: 12, opacity: 0 },
    visible: { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', y: 0, opacity: 1 },
  },
};

export default function ClipPathTextReveal({
  children,
  text,
  direction = 'bottom-to-top',
  duration = 0.8,
  delay = 0,
  className = '',
  mode = 'animate', // 'animate' for immediate load, 'view' for scroll-triggered
  once = true,
  as = 'div',
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: '100px 0px 100px 0px' });

  const Component = motion[as] || motion.div;
  const selectedVariants = DIRECTION_POLYGONS[direction] || DIRECTION_POLYGONS['bottom-to-top'];

  const visibleTarget = {
    ...selectedVariants.visible,
    transition: {
      duration,
      delay,
      ease: [0.25, 1, 0.5, 1],
    },
  };

  const variants = {
    hidden: selectedVariants.hidden,
    visible: visibleTarget,
    show: visibleTarget,
  };

  const isAnimated = mode === 'animate' || isInView;

  return (
    <Component
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isAnimated ? 'visible' : 'hidden'}
      className={`will-change-[clip-path,transform,opacity] ${className}`}
    >
      {children || text}
    </Component>
  );
}
