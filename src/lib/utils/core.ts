import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge Tailwind CSS classes with clsx
 */
export function cn(...inputs: ClassValue[]) {
   return twMerge(clsx(inputs))
}

/**
 * Debounce utility function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
   func: T,
   wait: number
): (...args: Parameters<T>) => void {
   let timeout: NodeJS.Timeout | null = null

   return (...args: Parameters<T>) => {
      if (timeout) clearTimeout(timeout)
      timeout = setTimeout(() => func(...args), wait)
   }
}

/**
 * Throttle utility function
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
   func: T,
   wait: number
): (...args: Parameters<T>) => void {
   let lastTime = 0

   return (...args: Parameters<T>) => {
      const now = Date.now()
      if (now - lastTime >= wait) {
         lastTime = now
         func(...args)
      }
   }
}

/**
 * Sleep utility function
 */
export function sleep(ms: number): Promise<void> {
   return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Generate random ID
 */
export function generateId(length: number = 8): string {
   const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
   let result = ''
   for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
   }
   return result
}

/**
 * Check if value is empty (null, undefined, empty string, empty array, empty object)
 */
export function isEmpty(value: unknown): boolean {
   if (value == null) return true
   if (typeof value === 'string') return value.trim().length === 0
   if (Array.isArray(value)) return value.length === 0
   if (typeof value === 'object') return Object.keys(value).length === 0
   return false
}
