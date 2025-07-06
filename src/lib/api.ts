import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'

// Create axios instance with default configuration
const api = axios.create({
   baseURL: process.env.NEXT_API_URL || '/api',
   timeout: 10000,
   headers: {
      'Content-Type': 'application/json'
   }
})

// Request interceptor to add auth token
api.interceptors.request.use(
   (config: InternalAxiosRequestConfig) => {
      const token = Cookies.get('access_token')
      if (token) {
         config.headers.Authorization = `Bearer ${token}`
      }
      return config
   },
   (error: AxiosError) => {
      return Promise.reject(error)
   }
)

// Response interceptor to handle token refresh and errors
api.interceptors.response.use(
   (response: AxiosResponse) => {
      return response
   },
   async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean }

      // Handle 401 errors (token expired)
      if (error.response?.status === 401 && !originalRequest._retry) {
         originalRequest._retry = true

         try {
            const refreshToken = Cookies.get('refresh_token')
            if (refreshToken) {
               const response = await refreshAuthToken(refreshToken)

               if (response.success) {
                  // Update tokens
                  Cookies.set('access_token', response.data.accessToken, { expires: 1 }) // 1 day
                  Cookies.set('refresh_token', response.data.refreshToken, { expires: 7 }) // 7 days

                  // Retry original request with new token
                  originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`
                  return api(originalRequest)
               }
            }
         } catch {
            // Refresh failed, redirect to login
            clearAuthTokens()
            window.location.href = '/login'
         }
      }

      // Handle other errors with toast notifications
      // Check if toast should be suppressed for this request
      const suppressToast = error.config?.headers?.['X-Suppress-Toast'] === 'true'

      if (!suppressToast) {
         const status = error.response?.status
         if (status === 403) {
            toast.error('Access denied. You do not have permission to perform this action.')
         } else if (status === 404) {
            toast.error('Resource not found.')
         } else if (status && status >= 500) {
            toast.error('Server error. Please try again later.')
         } else if (
            error.response?.data &&
            typeof error.response.data === 'object' &&
            'message' in error.response.data
         ) {
            toast.error(error.response.data.message as string)
         } else {
            toast.error('An unexpected error occurred.')
         }
      }

      return Promise.reject(error)
   }
)

// Refresh token function
async function refreshAuthToken(refreshToken: string) {
   try {
      const response = await axios.post(
         `${process.env.NEXT_PUBLIC_API_URL || '/api'}/refresh-token`,
         {
            refreshToken
         }
      )
      return response.data
   } catch {
      throw new Error('Failed to refresh token')
   }
}

// Helper function to clear auth tokens
export function clearAuthTokens() {
   Cookies.remove('access_token')
   Cookies.remove('refresh_token')
   Cookies.remove('user_data')

   // Trigger custom event to notify components of user data change
   if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('userUpdate'))
   }
}

// Helper function to set auth tokens
export function setAuthTokens(
   accessToken: string,
   refreshToken: string,
   userData: Record<string, unknown>
) {
   Cookies.set('access_token', accessToken, { expires: 1 }) // 1 day
   Cookies.set('refresh_token', refreshToken, { expires: 7 }) // 7 days
   Cookies.set('user_data', JSON.stringify(userData), { expires: 7 })

   // Trigger custom event to notify components of user data change
   if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('userUpdate'))
   }
}

// Helper function to get user data
export function getUserData() {
   const userData = Cookies.get('user_data')
   return userData ? JSON.parse(userData) : null
}

// Utility function to create API requests that suppress toast errors
export function createSuppressedToastConfig() {
   return {
      headers: { 'X-Suppress-Toast': 'true' }
   }
}

export default api
