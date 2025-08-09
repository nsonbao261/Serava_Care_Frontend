type Gender = 'MALE' | 'FEMALE' | 'UNKNOWN'

interface User {
   userId: string
   email: string
   fullName: string
   birthDate: string
   gender: Gender
   avatar?: string
   phoneNumber: string
   address?: string
}

interface UserProfile extends User {
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
