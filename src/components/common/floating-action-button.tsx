'use client'

import { useEffect, useState } from 'react'
import { Calendar, MessageCircle, Phone, X } from 'lucide-react'

export const FloatingActionButton = ({ className = '' }: { className?: string }) => {
   const [isOpen, setIsOpen] = useState(false)
   const [isVisible, setIsVisible] = useState(false)

   useEffect(() => {
      const handleScroll = () => {
         const scrollTop = window.pageYOffset
         setIsVisible(scrollTop > 300)
      }

      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
   }, [])

   const actions = [
      {
         icon: Calendar,
         label: 'Đặt lịch khám',
         color: 'bg-blue-600 hover:bg-blue-700',
         href: '/bac-si'
      },
      {
         icon: Phone,
         label: 'Gọi ngay',
         color: 'bg-green-600 hover:bg-green-700',
         href: 'tel:19001900'
      },
      {
         icon: MessageCircle,
         label: 'Chat hỗ trợ',
         color: 'bg-purple-600 hover:bg-purple-700',
         href: '#chat'
      }
   ]

   if (!isVisible) return null

   return (
      <div className={`fixed bottom-6 right-6 z-40 ${className}`}>
         {/* Action buttons - centered relative to main button */}
         <div
            className={`flex flex-col-reverse gap-3 mb-3 transition-all duration-300 items-center ${
               isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-4'
            }`}
         >
            {actions.map((action, index) => {
               const Icon = action.icon
               return (
                  <a
                     key={action.label}
                     href={action.href}
                     className={`${action.color} text-white p-3 rounded-full shadow-lg hover:shadow-xl 
                         transform hover:scale-110 transition-all duration-300
                         flex items-center justify-center w-12 h-12 group relative`}
                     style={{ animationDelay: `${index * 100}ms` }}
                     title={action.label}
                  >
                     <Icon className="h-5 w-5" />

                     {/* Tooltip */}
                     <div
                        className="absolute right-full mr-3 bg-gray-900 text-white text-sm px-2 py-1 
                            rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity"
                     >
                        {action.label}
                     </div>
                  </a>
               )
            })}
         </div>

         {/* Main FAB */}
         <button
            onClick={() => setIsOpen(!isOpen)}
            className={`bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg 
                   hover:shadow-xl transform hover:scale-110 transition-all duration-300
                   ${isOpen ? 'rotate-45' : ''}`}
            aria-label={isOpen ? 'Đóng menu' : 'Mở menu hỗ trợ'}
         >
            {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
         </button>
      </div>
   )
}
