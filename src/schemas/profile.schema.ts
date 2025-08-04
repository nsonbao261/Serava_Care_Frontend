import { z } from 'zod'

export const profileFormSchema = z.object({
   userId: z.string().uuid(),
   fullName: z
      .string()
      .min(2, 'Họ tên phải có ít nhất 2 ký tự')
      .max(100, 'Họ tên không được quá 100 ký tự'),
   email: z.string().email('Email không hợp lệ'),
   phoneNumber: z
      .string()
      .regex(/^[0-9]{10,11}$/, 'Số điện thoại phải có 10-11 chữ số')
      .optional(),
   birthDate: z.string(),
   gender: z.enum(['MALE', 'FEMALE', 'OTHER']),
   address: z
      .string()
      .min(10, 'Địa chỉ phải có ít nhất 10 ký tự')
      .max(200, 'Địa chỉ không được quá 200 ký tự')
      .optional()
})

export type ProfileFormData = z.infer<typeof profileFormSchema>
