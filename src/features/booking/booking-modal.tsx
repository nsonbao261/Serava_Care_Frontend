'use client'

import { useState, useMemo, useCallback, memo, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { timeSlots, initialFormState, modalVariants, backdropVariants } from './constants'
import { BookingModelFooter } from './booking-modal-footer'
import { BookingModelHeader } from './booking-modal-header'
import { ConfirmationStep } from './confirmation-step'
import { DateTimeStep } from './datetime-step'
import { PatientInfoStep } from './patient-info-step'

export const BookingModal = memo(({ doctor, isOpen, onClose }: BookingModalProps) => {
   const [step, setStep] = useState<'datetime' | 'info' | 'confirm'>('datetime')
   const [selectedDate, setSelectedDate] = useState<string>('')
   const [selectedTime, setSelectedTime] = useState<string>('')
   const [bookingForm, setBookingForm] = useState<BookingForm>(initialFormState)
   const modalRef = useRef<HTMLDivElement>(null)

   // Memoize dates generation to prevent expensive recalculation on every render
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

   // Memoize validation states to prevent recalculation
   const isDateTimeValid = useMemo(() => {
      return Boolean(selectedDate && selectedTime)
   }, [selectedDate, selectedTime])

   const isInfoValid = useMemo(() => {
      return Boolean(bookingForm.patientName.trim() && bookingForm.patientPhone.trim())
   }, [bookingForm.patientName, bookingForm.patientPhone])

   // Memoized callbacks to prevent unnecessary re-renders
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
      // Here you would typically submit to your API
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

   // Handle escape key for better UX
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
})

BookingModal.displayName = 'BookingModal'
