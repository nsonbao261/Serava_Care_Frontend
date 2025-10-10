interface ApiResponse<T> {
   statusCode: number
   message: string
   error?: string
   data?: T
}

interface PaginationRequest {
   page?: number
   size?: number
   sortBy?: string
   orderby?: string
}

interface PaginationMeta {
   page: number
   size: number
   totalItems: number
   totalPages: number
}

interface PaginationResponse<T> {
   items: T[]
   metadata: PaginationMeta
}
