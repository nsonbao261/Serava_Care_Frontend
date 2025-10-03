'use server'

import { request } from '@/lib/request'

export const getDoctorWorkDates = async (doctorId: string, startDate: string, endDate?: string) => {
   const params = new URLSearchParams({ startDate })
   if (endDate) params.append('endDate', endDate)

   const response = await request<string[]>(`timelines/${doctorId}/work-dates?${params.toString()}`)
   if (response.error) throw Error(response.message)
   return response.data!
}
