import { useState, useEffect, useCallback } from 'react'
import { VitalSign, MedicalRecord } from '@/types'
import { getVitalSigns, getMedicalRecords, addVitalSign, updateVitalSign, deleteVitalSign } from '@/services'

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

export const useHealthData = (): UseHealthDataReturn => {
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
         const data = await getVitalSigns()
         setVitalSigns(data)
      } catch (error) {
         setVitalsError(
            error instanceof Error ? error.message : 'Không thể tải dữ liệu chỉ số sức khỏe'
         )
      } finally {
         setIsLoadingVitals(false)
      }
   }, [])

   const refreshMedicalRecords = useCallback(async () => {
      try {
         setIsLoadingRecords(true)
         setRecordsError(null)
         const data = await getMedicalRecords()
         setMedicalRecords(data)
      } catch (error) {
         setRecordsError(
            error instanceof Error ? error.message : 'Không thể tải dữ liệu hồ sơ bệnh án'
         )
      } finally {
         setIsLoadingRecords(false)
      }
   }, [])

   const addVitalSignHandler = useCallback(async (data: Omit<VitalSign, 'id'>) => {
      const newVitalSign = await addVitalSign(data)
      setVitalSigns((prev) => [newVitalSign, ...prev])
      return newVitalSign
   }, [])

   const updateVitalSignHandler = useCallback(async (id: string, data: Partial<VitalSign>) => {
      const updatedVitalSign = await updateVitalSign(id, data)
      setVitalSigns((prev) => prev.map((vs) => (vs.id === id ? updatedVitalSign : vs)))
      return updatedVitalSign
   }, [])

   const deleteVitalSignHandler = useCallback(async (id: string) => {
      await deleteVitalSign()
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
      addVitalSign: addVitalSignHandler,
      updateVitalSign: updateVitalSignHandler,
      deleteVitalSign: deleteVitalSignHandler
   }
}
