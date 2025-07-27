'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Clock, XCircle } from 'lucide-react'

interface QuestionStatusProps {
   question: Question
}

export function QuestionStatus({ question }: QuestionStatusProps) {
   if (question.status === 'pending') {
      return (
         <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-yellow-50 rounded-lg border border-yellow-200 p-6 text-center"
         >
            <Clock className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-yellow-900 mb-2">Câu hỏi đang chờ trả lời</h3>
            <p className="text-yellow-800 mb-4">
               Bác sĩ sẽ trả lời câu hỏi của bạn trong thời gian sớm nhất. Bạn sẽ nhận được thông
               báo khi có câu trả lời.
            </p>
            <div className="flex items-center justify-center space-x-4">
               <Link
                  href="/cau-hoi-cua-toi"
                  className="text-yellow-700 hover:text-yellow-800 font-medium"
               >
                  Quay lại danh sách
               </Link>
               <span className="text-yellow-500">•</span>
               <button className="text-yellow-700 hover:text-yellow-800 font-medium">
                  Chỉnh sửa câu hỏi
               </button>
            </div>
         </motion.div>
      )
   }

   if (question.status === 'rejected') {
      return (
         <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-red-50 rounded-lg border border-red-200 p-6 text-center"
         >
            <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-red-900 mb-2">Câu hỏi đã bị từ chối</h3>
            <p className="text-red-800 mb-4">
               Câu hỏi của bạn không phù hợp với quy định hoặc cần được điều chỉnh. Bạn có thể đặt
               câu hỏi mới hoặc liên hệ hỗ trợ để biết thêm chi tiết.
            </p>
            <div className="flex items-center justify-center space-x-4">
               <Link
                  href="/dat-cau-hoi"
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium"
               >
                  Đặt câu hỏi mới
               </Link>
               <Link
                  href="/cau-hoi-cua-toi"
                  className="text-red-700 hover:text-red-800 font-medium"
               >
                  Quay lại danh sách
               </Link>
            </div>
         </motion.div>
      )
   }

   return null
}
