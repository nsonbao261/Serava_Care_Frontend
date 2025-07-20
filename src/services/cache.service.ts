// Private cache storage
const cache = new Map<string, { data: unknown; timestamp: number }>()
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

// Private tags storage
const tags = new Map<string, Set<string>>()

export function set<T>(key: string, data: T): void {
   cache.set(key, { data, timestamp: Date.now() })
}

export function get<T>(key: string): T | null {
   const cached = cache.get(key)
   if (!cached) return null

   if (Date.now() - cached.timestamp > CACHE_DURATION) {
      cache.delete(key)
      return null
   }

   return cached.data as T
}

export function clear(): void {
   cache.clear()
}

export function has(key: string): boolean {
   return cache.has(key)
}

export function deleteKey(key: string): boolean {
   return cache.delete(key)
}

export function size(): number {
   return cache.size
}

export function keys(): IterableIterator<string> {
   return cache.keys()
}

/**
 * Get or set cached data with a generator function
 */
export async function getOrSet<T>(
   key: string,
   generator: () => Promise<T>,
   customDuration?: number
): Promise<T> {
   const cached = get<T>(key)
   if (cached !== null) {
      return cached
   }

   const data = await generator()

   if (customDuration) {
      // Temporarily store the original duration
      const originalDuration = CACHE_DURATION
      // Set custom duration by manipulating the timestamp
      const customTimestamp = Date.now() - (originalDuration - customDuration)
      cache.set(key, { data, timestamp: customTimestamp })
   } else {
      set(key, data)
   }

   return data
}

/**
 * Clear expired cache entries
 */
export function clearExpired(): number {
   const now = Date.now()
   let cleared = 0

   for (const [key, value] of cache.entries()) {
      if (now - value.timestamp > CACHE_DURATION) {
         cache.delete(key)
         cleared++
      }
   }

   return cleared
}

/**
 * Get cache statistics
 */
export function getStats() {
   const now = Date.now()
   let expired = 0
   let valid = 0

   for (const value of cache.values()) {
      if (now - value.timestamp > CACHE_DURATION) {
         expired++
      } else {
         valid++
      }
   }

   return {
      total: cache.size,
      valid,
      expired,
      hitRate: valid / (valid + expired) || 0
   }
}

/**
 * Create a cache key from multiple parts
 */
export function createKey(...parts: (string | number | boolean)[]): string {
   return parts.map((part) => String(part)).join(':')
}

/**
 * Cache with tags for group invalidation
 */
export function setWithTags<T>(key: string, data: T, tagList: string[]): void {
   set(key, data)

   // Associate this key with all provided tags
   tagList.forEach((tag) => {
      if (!tags.has(tag)) {
         tags.set(tag, new Set())
      }
      tags.get(tag)!.add(key)
   })
}

export function invalidateByTag(tag: string): number {
   const keys = tags.get(tag)
   if (!keys) return 0

   let deleted = 0
   keys.forEach((key) => {
      if (cache.delete(key)) {
         deleted++
      }
   })

   // Clean up the tag
   tags.delete(tag)

   // Remove this tag from other tag associations
   tags.forEach((tagKeys) => {
      keys.forEach((key) => tagKeys.delete(key))
   })

   return deleted
}
