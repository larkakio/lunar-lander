'use client';

import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useGame } from '@/context/GameContext';
import { Difficulty } from '@/lib/difficulty';

export function StartScreen() {
  const { startGame } = useGame();

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Start with default difficulty (CADET) on any key press
      startGame(Difficulty.CADET);
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [startGame]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 flex flex-col items-center justify-center bg-space z-30"
    >
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="font-mono text-6xl md:text-8xl font-black text-white mb-4 tracking-wider"
      >
        LUNAR LANDER
      </motion.h1>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex flex-col gap-4 w-full max-w-md px-4"
      >
        <DifficultyButton
          difficulty={Difficulty.TRAINING}
          label="Training"
          description="High fuel, forgiving physics"
          onClick={() => startGame(Difficulty.TRAINING)}
        />
        <DifficultyButton
          difficulty={Difficulty.CADET}
          label="Cadet"
          description="Normal difficulty"
          onClick={() => startGame(Difficulty.CADET)}
        />
        <DifficultyButton
          difficulty={Difficulty.PRIME}
          label="Prime"
          description="Challenging terrain"
          onClick={() => startGame(Difficulty.PRIME)}
        />
        <DifficultyButton
          difficulty={Difficulty.COMMAND}
          label="Command"
          description="Expert mode"
          onClick={() => startGame(Difficulty.COMMAND)}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-8 font-mono text-white text-lg text-center px-4"
      >
        <p className="mb-2">PRESS ANY KEY TO PLAY</p>
        <p>ARROW KEYS TO MOVE</p>
      </motion.div>
    </motion.div>
  );
}

function DifficultyButton({
  difficulty,
  label,
  description,
  onClick,
}: {
  difficulty: Difficulty;
  label: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="bg-black/80 border-2 border-white hover:bg-white/10 active:bg-white/20 px-6 py-4 rounded transition-all touch-manipulation min-h-[60px]"
      aria-label={`Start ${label} difficulty`}
    >
      <div className="font-mono text-white text-xl font-bold">{label}</div>
      <div className="font-mono text-white/70 text-sm mt-1">{description}</div>
    </button>
  );
}
