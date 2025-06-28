'use client';

import { useInView } from '@/hooks/useInView';
import { ReactNode } from 'react';

interface AnimatedSectionProps {
   children: ReactNode;
   className?: string;
   animation?:
      | 'fade-up'
      | 'fade-down'
      | 'fade-left'
      | 'fade-right'
      | 'scale'
      | 'slide-up'
      | 'bounce-up'
      | 'bounce-in'
      | 'rotate-in'
      | 'flip-up'
      | 'zoom-in'
      | 'slide-left'
      | 'slide-right'
      | 'elastic-up'
      | 'magnetic';
   delay?: number;
   duration?: number;
}

export const AnimatedSection = ({
   children,
   className = '',
   animation = 'fade-up',
   delay = 0,
   duration = 600,
}: AnimatedSectionProps) => {
   const [ref, isInView] = useInView({ threshold: 0.1, triggerOnce: true });

   const getAnimationClasses = () => {
      const baseClasses = 'animate-on-scroll';
      const animationClass = animation;
      const inViewClass = isInView ? 'in-view' : '';

      return `${baseClasses} ${animationClass} ${inViewClass}`.trim();
   };

   const animationStyle = {
      ...(delay > 0 && {
         transitionDelay: `${delay}ms`,
         animationDelay: `${delay}ms`,
      }),
      ...(duration && {
         transitionDuration: `${duration}ms`,
         animationDuration: `${duration}ms`,
      }),
   };

   return (
      <div ref={ref} className={`${getAnimationClasses()} ${className}`} style={animationStyle}>
         {children}
      </div>
   );
};
