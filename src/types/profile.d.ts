type Gender = 'male' | 'female' | 'other'

interface User {
   email: string
   fullName: string
   birthDate?: string
   gender?: Gender
   avatar?: string
   phone?: string
   address?: string
}

interface UserProfile extends User {
   id: string
   emergencyContact?: EmergencyContact
   medicalInfo?: MedicalInfo
   insurance?: InsuranceInfo
}

interface EmergencyContact {
   name: string
   phone: string
   relationship: string
}

interface MedicalInfo {
   bloodType?: string
   allergies?: string[]
   chronicConditions?: string[]
   medications?: string[]
}

interface InsuranceInfo {
   provider: string
   policyNumber: string
   expiryDate: string
}

interface ProfileFormData {
   fullName: string
   email: string
   phone: string
   birthDate: string
   gender: 'male' | 'female' | 'other'
   address: string
}
