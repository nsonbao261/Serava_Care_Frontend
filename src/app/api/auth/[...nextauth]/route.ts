import { jwtDecode } from 'jwt-decode'
import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
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
         console.log('🔐 SignIn callback triggered:', { provider: account?.provider, email: user?.email })
         
         if (account?.provider === 'google') {
            console.log('📧 Google account detected, starting OAuth flow...')
            try {
               const accessToken = await oauthWithGoogle(account)
               if (!accessToken) {
                  console.error('❌ Google OAuth failed: No access token returned from backend')
                  return false
               }

               const userInfo = jwtDecode<JwtPayload>(accessToken)

               user.userId = userInfo.userId
               user.fullName = userInfo.fullName
               user.roles = userInfo.roles
               user.accessToken = accessToken
            } catch (error) {
               console.error('❌ Google OAuth error:', error)
               return false
            }
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
   },
   debug: true,  // ✅ Enable debug mode
   logger: {
      error(code, metadata) {
         console.error('❌ NextAuth Error:', code, metadata)
      },
      warn(code) {
         console.warn('⚠️ NextAuth Warning:', code)
      },
      debug(code, metadata) {
         console.log('🐛 NextAuth Debug:', code, metadata)
      }
   }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
