import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'
import Cookies from 'js-cookie'

// Deps
import { ACCESS_TOKEN } from '@/constants'

const api = axios.create({
   baseURL: '/backend',
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

export default api
