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
