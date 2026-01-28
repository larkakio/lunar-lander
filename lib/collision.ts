import { LanderState } from './physics';
import { TerrainPoint, getTerrainHeightAt } from './terrain-generator';

export function checkCollision(
  lander: LanderState,
  terrain: TerrainPoint[],
  previousY?: number
): { collided: boolean; terrainHeight: number; landingZone?: TerrainPoint } {
  const terrainHeight = getTerrainHeightAt(terrain, lander.x);
  
  // In our coordinate system: y=1000 is top, y=0 is ground
  // Terrain is at y=0 to y=50 (peaks)
  // Collision happens when lander.y <= terrainHeight
  
  // CRITICAL: Check if we're at or below terrain
  // y decreases as we descend (y=1000 top, y=0 ground)
  // terrainHeight is in same coordinate system (0-50)
  // So when lander.y (descending from 1000) reaches terrainHeight (0-50), we collide
  const hasCollided = lander.y <= terrainHeight;
  
  // Continuous collision detection: check if we passed through terrain
  // This prevents tunneling at high speeds
  // Check if we were above terrain last frame and are now at or below
  const passedThrough = previousY !== undefined && previousY > terrainHeight && lander.y <= terrainHeight;
  
  if (hasCollided || passedThrough) {
    // CRITICAL: Always clamp to terrain height - lander MUST stop exactly on terrain
    // Never allow lander to go below terrain
    const collisionY = terrainHeight; // Always use exact terrain height
    
    // Find the landing zone if we're on one (within 30 units horizontally for better detection)
    const landingZone = terrain.find(
      (point) => point.isLandingZone && Math.abs(point.x - lander.x) < 30
    );
    
    return {
      collided: true,
      terrainHeight: collisionY, // Always return exact terrain height
      landingZone,
    };
  }
  
  return {
    collided: false,
    terrainHeight,
  };
}
