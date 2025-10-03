'use client'

import { axiosInstance } from '@/lib'

export const getDoctorTimeSlots = async (doctorId: string, workDate: string) => {
   const response = await axiosInstance.get<TimeSlot[]>(
      `timelines/${doctorId}/time-slots?workDate=${workDate}`
   )

   return response.data
}
