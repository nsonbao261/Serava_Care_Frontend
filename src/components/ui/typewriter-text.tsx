'use client';

import { useEffect, useState } from 'react';

interface TypewriterTextProps {
   texts: string[];
   speed?: number;
   pauseDuration?: number;
   className?: string;
}

export const TypewriterText = ({
   texts,
   speed = 100,
   pauseDuration = 2000,
   className = '',
}: TypewriterTextProps) => {
   const [displayText, setDisplayText] = useState('');
   const [currentTextIndex, setCurrentTextIndex] = useState(0);
   const [currentCharIndex, setCurrentCharIndex] = useState(0);
   const [isDeleting, setIsDeleting] = useState(false);
   const [isPaused, setIsPaused] = useState(false);

   useEffect(() => {
      const currentText = texts[currentTextIndex];

      const timeout = setTimeout(
         () => {
            if (isPaused) {
               setIsPaused(false);
               setIsDeleting(true);
               return;
            }

            if (!isDeleting && currentCharIndex < currentText.length) {
               // Typing
               setDisplayText(currentText.slice(0, currentCharIndex + 1));
               setCurrentCharIndex(currentCharIndex + 1);
            } else if (isDeleting && currentCharIndex > 0) {
               // Deleting
               setDisplayText(currentText.slice(0, currentCharIndex - 1));
               setCurrentCharIndex(currentCharIndex - 1);
            } else if (!isDeleting && currentCharIndex === currentText.length) {
               // Pause before deleting
               setIsPaused(true);
               return;
            } else if (isDeleting && currentCharIndex === 0) {
               // Move to next text
               setIsDeleting(false);
               setCurrentTextIndex((currentTextIndex + 1) % texts.length);
            }
         },
         isPaused ? pauseDuration : isDeleting ? speed / 2 : speed
      );

      return () => clearTimeout(timeout);
   }, [currentCharIndex, currentTextIndex, isDeleting, isPaused, texts, speed, pauseDuration]);

   return (
      <span className={className}>
         {displayText}
         <span className="animate-pulse text-blue-600">|</span>
      </span>
   );
};
