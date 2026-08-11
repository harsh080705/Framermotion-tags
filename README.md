# 🌌 3D Interactive Developer Portfolio

A high-performance, modern developer portfolio built with **Next.js (App Router)**, **React Three Fiber (Three.js)**, **Framer Motion**, and **Tailwind CSS**. Features interactive 3D WebGL scenes, a dynamic GLSL smoke shader background, responsive 3D tilt cards, and a custom trailing cursor.

---

## ✨ Key Features

- 🌀 **Interactive 3D Hero Mesh**: Real-time distorted wireframe sphere powered by `@react-three/fiber` and `@react-three/drei` with mouse-tracking rotation.
- 🌫️ **Fluid GLSL Smoke Background**: Lightweight 2D simplex noise fragment shader rendering ambient, continuous fluid motion directly on the GPU.
- 🪐 **3D Skills Universe**: Dynamic orbiting skill nodes surrounding a wireframe core with hybrid HTML overlays.
- 🃏 **3D Depth Project Cards**: Perspective tilt cards with dynamic tech tags, category filtering, and animated expand-on-click modals via Framer Motion.
- 🎯 **Custom Trailing Cursor**: Responsive spring-physics trailing dot cursor layered over UI elements.
- ⚡ **GPU & Mobile Optimized**: Adaptive DPR scaling, dynamic geometry segment degradation, and hardware-accelerated transforms.
- 📬 **Interactive Contact Form**: Floating label inputs with animated feedback states (idle, sending, success).

---

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **3D & Graphics**: [Three.js](https://threejs.org/), [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber), [@react-three/drei](https://github.com/pmndrs/drei)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/), [React Icons](https://react-icons.github.io/react-icons/)

---

## 📁 Project Architecture

```text
portfolio/
├── app/
│   ├── layout.jsx              # Root layout with persistent 3D background & custom cursor
│   ├── page.jsx                # Main single-page portfolio integration
│   └── globals.css             # Tailwind base styles and custom glow utilities
│
├── components/
│   ├── canvas/                 # WebGL, Three.js scenes, and GLSL shaders
│   │   ├── HeroCanvas.jsx
│   │   ├── MorphingMesh.jsx
│   │   ├── SkillOrbiters.jsx
│   │   ├── OrbitCanvas.jsx
│   │   └── SmokeBackgroundCanvas.jsx
│   │
│   └── ui/                     # Framer Motion components & DOM layouts
│       ├── HeroOverlay.jsx
│       ├── ProjectCard.jsx
│       ├── ProjectModal.jsx
│       ├── ProjectsGrid.jsx
│       ├── Timeline.jsx
│       ├── SkillsSection.jsx
│       ├── ContactForm.jsx
│       ├── Footer.jsx
│       └── CursorTrail.jsx
