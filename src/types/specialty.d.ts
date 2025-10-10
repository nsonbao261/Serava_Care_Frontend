interface SpecialtyInfo {
   specialtyId: string // UUID
   slug: string
   name: string
   description?: string
   doctorCount?: number
   imageUrl?: string
   category?: string
   avgRating?: number
   totalRating?: number
}

interface SpecialtyDetail {
   id: string
   name: string
   slug: string
   description: string
}

type SpecialtyCategory =
   | 'all'
   | 'noi-khoa'
   | 'ngoai-khoa'
   | 'can-lam-sang'
   | 'phuc-hoi'
   | 'chuyen-khoa'
