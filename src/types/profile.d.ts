export type Gender = 'male' | 'female' | 'other'

export interface User {
   email: string
   fullName: string
   birthDate?: string
   gender?: Gender
   avatar?: string
   phone?: string
   address?: string
}

export interface UserProfile extends User {
   id: string
   emergencyContact?: EmergencyContact
   medicalInfo?: MedicalInfo
   insurance?: InsuranceInfo
}

export interface EmergencyContact {
   name: string
   phone: string
   relationship: string
}

export interface MedicalInfo {
   bloodType?: string
   allergies?: string[]
   chronicConditions?: string[]
   medications?: string[]
}

export interface InsuranceInfo {
   provider: string
   policyNumber: string
   expiryDate: string
}

export interface ProfileFormData {
   fullName: string
   email: string
   phone: string
   birthDate: string
   gender: 'male' | 'female' | 'other'
   address: string
}
