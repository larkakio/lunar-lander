'use client';

import { useEffect, useRef, useState } from 'react';
import { useGame } from '@/context/GameContext';
import { TerrainPoint } from '@/lib/terrain-generator';
import { LanderState, PHYSICS } from '@/lib/physics';

interface GameCanvasProps {
  width: number;
  height: number;
}

export function GameCanvas({ width, height }: GameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { gameState } = useGame();
  const [starOffset, setStarOffset] = useState(0);
  const animationFrameRef = useRef<number>();

  // Animate stars continuously using requestAnimationFrame
  useEffect(() => {
    if (gameState.state !== 'playing' || gameState.terrain.length === 0) {
      setStarOffset(0);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      return;
    }

    const animate = () => {
      // Update star offset for smooth movement (slow downward drift)
      // Stars move slowly downward to create sense of movement
      const starSpeed = 0.3; // pixels per frame - slow and smooth
      const maxOffset = height * 0.75;
      setStarOffset(prev => {
        const newOffset = prev + starSpeed;
        return newOffset >= maxOffset ? 0 : newOffset; // Wrap around
      });
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [gameState.state, gameState.terrain.length, height]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = width;
    canvas.height = height;

    // Clear canvas with black background
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, width, height);

    if (gameState.state === 'menu' || gameState.terrain.length === 0) {
      return;
    }

    const lander = gameState.lander;

    // Coordinate system conversion: 
    // Game: y=1000 (top), y=0 (ground)
    // Canvas: y=0 (top), y=height (bottom)
    const canvasY = (gameY: number) => {
      const margin = 50;
      // y=1000 → canvasY=margin, y=0 → canvasY=height-margin
      return margin + (1000 - gameY) * (height - 2 * margin) / 1000;
    };

    // Calculate camera position (follow lander)
    const zoom = lander.y < PHYSICS.ZOOM_THRESHOLD ? 2 : 1;
    const cameraX = lander.x - width / 2 / zoom;
    const cameraY = canvasY(lander.y) - height / 2 / zoom;

    // Draw stars FIRST in screen coordinates (before any transformations)
    // This ensures they're always visible
    // Pass star offset for animation
    drawStars(ctx, width, height, starOffset);

    ctx.save();
    ctx.translate(-cameraX * zoom, -cameraY * zoom);
    ctx.scale(zoom, zoom);

    // Draw terrain with coordinate conversion
    drawTerrain(ctx, gameState.terrain, canvasY, width * 2);

    // Draw lander with coordinate conversion
    const landerCanvasY = canvasY(lander.y);
    drawLander(ctx, lander.x, landerCanvasY, lander.angle, lander.isThrusting);

    ctx.restore();
  }, [gameState, width, height, starOffset]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0"
      style={{ imageRendering: 'pixelated' }}
    />
  );
}

// Static stars array - generated once per canvas size in SCREEN coordinates
const starsCache = new Map<string, Array<{x: number, y: number, size: number}>>();

function generateStars(width: number, height: number): Array<{x: number, y: number, size: number}> {
  const key = `${width}x${height}`;
  if (starsCache.has(key)) return starsCache.get(key)!;
  
  const stars: Array<{x: number, y: number, size: number}> = [];
  // More stars, larger sizes for mobile visibility
  // Stars are in SCREEN coordinates (0 to width, 0 to height)
  for (let i = 0; i < 250; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height * 0.75, // Upper 75% of screen (not in terrain area)
      size: Math.random() < 0.6 ? 3 : (Math.random() < 0.85 ? 4 : (Math.random() < 0.95 ? 5 : 6)) // 3-6px for better visibility
    });
  }
  starsCache.set(key, stars);
  return stars;
}

function drawStars(ctx: CanvasRenderingContext2D, width: number, height: number, offset: number = 0) {
  ctx.fillStyle = '#FFFFFF';
  const stars = generateStars(width, height);
  const maxY = height * 0.75;
  
  // Draw stars in SCREEN coordinates (before any transformations)
  // Apply offset for movement animation
  stars.forEach((star) => {
    // Calculate animated position with wrapping
    let animatedY = star.y + offset;
    
    // Wrap stars that go off screen - create continuous loop
    if (animatedY > maxY) {
      animatedY = animatedY - maxY;
    }
    
    // Only draw if star is visible on screen
    if (animatedY >= 0 && animatedY <= maxY) {
      const size = star.size;
      // Use filled circles for better visibility on mobile
      ctx.beginPath();
      ctx.arc(star.x, animatedY, size / 2, 0, Math.PI * 2);
      ctx.fill();
      // Add a small glow effect for larger stars
      if (size >= 5) {
        ctx.globalAlpha = 0.3;
        ctx.beginPath();
        ctx.arc(star.x, animatedY, size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0;
      }
    }
  });
}

function drawTerrain(
  ctx: CanvasRenderingContext2D,
  terrain: TerrainPoint[],
  canvasY: (y: number) => number,
  width: number
) {
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 2;
  ctx.beginPath();

  terrain.forEach((point, i) => {
    const y = canvasY(point.y);
    if (i === 0) {
      ctx.moveTo(point.x, y);
    } else {
      ctx.lineTo(point.x, y);
    }
  });

  ctx.stroke();

  // Draw landing zones with markers
  terrain.forEach((point) => {
    if (point.isLandingZone) {
      const y = canvasY(point.y);
      // Draw multiplier text
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '20px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(`X${point.multiplier}`, point.x, y - 20);
      
      // Draw landing zone markers (vertical lines)
      ctx.strokeStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.moveTo(point.x - 5, y);
      ctx.lineTo(point.x - 5, y - 10);
      ctx.moveTo(point.x + 5, y);
      ctx.lineTo(point.x + 5, y - 10);
      ctx.stroke();
    }
  });
}

function drawLander(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  angle: number,
  isThrusting: boolean
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate((angle * Math.PI) / 180);

  // Lander body (triangle) - white
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, -10); // top
  ctx.lineTo(-8, 10); // bottom-left
  ctx.lineTo(8, 10); // bottom-right
  ctx.closePath();
  ctx.stroke();

  // Landing legs
  ctx.beginPath();
  ctx.moveTo(-8, 10);
  ctx.lineTo(-12, 15);
  ctx.moveTo(8, 10);
  ctx.lineTo(12, 15);
  ctx.stroke();

  // Draw thrust flame (orange/yellow)
  if (isThrusting) {
    ctx.fillStyle = '#FFA500'; // orange
    ctx.beginPath();
    // Random particles for flame effect
    for (let i = 0; i < 5; i++) {
      const offsetX = (Math.random() - 0.5) * 6;
      const offsetY = 15 + Math.random() * 15;
      ctx.fillRect(offsetX - 1, offsetY, 2, 5);
    }
  }

  ctx.restore();
}
