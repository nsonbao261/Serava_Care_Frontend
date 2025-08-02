import React from 'react'
import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

interface StatusBadgeProps {
   label: string
   color: string
   icon: LucideIcon
}

export const StatusBadge = React.memo<StatusBadgeProps>(({ label, color, icon: Icon }) => {
   return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${color}`}>
         <Icon className="h-3 w-3 inline mr-1" />
         {label}
      </span>
   )
})

StatusBadge.displayName = 'StatusBadge'

interface BookingCardProps {
   booking: {
      id: string
      orderNumber: string
      doctorName: string
      doctorSpecialty: string
      serviceName: string
      appointmentDate: string
      appointmentTime: string
      totalAmount: string
      hospital: string
      reason?: string
      notes?: string
      status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'rescheduled'
      serviceType: 'telemedicine' | 'clinic' | 'home' | 'emergency'
   }
   index: number
   onViewDetails: (id: string) => void
   statusConfig: Record<string, { label: string; color: string; icon: LucideIcon }>
   serviceIcons: Record<string, LucideIcon>
}

export const BookingCard = React.memo<BookingCardProps>(
   ({ booking, index, onViewDetails, statusConfig, serviceIcons }) => {
      const StatusIcon = statusConfig[booking.status].icon
      const ServiceIcon = serviceIcons[booking.serviceType]

      return (
         <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
         >
            <div className="flex items-start justify-between">
               <div className="flex-1">
                  {/* Header */}
                  <div className="flex items-center space-x-3 mb-3">
                     <StatusBadge
                        label={statusConfig[booking.status].label}
                        color={statusConfig[booking.status].color}
                        icon={StatusIcon}
                     />
                     <span className="text-sm text-gray-500">#{booking.orderNumber}</span>
                     <div className="flex items-center text-sm text-gray-500">
                        <ServiceIcon className="h-4 w-4 mr-1" />
                        {booking.serviceName}
                     </div>
                  </div>

                  {/* Doctor Info */}
                  <div className="flex items-center space-x-4 mb-4">
                     <div className="h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center">
                        <div className="h-6 w-6 text-gray-400">👨‍⚕️</div>
                     </div>
                     <div>
                        <h3 className="font-semibold text-gray-900">{booking.doctorName}</h3>
                        <p className="text-sm text-gray-600">{booking.doctorSpecialty}</p>
                        <p className="text-sm text-gray-500">{booking.hospital}</p>
                     </div>
                  </div>

                  {/* Appointment Details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                     <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">
                           📅 {new Date(booking.appointmentDate).toLocaleDateString('vi-VN')}
                        </span>
                     </div>
                     <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">🕐 {booking.appointmentTime}</span>
                     </div>
                     <div className="text-sm">
                        <span className="text-gray-600">Phí khám: </span>
                        <span className="font-semibold text-green-600">{booking.totalAmount}</span>
                     </div>
                  </div>

                  {/* Reason */}
                  {booking.reason && (
                     <div className="mb-4">
                        <span className="text-sm text-gray-600">Lý do khám: </span>
                        <span className="text-sm text-gray-900">{booking.reason}</span>
                     </div>
                  )}

                  {/* Notes */}
                  {booking.notes && (
                     <div className="bg-gray-50 rounded-lg p-3 mb-4">
                        <span className="text-sm text-gray-600">Ghi chú: </span>
                        <span className="text-sm text-gray-900">{booking.notes}</span>
                     </div>
                  )}
               </div>

               {/* Actions */}
               <div className="ml-4">
                  <button
                     onClick={() => onViewDetails(booking.id)}
                     className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                     👁️ Chi tiết
                  </button>
               </div>
            </div>
         </motion.div>
      )
   }
)

BookingCard.displayName = 'BookingCard'
