interface Doctor {
   id: string
   slug: string
   name: string
   title: string
   specialty?: string
   subSpecialties?: string[]
   experience: string
   hospital: string
   location?: string
   rating: number
   reviewCount?: number
   consultationFee: string
   image?: ImageInfo | string // Support both old and new format
   status?: Status
   gender?: Gender
   languages?: Language[]
   verified?: boolean

   // Contact information
   contact?: ContactInfo
   social?: SocialLinks
}

interface DoctorDetail extends Doctor {
   about: string
   education: string[]
   certifications?: string[]
   achievements: string[]
   specializations?: string[]
   workingHours: string

   // Legacy fields for backward compatibility
   phoneNumber?: string
   email?: string

   // Enhanced content
   articles?: Article[]
   reviews?: Review[]

   // Professional details
   licenseNumber?: string
   yearsOfExperience?: number
   patientCount?: number
   successRate?: number

   // Availability
   availableSlots?: AvailabilitySlot[]
   isAcceptingNewPatients?: boolean
}

interface AvailabilitySlot {
   id: string
   doctorId: string
   date: string
   startTime: string
   endTime: string
   isAvailable: boolean
   type: 'consultation' | 'checkup' | 'surgery'
}

// Utility types for doctor operations
type DoctorSortBy = 'name' | 'rating' | 'experience' | 'consultationFee' | 'reviewCount'
type SortOrder = 'asc' | 'desc'

interface DoctorFilters {
   specialty?: string
   subSpecialty?: string
   hospital?: string
   location?: string
   minRating?: number
   maxFee?: number
   minExperience?: number
   languages?: Language[]
   availability?: 'today' | 'thisWeek' | 'thisMonth'
   verified?: boolean
   gender?: Gender
}

interface DoctorSearchParams {
   query?: string
   filters?: DoctorFilters
   sortBy?: DoctorSortBy
   sortOrder?: SortOrder
   page?: number
   limit?: number
}

// Legacy type for backward compatibility - omit conflicting fields and redefine them
interface LegacyDoctorDetail extends Omit<Doctor, 'languages'> {
   about: string
   education: string[]
   achievements: string[]
   languages: string[] // Keep as string[] for backward compatibility
   workingHours: string
   phoneNumber: string
   email: string
   articles: Array<{
      id: string
      title: string
      publishDate: string
      readTime: string
   }>
}
