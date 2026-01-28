import type { Metadata } from 'next';
import './globals.css';

const ROOT_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://lunar-lander.vercel.app';

const FC_EMBED = {
  version: '1',
  imageUrl: `${ROOT_URL}/hero-image.png`,
  button: {
    title: 'Play Now',
    action: {
      type: 'launch_frame',
      name: 'Lunar Lander',
      url: ROOT_URL,
      splashImageUrl: `${ROOT_URL}/hero-image.png`,
      splashBackgroundColor: '#0a0a0a',
    },
  },
};

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
    'fc:miniapp': JSON.stringify(FC_EMBED),
    'fc:frame': JSON.stringify(FC_EMBED),
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
        {children}
      </body>
    </html>
  );
}
