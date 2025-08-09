import { mockUserProfile } from '@/data'

export async function getUserByEmail(email: string): Promise<UserProfile | null> {
   try {
      const users = mockUserProfile.filter((user) => user.email === email)
      return users[0] || null
   } catch  {
      throw new Error('Không thể tải thông tin người dùng từ server')
   }
}

export async function createUser(
   userData: Omit<UserProfile, 'userId' | 'createdAt' | 'updatedAt'>
): Promise<UserProfile> {
   try {
      const userWithTimestamps: UserProfile = {
         userId: crypto.randomUUID 
            ? crypto.randomUUID() 
            : Math.random().toString(36).substring(2, 11),
         ...userData
      }
      mockUserProfile.push(userWithTimestamps)
      return userWithTimestamps
   } catch  {
      throw new Error('Không thể tạo tài khoản người dùng')
   }
}

export async function updateUser(
   userId: string,
   updates: Partial<UserProfile>
): Promise<UserProfile | null> {
   try {
      const user = mockUserProfile.find((user) => user.userId === userId)
      if (user) {
         Object.assign(user, updates)
         return user
      }
      return null
   } catch  {
      throw new Error('Không thể cập nhật thông tin người dùng')
   }
}

export function toAuthUser(userData: UserProfile): User {
   return {
      userId: userData.userId,
      email: userData.email,
      fullName: userData.fullName,
      birthDate: userData.birthDate,
      gender: userData.gender,
      avatar: userData.avatar,
      phoneNumber: userData.phoneNumber,
      address: userData.address
   }
}

export function fromAuthUser(
   user: User,
   additionalData?: Partial<UserProfile>
): Omit<UserProfile, 'userId' | 'createdAt' | 'updatedAt'> {
   return {
      email: user.email,
      fullName: user.fullName,
      birthDate: user.birthDate,
      gender: user.gender,
      avatar: user.avatar,
      phoneNumber: user.phoneNumber,
      ...additionalData
   }
}
