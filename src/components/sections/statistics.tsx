'use client'

import { Activity, Building2, Eye, Stethoscope, Users } from 'lucide-react'
import { cn, formatNumber } from '@/lib'
import React, { useEffect, useRef } from 'react'

export const Statistics = () => {
   const stats = [
      {
         icon: Activity,
         number: 3000000,
         suffix: '+',
         label: 'Lượt khám',
         color: 'text-cyan-500',
         bgColor: 'bg-cyan-50',
         glowColor: '#06b6d4'
      },
      {
         icon: Building2,
         number: 300,
         suffix: '+',
         label: 'Cơ sở Y tế',
         color: 'text-blue-500',
         bgColor: 'bg-blue-50',
         glowColor: '#3b82f6'
      },
      {
         icon: Building2,
         number: 50,
         suffix: '+',
         label: 'Bệnh viện',
         color: 'text-purple-500',
         bgColor: 'bg-purple-50',
         glowColor: '#8b5cf6'
      },
      {
         icon: Stethoscope,
         number: 1000,
         suffix: '+',
         label: 'Bác sĩ',
         color: 'text-green-500',
         bgColor: 'bg-green-50',
         glowColor: '#10b981'
      },
      {
         icon: Users,
         number: 850000,
         suffix: '+',
         label: 'Lượt truy cập tháng',
         color: 'text-pink-500',
         bgColor: 'bg-pink-50',
         glowColor: '#ec4899'
      },
      {
         icon: Eye,
         number: 28300,
         suffix: '+',
         label: 'Lượt truy cập trong ngày',
         color: 'text-orange-500',
         bgColor: 'bg-orange-50',
         glowColor: '#f97316'
      }
   ]

   return (
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
               <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-in fade-in slide-in-from-bottom-4 duration-700">
                  THỐNG KÊ
               </h2>
            </div>

            <GlowCard
               className="bg-white rounded-2xl shadow-lg p-8 md:p-12 hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
               glowColor="#3b82f6"
               intensity="low"
            >
               <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                  {stats.map((stat, index) => {
                     const IconComponent = stat.icon
                     return (
                        <div
                           key={index}
                           className="text-center group hover:scale-105 transition-transform duration-300 animate-in fade-in slide-in-from-bottom-4"
                           style={{
                              animationDelay: `${index * 100 + 200}ms`,
                              animationDuration: '600ms'
                           }}
                        >
                           <div className="flex justify-center mb-4">
                              <div
                                 className={`w-16 h-16 ${stat.bgColor} rounded-full flex items-center justify-center group-hover:animate-pulse transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50 relative overflow-hidden`}
                              >
                                 <IconComponent className={`h-8 w-8 ${stat.color} relative z-10`} />
                                 <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping"
                                    style={{ backgroundColor: `${stat.glowColor}20` }}
                                 />
                              </div>
                           </div>
                           <div className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                 {formatNumber(stat.number)}
                                 {stat.suffix}
                              </span>
                           </div>
                           <div className="text-gray-600 text-sm font-medium hover:text-gray-800 transition-colors">
                              {stat.label}
                           </div>
                        </div>
                     )
                  })}
               </div>
            </GlowCard>
         </div>
      </section>
   )
}

const GlowCard = ({
   children,
   className,
   style,
   glowColor = '#3b82f6',
   intensity = 'medium'
}: {
   children: React.ReactNode
   className?: string
   style?: React.CSSProperties
   glowColor?: string
   intensity?: 'low' | 'medium' | 'high'
}) => {
   const cardRef = useRef<HTMLDivElement>(null)

   useEffect(() => {
      const card = cardRef.current
      if (!card) return

      const handleMouseMove = (e: MouseEvent) => {
         const rect = card.getBoundingClientRect()
         const x = e.clientX - rect.left
         const y = e.clientY - rect.top

         card.style.setProperty('--mouse-x', `${x}px`)
         card.style.setProperty('--mouse-y', `${y}px`)
      }

      card.addEventListener('mousemove', handleMouseMove)
      return () => card.removeEventListener('mousemove', handleMouseMove)
   }, [])

   const intensityClasses = {
      low: 'before:opacity-30',
      medium: 'before:opacity-50',
      high: 'before:opacity-70'
   }

   return (
      <div
         ref={cardRef}
         className={cn(
            'relative overflow-hidden rounded-lg',
            'before:absolute before:inset-0 before:z-0',
            'before:bg-gradient-radial before:from-current before:to-transparent',
            'before:transition-opacity before:duration-300',
            'before:opacity-0 hover:before:opacity-50',
            'group cursor-pointer',
            intensityClasses[intensity],
            className
         )}
         style={
            {
               ...style,
               '--tw-gradient-from': glowColor,
               '--tw-gradient-to': 'transparent'
            } as React.CSSProperties
         }
      >
         <div className="relative z-10 h-full">{children}</div>

         {/* Glow effect */}
         <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"
            style={{
               background: `radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${glowColor}20 0%, transparent 50%)`
            }}
         />
      </div>
   )
}
