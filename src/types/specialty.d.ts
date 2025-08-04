interface SpecialtyCard {
   id: string
   name: string
   slug: string
   description: string
   shortDescription?: string
   icon: React.ComponentType<{ className?: string }>
   color: string
   doctorCount: string
   image?: ImageInfo
   isPopular?: boolean
   order?: number
}

type SpecialtyCategory = 'noi-khoa' | 'ngoai-khoa' | 'can-lam-sang' | 'phuc-hoi' | 'chuyen-khoa'

interface SpecialtyWithCategory extends SpecialtyCard {
   category: SpecialtyCategory
   subCategories?: string[]
   relatedSpecialties?: string[]
}

interface SpecialtyPageData {
   id: string
   name: string
   description: string
   overview?: string
   commonConditions?: string[]
   treatments?: string[]
   procedures?: string[]
   doctors: Doctor[]
   stats?: SpecialtyStats
   faqs?: SpecialtyFAQ[]
   relatedArticles?: string[]
}

interface SpecialtyStats {
   doctorCount: number
   averageRating: number
   totalConsultations: number
   averageFee: number
   mostCommonConditions: Array<{
      condition: string
      percentage: number
   }>
}

interface SpecialtyFAQ {
   id: string
   question: string
   answer: string
   category?: string
   helpful?: number
}

// Utility types
interface SpecialtySearchResult extends SpecialtyWithCategory {
   matchScore?: number
   relevantDoctors?: Doctor[]
}

interface SpecialtyFilters {
   category?: SpecialtyCategory
   minDoctorCount?: number
   popularOnly?: boolean
   hasAvailableDoctors?: boolean
}

interface Specialty {
   value: string
   label: string
   description?: string
}
