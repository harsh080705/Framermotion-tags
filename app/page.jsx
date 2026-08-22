import HeroCanvas from './components/canvas/HeroCanvas';
import HeroOverlay from './components/ui/HeroOverlay';
import ProjectsGrid from './components/ui/ProjectsGrid';
import SkillsSection from './components/ui/SkillsSection';
import Footer from '../components/ui/Footer';

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-bg text-white">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.15),transparent_60%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom_right,rgba(236,72,153,0.08),transparent_60%)]"
      />

      <section id="hero" className="relative mx-auto grid min-h-screen max-w-7xl grid-cols-1 md:grid-cols-2">
        <div className="order-2 md:order-1">
          <HeroOverlay />
        </div>
        <div className="order-1 md:order-2">
          <HeroCanvas />
        </div>
      </section>

      <ProjectsGrid />

      <SkillsSection />

      <Footer />
    </main>
  );
}
