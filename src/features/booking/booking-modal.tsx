'use client'

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Calendar, Clock, CreditCard, MapPin, User, X } from 'lucide-react'
import Image from 'next/image'

interface BookingForm {
   date: string
   time: string
   patientName: string
   patientPhone: string
   reason: string
}

interface DateOption {
   date: string
   day: number
   weekday: string
   month: number
}

interface TimeSlot {
   time: string
   available: boolean
}

interface Props {
   doctor: Doctor
   isOpen: boolean
   onClose: () => void
}

export const BookingModal = ({ doctor, isOpen, onClose }: Props) => {
   const timeSlots: TimeSlot[] = [
      { time: '08:00', available: true },
      { time: '08:30', available: true },
      { time: '09:00', available: false },
      { time: '09:30', available: true },
      { time: '10:00', available: true },
      { time: '10:30', available: false },
      { time: '11:00', available: true },
      { time: '14:00', available: true },
      { time: '14:30', available: true },
      { time: '15:00', available: false },
      { time: '15:30', available: true },
      { time: '16:00', available: true },
      { time: '16:30', available: true },
      { time: '17:00', available: true }
   ]

   const initialFormState: BookingForm = {
      date: '',
      time: '',
      patientName: '',
      patientPhone: '',
      reason: ''
   }

   const modalVariants = {
      hidden: { opacity: 0, scale: 0.95, y: 20 },
      visible: { opacity: 1, scale: 1, y: 0 },
      exit: { opacity: 0, scale: 0.95, y: 20 }
   }

   const backdropVariants = {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
      exit: { opacity: 0 }
   }

   const [step, setStep] = useState<'datetime' | 'info' | 'confirm'>('datetime')
   const [selectedDate, setSelectedDate] = useState<string>('')
   const [selectedTime, setSelectedTime] = useState<string>('')
   const [bookingForm, setBookingForm] = useState<BookingForm>(initialFormState)
   const modalRef = useRef<HTMLDivElement>(null)

   const dates = useMemo<DateOption[]>(() => {
      const dateOptions: DateOption[] = []
      const today = new Date()
      for (let i = 0; i < 14; i++) {
         const date = new Date(today)
         date.setDate(today.getDate() + i)
         dateOptions.push({
            date: date.toISOString().split('T')[0],
            day: date.getDate(),
            weekday: date.toLocaleDateString('vi-VN', { weekday: 'short' }),
            month: date.getMonth() + 1
         })
      }
      return dateOptions
   }, [])

   const isDateTimeValid = useMemo(() => {
      return Boolean(selectedDate && selectedTime)
   }, [selectedDate, selectedTime])

   const isInfoValid = useMemo(() => {
      return Boolean(bookingForm.patientName.trim() && bookingForm.patientPhone.trim())
   }, [bookingForm.patientName, bookingForm.patientPhone])

   const handleDateTimeNext = useCallback(() => {
      if (isDateTimeValid) {
         setBookingForm((prev) => ({
            ...prev,
            date: selectedDate,
            time: selectedTime
         }))
         setStep('info')
      }
   }, [isDateTimeValid, selectedDate, selectedTime])

   const handleInfoNext = useCallback(() => {
      if (isInfoValid) {
         setStep('confirm')
      }
   }, [isInfoValid])

   const handleBookingSubmit = useCallback(() => {
      console.log('Booking submitted:', bookingForm)
      alert('Đặt khám thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.')
      onClose()
      // Reset form
      setStep('datetime')
      setSelectedDate('')
      setSelectedTime('')
      setBookingForm(initialFormState)
   }, [bookingForm, onClose])

   const handleClose = useCallback(() => {
      onClose()
      // Reset form when closing
      setStep('datetime')
      setSelectedDate('')
      setSelectedTime('')
      setBookingForm(initialFormState)
   }, [onClose])

   useEffect(() => {
      const handleEscape = (event: KeyboardEvent) => {
         if (event.key === 'Escape' && isOpen) {
            handleClose()
         }
      }

      if (isOpen) {
         document.addEventListener('keydown', handleEscape)
         document.body.style.overflow = 'hidden'
      }

      return () => {
         document.removeEventListener('keydown', handleEscape)
         document.body.style.overflow = 'unset'
      }
   }, [isOpen, handleClose])

   // Memoized form update handlers
   const updateBookingForm = useCallback((field: keyof BookingForm, value: string) => {
      setBookingForm((prev) => ({
         ...prev,
         [field]: value
      }))
   }, [])

   const handleStepBack = useCallback(() => {
      setStep(step === 'info' ? 'datetime' : 'info')
   }, [step])

   // Handle backdrop click with proper event handling
   const handleBackdropClick = useCallback(
      (e: React.MouseEvent) => {
         if (e.target === e.currentTarget) {
            handleClose()
         }
      },
      [handleClose]
   )

   return (
      <AnimatePresence mode="wait">
         {isOpen && (
            <>
               {/* Backdrop */}
               <motion.div
                  variants={backdropVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="fixed inset-0 w-screen h-screen bg-black/70 backdrop-blur-sm z-50"
                  onClick={handleBackdropClick}
               />

               {/* Modal Container */}
               <motion.div
                  ref={modalRef}
                  variants={modalVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                  className="fixed inset-0 w-screen h-screen z-50 flex items-center justify-center p-4 md:p-6"
               >
                  {/* Modal Content */}
                  <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[85vh] min-h-[450px] flex flex-col overflow-hidden">
                     {/* Header - Fixed height */}
                     <div className="flex-shrink-0">
                        <BookingModelHeader doctor={doctor} step={step} onClose={handleClose} />
                     </div>

                     {/* Content */}
                     <div className="flex-1 overflow-y-auto p-6">
                        {step === 'datetime' && (
                           <DateTimeStep
                              dates={dates}
                              timeSlots={timeSlots}
                              selectedDate={selectedDate}
                              selectedTime={selectedTime}
                              onDateSelect={setSelectedDate}
                              onTimeSelect={setSelectedTime}
                           />
                        )}

                        {step === 'info' && (
                           <PatientInfoStep
                              bookingForm={bookingForm}
                              onFormUpdate={updateBookingForm}
                           />
                        )}

                        {step === 'confirm' && (
                           <ConfirmationStep doctor={doctor} bookingForm={bookingForm} />
                        )}
                     </div>

                     {/* Footer */}
                     <div className="flex-shrink-0 border-t border-gray-200">
                        <BookingModelFooter
                           step={step}
                           isDateTimeValid={isDateTimeValid}
                           isInfoValid={isInfoValid}
                           onStepBack={handleStepBack}
                           onDateTimeNext={handleDateTimeNext}
                           onInfoNext={handleInfoNext}
                           onBookingSubmit={handleBookingSubmit}
                        />
                     </div>
                  </div>
               </motion.div>
            </>
         )}
      </AnimatePresence>
   )
}

const BookingModelHeader = ({
   doctor,
   step,
   onClose
}: {
   doctor: Doctor
   step: 'datetime' | 'info' | 'confirm'
   onClose: () => void
}) => (
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
)

const BookingModelFooter = ({
   step,
   isDateTimeValid,
   isInfoValid,
   onStepBack,
   onDateTimeNext,
   onInfoNext,
   onBookingSubmit
}: {
   step: 'datetime' | 'info' | 'confirm'
   isDateTimeValid: boolean
   isInfoValid: boolean
   onStepBack: () => void
   onDateTimeNext: () => void
   onInfoNext: () => void
   onBookingSubmit: () => void
}) => (
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

const ConfirmationStep = ({
   doctor,
   bookingForm
}: {
   doctor: Doctor
   bookingForm: BookingForm
}) => (
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
)

const DateTimeStep = ({
   dates,
   timeSlots,
   selectedDate,
   selectedTime,
   onDateSelect,
   onTimeSelect
}: {
   dates: DateOption[]
   timeSlots: TimeSlot[]
   selectedDate: string
   selectedTime: string
   onDateSelect: (date: string) => void
   onTimeSelect: (time: string) => void
}) => (
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

const PatientInfoStep = ({
   bookingForm,
   onFormUpdate
}: {
   bookingForm: BookingForm
   onFormUpdate: (field: keyof BookingForm, value: string) => void
}) => (
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
)
