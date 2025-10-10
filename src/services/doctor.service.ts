import { mockDoctors, mockDoctorDetails, mockDoctorProfile } from '@/data'
import { request } from '@/libs'

export async function getAllDoctors(): Promise<Doctor[]> {
   try {
      await new Promise((resolve) => setTimeout(resolve, 800))

      // Error
      // const response = await request<Doctor[]>('staffs/')
      // console.log(response.data?.items?.[0]?.introduction)

      // OK nhưng sai kiểu
      // const response = await request('staffs/')
      // console.log(response.data)

      return mockDoctors
   } catch {
      throw new Error('Không thể tải danh sách bác sĩ từ server')
   }
}

export async function getDoctorBySlug(slug: string): Promise<DoctorDetail | undefined> {
   try {
      await new Promise((resolve) => setTimeout(resolve, 800))
      return mockDoctorDetails.find((doctor) => doctor.slug == slug)
   } catch {
      throw new Error('Không thể tải thông tin bác sĩ từ server')
   }
}

export async function getDoctorProfile(): Promise<DoctorProfile | undefined> {
   try {
      await new Promise((resolve) => setTimeout(resolve, 800))
      return mockDoctorProfile
   } catch {
      throw new Error('Không thể tải thông tin bác sĩ từ server')
   }
}
