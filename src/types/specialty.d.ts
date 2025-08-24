interface Specialty {
   id: string
   name: string
   slug: string
   description: string
   shortDescription?: string
   color: string
   doctorCount: string
   image: string
   order?: number
   category: SpecialtyCategory
}

interface SpecialtyDetail {
   id: string
   name: string
   description: string
   doctors: Doctor[]
}

type SpecialtyCategory = 'all' | 'noi-khoa' | 'ngoai-khoa' | 'can-lam-sang' | 'phuc-hoi' | 'chuyen-khoa';
