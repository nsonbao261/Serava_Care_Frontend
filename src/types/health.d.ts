type VitalSignType = 'blood_pressure' | 'heart_rate' | 'temperature' | 'weight' | 'blood_sugar'

interface VitalSign {
   id: string
   type: VitalSignType
   value: string
   unit: string
   date: string
   status: 'normal' | 'warning' | 'danger'
   note?: string
}

interface MedicalRecord {
   id: string
   date: string
   type: 'checkup' | 'consultation' | 'lab_result' | 'prescription' | 'vaccination'
   title: string
   doctor: string
   specialty: string
   summary: string
   attachments?: string[]
   status: 'completed' | 'pending' | 'scheduled'
}
