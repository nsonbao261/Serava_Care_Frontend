'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ChevronUp } from 'lucide-react';

interface BackToTopProps {
   threshold?: number;
   className?: string;
   smooth?: boolean;
}

export const BackToTop = ({ threshold = 400, className, smooth = true }: BackToTopProps) => {
   const [isVisible, setIsVisible] = useState(false);

   useEffect(() => {
      const toggleVisibility = () => {
         if (window.pageYOffset > threshold) {
            setIsVisible(true);
         } else {
            setIsVisible(false);
         }
      };

      window.addEventListener('scroll', toggleVisibility);
      return () => window.removeEventListener('scroll', toggleVisibility);
   }, [threshold]);

   const scrollToTop = () => {
      if (smooth) {
         window.scrollTo({
            top: 0,
            behavior: 'smooth',
         });
      } else {
         window.scrollTo(0, 0);
      }
   };

   return (
      <button
         onClick={scrollToTop}
         className={cn(
            'fixed bottom-6 right-24 z-50',
            'w-12 h-12 rounded-full',
            'bg-gray-600 hover:bg-gray-700',
            'text-white shadow-lg',
            'transition-all duration-300 ease-in-out',
            'hover:scale-110 hover:shadow-xl',
            'active:scale-95',
            'focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2',
            isVisible
               ? 'opacity-100 translate-y-0 pointer-events-auto'
               : 'opacity-0 translate-y-2 pointer-events-none',
            className
         )}
         aria-label="Scroll to top"
      >
         <ChevronUp className="w-6 h-6 mx-auto" />
      </button>
   );
};
