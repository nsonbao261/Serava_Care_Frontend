'use client'

import { useEffect, use } from 'react'
import { motion } from 'framer-motion'
import { useAuth, useOrderDetail } from '@/hooks'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
   ArrowLeft,
   Calendar,
   Clock,
   Phone,
   Mail,
   Download,
   Printer,
   CheckCircle,
   XCircle,
   AlertCircle,
   Stethoscope,
   Video,
   Building2,
   Heart,
   RefreshCw
} from 'lucide-react'
import { Button, LoadingSpinner } from '@/components'

const statusConfig = {
   pending: {
      label: 'Chờ xác nhận',
      color: 'bg-yellow-100 text-yellow-800',
      icon: AlertCircle
   },
   confirmed: {
      label: 'Đã xác nhận',
      color: 'bg-blue-100 text-blue-800',
      icon: CheckCircle
   },
   completed: {
      label: 'Hoàn thành',
      color: 'bg-green-100 text-green-800',
      icon: CheckCircle
   },
   cancelled: {
      label: 'Đã hủy',
      color: 'bg-red-100 text-red-800',
      icon: XCircle
   },
   rescheduled: {
      label: 'Đã dời lịch',
      color: 'bg-purple-100 text-purple-800',
      icon: RefreshCw
   }
}

const serviceIcons = {
   telemedicine: Video,
   clinic: Building2,
   home: Stethoscope,
   emergency: Heart
}

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
   const { id } = use(params)
   const { isAuthenticated, isLoading: authLoading } = useAuth()
   const router = useRouter()
   const { order, isLoading, error, refetch } = useOrderDetail(id)

   useEffect(() => {
      if (!authLoading && !isAuthenticated) {
         const currentUrl = encodeURIComponent(`/chi-tiet-dat-kham/${id}`)
         router.push(`/login?returnUrl=${currentUrl}`)
      }
   }, [isAuthenticated, authLoading, router, id])

   // Show loading while checking authentication
   if (authLoading) {
      return (
         <div className="min-h-screen bg-gray-50">
            <div className="py-16">
               <LoadingSpinner size="lg" text="Đang kiểm tra thông tin đăng nhập..." />
            </div>
         </div>
      )
   }

   // Don't render anything if not authenticated (let redirect handle it)
   if (!isAuthenticated) {
      return null
   }

   // Show loading while fetching order data
   if (isLoading) {
      return (
         <div className="min-h-screen bg-gray-50">
            <div className="py-16">
               <LoadingSpinner size="lg" text="Đang tải thông tin đặt khám..." />
            </div>
         </div>
      )
   }

   if (error) {
      return (
         <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
               <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
               <h2 className="text-xl font-semibold text-gray-900 mb-2">Có lỗi xảy ra</h2>
               <p className="text-gray-600 mb-4">{error}</p>
               <Button onClick={refetch}>Thử lại</Button>
            </div>
         </div>
      )
   }

   if (!order) {
      return (
         <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
               <AlertCircle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
               <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Không tìm thấy thông tin
               </h2>
               <p className="text-gray-600 mb-4">Lịch khám này không tồn tại hoặc đã bị xóa.</p>
               <Link href="/lich-su-dat-kham">
                  <Button>Quay lại danh sách</Button>
               </Link>
            </div>
         </div>
      )
   }

   const StatusIcon = statusConfig[order.status].icon
   const ServiceIcon = serviceIcons[order.serviceType]

   return (
      <div className="min-h-screen bg-gray-50">
         {/* Header */}
         <div className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
               <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                     <Link href="/lich-su-dat-kham">
                        <Button variant="outline" size="sm">
                           <ArrowLeft className="h-4 w-4 mr-2" />
                           Quay lại
                        </Button>
                     </Link>
                     <div>
                        <h1 className="text-2xl font-bold text-gray-900">Chi tiết đặt khám</h1>
                        <p className="text-gray-600">Mã đơn: {order.orderNumber}</p>
                     </div>
                  </div>
                  <div className="flex items-center space-x-3">
                     <Button variant="outline" size="sm">
                        <Printer className="h-4 w-4 mr-2" />
                        In
                     </Button>
                     <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Tải xuống
                     </Button>
                  </div>
               </div>
            </div>
         </div>

         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid lg:grid-cols-3 gap-8">
               {/* Main Content */}
               <div className="lg:col-span-2 space-y-6">
                  {/* Order Status */}
                  <motion.div
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
                  >
                     <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-gray-900">Trạng thái đơn hàng</h2>
                        <div
                           className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusConfig[order.status].color}`}
                        >
                           <StatusIcon className="h-4 w-4 mr-2" />
                           {statusConfig[order.status].label}
                        </div>
                     </div>
                     <div className="text-gray-600">
                        Đặt lịch ngày: {new Date(order.bookingDate).toLocaleDateString('vi-VN')}
                     </div>
                  </motion.div>

                  {/* Doctor Information */}
                  <motion.div
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 0.1 }}
                     className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
                  >
                     <h2 className="text-xl font-bold text-gray-900 mb-6">Thông tin bác sĩ</h2>
                     <div className="flex items-start space-x-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                           <div className="text-white font-bold text-lg">
                              {order.doctorName
                                 .split(' ')
                                 .slice(-2)
                                 .map((n) => n[0])
                                 .join('')}
                           </div>
                        </div>
                        <div className="flex-1">
                           <h3 className="text-lg font-bold text-gray-900">{order.doctorName}</h3>
                           <p className="text-blue-600">{order.doctorSpecialty}</p>
                           <div className="mt-4 grid md:grid-cols-2 gap-4">
                              <div className="flex items-center text-gray-600">
                                 <Phone className="h-4 w-4 mr-2" />
                                 <span>{order.doctorPhone}</span>
                              </div>
                              <div className="flex items-center text-gray-600">
                                 <Mail className="h-4 w-4 mr-2" />
                                 <span>{order.doctorEmail}</span>
                              </div>
                           </div>
                        </div>
                     </div>
                  </motion.div>

                  {/* Appointment Details */}
                  <motion.div
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 0.2 }}
                     className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
                  >
                     <h2 className="text-xl font-bold text-gray-900 mb-6">Chi tiết cuộc hẹn</h2>
                     <div className="grid md:grid-cols-2 gap-6">
                        <div>
                           <div className="flex items-center mb-4">
                              <ServiceIcon className="h-5 w-5 text-blue-600 mr-3" />
                              <div>
                                 <div className="font-medium text-gray-900">
                                    {order.serviceName}
                                 </div>
                                 <div className="text-sm text-gray-600">Loại dịch vụ</div>
                              </div>
                           </div>
                           <div className="flex items-center mb-4">
                              <Calendar className="h-5 w-5 text-blue-600 mr-3" />
                              <div>
                                 <div className="font-medium text-gray-900">
                                    {new Date(order.appointmentDate).toLocaleDateString('vi-VN')}
                                 </div>
                                 <div className="text-sm text-gray-600">Ngày khám</div>
                              </div>
                           </div>
                           <div className="flex items-center">
                              <Clock className="h-5 w-5 text-blue-600 mr-3" />
                              <div>
                                 <div className="font-medium text-gray-900">
                                    {order.appointmentTime}
                                 </div>
                                 <div className="text-sm text-gray-600">Giờ khám</div>
                              </div>
                           </div>
                        </div>
                        <div>
                           <div className="flex items-start mb-4">
                              <Building2 className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                              <div>
                                 <div className="font-medium text-gray-900">{order.hospital}</div>
                                 <div className="text-sm text-gray-600">
                                    {order.hospitalAddress}
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>

                     {order.reason && (
                        <div className="mt-6 pt-6 border-t border-gray-100">
                           <h3 className="font-medium text-gray-900 mb-2">Lý do khám</h3>
                           <p className="text-gray-600">{order.reason}</p>
                        </div>
                     )}

                     {order.symptoms && order.symptoms.length > 0 && (
                        <div className="mt-4">
                           <h3 className="font-medium text-gray-900 mb-2">Triệu chứng</h3>
                           <div className="flex flex-wrap gap-2">
                              {order.symptoms.map((symptom, index) => (
                                 <span
                                    key={index}
                                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                                 >
                                    {symptom}
                                 </span>
                              ))}
                           </div>
                        </div>
                     )}
                  </motion.div>

                  {/* Patient Information */}
                  <motion.div
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 0.3 }}
                     className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
                  >
                     <h2 className="text-xl font-bold text-gray-900 mb-6">Thông tin bệnh nhân</h2>
                     <div className="grid md:grid-cols-2 gap-6">
                        <div>
                           <div className="mb-4">
                              <div className="font-medium text-gray-900">{order.patientName}</div>
                              <div className="text-sm text-gray-600">Họ và tên</div>
                           </div>
                           <div className="mb-4">
                              <div className="font-medium text-gray-900">{order.patientPhone}</div>
                              <div className="text-sm text-gray-600">Số điện thoại</div>
                           </div>
                        </div>
                        <div>
                           <div className="mb-4">
                              <div className="font-medium text-gray-900">{order.patientEmail}</div>
                              <div className="text-sm text-gray-600">Email</div>
                           </div>
                           <div className="mb-4">
                              <div className="font-medium text-gray-900">
                                 {order.patientAddress}
                              </div>
                              <div className="text-sm text-gray-600">Địa chỉ</div>
                           </div>
                        </div>
                     </div>
                  </motion.div>
               </div>

               {/* Sidebar */}
               <div className="space-y-6">
                  {/* Payment Information */}
                  <motion.div
                     initial={{ opacity: 0, x: 20 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ delay: 0.2 }}
                     className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-6"
                  >
                     <h3 className="text-lg font-bold text-gray-900 mb-4">Thông tin thanh toán</h3>
                     <div className="space-y-4">
                        <div className="flex justify-between">
                           <span className="text-gray-600">Tổng tiền:</span>
                           <span className="font-bold text-2xl text-green-600">
                              {order.totalAmount}
                           </span>
                        </div>
                        <div className="flex justify-between">
                           <span className="text-gray-600">Phương thức:</span>
                           <span className="font-medium">{order.paymentMethod}</span>
                        </div>
                        <div className="flex justify-between">
                           <span className="text-gray-600">Trạng thái:</span>
                           <span
                              className={`font-medium ${
                                 order.paymentStatus === 'paid'
                                    ? 'text-green-600'
                                    : order.paymentStatus === 'pending'
                                      ? 'text-yellow-600'
                                      : 'text-red-600'
                              }`}
                           >
                              {order.paymentStatus === 'paid'
                                 ? 'Đã thanh toán'
                                 : order.paymentStatus === 'pending'
                                   ? 'Chờ thanh toán'
                                   : 'Đã hoàn tiền'}
                           </span>
                        </div>
                     </div>
                  </motion.div>

                  {/* Actions */}
                  <motion.div
                     initial={{ opacity: 0, x: 20 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ delay: 0.3 }}
                     className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
                  >
                     <h3 className="text-lg font-bold text-gray-900 mb-4">Thao tác</h3>
                     <div className="space-y-3">
                        {order.status === 'pending' && (
                           <>
                              <Button className="w-full" variant="outline">
                                 Dời lịch
                              </Button>
                              <Button className="w-full" variant="outline">
                                 Hủy lịch
                              </Button>
                           </>
                        )}
                        {order.status === 'confirmed' && (
                           <Button className="w-full" variant="outline">
                              Dời lịch
                           </Button>
                        )}
                        <Button className="w-full" variant="outline">
                           <Phone className="h-4 w-4 mr-2" />
                           Liên hệ hỗ trợ
                        </Button>
                     </div>
                  </motion.div>
               </div>
            </div>
         </div>
      </div>
   )
}
