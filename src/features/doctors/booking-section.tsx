'use client'

import { useState } from 'react'
import { Calendar, Clock, Phone, Mail } from 'lucide-react'
import { Button } from '@/components'
import { BookingModal } from '@/features/booking/booking-modal'

interface BookingSectionProps {
   doctor: LegacyDoctorDetail
}

export function BookingSection({ doctor }: BookingSectionProps) {
   const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)

   return (
      <>
         <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Đặt lịch khám</h3>

            <div className="space-y-4 mb-6">
               <div className="flex items-center justify-between">
                  <span className="text-gray-600">Phí khám:</span>
                  <span className="text-xl font-bold text-green-600">{doctor.consultationFee}</span>
               </div>
               <div className="flex items-center text-gray-600">
                  <Clock className="h-4 w-4 mr-2" />
                  <span className="text-sm">{doctor.workingHours}</span>
               </div>
            </div>

            <Button
               className="w-full bg-blue-600 hover:bg-blue-700 text-white mb-4"
               onClick={() => setIsBookingModalOpen(true)}
            >
               <Calendar className="h-4 w-4 mr-2" />
               Đặt lịch khám ngay
            </Button>

            <div className="space-y-3">
               <div className="flex items-center text-gray-600">
                  <Phone className="h-4 w-4 mr-2" />
                  <span className="text-sm">{doctor.phoneNumber}</span>
               </div>
               <div className="flex items-center text-gray-600">
                  <Mail className="h-4 w-4 mr-2" />
                  <span className="text-sm">{doctor.email}</span>
               </div>
            </div>
         </div>

         {/* Booking Modal */}
         <BookingModal
            doctor={doctor as unknown as Doctor}
            isOpen={isBookingModalOpen}
            onClose={() => setIsBookingModalOpen(false)}
         />
      </>
   )
}
