import { z } from 'zod'

// For basic profile form
export const profileFormSchema = z.object({
   fullName: z
      .string()
      .min(2, 'Họ tên phải có ít nhất 2 ký tự')
      .max(100, 'Họ tên không được quá 100 ký tự'),
   email: z.string().email('Email không hợp lệ'),
   phone: z.string().regex(/^[0-9]{10,11}$/, 'Số điện thoại phải có 10-11 chữ số'),
   birthDate: z.string().refine((date) => {
      const birthDate = new Date(date)
      const today = new Date()
      const age = today.getFullYear() - birthDate.getFullYear()
      return age >= 0 && age <= 120
   }, 'Ngày sinh không hợp lệ'),
   gender: z.enum(['male', 'female', 'other']),
   address: z
      .string()
      .min(10, 'Địa chỉ phải có ít nhất 10 ký tự')
      .max(200, 'Địa chỉ không được quá 200 ký tự')
})

export type ProfileFormData = z.infer<typeof profileFormSchema>
