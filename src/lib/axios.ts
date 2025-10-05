import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios'

import { getSession } from 'next-auth/react'

interface CustomAxiosInstance
   extends Omit<AxiosInstance, 'get' | 'post' | 'put' | 'delete' | 'patch'> {
   get<T = undefined>(url: string): Promise<ApiResponse<T>>
   post<T = undefined, D = undefined>(url: string, data?: D): Promise<ApiResponse<T>>
   put<T = undefined>(url: string, data?: undefined): Promise<ApiResponse<T>>
   delete<T = undefined>(url: string): Promise<ApiResponse<T>>
   patch<T = undefined, D = undefined>(url: string, data?: D): Promise<ApiResponse<T>>
}

export const axiosInstance = axios.create({
   baseURL: process.env.NEXT_API_URL || '/backend',
   timeout: 10000,
   headers: {
      'Content-Type': 'application/json'
   }
}) as CustomAxiosInstance

axiosInstance.interceptors.request.use(
   async (config: InternalAxiosRequestConfig) => {
      const token = await getSession()

      if (token) {
         config.headers.Authorization = `Bearer ${token}`
      }

      return config
   },
   (error: AxiosError) => {
      return Promise.reject(error)
   }
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

      // Lỗi cấu hình
      return Promise.reject(error)
   }
)
