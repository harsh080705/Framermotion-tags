import { Inter, Space_Grotesk } from 'next/font/google';
import SmoothScroll from './components/providers/SmoothScroll';
import CursorTrail from '../components/ui/CursorTrail';
import GlobalBackgroundCanvas from '../components/canvas/GlobalBackgroundCanvas';
import SmokeBackgroundCanvas from '../components/canvas/SmokeBackgroundCanvas';
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
        <SmokeBackgroundCanvas className="z-0" />

        <div className="relative z-10">
          <GlobalBackgroundCanvas variant="orbs" />
          <CursorTrail />
          <SmoothScroll>{children}</SmoothScroll>
        </div>
      </body>
    </html>
  );
}
