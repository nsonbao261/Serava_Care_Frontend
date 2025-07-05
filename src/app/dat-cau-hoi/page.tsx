'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useQuestionForm, useAuth } from '@/hooks'
import { Upload, X, AlertCircle, Send } from 'lucide-react'
import { questionSpecialties } from '@/data'

export default function AskQuestionPage() {
   const router = useRouter()
   const { isAuthenticated, isLoading: authLoading } = useAuth()
   const { form, isSubmitting, submitError, submitSuccess, submittedQuestion, submitQuestion } =
      useQuestionForm()

   const {
      register,
      handleSubmit,
      formState: { errors },
      watch,
      setValue
   } = form

   // Redirect to login if not authenticated
   useEffect(() => {
      if (!authLoading && !isAuthenticated) {
         router.push('/login?returnUrl=/dat-cau-hoi')
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
               <button
                  onClick={() => router.push('/cau-hoi-cua-toi')}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
               >
                  Xem câu hỏi của tôi
               </button>
            </div>
         </div>
      )
   }

   return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
         <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
               {/* Header */}
               <div className="text-center mb-8">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">Đặt câu hỏi cho bác sĩ</h1>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                     Chia sẻ vấn đề sức khỏe của bạn và nhận được lời tư vấn từ các bác sĩ chuyên
                     khoa có kinh nghiệm
                  </p>
               </div>

               {/* Main Content */}
               <div className="bg-white rounded-2xl shadow-xl p-8">
                  <form onSubmit={handleSubmit(submitQuestion)} className="space-y-6">
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

                     {/* Submit Error */}
                     {submitError && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                           <div className="flex items-center">
                              <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                              <span className="text-red-700">{submitError}</span>
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
                                 Gửi câu hỏi
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

               {/* FAQ Section */}
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
