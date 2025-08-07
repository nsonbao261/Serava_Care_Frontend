type JwtPayload = {
   userId: string
   fullName: string
   email: string
   roles: string[]
   sub: string
   iss: string
   exp: number
   iat: number
}

type SignInRequest = {
   username: string
   password: string
}
