'use client'

import { motion } from 'framer-motion'
import { AlertCircle } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

// Components
import { Button, Checkbox, Input, Label } from '@/components'

// Deps
import { useAuth } from '@/hooks'
import { signupSchema, type SignupInput } from '@/schemas'

export default function SignUpForm() {
   const router = useRouter()
   const searchParams = useSearchParams()
   const { signUp, mockSignup, isLoading } = useAuth()
   const [agreeTerms, setAgreeTerms] = useState(false)
   const [useMock, setUseMock] = useState(true) // Toggle between real and mock API

   const {
      register,
      handleSubmit,
      formState: { errors },
      setError
   } = useForm<SignupInput>({
      resolver: zodResolver(signupSchema),
      defaultValues: {
         username: '',
         fullName: '',
         birthDate: '',
         gender: undefined,
         password: '',
         confirmPassword: ''
      }
   })

   const onSubmit = async (data: SignupInput) => {
      // Check terms agreement
      if (!agreeTerms) {
         toast.error('Vui lòng đồng ý với điều khoản sử dụng')
         return
      }

      try {
         console.log('Submitting sign-up form with data:', data)
         // Choose between mock and real authentication
         const response = useMock ? await mockSignup(data) : await signUp(data)
         console.log('Signup response in form:', response)

         // Check for success conditions
         if (
            (response.statusCode >= 200 && response.statusCode < 300) ||
            response.data?.accessToken
         ) {
            toast.success('Đăng ký thành công!')

            // Redirect to return URL or dashboard
            const returnUrl = searchParams.get('returnUrl')
            if (returnUrl) {
               try {
                  // Decode and validate the return URL
                  const decodedUrl = decodeURIComponent(returnUrl)
                  // For security, only allow relative URLs
                  if (decodedUrl.startsWith('/') && !decodedUrl.startsWith('//')) {
                     router.push(decodedUrl)
                  } else {
                     router.push('/')
                  }
               } catch {
                  router.push('/')
               }
            } else {
               router.push('/')
            }
         } else {
            // Handle error response
            console.log('Signup failed with response:', response)

            // Show more specific error message based on status code
            let errorMessage =
               response.message || response.error || 'Đăng ký thất bại. Vui lòng thử lại.'

            if (response.statusCode === 0) {
               errorMessage = 'Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng.'
            } else if (response.statusCode === 500) {
               errorMessage = 'Lỗi máy chủ. Dữ liệu có thể đã được lưu, vui lòng thử đăng nhập.'
               toast.info('Nếu tài khoản đã được tạo, vui lòng thử đăng nhập', {
                  autoClose: 8000
               })
            }

            setError('root', {
               message: errorMessage
            })
         }
      } catch (error) {
         console.error('Signup error:', error)
         setError('root', { message: 'Có lỗi xảy ra khi đăng ký. Vui lòng thử lại.' })
      }
   }

   return (
      <motion.form
         initial={{ opacity: 0, x: -20 }}
         animate={{ opacity: 1, x: 0 }}
         transition={{ duration: 0.3 }}
         onSubmit={handleSubmit(onSubmit)}
         className="space-y-2.5 max-w-md mx-auto"
      >
         {/* General Error Message */}
         {errors.root && (
            <div className="bg-red-50 border border-red-200 rounded-md p-2.5 flex items-center space-x-2">
               <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
               <p className="text-red-700 text-xs">{errors.root.message}</p>
            </div>
         )}

         {/* Email Field */}
         <div className="space-y-1">
            <Label htmlFor="username" className="text-blue-700 font-medium text-sm">
               Tên tài khoản <span className="text-red-500">*</span>
            </Label>
            <Input
               id="username"
               type="username"
               placeholder="Nhập tên tài khoản đăng nhập của bạn"
               className={`rounded-md focus:border-blue-700 h-10 text-sm ${
                  errors.username ? 'border-red-500' : 'border-blue-500'
               }`}
               {...register('username')}
            />
            {errors.username && (
               <p className="text-red-500 text-xs mt-0.5">{errors.username.message}</p>
            )}
         </div>

         {/* Full Name Field */}
         <div className="space-y-1">
            <Label htmlFor="fullName" className="text-blue-700 font-medium text-sm">
               Họ và tên <span className="text-red-500">*</span>
            </Label>
            <Input
               id="fullName"
               type="text"
               placeholder="Nhập họ và tên của bạn"
               className={`rounded-md focus:border-blue-700 h-10 text-sm ${
                  errors.fullName ? 'border-red-500' : 'border-blue-500'
               }`}
               {...register('fullName')}
            />
            {errors.fullName && (
               <p className="text-red-500 text-xs mt-0.5">{errors.fullName.message}</p>
            )}
         </div>

         {/* Birth Date and Gender in a row */}
         <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {/* Birth Date Field */}
            <div className="space-y-1">
               <Label htmlFor="birthDate" className="text-blue-700 font-medium text-sm">
                  Ngày sinh <span className="text-red-500">*</span>
               </Label>
               <Input
                  id="birthDate"
                  type="date"
                  className={`rounded-md focus:border-blue-700 h-10 text-sm ${
                     errors.birthDate ? 'border-red-500' : 'border-blue-500'
                  }`}
                  {...register('birthDate')}
               />
               {errors.birthDate && (
                  <p className="text-red-500 text-xs mt-0.5">{errors.birthDate.message}</p>
               )}
            </div>

            {/* Gender Field */}
            <div className="space-y-1">
               <Label htmlFor="gender" className="text-blue-700 font-medium text-sm">
                  Giới tính <span className="text-red-500">*</span>
               </Label>
               <select
                  id="gender"
                  className={`w-full rounded-md focus:border-blue-700 h-10 text-sm px-2 border ${
                     errors.gender ? 'border-red-500' : 'border-blue-500'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white`}
                  {...register('gender')}
               >
                  <option value="">Chọn</option>
                  <option value="male">Nam</option>
                  <option value="female">Nữ</option>
                  <option value="other">Khác</option>
               </select>
               {errors.gender && (
                  <p className="text-red-500 text-xs mt-0.5">{errors.gender.message}</p>
               )}
            </div>
         </div>

         {/* Password Field */}
         <div className="space-y-1">
            <Label htmlFor="password" className="text-blue-700 font-medium text-sm">
               Mật khẩu <span className="text-red-500">*</span>
            </Label>
            <Input
               id="password"
               type="password"
               placeholder="Nhập mật khẩu"
               className={`rounded-md focus:border-blue-700 h-10 text-sm ${
                  errors.password ? 'border-red-500' : 'border-blue-500'
               }`}
               {...register('password')}
            />
            {errors.password && (
               <p className="text-red-500 text-xs mt-0.5">{errors.password.message}</p>
            )}
         </div>

         {/* Confirm Password Field */}
         <div className="space-y-1">
            <Label htmlFor="confirmPassword" className="text-blue-700 font-medium text-sm">
               Xác nhận mật khẩu <span className="text-red-500">*</span>
            </Label>
            <Input
               id="confirmPassword"
               type="password"
               placeholder="Nhập lại mật khẩu"
               className={`rounded-md focus:border-blue-700 h-10 text-sm ${
                  errors.confirmPassword ? 'border-red-500' : 'border-blue-500'
               }`}
               {...register('confirmPassword')}
            />
            {errors.confirmPassword && (
               <p className="text-red-500 text-xs mt-0.5">{errors.confirmPassword.message}</p>
            )}
         </div>

         {/* Terms and Conditions */}
         <div className="flex items-center justify-center text-xs pt-1">
            <Checkbox
               id="agreeTerms"
               checked={agreeTerms}
               onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
               className="border-2 border-blue-300 w-3.5 h-3.5 flex-shrink-0 mt-0.5"
            />
            <Label
               htmlFor="agreeTerms"
               className="text-[11px] leading-tight cursor-pointer flex items-center gap-x-1 whitespace-nowrap ml-2"
               style={{ lineHeight: '1.2' }}
            >
               Tôi đồng ý với
               <a href="/terms" className="text-blue-500 hover:text-blue-600 underline">
                  Điều khoản sử dụng
               </a>
               và
               <a href="/privacy" className="text-blue-500 hover:text-blue-600 underline">
                  Chính sách bảo mật
               </a>
               của Serava Care.
            </Label>
         </div>

         {/* Submit Button */}
         <Button
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-800 h-10 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed mt-3 transition-colors"
            disabled={isLoading || !agreeTerms}
         >
            {isLoading ? 'ĐANG ĐĂNG KÝ...' : 'ĐĂNG KÝ'}
         </Button>

         {/* Mock Toggle for Development */}
         <div className="flex items-center justify-center space-x-2 text-xs text-gray-500 mt-2">
            <span>Demo mode:</span>
            <button
               type="button"
               onClick={() => setUseMock(!useMock)}
               className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                  useMock ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
               }`}
            >
               {useMock ? 'Mock API' : 'Real API'}
            </button>
         </div>

         {/* Login Link */}
         <div className="text-center pt-2">
            <p className="text-xs text-gray-600">
               Đã có tài khoản?{' '}
               <a
                  href="/sign-in"
                  className="text-blue-500 hover:text-blue-600 font-medium transition-colors"
               >
                  Đăng nhập ngay
               </a>
            </p>
         </div>
      </motion.form>
   )
}
