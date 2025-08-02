'use client'

import { memo } from 'react'

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
      <div className="bg-white border-t border-gray-200 p-6">
         <div className="flex justify-between items-center">
            {step !== 'datetime' && (
               <button
                  onClick={onStepBack}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
               >
                  Quay lại
               </button>
            )}

            <div className="flex-1"></div>

            {step === 'datetime' && (
               <button
                  onClick={onDateTimeNext}
                  disabled={!isDateTimeValid}
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
               >
                  Tiếp tục
               </button>
            )}

            {step === 'info' && (
               <button
                  onClick={onInfoNext}
                  disabled={!isInfoValid}
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
               >
                  Tiếp tục
               </button>
            )}

            {step === 'confirm' && (
               <button
                  onClick={onBookingSubmit}
                  className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
               >
                  Xác nhận đặt khám
               </button>
            )}
         </div>
      </div>
   )
)

BookingModelFooter.displayName = 'FooterSection'
