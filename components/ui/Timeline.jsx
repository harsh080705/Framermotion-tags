'use client';

import { motion } from 'framer-motion';

const EXPERIENCE = [
  {
    role: 'Senior Full-Stack Engineer',
    company: 'Independent / Contract',
    period: '2023 — Present',
    description:
      'Leading end-to-end delivery of high-traffic web platforms for clients across SaaS, e-commerce, and creative-tech verticals. Specializing in Next.js architectures, custom WebGL experiences, and performance-critical interfaces.',
    highlights: [
      'Shipped 12+ production apps with combined 2M+ MAU',
      'Reduced p95 load times by 60% through RSC + edge caching',
      'Built reusable WebGL component library adopted by 4 teams',
    ],
  },
  {
    role: 'Full-Stack Developer',
    company: 'Mid-stage Startup',
    period: '2021 — 2023',
    description:
      'Core engineer on a 4-person team building a real-time collaboration platform. Owned the entire frontend stack and contributed to API design, database schema, and CI/CD infrastructure.',
    highlights: [
      'Migrated legacy CRA app to Next.js App Router',
      'Designed and shipped real-time multiplayer editing',
      'Reduced infrastructure costs by 35% via query optimization',
    ],
  },
  {
    role: 'Frontend Engineer',
    company: 'Digital Agency',
    period: '2019 — 2021',
    description:
      'Built marketing sites, e-commerce storefronts, and custom CMS integrations for B2B and DTC clients. Collaborated closely with designers on motion-rich, animation-driven experiences.',
    highlights: [
      'Delivered 30+ client projects across industries',
      'Pioneered GSAP + Lottie animation pipeline',
      'Mentored 2 junior developers on React best practices',
    ],
  },
];

export default function Timeline() {
  return (
    <div className="relative">
      <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-indigo-500/50 via-purple-500/30 to-transparent md:left-1/2" />

      <div className="space-y-12">
        {EXPERIENCE.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={`relative flex flex-col gap-6 pl-12 md:flex-row md:items-center md:pl-0 ${
              index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
            }`}
          >
            <div className="absolute left-4 top-2 -translate-x-1/2 md:left-1/2">
              <div className="relative">
                <div className="absolute inset-0 animate-glow-pulse rounded-full bg-indigo-500 blur-md" />
                <div className="relative h-3 w-3 rounded-full border-2 border-indigo-400 bg-bg shadow-[0_0_12px_rgba(139,92,246,0.8)]" />
              </div>
            </div>

            <div className="md:w-1/2 md:px-8">
              <div
                className={`group rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md transition-all hover:border-indigo-400/30 hover:bg-white/[0.06] ${
                  index % 2 === 0 ? 'md:text-right' : 'md:text-left'
                }`}
              >
                <div
                  className={`mb-3 flex items-center gap-3 text-xs ${
                    index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'
                  }`}
                >
                  <span className="rounded-full border border-indigo-400/30 bg-indigo-400/10 px-2.5 py-0.5 font-mono text-indigo-300">
                    {item.period}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-white">{item.role}</h3>
                <p className="mb-3 text-sm font-medium text-indigo-300">
                  {item.company}
                </p>
                <p className="mb-4 text-sm leading-relaxed text-zinc-400">
                  {item.description}
                </p>
                <ul
                  className={`space-y-1.5 text-xs text-zinc-500 ${
                    index % 2 === 0 ? 'md:text-right' : 'md:text-left'
                  }`}
                >
                  {item.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 md:gap-1.5">
                      <span
                        className={`mt-1 h-1 w-1 shrink-0 rounded-full bg-indigo-400 ${
                          index % 2 === 0 ? 'md:order-2 md:mt-1.5' : ''
                        }`}
                      />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="hidden md:block md:w-1/2" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
