/**
 * Validate email address format
 */
export function isValidEmail(email: string): boolean {
   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
   return emailRegex.test(email)
}

/**
 * Validate Vietnamese phone number format
 */
export function isValidPhoneNumber(phone: string): boolean {
   // Vietnamese phone number format
   const phoneRegex = /^(\+84|84|0)(3|5|7|8|9)[0-9]{8}$/
   return phoneRegex.test(phone.replace(/\s/g, ''))
}

/**
 * Validate password strength
 */
export function isValidPassword(password: string): boolean {
   // At least 8 characters, one uppercase, one lowercase, one number
   const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/
   return passwordRegex.test(password)
}

/**
 * Validate required fields in an object
 */
export function validateRequired<T extends Record<string, unknown>>(
   data: T,
   requiredFields: (keyof T)[]
): { isValid: boolean; missingFields: string[] } {
   const missingFields = requiredFields
      .filter((field) => {
         const value = data[field]
         return value === undefined || value === null || value === ''
      })
      .map((field) => String(field))

   return {
      isValid: missingFields.length === 0,
      missingFields
   }
}

/**
 * Validate URL format
 */
export function isValidUrl(url: string): boolean {
   try {
      new URL(url)
      return true
   } catch {
      return false
   }
}
