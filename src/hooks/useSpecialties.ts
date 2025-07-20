import { useState, useEffect, useCallback } from 'react'
import {
   SpecialtyWithCategory,
   SpecialtyPageData,
   SpecialtyFilters,
   SpecialtySearchResult,
   SpecialtyStats
} from '@/types'
import { 
   getAllSpecialties,
   getPopularSpecialties,
   getSpecialtiesByCategory,
   getSpecialtyBySlug,
   searchSpecialties,
   getSpecialtyStats
} from '@/services'

interface UseSpecialtiesOptions {
   autoFetch?: boolean
   category?: string
   popularOnly?: boolean
}

interface UseSpecialtiesReturn {
   specialties: SpecialtyWithCategory[]
   isLoading: boolean
   error: string | null
   refetch: () => Promise<void>
   searchSpecialties: (
      query: string,
      filters?: SpecialtyFilters
   ) => Promise<SpecialtySearchResult[]>
}

export function useSpecialties(options: UseSpecialtiesOptions = {}): UseSpecialtiesReturn {
   const { autoFetch = true, category, popularOnly = false } = options

   const [specialties, setSpecialties] = useState<SpecialtyWithCategory[]>([])
   const [isLoading, setIsLoading] = useState(true)
   const [error, setError] = useState<string | null>(null)

   const fetchSpecialties = useCallback(async () => {
      try {
         setIsLoading(true)
         setError(null)

         let data: SpecialtyWithCategory[]

         if (popularOnly) {
            data = await getPopularSpecialties()
         } else if (category) {
            data = await getSpecialtiesByCategory(category)
         } else {
            data = await getAllSpecialties()
         }

         setSpecialties(data)
      } catch (err) {
         setError('Không thể tải danh sách chuyên khoa. Vui lòng thử lại.')
         console.error('Error fetching specialties:', err)
      } finally {
         setIsLoading(false)
      }
   }, [category, popularOnly])

   const searchSpecialtiesHandler = useCallback(async (query: string, filters?: SpecialtyFilters) => {
      try {
         return await searchSpecialties(query, filters)
      } catch (err) {
         console.error('Error searching specialties:', err)
         return []
      }
   }, [])

   useEffect(() => {
      if (autoFetch) {
         fetchSpecialties()
      }
   }, [autoFetch, fetchSpecialties])

   return {
      specialties,
      isLoading,
      error,
      refetch: fetchSpecialties,
      searchSpecialties: searchSpecialtiesHandler
   }
}

interface UseSpecialtyDetailOptions {
   slug: string
   autoFetch?: boolean
}

interface UseSpecialtyDetailReturn {
   specialty: SpecialtyPageData | null
   isLoading: boolean
   error: string | null
   refetch: () => Promise<void>
}

export function useSpecialtyDetail(options: UseSpecialtyDetailOptions): UseSpecialtyDetailReturn {
   const { slug, autoFetch = true } = options

   const [specialty, setSpecialty] = useState<SpecialtyPageData | null>(null)
   const [isLoading, setIsLoading] = useState(true)
   const [error, setError] = useState<string | null>(null)

   const fetchSpecialty = useCallback(async () => {
      if (!slug) return

      try {
         setIsLoading(true)
         setError(null)

         const data = await getSpecialtyBySlug(slug)
         setSpecialty(data)

         if (!data) {
            setError('Không tìm thấy chuyên khoa.')
         }
      } catch (err) {
         setError('Không thể tải thông tin chuyên khoa. Vui lòng thử lại.')
         console.error('Error fetching specialty detail:', err)
      } finally {
         setIsLoading(false)
      }
   }, [slug])

   useEffect(() => {
      if (autoFetch && slug) {
         fetchSpecialty()
      }
   }, [autoFetch, slug, fetchSpecialty])

   return {
      specialty,
      isLoading,
      error,
      refetch: fetchSpecialty
   }
}

interface UseSpecialtyStatsOptions {
   specialtyId: string
   autoFetch?: boolean
}

interface UseSpecialtyStatsReturn {
   stats: SpecialtyStats | null
   isLoading: boolean
   error: string | null
   refetch: () => Promise<void>
}

export function useSpecialtyStats(options: UseSpecialtyStatsOptions): UseSpecialtyStatsReturn {
   const { specialtyId, autoFetch = true } = options

   const [stats, setStats] = useState<SpecialtyStats | null>(null)
   const [isLoading, setIsLoading] = useState(true)
   const [error, setError] = useState<string | null>(null)

   const fetchStats = useCallback(async () => {
      if (!specialtyId) return

      try {
         setIsLoading(true)
         setError(null)

         const data = await getSpecialtyStats()
         setStats(data)
      } catch (err) {
         setError('Không thể tải thống kê chuyên khoa.')
         console.error('Error fetching specialty stats:', err)
      } finally {
         setIsLoading(false)
      }
   }, [specialtyId])

   useEffect(() => {
      if (autoFetch && specialtyId) {
         fetchStats()
      }
   }, [autoFetch, specialtyId, fetchStats])

   return {
      stats,
      isLoading,
      error,
      refetch: fetchStats
   }
}
