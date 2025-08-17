interface BookingOrder {
   id: string
   createdAt: Date
   updatedAt: Date
   orderNumber: string
   patientName: string
   patientPhone?: string
   patientEmail?: string
   patientAddress?: string
   doctorName: string
   doctorSpecialty: string
   doctorImage: string
   doctorPhone?: string
   doctorEmail?: string
   serviceType: 'telemedicine' | 'clinic' | 'home' | 'emergency'
   serviceName: string
   appointmentDate: string
   appointmentTime: string
   status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'rescheduled'
   totalAmount: string
   paymentStatus: 'pending' | 'paid' | 'refunded'
   paymentMethod?: string
   bookingDate: string
   hospital: string
   hospitalAddress?: string
   reason?: string
   notes?: string
   symptoms?: string[]
   medicalHistory?: string
   prescription?: string
   diagnosis?: string
   followUpDate?: string
}

interface BookingFilters {
   status: BookingOrder['status'] | 'all'
   searchQuery: string
   dateRange?: {
      from: string
      to: string
   }
}