import { mockDoctors } from '@/data'

export async function getAllDoctors(): Promise<Doctor[]> {
   try {
      await new Promise((resolve) => setTimeout(resolve, 800))
      return mockDoctors
   } catch {
      throw new Error('Không thể tải danh sách bác sĩ từ server')
   }
}
