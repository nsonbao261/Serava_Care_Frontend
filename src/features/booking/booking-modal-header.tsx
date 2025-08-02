'use client'

import { memo } from 'react'
import { X } from 'lucide-react'

export const BookingModelHeader = memo(({ doctor, step, onClose }: HeaderSectionProps) => (
   <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
      <div className="flex items-center justify-between">
         <div>
            <h2 className="text-2xl font-bold">Đặt lịch khám</h2>
            <p className="text-blue-100 mt-1">
               {doctor.name} - {doctor.specialty}
            </p>
         </div>
         <button
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
         >
            <X className="w-6 h-6" />
         </button>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center mt-6 space-x-4">
         <div
            className={`flex items-center space-x-2 ${
               step === 'datetime'
                  ? 'text-white'
                  : step === 'info' || step === 'confirm'
                    ? 'text-blue-200'
                    : 'text-blue-300'
            }`}
         >
            <div
               className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step === 'datetime'
                     ? 'bg-white text-blue-600'
                     : step === 'info' || step === 'confirm'
                       ? 'bg-blue-500 text-white'
                       : 'bg-blue-400'
               }`}
            >
               1
            </div>
            <span className="text-sm font-medium">Chọn thời gian</span>
         </div>
         <div className="flex-1 h-px bg-blue-400"></div>
         <div
            className={`flex items-center space-x-2 ${
               step === 'info'
                  ? 'text-white'
                  : step === 'confirm'
                    ? 'text-blue-200'
                    : 'text-blue-300'
            }`}
         >
            <div
               className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step === 'info'
                     ? 'bg-white text-blue-600'
                     : step === 'confirm'
                       ? 'bg-blue-500 text-white'
                       : 'bg-blue-400'
               }`}
            >
               2
            </div>
            <span className="text-sm font-medium">Thông tin</span>
         </div>
         <div className="flex-1 h-px bg-blue-400"></div>
         <div
            className={`flex items-center space-x-2 ${
               step === 'confirm' ? 'text-white' : 'text-blue-300'
            }`}
         >
            <div
               className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step === 'confirm' ? 'bg-white text-blue-600' : 'bg-blue-400'
               }`}
            >
               3
            </div>
            <span className="text-sm font-medium">Xác nhận</span>
         </div>
      </div>
   </div>
))

BookingModelHeader.displayName = 'HeaderSection'
