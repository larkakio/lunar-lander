export const PHYSICS = {
  LUNAR_GRAVITY: 1.62, // m/s² (Moon's gravity)
  EARTH_GRAVITY: 9.81, // m/s² (for reference)
  THRUST_ACCELERATION: 3.24, // 2x lunar gravity
  FUEL_CONSUMPTION_RATE: 0.5, // units per second when thrusting
  SAFE_LANDING_SPEED: 8, // m/s (vertical speed limit) - increased for more forgiving landings
  MAX_HORIZONTAL_SPEED: 10, // m/s (horizontal speed limit)
  MAX_TILT_ANGLE: 15, // degrees for safe landing
  INITIAL_FUEL: 1000, // starting fuel
  INITIAL_ALTITUDE: 1000, // meters (y=1000 = top, y=0 = ground)
  ZOOM_THRESHOLD: 200, // altitude to zoom in
} as const;

export interface LanderState {
  x: number; // horizontal position
  y: number; // altitude
  vx: number; // horizontal velocity
  vy: number; // vertical velocity
  angle: number; // rotation in degrees (0 = upright)
  fuel: number; // remaining fuel
  isThrusting: boolean; // engine on/off
  rotation: 'left' | 'right' | 'none'; // current rotation input
}

export function updatePhysics(
  state: LanderState,
  deltaTime: number
): LanderState {
  const dt = deltaTime / 1000; // Convert to seconds
  const newState = { ...state };
  
  // Apply lunar gravity (gravity pulls down, so positive acceleration)
  let ay = PHYSICS.LUNAR_GRAVITY;
  
  // Apply thrust if active and fuel available
  if (newState.isThrusting && newState.fuel > 0) {
    const angleRad = (newState.angle * Math.PI) / 180;
    // Thrust Y is negative (upward) when angle is 0 (upright)
    const thrustY = -PHYSICS.THRUST_ACCELERATION * Math.cos(angleRad);
    // Thrust X is horizontal component
    const thrustX = PHYSICS.THRUST_ACCELERATION * Math.sin(angleRad);
    ay += thrustY; // Subtract from gravity (thrust opposes gravity)
    newState.vx += thrustX * dt;
    newState.fuel = Math.max(0, newState.fuel - PHYSICS.FUEL_CONSUMPTION_RATE * dt);
  }
  
  // Update velocity (vy increases downward, decreases upward)
  const vyBefore = newState.vy;
  newState.vy += ay * dt;
  
  // Update position
  // y decreases as we descend (y=1000 at top, y=0 at ground)
  const yBefore = newState.y;
  newState.y -= newState.vy * dt;
  
  // CRITICAL: Prevent going below ground level (y=0)
  // Terrain is at y=0 to y=50, so never allow y < 0
  if (newState.y < 0) {
    newState.y = 0;
    newState.vy = 0; // Stop vertical movement
  }
  
  newState.x += newState.vx * dt;
  
  // Wrap around horizontally
  const maxX = 2000; // terrain width
  if (newState.x < 0) newState.x = maxX;
  if (newState.x > maxX) newState.x = 0;
  
  // Apply rotation
  const rotationSpeed = 45; // degrees per second
  if (newState.rotation === 'left') {
    newState.angle -= rotationSpeed * dt;
  } else if (newState.rotation === 'right') {
    newState.angle += rotationSpeed * dt;
  }
  
  // Clamp angle
  newState.angle = Math.max(-90, Math.min(90, newState.angle));
  
  return newState;
}

export function checkLanding(
  lander: LanderState,
  terrainHeight: number
): 'safe' | 'crash' {
  // Check if lander is above terrain (still flying)
  if (lander.y > terrainHeight) {
    return 'crash'; // Not landed yet, but this shouldn't happen in collision check
  }
  
  // Check landing conditions
  const verticalSpeedSafe = Math.abs(lander.vy) <= PHYSICS.SAFE_LANDING_SPEED;
  const horizontalSpeedSafe = Math.abs(lander.vx) <= PHYSICS.MAX_HORIZONTAL_SPEED;
  const angleSafe = Math.abs(lander.angle) <= PHYSICS.MAX_TILT_ANGLE;
  
  return (verticalSpeedSafe && horizontalSpeedSafe && angleSafe) ? 'safe' : 'crash';
}
