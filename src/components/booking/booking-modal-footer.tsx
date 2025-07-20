'use client'

import { memo } from 'react'
import { FooterSectionProps } from './types'

export const BookingModelFooter = memo(
   ({
      step,
      isDateTimeValid,
      isInfoValid,
      onStepBack,
      onDateTimeNext,
      onInfoNext,
      onBookingSubmit
   }: FooterSectionProps) => (
      <div className="border-t bg-gray-50 p-6">
         <div className="flex justify-between">
            {step !== 'datetime' && (
               <button
                  onClick={onStepBack}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
               >
                  Quay lại
               </button>
            )}

            <div className="flex-1"></div>

            {step === 'datetime' && (
               <button
                  onClick={onDateTimeNext}
                  disabled={!isDateTimeValid}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
               >
                  Tiếp tục
               </button>
            )}

            {step === 'info' && (
               <button
                  onClick={onInfoNext}
                  disabled={!isInfoValid}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
               >
                  Tiếp tục
               </button>
            )}

            {step === 'confirm' && (
               <button
                  onClick={onBookingSubmit}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
               >
                  Xác nhận đặt khám
               </button>
            )}
         </div>
      </div>
   )
)

BookingModelFooter.displayName = 'FooterSection'
