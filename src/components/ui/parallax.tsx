'use client';

import { useEffect, useState, ReactNode } from 'react';

interface ParallaxProps {
   children: ReactNode;
   speed?: number;
   className?: string;
}

export const Parallax = ({ children, speed = 0.5, className = '' }: ParallaxProps) => {
   const [offset, setOffset] = useState(0);

   useEffect(() => {
      const handleScroll = () => {
         setOffset(window.pageYOffset * speed);
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
   }, [speed]);

   return (
      <div
         className={`transform ${className}`}
         style={{
            transform: `translateY(${offset}px)`,
         }}
      >
         {children}
      </div>
   );
};
