import React, { useState, forwardRef } from 'react'
import { SnakePlatform } from './Snake'
import { useSwipeable } from 'react-swipeable'
import classNames from 'classnames'
import styles from './Phone.module.scss'

interface PhoneProps {
    type: 'tiny' | 'normal' | 'fullscreen'
}

const Phone = ({ type }, ref) => {
    const platformWidth: number = 211.7

    const [direction, setDirection] = useState(3)

    const handlers = useSwipeable({
        onSwipedUp: (eventData) => setDirection(1),
        onSwipedRight: (eventData) => setDirection(2),
        onSwipedDown: (eventData) => setDirection(3),
        onSwipedLeft: (eventData) => setDirection(4),
        preventDefaultTouchmoveEvent: true,
        trackMouse: true
      });

      let containerClassName = classNames(
          (type === 'tiny') && styles['phone--tiny'],
          (type === 'normal') && styles['phone--normal'],
          (type === 'fullscreen') && styles['phone--fullscreen']
      ) 

    return (
        <div {...handlers} className={containerClassName}>
            <svg ref={ref}
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 237.81 478.95">
                { (type === 'fullscreen') ? '' : 
                    <>
                        <rect x="14.09" y="15.04" width={platformWidth} height="449.76" fill="#fff"/>
                    </>
                }
                <SnakePlatform pos={{x: 14.09, y: 15.04}} width={platformWidth} height={449.76} size={1/10} swipeDirection={direction} type={type}/>
                { (type === 'fullscreen') ? '' : 
                    <>
                        <path d="M1052.61,779.2H868.3a26.77,26.77,0,0,1-26.75-26.75V327a26.79,26.79,0,0,1,26.75-26.75h184.31A26.79,26.79,0,0,1,1079.36,327V752.45A26.78,26.78,0,0,1,1052.61,779.2ZM868.3,303.13A23.89,23.89,0,0,0,844.43,327V752.45a23.9,23.9,0,0,0,23.87,23.88h184.31a23.9,23.9,0,0,0,23.87-23.88V327a23.89,23.89,0,0,0-23.87-23.87Z" transform="translate(-841.55 -300.25)"/>
                        <path d="M1054.65,767.94H868.31a15.69,15.69,0,0,1-15.55-15.79v-422c0-8.36,6.45-15.15,14.38-15.15h75.53a14.23,14.23,0,0,1,11.8,6.76,8.29,8.29,0,0,0,14,0A14.27,14.27,0,0,1,980.3,315h75.53c7.92,0,14.37,6.8,14.37,15.15v422A15.69,15.69,0,0,1,1054.65,767.94ZM867.14,317.84c-6.35,0-11.5,5.51-11.5,12.28v422a12.8,12.8,0,0,0,12.67,12.91h186.34a12.8,12.8,0,0,0,12.68-12.91v-422c0-6.77-5.16-12.28-11.5-12.28H980.3a11.48,11.48,0,0,0-9.43,5.49,11.16,11.16,0,0,1-18.79,0,11.39,11.39,0,0,0-9.41-5.49Z" transform="translate(-841.55 -300.25)"/>
                        <circle cx="119.93" cy="16.07" r="5.27"/>
                        <circle cx="119.93" cy="16.07" r="2.6" fill="#fff"/>
                        <circle cx="119.93" cy="16.07" r="1.03"/>
                        <path d="M965.4,753.68h-9.89a4.64,4.64,0,0,1-4.64-4.63v-9.9a4.63,4.63,0,0,1,4.64-4.63h9.89a4.64,4.64,0,0,1,4.64,4.63v9.9A4.64,4.64,0,0,1,965.4,753.68Zm-9.89-16.29a1.76,1.76,0,0,0-1.76,1.76v9.9a1.77,1.77,0,0,0,1.76,1.76h9.89a1.76,1.76,0,0,0,1.76-1.76v-9.9a1.76,1.76,0,0,0-1.76-1.76Z" transform="translate(-841.55 -300.25)"/>
                        <rect x="51.95" y="449.17" width="17.85" height="2.33" rx="0.81"/>
                        <rect x="51.95" y="442.26" width="17.85" height="2.33" rx="0.81"/>
                        <rect x="51.95" y="435.35" width="17.85" height="2.33" rx="0.81"/>
                        <path d="M1018.21,754.51l-14.81-10.83,14.81-10.83,1.7,2.32-11.63,8.51,11.63,8.5Z" transform="translate(-841.55 -300.25)"/>
                        <path d="M1052.61,303.13H868.31A23.9,23.9,0,0,0,844.42,327V752.45a23.92,23.92,0,0,0,23.89,23.88h184.3a23.92,23.92,0,0,0,23.88-23.88V327A23.91,23.91,0,0,0,1052.61,303.13Zm-91.12,7.92a5.26,5.26,0,0,1,5.16,4.24,5,5,0,0,1,.11,1,5.28,5.28,0,0,1-10.55,0,4.4,4.4,0,0,1,.12-1A5.24,5.24,0,0,1,961.49,311.05ZM1070.2,752.14a15.67,15.67,0,0,1-15.55,15.79H868.32a15.6,15.6,0,0,1-8.92-2.87,15.44,15.44,0,0,1-3.76-3.76,15.63,15.63,0,0,1-2.88-9.16v-422a15.59,15.59,0,0,1,2.88-9.09,14.31,14.31,0,0,1,8.56-5.74,13.65,13.65,0,0,1,2.94-.32h75.53a14.34,14.34,0,0,1,2.71.32,14.18,14.18,0,0,1,9.09,6.44,8.29,8.29,0,0,0,11.43,2.58,8.39,8.39,0,0,0,2.59-2.58A14.24,14.24,0,0,1,980.3,315h75.53a13.58,13.58,0,0,1,2.94.32,14.32,14.32,0,0,1,8.57,5.76,15.6,15.6,0,0,1,2.86,9.07Z" transform="translate(-841.55 -300.25)" fill="#fff"></path>
                    </>
                }
            </svg>
        </div>
    )
}

export default forwardRef(Phone)