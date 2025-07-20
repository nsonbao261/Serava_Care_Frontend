export interface ApiResponse<T> {
   data: T
   message?: string
   status: 'success' | 'error'
   pagination?: PaginationInfo
}

export interface PaginationInfo {
   page: number
   limit: number
   total: number
   totalPages: number
}

export interface SearchFilters {
   query?: string
   specialty?: string
   location?: string
   rating?: number
   page?: number
   limit?: number
}

export interface ContactInfo {
   phone?: string
   email?: string
   address?: string
   website?: string
}

export interface SocialLinks {
   facebook?: string
   twitter?: string
   linkedin?: string
   instagram?: string
}

export interface ImageInfo {
   url: string
   alt: string
   width?: number
   height?: number
}

export interface Article {
   id: string
   title: string
   excerpt?: string
   content?: string
   publishDate: string
   readTime: string
   author?: string
   tags?: string[]
   image?: ImageInfo
}

export interface Review {
   id: string
   rating: number
   comment: string
   patientName: string
   date: string
   helpful?: number
}

// Utility types
export type Status = 'active' | 'inactive' | 'pending' | 'suspended'
export type Language = 'vi' | 'en' | 'ja' | 'ko' | 'zh'

// Form validation types
export interface ValidationError {
   field: string
   message: string
}

export interface FormState {
   isSubmitting: boolean
   errors: ValidationError[]
   touched: Record<string, boolean>
}
