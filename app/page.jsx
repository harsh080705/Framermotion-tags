import HeroCanvas from './components/canvas/HeroCanvas';
import HeroOverlay from './components/ui/HeroOverlay';
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

      <ProjectsGrid />

      <SkillsSection />

      <Footer />
    </main>
  );
}
