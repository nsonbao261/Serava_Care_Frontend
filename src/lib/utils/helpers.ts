/**
 * Date utilities
 */
export const getRelativeTime = (date: string | Date): string => {
   const dateObj = typeof date === 'string' ? new Date(date) : date
   const now = new Date()
   const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000)

   if (diffInSeconds < 60) return 'Vừa xong'
   if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} phút trước`
   if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} giờ trước`
   if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} ngày trước`

   return dateObj.toLocaleDateString('vi-VN')
}

/**
 * String utilities
 */
export const truncateText = (text: string, maxLength: number): string => {
   if (text.length <= maxLength) return text
   return text.substring(0, maxLength).trim() + '...'
}

export const capitalizeFirst = (text: string): string => {
   return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
}

export const slugify = (text: string): string => {
   return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
      .replace(/[^a-z0-9 -]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single
      .trim()
}

/**
 * Object utilities
 */
export const omit = <T extends Record<string, unknown>, K extends keyof T>(
   obj: T,
   keys: K[]
): Omit<T, K> => {
   const result = { ...obj }
   keys.forEach((key) => delete result[key])
   return result
}

export const pick = <T extends Record<string, unknown>, K extends keyof T>(
   obj: T,
   keys: K[]
): Pick<T, K> => {
   const result = {} as Pick<T, K>
   keys.forEach((key) => {
      if (key in obj) {
         result[key] = obj[key]
      }
   })
   return result
}

/**
 * URL and query utilities
 */
export const buildQueryString = (params: Record<string, unknown>): string => {
   const searchParams = new URLSearchParams()

   Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
         searchParams.append(key, String(value))
      }
   })

   const queryString = searchParams.toString()
   return queryString ? `?${queryString}` : ''
}

export const parseQueryString = (queryString: string): Record<string, string> => {
   const params = new URLSearchParams(queryString)
   const result: Record<string, string> = {}

   params.forEach((value, key) => {
      result[key] = value
   })

   return result
}

/**
 * Async utilities
 */
export const delay = (ms: number): Promise<void> => {
   return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Validation utilities
 */
export const isValidPhone = (phone: string): boolean => {
   const phoneRegex = /^[0-9]{10,11}$/
   return phoneRegex.test(phone)
}

/**
 * File utilities
 */
export const getFileExtension = (filename: string): string => {
   return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2)
}

export const isImageFile = (filename: string): boolean => {
   const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg']
   const extension = getFileExtension(filename).toLowerCase()
   return imageExtensions.includes(extension)
}
