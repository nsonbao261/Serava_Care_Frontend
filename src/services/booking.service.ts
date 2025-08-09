import { mockBookingOrders } from '@/data'

export async function getBookings({}: { _userId: string }): Promise<BookingOrder[]> {
   try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      return [...mockBookingOrders]
   } catch {
      throw new Error('Không thể tải dữ liệu lịch hẹn từ server')
   }
}

export async function getBookingById(id: string): Promise<BookingOrder | null> {
   try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      const booking = mockBookingOrders.find((booking) => booking.id === id)
      return booking || null
   } catch {
      throw new Error('Không thể tải thông tin lịch hẹn từ server')
   }
}

export async function cancelBooking(id: string, reason?: string): Promise<BookingOrder> {
   try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800))

      const booking = mockBookingOrders.find((booking) => booking.id === id)
      if (!booking) {
         throw new Error('Không tìm thấy lịch hẹn')
      }

      // Update booking status
      return {
         ...booking,
         status: 'cancelled' as const,
         notes: reason ? `Lý do hủy: ${reason}` : booking.notes,
         updatedAt: new Date()
      }
   } catch {
      throw new Error('Không thể hủy lịch hẹn')
   }
}

export async function rescheduleBooking(
   id: string,
   newDate: string,
   newTime: string
): Promise<BookingOrder> {
   try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const booking = mockBookingOrders.find((booking) => booking.id === id)
      if (!booking) {
         throw new Error('Không tìm thấy lịch hẹn')
      }

      // Update booking with new date and time
      return {
         ...booking,
         appointmentDate: newDate,
         appointmentTime: newTime,
         status: 'rescheduled' as const,
         updatedAt: new Date()
      }
   } catch {
      throw new Error('Không thể dời lịch hẹn')
   }
}
