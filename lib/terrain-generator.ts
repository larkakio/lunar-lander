export interface TerrainPoint {
  x: number;
  y: number;
  isLandingZone: boolean;
  multiplier: number; // Score multiplier (harder zones = higher)
}

// Simple noise function for terrain generation
function noise(x: number): number {
  return Math.sin(x * 0.1) * Math.cos(x * 0.07) * 0.5 + Math.sin(x * 0.03) * 0.3;
}

function simplexNoise(x: number, complexity: number): number {
  return noise(x * complexity);
}

function distributeZones(segments: number, count: number): number[] {
  const zones: number[] = [];
  const step = Math.floor(segments / (count + 1));
  for (let i = 1; i <= count; i++) {
    zones.push(Math.floor(step * i));
  }
  return zones;
}

function flattenArea(points: TerrainPoint[], centerIdx: number, width: number): void {
  const centerY = points[centerIdx].y;
  const halfWidth = Math.floor(width / 2);
  const start = Math.max(0, centerIdx - halfWidth);
  const end = Math.min(points.length - 1, centerIdx + halfWidth);
  
  for (let i = start; i <= end; i++) {
    const distance = Math.abs(i - centerIdx);
    const factor = 1 - (distance / halfWidth);
    points[i].y = centerY * factor + points[i].y * (1 - factor);
  }
}

export function generateTerrain(
  width: number,
  complexity: number,
  landingZones: number
): TerrainPoint[] {
  const points: TerrainPoint[] = [];
  const segments = 50;
  const baseHeight = 0; // Base terrain height (y=0 is ground level in game coordinates)
  
  // Generate base terrain with noise
  for (let i = 0; i <= segments; i++) {
    const x = (i / segments) * width;
    // Use sin/cos for terrain variation (small variations around ground level)
    const noise = Math.sin(i * 0.3) * 20 + Math.cos(i * 0.15) * 15;
    const y = baseHeight + noise;
    points.push({ 
      x, 
      y: Math.max(0, Math.min(50, y)), // y between 0 (ground) and 50 (peaks)
      isLandingZone: false, 
      multiplier: 1 
    });
  }
  
  // Place landing zones (flat areas) - 2-4 zones based on difficulty
  const numZones = landingZones;
  const zoneIndices = distributeZones(segments, numZones);
  
  zoneIndices.forEach((idx, i) => {
    const zoneWidth = 8; // 8 segments = flat landing zone
    const height = points[idx].y;
    
    // Flatten the area around the landing zone
    for (let j = idx - zoneWidth / 2; j <= idx + zoneWidth / 2; j++) {
      if (j >= 0 && j < points.length) {
        points[j].y = height;
        points[j].isLandingZone = true;
        points[j].multiplier = numZones - i; // X4, X3, X2 (higher multiplier = easier)
      }
    }
  });
  
  return points;
}

export function getTerrainHeightAt(terrain: TerrainPoint[], x: number): number {
  // Find the two points that bracket x
  for (let i = 0; i < terrain.length - 1; i++) {
    if (x >= terrain[i].x && x <= terrain[i + 1].x) {
      // Linear interpolation
      const t = (x - terrain[i].x) / (terrain[i + 1].x - terrain[i].x);
      return terrain[i].y + t * (terrain[i + 1].y - terrain[i].y);
    }
  }
  // Fallback to first or last point
  return terrain[0].y;
}
