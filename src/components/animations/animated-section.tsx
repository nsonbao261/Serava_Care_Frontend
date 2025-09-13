'use client'

import React, { memo, useCallback, useEffect, useRef, useState } from 'react'

export const AnimatedSection = memo(
   ({
      children,
      className = '',
      animation = 'simple',
      delay = 0,
      duration = 700
   }: {
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
   }) => {
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

const useInView = (
   options: {
      threshold?: number
      rootMargin?: string
      triggerOnce?: boolean
   } = {}
) => {
   const { threshold = 0.1, rootMargin = '0px', triggerOnce = true } = options
   const ref = useRef<HTMLDivElement>(null)
   const [isInView, setIsInView] = useState(false)

   const handleIntersection = useCallback(
      ([entry]: IntersectionObserverEntry[]) => {
         if (entry.isIntersecting) {
            setIsInView(true)
         } else if (!triggerOnce) {
            setIsInView(false)
         }
      },
      [triggerOnce]
   )

   useEffect(() => {
      const element = ref.current
      if (!element) return

      // Use passive observation for better performance
      const observer = new IntersectionObserver(handleIntersection, {
         threshold,
         rootMargin
      })

      observer.observe(element)

      return () => {
         observer.disconnect()
      }
   }, [threshold, rootMargin, handleIntersection])

   return [ref, isInView] as const
}
