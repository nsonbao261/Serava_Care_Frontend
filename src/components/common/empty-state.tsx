import { motion } from 'framer-motion'
import React from 'react'

interface EmptyStateProps {
   icon?: React.ReactNode
   title: string
   description?: string
   action?: React.ReactNode
}

export const EmptyState = React.memo<EmptyStateProps>(({ icon, title, description, action }) => {
   return (
      <motion.div
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         className="text-center py-12"
      >
         {icon && <div className="mb-4">{icon}</div>}
         <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
         {description && <p className="text-gray-600 mb-6">{description}</p>}
         {action && action}
      </motion.div>
   )
})

EmptyState.displayName = 'EmptyState'
