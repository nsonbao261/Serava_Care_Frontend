import { Clock } from 'lucide-react'

export const TimeSelectSkeleton = () => {
   return (
      <div className="space-y-6 animate-pulse">
         <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
               <Clock className="w-5 h-5 mr-2 text-blue-600" />
               Chọn giờ khám
            </h3>
            <div className="grid grid-cols-4 gap-3">
               {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="h-10 rounded-lg border border-gray-200 bg-gray-100" />
               ))}
            </div>
         </div>
      </div>
   )
}
