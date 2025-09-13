interface Specialty {
   id: string
   name: string
   slug: string
   description: string
   doctorCount: string
   imageUrl: string
   category: SpecialtyCategory
}

interface SpecialtyDetail {
   id: string
   name: string
   slug: string
   description: string
   imageUrl: string
   doctors: Doctor[]
}

type SpecialtyCategory =
   | 'all'
   | 'noi-khoa'
   | 'ngoai-khoa'
   | 'can-lam-sang'
   | 'phuc-hoi'
   | 'chuyen-khoa'
