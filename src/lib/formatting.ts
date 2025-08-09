/**
 * Format date for Vietnamese locale
 */
export function formatDate(date: string | Date, locale: string = 'vi-VN'): string {
   const dateObj = typeof date === 'string' ? new Date(date) : date
   return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
   }).format(dateObj)
}

/**
 * Format time for Vietnamese locale
 */
export function formatTime(date: string | Date, locale: string = 'vi-VN'): string {
   const dateObj = typeof date === 'string' ? new Date(date) : date
   return new Intl.DateTimeFormat(locale, {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
   }).format(dateObj)
}

/**
 * Format number with thousands separator
 */
export function formatNumber(num: number): string {
   // Custom formatter to ensure consistent server/client rendering
   return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}