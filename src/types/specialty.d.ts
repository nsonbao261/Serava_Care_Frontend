import { ImageInfo, Doctor } from '.'

export interface SpecialtyCard {
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

export type SpecialtyCategory =
   | 'noi-khoa'
   | 'ngoai-khoa'
   | 'can-lam-sang'
   | 'phuc-hoi'
   | 'chuyen-khoa'

export interface SpecialtyWithCategory extends SpecialtyCard {
   category: SpecialtyCategory
   subCategories?: string[]
   relatedSpecialties?: string[]
}

export interface SpecialtyPageData {
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

export interface SpecialtyStats {
   doctorCount: number
   averageRating: number
   totalConsultations: number
   averageFee: number
   mostCommonConditions: Array<{
      condition: string
      percentage: number
   }>
}

export interface SpecialtyFAQ {
   id: string
   question: string
   answer: string
   category?: string
   helpful?: number
}

// Utility types
export interface SpecialtySearchResult extends SpecialtyWithCategory {
   matchScore?: number
   relevantDoctors?: Doctor[]
}

export interface SpecialtyFilters {
   category?: SpecialtyCategory
   minDoctorCount?: number
   popularOnly?: boolean
   hasAvailableDoctors?: boolean
}

export interface Specialty {
   value: string
   label: string
   description?: string
}
