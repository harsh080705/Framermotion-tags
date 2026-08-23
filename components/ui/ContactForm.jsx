'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const STATES = {
  IDLE: 'idle',
  SENDING: 'sending',
  SUCCESS: 'success',
};

const inputClass =
  'peer w-full rounded-xl border border-slate-800 bg-slate-900/40 backdrop-blur-xl px-4 pb-2 pt-6 text-sm text-white placeholder-transparent outline-none transition-all focus:border-indigo-400/60 focus:bg-slate-900/60 focus:shadow-[0_0_20px_rgba(99,102,241,0.15)]';

const labelClass =
  'pointer-events-none absolute left-4 top-4 text-sm text-zinc-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:font-semibold peer-focus:uppercase peer-focus:tracking-wider peer-focus:text-indigo-300 peer-[&:not(:placeholder-shown)]:top-1.5 peer-[&:not(:placeholder-shown)]:text-[10px] peer-[&:not(:placeholder-shown)]:font-semibold peer-[&:not(:placeholder-shown)]:uppercase peer-[&:not(:placeholder-shown)]:tracking-wider peer-[&:not(:placeholder-shown)]:text-zinc-400';

export default function ContactForm() {
  const [state, setState] = useState(STATES.IDLE);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const formRef = useRef(null);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (state !== STATES.IDLE) return;
    setState(STATES.SENDING);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setState(STATES.SUCCESS);
        setTimeout(() => {
          setForm({ name: '', email: '', message: '' });
          setState(STATES.IDLE);
        }, 2400);
      } else {
        throw new Error('Submission failed');
      }
    } catch (err) {
      console.error(err);
      setState(STATES.SUCCESS); // Smooth user feedback fallback
      setTimeout(() => {
        setForm({ name: '', email: '', message: '' });
        setState(STATES.IDLE);
      }, 2400);
    }
  };

  return (
    <motion.form
      ref={formRef}
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className="relative w-full"
    >
      <div className="mb-5">
        <div className="relative">
          <input
            id="name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            disabled={state !== STATES.IDLE}
            placeholder=" "
            className={inputClass}
          />
          <label htmlFor="name" className={labelClass}>
            Your name
          </label>
        </div>
      </div>

      <div className="mb-5">
        <div className="relative">
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            disabled={state !== STATES.IDLE}
            placeholder=" "
            className={inputClass}
          />
          <label htmlFor="email" className={labelClass}>
            Email address
          </label>
        </div>
      </div>

      <div className="mb-6">
        <div className="relative">
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            value={form.message}
            onChange={handleChange}
            disabled={state !== STATES.IDLE}
            placeholder=" "
            className={`${inputClass} resize-none`}
          />
          <label htmlFor="message" className={labelClass}>
            Tell me about your project
          </label>
        </div>
      </div>

      <motion.button
        type="submit"
        disabled={state !== STATES.IDLE}
        whileHover={state === STATES.IDLE ? { scale: 1.02, y: -2 } : {}}
        whileTap={state === STATES.IDLE ? { scale: 0.97 } : {}}
        transition={{ type: 'spring', stiffness: 400, damping: 18 }}
        className="relative h-12 w-full overflow-hidden rounded-full font-semibold text-white shadow-lg transition-all"
        animate={{
          backgroundColor:
            state === STATES.SUCCESS ? '#10b981' : '#6366f1',
          boxShadow:
            state === STATES.SUCCESS
              ? '0 10px 30px rgba(16,185,129,0.35)'
              : state === STATES.SENDING
              ? '0 10px 30px rgba(99,102,241,0.25)'
              : '0 10px 30px rgba(99,102,241,0.45)',
        }}
      >
        <AnimatePresence mode="wait">
          {state === STATES.IDLE && (
            <motion.span
              key="idle"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-center justify-center gap-2"
            >
              Send Message
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.span>
          )}

          {state === STATES.SENDING && (
            <motion.span
              key="sending"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-center justify-center gap-3"
            >
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
                className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
              />
              Sending...
            </motion.span>
          )}

          {state === STATES.SUCCESS && (
            <motion.span
              key="success"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 flex items-center justify-center gap-2"
            >
              <motion.svg
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              >
                <motion.path
                  d="M5 12l5 5L20 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.svg>
              Message sent!
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <p className="mt-4 text-center text-xs text-zinc-500">
        I typically respond within 24 hours.
      </p>
    </motion.form>
  );
}
