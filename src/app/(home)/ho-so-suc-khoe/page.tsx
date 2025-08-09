'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import useSWR from 'swr'
import { getVitalSigns, getMedicalRecords } from '@/services'
import {
   User,
   Activity,
   Heart,
   Weight,
   ChevronRight,
   Plus,
   Edit,
   Eye,
   Download,
   FileText
} from 'lucide-react'
import Link from 'next/link'
import {
   LoadingSpinner,
   EmptyState,
   ErrorBoundaryFallback,
   StatCard,
   HealthProfileSkeleton
} from '@/components'
import { formatDate } from '@/lib'

// Fetcher functions for SWR
const vitalSignsFetcher = async (): Promise<VitalSign[]> => {
   return await getVitalSigns()
}

const medicalRecordsFetcher = async (): Promise<MedicalRecord[]> => {
   return await getMedicalRecords()
}

export default function HealthProfilePage() {
   const router = useRouter()

   // Auth state
   const [isAuthenticated, setIsAuthenticated] = useState(false)
   const [authLoading, setAuthLoading] = useState(true)

   // SWR for vital signs
   const {
      data: vitalSigns = [],
      error: vitalsError,
      isLoading: isLoadingVitals,
      mutate: mutateVitalSigns
   } = useSWR(isAuthenticated ? '/api/health/vital-signs' : null, vitalSignsFetcher, {
      revalidateOnFocus: false,
      dedupingInterval: 60000, // 1 minute
      errorRetryCount: 3,
      errorRetryInterval: 1000
   })

   // SWR for medical records
   const {
      data: medicalRecords = [],
      error: recordsError,
      isLoading: isLoadingRecords,
      mutate: mutateMedicalRecords
   } = useSWR(isAuthenticated ? '/api/health/medical-records' : null, medicalRecordsFetcher, {
      revalidateOnFocus: false,
      dedupingInterval: 300000, // 5 minutes
      errorRetryCount: 3,
      errorRetryInterval: 1000
   })

   const isDataLoading = isLoadingVitals || isLoadingRecords
   const error = vitalsError || recordsError

   // Simulate auth check
   useEffect(() => {
      const checkAuth = () => {
         // Simulate auth check
         setTimeout(() => {
            setIsAuthenticated(true) // In real app, check actual auth state
            setAuthLoading(false)
         }, 100)
      }
      checkAuth()
   }, [])

   // Refresh all health data
   const refreshAllData = () => {
      mutateVitalSigns()
      mutateMedicalRecords()
   }

   // Only redirect if we're sure the user is not authenticated and not loading
   useEffect(() => {
      if (!authLoading && !isAuthenticated) {
         const currentUrl = encodeURIComponent('/ho-so-suc-khoe')
         router.push(`/sign-in?returnUrl=${currentUrl}`)
      }
   }, [isAuthenticated, authLoading, router])

   // Show loading state while checking authentication
   if (authLoading) {
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

   // Show error state with retry functionality
   if (error) {
      return <ErrorBoundaryFallback error={error} resetErrorBoundary={refreshAllData} />
   }

   // Show loading skeleton while fetching data
   if (isDataLoading) {
      return <HealthProfileSkeleton />
   }

   if (!vitalSigns.length && !medicalRecords.length) {
      return (
         <EmptyState
            icon={<Activity className="h-16 w-16 text-gray-400 mx-auto" />}
            title="Chưa có hồ sơ sức khỏe"
            description="Hãy tạo hồ sơ sức khỏe để theo dõi tình trạng sức khỏe của bạn"
            action={
               <Link
                  href="/thong-tin-ca-nhan"
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium inline-flex items-center space-x-2 transition-colors"
               >
                  <Plus className="h-5 w-5" />
                  <span>Tạo hồ sơ</span>
               </Link>
            }
         />
      )
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
                  <span className="text-gray-900">Hồ sơ sức khỏe</span>
               </nav>
            </div>
         </div>

         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
               <div>
                  <h1 className="text-2xl font-bold text-gray-900">Hồ sơ sức khỏe</h1>
                  <p className="text-gray-600 mt-1">Theo dõi và quản lý thông tin sức khỏe</p>
               </div>
               <div className="flex space-x-3">
                  <button
                     onClick={refreshAllData}
                     className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium flex items-center space-x-2 hover:bg-gray-50 transition-colors"
                  >
                     <Activity className="h-4 w-4" />
                     <span>Làm mới</span>
                  </button>
                  <Link
                     href="/thong-tin-ca-nhan"
                     className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium flex items-center space-x-2 hover:bg-gray-50 transition-colors"
                  >
                     <Edit className="h-4 w-4" />
                     <span>Chỉnh sửa</span>
                  </Link>
                  <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors">
                     <Download className="h-4 w-4" />
                     <span>Xuất báo cáo</span>
                  </button>
               </div>
            </div>

            {/* Health Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
               {vitalSigns.map((vital) => (
                  <StatCard
                     key={vital.id}
                     icon={
                        vital.type === 'weight'
                           ? Weight
                           : vital.type === 'heart_rate'
                             ? Heart
                             : vital.type === 'blood_pressure'
                               ? Heart
                               : Activity
                     }
                     label={
                        vital.type === 'weight'
                           ? 'Cân nặng'
                           : vital.type === 'heart_rate'
                             ? 'Nhịp tim'
                             : vital.type === 'blood_pressure'
                               ? 'Huyết áp'
                               : 'Chỉ số'
                     }
                     value={vital.value}
                     unit={vital.unit}
                     trend={
                        vital.status === 'normal'
                           ? 'stable'
                           : vital.status === 'warning'
                             ? 'up'
                             : 'down'
                     }
                  />
               ))}
            </div>

            {/* Health Information */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
               {/* Basic Information */}
               <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                  <div className="p-6 border-b border-gray-200">
                     <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                        <User className="h-5 w-5 mr-2" />
                        Thông tin cơ bản
                     </h3>
                  </div>
                  <div className="p-6 space-y-4">
                     <div className="flex justify-between">
                        <span className="text-gray-600">Số chỉ số theo dõi:</span>
                        <span className="font-medium">{vitalSigns.length}</span>
                     </div>
                     <div className="flex justify-between">
                        <span className="text-gray-600">Hồ sơ y tế:</span>
                        <span className="font-medium">{medicalRecords.length}</span>
                     </div>
                     <div className="flex justify-between">
                        <span className="text-gray-600">Trạng thái:</span>
                        <span className="font-medium">Hoạt động</span>
                     </div>
                     <div className="flex justify-between">
                        <span className="text-gray-600">Cập nhật gần nhất:</span>
                        <span className="font-medium text-sm text-gray-500">
                           {vitalSigns.length > 0 ? 'Vừa xong' : 'Chưa có dữ liệu'}
                        </span>
                     </div>
                  </div>
               </div>

               {/* Recent Records */}
               <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                  <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                     <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                        <FileText className="h-5 w-5 mr-2" />
                        Hồ sơ gần đây
                     </h3>
                     {medicalRecords.length > 5 && (
                        <Link
                           href="/ho-so-y-te"
                           className="text-sm text-blue-600 hover:text-blue-700"
                        >
                           Xem tất cả
                        </Link>
                     )}
                  </div>
                  <div className="p-6">
                     {medicalRecords && medicalRecords.length > 0 ? (
                        <div className="space-y-4">
                           {medicalRecords.slice(0, 5).map((record) => (
                              <div
                                 key={record.id}
                                 className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                              >
                                 <div>
                                    <p className="font-medium text-gray-900">{record.title}</p>
                                    <p className="text-sm text-gray-600">
                                       {formatDate(record.date)}
                                    </p>
                                 </div>
                                 <button className="text-blue-600 hover:text-blue-700">
                                    <Eye className="h-4 w-4" />
                                 </button>
                              </div>
                           ))}
                        </div>
                     ) : (
                        <div className="text-center py-8">
                           <p className="text-gray-500 mb-4">Chưa có hồ sơ nào</p>
                           <button
                              onClick={() => mutateMedicalRecords()}
                              className="text-blue-600 hover:text-blue-700 text-sm"
                           >
                              Làm mới dữ liệu
                           </button>
                        </div>
                     )}
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}
