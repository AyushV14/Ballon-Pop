"use client"

import React, { useState, useRef, useEffect } from 'react';
import AirPump from './AirPump';
import Balloncomp from './Balloncomp';
import { ballonData } from '@/data/data';

function Game() {
  const [balloonSize, setBalloonSize] = useState(50);
  const [isFlying, setIsFlying] = useState(false);
  const [isPopped, setIsPopped] = useState(false);
  const [position, setPosition] = useState({ x: 79, y: 78 });
  const [currentBalloonIndex, setCurrentBalloonIndex] = useState(0); 
  const animationRef = useRef();
  const maxSize = 100;

  const inflateBalloon = () => {
    if (balloonSize < maxSize && !isFlying && !isPopped) {
      setBalloonSize(prev => Math.min(prev + 10, maxSize));
      if (balloonSize + 10 >= maxSize) {
        setIsFlying(true);
      }
    }
  };

  const popBalloon = () => {
    if (isFlying && !isPopped) {
      setIsPopped(true);
      setIsFlying(false);
      cancelAnimationFrame(animationRef.current);
      
      // Move to next balloon after current pops
      setTimeout(() => {
        setBalloonSize(50);
        setIsFlying(false);
        setIsPopped(false);
        setPosition({ x: 79, y: 78 });
        setCurrentBalloonIndex(prevIndex => (prevIndex + 1) % ballonData.length); 
      }, 1000);
    }
  };

  useEffect(() => {
    let dx = 0.1;
    let dy = 0.1;

    const animate = () => {
      if (isFlying && !isPopped) {
        setPosition(prev => {
          let newX = prev.x + dx;
          let newY = prev.y + dy;

          // Bounce off walls
          if (newX <= 0 || newX >= 80) dx *= -1;
          if (newY <= 0 || newY >= 80) dy *= -1;

          return {
            x: Math.max(0, Math.min(80, newX)),
            y: Math.max(0, Math.min(80, newY))
          };
        });

        animationRef.current = requestAnimationFrame(animate);
      }
    };

    if (isFlying) {
      animationRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isFlying, isPopped]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="relative w-full h-[500px]">
        {!isPopped && (
          <Balloncomp
            key={currentBalloonIndex}  // Key should be based on the current index
            isFlying={isFlying}
            position={position}
            balloonSize={balloonSize}
            popBalloon={popBalloon}
            data={ballonData[currentBalloonIndex]}  // Pass the current balloon data
          />
        )}
        {isPopped && (
          <div
            className="absolute text-6xl"
            style={{
              left: `${position.x}%`,
              top: `${position.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            💥
          </div>
        )}
      </div>

      <div className="fixed bottom-10 flex flex-col items-center gap-4">
        <div onClick={inflateBalloon} disabled={isFlying || isPopped}>
          <AirPump className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}

export default Game;
