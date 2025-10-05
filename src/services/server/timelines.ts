'use server'

import { request } from '@/libs'

export const getDoctorWorkDates = async (doctorId: string, startDate: string, endDate?: string) => {
   const params = new URLSearchParams({ startDate })
   if (endDate) params.append('endDate', endDate)

   const response = await request<WorkDate[]>(
      `timelines/${doctorId}/work-dates?${params.toString()}`
   )
   if (response.error) throw Error(response.message)
   return response.data!
}
