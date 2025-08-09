'use server'

import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

type RequestOptions<B> = {
   method?: HttpMethod
   cache?: RequestCache
   next?: NextFetchRequestConfig
   headers?: HeadersInit
   body?: B
   requireAuth?: boolean
}
export const request = async <T, B = undefined>(
   path: string,
   options: RequestOptions<B> = {}
): Promise<ApiResponse<T>> => {
   const { method = 'GET', cache = 'no-cache', next, headers, body, requireAuth } = options

   let mergedHeader = { ...headers }

   if (requireAuth) {
      const session = await getServerSession(authOptions)

      const accessToken = session?.user?.accessToken

      if (!accessToken) {
         return {
            statusCode: 401,
            message: 'Không đủ thẩm quyền',
            error: 'Unauthorized'
         }
      }

      mergedHeader = { ...headers, Authorization: `Bearer ${accessToken}` }
   }

   const baseURL = process.env.NEXT_API_URL

   const url = `${baseURL}/${path}`

   try {
      const defaultHeaders: HeadersInit = { 'Content-Type': 'application/json' }
      const allHeaders = { ...defaultHeaders, ...mergedHeader }

      const response = await fetch(url, {
         method,
         cache,
         headers: allHeaders,
         body: body ? JSON.stringify(body) : undefined,
         next
      })

      return await response.json()
   } catch (error: unknown) {
      const isErr = error instanceof Error

      return {
         statusCode: 500,
         message: isErr ? error.message : 'Có lỗi xảy ra, vui lòng thử lại.',
         error: isErr ? error.name : 'Unknown error'
      }
   }
}
