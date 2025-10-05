import slugify from 'slugify'

export function createSlug(str: string) {
   return slugify(str, {
      lower: true, // chuyển thành chữ thường
      strict: true, // loại bỏ ký tự đặc biệt
      locale: 'vi', // hỗ trợ tiếng Việt
      trim: true // bỏ khoảng trắng đầu/cuối
   })
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
