import { z } from 'zod'

export const signInSchema = z.object({
   username: z.string().min(1, 'Vui lòng nhập tên đăng nhập'),
   password: z
      .string()
      .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
      .max(100, 'Mật khẩu phải ít hơn 100 ký tự'),
   rememberMe: z.boolean().optional()
})

export const signUpSchema = z
   .object({
      fullName: z
         .string()
         .min(2, 'Họ và tên phải có ít nhất 2 ký tự')
         .max(100, 'Họ và tên phải ít hơn 100 ký tự')
         .regex(/^[a-zA-ZÀ-ỹ\u00C0-\u017F\s]+$/, 'Họ và tên chỉ được chứa chữ cái và khoảng trắng'),
      username: z
         .string()
         .min(3, 'Tên tài khoản phải có ít nhất 3 ký tự')
         .max(20, 'Tên tài khoản phải ít hơn 20 ký tự')
         .regex(/^[A-Za-z0-9_]+$/, 'Chỉ được chứa chữ, số và dấu gạch dưới'),
      email: z.string().min(8, 'Email phải có ít nhất 8 ký tự').email(),
      phoneNumber: z
         .string()
         .length(10, 'Số điện thoại phải có đúng 10 chữ số')
         .regex(/^\d+$/, 'Số điện thoại chỉ được chứa chỉ số'),
      birthDate: z.string(),
      gender: z.enum(['MALE', 'FEMALE', 'UNKNOWN'], {
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
export type SignInInput = z.input<typeof signInSchema>
export type SignupInput = z.input<typeof signUpSchema>
export type ForgotPasswordInput = z.input<typeof forgotPasswordSchema>
export type ResetPasswordInput = z.input<typeof resetPasswordSchema>
export type ChangePasswordInput = z.input<typeof changePasswordSchema>
