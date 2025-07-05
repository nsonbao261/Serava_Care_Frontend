/**
 * Split an array into chunks of specified size
 */
export function chunk<T>(array: T[], size: number): T[][] {
   const chunks: T[][] = []
   for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size))
   }
   return chunks
}

/**
 * Get unique items from array, optionally by a specific key
 */
export function unique<T>(array: T[], key?: keyof T): T[] {
   if (!key) {
      return [...new Set(array)]
   }

   const seen = new Set()
   return array.filter((item) => {
      const value = item[key]
      if (seen.has(value)) {
         return false
      }
      seen.add(value)
      return true
   })
}

/**
 * Shuffle array items randomly
 */
export function shuffle<T>(array: T[]): T[] {
   const shuffled = [...array]
   for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
   }
   return shuffled
}

/**
 * Group array items by a key
 */
export function groupBy<T, K extends keyof T>(array: T[], key: K): Record<string, T[]> {
   return array.reduce(
      (groups, item) => {
         const groupKey = String(item[key])
         if (!groups[groupKey]) {
            groups[groupKey] = []
         }
         groups[groupKey].push(item)
         return groups
      },
      {} as Record<string, T[]>
   )
}
