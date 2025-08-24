import { motion } from 'framer-motion'
import React from 'react'

interface Props {
   size?: 'sm' | 'md' | 'lg'
   color?: string
   text?: string
}

const sizeClasses = {
   sm: 'h-4 w-4',
   md: 'h-8 w-8',
   lg: 'h-12 w-12'
}

export const LoadingSpinner = React.memo<Props>(
   ({ size = 'md', color = 'border-green-600', text }) => {
      return (
         <div className="flex flex-col items-center justify-center">
            <div className={`animate-spin rounded-full border-b-2 ${color} ${sizeClasses[size]}`} />
            {text && (
               <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-gray-600 mt-4"
               >
                  {text}
               </motion.p>
            )}
         </div>
      )
   }
)

LoadingSpinner.displayName = 'LoadingSpinner'
