import { Inter, Space_Grotesk } from 'next/font/google';
import SmoothScroll from './components/providers/SmoothScroll';
import InteractiveWaveBackground from '../components/canvas/InteractiveWaveBackground';
import CursorTrail from '../components/ui/CursorTrail';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export const metadata = {
  title: 'Portfolio — Interactive Developer',
  description:
    'High-performance portfolio blending elegant interfaces with interactive 3D graphics.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="relative dark bg-bg">
        {/* Interactive WebGL wave mesh with pointer reactivity */}
        <InteractiveWaveBackground className="z-0 pointer-events-none" />

        <div className="relative z-10">
          <CursorTrail />
          <SmoothScroll>{children}</SmoothScroll>
        </div>
      </body>
    </html>
  );
}
