import { Star, User, ThumbsUp } from 'lucide-react'
import { Button } from '@/components'

interface ReviewsSectionProps {
   rating: number
   reviewCount: number
}

export function ReviewsSection({ rating, reviewCount }: ReviewsSectionProps) {
   return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
         <h3 className="text-lg font-bold text-gray-900 mb-4">Đánh giá bệnh nhân</h3>
         <div className="flex items-center mb-4">
            <div className="flex items-center">
               {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                     key={star}
                     className={`h-5 w-5 ${
                        star <= Math.floor(rating)
                           ? 'text-yellow-400 fill-current'
                           : 'text-gray-300'
                     }`}
                  />
               ))}
            </div>
            <span className="ml-2 text-lg font-semibold">{rating}</span>
            <span className="ml-1 text-gray-500">({reviewCount} đánh giá)</span>
         </div>

         <div className="space-y-3">
            <div className="border-b border-gray-100 pb-3">
               <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                     <User className="h-4 w-4 text-gray-600" />
                  </div>
                  <div>
                     <div className="text-sm font-medium">Nguyễn T.</div>
                     <div className="text-xs text-gray-500">2 ngày trước</div>
                  </div>
               </div>
               <p className="text-sm text-gray-700">
                  &ldquo;Bác sĩ rất tận tâm và chu đáo. Giải thích rõ ràng về tình trạng
                  bệnh.&rdquo;
               </p>
               <div className="flex items-center mt-2">
                  <ThumbsUp className="h-4 w-4 text-gray-400 mr-1" />
                  <span className="text-xs text-gray-500">Hữu ích (5)</span>
               </div>
            </div>
         </div>

         <Button variant="outline" className="w-full mt-4">
            Xem tất cả đánh giá
         </Button>
      </div>
   )
}
