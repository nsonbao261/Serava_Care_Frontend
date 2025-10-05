import { axiosInstance } from '@/libs'

export const getDoctorTimeSlots = async (doctorId: string, workDate: string) => {
   const response = await axiosInstance.get<TimeSlot[]>(
      `timelines/${doctorId}/time-slots?workDate=${workDate}`
   )

   return response.data
}
