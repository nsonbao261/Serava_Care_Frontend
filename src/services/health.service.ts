import { mockMedicalRecords, mockVitalSigns } from '@/data'

export async function getVitalSigns(): Promise<VitalSign[]> {
   // Simulate API call
   await new Promise((resolve) => setTimeout(resolve, 800))

   // Return mock data
   return mockVitalSigns
}

export async function getMedicalRecords(): Promise<MedicalRecord[]> {
   // Simulate API call
   await new Promise((resolve) => setTimeout(resolve, 1000))

   // Return mock data
   return mockMedicalRecords
}

export async function addVitalSign(data: Omit<VitalSign, 'id'>): Promise<VitalSign> {
   // Simulate API call
   await new Promise((resolve) => setTimeout(resolve, 500))

   return {
      ...data,
      id: Math.random().toString(36).substr(2, 9)
   }
}

export async function updateVitalSign(id: string, data: Partial<VitalSign>): Promise<VitalSign> {
   // Simulate API call
   await new Promise((resolve) => setTimeout(resolve, 500))

   // Mock update
   const existing = mockVitalSigns.find((v) => v.id === id)
   if (!existing) {
      throw new Error('Vital sign not found')
   }

   return { ...existing, ...data }
}

export async function deleteVitalSign(): Promise<void> {
   // Simulate API call
   await new Promise((resolve) => setTimeout(resolve, 300))

   // Mock deletion - in real app would remove from database
}
