"use client"

import Image from 'next/image';
import React, { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';

const AirPump = () => {
  const [isPumping, setIsPumping] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  


  const leftSpring = useSpring({
    transform: isPumping
      ? 'scale(1.05, 0.95) rotate(5deg)' 
      : 'scale(1, 1) rotate(0deg)', 
    config: { tension: 200, friction: 15 }
  });

  const middleSpring = useSpring({
    transform: isPumping
      ? 'scale(1.25, 1.1) rotate(-5deg)' 
      : 'scale(1, 1) rotate(0deg)', 
    config: { tension: 200, friction: 15 }
  });

  const handleSpring = useSpring({
    transform: isPumping
      ? 'translateY(40px)' 
      : 'translateY(0px)',  
    config: { tension: 200, friction: 15 }
  });

  const pumpBallon = () => {
    setIsPumping(true);
    setClickCount((prevCount) => prevCount + 1);
    setTimeout(() => setIsPumping(false), 200); 
  }

  const balloonIndex = Math.floor(clickCount / 4); 

  

  return (
    <div className='fixed bottom-0 right-0 p-3 mr-10'>
      <div className="relative">
        <animated.div
          style={handleSpring}
          className="absolute top-[-83px] left-10 transform -translate-x-1/2 cursor-pointer"
          onClick={pumpBallon}
        >
          <Image
            src='/images/Airpumptop.png'
            alt='Pump part'
            width={150}
            height={80}
          />
        </animated.div>

        <animated.div style={leftSpring} className="absolute left-[-85px] transform -translate-y-1/2">
          <Image
            src='/images/Airpumpleft.png'
            alt='Pump part'
            width={170}
            height={80}
          />
        </animated.div>

        <animated.div style={middleSpring}>
          <Image
            src='/images/Airpumpmiddle.png'
            alt='Pump part'
            width={230}
            height={240}
          />
        </animated.div>

        
      </div>
    </div>
  )
}

export default AirPump;
