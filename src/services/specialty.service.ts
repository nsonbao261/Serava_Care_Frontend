import {} from '@/data/specialty-category.list.mock'
import { mockSpecialtiesWithCategory, mockTreatments, mockProceduresMap, mockFAQs } from '@/data'

export async function getAllSpecialties(): Promise<SpecialtyWithCategory[]> {
   try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800))

      return mockSpecialtiesWithCategory
   } catch  {
      throw new Error('Không thể tải danh sách chuyên khoa từ server')
   }
}

export async function getSpecialtyBySlug(slug: string): Promise<SpecialtyPageData | null> {
   try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      const specialty = mockSpecialtiesWithCategory.find((s) => s.slug === slug)
      if (!specialty) return null

      // Convert to page data format
      return {
         id: specialty.id,
         name: specialty.name,
         description: specialty.description,
         overview: specialty.description,
         commonConditions: getCommonConditions(specialty.id),
         treatments: getTreatments(),
         procedures: getProcedures(specialty.id),
         doctors: [],
         stats: getStats(),
         faqs: getFAQs(),
         relatedArticles: []
      }
   } catch  {
      throw new Error('Không thể tải thông tin chuyên khoa từ server')
   }
}

export async function getPopularSpecialties(limit: number = 8): Promise<SpecialtyWithCategory[]> {
   try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 400))

      const popular = mockSpecialtiesWithCategory
         .filter((specialty) => specialty.isPopular)
         .sort((a, b) => (a.order || 0) - (b.order || 0))

      return limit ? popular.slice(0, limit) : popular
   } catch  {
      throw new Error('Không thể tải danh sách chuyên khoa phổ biến từ server')
   }
}

export async function getSpecialtiesByCategory(category: string): Promise<SpecialtyWithCategory[]> {
   try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 600))

      return mockSpecialtiesWithCategory.filter((specialty) => specialty.category === category)
   } catch  {
      throw new Error('Không thể tải danh sách chuyên khoa theo danh mục từ server')
   }
}

export async function searchSpecialties(
   query: string,
   filters?: SpecialtyFilters
): Promise<SpecialtySearchResult[]> {
   try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 700))

      let results = mockSpecialtiesWithCategory

      // Filter by category
      if (filters?.category) {
         results = results.filter((s) => s.category === filters.category)
      }

      // Filter by popular only
      if (filters?.popularOnly) {
         results = results.filter((s) => s.isPopular)
      }

      // Text search
      if (query.trim()) {
         const searchTerms = query
            .toLowerCase()
            .split(' ')
            .filter((term) => term.length > 0)
         results = results.filter((specialty) => {
            const searchableText = [
               specialty.name,
               specialty.description,
               specialty.shortDescription || ''
            ]
               .join(' ')
               .toLowerCase()

            return searchTerms.every((term) => searchableText.includes(term))
         })
      }

      return results.map((specialty) => ({
         ...specialty,
         matchScore: calculateMatchScore(specialty, query),
         relevantDoctors: []
      }))
   } catch  {
      throw new Error('Không thể tìm kiếm chuyên khoa')
   }
}

export async function getSpecialtyStats(): Promise<SpecialtyStats> {
   try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 300))

      return getStats()
   } catch  {
      throw new Error('Không thể tải thống kê chuyên khoa từ server')
   }
}

function calculateMatchScore(specialty: SpecialtyWithCategory, query: string): number {
   if (!query.trim()) return 1

   const searchTerms = query
      .toLowerCase()
      .split(' ')
      .filter((term) => term.length > 0)
   const name = specialty.name.toLowerCase()
   const description = specialty.description.toLowerCase()

   let score = 0
   searchTerms.forEach((term) => {
      if (name.includes(term)) score += 3
      if (description.includes(term)) score += 1
   })

   return score / searchTerms.length
}

function getStats(): SpecialtyStats {
   // Mock stats data
   return {
      doctorCount: Math.floor(Math.random() * 20) + 5,
      averageRating: 4.2 + Math.random() * 0.6,
      totalConsultations: Math.floor(Math.random() * 1000) + 500,
      averageFee: Math.floor(Math.random() * 200000) + 150000,
      mostCommonConditions: [
         { condition: 'Tư vấn thường quy', percentage: 35 },
         { condition: 'Khám định kỳ', percentage: 28 },
         { condition: 'Tái khám', percentage: 22 },
         { condition: 'Cấp cứu', percentage: 15 }
      ]
   }
}

function getCommonConditions(specialtyId: string): string[] {
   const conditionsMap: { [key: string]: string[] } = {
      'tim-mach': ['Cao huyết áp', 'Bệnh mạch vành', 'Rối loạn nhịp tim', 'Suy tim'],
      'nhi-khoa': ['Sốt ở trẻ em', 'Tiêu chảy', 'Ho cảm cúm', 'Rối loạn tiêu hóa'],
      'than-kinh': ['Đau đầu', 'Chóng mặt', 'Rối loạn giấc ngủ', 'Stress'],
      mat: ['Cận thị', 'Viêm kết mạc', 'Khô mắt', 'Tăng nhãn áp'],
      default: ['Khám tổng quát', 'Tư vấn sức khỏe', 'Điều trị bệnh lý', 'Theo dõi bệnh']
   }
   return conditionsMap[specialtyId] || conditionsMap.default
}

function getTreatments(): string[] {
   return mockTreatments
}

function getProcedures(specialtyId: string): string[] {
   return mockProceduresMap[specialtyId] || mockProceduresMap.default
}

function getFAQs() {
   return mockFAQs
}
