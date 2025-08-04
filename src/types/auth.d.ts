interface AuthResponse {
   statusCode: number
   message: string
   error?: string
   data?: {
      accessToken: string
      refreshToken: string
      user?: User
   }
}
