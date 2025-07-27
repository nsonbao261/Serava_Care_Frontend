import { formatDate, formatTime } from '@/lib'
import { motion } from 'framer-motion'
import {
   Calendar,
   CheckCircle,
   ChevronRight,
   Clock,
   Eye,
   FileText,
   User,
   XCircle
} from 'lucide-react'
import React from 'react'

export const statusConfig = {
   answered: {
      label: 'Đã trả lời',
      color: 'bg-green-100 text-green-800',
      icon: CheckCircle,
      bgColor: 'bg-green-50'
   },
   pending: {
      label: 'Chờ trả lời',
      color: 'bg-yellow-100 text-yellow-800',
      icon: Clock,
      bgColor: 'bg-yellow-50'
   },
   rejected: {
      label: 'Từ chối',
      color: 'bg-red-100 text-red-800',
      icon: XCircle,
      bgColor: 'bg-red-50'
   }
}

interface QuestionCardProps {
   question: Question
   onView: (id: string) => void
}

export const QuestionCard = React.memo(({ question, onView }: QuestionCardProps) => {
   const StatusIcon = statusConfig[question.status].icon

   return (
      <motion.div
         whileHover={{ y: -2 }}
         className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all duration-200"
      >
         <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
               <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-2">
                  {question.title}
               </h3>
               <p className="text-gray-600 text-sm line-clamp-3 mb-3">{question.content}</p>
            </div>
            <span
               className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig[question.status].color} ml-4`}
            >
               <StatusIcon className="w-3 h-3 mr-1" />
               {statusConfig[question.status].label}
            </span>
         </div>

         <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm text-gray-500">
               <div className="flex items-center">
                  <FileText className="w-4 h-4 mr-1" />
                  {question.specialty}
               </div>
               <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {formatDate(question.createdAt.toISOString())}
               </div>
               <div className="flex items-center">
                  <Eye className="w-4 h-4 mr-1" />
                  {question.views} lượt xem
               </div>
            </div>

            <button
               onClick={() => onView(question.id)}
               className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            >
               Xem chi tiết
               <ChevronRight className="w-4 h-4 ml-1" />
            </button>
         </div>

         {question.status === 'answered' && question.doctorName && (
            <div className="mt-4 pt-4 border-t border-gray-100">
               <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                     <User className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                     <p className="text-sm font-medium text-gray-900">{question.doctorName}</p>
                     <p className="text-xs text-gray-500">{question.doctorSpecialty}</p>
                  </div>
                  {question.answeredAt && (
                     <div className="ml-auto text-xs text-gray-500">
                        {formatDate(question.answeredAt)} • {formatTime(question.answeredAt)}
                     </div>
                  )}
               </div>
            </div>
         )}
      </motion.div>
   )
})

QuestionCard.displayName = 'QuestionCard'
