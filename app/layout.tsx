import './globals.css';
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { business } from '@/lib/data';
import { PublicChrome } from '@/components/public-chrome';
import { ScrollProgress } from '@/components/scroll-progress';
import { CursorGlow } from '@/components/cursor-glow';

const sans = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const display = Playfair_Display({ subsets: ['latin'], variable: '--font-display', display: 'swap' });

export const metadata: Metadata = {
  title: `${business.name} — ${business.tagline}`,
  description: business.description,
  metadataBase: new URL('https://fixpointgarage.com'),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`}>
      <body className="font-sans antialiased">
        <ScrollProgress />
        <CursorGlow />
        <PublicChrome>{children}</PublicChrome>
      </body>
    </html>
  );
}
