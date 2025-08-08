import { jwtDecode } from 'jwt-decode'
import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

// Deps
import { oauthWithCredentials, oauthWithGoogle } from '@/services/server/auth'

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
            if (!credentials) return null
            const accessToken = await oauthWithCredentials(credentials)
            if (!accessToken) return null

            const userInfo = jwtDecode<JwtPayload>(accessToken)

            return {
               id: userInfo.userId,
               ...userInfo,
               accessToken: accessToken
            }
         }
      }),
      GoogleProvider({
         clientId: process.env.GOOGLE_CLIENT_ID!,
         clientSecret: process.env.GOOGLE_CLIENT_SECRET!
      })
   ],
   callbacks: {
      async signIn({ user, account }) {
         if (account?.provider === 'google') {
            const accessToken = await oauthWithGoogle(account)
            if (!accessToken) return false

            const userInfo = jwtDecode<JwtPayload>(accessToken)

            user.userId = userInfo.userId
            user.fullName = userInfo.fullName
            user.roles = userInfo.roles
            user.accessToken = accessToken
         }

         return true
      },
      async jwt({ token, user }) {
         if (user) {
            token.userId = user.userId
            token.fullName = user.fullName
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
            picture: token.picture,
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
