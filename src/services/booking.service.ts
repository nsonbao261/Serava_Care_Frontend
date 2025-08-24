import { mockBookings } from '@/data'

export async function getBookingById(id: string): Promise<Booking | null> {
   try {
      await new Promise((resolve) => setTimeout(resolve, 800))
      return mockBookings.find((order) => order.id === id) || null
   } catch {
      throw new Error('Không thể tải thông tin đơn hàng từ server')
   }
}
