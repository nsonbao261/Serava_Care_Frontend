import { useState, useEffect, useCallback } from 'react'
import {
   getOrderById,
   cancelOrder,
   rescheduleOrder,
   downloadInvoice,
   printInvoice
} from '@/services'

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
         const data = await getOrderById(orderId)
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

   const cancelOrderHandler = useCallback(async () => {
      if (!order) return

      try {
         await cancelOrder(order.id)
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

   const rescheduleOrderHandler = useCallback(
      async (newDate: string, newTime: string) => {
         if (!order) return

         try {
            await rescheduleOrder(order.id, newDate, newTime)
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

   const downloadInvoiceHandler = useCallback(async (): Promise<string> => {
      if (!order) throw new Error('No order found')

      try {
         return await downloadInvoice(order.id)
      } catch (err) {
         setError('Không thể tải hóa đơn. Vui lòng thử lại.')
         console.error('Error downloading invoice:', err)
         throw err
      }
   }, [order])

   const printInvoiceHandler = useCallback(async () => {
      if (!order) return

      try {
         await printInvoice(order.id)
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
      cancelOrder: cancelOrderHandler,
      rescheduleOrder: rescheduleOrderHandler,
      downloadInvoice: downloadInvoiceHandler,
      printInvoice: printInvoiceHandler
   }
}
