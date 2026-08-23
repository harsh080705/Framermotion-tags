import { Inter, Space_Grotesk } from 'next/font/google';
import SmoothScroll from './components/providers/SmoothScroll';
import SmokeBackgroundCanvas from '../components/canvas/SmokeBackgroundCanvas';
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
    <html lang="en" className={`dark ${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="relative min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-indigo-500 selection:text-white">
        {/* Persistent background canvas wrapper */}
        <div className="pointer-events-none fixed inset-0 z-0 h-screen w-screen overflow-hidden opacity-75">
          <SmokeBackgroundCanvas />
        </div>

        <CursorTrail />
        <div className="relative z-10 bg-transparent">
          <SmoothScroll>{children}</SmoothScroll>
        </div>
      </body>
    </html>
  );
}
