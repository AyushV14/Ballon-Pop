import Image from 'next/image'
import React from 'react'

const Balloncomp = ({ isFlying, position, balloonSize, popBalloon, data }) => {
    
  return (
    <>       
        <div
            className={`absolute transition-transform cursor-pointer ${isFlying ? 'animate-bounce' : ''}`}
            style={{
                left: `${position.x}%`,
                top: `${position.y}%`,
                transform: 'translate(-50%, -50%)',
            }}
            onClick={popBalloon}
            >
            <Image
                src={data?.ballonImg}
                alt="ballon"
                height={90}
                width={140}
                className=" transition-all duration-200"
                style={{
                width: `${balloonSize}px`,
                height: `${balloonSize * 1.2}px`,
                // boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                }}
            />
            <div className="absolute left-1/2 top-[40%] transform -translate-x-1/2 -translate-y-1/2">
                        <Image
                          src={data?.ballonLetter}
                          alt="letter"
                          height={70}
                          width={70}
                        />
            </div>
            {isFlying && (
                <Image
                    src="/images/tail.png"
                    alt="tail"
                    width={150}
                    height={50}
                    className="absolute mx-auto -mt-9"
                />
            )}
            </div>
    </>

  )
}

export default Balloncomp
