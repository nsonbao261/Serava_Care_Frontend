import { mockUserProfile } from '@/data'

export async function getUserByEmail(email: string): Promise<UserProfile | null> {
   const users = mockUserProfile.filter((user) => user.email === email)
   return users[0] || null
}

export async function getUserById(id: string): Promise<UserProfile | null> {
   return mockUserProfile.find((user) => user.id === id) || null
}

export async function createUser(
   userData: Omit<UserProfile, 'id' | 'createdAt' | 'updatedAt'>
): Promise<UserProfile> {
   const userWithTimestamps: UserProfile = {
      id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 11),
      ...userData
   }
   mockUserProfile.push(userWithTimestamps)
   return userWithTimestamps
}

export async function updateUser(
   id: string,
   updates: Partial<UserProfile>
): Promise<UserProfile | null> {
   const user = mockUserProfile.find((user) => user.id === id)
   if (user) {
      Object.assign(user, updates)
      return user
   }
   return null
}

export async function deleteUser(id: string): Promise<boolean> {
   const index = mockUserProfile.findIndex((user) => user.id === id)
   if (index !== -1) {
      mockUserProfile.splice(index, 1)
      return true
   }
   return false
}

export async function updateUserProfile(
   id: string,
   profileData: Partial<UserProfile>
): Promise<UserProfile | null> {
   return updateUser(id, profileData)
}

// Convert UserProfile to User (for auth service compatibility)
export function toAuthUser(userData: UserProfile): User {
   return {
      email: userData.email,
      fullName: userData.fullName,
      birthDate: userData.birthDate,
      gender: userData.gender,
      avatar: userData.avatar,
      phone: userData.phone,
      address: userData.address
   }
}

// Convert User to UserProfile
export function fromAuthUser(
   user: User,
   additionalData?: Partial<UserProfile>
): Omit<UserProfile, 'id' | 'createdAt' | 'updatedAt'> {
   return {
      email: user.email,
      fullName: user.fullName,
      birthDate: user.birthDate,
      gender: user.gender,
      avatar: user.avatar,
      phone: user.phone,
      ...additionalData
   }
}
