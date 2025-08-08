type ApiResponse<T> = {
   statusCode: number
   message: string
   error?: string
   data?: T
}

interface ImageInfo {
   url: string
   alt: string
   width?: number
   height?: number
}