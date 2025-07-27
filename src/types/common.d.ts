interface ApiResponse<T> {
   data: T
   message?: string
   status: 'success' | 'error'
   pagination?: PaginationInfo
}

interface PaginationInfo {
   page: number
   limit: number
   total: number
   totalPages: number
}

interface SearchFilters {
   query?: string
   specialty?: string
   location?: string
   rating?: number
   page?: number
   limit?: number
}

interface ContactInfo {
   phone?: string
   email?: string
   address?: string
   website?: string
}

interface SocialLinks {
   facebook?: string
   twitter?: string
   linkedin?: string
   instagram?: string
}

interface ImageInfo {
   url: string
   alt: string
   width?: number
   height?: number
}

interface Article {
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

interface Review {
   id: string
   rating: number
   comment: string
   patientName: string
   date: string
   helpful?: number
}

// Utility types
type Status = 'active' | 'inactive' | 'pending' | 'suspended'
type Language = 'vi' | 'en' | 'ja' | 'ko' | 'zh'

// Form validation types
interface ValidationError {
   field: string
   message: string
}

interface FormState {
   isSubmitting: boolean
   errors: ValidationError[]
   touched: Record<string, boolean>
}
