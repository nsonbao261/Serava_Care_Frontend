'use client'

import { useInView } from '@/hooks'
import { memo } from 'react'

interface AnimatedSectionProps {
   children: React.ReactNode
   className?: string
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
      | 'magnetic'
      | 'simple'
   delay?: number
   duration?: number
}

export const AnimatedSection = memo(
   ({
      children,
      className = '',
      animation = 'simple',
      delay = 0,
      duration = 700
   }: AnimatedSectionProps) => {
      const [ref, isInView] = useInView({ threshold: 0.1, triggerOnce: true })

      if (animation === 'simple') {
         return (
            <div
               ref={ref}
               className={`transition-all duration-700 ease-out ${
                  isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
               } ${className}`}
               style={{
                  transitionDelay: delay ? `${delay}ms` : '0ms'
               }}
            >
               {children}
            </div>
         )
      }

      const getAnimationClasses = () => {
         const baseClasses = 'animate-on-scroll'
         const animationClass = animation
         const inViewClass = isInView ? 'in-view' : ''

         return `${baseClasses} ${animationClass} ${inViewClass}`.trim()
      }

      const animationStyle = {
         ...(delay > 0 && {
            transitionDelay: `${delay}ms`,
            animationDelay: `${delay}ms`
         }),
         ...(duration && {
            transitionDuration: `${duration}ms`,
            animationDuration: `${duration}ms`
         })
      }

      return (
         <div ref={ref} className={`${getAnimationClasses()} ${className}`} style={animationStyle}>
            {children}
         </div>
      )
   }
)

AnimatedSection.displayName = 'AnimatedSection'
