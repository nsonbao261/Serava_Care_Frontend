import { TimeSlot, BookingForm } from './types'

// Memoized time slots to prevent recreation on every render
export const timeSlots: TimeSlot[] = [
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

// Initial form state to prevent recreation
export const initialFormState: BookingForm = {
   date: '',
   time: '',
   patientName: '',
   patientPhone: '',
   reason: ''
}

// Animation variants for better performance
export const modalVariants = {
   hidden: { opacity: 0, scale: 0.95, y: 20 },
   visible: { opacity: 1, scale: 1, y: 0 },
   exit: { opacity: 0, scale: 0.95, y: 20 }
}

export const backdropVariants = {
   hidden: { opacity: 0 },
   visible: { opacity: 1 },
   exit: { opacity: 0 }
}
