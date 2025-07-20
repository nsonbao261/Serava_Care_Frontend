'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

interface UseInViewOptions {
   threshold?: number
   rootMargin?: string
   triggerOnce?: boolean
}

export const useInView = (options: UseInViewOptions = {}) => {
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
