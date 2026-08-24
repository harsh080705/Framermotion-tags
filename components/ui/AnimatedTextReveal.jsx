'use client';

import { useRef } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionTemplate,
} from 'framer-motion';

function splitText(text, mode) {
  if (mode === 'character') {
    return text.split(' ').flatMap((word, wi, arr) => {
      const chars = word.split('').map((char, ci) => ({
        content: char,
        key: `w${wi}c${ci}`,
        isSpace: false,
      }));
      if (wi < arr.length - 1) {
        chars.push({ content: '\xa0', key: `w${wi}sp`, isSpace: true });
      }
      return chars;
    });
  }
  return text.split(' ').map((word, i) => ({
    content: word,
    key: `w${i}`,
    isSpace: false,
  }));
}

function AnimatedToken({
  children,
  progress,
  range,
  mode,
  dimOpacity,
  baseColor,
  highlightColor,
  isSpace,
}) {
  const opacity = useTransform(progress, range, [dimOpacity, 1]);
  const y = useTransform(progress, range, [20, 0]);
  const scale = useTransform(progress, range, [0.75, 1]);
  const rotateY = useTransform(progress, [range[0] - 0.03, range[1]], [45, 0]);
  const blurAmount = useTransform(progress, range, [8, 0]);
  const filter = useMotionTemplate`blur(${blurAmount}px)`;
  const color = useTransform(progress, range, [baseColor, highlightColor]);

  if (isSpace) {
    return <span style={{ display: 'inline-block' }}>{children}</span>;
  }

  const needsClip = mode === 'slide-mask';
  const animatedStyle = {
    display: 'inline-block',
    willChange: 'opacity, transform, filter',
    transformStyle: 'preserve-3d',
    opacity: mode === 'none' ? 1 : opacity,
    y: mode === 'wave-3d' || mode === 'slide-mask' ? y : 0,
    rotateY: mode === 'wave-3d' ? rotateY : 0,
    filter: mode === 'blur-fade' ? filter : 'none',
    scale: mode === 'scale-in' ? scale : 1,
    color: mode === 'color-shift' ? color : undefined,
  };

  return (
    <span
      style={{
        display: 'inline-block',
        overflow: needsClip ? 'hidden' : 'visible',
      }}
    >
      <motion.span style={animatedStyle}>{children}</motion.span>
    </span>
  );
}

export default function AnimatedTextReveal({
  text = 'Craft experiences people remember. Every scroll tells part of the story.',
  splitMode = 'word',
  animationMode = 'dimming',
  dimOpacity = 0.2,
  baseColor = 'rgba(255, 255, 255, 0.25)',
  highlightColor = '#818cf8',
  scrollStart = 0.9,
  scrollEnd = 0.55,
  smoothing = 0.15,
  overlap = 1.25,
  textAlign = 'left',
  className = '',
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`start ${scrollStart}`, `end ${scrollEnd}`],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 280 + (1 - smoothing) * 200,
    damping: 18 + smoothing * 10,
    mass: 0.1,
  });

  const tokens = splitText(text, splitMode);
  const totalTokens = Math.max(
    tokens.filter((t) => !t.isSpace).length,
    1
  );
  let tokenIndex = -1;

  return (
    <motion.div
      ref={ref}
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        columnGap: splitMode === 'character' ? '0px' : '0.28em',
        rowGap: '0.1em',
        textAlign,
        color: baseColor,
        perspective: '800px',
        width: '100%',
      }}
      className={className}
    >
      {tokens.map((token) => {
        if (!token.isSpace) tokenIndex++;
        const stepSize = 1 / totalTokens;
        const start = tokenIndex * stepSize;
        const end = Math.min(start + stepSize * overlap, 1);
        return (
          <AnimatedToken
            key={token.key}
            progress={smoothProgress}
            range={[start, end]}
            mode={animationMode}
            dimOpacity={dimOpacity}
            baseColor={baseColor}
            highlightColor={highlightColor}
            isSpace={token.isSpace}
          >
            {token.content}
          </AnimatedToken>
        );
      })}
    </motion.div>
  );
}
