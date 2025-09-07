import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'
import Cookies from 'js-cookie'

// Deps
import { ACCESS_TOKEN } from '@/constants'

const api = axios.create({
   baseURL: process.env.NEXT_API_URL || '/backend',
   timeout: 10000,
   headers: {
      'Content-Type': 'application/json'
   }
})

api.interceptors.request.use(
   (config: InternalAxiosRequestConfig) => {
      const token = Cookies.get(ACCESS_TOKEN)

      if (token) {
         config.headers.Authorization = `Bearer ${token}`
      }

      return config
   },
   (error: AxiosError) => {
      return Promise.reject(error)
   }
)

api.interceptors.response.use(
   (response) => response,
   (error: AxiosError) => {
      // Handle token expiration
      if (error.response?.status === 401) {
         Cookies.remove(ACCESS_TOKEN) // Có thể redirect to login page
         window.location.href = '/auth/login'
      }

      return Promise.reject(error)
   }
)

export default api
