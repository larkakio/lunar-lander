'use client';

import { motion } from 'framer-motion';
import { useGame } from '@/context/GameContext';
import { calculateScore } from '@/lib/scoring';
import { ShareButton } from './ShareButton';

export function GameOverScreen() {
  const { gameState, resetGame } = useGame();

  if (gameState.state !== 'gameover' || !gameState.landingResult) {
    return null;
  }

  const score = calculateScore(
    gameState.lander.fuel,
    gameState.landingZoneMultiplier || 1,
    gameState.difficulty,
    gameState.time
  );

  const isSafe = gameState.landingResult === 'safe';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 flex flex-col items-center justify-center bg-space/95 z-30"
    >
      <motion.h2
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="font-mono text-5xl md:text-7xl font-black mb-4 text-white"
      >
        {isSafe ? 'SUCCESSFULLY LANDED' : 'LANDER DESTROYED'}
      </motion.h2>
      
      {!isSafe && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="font-mono text-2xl text-white mb-2"
        >
          LANDING VELOCITY WAS TOO HIGH
        </motion.p>
      )}

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-black/80 border-2 border-vector-green rounded-lg p-6 max-w-md w-full mx-4"
      >
        <div className="space-y-3 font-mono text-white text-center">
          {isSafe ? (
            <>
              <div className="text-2xl mb-2">{score} POINTS GAINED</div>
              <div className="text-xl">{Math.floor(gameState.lander.fuel)} FUEL UNITS REMAINING</div>
              {gameState.landingZoneMultiplier && gameState.landingZoneMultiplier > 1 && (
                <div className="text-xl text-yellow-400 mt-2">
                  Landing Zone Multiplier: X{gameState.landingZoneMultiplier}
                </div>
              )}
            </>
          ) : (
            <>
              <div className="text-xl">{Math.floor(gameState.lander.fuel)} FUEL UNITS LOST</div>
            </>
          )}
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex flex-col gap-4 mt-6 w-full max-w-md px-4"
      >
        <div className="font-mono text-white text-center space-y-2">
          <div className="text-lg">PRESS ANY KEY TO PLAY</div>
          <div className="text-sm">ARROW KEYS TO MOVE</div>
        </div>
        <button
          onClick={resetGame}
          className="bg-white hover:bg-gray-200 text-black font-mono font-bold py-4 px-8 rounded transition-all touch-manipulation min-h-[60px]"
        >
          Play Again
        </button>
        <ShareButton score={score} difficulty={gameState.difficulty} />
      </motion.div>
    </motion.div>
  );
}
