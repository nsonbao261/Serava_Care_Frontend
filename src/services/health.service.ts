import { mockMedicalRecords, mockVitalSigns } from '@/data'

export async function getVitalSigns(): Promise<VitalSign[]> {
   try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800))

      // Return mock data
      return mockVitalSigns
   } catch  {
      throw new Error('Không thể tải dữ liệu chỉ số sức khỏe từ server')
   }
}

export async function getMedicalRecords(): Promise<MedicalRecord[]> {
   try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Return mock data
      return mockMedicalRecords
   } catch  {
      throw new Error('Không thể tải dữ liệu hồ sơ bệnh án từ server')
   }
}

export async function addVitalSign(data: Omit<VitalSign, 'id'>): Promise<VitalSign> {
   try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      return {
         ...data,
         id: Math.random().toString(36).substr(2, 9)
      }
   } catch  {
      throw new Error('Không thể thêm chỉ số sức khỏe')
   }
}

export async function updateVitalSign(id: string, data: Partial<VitalSign>): Promise<VitalSign> {
   try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Mock update
      const existing = mockVitalSigns.find((v) => v.id === id)
      if (!existing) {
         throw new Error('Không tìm thấy chỉ số sức khỏe')
      }

      return { ...existing, ...data }
   } catch  {
      throw new Error('Không thể cập nhật chỉ số sức khỏe')
   }
}

export async function deleteVitalSign(): Promise<void> {
   try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 300))

      // Mock deletion - in real app would remove from database
   } catch  {
      throw new Error('Không thể xóa chỉ số sức khỏe')
   }
}
