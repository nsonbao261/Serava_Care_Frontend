import api, { setAuthTokens, clearAuthTokens, getUserData } from '@/lib'
import { LoginInput, SignupInput, ResetPasswordInput } from '@/schemas'
import { UserService } from '@/services'
import { generateMockTokens, generateMockUser } from '@/data'
import { AuthResponse, User } from '@/types'

const userService = new UserService()

// Auth Service Class
export class AuthService {
   // Login method
   async login(credentials: LoginInput): Promise<AuthResponse> {
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
            message: 'An unexpected error occurred during login.',
            error: 'Network error or server unavailable'
         }
      }
   }

   // Signup method
   async signup(userData: SignupInput): Promise<AuthResponse> {
      try {
         const response = await api.post('/auth/sign-up', userData)

         // Note: For signup, we might not immediately store tokens
         // as user might need to verify email first
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
            message: 'An unexpected error occurred during signup.',
            error: 'Network error or server unavailable'
         }
      }
   }

   // Logout method
   async logout(): Promise<void> {
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
   getCurrentUser(): User | null {
      return getUserData()
   }

   // Check if user is authenticated
   isAuthenticated(): boolean {
      const user = this.getCurrentUser()
      return !!user
   }

   // Verify email
   async verifyEmail(token: string): Promise<AuthResponse> {
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
   async forgotPassword(email: string): Promise<AuthResponse> {
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
   async resetPassword(data: ResetPasswordInput): Promise<AuthResponse> {
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
   async mockLogin(credentials: LoginInput): Promise<AuthResponse> {
      try {
         // Simulate API delay
         await new Promise((resolve) => setTimeout(resolve, 1000))

         // Mock validation
         if (!credentials.email || !credentials.password) {
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
         const userData = await userService.getUserByEmail(credentials.email)

         let mockUser: User
         if (userData) {
            // Use existing user data
            mockUser = userService.toAuthUser(userData)
         } else {
            // Create new user if doesn't exist
            const newUserData = await userService.createUser(
               userService.fromAuthUser(generateMockUser(credentials.email) as User)
            )
            mockUser = userService.toAuthUser(newUserData)
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
   async mockSignup(userData: SignupInput): Promise<AuthResponse> {
      try {
         // Simulate API delay
         await new Promise((resolve) => setTimeout(resolve, 1500))

         // Mock validation
         if (!userData.email || !userData.password || !userData.fullName) {
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
            userData.email,
            userData.fullName,
            userData.birthDate,
            userData.gender
         ) as User

         // Save user to data manager
         await userService.createUser(userService.fromAuthUser(mockUser))

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
}
