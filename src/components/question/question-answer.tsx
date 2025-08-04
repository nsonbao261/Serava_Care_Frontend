'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { User, Star, ThumbsUp, ThumbsDown, Flag } from 'lucide-react'

interface QuestionAnswerProps {
   question: Question
   formatDate: (dateString: string) => string
   onRate: () => void
}

export function QuestionAnswer({ question, formatDate, onRate }: QuestionAnswerProps) {
   if (question.status !== 'answered' || !question.answer) {
      return null
   }

   return (
      <motion.div
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ delay: 0.2 }}
         className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6"
      >
         <div className="bg-green-50 px-6 py-4 rounded-t-lg border-b border-green-100">
            <div className="flex items-center justify-between">
               <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 bg-green-200 rounded-full flex items-center justify-center">
                     <User className="h-6 w-6 text-green-700" />
                  </div>
                  <div>
                     <h4 className="font-semibold text-green-900">{question.doctorName}</h4>
                     <p className="text-sm text-green-700">{question.doctorSpecialty}</p>
                  </div>
               </div>
               <div className="text-right">
                  <div className="text-sm text-green-700">
                     Trả lời vào {formatDate(question.answeredAt!.toISOString())}
                  </div>
                  {question.rating && (
                     <div className="flex items-center space-x-1 mt-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium text-gray-700">{question.rating}</span>
                     </div>
                  )}
               </div>
            </div>
         </div>

         <div className="p-6">
            <div className="prose max-w-none">
               <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                  {question.answer}
               </div>
            </div>

            {/* Rating Section */}
            {!question.hasRated && (
               <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                     <span className="text-sm font-medium text-gray-700">
                        Câu trả lời này có hữu ích không?
                     </span>
                     <div className="flex items-center space-x-2">
                        <button
                           onClick={onRate}
                           className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                        >
                           <Star className="h-4 w-4" />
                           <span>Đánh giá</span>
                        </button>
                        <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                           <ThumbsUp className="h-5 w-5" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                           <ThumbsDown className="h-5 w-5" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-orange-600 transition-colors">
                           <Flag className="h-5 w-5" />
                        </button>
                     </div>
                  </div>
               </div>
            )}

            {question.hasRated && (
               <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="text-center text-sm text-gray-600">
                     Cảm ơn bạn đã đánh giá câu trả lời này!
                  </div>
               </div>
            )}
         </div>
      </motion.div>
   )
}
