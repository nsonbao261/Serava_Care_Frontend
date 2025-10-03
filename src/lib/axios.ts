import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'
import Cookies from 'js-cookie'

import { ACCESS_TOKEN } from '@/constants'
import { getSession } from 'next-auth/react'

export const axiosInstance = axios.create({
   baseURL: process.env.NEXT_API_URL || '/backend',
   timeout: 10000,
   headers: {
      'Content-Type': 'application/json'
   }
})

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
      // Handle token expiration
      if (error.response?.status === 401) {
         Cookies.remove(ACCESS_TOKEN) // Có thể redirect to login page
         window.location.href = '/auth/login'
      }

      return Promise.reject(error)
   }
)
