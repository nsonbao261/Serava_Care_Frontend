import { mockOrderDetails } from '@/data'

export async function getOrderById(id: string): Promise<BookingOrder | null> {
   try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800))

      return mockOrderDetails.find((order) => order.id === id) || null
   } catch {
      throw new Error('Không thể tải thông tin đơn hàng từ server')
   }
}

export async function cancelOrder(id: string): Promise<void> {
   try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 600))

      const orderIndex = mockOrderDetails.findIndex((order) => order.id === id)
      if (orderIndex >= 0) {
         mockOrderDetails[orderIndex].status = 'cancelled'
         mockOrderDetails[orderIndex].paymentStatus = 'refunded'
      }
   } catch  {
      throw new Error('Không thể hủy đơn hàng')
   }
}

export async function rescheduleOrder(id: string, newDate: string, newTime: string): Promise<void> {
   try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 600))

      const orderIndex = mockOrderDetails.findIndex((order) => order.id === id)
      if (orderIndex >= 0) {
         mockOrderDetails[orderIndex].appointmentDate = newDate
         mockOrderDetails[orderIndex].appointmentTime = newTime
         mockOrderDetails[orderIndex].status = 'rescheduled'
      }
   } catch  {
      throw new Error('Không thể dời lịch đơn hàng')
   }
}

export async function downloadInvoice(orderId: string): Promise<string> {
   try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      // In a real app, this would return a download URL
      return `/api/invoices/${orderId}.pdf`
   } catch  {
      throw new Error('Không thể tải hóa đơn')
   }
}

export async function printInvoice(orderId: string): Promise<void> {
   try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 300))

      // In a real app, this would trigger a print dialog or send to printer
      console.log(`Printing invoice for order ${orderId}`)
   } catch  {
      throw new Error('Không thể in hóa đơn')
   }
}
