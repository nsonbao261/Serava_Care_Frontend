import { filterDoctors, searchDoctors as searchDoctorsUtils, sortDoctors } from '@/lib'
import { mockDoctors, mockDoctorDetails } from '@/data'

export async function getAllDoctors(): Promise<Doctor[]> {
   // Simulate API delay
   await new Promise((resolve) => setTimeout(resolve, 100))
   return mockDoctors
}

export async function getDoctorById(id: string): Promise<Doctor | null> {
   await new Promise((resolve) => setTimeout(resolve, 100))
   return mockDoctors.find((doctor) => doctor.id === id) || null
}

export async function getDoctorBySlug(slug: string): Promise<DoctorDetail | null> {
   await new Promise((resolve) => setTimeout(resolve, 100))
   const legacyDetail = mockDoctorDetails[slug]

   if (!legacyDetail) return null

   // Convert legacy format to new format
   const convertedDetail: DoctorDetail = {
      ...legacyDetail,
      languages: legacyDetail.languages.map((lang: string) => {
         switch (lang) {
            case 'Tiếng Việt':
               return 'vi'
            case 'English':
               return 'en'
            case '日本語':
               return 'ja'
            default:
               return 'en'
         }
      })
   }

   return convertedDetail
}

export async function searchDoctors(params: DoctorSearchParams): Promise<ApiResponse<Doctor[]>> {
   await new Promise((resolve) => setTimeout(resolve, 150))

   let results = mockDoctors

   // Apply search query
   if (params.query) {
      results = searchDoctorsUtils(results, params.query)
   }

   // Apply filters
   if (params.filters) {
      results = filterDoctors(results, params.filters)
   }

   // Apply sorting
   if (params.sortBy) {
      results = sortDoctors(results, params.sortBy, params.sortOrder)
   }

   // Apply pagination
   const page = params.page || 1
   const limit = params.limit || 10
   const startIndex = (page - 1) * limit
   const endIndex = startIndex + limit
   const paginatedResults = results.slice(startIndex, endIndex)

   const pagination: PaginationInfo = {
      page,
      limit,
      total: results.length,
      totalPages: Math.ceil(results.length / limit)
   }

   return {
      data: paginatedResults,
      status: 'success',
      pagination
   }
}

export async function getDoctorsBySpecialty(specialty: string): Promise<Doctor[]> {
   await new Promise((resolve) => setTimeout(resolve, 100))
   return mockDoctors.filter((doctor) =>
      doctor.specialty?.toLowerCase().includes(specialty.toLowerCase())
   )
}

export async function getFeaturedDoctors(limit: number = 6): Promise<Doctor[]> {
   await new Promise((resolve) => setTimeout(resolve, 100))
   return mockDoctors
      .filter((doctor) => doctor.rating >= 4.7)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit)
}
