'use server'

import { request } from '@/libs'

export const getUserProfile = async () => {
   const response = await request<User>('users/profile', { authMode: 'auth' })

   return response.data
}

export const updateUserProfile = async (id: string, payload: Partial<User>) => {
   return await request(`users/${id}`, { method: 'PATCH', body: payload, authMode: 'auth' })
}
