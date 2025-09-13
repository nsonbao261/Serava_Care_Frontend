import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Merge Tailwind CSS classes with clsx
export function cn(...inputs: ClassValue[]) {
   return twMerge(clsx(inputs))
}

export const getChangedFields = <T extends Record<string, unknown>>(original: T, updated: T) => {
   const changed: Partial<T> = {}

   for (const key in updated) {
      if (updated[key] !== original[key]) {
         changed[key] = updated[key]
      }
   }

   return Object.keys(changed).length > 0 ? changed : undefined
}
