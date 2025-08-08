import api, { setAuthTokens, clearAuthTokens, getUserData } from '@/lib'
import { LoginInput, SignupInput, ResetPasswordInput } from '@/schemas'
import { getUserByEmail, createUser, toAuthUser, fromAuthUser } from '@/services/user.service'
import { generateMockTokens, generateMockUser } from '@/data'

// Login method
export async function signIn(credentials: LoginInput): Promise<AuthResponse> {
   try {
      const response = await api.post('/auth/sign-in', credentials)

      if (response.data.statusCode === 200 && response.data.data?.accessToken) {
         // Store token and user data using global helper
         setAuthTokens(
            response.data.data.accessToken,
            response.data.data.refreshToken,
            response.data.data.user
         )
      }

      return response.data
   } catch (error: unknown) {
      if (error instanceof Error) {
         return {
            statusCode: 400,
            message: error.message || 'Login failed. Please try again.',
            error: error.message
         }
      }

      return {
         statusCode: 500,
         message: 'An unexpected error occurred during sign-in.',
         error: 'Network error or server unavailable'
      }
   }
}

// Signup method
export async function signUp(userData: SignupInput): Promise<AuthResponse> {
   try {
      console.log(2222)

      const response = await api.post('/auth/sign-up', userData)
      console.log(11111)

      console.log('sign>>>>>>>>>>>>>>>>>>>>>>', response)

      // Note: For sign-up, we might not immediately store tokens
      // as user might need to verify username first
      if (response.data.statusCode === 200 && response.data.data?.accessToken) {
         setAuthTokens(
            response.data.data.accessToken,
            response.data.data.refreshToken,
            response.data.data.user
         )
      }

      return response.data
   } catch (error: unknown) {
      if (error instanceof Error) {
         return {
            statusCode: 400,
            message: error.message || 'Signup failed. Please try again.',
            error: error.message
         }
      }

      return {
         statusCode: 500,
         message: 'An unexpected error occurred during sign-up.',
         error: 'Network error or server unavailable'
      }
   }
}

// Logout method
export async function logout(): Promise<void> {
   try {
      // Set a flag to prevent toast errors for logout requests
      const config = {
         headers: { 'X-Suppress-Toast': 'true' }
      }
      await api.post('/auth/sign-out', {}, config)
   } catch {
      // Continue with local logout even if API call fails
      // This is expected behavior - we always want to clear local tokens
   } finally {
      clearAuthTokens()
   }
}

// Get current user from cookies
export function getCurrentUser(): User | null {
   return getUserData()
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
   const user = getCurrentUser()
   return !!user
}

// Verify email
export async function verifyEmail(token: string): Promise<AuthResponse> {
   try {
      const response = await api.post('/auth/verify-email', { token })
      return response.data
   } catch (error: unknown) {
      if (error instanceof Error) {
         return {
            statusCode: 400,
            message: error.message || 'Email verification failed.',
            error: error.message
         }
      }

      return {
         statusCode: 500,
         message: 'An error occurred during email verification.',
         error: 'Network error'
      }
   }
}

// Forgot password
export async function forgotPassword(email: string): Promise<AuthResponse> {
   try {
      const response = await api.post('/auth/forgot-password', { email })
      return response.data
   } catch (error: unknown) {
      if (error instanceof Error) {
         return {
            statusCode: 400,
            message: error.message || 'Failed to send password reset email.',
            error: error.message
         }
      }

      return {
         statusCode: 500,
         message: 'An error occurred while sending password reset email.',
         error: 'Network error'
      }
   }
}

// Reset password
export async function resetPassword(data: ResetPasswordInput): Promise<AuthResponse> {
   try {
      const response = await api.post('/auth/reset-password', data)
      return response.data
   } catch (error: unknown) {
      if (error instanceof Error) {
         return {
            statusCode: 400,
            message: error.message || 'Password reset failed.',
            error: error.message
         }
      }

      return {
         statusCode: 500,
         message: 'An error occurred during password reset.',
         error: 'Network error'
      }
   }
}

// Mock Login method for testing/demo
export async function mockLogin(credentials: LoginInput): Promise<AuthResponse> {
   try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock validation
      if (!credentials.username || !credentials.password) {
         return {
            statusCode: 400,
            message: 'Email và mật khẩu là bắt buộc.',
            error: 'Missing credentials'
         }
      }

      if (credentials.password.length < 6) {
         return {
            statusCode: 400,
            message: 'Mật khẩu phải có ít nhất 6 ký tự.',
            error: 'Invalid password'
         }
      }

      // Check if user exists in our data
      const userData = await getUserByEmail(credentials.username)

      let mockUser: User
      if (userData) {
         // Use existing user data
         mockUser = toAuthUser(userData)
      } else {
         // Create new user if doesn't exist
         const newUserData = await createUser(
            fromAuthUser(generateMockUser(credentials.username) as User)
         )
         mockUser = toAuthUser(newUserData)
      }

      // Generate mock tokens
      const mockTokens = generateMockTokens()

      // Store tokens and user data
      setAuthTokens(mockTokens.accessToken, mockTokens.refreshToken, { ...mockUser })

      return {
         statusCode: 200,
         message: 'Đăng nhập thành công!',
         data: {
            accessToken: mockTokens.accessToken,
            refreshToken: mockTokens.refreshToken,
            user: mockUser
         }
      }
   } catch (error: unknown) {
      return {
         statusCode: 500,
         message: 'Có lỗi xảy ra khi đăng nhập.',
         error: error instanceof Error ? error.message : 'Unknown error'
      }
   }
}

// Mock Signup method for testing/demo
export async function mockSignup(userData: SignupInput): Promise<AuthResponse> {
   try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mock validation
      if (!userData.username || !userData.password || !userData.fullName) {
         return {
            statusCode: 400,
            message: 'Vui lòng điền đầy đủ thông tin bắt buộc.',
            error: 'Missing required fields'
         }
      }

      if (userData.password.length < 8) {
         return {
            statusCode: 400,
            message: 'Mật khẩu phải có ít nhất 8 ký tự.',
            error: 'Invalid password'
         }
      }

      // Generate mock tokens and user data
      const mockTokens = generateMockTokens()
      const mockUser = generateMockUser(
         userData.username,
         userData.fullName,
         userData.birthDate,
         userData.gender,
      ) as User

      // Save user to data manager
      await createUser(fromAuthUser(mockUser))

      // Store tokens and user data
      setAuthTokens(mockTokens.accessToken, mockTokens.refreshToken, { ...mockUser })

      return {
         statusCode: 200,
         message: 'Đăng ký thành công! Chào mừng bạn đến với Serava Care.',
         data: {
            accessToken: mockTokens.accessToken,
            refreshToken: mockTokens.refreshToken,
            user: mockUser
         }
      }
   } catch (error: unknown) {
      return {
         statusCode: 500,
         message: 'Có lỗi xảy ra khi đăng ký.',
         error: error instanceof Error ? error.message : 'Unknown error'
      }
   }
}
