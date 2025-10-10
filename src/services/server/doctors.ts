import { request } from '@/libs'

export const getAllDoctors = async (
   options: PaginationRequest & { name?: string }
): Promise<PaginationResponse<Doctor>> => {
   // Tạo URLSearchParams từ options
   const params = new URLSearchParams()

   if (options.page !== undefined) params.append('page', String(options.page))
   if (options.size !== undefined) params.append('size', String(options.size))
   if (options.sortBy) params.append('sortBy', options.sortBy)
   if (options.orderby) params.append('orderby', options.orderby)
   if (options.name) params.append('name', options.name)

   const url = `staffs?${params.toString()}`

   const response = await request<PaginationResponse<Doctor>>(url, {
      method: 'GET'
   })

   if (!response.data) throw new Error('Không thể lấy được thông tin từ server')

   return response.data
}
