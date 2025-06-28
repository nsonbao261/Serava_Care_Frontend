'use client';

import React from 'react';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { cn } from '@/lib/utils';

interface LoadingPageProps {
   message?: string;
   variant?: 'pulse' | 'spin' | 'bounce' | 'wave' | 'dots';
   size?: 'sm' | 'md' | 'lg' | 'xl';
   fullScreen?: boolean;
   className?: string;
}

export const LoadingPage = ({
   message = 'Đang tải...',
   variant = 'spin',
   size = 'lg',
   fullScreen = true,
   className,
}: LoadingPageProps) => {
   return (
      <div
         className={cn(
            'flex flex-col items-center justify-center bg-white',
            fullScreen ? 'min-h-screen' : 'h-64',
            'animate-fade-in-up',
            className
         )}
      >
         <div className="text-center">
            <div className="mb-6 animate-bounce">
               <LoadingSpinner variant={variant} size={size} color="blue" />
            </div>

            <div className="text-lg font-medium text-gray-700 mb-2 animate-text-reveal">
               {message}
            </div>

            <div
               className="text-sm text-gray-500 animate-fade-in-up"
               style={{ animationDelay: '0.5s' }}
            >
               Vui lòng đợi trong giây lát...
            </div>

            {/* Animated dots */}
            <div className="flex items-center justify-center mt-4 space-x-1">
               {[0, 1, 2].map((i) => (
                  <div
                     key={i}
                     className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                     style={{
                        animationDelay: `${i * 0.2}s`,
                        animationDuration: '1s',
                     }}
                  />
               ))}
            </div>
         </div>

         {/* Background animation */}
         <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
               className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-blue-50 to-transparent rounded-full animate-spin-slow opacity-20"
               style={{ animationDuration: '20s' }}
            />
            <div
               className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-purple-50 to-transparent rounded-full animate-spin-slow opacity-20"
               style={{ animationDuration: '25s', animationDirection: 'reverse' }}
            />
         </div>
      </div>
   );
};
