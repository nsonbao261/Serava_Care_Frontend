import { BookingOrder } from '@/types'
import { mockOrderDetails } from '@/data'

export async function getOrderById(id: string): Promise<BookingOrder | null> {
   // Simulate API delay
   await new Promise((resolve) => setTimeout(resolve, 800))

   return mockOrderDetails.find((order) => order.id === id) || null
}

export async function cancelOrder(id: string): Promise<void> {
   // Simulate API delay
   await new Promise((resolve) => setTimeout(resolve, 600))

   const orderIndex = mockOrderDetails.findIndex((order) => order.id === id)
   if (orderIndex >= 0) {
      mockOrderDetails[orderIndex].status = 'cancelled'
      mockOrderDetails[orderIndex].paymentStatus = 'refunded'
   }
}

export async function rescheduleOrder(id: string, newDate: string, newTime: string): Promise<void> {
   // Simulate API delay
   await new Promise((resolve) => setTimeout(resolve, 600))

   const orderIndex = mockOrderDetails.findIndex((order) => order.id === id)
   if (orderIndex >= 0) {
      mockOrderDetails[orderIndex].appointmentDate = newDate
      mockOrderDetails[orderIndex].appointmentTime = newTime
      mockOrderDetails[orderIndex].status = 'rescheduled'
   }
}

export async function downloadInvoice(orderId: string): Promise<string> {
   // Simulate API delay
   await new Promise((resolve) => setTimeout(resolve, 500))

   // In a real app, this would return a download URL
   return `/api/invoices/${orderId}.pdf`
}

export async function printInvoice(orderId: string): Promise<void> {
   // Simulate API delay
   await new Promise((resolve) => setTimeout(resolve, 300))

   // In a real app, this would trigger a print dialog or send to printer
   console.log(`Printing invoice for order ${orderId}`)
}
