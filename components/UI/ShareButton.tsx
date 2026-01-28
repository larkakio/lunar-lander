'use client';

import { useFarcasterSDK } from '@/hooks/useFarcasterSDK';

interface ShareButtonProps {
  score: number;
  difficulty: string;
}

export function ShareButton({ score, difficulty }: ShareButtonProps) {
  const { openUrl } = useFarcasterSDK();

  const handleShare = () => {
    const text = `Just scored ${score.toLocaleString()} points on ${difficulty} difficulty in Lunar Lander!\n\n`;
    const url = typeof window !== 'undefined' ? window.location.origin : '';
    const castUrl = `https://warpcast.com/~/compose?text=${encodeURIComponent(text)}&embeds[]=${encodeURIComponent(url)}`;
    openUrl(castUrl);
  };

  return (
    <button
      onClick={handleShare}
      className="bg-black border-2 border-vector-green hover:bg-vector-green/10 text-vector-green font-orbitron font-bold py-4 px-8 rounded transition-all touch-manipulation min-h-[60px]"
    >
      Share on Farcaster
    </button>
  );
}
