import { axiosInstance } from '@/lib'

export const createAppointment = async (bookingForm: BookingForm) => {
   const result = await axiosInstance.post('/appointments', bookingForm)
   return result
}
