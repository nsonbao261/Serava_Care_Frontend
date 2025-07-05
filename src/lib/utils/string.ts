/**
 * String and Slug Utilities
 */

/**
 * Create URL-friendly slug from text (Vietnamese-aware)
 */
export function createSlug(text: string): string {
   return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
      .replace(/[đĐ]/g, 'd') // Handle Vietnamese đ
      .replace(/[^a-z0-9\s-]/g, '') // Remove special chars
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single
      .replace(/^-|-$/g, '') // Remove leading/trailing hyphens
}

/**
 * Parse slug back to readable text
 */
export function parseSlug(slug: string): string {
   return slug
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
}

/**
 * Capitalize first letter of each word
 */
export function titleCase(text: string): string {
   return text
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
}

/**
 * Capitalize first letter only
 */
export function capitalize(text: string): string {
   return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
}

/**
 * Convert text to camelCase
 */
export function toCamelCase(text: string): string {
   return text.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, char) => char.toUpperCase())
}

/**
 * Convert text to kebab-case
 */
export function toKebabCase(text: string): string {
   return text
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .toLowerCase()
      .replace(/\s+/g, '-')
}

/**
 * Convert text to snake_case
 */
export function toSnakeCase(text: string): string {
   return text
      .replace(/([a-z])([A-Z])/g, '$1_$2')
      .toLowerCase()
      .replace(/\s+/g, '_')
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, maxLength: number, suffix: string = '...'): string {
   if (text.length <= maxLength) return text

   const truncated = text.slice(0, maxLength - suffix.length)
   const lastSpace = truncated.lastIndexOf(' ')

   return lastSpace > 0 ? truncated.slice(0, lastSpace) + suffix : truncated + suffix
}

/**
 * Remove HTML tags from string
 */
export function stripHtml(html: string): string {
   return html.replace(/<[^>]*>/g, '')
}

/**
 * Escape HTML characters
 */
export function escapeHtml(text: string): string {
   const htmlEscapes: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
   }

   return text.replace(/[&<>"']/g, (char) => htmlEscapes[char])
}

/**
 * Generate initials from name
 */
export function getInitials(name: string, maxLength: number = 2): string {
   return name
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase())
      .slice(0, maxLength)
      .join('')
}

/**
 * Extract numeric value from string
 */
export function extractNumber(text: string): number {
   const match = text.match(/\d+/)
   return match ? parseInt(match[0]) : 0
}

/**
 * Extract all numbers from string
 */
export function extractNumbers(text: string): number[] {
   const matches = text.match(/\d+/g)
   return matches ? matches.map((match) => parseInt(match)) : []
}
