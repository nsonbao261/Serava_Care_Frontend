interface Doctor {
   id: string
   slug: string
   name: string
   title: string
   specialty?: string
   experience: string
   hospital: string
   location?: string
   rating: number
   reviewCount?: number
   consultationFee: string
   image?: ImageInfo | string
}

interface LegacyDoctorDetail extends Omit<Doctor, 'languages'> {
   about: string
   education: string[]
   achievements: string[]
   languages: string[]
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
