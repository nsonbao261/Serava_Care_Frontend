import React from 'react'
import { motion } from 'framer-motion'

export interface StatCardProps {
   icon: React.ElementType
   label: string
   value: string | number
   unit?: string
   trend?: 'up' | 'down' | 'stable'
}

export const StatCard = React.memo(({ icon: Icon, label, value, unit, trend }: StatCardProps) => (
   <motion.div
      whileHover={{ y: -2 }}
      className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all duration-200"
   >
      <div className="flex items-center justify-between">
         <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-50 rounded-lg">
               <Icon className="h-5 w-5 text-blue-600" />
            </div>
            <div>
               <p className="text-sm font-medium text-gray-900">{label}</p>
               <p className="text-lg font-semibold text-gray-900">
                  {value} {unit}
               </p>
            </div>
         </div>
         {trend && (
            <div
               className={`text-xs px-2 py-1 rounded-full ${
                  trend === 'up'
                     ? 'bg-green-100 text-green-800'
                     : trend === 'down'
                       ? 'bg-red-100 text-red-800'
                       : 'bg-gray-100 text-gray-800'
               }`}
            >
               {trend === 'up' ? '↗' : trend === 'down' ? '↘' : '→'}
            </div>
         )}
      </div>
   </motion.div>
))

StatCard.displayName = 'StatCard'
