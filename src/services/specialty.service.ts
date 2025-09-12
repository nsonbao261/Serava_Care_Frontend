import { mockSpecialties } from '@/data'

export async function getAllSpecialties(): Promise<Specialty[]> {
   try {
      await new Promise((resolve) => setTimeout(resolve, 800))
      return mockSpecialties
   } catch {
      throw new Error('Không thể tải danh sách chuyên khoa từ server')
   }
}
