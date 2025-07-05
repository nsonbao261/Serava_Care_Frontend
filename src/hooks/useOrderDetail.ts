import { useState, useEffect, useCallback } from 'react'
import { BookingOrder } from '@/types'
import { OrderDetailService } from '@/services'

const orderDetailService = new OrderDetailService()

interface UseOrderDetailReturn {
   order: BookingOrder | null
   isLoading: boolean
   error: string | null
   refetch: () => Promise<void>
   cancelOrder: () => Promise<void>
   rescheduleOrder: (newDate: string, newTime: string) => Promise<void>
   downloadInvoice: () => Promise<string>
   printInvoice: () => Promise<void>
}

export function useOrderDetail(orderId: string, autoFetch: boolean = true): UseOrderDetailReturn {
   const [order, setOrder] = useState<BookingOrder | null>(null)
   const [isLoading, setIsLoading] = useState(true)
   const [error, setError] = useState<string | null>(null)

   const fetchOrder = useCallback(async () => {
      if (!orderId) return

      try {
         setIsLoading(true)
         setError(null)
         const data = await orderDetailService.getOrderById(orderId)
         setOrder(data)

         if (!data) {
            setError('Không tìm thấy thông tin đơn hàng.')
         }
      } catch (err) {
         setError('Không thể tải thông tin đơn hàng. Vui lòng thử lại.')
         console.error('Error fetching order detail:', err)
      } finally {
         setIsLoading(false)
      }
   }, [orderId])

   const cancelOrder = useCallback(async () => {
      if (!order) return

      try {
         await orderDetailService.cancelOrder(order.id)
         setOrder((prev) =>
            prev
               ? {
                    ...prev,
                    status: 'cancelled',
                    paymentStatus: 'refunded'
                 }
               : null
         )
      } catch (err) {
         setError('Không thể hủy đơn hàng. Vui lòng thử lại.')
         console.error('Error cancelling order:', err)
      }
   }, [order])

   const rescheduleOrder = useCallback(
      async (newDate: string, newTime: string) => {
         if (!order) return

         try {
            await orderDetailService.rescheduleOrder(order.id, newDate, newTime)
            setOrder((prev) =>
               prev
                  ? {
                       ...prev,
                       appointmentDate: newDate,
                       appointmentTime: newTime,
                       status: 'rescheduled'
                    }
                  : null
            )
         } catch (err) {
            setError('Không thể đổi lịch hẹn. Vui lòng thử lại.')
            console.error('Error rescheduling order:', err)
         }
      },
      [order]
   )

   const downloadInvoice = useCallback(async (): Promise<string> => {
      if (!order) throw new Error('No order found')

      try {
         return await orderDetailService.downloadInvoice(order.id)
      } catch (err) {
         setError('Không thể tải hóa đơn. Vui lòng thử lại.')
         console.error('Error downloading invoice:', err)
         throw err
      }
   }, [order])

   const printInvoice = useCallback(async () => {
      if (!order) return

      try {
         await orderDetailService.printInvoice(order.id)
      } catch (err) {
         setError('Không thể in hóa đơn. Vui lòng thử lại.')
         console.error('Error printing invoice:', err)
      }
   }, [order])

   useEffect(() => {
      if (autoFetch && orderId) {
         fetchOrder()
      }
   }, [orderId, autoFetch, fetchOrder])

   return {
      order,
      isLoading,
      error,
      refetch: fetchOrder,
      cancelOrder,
      rescheduleOrder,
      downloadInvoice,
      printInvoice
   }
}
