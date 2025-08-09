'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import useSWR, { mutate } from 'swr'
import {
   QuestionHeader,
   QuestionContent,
   QuestionAnswer,
   QuestionStatus,
   RatingModal,
   LoadingSpinner
} from '@/components'
import { formatDate } from '@/lib'

// SWR fetcher
const fetcher = async (url: string): Promise<Question> => {
   // Simulate API call delay
   await new Promise((resolve) => setTimeout(resolve, 1000))

   // Extract questionId from URL
   const questionId = url.split('/').pop()

   // Mock data - in real app, this would be an actual API call
   const mockQuestion: Question = {
      id: questionId as string,
      title: 'Tôi bị đau bụng từ mấy ngày nay',
      content: `Mấy hôm nay tôi bị đau bụng dữ dội, đặc biệt là vào buổi tối. Cơn đau thường kéo dài khoảng 30 phút và có cảm giác như bị thắt lại.

      Tôi đã thử uống thuốc giảm đau nhưng không có hiệu quả. Đôi khi còn đi kèm với buồn nôn và ợ hơi.

      Xin bác sĩ tư vấn giúp em, em có cần đi khám ngay không ạ?`,
      specialty: 'Tiêu hóa',
      status: 'answered',
      createdAt: new Date('2024-01-15T10:30:00Z'),
      updatedAt: new Date('2024-01-15T14:20:00Z'),
      answeredAt: new Date('2024-01-15T14:20:00Z'),
      doctorName: 'BS. Nguyễn Văn A',
      doctorSpecialty: 'Tiêu hóa',
      doctorImage: '/placeholder.svg',
      answer: `Chào bạn,

Dựa trên triệu chứng bạn mô tả, có thể bạn đang gặp vấn đề về dạ dày hoặc hệ tiêu hóa. Việc đau bụng kéo dài nhiều ngày kèm buồn nôn là dấu hiệu cần được quan tâm.

**Những điều bạn nên làm ngay:**
1. Tạm thời ăn nhẹ, tránh thức ăn cay nóng, dầu mỡ
2. Uống nhiều nước, chia nhỏ bữa ăn
3. Nghỉ ngơi đầy đủ, tránh stress

**Khi nào cần đi khám ngay:**
- Đau bụng tăng dần và không giảm
- Sốt cao, nôn ói nhiều
- Đại tiện có máu hoặc màu đen

Tôi khuyên bạn nên đến khám trực tiếp để được thầy thuốc chẩn đoán chính xác và có phương pháp điều trị phù hợp. Có thể cần làm một số xét nghiệm để xác định nguyên nhân.

Chúc bạn sớm khỏe!`,
      views: 45,
      isPublic: true,
      rating: 4.8,
      hasRated: false,
      attachments: [
         {
            id: '1',
            name: 'hinh_anh_bung.jpg',
            type: 'image',
            url: '/placeholder.svg'
         },
         {
            id: '2',
            name: 'ket_qua_xet_nghiem.pdf',
            type: 'pdf',
            url: '/api/placeholder/file.pdf'
         }
      ]
   }

   return mockQuestion
}

export default function QuestionDetailPage() {
   const { data: session, status } = useSession()
   const router = useRouter()
   const params = useParams()
   const questionId = params.id as string

   // Authentication state
   const isAuthenticated = !!session
   const authLoading = status === 'loading'

   // SWR for data fetching
   const {
      data: question,
      error,
      isLoading
   } = useSWR(isAuthenticated ? `/api/questions/${questionId}` : null, fetcher, {
      revalidateOnFocus: false,
      dedupingInterval: 5000
   })

   const [showRating, setShowRating] = useState(false)
   const [rating, setRating] = useState(5)

   // Only redirect if we're sure the user is not authenticated and not loading
   useEffect(() => {
      if (!authLoading && !isAuthenticated) {
         const currentUrl = encodeURIComponent(`/cau-hoi-cua-toi/${questionId}`)
         router.push(`/sign-in?returnUrl=${currentUrl}`)
      }
   }, [isAuthenticated, authLoading, router, questionId])

   const handleRateAnswer = async (newRating: number) => {
      setRating(newRating)

      try {
         // Simulate API call
         await new Promise((resolve) => setTimeout(resolve, 500))

         // Optimistically update the cache
         if (question) {
            const updatedQuestion = { ...question, rating: newRating, hasRated: true }
            await mutate(`/api/questions/${questionId}`, updatedQuestion, false)
         }

         setShowRating(false)
      } catch (error) {
         console.error('Failed to rate answer:', error)
         // Could show error toast here
      }
   }

   if (authLoading) {
      return null // Middleware handle the redirect
   }

   if (!isAuthenticated) {
      return null // Middleware handle the redirect
   }

   if (error) {
      return (
         <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
               <h2 className="text-xl font-semibold text-gray-900 mb-2">Không thể tải câu hỏi</h2>
               <p className="text-gray-600 mb-4">
                  Đã xảy ra lỗi khi tải dữ liệu. Vui lòng thử lại.
               </p>
               <button
                  onClick={() => mutate(`/api/questions/${questionId}`)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
               >
                  Thử lại
               </button>
            </div>
         </div>
      )
   }

   if (isLoading) {
      return (
         <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <LoadingSpinner size="lg" text="Đang tải câu hỏi..." />
         </div>
      )
   }

   if (!question) {
      return (
         <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
               <h2 className="text-xl font-semibold text-gray-900 mb-2">Không tìm thấy câu hỏi</h2>
               <p className="text-gray-600">Câu hỏi này có thể đã bị xóa hoặc không tồn tại.</p>
            </div>
         </div>
      )
   }

   return (
      <div className="min-h-screen bg-gray-50">
         <QuestionHeader question={question} />

         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
            {/* Question Content */}
            <QuestionContent question={question} formatDate={formatDate} />

            {/* Answer Section */}
            <QuestionAnswer
               question={question}
               formatDate={formatDate}
               onRate={() => setShowRating(true)}
            />

            {/* Status Sections for pending/rejected */}
            <QuestionStatus question={question} />
         </div>

         {/* Rating Modal */}
         <RatingModal
            isOpen={showRating}
            rating={rating}
            onRatingChange={setRating}
            onClose={() => setShowRating(false)}
            onSubmit={() => handleRateAnswer(rating)}
         />
      </div>
   )
}
