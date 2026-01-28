import { useState, useCallback, useRef } from 'react';
import { LanderState, PHYSICS, updatePhysics, checkLanding } from '@/lib/physics';
import { TerrainPoint, generateTerrain } from '@/lib/terrain-generator';
import { Difficulty, DIFFICULTY_CONFIGS } from '@/lib/difficulty';
import { checkCollision } from '@/lib/collision';

export type GameState = 'menu' | 'playing' | 'paused' | 'gameover';

export interface GameStateData {
  state: GameState;
  lander: LanderState;
  terrain: TerrainPoint[];
  difficulty: Difficulty;
  score: number;
  time: number;
  landingResult?: 'safe' | 'crash';
  landingZoneMultiplier?: number;
}

export function useGameState() {
  const previousLanderYRef = useRef<number | undefined>(undefined);
  
  const [gameState, setGameState] = useState<GameStateData>({
    state: 'menu',
    lander: {
      x: 0,
      y: PHYSICS.INITIAL_ALTITUDE,
      vx: 0,
      vy: 0,
      angle: 0,
      fuel: PHYSICS.INITIAL_FUEL,
      isThrusting: false,
      rotation: 'none',
    },
    terrain: [],
    difficulty: Difficulty.CADET,
    score: 0,
    time: 0,
  });

  const startGame = useCallback((difficulty: Difficulty) => {
    const config = DIFFICULTY_CONFIGS[difficulty];
    const terrain = generateTerrain(2000, config.terrainComplexity, config.landingZones);
    const startX = terrain[Math.floor(terrain.length / 2)].x;
    
    // Reset previous Y reference
    previousLanderYRef.current = PHYSICS.INITIAL_ALTITUDE;

    setGameState({
      state: 'playing',
      lander: {
        x: startX,
        y: PHYSICS.INITIAL_ALTITUDE, // y=1000 (top)
        vx: Math.random() * 10 - 5, // Random initial horizontal velocity
        vy: 0, // Start with no vertical velocity
        angle: 0, // Upright
        fuel: config.fuel,
        isThrusting: false,
        rotation: 'none',
      },
      terrain,
      difficulty,
      score: 0,
      time: 0,
    });
  }, []);

  const updateGame = useCallback((deltaTime: number) => {
    setGameState((prev) => {
      if (prev.state !== 'playing') return prev;

      const previousY = previousLanderYRef.current;
      const updatedLander = updatePhysics(prev.lander, deltaTime);
      
      // Use continuous collision detection to prevent tunneling
      const collision = checkCollision(updatedLander, prev.terrain, previousY);
      
      if (collision.collided) {
        // CRITICAL: Force lander to stop exactly on terrain BEFORE storing Y
        // Prevent any further movement - lander MUST sit on the line
        const clampedLander = {
          ...updatedLander,
          y: collision.terrainHeight, // Exact terrain height - no going through
          vy: 0, // Stop vertical movement immediately
          vx: 0, // Stop horizontal movement immediately
          isThrusting: false, // Stop thrusting
          rotation: 'none' as const, // Stop rotation
        };
        
        const landingResult = checkLanding(clampedLander, collision.terrainHeight);
        const landingZoneMultiplier = collision.landingZone?.multiplier || 1;

        // Reset previous Y for next game
        previousLanderYRef.current = undefined;

        return {
          ...prev,
          state: 'gameover',
          lander: clampedLander,
          landingResult,
          landingZoneMultiplier,
        };
      }

      // Store current Y for next frame's continuous collision detection
      // ONLY if we didn't collide (otherwise we already reset it above)
      previousLanderYRef.current = updatedLander.y;

      return {
        ...prev,
        lander: updatedLander,
        time: prev.time + deltaTime / 1000,
      };
    });
  }, []);

  const setLanderControls = useCallback((controls: Partial<Pick<LanderState, 'isThrusting' | 'rotation'>>) => {
    setGameState((prev) => {
      const newLander = {
        ...prev.lander,
        ...controls,
      };
      return {
        ...prev,
        lander: newLander,
      };
    });
  }, []);

  const resetGame = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      state: 'menu',
    }));
  }, []);

  return {
    gameState,
    startGame,
    updateGame,
    setLanderControls,
    resetGame,
  };
}
