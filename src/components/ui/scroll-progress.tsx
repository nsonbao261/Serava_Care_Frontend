'use client';

import { useEffect, useState } from 'react';

interface ScrollProgressProps {
   className?: string;
   color?: string;
}

export const ScrollProgress = ({ className = '', color = 'bg-blue-600' }: ScrollProgressProps) => {
   const [scrollProgress, setScrollProgress] = useState(0);

   useEffect(() => {
      const updateScrollProgress = () => {
         const currentProgress = window.pageYOffset;
         const scrollHeight = document.body.scrollHeight - window.innerHeight;

         if (scrollHeight) {
            setScrollProgress((currentProgress / scrollHeight) * 100);
         }
      };

      window.addEventListener('scroll', updateScrollProgress);
      updateScrollProgress();

      return () => window.removeEventListener('scroll', updateScrollProgress);
   }, []);

   return (
      <div className={`fixed top-0 left-0 w-full h-1 bg-gray-200 z-50 ${className}`}>
         <div
            className={`h-full ${color} transition-all duration-150 ease-out animate-pulse`}
            style={{
               width: `${scrollProgress}%`,
               boxShadow: scrollProgress > 0 ? `0 0 10px rgba(59, 130, 246, 0.5)` : 'none',
            }}
         />
      </div>
   );
};
