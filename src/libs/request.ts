'use server'

import { getServerSession } from 'next-auth'
import authOptions from './auth'

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
type RequestOptions<B> = {
   method?: HttpMethod
   cache?: RequestCache
   next?: NextFetchRequestConfig
   headers?: HeadersInit
   body?: B
   authMode?: 'public' | 'auth' | 'optional'
}

const request = async <T, B = undefined>(
   path: string,
   { method = 'GET', headers = {}, authMode = 'public', cache, next, body }: RequestOptions<B> = {}
): Promise<ApiResponse<T>> => {
   if (authMode !== 'public') {
      const session = await getServerSession(authOptions)
      const accessToken = session?.user?.accessToken

      if (authMode === 'auth' && !accessToken) {
         return { statusCode: 401, message: 'Không đủ thẩm quyền', error: 'Unauthorized' }
      }

      if (accessToken) {
         headers = { ...headers, Authorization: `Bearer ${accessToken}` }
      }
   }

   const baseURL = process.env.NEXT_API_URL
   const url = `${baseURL}/${path}`

   try {
      const defaultHeaders = { 'Content-Type': 'application/json' }

      const response = await fetch(url, {
         method,
         cache,
         next,
         headers: { ...defaultHeaders, ...headers },
         body: body ? JSON.stringify(body) : undefined
      })

      return await response.json()
   } catch (error: unknown) {
      const isErr = error instanceof Error

      return {
         statusCode: 500,
         message: isErr ? error.message : 'Có lỗi xảy ra, vui lòng thử lại.',
         error: isErr ? error.name : 'UnknownError'
      }
   }
}

export default request
