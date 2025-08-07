import { jwtDecode } from 'jwt-decode'
import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

// Deps
import { request } from '@/lib/request'

export const authOptions: NextAuthOptions = {
   secret: process.env.NEXTAUTH_SECRET,
   providers: [
      CredentialsProvider({
         name: 'Credentials',
         credentials: {
            username: {},
            password: {}
         },
         async authorize(credentials) {
            try {
               if (!credentials) return null

               const res = await request<{ accessToken: string }, SignInRequest>('auth/sign-in', {
                  method: 'POST',
                  body: credentials
               })

               if (res.data) {
                  const userInfo = jwtDecode<JwtPayload>(res.data.accessToken)

                  return {
                     id: userInfo.userId,
                     ...userInfo,
                     accessToken: res.data.accessToken
                  }
               }

               return null
            } catch (err) {
               console.error('Authorize failed:', err)
               return null
            }
         }
      })
   ],
   callbacks: {
      async jwt({ token, user }) {
         if (user) {
            token.id = user.id
            token.userId = user.userId
            token.fullName = user.fullName
            token.email = user.email
            token.roles = user.roles
            token.accessToken = user.accessToken
         }

         return token
      },
      async session({ session, token }) {
         session.user = {
            id: token.id,
            userId: token.userId,
            fullName: token.fullName,
            roles: token.roles,
            email: token.email,
            accessToken: token.accessToken
         }

         return session
      }
   },
   session: {
      strategy: 'jwt',
      maxAge: 1800
   },
   pages: {
      signIn: '/auth'
   }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
