'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useGameState, GameStateData } from '@/hooks/useGameState';
import { Difficulty } from '@/lib/difficulty';
import { LanderState } from '@/lib/physics';

interface GameContextType {
  gameState: GameStateData;
  startGame: (difficulty: Difficulty) => void;
  updateGame: (deltaTime: number) => void;
  setLanderControls: (controls: Partial<Pick<LanderState, 'isThrusting' | 'rotation'>>) => void;
  resetGame: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const gameState = useGameState();

  return (
    <GameContext.Provider value={gameState}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
