/**
 * Cache Service - Provides caching functionality for performance optimization
 */
export class CacheService {
   private static cache = new Map<string, { data: unknown; timestamp: number }>()
   private static readonly CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

   static set<T>(key: string, data: T): void {
      this.cache.set(key, { data, timestamp: Date.now() })
   }

   static get<T>(key: string): T | null {
      const cached = this.cache.get(key)
      if (!cached) return null

      if (Date.now() - cached.timestamp > this.CACHE_DURATION) {
         this.cache.delete(key)
         return null
      }

      return cached.data as T
   }

   static clear(): void {
      this.cache.clear()
   }

   static has(key: string): boolean {
      return this.cache.has(key)
   }

   static delete(key: string): boolean {
      return this.cache.delete(key)
   }

   static size(): number {
      return this.cache.size
   }

   static keys(): IterableIterator<string> {
      return this.cache.keys()
   }

   /**
    * Get or set cached data with a generator function
    */
   static async getOrSet<T>(
      key: string,
      generator: () => Promise<T>,
      customDuration?: number
   ): Promise<T> {
      const cached = this.get<T>(key)
      if (cached !== null) {
         return cached
      }

      const data = await generator()

      if (customDuration) {
         // Temporarily store the original duration
         const originalDuration = this.CACHE_DURATION
         // Set custom duration by manipulating the timestamp
         const customTimestamp = Date.now() - (originalDuration - customDuration)
         this.cache.set(key, { data, timestamp: customTimestamp })
      } else {
         this.set(key, data)
      }

      return data
   }

   /**
    * Clear expired cache entries
    */
   static clearExpired(): number {
      const now = Date.now()
      let cleared = 0

      for (const [key, value] of this.cache.entries()) {
         if (now - value.timestamp > this.CACHE_DURATION) {
            this.cache.delete(key)
            cleared++
         }
      }

      return cleared
   }

   /**
    * Get cache statistics
    */
   static getStats() {
      const now = Date.now()
      let expired = 0
      let valid = 0

      for (const value of this.cache.values()) {
         if (now - value.timestamp > this.CACHE_DURATION) {
            expired++
         } else {
            valid++
         }
      }

      return {
         total: this.cache.size,
         valid,
         expired,
         hitRate: valid / (valid + expired) || 0
      }
   }

   /**
    * Create a cache key from multiple parts
    */
   static createKey(...parts: (string | number | boolean)[]): string {
      return parts.map((part) => String(part)).join(':')
   }

   /**
    * Cache with tags for group invalidation
    */
   private static tags = new Map<string, Set<string>>()

   static setWithTags<T>(key: string, data: T, tags: string[]): void {
      this.set(key, data)

      // Associate this key with all provided tags
      tags.forEach((tag) => {
         if (!this.tags.has(tag)) {
            this.tags.set(tag, new Set())
         }
         this.tags.get(tag)!.add(key)
      })
   }

   static invalidateByTag(tag: string): number {
      const keys = this.tags.get(tag)
      if (!keys) return 0

      let deleted = 0
      keys.forEach((key) => {
         if (this.cache.delete(key)) {
            deleted++
         }
      })

      // Clean up the tag
      this.tags.delete(tag)

      // Remove this tag from other tag associations
      this.tags.forEach((tagKeys) => {
         keys.forEach((key) => tagKeys.delete(key))
      })

      return deleted
   }
}
