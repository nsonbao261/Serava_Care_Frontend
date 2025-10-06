import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import { getSession } from 'next-auth/react'

const axiosInstance = axios.create({
   baseURL: process.env.NEXT_API_URL || '/backend',
   timeout: 10000,
   headers: {
      'Content-Type': 'application/json'
   }
}) as CustomAxiosInstance

axiosInstance.interceptors.request.use(
   async (config: CustomAxiosRequest) => {
      const authMode = config.authMode ?? 'public'

      if (authMode !== 'public') {
         const session = await getSession()
         const accessToken = session?.user?.accessToken

         if (authMode === 'auth' && !accessToken) {
            return Promise.reject({
               response: {
                  data: {
                     statusCode: 401,
                     message: 'Không đủ thẩm quyền',
                     error: 'Unauthorized'
                  } satisfies ApiResponse<never>
               }
            })
         }

         if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`
         }
      }

      return config
   },
   (error: AxiosError) => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
   (response) => response.data,
   (error: AxiosError) => {
      if (error.response) {
         const responseData = error.response.data as ApiResponse<unknown>
         return {
            statusCode: responseData.statusCode,
            message: responseData.message,
            error: responseData.error
         }
      }

      if (error.request) {
         return {
            statusCode: 0,
            message: 'Không thể kết nối tới máy chủ. Vui lòng thử lại.',
            error: 'NETWORK_ERROR'
         }
      }

      return Promise.reject(error)
   }
)

interface CustomAxiosRequest extends InternalAxiosRequestConfig {
   authMode?: 'public' | 'auth' | 'optional'
}

interface CustomAxiosInstance
   extends Omit<AxiosInstance, 'get' | 'post' | 'put' | 'delete' | 'patch'> {
   get<T = undefined>(url: string, config?: CustomAxiosRequest): Promise<ApiResponse<T>>
   post<T = undefined, D = undefined>(
      url: string,
      data?: D,
      config?: CustomAxiosRequest
   ): Promise<ApiResponse<T>>
   put<T = undefined, D = undefined>(
      url: string,
      data?: D,
      config?: CustomAxiosRequest
   ): Promise<ApiResponse<T>>
   delete<T = undefined>(url: string, config?: CustomAxiosRequest): Promise<ApiResponse<T>>
   patch<T = undefined, D = undefined>(
      url: string,
      data?: D,
      config?: CustomAxiosRequest
   ): Promise<ApiResponse<T>>
}

export default axiosInstance
