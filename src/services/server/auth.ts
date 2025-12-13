'use server'

import {request} from '@/lib/request'
import {Account} from 'next-auth'
import {ResponseCookie} from 'next/dist/compiled/@edge-runtime/cookies'
import {cookies} from 'next/headers'

export const oauthWithGoogle = async (account: Account) => {
   const idToken = account.id_token
   if (!idToken) {
      console.error('❌ No ID token from Google')
      return
   }

   console.log('🔑 Sending Google ID token to backend...')
   
   const res = await request<{ accessToken: string }, { idToken: string }>('auth/google', {
      method: 'POST',
      body: { idToken }
   })

   if (!res.data?.accessToken) {
      console.error('❌ Backend response:', res)
   } else {
      console.log('✅ Successfully received access token from backend')
   }

   return res.data?.accessToken
}

export const signUpWithCredentials = async (body: SignUpRequest) => {
    return await request<void, SignUpRequest>('auth/sign-up', {
       method: 'POST',
       body
   })
}

export const oauthWithCredentials = async (credentials: SignInRequest) => {
   const res = await request<{ accessToken: string }, SignInRequest>('auth/sign-in', {
      method: 'POST',
      body: credentials
   })

   return res.data?.accessToken
}

export const getCookie = async (name: string): Promise<string | undefined> => {
   const cookieStore = await cookies()
   return cookieStore.get(name)?.value
}

export const setCookie = async (name: string, value: string, options: ResponseCookie) => {
   const cookieStore = await cookies()
   cookieStore.set(name, value, options)
}

export const deleteCookie = async (name: string) => {
   const cookieStore = await cookies()
   cookieStore.delete(name)
}
