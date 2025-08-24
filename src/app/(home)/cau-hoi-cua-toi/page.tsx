import { motion } from 'framer-motion'
import { Calendar, ChevronRight, Eye, FileText, User } from 'lucide-react'
import { formatDate, formatTime } from '@/lib'

export default function MyQuestionsPage() {
   return <div>Not Implemented</div>
}

const QuestionCard = ({ question }: { question: Question }) => (
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
            onClick={() => console.log(question.id)}
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
