import { mockBookingOrders } from '@/data'

export async function getBookings(
   _userId: string,
   filters?: BookingFilters
): Promise<BookingOrder[]> {
   // Simulate API call
   await new Promise((resolve) => setTimeout(resolve, 500))

   // Get all bookings from mock data
   let filteredOrders = [...mockBookingOrders]

   if (filters) {
      if (filters.status !== 'all') {
         filteredOrders = filteredOrders.filter((order) => order.status === filters.status)
      }

      if (filters.searchQuery) {
         const query = filters.searchQuery.toLowerCase()
         filteredOrders = filteredOrders.filter(
            (order) =>
               order.doctorName.toLowerCase().includes(query) ||
               order.serviceName.toLowerCase().includes(query) ||
               order.orderNumber.toLowerCase().includes(query)
         )
      }

      if (filters.dateRange) {
         filteredOrders = filteredOrders.filter((order) => {
            const orderDate = new Date(order.appointmentDate)
            const fromDate = new Date(filters.dateRange!.from)
            const toDate = new Date(filters.dateRange!.to)
            return orderDate >= fromDate && orderDate <= toDate
         })
      }
   }

   return filteredOrders
}

export async function getBookingById(id: string): Promise<BookingOrder | null> {
   // Simulate API call
   await new Promise((resolve) => setTimeout(resolve, 500))

   return mockBookingOrders.find((booking) => booking.id === id) || null
}

export async function cancelBooking(id: string, reason?: string): Promise<BookingOrder> {
   // Simulate API call
   await new Promise((resolve) => setTimeout(resolve, 800))

   const booking = mockBookingOrders.find((booking) => booking.id === id)
   if (!booking) {
      throw new Error('Booking not found')
   }

   // Update booking status
   return {
      ...booking,
      status: 'cancelled' as const,
      notes: reason ? `Lý do hủy: ${reason}` : booking.notes,
      updatedAt: new Date()
   }
}

export async function rescheduleBooking(
   id: string,
   newDate: string,
   newTime: string
): Promise<BookingOrder> {
   // Simulate API call
   await new Promise((resolve) => setTimeout(resolve, 1000))

   const booking = mockBookingOrders.find((booking) => booking.id === id)
   if (!booking) {
      throw new Error('Booking not found')
   }

   // Update booking with new date and time
   return {
      ...booking,
      appointmentDate: newDate,
      appointmentTime: newTime,
      status: 'rescheduled' as const,
      updatedAt: new Date()
   }
}
