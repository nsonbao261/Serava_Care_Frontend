import { useState, useEffect, useCallback } from 'react'
import { VitalSign, MedicalRecord } from '@/types'
import { HealthService } from '@/services'

const healthService = new HealthService()

export interface UseHealthDataReturn {
   // Data
   vitalSigns: VitalSign[]
   medicalRecords: MedicalRecord[]

   // Loading states
   isLoadingVitals: boolean
   isLoadingRecords: boolean

   // Error states
   vitalsError: string | null
   recordsError: string | null

   // Actions
   refreshVitalSigns: () => Promise<void>
   refreshMedicalRecords: () => Promise<void>
   addVitalSign: (data: Omit<VitalSign, 'id'>) => Promise<VitalSign>
   updateVitalSign: (id: string, data: Partial<VitalSign>) => Promise<VitalSign>
   deleteVitalSign: (id: string) => Promise<void>
}

export const useHealthData = (userId: string): UseHealthDataReturn => {
   const [vitalSigns, setVitalSigns] = useState<VitalSign[]>([])
   const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([])

   const [isLoadingVitals, setIsLoadingVitals] = useState(true)
   const [isLoadingRecords, setIsLoadingRecords] = useState(true)

   const [vitalsError, setVitalsError] = useState<string | null>(null)
   const [recordsError, setRecordsError] = useState<string | null>(null)

   const refreshVitalSigns = useCallback(async () => {
      try {
         setIsLoadingVitals(true)
         setVitalsError(null)
         const data = await healthService.getVitalSigns(userId)
         setVitalSigns(data)
      } catch (error) {
         setVitalsError(
            error instanceof Error ? error.message : 'Không thể tải dữ liệu chỉ số sức khỏe'
         )
      } finally {
         setIsLoadingVitals(false)
      }
   }, [userId])

   const refreshMedicalRecords = useCallback(async () => {
      try {
         setIsLoadingRecords(true)
         setRecordsError(null)
         const data = await healthService.getMedicalRecords(userId)
         setMedicalRecords(data)
      } catch (error) {
         setRecordsError(
            error instanceof Error ? error.message : 'Không thể tải dữ liệu hồ sơ bệnh án'
         )
      } finally {
         setIsLoadingRecords(false)
      }
   }, [userId])

   const addVitalSign = useCallback(async (data: Omit<VitalSign, 'id'>) => {
      const newVitalSign = await healthService.addVitalSign(data)
      setVitalSigns((prev) => [newVitalSign, ...prev])
      return newVitalSign
   }, [])

   const updateVitalSign = useCallback(async (id: string, data: Partial<VitalSign>) => {
      const updatedVitalSign = await healthService.updateVitalSign(id, data)
      setVitalSigns((prev) => prev.map((vs) => (vs.id === id ? updatedVitalSign : vs)))
      return updatedVitalSign
   }, [])

   const deleteVitalSign = useCallback(async (id: string) => {
      await healthService.deleteVitalSign(id)
      setVitalSigns((prev) => prev.filter((vs) => vs.id !== id))
   }, [])

   // Load initial data
   useEffect(() => {
      refreshVitalSigns()
      refreshMedicalRecords()
   }, [refreshVitalSigns, refreshMedicalRecords])

   return {
      vitalSigns,
      medicalRecords,
      isLoadingVitals,
      isLoadingRecords,
      vitalsError,
      recordsError,
      refreshVitalSigns,
      refreshMedicalRecords,
      addVitalSign,
      updateVitalSign,
      deleteVitalSign
   }
}
