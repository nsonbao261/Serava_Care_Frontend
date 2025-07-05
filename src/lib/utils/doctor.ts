import { Doctor, DoctorFilters, DoctorSortBy, SortOrder } from '@/types'

/**
 * Filter doctors based on the provided criteria
 */
export function filterDoctors(doctors: Doctor[], filters: DoctorFilters): Doctor[] {
   return doctors.filter((doctor) => {
      // Filter by specialty
      if (filters.specialty && filters.specialty !== 'Tất cả chuyên khoa') {
         if (!doctor.specialty?.toLowerCase().includes(filters.specialty.toLowerCase())) {
            return false
         }
      }

      // Filter by location
      if (filters.location && filters.location !== 'Tất cả địa điểm') {
         if (!doctor.location?.toLowerCase().includes(filters.location.toLowerCase())) {
            return false
         }
      }

      // Filter by minimum rating
      if (filters.minRating && doctor.rating < filters.minRating) {
         return false
      }

      // Filter by maximum consultation fee
      if (filters.maxFee) {
         const fee = parseConsultationFee(doctor.consultationFee)
         if (fee > filters.maxFee) {
            return false
         }
      }

      // Filter by minimum experience
      if (filters.minExperience) {
         const experience = parseExperience(doctor.experience)
         if (experience < filters.minExperience) {
            return false
         }
      }

      // Filter by verified status
      if (filters.verified !== undefined && doctor.verified !== filters.verified) {
         return false
      }

      // Filter by gender
      if (filters.gender && doctor.gender !== filters.gender) {
         return false
      }

      return true
   })
}

/**
 * Search doctors by query string
 */
export function searchDoctors(doctors: Doctor[], query: string): Doctor[] {
   if (!query.trim()) return doctors

   const searchTerms = query
      .toLowerCase()
      .split(' ')
      .filter((term) => term.length > 0)

   return doctors.filter((doctor) => {
      const searchableText = [
         doctor.name,
         doctor.title,
         doctor.specialty,
         doctor.hospital,
         doctor.location,
         ...(doctor.subSpecialties || [])
      ]
         .join(' ')
         .toLowerCase()

      return searchTerms.every((term) => searchableText.includes(term))
   })
}

/**
 * Sort doctors by specified criteria
 */
export function sortDoctors(
   doctors: Doctor[],
   sortBy: DoctorSortBy,
   order: SortOrder = 'asc'
): Doctor[] {
   const sortedDoctors = [...doctors].sort((a, b) => {
      let comparison = 0

      switch (sortBy) {
         case 'name':
            comparison = a.name.localeCompare(b.name)
            break
         case 'rating':
            comparison = a.rating - b.rating
            break
         case 'experience':
            comparison = parseExperience(a.experience) - parseExperience(b.experience)
            break
         case 'consultationFee':
            comparison =
               parseConsultationFee(a.consultationFee) - parseConsultationFee(b.consultationFee)
            break
         case 'reviewCount':
            comparison = (a.reviewCount || 0) - (b.reviewCount || 0)
            break
      }

      return order === 'desc' ? -comparison : comparison
   })

   return sortedDoctors
}

/**
 * Parse consultation fee string to number
 */
export function parseConsultationFee(fee: string): number {
   const numericString = fee.replace(/[^\d]/g, '')
   return parseInt(numericString) || 0
}

/**
 * Parse experience string to number of years
 */
export function parseExperience(experience: string): number {
   const match = experience.match(/(\d+)/)
   return match ? parseInt(match[1]) : 0
}
