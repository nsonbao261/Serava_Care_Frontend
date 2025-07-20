'use client'

import { memo } from 'react'
import { Calendar, Clock } from 'lucide-react'
import { DateTimeStepProps } from './types'

export const DateTimeStep = memo(
   ({
      dates,
      timeSlots,
      selectedDate,
      selectedTime,
      onDateSelect,
      onTimeSelect
   }: DateTimeStepProps) => (
      <div className="space-y-6">
         {/* Date Selection */}
         <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
               <Calendar className="w-5 h-5 mr-2 text-blue-600" />
               Chọn ngày khám
            </h3>
            <div className="grid grid-cols-7 gap-2">
               {dates.map((date) => (
                  <button
                     key={date.date}
                     onClick={() => onDateSelect(date.date)}
                     className={`p-3 text-center rounded-lg border transition-all duration-200 ${
                        selectedDate === date.date
                           ? 'bg-blue-600 text-white border-blue-600 shadow-lg'
                           : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                     }`}
                  >
                     <div className="text-xs text-current opacity-75">{date.weekday}</div>
                     <div className="text-lg font-semibold">{date.day}</div>
                     <div className="text-xs text-current opacity-75">T{date.month}</div>
                  </button>
               ))}
            </div>
         </div>

         {/* Time Selection */}
         <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
               <Clock className="w-5 h-5 mr-2 text-blue-600" />
               Chọn giờ khám
            </h3>
            <div className="grid grid-cols-4 gap-3">
               {timeSlots.map((slot) => (
                  <button
                     key={slot.time}
                     onClick={() => slot.available && onTimeSelect(slot.time)}
                     disabled={!slot.available}
                     className={`p-3 rounded-lg font-medium transition-all duration-200 ${
                        selectedTime === slot.time
                           ? 'bg-blue-600 text-white shadow-lg'
                           : slot.available
                             ? 'bg-white text-gray-700 border border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                             : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                     }`}
                  >
                     {slot.time}
                  </button>
               ))}
            </div>
         </div>
      </div>
   )
)

DateTimeStep.displayName = 'DateTimeStep'
