'use client';

import { useEffect, useState } from 'react';
import { GameProvider, useGame } from '@/context/GameContext';
import { useGameLoop } from '@/hooks/useGameLoop';
import { GameCanvas } from '@/components/Game/GameCanvas';
import { HUD } from '@/components/Game/HUD';
import { Controls } from '@/components/Game/Controls';
import { StartScreen } from '@/components/UI/StartScreen';
import { GameOverScreen } from '@/components/UI/GameOverScreen';
import { FarcasterReady } from '@/components/FarcasterReady';

function GameContent() {
  const { gameState, updateGame } = useGame();
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useGameLoop((deltaTime) => {
    if (gameState.state === 'playing') {
      updateGame(deltaTime);
    }
  });

  return (
    <div className="relative w-full h-screen overflow-hidden bg-space">
      <FarcasterReady />
      <GameCanvas width={dimensions.width} height={dimensions.height} />
      <HUD />
      <Controls />
      {gameState.state === 'menu' && <StartScreen />}
      {gameState.state === 'gameover' && <GameOverScreen />}
    </div>
  );
}

export default function Home() {
  return (
    <GameProvider>
      <GameContent />
    </GameProvider>
  );
}
