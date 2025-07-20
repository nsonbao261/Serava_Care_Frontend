/**
 * Format currency amount for Vietnamese market
 */
export function formatCurrency(amount: number, currency: string = 'VND'): string {
   if (currency === 'VND') {
      return new Intl.NumberFormat('vi-VN', {
         style: 'currency',
         currency: 'VND',
         minimumFractionDigits: 0,
         maximumFractionDigits: 0
      })
         .format(amount)
         .replace('₫', 'đ')
   }

   return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency
   }).format(amount)
}

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
 * Format file size in human readable format
 */
export function formatFileSize(bytes: number): string {
   if (bytes === 0) return '0 Bytes'

   const k = 1024
   const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
   const i = Math.floor(Math.log(bytes) / Math.log(k))

   return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

/**
 * Format number with thousands separator
 */
export function formatNumber(num: number): string {
   // Custom formatter to ensure consistent server/client rendering
   return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

/**
 * Format percentage
 */
export function formatPercentage(value: number, decimals: number = 1): string {
   return `${(value * 100).toFixed(decimals)}%`
}
