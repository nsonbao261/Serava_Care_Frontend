interface SpecialtyInfo {
   specialityId: string // UUID
   specialitiyName: string
}

interface Doctor {
   staffId: string // UUID
   slug: string
   fullName: string
   title?: string
   imageUrl?: string
   primarySpeciality?: SpecialtyInfo
   secondarySpecialities?: SpecialtyInfo[]
   hospital: string
   location: string
   address: string
   introduction: string
   consultationFee: number
   experience: string
   phoneNumber: string
   email: string
   achievements: string[]
   educations: string[]
   rating: number
   totalRatings: number
}

interface DoctorDetail extends Doctor {
   articles: Array<{
      id: string
      title: string
      publishDate: string
      readTime: string
   }>
}

interface DoctorProfile {
   id: string
   name: string
   slug: string
   imageUrl?: string
   email: string
   phone: string
   about: string
   education: string[]
   achievements: string[]
   languages: string[]
   title: string
   specialty: string
   experience: string
   hospital: string
   location: string
   consultationFee: string
}
