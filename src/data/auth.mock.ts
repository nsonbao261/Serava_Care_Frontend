// Mock data for auth service

// Helper functions for generating mock data
export const generateMockTokens = () => {
   const randomString = () =>
      Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
   return {
      accessToken: `mock_access_${randomString()}`,
      refreshToken: `mock_refresh_${randomString()}`
   }
}

export const generateMockUser = (
   email: string,
   fullName?: string,
   birthDate?: string,
   gender?: Gender
): User => {
   const name = fullName || email.split('@')[0]
   const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=3b82f6&color=fff`

   return {
      email,
      fullName: name,
      birthDate: birthDate || '1990-01-01',
      gender: gender || 'other',
      avatar: avatarUrl,
      phone: '+84 123 456 789'
   }
}
