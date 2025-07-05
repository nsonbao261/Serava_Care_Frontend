import { z } from 'zod'

// Auth validation schemas
export const loginSchema = z.object({
   email: z.string().min(1, 'Email là bắt buộc').email('Vui lòng nhập địa chỉ email hợp lệ'),
   password: z
      .string()
      .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
      .max(100, 'Mật khẩu phải ít hơn 100 ký tự'),
   rememberMe: z.boolean().optional()
})

export const signupSchema = z
   .object({
      email: z.string().min(1, 'Email là bắt buộc').email('Vui lòng nhập địa chỉ email hợp lệ'),
      fullName: z
         .string()
         .min(2, 'Họ và tên phải có ít nhất 2 ký tự')
         .max(100, 'Họ và tên phải ít hơn 100 ký tự')
         .regex(/^[a-zA-ZÀ-ỹ\u00C0-\u017F\s]+$/, 'Họ và tên chỉ được chứa chữ cái và khoảng trắng'),
      birthDate: z
         .string()
         .min(1, 'Ngày sinh là bắt buộc')
         .refine((date) => {
            // Java's LocalDate expects 'yyyy-MM-dd' format
            // Here, we check if the string matches that format
            const regex = /^\d{4}-\d{2}-\d{2}$/
            if (!regex.test(date)) return false
            const [year, month, day] = date.split('-').map(Number)
            const birthDate = new Date(year, month - 1, day)
            const today = new Date()
            let age = today.getFullYear() - birthDate.getFullYear()
            const m = today.getMonth() - birthDate.getMonth()
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
               age--
            }
            return age >= 13 && age <= 120
         }, 'Ngày sinh phải theo định dạng yyyy-MM-dd và tuổi từ 13 đến 120'),
      gender: z.enum(['male', 'female', 'other'], {
         required_error: 'Vui lòng chọn giới tính'
      }),
      password: z
         .string()
         .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
         .max(100, 'Mật khẩu phải ít hơn 100 ký tự')
         .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            'Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 số'
         ),
      confirmPassword: z.string()
   })
   .refine((data) => data.password === data.confirmPassword, {
      message: 'Mật khẩu xác nhận không khớp',
      path: ['confirmPassword']
   })

export const forgotPasswordSchema = z.object({
   email: z.string().min(1, 'Email là bắt buộc').email('Vui lòng nhập địa chỉ email hợp lệ')
})

export const resetPasswordSchema = z
   .object({
      token: z.string().min(1, 'Mã đặt lại mật khẩu là bắt buộc'),
      password: z
         .string()
         .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
         .max(100, 'Mật khẩu phải ít hơn 100 ký tự')
         .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            'Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 số'
         ),
      confirmPassword: z.string()
   })
   .refine((data) => data.password === data.confirmPassword, {
      message: 'Mật khẩu xác nhận không khớp',
      path: ['confirmPassword']
   })

export const changePasswordSchema = z
   .object({
      currentPassword: z.string().min(1, 'Mật khẩu hiện tại là bắt buộc'),
      newPassword: z
         .string()
         .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
         .max(100, 'Mật khẩu phải ít hơn 100 ký tự')
         .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            'Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 số'
         ),
      confirmPassword: z.string()
   })
   .refine((data) => data.newPassword === data.confirmPassword, {
      message: 'Mật khẩu xác nhận không khớp',
      path: ['confirmPassword']
   })

// Type exports
export type LoginInput = z.infer<typeof loginSchema>
export type SignupInput = z.infer<typeof signupSchema>
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>
