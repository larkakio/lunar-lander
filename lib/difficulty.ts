export enum Difficulty {
  TRAINING = 'training',
  CADET = 'cadet',
  PRIME = 'prime',
  COMMAND = 'command',
}

export const DIFFICULTY_CONFIGS = {
  [Difficulty.TRAINING]: {
    fuel: 150,
    gravity: 1.3,
    terrainComplexity: 0.3,
    landingZones: 5,
  },
  [Difficulty.CADET]: {
    fuel: 100,
    gravity: 1.62,
    terrainComplexity: 0.5,
    landingZones: 3,
  },
  [Difficulty.PRIME]: {
    fuel: 75,
    gravity: 1.62,
    terrainComplexity: 0.7,
    landingZones: 2,
  },
  [Difficulty.COMMAND]: {
    fuel: 50,
    gravity: 1.62,
    terrainComplexity: 0.9,
    landingZones: 1,
  },
};
