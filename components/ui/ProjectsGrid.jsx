'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import CharacterReveal from './CharacterReveal';
import ClipPathTextReveal from './ClipPathTextReveal';
import StaggerButton from './StaggerButton';

const CATEGORIES = ['All', 'Full-Stack', 'WebGL'];

const PROJECTS = [
  {
    id: 1,
    title: 'Nebula Analytics',
    category: 'Full-Stack',
    summary: 'Real-time data visualization dashboard with streaming WebSocket feeds.',
    description:
      'A full-stack analytics platform processing 50k events/sec with custom WebGL scatter plots, role-based auth, and PostgreSQL row-level security.',
    features: [
      'Real-time WebSocket data streaming',
      'Custom WebGL scatter plots handling 100k+ points',
      'Role-based access control with audit logging',
      'Automated report scheduling and email delivery',
    ],
    stack: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'WebGL', 'Redis'],
    from: '#6366f1',
    to: '#8b5cf6',
    demo: '#',
    github: '#',
  },
  {
    id: 2,
    title: 'Aurora Engine',
    category: 'WebGL',
    summary: 'GPU-accelerated particle simulation rendered with custom GLSL shaders.',
    description:
      'A creative-coding playground exploring real-time fluid simulation and volumetric lighting through custom GLSL shaders and compute-style fragment math.',
    features: [
      'Custom GLSL shaders for fluid dynamics',
      'Volumetric ray-marched lighting',
      'Exportable preset system',
      'Real-time parameter tweaking with Tweakpane',
    ],
    stack: ['Three.js', 'GLSL', 'WebGL', 'TypeScript'],
    from: '#ec4899',
    to: '#f43f5e',
    demo: '#',
    github: '#',
  },
  {
    id: 3,
    title: 'Synthwave Commerce',
    category: 'Full-Stack',
    summary: 'Headless commerce storefront with Stripe and Algolia integration.',
    description:
      'A blazing-fast storefront built on Next.js with edge-cached product pages, Algolia search, and a Stripe-powered checkout flow.',
    features: [
      'Edge-cached product pages (sub-50ms TTFB)',
      'Algolia-powered instant search',
      'Stripe checkout with webhooks',
      'Admin dashboard with inventory management',
    ],
    stack: ['Next.js', 'Stripe', 'Algolia', 'Sanity CMS', 'Tailwind'],
    from: '#06b6d4',
    to: '#3b82f6',
    demo: '#',
    github: '#',
  },
  {
    id: 4,
    title: 'Lattice Studio',
    category: 'WebGL',
    summary: 'Browser-based 3D modeling tool with procedural geometry generation.',
    description:
      'A Figma-style 3D editor enabling designers to compose procedural geometry through a node-based visual interface.',
    features: [
      'Node-based procedural geometry graph',
      'Real-time CSG operations',
      'Collaborative editing via CRDTs',
      'Export to glTF, OBJ, and STL',
    ],
    stack: ['React', 'Three.js', 'WebGL', 'Yjs', 'WebWorkers'],
    from: '#8b5cf6',
    to: '#ec4899',
    demo: '#',
    github: '#',
  },
  {
    id: 5,
    title: 'Pulse API Gateway',
    category: 'Full-Stack',
    summary: 'High-throughput API gateway with rate limiting and analytics.',
    description:
      'A distributed API gateway handling 10M+ requests/day with adaptive rate limiting, JWT auth, and real-time analytics.',
    features: [
      'Token-bucket rate limiting per client tier',
      'JWT validation with key rotation',
      'Real-time analytics dashboard',
      'Hot-reloadable routing rules',
    ],
    stack: ['Node.js', 'Redis', 'ClickHouse', 'Docker', 'Kubernetes'],
    from: '#10b981',
    to: '#06b6d4',
    demo: '#',
    github: '#',
  },
  {
    id: 6,
    title: 'Prism Renderer',
    category: 'WebGL',
    summary: 'Real-time physically-based ray tracer running entirely in the browser.',
    description:
      'A WebGL2 path tracer with progressive accumulation, supporting metallic and dielectric materials, area lights, and HDRI environments.',
    features: [
      'Progressive path-traced accumulation',
      'PBR material support (metallic/roughness)',
      'HDRI environment lighting',
      'Real-time denoising filter',
    ],
    stack: ['WebGL2', 'GLSL', 'TypeScript', 'WebWorkers'],
    from: '#f59e0b',
    to: '#ec4899',
    demo: '#',
    github: '#',
  },
];

export default function ProjectsGrid() {
  const [active, setActive] = useState('All');
  const [selected, setSelected] = useState(null);

  const filtered =
    active === 'All' ? PROJECTS : PROJECTS.filter((p) => p.category === active);

  return (
    <section id="projects" className="relative mx-auto max-w-7xl px-6 py-20 md:px-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end"
      >
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-indigo-400">
            Selected Work
          </p>
          <ClipPathTextReveal
            as="h2"
            direction="bottom-to-top"
            mode="view"
            delay={0.1}
            className="text-3xl font-bold tracking-tight text-white md:text-5xl"
          >
            Recent <span className="gradient-text">projects</span>
          </ClipPathTextReveal>
        </div>

        <div className="flex flex-wrap gap-2 rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur-md">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                active === cat ? 'text-white' : 'text-zinc-400 hover:text-white'
              }`}
            >
              {active === cat && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg shadow-indigo-500/30"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          ))}
        </div>
      </motion.div>

      <motion.div
        layout
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProjectCard project={project} onOpen={setSelected} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Expand-on-click detail modal */}
      <ProjectModal project={selected} onClose={() => setSelected(null)} />

      {/* Section CTA */}
      <div className="mt-12 flex justify-center">
        <StaggerButton
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
          text="View More Repositories"
          variant="outline"
        />
      </div>
    </section>
  );
}
