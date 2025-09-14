interface BookingResult {
    id: string
    booking: {
        code: string
        status: string
        date: string
    }
    patient: {
        name: string
        phone: string
        email?: string
        address?: string
    }
    doctor: {
        name: string
        specialty: string
        imageUrl: string
        phone?: string
        email?: string
    }
    service: {
        type: string
        name: string
    }
    appointment: {
        date: string
        time: string
    }
    payment: {
        totalAmount: string
        status: string
        method: string
    }
    hospital: {
        name: string
        address: string
    }
    medicalRecord: {
        reason?: string
        notes?: string
        symptoms?: string[]
        medicalHistory?: string
        prescription?: string
        diagnosis?: string
        followUpDate?: string
    }
}
