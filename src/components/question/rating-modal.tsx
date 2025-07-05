'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

interface RatingModalProps {
   isOpen: boolean
   rating: number
   onRatingChange: (rating: number) => void
   onClose: () => void
   onSubmit: () => void
}

export function RatingModal({
   isOpen,
   rating,
   onRatingChange,
   onClose,
   onSubmit
}: RatingModalProps) {
   if (!isOpen) return null

   return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
         <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-lg p-6 max-w-md mx-4"
         >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Đánh giá câu trả lời</h3>
            <p className="text-gray-600 mb-6">
               Hãy cho biết mức độ hài lòng của bạn với câu trả lời này:
            </p>
            <div className="flex items-center justify-center space-x-2 mb-6">
               {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} onClick={() => onRatingChange(star)} className="p-1">
                     <Star
                        className={`h-8 w-8 ${
                           star <= rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
                        }`}
                     />
                  </button>
               ))}
            </div>
            <div className="flex items-center justify-end space-x-4">
               <button onClick={onClose} className="text-gray-600 hover:text-gray-800 font-medium">
                  Hủy
               </button>
               <button
                  onClick={onSubmit}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium"
               >
                  Gửi đánh giá
               </button>
            </div>
         </motion.div>
      </div>
   )
}
