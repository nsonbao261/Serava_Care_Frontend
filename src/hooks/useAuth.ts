import { useState, useEffect } from 'react'
import {
   signIn,
   signUp,
   logout,
   getCurrentUser,
   mockLogin,
   mockSignup
} from '@/services/auth.service'
import { type LoginInput, type SignupInput } from '@/schemas'

export interface UseAuthReturn {
   user: User | null
   isAuthenticated: boolean
   isLoading: boolean
   signIn: (credentials: LoginInput) => Promise<AuthResponse>
   signUp: (userData: SignupInput) => Promise<AuthResponse>
   mockLogin: (credentials: LoginInput) => Promise<AuthResponse>
   mockSignup: (userData: SignupInput) => Promise<AuthResponse>
   logout: () => void
   refreshUser: () => void
}

export function useAuth(): UseAuthReturn {
   const [user, setUser] = useState<User | null>(null)
   const [isLoading, setIsLoading] = useState(true)

   // Initialize auth state on mount
   useEffect(() => {
      const currentUser = getCurrentUser()
      setUser(currentUser)
      setIsLoading(false)
   }, [])

   // Listen for storage changes to sync across tabs
   useEffect(() => {
      const handleStorageChange = () => {
         const currentUser = getCurrentUser()
         setUser(currentUser)
      }

      if (typeof window !== 'undefined') {
         window.addEventListener('storage', handleStorageChange)
         // Also listen for custom user update events
         window.addEventListener('userUpdate', handleStorageChange)

         return () => {
            window.removeEventListener('storage', handleStorageChange)
            window.removeEventListener('userUpdate', handleStorageChange)
         }
      }
   }, [])

   const signInHandler = async (credentials: LoginInput): Promise<AuthResponse> => {
      setIsLoading(true)
      try {
         const response = await signIn(credentials)

         if (response.statusCode === 200 && response.data?.user) {
            setUser(response.data.user)
         }

         return response
      } catch {
         return {
            statusCode: 500,
            message: 'Có lỗi xảy ra khi đăng nhập.',
            error: 'Network error'
         }
      } finally {
         setIsLoading(false)
      }
   }

   const signUpHandler = async (userData: SignupInput): Promise<AuthResponse> => {
      setIsLoading(true)
      try {
         console.log('useAuth: Starting sign-up process')
         const response = await signUp(userData)
         console.log('useAuth: Signup response received:', response)

         if (response.statusCode === 200 && response.data?.user) {
            console.log('useAuth: Setting user from response')
            setUser(response.data.user)
         } else if (response.data?.user) {
            // Handle case where user data exists but status code might be different
            console.log('useAuth: Setting user with different status code')
            setUser(response.data.user)
         }

         return response
      } catch {
         console.error('useAuth: Signup failed with network error')
         return {
            statusCode: 500,
            message: 'Có lỗi xảy ra khi đăng ký.',
            error: 'Network error'
         }
      } finally {
         setIsLoading(false)
      }
   }

   const logoutHandler = async () => {
      try {
         await logout()
         setUser(null)
      } catch (error) {
         // Even if logout fails on server, we still clear local state
         setUser(null)
         console.warn('Logout API call failed, but local logout completed:', error)
      }
   }

   const mockLoginHandler = async (credentials: LoginInput): Promise<AuthResponse> => {
      setIsLoading(true)
      try {
         const response = await mockLogin(credentials)

         if (response.statusCode === 200 && response.data?.user) {
            setUser(response.data.user)
         }

         return response
      } catch {
         return {
            statusCode: 500,
            message: 'Có lỗi xảy ra khi đăng nhập.',
            error: 'Network error'
         }
      } finally {
         setIsLoading(false)
      }
   }

   const mockSignupHandler = async (userData: SignupInput): Promise<AuthResponse> => {
      setIsLoading(true)
      try {
         const response = await mockSignup(userData)

         if (response.statusCode === 200 && response.data?.user) {
            setUser(response.data.user)
         }

         return response
      } catch {
         return {
            statusCode: 500,
            message: 'Có lỗi xảy ra khi đăng ký.',
            error: 'Network error'
         }
      } finally {
         setIsLoading(false)
      }
   }

   const refreshUser = () => {
      const currentUser = getCurrentUser()
      setUser(currentUser)
   }

   return {
      user,
      isAuthenticated: !!user,
      isLoading,
      signIn: signInHandler,
      signUp: signUpHandler,
      mockLogin: mockLoginHandler,
      mockSignup: mockSignupHandler,
      logout: logoutHandler,
      refreshUser
   }
}
