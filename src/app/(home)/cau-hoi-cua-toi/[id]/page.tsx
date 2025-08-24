import { notFound } from 'next/navigation'
import { getQuestionById } from '@/services'
import Link from 'next/link'
import {
   ArrowLeft,
   Calendar,
   ChevronRight,
   Clock,
   Download,
   Eye,
   FileText,
   Image as ImageIcon,
   Share2,
   Star,
   User,
   XCircle
} from 'lucide-react'
import { formatDate } from '@/lib'
import Image from 'next/image'

export default async function QuestionDetailPage({ params }: { params: Promise<{ id: string }> }) {
   const { id } = await params
   const question = await getQuestionById(id)

   if (!question) notFound()

   return (
      <div className="min-h-screen bg-gray-50">
         <QuestionHeader question={question} />

         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
            {/* Question Content */}
            <QuestionContent question={question} />

            {/* Answer Section */}
            <QuestionAnswer question={question} />

            {/* Status Sections */}
            <QuestionStatus question={question} />
         </div>
      </div>
   )
}

const QuestionHeader = ({ question }: { question: Question }) => (
   <>
      {/* Breadcrumb */}
      <div className="bg-white border-b">
         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex items-center space-x-2 text-sm text-gray-500">
               <Link href="/" className="hover:text-blue-600">
                  Trang chủ
               </Link>
               <ChevronRight className="h-4 w-4" />
               <Link href="/cau-hoi-cua-toi" className="hover:text-blue-600">
                  Câu hỏi của tôi
               </Link>
               <ChevronRight className="h-4 w-4" />
               <span className="text-gray-900 truncate">Chi tiết câu hỏi</span>
            </nav>
         </div>
      </div>

      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
         <div className="flex items-center space-x-4">
            <Link
               href="/cau-hoi-cua-toi"
               className="p-2 hover:bg-white rounded-lg transition-colors border border-gray-200"
            >
               <ArrowLeft className="h-5 w-5 text-gray-600" />
            </Link>
            <div className="flex-1">
               <div className="flex items-center space-x-3 mb-2">
                  <span className="text-sm text-gray-500">Chuyên khoa: {question.specialty}</span>
               </div>
               <h1 className="text-2xl font-bold text-gray-900">{question.title}</h1>
            </div>
         </div>
      </div>
   </>
)

const QuestionContent = ({ question }: { question: Question }) => (
   <div className="p-6">
      <div className="flex items-center justify-between mb-6">
         <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
               <Calendar className="h-4 w-4" />
               <span>Đăng: {formatDate(question.createdAt.toISOString())}</span>
            </div>
            <div className="flex items-center space-x-1">
               <Eye className="h-4 w-4" />
               <span>{question.views} lượt xem</span>
            </div>
         </div>
         <div className="flex items-center space-x-2">
            {question.isPublic && (
               <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                  Công khai
               </span>
            )}
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
               <Share2 className="h-4 w-4 text-gray-500" />
            </button>
         </div>
      </div>

      <div className="prose max-w-none">
         <div className="whitespace-pre-line text-gray-700 leading-relaxed">{question.content}</div>
      </div>

      {/* Attachments */}
      {question.attachments && question.attachments.length > 0 && (
         <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="font-medium text-gray-900 mb-4 flex items-center">
               <FileText className="h-5 w-5 mr-2" />
               Tệp đính kèm ({question.attachments.length})
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               {question.attachments.map((attachment) => (
                  <div key={attachment.id} className="border border-gray-200 rounded-lg p-4">
                     {attachment.type === 'image' ? (
                        <div className="space-y-3">
                           <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                              <Image
                                 src={attachment.url}
                                 alt={attachment.name}
                                 fill
                                 className="object-cover"
                              />
                           </div>
                           <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                 <ImageIcon className="h-4 w-4 text-blue-500" />
                                 <span className="text-sm text-gray-700">{attachment.name}</span>
                              </div>
                              <button className="text-blue-600 hover:text-blue-700 text-sm">
                                 <Download className="h-4 w-4" />
                              </button>
                           </div>
                        </div>
                     ) : (
                        <div className="flex items-center justify-between">
                           <div className="flex items-center space-x-3">
                              <FileText className="h-8 w-8 text-red-500" />
                              <div>
                                 <div className="font-medium text-gray-900">{attachment.name}</div>
                                 <div className="text-sm text-gray-500">PDF Document</div>
                              </div>
                           </div>
                           <button className="text-blue-600 hover:text-blue-700">
                              <Download className="h-5 w-5" />
                           </button>
                        </div>
                     )}
                  </div>
               ))}
            </div>
         </div>
      )}
   </div>
)

const QuestionAnswer = ({ question }: { question: Question }) => {
   if (question.status !== 'answered' || !question.answer) return null

   return (
      <div>
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
         </div>
      </div>
   )
}

const QuestionStatus = ({ question }: { question: Question }) => {
   if (question.status === 'pending') {
      return (
         <div>
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
         </div>
      )
   }

   if (question.status === 'rejected') {
      return (
         <div>
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
         </div>
      )
   }

   return null
}
