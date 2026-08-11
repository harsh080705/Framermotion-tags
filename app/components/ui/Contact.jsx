'use client';

import { useEffect, useRef, useState } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';

/* ------------------------------------------------------------------ */
/*  Icon set                                                           */
/* ------------------------------------------------------------------ */

const GitHubIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 2.87-.39c.97 0 1.95.13 2.87.39 2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.73.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.25 5.67.41.35.78 1.05.78 2.11 0 1.52-.01 2.75-.01 3.13 0 .31.21.67.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
  </svg>
);

const LinkedInIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.55V9h3.57v11.45Z" />
  </svg>
);

const XIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.67l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23Zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64Z" />
  </svg>
);

const EmailIcon = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className={className}
    aria-hidden="true"
  >
    <rect x="2.5" y="4.5" width="19" height="15" rx="3" />
    <path d="m3.5 6.5 7.3 6.1a2 2 0 0 0 2.4 0l7.3-6.1" strokeLinecap="round" />
  </svg>
);

/* ------------------------------------------------------------------ */
/*  Social data                                                        */
/* ------------------------------------------------------------------ */

const socials = [
  {
    name: 'GitHub',
    url: 'https://github.com/',
    color: '#a3a3a3',
    glow: 'rgba(163, 163, 163, 0.35)',
    icon: <GitHubIcon className="h-7 w-7 sm:h-8 sm:w-8" />,
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/',
    color: '#0a66c2',
    glow: 'rgba(10, 102, 194, 0.45)',
    icon: <LinkedInIcon className="h-7 w-7 sm:h-8 sm:w-8" />,
  },
  {
    name: 'X',
    url: 'https://x.com/',
    color: '#e7e9ea',
    glow: 'rgba(231, 233, 234, 0.4)',
    icon: <XIcon className="h-7 w-7 sm:h-8 sm:w-8" />,
  },
  {
    name: 'Email',
    url: 'mailto:hello@harsh.dev',
    color: '#ec4899',
    glow: 'rgba(236, 72, 153, 0.5)',
    icon: <EmailIcon className="h-7 w-7 sm:h-8 sm:w-8" />,
  },
];

/* ------------------------------------------------------------------ */
/*  3D tilt icon — CSS transform-style: preserve-3d + Framer Motion   */
/* ------------------------------------------------------------------ */

function TiltIcon3D({ social, index }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [20, -20]), {
    stiffness: 220,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-20, 20]), {
    stiffness: 220,
    damping: 18,
  });

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
      className="group [perspective:900px]"
      initial={{ opacity: 0, y: 30, rotateY: -20 }}
      whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.a
        ref={ref}
        href={social.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={social.name}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        animate={{ y: [0, -10, 0] }}
        transition={{
          y: { repeat: Infinity, duration: 3.2 + index * 0.35, ease: 'easeInOut', delay: index * 0.25 },
        }}
        whileHover={{ scale: 1.1 }}
        className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md transition-colors duration-300 hover:border-white/25 hover:bg-white/[0.08] sm:h-24 sm:w-24"
      >
        {/* glow floor layer (behind) */}
        <div
          aria-hidden
          className="absolute inset-0 rounded-2xl opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: social.glow, transform: 'translateZ(-50px)' }}
        />
        {/* front icon layer */}
        <div
          className="text-zinc-300 transition-colors duration-300 group-hover:text-white"
          style={{ transform: 'translateZ(40px)' }}
        >
          {social.icon}
        </div>
        {/* top edge highlight */}
        <div
          aria-hidden
          className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ transform: 'translateZ(30px)' }}
        />
        {/* hover ring */}
        <div
          aria-hidden
          className="absolute inset-0 rounded-2xl border border-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ transform: 'translateZ(-20px)' }}
        />
      </motion.a>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Floating label input                                               */
/* ------------------------------------------------------------------ */

function FloatingField({ label, type = 'text', value, onChange, textarea = false }) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  const baseClasses =
    'peer w-full rounded-xl border border-white/10 bg-white/5 px-4 pt-5 pb-2 text-sm text-white backdrop-blur-md transition-all duration-300 focus:outline-none focus:border-indigo-400/50 focus:bg-white/[0.07] focus:ring-2 focus:ring-indigo-500/10';

  return (
    <div className="relative">
      <motion.label
        animate={{
          y: active ? 0 : 16,
          scale: active ? 0.78 : 1,
          color: focused ? '#a5b4fc' : '#71717a',
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        className="pointer-events-none absolute top-3 left-4 origin-left text-sm font-medium"
      >
        {label}
      </motion.label>

      {textarea ? (
        <textarea
          rows={5}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`${baseClasses} resize-none`}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={baseClasses}
        />
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Submit button — idle / loading / success states                    */
/* ------------------------------------------------------------------ */

function SubmitButton({ status }) {
  return (
    <motion.button
      type="submit"
      disabled={status !== 'idle'}
      whileHover={status === 'idle' ? { scale: 1.02, y: -1 } : undefined}
      whileTap={status === 'idle' ? { scale: 0.97 } : undefined}
      className={`relative flex h-12 w-full items-center justify-center overflow-hidden rounded-full text-sm font-semibold text-white shadow-lg transition-shadow duration-500 ${
        status === 'success'
          ? 'bg-gradient-to-r from-emerald-500 to-teal-500 shadow-emerald-500/30'
          : 'bg-gradient-to-r from-indigo-500 to-purple-500 shadow-indigo-500/30'
      }`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {status === 'idle' && (
          <motion.span
            key="idle"
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -24, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="flex items-center gap-2"
          >
            Send Message
            <motion.svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-4 w-4"
              animate={{ x: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            >
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
          </motion.span>
        )}

        {status === 'loading' && (
          <motion.span
            key="loading"
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -24, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="flex items-center gap-2"
          >
            <motion.span
              className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
            />
            Sending...
          </motion.span>
        )}

        {status === 'success' && (
          <motion.span
            key="success"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 25 }}
            className="flex items-center gap-2"
          >
            <motion.span
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 18, delay: 0.05 }}
              className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="h-3 w-3">
                <path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.span>
            Message Sent!
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Contact section                                               */
/* ------------------------------------------------------------------ */

export default function Contact() {
  const [status, setStatus] = useState('idle');
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const successTimeout = useRef(null);
  const resetTimeout = useRef(null);

  useEffect(
    () => () => {
      clearTimeout(successTimeout.current);
      clearTimeout(resetTimeout.current);
    },
    []
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    if (status !== 'idle') return;

    setStatus('loading');

    // Simulate async submission
    successTimeout.current = setTimeout(() => {
      setStatus('success');
      setForm({ name: '', email: '', message: '' });

      resetTimeout.current = setTimeout(() => {
        setStatus('idle');
      }, 3200);
    }, 1800);
  };

  const update = (key) => (value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <section id="contact" className="relative mx-auto max-w-7xl px-6 py-24 md:px-12">
      {/* decorative background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-0 h-96 w-96 rounded-full bg-purple-500/10 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-indigo-500/10 blur-[100px]" />
      </div>

      {/* section header */}
      <div className="mb-14 max-w-2xl">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-3 inline-block text-sm font-medium tracking-widest text-indigo-400 uppercase"
        >
          Get In Touch
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl font-bold tracking-tight text-white sm:text-5xl"
        >
          {"Let's build something"}{' '}
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            extraordinary
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 text-base leading-relaxed text-zinc-400"
        >
          Have a project in mind, a role to fill, or just want to say hi? My
          inbox is always open — {"I'll get back to you"} within 24 hours.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
        {/* -------- LEFT: 3D social icons -------- */}
        <div className="flex flex-col justify-center gap-10">
          <div className="relative">
            {/* rotating gradient orb behind icons */}
            <motion.div
              aria-hidden
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 24, ease: 'linear' }}
              className="absolute top-1/2 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-indigo-500/30 via-purple-500/20 to-pink-500/30 blur-3xl"
            />

            <div className="relative grid grid-cols-2 gap-6 sm:max-w-md">
              {socials.map((social, index) => (
                <TiltIcon3D key={social.name} social={social} index={index} />
              ))}
            </div>
          </div>

          {/* direct email card */}
          <motion.a
            href="mailto:hello@harsh.dev"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ y: -3 }}
            className="group inline-flex w-fit items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-md transition-colors hover:border-white/20 hover:bg-white/[0.08]"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-pink-500/20 text-xl">
              ✉️
            </span>
            <span>
              <span className="block text-xs font-medium tracking-wide text-zinc-500 uppercase">
                Email me directly
              </span>
              <span className="block text-sm font-semibold text-zinc-200 transition-colors group-hover:text-white">
                hello@harsh.dev
              </span>
            </span>
          </motion.a>
        </div>

        {/* -------- RIGHT: animated form -------- */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex flex-col gap-5 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl sm:p-8"
        >
          {/* top gradient line */}
          <div
            aria-hidden
            className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-indigo-400/60 to-transparent"
          />

          <FloatingField label="Your Name" value={form.name} onChange={update('name')} />
          <FloatingField
            label="Email Address"
            type="email"
            value={form.email}
            onChange={update('email')}
          />
          <FloatingField
            label="Your Message"
            textarea
            value={form.message}
            onChange={update('message')}
          />

          <div className="relative mt-2">
            <SubmitButton status={status} />

            {/* success burst particles */}
            <AnimatePresence>
              {status === 'success' &&
                [...Array(6)].map((_, i) => {
                  const angle = (i / 6) * Math.PI * 2;
                  return (
                    <motion.span
                      key={`burst-${i}`}
                      initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                      animate={{
                        x: Math.cos(angle) * 70,
                        y: Math.sin(angle) * 70,
                        opacity: 0,
                        scale: 0,
                      }}
                      transition={{ duration: 0.7, ease: 'easeOut' }}
                      className="pointer-events-none absolute top-1/2 left-1/2 h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(52,211,153,0.8)]"
                    />
                  );
                })}
            </AnimatePresence>
          </div>

          <p className="text-center text-xs text-zinc-600">
            Built with Next.js, Tailwind CSS & Framer Motion 🚀
          </p>
        </motion.form>
      </div>
    </section>
  );
}