import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';

const ROOT_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://lunar-lander.vercel.app';

export const metadata: Metadata = {
  title: 'Lunar Lander - Retro Space Game',
  description: 'Land your spacecraft on the moon in this classic physics-based game',
  openGraph: {
    title: 'Lunar Lander',
    description: 'Master gravity and fuel to safely land on the moon',
    images: [`${ROOT_URL}/hero-image.png`],
  },
  other: {
    viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover',
    'theme-color': '#0a0a0a',
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-space text-white antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
