import { useState, useEffect, useCallback } from 'react'
import { getBookings, cancelBooking, rescheduleBooking, getBookingById } from '@/services'

export interface UseBookingDataReturn {
   // Data
   bookings: BookingOrder[]
   filteredBookings: BookingOrder[]

   // Loading states
   isLoading: boolean

   // Error states
   error: string | null

   // Filter state
   filters: BookingFilters

   // Actions
   refreshBookings: () => Promise<void>
   updateFilters: (newFilters: Partial<BookingFilters>) => void
   cancelBooking: (id: string, reason?: string) => Promise<void>
   rescheduleBooking: (id: string, newDate: string, newTime: string) => Promise<void>
   getBookingById: (id: string) => Promise<BookingOrder | null>
}

export const useBookingData = (userId: string): UseBookingDataReturn => {
   const [bookings, setBookings] = useState<BookingOrder[]>([])
   const [filteredBookings, setFilteredBookings] = useState<BookingOrder[]>([])
   const [isLoading, setIsLoading] = useState(true)
   const [error, setError] = useState<string | null>(null)
   const [filters, setFilters] = useState<BookingFilters>({
      status: 'all',
      searchQuery: ''
   })

   const refreshBookings = useCallback(async () => {
      try {
         setIsLoading(true)
         setError(null)
         const data = await getBookings(userId, filters)
         setBookings(data)
         setFilteredBookings(data)
      } catch (error) {
         setError(error instanceof Error ? error.message : 'Không thể tải dữ liệu lịch hẹn')
      } finally {
         setIsLoading(false)
      }
   }, [userId, filters])

   const updateFilters = useCallback((newFilters: Partial<BookingFilters>) => {
      setFilters((prev) => ({ ...prev, ...newFilters }))
   }, [])

   const cancelBookingHandler = useCallback(async (id: string, reason?: string) => {
      try {
         const updatedBooking = await cancelBooking(id, reason)
         setBookings((prev) =>
            prev.map((booking) => (booking.id === id ? updatedBooking : booking))
         )
         setFilteredBookings((prev) =>
            prev.map((booking) => (booking.id === id ? updatedBooking : booking))
         )
      } catch (error) {
         throw new Error(error instanceof Error ? error.message : 'Không thể hủy lịch hẹn')
      }
   }, [])

   const rescheduleBookingHandler = useCallback(
      async (id: string, newDate: string, newTime: string) => {
         try {
            const updatedBooking = await rescheduleBooking(id, newDate, newTime)
            setBookings((prev) =>
               prev.map((booking) => (booking.id === id ? updatedBooking : booking))
            )
            setFilteredBookings((prev) =>
               prev.map((booking) => (booking.id === id ? updatedBooking : booking))
            )
         } catch (error) {
            throw new Error(error instanceof Error ? error.message : 'Không thể dời lịch hẹn')
         }
      },
      []
   )

   const getBookingByIdHandler = useCallback(async (id: string) => {
      return await getBookingById(id)
   }, [])

   // Apply filters when they change
   useEffect(() => {
      let filtered = [...bookings]

      if (filters.status !== 'all') {
         filtered = filtered.filter((booking) => booking.status === filters.status)
      }

      if (filters.searchQuery) {
         const query = filters.searchQuery.toLowerCase()
         filtered = filtered.filter(
            (booking) =>
               booking.doctorName.toLowerCase().includes(query) ||
               booking.serviceName.toLowerCase().includes(query) ||
               booking.orderNumber.toLowerCase().includes(query)
         )
      }

      if (filters.dateRange) {
         filtered = filtered.filter((booking) => {
            const bookingDate = new Date(booking.appointmentDate)
            const fromDate = new Date(filters.dateRange!.from)
            const toDate = new Date(filters.dateRange!.to)
            return bookingDate >= fromDate && bookingDate <= toDate
         })
      }

      setFilteredBookings(filtered)
   }, [bookings, filters])

   // Load initial data
   useEffect(() => {
      refreshBookings()
   }, [refreshBookings])

   return {
      bookings,
      filteredBookings,
      isLoading,
      error,
      filters,
      refreshBookings,
      updateFilters,
      cancelBooking: cancelBookingHandler,
      rescheduleBooking: rescheduleBookingHandler,
      getBookingById: getBookingByIdHandler
   }
}
