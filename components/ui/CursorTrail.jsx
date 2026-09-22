'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, textarea, select, [data-cursor="hover"], [data-cursor-hover]';

export default function CursorTrail() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const ringSpring = { stiffness: 180, damping: 22, mass: 0.6 };
  const dotSpring = { stiffness: 500, damping: 30, mass: 0.2 };

  const ringX = useSpring(mouseX, ringSpring);
  const ringY = useSpring(mouseY, ringSpring);
  const dotX = useSpring(mouseX, dotSpring);
  const dotY = useSpring(mouseY, dotSpring);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(hover: none) and (pointer: coarse)').matches);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const handleMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleLeave = () => setIsVisible(false);
    const handleEnter = () => setIsVisible(true);

    const handlePointerOver = (e) => {
      const target = e.target;
      if (target.closest && target.closest(INTERACTIVE_SELECTOR)) {
        setIsHovering(true);
      }
    };

    const handlePointerOut = (e) => {
      const target = e.target;
      if (target.closest && target.closest(INTERACTIVE_SELECTOR)) {
        const related = e.relatedTarget;
        if (!related || !(related.closest && related.closest(INTERACTIVE_SELECTOR))) {
          setIsHovering(false);
        }
      }
    };

    window.addEventListener('pointermove', handleMove);
    window.addEventListener('pointerleave', handleLeave);
    window.addEventListener('pointerenter', handleEnter);
    document.addEventListener('pointerover', handlePointerOver);
    document.addEventListener('pointerout', handlePointerOut);

    return () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerleave', handleLeave);
      window.removeEventListener('pointerenter', handleEnter);
      document.removeEventListener('pointerover', handlePointerOver);
      document.removeEventListener('pointerout', handlePointerOut);
    };
  }, [isMobile, isVisible, mouseX, mouseY]);

  if (isMobile) return null;

  return (
    <>
      <motion.div
        aria-hidden
        style={{
          translateX: ringX,
          translateY: ringY,
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          scale: isHovering ? 2.2 : 1,
          borderColor: isHovering ? 'rgba(165, 180, 252, 0.9)' : 'rgba(255,255,255,0.4)',
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border backdrop-blur-sm mix-blend-difference"
      />

      <motion.div
        aria-hidden
        style={{
          translateX: dotX,
          translateY: dotY,
          opacity: isVisible ? 1 : 0,
        }}
        whileTap={{ scale: 0.3 }}
        animate={{
          scale: isHovering ? 0.5 : 1,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"
      />
    </>
  );
}
