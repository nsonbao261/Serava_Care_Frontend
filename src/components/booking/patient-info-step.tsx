'use client'

import { memo } from 'react'
import { User } from 'lucide-react'
import { PatientInfoStepProps } from './types'

export const PatientInfoStep = memo(({ bookingForm, onFormUpdate }: PatientInfoStepProps) => (
   <div className="space-y-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
         <User className="w-5 h-5 mr-2 text-blue-600" />
         Thông tin bệnh nhân
      </h3>

      <div className="space-y-4">
         <div>
            <label className="block text-sm font-medium mb-2">
               Họ và tên <span className="text-red-500">*</span>
            </label>
            <input
               type="text"
               value={bookingForm.patientName}
               onChange={(e) => onFormUpdate('patientName', e.target.value)}
               className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
               placeholder="Nhập họ và tên"
            />
         </div>

         <div>
            <label className="block text-sm font-medium mb-2">
               Số điện thoại <span className="text-red-500">*</span>
            </label>
            <input
               type="tel"
               value={bookingForm.patientPhone}
               onChange={(e) => onFormUpdate('patientPhone', e.target.value)}
               className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
               placeholder="Nhập số điện thoại"
            />
         </div>

         <div>
            <label className="block text-sm font-medium mb-2">Lý do khám (tùy chọn)</label>
            <textarea
               value={bookingForm.reason}
               onChange={(e) => onFormUpdate('reason', e.target.value)}
               className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
               rows={3}
               placeholder="Mô tả ngắn gọn tình trạng sức khỏe hoặc lý do khám"
            />
         </div>
      </div>
   </div>
))

PatientInfoStep.displayName = 'PatientInfoStep'
