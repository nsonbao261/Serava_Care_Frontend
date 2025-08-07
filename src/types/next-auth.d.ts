import { DefaultSession } from 'next-auth'
import 'next-auth'
import 'next-auth/jwt'
import 'next/server'

declare module 'next-auth' {
   interface Session extends DefaultSession {
      user?: import('next-auth/jwt').JWT & { accessToken: string } & DefaultSession['user']
   }

   interface User {
      id: string
      fullName: string
      userId: string
      roles: string[]
      email?: string
      accessToken: string
   }
}

declare module 'next-auth/jwt' {
   interface JWT {
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
