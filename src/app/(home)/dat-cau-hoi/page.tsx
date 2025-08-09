'use client'

import React, { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import useSWR, { mutate } from 'swr'
import { Upload, X, AlertCircle, Send } from 'lucide-react'
import { questionSpecialties } from '@/data'
import { questionFormSchema, QuestionFormData } from '@/schemas'
import { submitQuestion } from '@/services'

// Fetcher for user's question submission quota/info
const fetchUserQuestionInfo = async (): Promise<{
   remainingFreeQuestions: number
   totalQuestions: number
   lastQuestionDate?: string
}> => {
   // Simulate API call to get user's question info
   await new Promise((resolve) => setTimeout(resolve, 500))
   return {
      remainingFreeQuestions: 1,
      totalQuestions: 5,
      lastQuestionDate: '2024-01-15'
   }
}

export default function AskQuestionPage() {
   const router = useRouter()
   const { data: session, status } = useSession()

   // Authentication state
   const isAuthenticated = !!session
   const authLoading = status === 'loading'

   // SWR for user question info
   const {
      data: userQuestionInfo,
      error: userInfoError,
      mutate: mutateUserInfo
   } = useSWR(isAuthenticated ? '/api/user/question-info' : null, fetchUserQuestionInfo, {
      revalidateOnFocus: false,
      dedupingInterval: 300000 // 5 minutes
   })

   // Form state
   const [isSubmitting, setIsSubmitting] = useState(false)
   const [submitError, setSubmitError] = useState<string | null>(null)
   const [submitSuccess, setSubmitSuccess] = useState(false)
   const [submittedQuestion, setSubmittedQuestion] = useState<Question | null>(null)

   // Form setup
   const form = useForm<QuestionFormData>({
      resolver: zodResolver(questionFormSchema),
      defaultValues: {
         title: '',
         content: '',
         specialty: '',
         isPublic: true,
         attachments: []
      }
   })

   const {
      register,
      handleSubmit,
      formState: { errors },
      watch,
      setValue,
      reset
   } = form

   // Handle question submission with SWR cache updates
   const handleQuestionSubmit = useCallback(
      async (data: QuestionFormData) => {
         try {
            setIsSubmitting(true)
            setSubmitError(null)

            const result = await submitQuestion(data)

            // Optimistically update user question info
            if (userQuestionInfo) {
               const updatedInfo = {
                  ...userQuestionInfo,
                  remainingFreeQuestions: Math.max(0, userQuestionInfo.remainingFreeQuestions - 1),
                  totalQuestions: userQuestionInfo.totalQuestions + 1,
                  lastQuestionDate: new Date().toISOString().split('T')[0]
               }
               await mutate('/api/user/question-info', updatedInfo, false)
            }

            // Update user's questions list cache
            await mutate(
               '/api/user/questions',
               (currentQuestions: Question[] = []) => {
                  return [result, ...currentQuestions]
               },
               false
            )

            setSubmittedQuestion(result)
            setSubmitSuccess(true)
            reset()

            // Revalidate to ensure consistency
            mutateUserInfo()
         } catch (error) {
            setSubmitError(error instanceof Error ? error.message : 'Có lỗi xảy ra khi gửi câu hỏi')
            // Revert optimistic update on error
            mutateUserInfo()
         } finally {
            setIsSubmitting(false)
         }
      },
      [reset, userQuestionInfo, mutateUserInfo]
   )

   // Redirect to sign-in if not authenticated
   useEffect(() => {
      if (!authLoading && !isAuthenticated) {
         router.push('/sign-in?returnUrl=/dat-cau-hoi')
      }
   }, [isAuthenticated, authLoading, router])

   // Handle file upload
   const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(event.target.files || [])
      setValue('attachments', files)
   }

   // Remove file from attachments
   const removeFile = (index: number) => {
      const currentFiles = watch('attachments') || []
      const newFiles = currentFiles.filter((_, i) => i !== index)
      setValue('attachments', newFiles)
   }

   // Loading state
   if (authLoading) {
      return <div className="min-h-screen flex items-center justify-center">Đang tải...</div>
   }

   // Not authenticated
   if (!isAuthenticated) {
      return null
   }

   // Success state
   if (submitSuccess && submittedQuestion) {
      return (
         <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
               <div className="text-6xl mb-4">✅</div>
               <h2 className="text-2xl font-bold text-green-600 mb-2">Gửi câu hỏi thành công!</h2>
               <p className="text-gray-600 mb-4">Bác sĩ sẽ trả lời trong thời gian sớm nhất.</p>
               <div className="space-y-3">
                  <button
                     onClick={() => router.push('/cau-hoi-cua-toi')}
                     className="block w-full bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                  >
                     Xem câu hỏi của tôi
                  </button>
                  <button
                     onClick={() => {
                        setSubmitSuccess(false)
                        setSubmittedQuestion(null)
                     }}
                     className="block w-full bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200"
                  >
                     Đặt câu hỏi khác
                  </button>
               </div>
            </div>
         </div>
      )
   }

   return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
         <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
               {/* Header with user info */}
               <div className="text-center mb-8">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">Đặt câu hỏi cho bác sĩ</h1>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                     Chia sẻ vấn đề sức khỏe của bạn và nhận được lời tư vấn từ các bác sĩ chuyên
                     khoa có kinh nghiệm
                  </p>

                  {/* User question info */}
                  {userQuestionInfo && (
                     <div className="mt-4 inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm">
                        <span>
                           Còn lại <strong>{userQuestionInfo.remainingFreeQuestions}</strong> câu
                           hỏi miễn phí
                        </span>
                     </div>
                  )}

                  {userInfoError && (
                     <div className="mt-4 inline-flex items-center px-4 py-2 bg-yellow-50 text-yellow-700 rounded-lg text-sm">
                        <AlertCircle className="h-4 w-4 mr-2" />
                        <span>Không thể tải thông tin tài khoản</span>
                     </div>
                  )}
               </div>

               {/* Main Content */}
               <div className="bg-white rounded-2xl shadow-xl p-8">
                  <form onSubmit={handleSubmit(handleQuestionSubmit)} className="space-y-6">
                     {/* Question Title */}
                     <div>
                        <label
                           htmlFor="title"
                           className="block text-sm font-semibold text-gray-700 mb-2"
                        >
                           Tiêu đề câu hỏi <span className="text-red-500">*</span>
                        </label>
                        <input
                           {...register('title')}
                           type="text"
                           id="title"
                           placeholder="Tóm tắt ngắn gọn vấn đề của bạn..."
                           className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                              errors.title
                                 ? 'border-red-300 bg-red-50'
                                 : 'border-gray-200 focus:border-blue-300'
                           }`}
                        />
                        {errors.title && (
                           <p className="mt-1 text-sm text-red-600 flex items-center">
                              <span className="mr-1">⚠️</span>
                              {errors.title.message}
                           </p>
                        )}
                     </div>

                     {/* Specialty Selection */}
                     <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                           Chọn chuyên khoa <span className="text-red-500">*</span>
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                           {questionSpecialties.map((specialty) => (
                              <button
                                 key={specialty.id}
                                 type="button"
                                 onClick={() => setValue('specialty', specialty.value)}
                                 className={`p-3 rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
                                    watch('specialty') === specialty.value
                                       ? 'border-blue-500 bg-blue-50 text-blue-700'
                                       : 'border-gray-200 hover:border-gray-300 text-gray-700'
                                 }`}
                              >
                                 <div className="text-2xl mb-1">{specialty.icon}</div>
                                 <div className="text-xs font-medium">{specialty.name}</div>
                              </button>
                           ))}
                        </div>
                        {errors.specialty && (
                           <p className="mt-2 text-sm text-red-600 flex items-center">
                              <span className="mr-1">⚠️</span>
                              {errors.specialty.message}
                           </p>
                        )}
                     </div>

                     {/* Question Content */}
                     <div>
                        <label
                           htmlFor="content"
                           className="block text-sm font-semibold text-gray-700 mb-2"
                        >
                           Mô tả chi tiết <span className="text-red-500">*</span>
                        </label>
                        <textarea
                           {...register('content')}
                           id="content"
                           rows={6}
                           placeholder="Mô tả chi tiết về triệu chứng, thời gian xuất hiện, mức độ nghiêm trọng..."
                           className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                              errors.content
                                 ? 'border-red-300 bg-red-50'
                                 : 'border-gray-200 focus:border-blue-300'
                           }`}
                        />
                        {errors.content && (
                           <p className="mt-1 text-sm text-red-600 flex items-center">
                              <span className="mr-1">⚠️</span>
                              {errors.content.message}
                           </p>
                        )}
                     </div>

                     {/* File Upload */}
                     <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                           Đính kèm hình ảnh (không bắt buộc)
                        </label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors duration-200">
                           <input
                              type="file"
                              accept="image/*"
                              multiple
                              onChange={handleFileUpload}
                              className="hidden"
                              id="file-upload"
                           />
                           <label htmlFor="file-upload" className="cursor-pointer">
                              <div className="text-gray-500">
                                 <Upload className="h-12 w-12 mx-auto mb-2" />
                                 <p className="text-sm">Nhấp để chọn hình ảnh</p>
                                 <p className="text-xs text-gray-400 mt-1">JPG, PNG tối đa 5MB</p>
                              </div>
                           </label>
                        </div>

                        {/* Display uploaded files */}
                        {watch('attachments')?.length > 0 && (
                           <div className="mt-4 space-y-2">
                              <p className="text-sm font-medium text-gray-700">Hình ảnh đã chọn:</p>
                              {watch('attachments').map((file: File, index: number) => (
                                 <div
                                    key={index}
                                    className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                                 >
                                    <div className="flex items-center">
                                       <span className="text-sm text-gray-600">📎 {file.name}</span>
                                    </div>
                                    <button
                                       type="button"
                                       onClick={() => removeFile(index)}
                                       className="text-red-500 hover:text-red-700"
                                    >
                                       <X className="h-4 w-4" />
                                    </button>
                                 </div>
                              ))}
                           </div>
                        )}
                     </div>

                     {/* Submit Error with retry option */}
                     {submitError && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                           <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                 <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                                 <span className="text-red-700">{submitError}</span>
                              </div>
                              <button
                                 type="button"
                                 onClick={() => setSubmitError(null)}
                                 className="text-red-500 hover:text-red-700"
                              >
                                 <X className="h-4 w-4" />
                              </button>
                           </div>
                        </div>
                     )}

                     {/* Cost information */}
                     {userQuestionInfo && userQuestionInfo.remainingFreeQuestions === 0 && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                           <div className="flex items-center">
                              <AlertCircle className="h-5 w-5 text-yellow-500 mr-2" />
                              <div>
                                 <p className="text-yellow-700 font-medium">
                                    Bạn đã hết lượt câu hỏi miễn phí
                                 </p>
                                 <p className="text-yellow-600 text-sm">
                                    Câu hỏi này sẽ được tính phí 50.000đ
                                 </p>
                              </div>
                           </div>
                        </div>
                     )}

                     {/* Submit Buttons */}
                     <div className="flex flex-col sm:flex-row gap-4 pt-6">
                        <button
                           type="submit"
                           disabled={isSubmitting}
                           className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center"
                        >
                           {isSubmitting ? (
                              <>
                                 <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                 Đang gửi...
                              </>
                           ) : (
                              <>
                                 <Send className="h-5 w-5 mr-2" />
                                 {userQuestionInfo?.remainingFreeQuestions === 0
                                    ? 'Gửi câu hỏi (50.000đ)'
                                    : 'Gửi câu hỏi'}
                              </>
                           )}
                        </button>

                        <button
                           type="button"
                           onClick={() => router.back()}
                           className="flex-1 sm:flex-initial bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200"
                        >
                           Hủy
                        </button>
                     </div>
                  </form>
               </div>

               {/* FAQ Section with dynamic content */}
               <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Câu hỏi thường gặp</h2>

                  <div className="space-y-4">
                     <div className="border-l-4 border-blue-500 pl-4">
                        <h3 className="font-semibold text-gray-900 mb-2">
                           Bác sĩ sẽ trả lời trong bao lâu?
                        </h3>
                        <p className="text-gray-600">
                           Thông thường bác sĩ sẽ trả lời trong vòng 24-48 giờ. Các trường hợp khẩn
                           cấp sẽ được ưu tiên xử lý.
                        </p>
                     </div>

                     <div className="border-l-4 border-green-500 pl-4">
                        <h3 className="font-semibold text-gray-900 mb-2">
                           Chi phí tư vấn như thế nào?
                        </h3>
                        <p className="text-gray-600">
                           {(userQuestionInfo?.remainingFreeQuestions ?? 0) > 0
                              ? `Bạn còn ${userQuestionInfo?.remainingFreeQuestions ?? 0} câu hỏi miễn phí. `
                              : ''}
                           Câu hỏi đầu tiên trong tháng hoàn toàn miễn phí. Các câu hỏi tiếp theo
                           tính phí 50.000đ/câu hỏi.
                        </p>
                     </div>

                     <div className="border-l-4 border-purple-500 pl-4">
                        <h3 className="font-semibold text-gray-900 mb-2">
                           Tôi có thể hỏi lại không?
                        </h3>
                        <p className="text-gray-600">
                           Có, bạn có thể đặt câu hỏi tiếp theo hoặc yêu cầu làm rõ thêm từ bác sĩ
                           đã trả lời.
                        </p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}
