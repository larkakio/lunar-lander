'use client';

import { useGame } from '@/context/GameContext';

export function HUD() {
  const { gameState } = useGame();

  if (gameState.state === 'menu') {
    return null;
  }

  const lander = gameState.lander;
  const altitude = Math.max(0, Math.floor(lander.y));
  const horizontalSpeed = Math.abs(lander.vx).toFixed(1);
  const verticalSpeed = Math.abs(lander.vy).toFixed(1);
  const fuelPercent = Math.floor((lander.fuel / 1000) * 100);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="absolute top-0 left-0 right-0 p-4 font-mono text-white text-sm pointer-events-none z-10">
      <div className="flex justify-between items-start">
        {/* Left side - Score, Time, Fuel */}
        <div className="space-y-1">
          <div>SCORE {gameState.score.toString().padStart(4, '0')}</div>
          <div>TIME {formatTime(gameState.time)}</div>
          <div className="flex items-center gap-2">
            <span>FUEL {Math.floor(lander.fuel).toString().padStart(4, '0')}</span>
            {lander.fuel < 100 && (
              <span className="text-red-500">LOW ON FUEL</span>
            )}
          </div>
        </div>
        {/* Right side - Altitude, Speeds, Angle */}
        <div className="space-y-1 text-right">
          <div>ALTITUDE {altitude.toString().padStart(4, '0')}</div>
          <div>HORIZONTAL SPEED {horizontalSpeed}</div>
          <div>VERTICAL SPEED {verticalSpeed}</div>
          <div>ROTATION ANGLE {lander.angle.toFixed(1)}°</div>
        </div>
      </div>
    </div>
  );
}
