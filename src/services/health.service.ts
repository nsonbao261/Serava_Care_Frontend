import { mockMedicalRecords, mockVitalSigns } from '@/data'

export async function getVitalSigns(): Promise<VitalSign[]> {
   try {
      await new Promise((resolve) => setTimeout(resolve, 800))
      return mockVitalSigns
   } catch {
      throw new Error('Không thể tải dữ liệu chỉ số sức khỏe từ server')
   }
}

export async function getMedicalRecords(): Promise<MedicalRecord[]> {
   try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return mockMedicalRecords
   } catch {
      throw new Error('Không thể tải dữ liệu hồ sơ bệnh án từ server')
   }
}
