import { Doctor } from '@/types'

export interface BookingModalProps {
   doctor: Doctor
   isOpen: boolean
   onClose: () => void
}

export interface TimeSlot {
   time: string
   available: boolean
}

export interface BookingForm {
   date: string
   time: string
   patientName: string
   patientPhone: string
   reason: string
}

export interface DateOption {
   date: string
   day: number
   weekday: string
   month: number
}

export interface DateTimeStepProps {
   dates: DateOption[]
   timeSlots: TimeSlot[]
   selectedDate: string
   selectedTime: string
   onDateSelect: (date: string) => void
   onTimeSelect: (time: string) => void
}

export interface PatientInfoStepProps {
   bookingForm: BookingForm
   onFormUpdate: (field: keyof BookingForm, value: string) => void
}

export interface ConfirmationStepProps {
   doctor: Doctor
   bookingForm: BookingForm
}

export interface HeaderSectionProps {
   doctor: Doctor
   step: 'datetime' | 'info' | 'confirm'
   onClose: () => void
}

export interface FooterSectionProps {
   step: 'datetime' | 'info' | 'confirm'
   isDateTimeValid: boolean
   isInfoValid: boolean
   onStepBack: () => void
   onDateTimeNext: () => void
   onInfoNext: () => void
   onBookingSubmit: () => void
}
