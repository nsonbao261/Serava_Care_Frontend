// Performance utilities for component monitoring
export const measurePerformance = (componentName: string) => {
   const startTime = performance.now()

   return {
      end: () => {
         const endTime = performance.now()
         const duration = endTime - startTime

         if (process.env.NODE_ENV === 'development') {
            console.log(`${componentName} render time: ${duration.toFixed(2)}ms`)
         }

         return duration
      }
   }
}
