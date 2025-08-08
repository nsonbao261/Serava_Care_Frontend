import { DefaultSession, DefaultUser } from 'next-auth'
import { DefaultJWT } from 'next-auth/jwt'
import 'next/server'

declare module 'next-auth' {
   interface Session extends DefaultSession {
      user?: import('next-auth/jwt').JWT & { accessToken: string } & DefaultSession['user']
   }

   interface User extends DefaultUser {
      id: string
      fullName: string
      userId: string
      roles: string[]
      email?: string
      accessToken: string
   }
}

declare module 'next-auth/jwt' {
   interface JWT extends DefaultJWT {
      id: string
      fullName: string
      userId: string
      email?: string
      roles: string[]
      accessToken: string
   }
}

declare module 'next/server' {
   interface NextRequest {
      nextauth: {
         token: import('next-auth/jwt').JWT | null
      }
   }
}
