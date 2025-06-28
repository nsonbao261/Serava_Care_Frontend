'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ParticleBackgroundProps {
   particleCount?: number;
   particleColor?: string;
   className?: string;
}

export const ParticleBackground = ({
   particleCount = 50,
   particleColor = '#3b82f6',
   className,
}: ParticleBackgroundProps) => {
   const [particles, setParticles] = useState<
      Array<{
         id: number;
         x: number;
         y: number;
         size: number;
         speedX: number;
         speedY: number;
         opacity: number;
      }>
   >([]);

   useEffect(() => {
      const newParticles = Array.from({ length: particleCount }, (_, i) => ({
         id: i,
         x: Math.random() * 100,
         y: Math.random() * 100,
         size: Math.random() * 4 + 1,
         speedX: (Math.random() - 0.5) * 0.5,
         speedY: (Math.random() - 0.5) * 0.5,
         opacity: Math.random() * 0.5 + 0.1,
      }));

      setParticles(newParticles);
   }, [particleCount]);

   useEffect(() => {
      const interval = setInterval(() => {
         setParticles((prev) =>
            prev.map((particle) => ({
               ...particle,
               x: (particle.x + particle.speedX + 100) % 100,
               y: (particle.y + particle.speedY + 100) % 100,
            }))
         );
      }, 50);

      return () => clearInterval(interval);
   }, []);

   return (
      <div className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}>
         {particles.map((particle) => (
            <div
               key={particle.id}
               className="absolute rounded-full animate-pulse"
               style={{
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  backgroundColor: particleColor,
                  opacity: particle.opacity,
                  transform: 'translate(-50%, -50%)',
                  animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 2}s`,
               }}
            />
         ))}
      </div>
   );
};
