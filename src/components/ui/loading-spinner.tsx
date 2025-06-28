'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
   size?: 'sm' | 'md' | 'lg' | 'xl';
   variant?: 'pulse' | 'spin' | 'bounce' | 'wave' | 'dots';
   color?: string;
   className?: string;
}

export const LoadingSpinner = ({
   size = 'md',
   variant = 'spin',
   color = 'blue',
   className,
}: LoadingSpinnerProps) => {
   const [frame, setFrame] = useState(0);

   useEffect(() => {
      if (variant === 'wave' || variant === 'dots') {
         const interval = setInterval(() => {
            setFrame((prev) => (prev + 1) % 3);
         }, 200);
         return () => clearInterval(interval);
      }
   }, [variant]);

   const sizeClasses = {
      sm: 'w-4 h-4',
      md: 'w-6 h-6',
      lg: 'w-8 h-8',
      xl: 'w-12 h-12',
   };

   const colorClasses = {
      blue: 'border-blue-500',
      green: 'border-green-500',
      red: 'border-red-500',
      purple: 'border-purple-500',
      gray: 'border-gray-500',
   };

   if (variant === 'pulse') {
      return (
         <div className={cn('flex items-center justify-center', className)}>
            <div
               className={cn('rounded-full animate-pulse', sizeClasses[size], `bg-${color}-500`)}
            />
         </div>
      );
   }

   if (variant === 'spin') {
      return (
         <div className={cn('flex items-center justify-center', className)}>
            <div
               className={cn(
                  'rounded-full border-2 border-t-transparent animate-spin',
                  sizeClasses[size],
                  colorClasses[color as keyof typeof colorClasses] || 'border-blue-500'
               )}
            />
         </div>
      );
   }

   if (variant === 'bounce') {
      return (
         <div className={cn('flex items-center justify-center space-x-1', className)}>
            {[0, 1, 2].map((i) => (
               <div
                  key={i}
                  className={cn(
                     'rounded-full animate-bounce',
                     size === 'sm'
                        ? 'w-2 h-2'
                        : size === 'md'
                          ? 'w-3 h-3'
                          : size === 'lg'
                            ? 'w-4 h-4'
                            : 'w-6 h-6',
                     `bg-${color}-500`
                  )}
                  style={{
                     animationDelay: `${i * 0.1}s`,
                     animationDuration: '0.6s',
                  }}
               />
            ))}
         </div>
      );
   }

   if (variant === 'wave') {
      return (
         <div className={cn('flex items-end justify-center space-x-1', className)}>
            {[0, 1, 2, 3, 4].map((i) => (
               <div
                  key={i}
                  className={cn(
                     'rounded-sm transition-all duration-300',
                     size === 'sm'
                        ? 'w-1'
                        : size === 'md'
                          ? 'w-1.5'
                          : size === 'lg'
                            ? 'w-2'
                            : 'w-3',
                     `bg-${color}-500`
                  )}
                  style={{
                     height:
                        frame === i % 3
                           ? size === 'sm'
                              ? '16px'
                              : size === 'md'
                                ? '24px'
                                : size === 'lg'
                                  ? '32px'
                                  : '40px'
                           : '8px',
                  }}
               />
            ))}
         </div>
      );
   }

   if (variant === 'dots') {
      return (
         <div className={cn('flex items-center justify-center space-x-1', className)}>
            {[0, 1, 2].map((i) => (
               <div
                  key={i}
                  className={cn(
                     'rounded-full transition-all duration-300',
                     size === 'sm'
                        ? 'w-2 h-2'
                        : size === 'md'
                          ? 'w-3 h-3'
                          : size === 'lg'
                            ? 'w-4 h-4'
                            : 'w-6 h-6',
                     `bg-${color}-500`,
                     frame === i ? 'opacity-100 scale-110' : 'opacity-30 scale-90'
                  )}
               />
            ))}
         </div>
      );
   }

   return null;
};
