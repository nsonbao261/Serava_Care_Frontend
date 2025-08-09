'use server'

import { request } from '@/lib/request'

export const getUserProfile = async () => {
   const response = await request<User>('users/profile', { requireAuth: true })

   return response.data
}

export const updateUserProfile = async (id: string, payload: Partial<User>) => {
   return await request(`users/${id}`, {
      method: 'PATCH',
      body: payload,
      requireAuth: true
   })
}
