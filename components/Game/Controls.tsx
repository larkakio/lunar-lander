'use client';

import { useEffect, useState } from 'react';
import { useGame } from '@/context/GameContext';

export function Controls() {
  const { gameState, setLanderControls } = useGame();
  const [touchZones, setTouchZones] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    if (gameState.state !== 'playing') {
      setLanderControls({ isThrusting: false, rotation: 'none' });
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'KeyW') {
        e.preventDefault();
        setLanderControls({ isThrusting: true });
      } else if (e.code === 'KeyA' || e.code === 'ArrowLeft') {
        e.preventDefault();
        setLanderControls({ rotation: 'left' });
      } else if (e.code === 'KeyD' || e.code === 'ArrowRight') {
        e.preventDefault();
        setLanderControls({ rotation: 'right' });
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'KeyW') {
        e.preventDefault();
        setLanderControls({ isThrusting: false });
      } else if (e.code === 'KeyA' || e.code === 'ArrowLeft') {
        e.preventDefault();
        setLanderControls({ rotation: 'none' });
      } else if (e.code === 'KeyD' || e.code === 'ArrowRight') {
        e.preventDefault();
        setLanderControls({ rotation: 'none' });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameState.state, setLanderControls]);

  const handleTouchStart = (zone: 'left' | 'center' | 'right') => {
    if (gameState.state !== 'playing') return;
    setTouchZones((prev) => ({ ...prev, [zone]: true }));

    if (zone === 'center') {
      setLanderControls({ isThrusting: true });
    } else if (zone === 'left') {
      setLanderControls({ rotation: 'left' });
    } else if (zone === 'right') {
      setLanderControls({ rotation: 'right' });
    }
  };

  const handleTouchEnd = (zone: 'left' | 'center' | 'right') => {
    setTouchZones((prev) => {
      const newZones = { ...prev, [zone]: false };
      const anyActive = Object.values(newZones).some((v) => v);

      if (!anyActive) {
        setLanderControls({ isThrusting: false, rotation: 'none' });
      } else {
        if (zone === 'center') {
          setLanderControls({ isThrusting: false });
        } else if (zone === 'left' && !newZones.left) {
          setLanderControls({ rotation: 'none' });
        } else if (zone === 'right' && !newZones.right) {
          setLanderControls({ rotation: 'none' });
        }
      }

      return newZones;
    });
  };

  if (gameState.state !== 'playing') {
    return null;
  }

  return (
    <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-auto z-20">
      <div className="grid grid-cols-3 h-full">
        {/* Left Zone - Rotate Left */}
        <button
          className="bg-black/50 border-r border-vector-green/30 active:bg-vector-green/20 flex items-center justify-center text-vector-green text-2xl font-bold touch-manipulation"
          onTouchStart={() => handleTouchStart('left')}
          onTouchEnd={() => handleTouchEnd('left')}
          onMouseDown={() => handleTouchStart('left')}
          onMouseUp={() => handleTouchEnd('left')}
          aria-label="Rotate Left"
        >
          ←
        </button>

        {/* Center Zone - Thrust */}
        <button
          className="bg-black/50 border-x border-vector-green/30 active:bg-thrust-flame/30 flex items-center justify-center text-vector-green text-2xl font-bold touch-manipulation"
          onTouchStart={() => handleTouchStart('center')}
          onTouchEnd={() => handleTouchEnd('center')}
          onMouseDown={() => handleTouchStart('center')}
          onMouseUp={() => handleTouchEnd('center')}
          aria-label="Thrust"
        >
          ↑
        </button>

        {/* Right Zone - Rotate Right */}
        <button
          className="bg-black/50 border-l border-vector-green/30 active:bg-vector-green/20 flex items-center justify-center text-vector-green text-2xl font-bold touch-manipulation"
          onTouchStart={() => handleTouchStart('right')}
          onTouchEnd={() => handleTouchEnd('right')}
          onMouseDown={() => handleTouchStart('right')}
          onMouseUp={() => handleTouchEnd('right')}
          aria-label="Rotate Right"
        >
          →
        </button>
      </div>
    </div>
  );
}
