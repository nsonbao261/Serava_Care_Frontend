'use client'

import { memo } from 'react'
import Image from 'next/image'
import { CreditCard, MapPin } from 'lucide-react'
import { ConfirmationStepProps } from './types'

export const ConfirmationStep = memo(({ doctor, bookingForm }: ConfirmationStepProps) => (
   <div className="space-y-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
         <CreditCard className="w-5 h-5 mr-2 text-blue-600" />
         Xác nhận đặt khám
      </h3>

      {/* Booking Summary */}
      <div className="bg-gray-50 rounded-xl p-6 space-y-4">
         <div className="flex items-center space-x-4">
            <Image
               src={typeof doctor.image === 'string' ? doctor.image : '/placeholder.svg'}
               alt={doctor.name}
               width={64}
               height={64}
               className="w-16 h-16 rounded-full object-cover"
            />
            <div>
               <h4 className="text-lg font-semibold text-gray-900">{doctor.name}</h4>
               <p className="text-gray-600">{doctor.specialty}</p>
               <div className="flex items-center text-gray-500 text-sm mt-1">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{doctor.location}</span>
               </div>
            </div>
         </div>

         <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between">
               <span className="text-gray-600">Ngày khám:</span>
               <span className="font-medium">{bookingForm.date}</span>
            </div>
            <div className="flex justify-between">
               <span className="text-gray-600">Giờ khám:</span>
               <span className="font-medium">{bookingForm.time}</span>
            </div>
            <div className="flex justify-between">
               <span className="text-gray-600">Bệnh nhân:</span>
               <span className="font-medium">{bookingForm.patientName}</span>
            </div>
            <div className="flex justify-between">
               <span className="text-gray-600">Số điện thoại:</span>
               <span className="font-medium">{bookingForm.patientPhone}</span>
            </div>
            {bookingForm.reason && (
               <div className="flex justify-between">
                  <span className="text-gray-600">Lý do khám:</span>
                  <span className="font-medium">{bookingForm.reason}</span>
               </div>
            )}
         </div>

         <div className="border-t pt-4">
            <div className="flex justify-between text-lg font-semibold">
               <span>Phí khám:</span>
               <span className="text-green-600">{doctor.consultationFee}</span>
            </div>
         </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
         <h4 className="font-medium text-blue-800 mb-2">Lưu ý quan trọng:</h4>
         <ul className="text-sm text-blue-700 space-y-1">
            <li>• Vui lòng có mặt trước 15 phút so với giờ hẹn</li>
            <li>• Mang theo giấy tờ tùy thân và sổ khám bệnh (nếu có)</li>
            <li>• Liên hệ hotline nếu cần thay đổi lịch hẹn</li>
         </ul>
      </div>
   </div>
))

ConfirmationStep.displayName = 'ConfirmationStep'
