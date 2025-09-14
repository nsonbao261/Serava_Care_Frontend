import { mockBookings } from '@/data'

export async function getBookingById(id: string): Promise<BookingResult | undefined> {
   try {
      await new Promise((resolve) => setTimeout(resolve, 800))
      return mockBookings.find((order) => order.id === id)
   } catch {
      throw new Error('Không thể tải thông tin đơn hàng từ server')
   }
}
