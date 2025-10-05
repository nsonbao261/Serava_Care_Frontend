import { type ClassValue, clsx } from 'clsx'
import slugify from 'slugify'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => {
   return twMerge(clsx(inputs))
}

export const getChangedFields = <T extends Record<string, unknown>>(original: T, updated: T) => {
   const changed: Partial<T> = {}

   for (const key in updated) {
      if (updated[key] !== original[key]) {
         changed[key] = updated[key]
      }
   }

   return Object.keys(changed).length > 0 ? changed : undefined
}

export const toastMessage = (
   response: ApiResponse<unknown>,
   toast: { success: (message: string) => void; error: (message: string) => void }
) => {
   if (response.error) {
      toast.error(response.message)
   } else {
      toast.success(response.message)
   }
}

export const createSlug = (str: string) => {
   return slugify(str, {
      lower: true, // chuyển thành chữ thường
      strict: true, // loại bỏ ký tự đặc biệt
      locale: 'vi', // hỗ trợ tiếng Việt
      trim: true // bỏ khoảng trắng đầu/cuối
   })
}
