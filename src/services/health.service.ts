import { VitalSign, MedicalRecord } from '@/types'
import { mockVitalSigns, mockMedicalRecords } from '@/data'

export class HealthService {
   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   async getVitalSigns(_userId: string): Promise<VitalSign[]> {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800))

      // Return mock data
      return mockVitalSigns
   }

   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   async getMedicalRecords(_userId: string): Promise<MedicalRecord[]> {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Return mock data
      return mockMedicalRecords
   }

   async addVitalSign(data: Omit<VitalSign, 'id'>): Promise<VitalSign> {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      const newVitalSign: VitalSign = {
         ...data,
         id: Math.random().toString(36).substr(2, 9)
      }

      return newVitalSign
   }

   async updateVitalSign(id: string, data: Partial<VitalSign>): Promise<VitalSign> {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Mock update
      const existing = mockVitalSigns.find((v) => v.id === id)
      if (!existing) {
         throw new Error('Vital sign not found')
      }

      return { ...existing, ...data }
   }

   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   async deleteVitalSign(_id: string): Promise<void> {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 300))

      // Mock deletion - in real app would remove from database
   }
}
