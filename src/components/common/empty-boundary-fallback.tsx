import React from 'react'

interface ErrorBoundaryFallbackProps {
   error: Error
   resetErrorBoundary: () => void
}

export const ErrorBoundaryFallback = React.memo<ErrorBoundaryFallbackProps>(
   ({ error, resetErrorBoundary }) => {
      return (
         <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center max-w-md mx-auto">
               <div className="text-6xl mb-4">😵</div>
               <h2 className="text-xl font-semibold text-gray-900 mb-2">Oops! Có lỗi xảy ra</h2>
               <p className="text-gray-600 mb-4">
                  {error.message || 'Đã xảy ra lỗi không mong muốn'}
               </p>
               <button
                  onClick={resetErrorBoundary}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
               >
                  Thử lại
               </button>
            </div>
         </div>
      )
   }
)

ErrorBoundaryFallback.displayName = 'ErrorBoundaryFallback'
