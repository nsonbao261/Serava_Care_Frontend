import { mockDoctors, mockDoctorDetails } from '@/data'

export async function getAllDoctors(): Promise<Doctor[]> {
   try {
      await new Promise((resolve) => setTimeout(resolve, 800))
      return mockDoctors
   } catch {
      throw new Error('Không thể tải danh sách bác sĩ từ server')
   }
}

export async function getDoctorById(id: string): Promise<DoctorDetail | null> {
   try {
      await new Promise((resolve) => setTimeout(resolve, 800))
      return mockDoctorDetails[id] || null
   } catch {
      throw new Error('Không thể tải thông tin bác sĩ từ server')
   }
}
