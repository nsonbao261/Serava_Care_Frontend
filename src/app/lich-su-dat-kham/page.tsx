'use client'

import React, { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth, useBookingData } from '@/hooks'
import { BookingCard, LoadingSpinner, EmptyState } from '@/components'
import { BOOKING_STATUS_CONFIG, SERVICE_ICONS } from '@/constants'
import { Search, Calendar, ChevronDown } from 'lucide-react'
import { motion } from 'framer-motion'

export default function BookingHistoryPage() {
   const router = useRouter()
   const { isAuthenticated, isLoading: authLoading } = useAuth()
   const [isFilterOpen, setIsFilterOpen] = React.useState(false)
   const filterRef = useRef<HTMLDivElement>(null)

   const { filteredBookings, isLoading, error, filters, updateFilters, refreshBookings } =
      useBookingData('current-user') // In real app, get from auth context

   // Close filter dropdown when clicking outside
   useEffect(() => {
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

   // Only redirect if we're sure the user is not authenticated and not loading
   useEffect(() => {
      if (!authLoading && !isAuthenticated) {
         router.push('/login?returnUrl=/lich-su-dat-kham')
      }
   }, [isAuthenticated, authLoading, router])

   const handleViewDetails = (id: string) => {
      router.push(`/chi-tiet-dat-kham/${id}`)
   }

   const handleStatusFilter = (status: string) => {
      updateFilters({
         status: status as
            | 'pending'
            | 'confirmed'
            | 'completed'
            | 'cancelled'
            | 'rescheduled'
            | 'all'
      })
   }

   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      updateFilters({ searchQuery: event.target.value })
   }

   // Show loading state while checking authentication
   if (authLoading) {
      return (
         <div className="min-h-screen flex items-center justify-center">
            <LoadingSpinner size="lg" text="Đang kiểm tra đăng nhập..." />
         </div>
      )
   }

   // Don't render anything if not authenticated (let middleware handle redirect)
   if (!isAuthenticated) {
      return null
   }

   // Show error state
   if (error) {
      return (
         <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
            <div className="container mx-auto px-4 py-8">
               <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                  <div className="text-red-600 text-lg font-medium mb-2">Có lỗi xảy ra</div>
                  <div className="text-red-500 mb-4">{error}</div>
                  <button
                     onClick={refreshBookings}
                     className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
                  >
                     Thử lại
                  </button>
               </div>
            </div>
         </div>
      )
   }

   return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
         <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <motion.div
               initial={{ opacity: 0, y: -20 }}
               animate={{ opacity: 1, y: 0 }}
               className="mb-8"
            >
               <h1 className="text-3xl font-bold text-gray-900 mb-2">Lịch sử đặt khám</h1>
               <p className="text-gray-600">Quản lý và theo dõi các lịch hẹn của bạn</p>
            </motion.div>

            {/* Filters */}
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.1 }}
               className="bg-white rounded-lg shadow-sm p-6 mb-6"
            >
               <div className="flex flex-col md:flex-row gap-4">
                  {/* Search */}
                  <div className="flex-1 relative">
                     <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                     <input
                        type="text"
                        placeholder="Tìm kiếm theo tên bác sĩ, bệnh viện..."
                        value={filters.searchQuery}
                        onChange={handleSearchChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20"
                     />
                  </div>

                  {/* Status Filter Dropdown */}
                  <div className="relative" ref={filterRef}>
                     <button
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className="flex items-center justify-between px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 min-w-[200px]"
                     >
                        <span>
                           {filters.status === 'all'
                              ? 'Tất cả trạng thái'
                              : BOOKING_STATUS_CONFIG[
                                   filters.status as keyof typeof BOOKING_STATUS_CONFIG
                                ]?.label}
                        </span>
                        <ChevronDown className="h-4 w-4 ml-2" />
                     </button>
                     {isFilterOpen && (
                        <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                           <div className="py-2">
                              <button
                                 onClick={() => {
                                    handleStatusFilter('all')
                                    setIsFilterOpen(false)
                                 }}
                                 className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                                    filters.status === 'all'
                                       ? 'bg-blue-50 text-blue-600'
                                       : 'text-gray-700'
                                 }`}
                              >
                                 Tất cả trạng thái
                              </button>
                              {Object.entries(BOOKING_STATUS_CONFIG).map(([status, config]) => (
                                 <button
                                    key={status}
                                    onClick={() => {
                                       handleStatusFilter(status)
                                       setIsFilterOpen(false)
                                    }}
                                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                                       filters.status === status
                                          ? 'bg-blue-50 text-blue-600'
                                          : 'text-gray-700'
                                    }`}
                                 >
                                    {config.label}
                                 </button>
                              ))}
                           </div>
                        </div>
                     )}
                  </div>
               </div>
            </motion.div>

            {/* Loading state */}
            {isLoading && (
               <div className="flex justify-center py-12">
                  <LoadingSpinner size="lg" text="Đang tải dữ liệu..." />
               </div>
            )}

            {/* Empty state */}
            {!isLoading && filteredBookings.length === 0 && (
               <EmptyState
                  icon={<Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />}
                  title="Không có lịch hẹn nào"
                  description="Bạn chưa có lịch hẹn nào. Hãy đặt lịch khám để bắt đầu chăm sóc sức khỏe."
                  action={
                     <button
                        onClick={() => router.push('/dat-lich-kham')}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                     >
                        Đặt lịch khám ngay
                     </button>
                  }
               />
            )}

            {/* Booking Cards */}
            {!isLoading && filteredBookings.length > 0 && (
               <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-4"
               >
                  {filteredBookings.map((booking, index) => (
                     <BookingCard
                        key={booking.id}
                        booking={booking}
                        index={index}
                        onViewDetails={handleViewDetails}
                        statusConfig={BOOKING_STATUS_CONFIG}
                        serviceIcons={SERVICE_ICONS}
                     />
                  ))}
               </motion.div>
            )}
         </div>
      </div>
   )
}
