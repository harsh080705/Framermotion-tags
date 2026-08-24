import HeroCanvas from './components/canvas/HeroCanvas';
import HeroOverlay from './components/ui/HeroOverlay';
import AnimatedTextReveal from './components/ui/AnimatedTextReveal';
import ProjectsGrid from './components/ui/ProjectsGrid';
import SkillsSection from './components/ui/SkillsSection';
import Footer from '../components/ui/Footer';

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-transparent text-white">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.15),transparent_60%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom_right,rgba(236,72,153,0.08),transparent_60%)]"
      />

      <section id="hero" className="relative z-10 mx-auto grid min-h-[90vh] max-w-7xl grid-cols-1 items-center px-6 lg:grid-cols-2 lg:px-8">
        <div className="z-20">
          <HeroOverlay />
        </div>
        <div className="relative h-[450px] w-full lg:h-[550px]">
          <HeroCanvas />
        </div>
      </section>

      {/* Interactive Scroll Reveal Statement Banner */}
      <section className="relative mx-auto max-w-5xl px-6 py-20 md:px-12 md:py-28">
        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-indigo-400">
          Design & Performance Philosophy
        </p>
        <AnimatedTextReveal
          text="Crafting high-performance web applications that blend buttery smooth interface animations with interactive 3D WebGL graphics. Every scroll tells a part of the story."
          splitMode="word"
          animationMode="color-shift"
          dimOpacity={0.25}
          baseColor="rgba(255, 255, 255, 0.25)"
          highlightColor="#818cf8"
          scrollStart={0.95}
          scrollEnd={0.6}
          smoothing={0.1}
          overlap={1.2}
          className="text-2xl font-bold leading-relaxed tracking-tight sm:text-3xl md:text-4xl lg:text-5xl"
        />
      </section>

      <ProjectsGrid />

      <SkillsSection />

      <Footer />
    </main>
  );
}
