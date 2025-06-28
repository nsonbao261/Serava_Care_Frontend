'use client';

import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface GlowCardProps {
   children: React.ReactNode;
   className?: string;
   style?: React.CSSProperties;
   glowColor?: string;
   intensity?: 'low' | 'medium' | 'high';
}

export const GlowCard = ({
   children,
   className,
   style,
   glowColor = '#3b82f6',
   intensity = 'medium',
}: GlowCardProps) => {
   const cardRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      const card = cardRef.current;
      if (!card) return;

      const handleMouseMove = (e: MouseEvent) => {
         const rect = card.getBoundingClientRect();
         const x = e.clientX - rect.left;
         const y = e.clientY - rect.top;

         card.style.setProperty('--mouse-x', `${x}px`);
         card.style.setProperty('--mouse-y', `${y}px`);
      };

      card.addEventListener('mousemove', handleMouseMove);
      return () => card.removeEventListener('mousemove', handleMouseMove);
   }, []);

   const intensityClasses = {
      low: 'before:opacity-30',
      medium: 'before:opacity-50',
      high: 'before:opacity-70',
   };

   return (
      <div
         ref={cardRef}
         className={cn(
            'relative overflow-hidden rounded-lg',
            'before:absolute before:inset-0 before:z-0',
            'before:bg-gradient-radial before:from-current before:to-transparent',
            'before:transition-opacity before:duration-300',
            'before:opacity-0 hover:before:opacity-50',
            'group cursor-pointer',
            intensityClasses[intensity],
            className
         )}
         style={
            {
               ...style,
               '--tw-gradient-from': glowColor,
               '--tw-gradient-to': 'transparent',
            } as React.CSSProperties
         }
      >
         <div className="relative z-10 h-full">{children}</div>

         {/* Glow effect */}
         <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"
            style={{
               background: `radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${glowColor}20 0%, transparent 50%)`,
            }}
         />
      </div>
   );
};
