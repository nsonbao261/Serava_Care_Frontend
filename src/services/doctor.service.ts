import { mockDoctors, mockDoctorDetails } from '@/data'

export async function getAllDoctors(): Promise<Doctor[]> {
   try {
      await new Promise((resolve) => setTimeout(resolve, 800))
      return mockDoctors
   } catch {
      throw new Error('Không thể tải danh sách bác sĩ từ server')
   }
}

export async function getDoctorBySlug(slug: string): Promise<DoctorDetail | undefined> {
   try {
      await new Promise((resolve) => setTimeout(resolve, 800))
      return mockDoctorDetails.find(doctor => doctor.slug == slug)
   } catch {
      throw new Error('Không thể tải thông tin bác sĩ từ server')
   }
}
