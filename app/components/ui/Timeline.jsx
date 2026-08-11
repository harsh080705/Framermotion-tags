'use client';

import { motion } from 'framer-motion';

const timeline = [
  {
    period: '2024 — Present',
    role: 'Senior Full-Stack Developer',
    company: 'Freelance / Independent',
    description:
      'Architecting high-performance WebGL experiences and full-stack platforms for clients, focusing on GPU-optimized rendering and scalable backend systems.',
    tags: ['Three.js', 'Next.js', 'Node.js', 'WebGL'],
    accent: 'from-indigo-500 to-purple-500',
    glow: 'shadow-indigo-500/40',
  },
  {
    period: '2023 — 2024',
    role: 'Full-Stack Developer',
    company: 'Tech Startup',
    description:
      'Built real-time collaborative tools and analytics dashboards processing 50k+ events per second, reducing page load times by 40%.',
    tags: ['React', 'FastAPI', 'ClickHouse', 'Redis'],
    accent: 'from-purple-500 to-pink-500',
    glow: 'shadow-purple-500/40',
  },
  {
    period: '2022 — 2023',
    role: 'Frontend Engineer',
    company: 'Digital Agency',
    description:
      'Delivered immersive 3D marketing sites and interactive product configurators, winning two industry design awards.',
    tags: ['Three.js', 'React', 'GSAP', 'Tailwind'],
    accent: 'from-pink-500 to-rose-500',
    glow: 'shadow-pink-500/40',
  },
  {
    period: '2021 — 2022',
    role: 'Junior Web Developer',
    company: 'Software House',
    description:
      'Developed responsive e-commerce platforms and CMS integrations, establishing best practices for component-driven development.',
    tags: ['JavaScript', 'Node.js', 'MongoDB', 'MySQL'],
    accent: 'from-rose-500 to-amber-500',
    glow: 'shadow-rose-500/40',
  },
];

export default function Timeline() {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div
        aria-hidden
        className="absolute top-0 bottom-0 left-4 w-px bg-gradient-to-b from-indigo-500/60 via-purple-500/40 to-transparent sm:left-1/2 sm:-translate-x-1/2"
      />

      <div className="space-y-10">
        {timeline.map((item, index) => {
          const isLeft = index % 2 === 0;

          return (
            <motion.div
              key={item.period}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className={`relative flex items-start gap-6 pl-12 sm:w-1/2 sm:pl-0 ${
                isLeft
                  ? 'sm:mr-auto sm:pr-12 sm:text-right'
                  : 'sm:ml-auto sm:pl-12'
              }`}
            >
              {/* Glowing node marker */}
              <motion.span
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 400, damping: 18, delay: 0.2 }}
                className={`absolute top-1 left-4 flex h-4 w-4 -translate-x-1/2 items-center justify-center sm:left-1/2 ${
                  isLeft ? 'sm:translate-x-0' : 'sm:-translate-x-full'
                }`}
              >
                <span
                  className={`absolute h-4 w-4 rounded-full bg-gradient-to-br ${item.accent} opacity-40 blur-[6px]`}
                />
                <span
                  className={`relative h-2.5 w-2.5 rounded-full bg-gradient-to-br ${item.accent} shadow-lg ${item.glow}`}
                />
              </motion.span>

              {/* Glassmorphism card */}
              <div
                className={`group relative flex-1 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.08] ${
                  isLeft ? 'sm:ml-auto' : ''
                }`}
              >
                <span className="text-xs font-semibold tracking-widest text-indigo-300 uppercase">
                  {item.period}
                </span>
                <h3 className="mt-1.5 text-lg font-semibold text-white">
                  {item.role}
                </h3>
                <p className="text-sm font-medium text-zinc-400">{item.company}</p>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  {item.description}
                </p>

                <div
                  className={`mt-4 flex flex-wrap gap-2 ${
                    isLeft ? 'sm:justify-end' : ''
                  }`}
                >
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-zinc-300 backdrop-blur-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}