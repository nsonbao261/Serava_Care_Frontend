'use client'

import { useEffect, useState } from 'react'

export const TypewriterText = ({
   texts,
   speed = 100,
   pauseDuration = 2000,
   className = ''
}: {
   texts: string[]
   speed?: number
   pauseDuration?: number
   className?: string
}) => {
   const [displayText, setDisplayText] = useState('')
   const [currentTextIndex, setCurrentTextIndex] = useState(0)
   const [currentCharIndex, setCurrentCharIndex] = useState(0)
   const [isDeleting, setIsDeleting] = useState(false)
   const [isPaused, setIsPaused] = useState(false)

   const currentText = texts[currentTextIndex]

   useEffect(() => {
      const timeout = setTimeout(
         () => {
            if (isPaused) {
               setIsPaused(false)
               setIsDeleting(true)
               return
            }

            if (!isDeleting && currentCharIndex < currentText.length) {
               setDisplayText(currentText.slice(0, currentCharIndex + 1))
               setCurrentCharIndex(currentCharIndex + 1)
            } else if (isDeleting && currentCharIndex > 0) {
               setDisplayText(currentText.slice(0, currentCharIndex - 1))
               setCurrentCharIndex(currentCharIndex - 1)
            } else if (!isDeleting && currentCharIndex === currentText.length) {
               setIsPaused(true)
            } else if (isDeleting && currentCharIndex === 0) {
               setIsDeleting(false)
               setCurrentTextIndex((currentTextIndex + 1) % texts.length)
            }
         },
         isPaused ? pauseDuration : isDeleting ? speed / 2 : speed
      )

      return () => clearTimeout(timeout)
   }, [
      currentCharIndex,
      isDeleting,
      isPaused,
      currentText,
      speed,
      pauseDuration,
      texts,
      currentTextIndex
   ])

   return (
      <span className={className}>
         {displayText}
         <span className="animate-pulse text-blue-600">|</span>
      </span>
   )
}
