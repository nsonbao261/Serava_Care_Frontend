'use server'

import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import { cookies } from 'next/headers'

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
