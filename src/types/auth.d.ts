interface JwtPayload {
   userId: string
   fullName: string
   email: string
   roles: string[]
   sub: string
   iss: string
   exp: number
   iat: number
}

interface SignInRequest {
   username: string
   password: string
}

interface SignUpRequest {
   fullName: string
   username: string
   email: string
   phoneNumber: string
   birthDate: string
   gender: 'MALE' | 'FEMALE' | 'UNKNOWN'
   password: string
   confirmPassword: string
}
