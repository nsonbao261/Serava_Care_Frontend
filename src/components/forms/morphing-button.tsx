'use client'

import { Button } from '@/components'
import { cn } from '@/lib'
import React, { useState } from 'react'

export const MorphingButton = ({
   children,
   className,
   variant = 'default',
   size = 'default',
   action,
   morphText,
   disabled,
   ...props
}: {
   children: React.ReactNode
   className?: string
   variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
   size?: 'default' | 'sm' | 'lg' | 'icon'
   action?: () => void | Promise<void>
   morphText?: string
   disabled?: boolean
}) => {
   const [isHovered, setIsHovered] = useState(false)
   const [isClicked, setIsClicked] = useState(false)

   const handleClick = () => {
      if (disabled) return

      setIsClicked(true)
      if (action) action()

      setTimeout(() => {
         setIsClicked(false)
      }, 200)
   }

   return (
      <Button
         variant={variant}
         size={size}
         className={cn(
            'relative overflow-hidden transition-all duration-300 ease-in-out transform-gpu',
            'hover:shadow-lg hover:-translate-y-0.5',
            'active:scale-95 active:translate-y-0',
            'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50',
            isClicked && 'scale-95 translate-y-0',
            className
         )}
         onMouseEnter={() => setIsHovered(true)}
         onMouseLeave={() => setIsHovered(false)}
         onClick={handleClick}
         disabled={disabled}
         {...props}
      >
         {/* Main content */}
         <span
            className={cn(
               'relative z-10 flex items-center justify-center transition-all duration-300 ease-in-out',
               isHovered && morphText
                  ? 'transform -translate-y-8 opacity-0'
                  : 'transform translate-y-0 opacity-100'
            )}
         >
            {children}
         </span>

         {/* Morphed content */}
         {morphText && (
            <span
               className={cn(
                  'absolute inset-0 flex items-center justify-center transition-all duration-300 ease-in-out',
                  isHovered
                     ? 'transform translate-y-0 opacity-100'
                     : 'transform translate-y-8 opacity-0'
               )}
            >
               {morphText}
            </span>
         )}

         {/* Ripple effect */}
         <div
            className={cn(
               'absolute inset-0 transition-all duration-500',
               'bg-gradient-to-r from-white/10 to-white/5',
               'rounded-inherit',
               isHovered ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
            )}
         />
      </Button>
   )
}
