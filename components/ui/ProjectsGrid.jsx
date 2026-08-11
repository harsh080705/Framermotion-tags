'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';

const categories = ['All', 'Full-Stack', 'WebGL'];

const projects = [
  {
    id: 1,
    title: 'WebGL Particle Universe',
    category: 'WebGL',
    description:
      'An interactive starfield simulation rendered in real-time with GPU-accelerated shaders, supporting millions of particles at 60fps.',
    features: [
      'Custom GLSL fragment & vertex shaders',
      'Instanced rendering with 1M+ particles',
      'Pointer-based gravitational warping',
      'Bloom post-processing pipeline',
      'Frustum culling & dynamic LOD',
    ],
    tech: ['Three.js', 'GLSL', 'WebGPU', 'React', 'Vite'],
    gradient: 'from-indigo-500/20 via-purple-500/20 to-pink-500/20',
    accent: 'text-indigo-300',
    icon: '🌌',
    year: '2024',
    liveUrl: '#',
    codeUrl: '#',
  },
  {
    id: 2,
    title: 'Blockchain Explorer',
    category: 'Full-Stack',
    description:
      'A real-time block explorer with transaction graphs, address analytics, and a searchable ledger spanning over 10M blocks.',
    features: [
      'Streaming WebSocket block updates',
      'Address heatmaps & token flow charts',
      'Full-text transaction search',
      'REST + GraphQL unified API',
      'Sub-second query via Redis caching',
    ],
    tech: ['Next.js', 'Node.js', 'GraphQL', 'Redis', 'PostgreSQL'],
    gradient: 'from-emerald-500/20 via-teal-500/20 to-cyan-500/20',
    accent: 'text-emerald-300',
    icon: '⛓️',
    year: '2024',
    liveUrl: '#',
    codeUrl: '#',
  },
  {
    id: 3,
    title: '3D Product Configurator',
    category: 'WebGL',
    description:
      'An immersive product customization experience with real-time material switching, dynamic lighting, and AR preview export.',
    features: [
      'Physically-based rendering (PBR) materials',
      'Real-time environment map lighting',
      'Drag-to-orbit & zoom camera control',
      'Texture & color live preview',
      'One-click GLB export for AR viewing',
    ],
    tech: ['Three.js', 'React Three Fiber', 'Blender', 'Zustand', 'Tailwind'],
    gradient: 'from-cyan-500/20 via-blue-500/20 to-indigo-500/20',
    accent: 'text-cyan-300',
    icon: '🎨',
    year: '2023',
    liveUrl: '#',
    codeUrl: '#',
  },
  {
    id: 4,
    title: 'Analytics Dashboard',
    category: 'Full-Stack',
    description:
      'A high-throughput analytics platform ingesting 50k events/sec with live dashboards, anomaly alerts, and cohort analysis.',
    features: [
      'Kafka streaming ingestion pipeline',
      'Real-time cohort & funnel analysis',
      'Automated anomaly detection',
      'Custom report builder with export',
      'Role-based access control (RBAC)',
    ],
    tech: ['Python', 'FastAPI', 'React', 'ClickHouse', 'Kafka'],
    gradient: 'from-rose-500/20 via-pink-500/20 to-fuchsia-500/20',
    accent: 'text-rose-300',
    icon: '📈',
    year: '2023',
    liveUrl: '#',
    codeUrl: '#',
  },
  {
    id: 5,
    title: 'Volumetric Data Viewer',
    category: 'WebGL',
    description:
      'A browser-based viewer for medical and scientific volumetric datasets, enabling slice navigation and isosurface extraction.',
    features: [
      'GPU raymarching volume rendering',
      'Interactive orthogonal slicing',
      'Marching-cubes isosurface extraction',
      'Transfer function color mapping',
      'DICOM & NIfTI file support',
    ],
    tech: ['WebGL', 'Three.js', 'TypeScript', 'DICOM', 'WASM'],
    gradient: 'from-amber-500/20 via-orange-500/20 to-red-500/20',
    accent: 'text-amber-300',
    icon: '🧬',
    year: '2023',
    liveUrl: '#',
    codeUrl: '#',
  },
  {
    id: 6,
    title: 'Auth Microservice',
    category: 'Full-Stack',
    description:
      'A scalable authentication service with OAuth2/OIDC flows, multi-tenancy, and ephemeral JWT token rotation.',
    features: [
      'OAuth2 & OpenID Connect support',
      'Multi-tenant isolation & scoping',
      'JWT rotation & refresh token vault',
      'Passwordless & MFA verification',
      'Audit logging with retention policies',
    ],
    tech: ['Node.js', 'TypeScript', 'PostgreSQL', 'Docker', 'Nginx'],
    gradient: 'from-purple-500/20 via-pink-500/20 to-rose-500/20',
    accent: 'text-purple-300',
    icon: '🔐',
    year: '2024',
    liveUrl: '#',
    codeUrl: '#',
  },
];

export default function ProjectsGrid() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  return (
    <section id="projects" className="relative mx-auto max-w-7xl px-6 py-24 md:px-12">
      {/* Section header */}
      <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-3 inline-block text-sm font-medium tracking-widest text-indigo-400 uppercase"
          >
            Selected Work
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl font-bold tracking-tight text-white sm:text-5xl"
          >
            Featured{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Projects
            </span>
          </motion.h2>
        </div>

        {/* Animated filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-2 rounded-full border border-white/10 bg-white/5 p-1.5 backdrop-blur-md"
        >
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`relative rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                activeCategory === category
                  ? 'text-white'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {activeCategory === category && (
                <motion.span
                  layoutId="project-category-pill"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg shadow-indigo-500/30"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{category}</span>
            </button>
          ))}
        </motion.div>
      </div>

      {/* Responsive animated grid */}
      <motion.div
        layout
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.2 } }}
              transition={{ layout: { type: 'spring', stiffness: 350, damping: 30 } }}
              className="h-full"
            >
              <ProjectCard project={project} onSelect={setSelectedProject} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Expand-on-click detail modal */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
}