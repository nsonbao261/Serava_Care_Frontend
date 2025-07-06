'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth, useUserQuestions } from '@/hooks'
import { motion } from 'framer-motion'
import {
   Search,
   Filter,
   CheckCircle,
   Clock,
   XCircle,
   Plus,
   ChevronRight,
   MessageSquare
} from 'lucide-react'
import Link from 'next/link'
import { Question } from '@/types'
import { LoadingSpinner, EmptyState, ErrorBoundaryFallback, QuestionCard } from '@/components'

export default function MyQuestionsPage() {
   const { isAuthenticated, isLoading } = useAuth()
   const router = useRouter()
   const [isFilterOpen, setIsFilterOpen] = React.useState(false)
   const [isFiltering, setIsFiltering] = React.useState(false)
   const filterRef = React.useRef<HTMLDivElement>(null)

   const {
      filteredQuestions,
      isLoading: isDataLoading,
      error,
      selectedStatus,
      searchQuery,
      setSelectedStatus,
      setSearchQuery,
      refetch
   } = useUserQuestions({ initialStatus: 'answered' })

   // Close filter dropdown when clicking outside
   React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
            setIsFilterOpen(false)
         }
      }

      document.addEventListener('mousedown', handleClickOutside)
      return () => {
         document.removeEventListener('mousedown', handleClickOutside)
      }
   }, [])

   // Handle search filtering with delay
   React.useEffect(() => {
      if (searchQuery) {
         setIsFiltering(true)
         const timeoutId = setTimeout(() => {
            setIsFiltering(false)
         }, 300)
         return () => clearTimeout(timeoutId)
      }
   }, [searchQuery])

   // Only redirect if we're sure the user is not authenticated and not loading
   useEffect(() => {
      if (!isLoading && !isAuthenticated) {
         const currentUrl = encodeURIComponent('/cau-hoi-cua-toi')
         router.push(`/sign-in?returnUrl=${currentUrl}`)
      }
   }, [isAuthenticated, isLoading, router])

   const handleTabChange = (tab: Question['status']) => {
      setIsFiltering(true)
      setSelectedStatus(tab)
      // Simulate filtering delay for better UX
      setTimeout(() => {
         setIsFiltering(false)
      }, 300)
   }

   const handleViewQuestion = (questionId: string) => {
      router.push(`/cau-hoi-cua-toi/${questionId}`)
   }

   // Show loading state while checking authentication
   if (isLoading) {
      return (
         <div className="min-h-screen bg-gray-50">
            <div className="py-16">
               <LoadingSpinner size="lg" text="Đang kiểm tra thông tin đăng nhập..." />
            </div>
         </div>
      )
   }

   // Don't render anything if not authenticated (let middleware handle redirect)
   if (!isAuthenticated) {
      return null
   }

   // Show error state
   if (error) {
      return <ErrorBoundaryFallback error={new Error(error)} resetErrorBoundary={refetch} />
   }

   // Show loading state while fetching data
   if (isDataLoading) {
      return (
         <div className="min-h-screen bg-gray-50">
            <div className="py-16">
               <LoadingSpinner size="lg" text="Đang tải danh sách câu hỏi..." />
            </div>
         </div>
      )
   }

   const getQuestionCountByStatus = (status: Question['status']) => {
      return filteredQuestions.filter((q) => q.status === status).length
   }

   return (
      <div className="min-h-screen bg-gray-50">
         {/* Breadcrumb */}
         <div className="bg-white border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
               <nav className="flex items-center space-x-2 text-sm text-gray-500">
                  <Link href="/" className="hover:text-blue-600">
                     Trang chủ
                  </Link>
                  <ChevronRight className="h-4 w-4" />
                  <span className="text-gray-900">Câu hỏi của tôi</span>
               </nav>
            </div>
         </div>

         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
               <div>
                  <h1 className="text-2xl font-bold text-gray-900">Câu hỏi của tôi</h1>
                  <p className="text-gray-600 mt-1">Quản lý và theo dõi các câu hỏi đã gửi</p>
               </div>
               <Link
                  href="/dat-cau-hoi"
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium flex items-center space-x-2 transition-colors"
               >
                  <Plus className="h-5 w-5" />
                  <span>Đặt câu hỏi mới</span>
               </Link>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
               <div className="border-b border-gray-200">
                  <nav className="flex space-x-8 px-6" aria-label="Tabs">
                     <button
                        onClick={() => handleTabChange('answered')}
                        className={`py-4 px-1 border-b-2 font-medium text-sm ${
                           selectedStatus === 'answered'
                              ? 'border-green-500 text-green-600'
                              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                     >
                        <div className="flex items-center space-x-2">
                           <CheckCircle className="h-4 w-4" />
                           <span>Câu hỏi được trả lời</span>
                           <span className="bg-green-100 text-green-800 py-1 px-2 rounded-full text-xs">
                              {getQuestionCountByStatus('answered')}
                           </span>
                        </div>
                     </button>
                     <button
                        onClick={() => handleTabChange('pending')}
                        className={`py-4 px-1 border-b-2 font-medium text-sm ${
                           selectedStatus === 'pending'
                              ? 'border-yellow-500 text-yellow-600'
                              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                     >
                        <div className="flex items-center space-x-2">
                           <Clock className="h-4 w-4" />
                           <span>Câu hỏi chưa trả lời</span>
                           <span className="bg-yellow-100 text-yellow-800 py-1 px-2 rounded-full text-xs">
                              {getQuestionCountByStatus('pending')}
                           </span>
                        </div>
                     </button>
                     <button
                        onClick={() => handleTabChange('rejected')}
                        className={`py-4 px-1 border-b-2 font-medium text-sm ${
                           selectedStatus === 'rejected'
                              ? 'border-red-500 text-red-600'
                              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                     >
                        <div className="flex items-center space-x-2">
                           <XCircle className="h-4 w-4" />
                           <span>Câu hỏi bị từ chối</span>
                           <span className="bg-red-100 text-red-800 py-1 px-2 rounded-full text-xs">
                              {getQuestionCountByStatus('rejected')}
                           </span>
                        </div>
                     </button>
                  </nav>
               </div>

               {/* Search and Filter */}
               <div className="p-6 border-b border-gray-200">
                  <div className="flex flex-col sm:flex-row gap-4">
                     <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <input
                           type="text"
                           placeholder="Tìm kiếm câu hỏi..."
                           value={searchQuery}
                           onChange={(e) => setSearchQuery(e.target.value)}
                           className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                     </div>
                     <div className="relative" ref={filterRef}>
                        <button
                           onClick={() => setIsFilterOpen(!isFilterOpen)}
                           className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                           <Filter className="h-5 w-5 text-gray-400" />
                           <span className="text-gray-700">Bộ lọc</span>
                        </button>
                        {isFilterOpen && (
                           <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                              <div className="p-4">
                                 <h3 className="text-sm font-medium text-gray-900 mb-3">
                                    Lọc theo trạng thái
                                 </h3>
                                 <div className="space-y-2">
                                    <label className="flex items-center">
                                       <input
                                          type="radio"
                                          name="filter-status"
                                          value="all"
                                          checked={selectedStatus === 'all'}
                                          onChange={() => setSelectedStatus('all')}
                                          className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                                       />
                                       <span className="ml-2 text-sm text-gray-700">Tất cả</span>
                                    </label>
                                    <label className="flex items-center">
                                       <input
                                          type="radio"
                                          name="filter-status"
                                          value="answered"
                                          checked={selectedStatus === 'answered'}
                                          onChange={() => setSelectedStatus('answered')}
                                          className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                                       />
                                       <span className="ml-2 text-sm text-gray-700">
                                          Đã trả lời
                                       </span>
                                    </label>
                                    <label className="flex items-center">
                                       <input
                                          type="radio"
                                          name="filter-status"
                                          value="pending"
                                          checked={selectedStatus === 'pending'}
                                          onChange={() => setSelectedStatus('pending')}
                                          className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                                       />
                                       <span className="ml-2 text-sm text-gray-700">
                                          Chờ trả lời
                                       </span>
                                    </label>
                                    <label className="flex items-center">
                                       <input
                                          type="radio"
                                          name="filter-status"
                                          value="rejected"
                                          checked={selectedStatus === 'rejected'}
                                          onChange={() => setSelectedStatus('rejected')}
                                          className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                                       />
                                       <span className="ml-2 text-sm text-gray-700">
                                          Bị từ chối
                                       </span>
                                    </label>
                                 </div>
                              </div>
                           </div>
                        )}
                     </div>
                  </div>
               </div>
            </div>

            {/* Questions List */}
            {isFiltering ? (
               <div className="py-16">
                  <LoadingSpinner size="lg" text="Đang lọc câu hỏi..." />
               </div>
            ) : filteredQuestions.length === 0 ? (
               <EmptyState
                  icon={<MessageSquare className="h-16 w-16 text-gray-400 mx-auto" />}
                  title={
                     selectedStatus === 'answered'
                        ? 'Chưa có câu hỏi nào được trả lời'
                        : selectedStatus === 'pending'
                          ? 'Không có câu hỏi nào đang chờ trả lời'
                          : 'Không có câu hỏi nào bị từ chối'
                  }
                  description={
                     selectedStatus === 'pending'
                        ? 'Hãy đặt câu hỏi đầu tiên để nhận được tư vấn từ bác sĩ'
                        : 'Khi có câu hỏi mới, chúng sẽ hiển thị ở đây'
                  }
                  action={
                     <Link
                        href="/dat-cau-hoi"
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium inline-flex items-center space-x-2 transition-colors"
                     >
                        <Plus className="h-5 w-5" />
                        <span>Đặt câu hỏi ngay</span>
                     </Link>
                  }
               />
            ) : (
               <div className="space-y-4">
                  {filteredQuestions.map((question, index) => (
                     <motion.div
                        key={question.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                     >
                        <QuestionCard question={question} onView={handleViewQuestion} />
                     </motion.div>
                  ))}
               </div>
            )}
         </div>
      </div>
   )
}
