interface BookingModalProps {
   doctor: Doctor
   isOpen: boolean
   onClose: () => void
}

interface TimeSlot {
   time: string
   available: boolean
}

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

interface DateTimeStepProps {
   dates: DateOption[]
   timeSlots: TimeSlot[]
   selectedDate: string
   selectedTime: string
   onDateSelect: (date: string) => void
   onTimeSelect: (time: string) => void
}

interface PatientInfoStepProps {
   bookingForm: BookingForm
   onFormUpdate: (field: keyof BookingForm, value: string) => void
}

interface ConfirmationStepProps {
   doctor: Doctor
   bookingForm: BookingForm
}

interface HeaderSectionProps {
   doctor: Doctor
   step: 'datetime' | 'info' | 'confirm'
   onClose: () => void
}

interface FooterSectionProps {
   step: 'datetime' | 'info' | 'confirm'
   isDateTimeValid: boolean
   isInfoValid: boolean
   onStepBack: () => void
   onDateTimeNext: () => void
   onInfoNext: () => void
   onBookingSubmit: () => void
}
