import { Difficulty } from '@/lib/difficulty';

export function calculateScore(
  fuelRemaining: number,
  landingZoneBonus: number,
  difficulty: Difficulty,
  time: number
): number {
  const baseScore = fuelRemaining * 10;
  const zoneMultiplier = landingZoneBonus; // 1x to 5x based on zone difficulty
  const difficultyMultiplier = {
    [Difficulty.TRAINING]: 1,
    [Difficulty.CADET]: 2,
    [Difficulty.PRIME]: 3,
    [Difficulty.COMMAND]: 5,
  }[difficulty];
  const timeBonus = Math.max(0, 300 - time); // Bonus for fast landing
  return Math.floor(
    (baseScore + timeBonus) * zoneMultiplier * difficultyMultiplier
  );
}
