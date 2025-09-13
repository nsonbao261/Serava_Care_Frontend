import { mockSpecialties, mockSpecialtyDetail } from '@/data'

export async function getAllSpecialties(): Promise<Specialty[]> {
   try {
      await new Promise((resolve) => setTimeout(resolve, 800))
      return mockSpecialties
   } catch {
      throw new Error('Không thể tải danh sách chuyên khoa từ server')
   }
}

export async function getSpecialtyBySlug(slug: string): Promise<SpecialtyDetail | undefined> {
   try {
      await new Promise((resolve) => setTimeout(resolve, 800))
      return mockSpecialtyDetail.find(specialty => specialty.slug = slug);
   } catch {
      throw new Error('Không thể tải chuyên khoa từ server')
   }
}
