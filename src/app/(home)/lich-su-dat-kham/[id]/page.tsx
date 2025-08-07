'use client'

import { useState, useEffect, use } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '@/hooks'
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

interface OrderDetail {
   id: string
   orderNumber: string
   patientName: string
   patientPhone: string
   patientEmail: string
   patientAddress: string
   doctorName: string
   doctorSpecialty: string
   doctorImage: string
   doctorPhone: string
   doctorEmail: string
   serviceType: 'telemedicine' | 'clinic' | 'home' | 'emergency'
   serviceName: string
   appointmentDate: string
   appointmentTime: string
   status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'rescheduled'
   totalAmount: string
   paymentStatus: 'pending' | 'paid' | 'refunded'
   paymentMethod: string
   bookingDate: string
   hospital: string
   hospitalAddress: string
   reason?: string
   notes?: string
   symptoms?: string[]
   medicalHistory?: string
   prescription?: string
   diagnosis?: string
   followUpDate?: string
}

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
   const [order, setOrder] = useState<OrderDetail | null>(null)
   const [isLoading, setIsLoading] = useState(true)

   // Redirect to sign-in if not authenticated
   useEffect(() => {
      if (!authLoading && !isAuthenticated) {
         const currentUrl = encodeURIComponent(`/lich-su-dat-kham/${id}`)
         router.push(`/sign-in?returnUrl=${currentUrl}`)
      }
   }, [isAuthenticated, authLoading, router, id])

   // Mock data - in real app, this would come from API
   useEffect(() => {
      if (!authLoading && isAuthenticated) {
         const mockOrder: OrderDetail = {
            id: id,
            orderNumber: 'SC001234',
            patientName: 'Nguyễn Văn An',
            patientPhone: '0912345678',
            patientEmail: 'nguyenvanan@gmail.com',
            patientAddress: '123 Nguyễn Huệ, Quận 1, TP.HCM',
            doctorName: 'BS.CKII Trần Thị Hoa',
            doctorSpecialty: 'Tim mạch',
            doctorImage: '/placeholder.svg',
            doctorPhone: '0987654321',
            doctorEmail: 'dr.tranthihoa@hospital.com',
            serviceType: 'telemedicine',
            serviceName: 'Tư vấn trực tuyến',
            appointmentDate: '2025-07-15',
            appointmentTime: '09:00',
            status: 'confirmed',
            totalAmount: '200.000đ',
            paymentStatus: 'paid',
            paymentMethod: 'Thẻ tín dụng',
            bookingDate: '2025-07-10',
            hospital: 'Bệnh viện Chợ Rẫy',
            hospitalAddress: '201B Nguyễn Chí Thanh, Quận 5, TP.HCM',
            reason: 'Khám tim định kỳ',
            symptoms: ['Đau ngực', 'Khó thở', 'Tim đập nhanh'],
            medicalHistory: 'Tiền sử cao huyết áp, đang điều trị',
            notes: 'Bệnh nhân cần nhịn ăn 8 tiếng trước khi khám'
         }

         // Simulate API call delay
         setTimeout(() => {
            setOrder(mockOrder)
            setIsLoading(false)
         }, 1000)
      }
   }, [id, authLoading, isAuthenticated])

   const handlePrint = () => {
      window.print()
   }

   const handleDownloadReceipt = () => {
      // Handle download receipt logic
      console.log('Download receipt')
   }

   const handleReschedule = () => {
      // Handle reschedule logic
      console.log('Reschedule appointment')
   }

   const handleCancel = () => {
      // Handle cancel logic
      console.log('Cancel appointment')
   }

   const handleStartConsultation = () => {
      // Handle start video consultation
      console.log('Start consultation')
   }

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

   if (!order) {
      return (
         <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
               <h2 className="text-2xl font-bold text-gray-900 mb-2">Không tìm thấy đơn hàng</h2>
               <p className="text-gray-600 mb-4">
                  Đơn hàng này có thể đã bị xóa hoặc không tồn tại.
               </p>
               <Link href="/lich-su-dat-kham">
                  <Button>
                     <ArrowLeft className="h-4 w-4 mr-2" />
                     Quay lại danh sách
                  </Button>
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
         <div className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
               <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                     <Link href="/lich-su-dat-kham">
                        <Button variant="outline" size="sm">
                           <ArrowLeft className="h-4 w-4 mr-2" />
                           Quay lại
                        </Button>
                     </Link>
                     <div>
                        <h1 className="text-2xl font-bold text-gray-900">Chi tiết đơn hàng</h1>
                        <p className="text-gray-600">Mã đơn: {order.orderNumber}</p>
                     </div>
                  </div>
                  <div className="flex items-center space-x-2">
                     <Button variant="outline" onClick={handlePrint}>
                        <Printer className="h-4 w-4 mr-2" />
                        In
                     </Button>
                     <Button variant="outline" onClick={handleDownloadReceipt}>
                        <Download className="h-4 w-4 mr-2" />
                        Tải về
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
                     className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
                  >
                     <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                           <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                              <ServiceIcon className="h-6 w-6 text-blue-600" />
                           </div>
                           <div>
                              <h2 className="text-xl font-semibold text-gray-900">
                                 {order.serviceName}
                              </h2>
                              <p className="text-sm text-gray-500">
                                 Đặt ngày {new Date(order.bookingDate).toLocaleDateString('vi-VN')}
                              </p>
                           </div>
                        </div>
                        <span
                           className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusConfig[order.status].color}`}
                        >
                           <StatusIcon className="h-4 w-4 mr-2" />
                           {statusConfig[order.status].label}
                        </span>
                     </div>
                  </motion.div>

                  {/* Appointment Details */}
                  <motion.div
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 0.1 }}
                     className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
                  >
                     <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Thông tin lịch khám
                     </h3>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                           <div className="flex items-center space-x-3">
                              <Calendar className="h-5 w-5 text-gray-400" />
                              <div>
                                 <p className="text-sm font-medium text-gray-900">Ngày khám</p>
                                 <p className="text-sm text-gray-600">
                                    {new Date(order.appointmentDate).toLocaleDateString('vi-VN', {
                                       weekday: 'long',
                                       year: 'numeric',
                                       month: 'long',
                                       day: 'numeric'
                                    })}
                                 </p>
                              </div>
                           </div>
                           <div className="flex items-center space-x-3">
                              <Clock className="h-5 w-5 text-gray-400" />
                              <div>
                                 <p className="text-sm font-medium text-gray-900">Giờ khám</p>
                                 <p className="text-sm text-gray-600">{order.appointmentTime}</p>
                              </div>
                           </div>
                        </div>
                        <div className="space-y-4">
                           <div className="flex items-center space-x-3">
                              <Building2 className="h-5 w-5 text-gray-400" />
                              <div>
                                 <p className="text-sm font-medium text-gray-900">Cơ sở y tế</p>
                                 <p className="text-sm text-gray-600">{order.hospital}</p>
                                 <p className="text-xs text-gray-500">{order.hospitalAddress}</p>
                              </div>
                           </div>
                        </div>
                     </div>
                  </motion.div>

                  {/* Doctor Information */}
                  <motion.div
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 0.2 }}
                     className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
                  >
                     <h3 className="text-lg font-semibold text-gray-900 mb-4">Thông tin bác sĩ</h3>
                     <div className="flex items-start space-x-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                           {order.doctorName
                              .split(' ')
                              .slice(-2)
                              .map((n) => n[0])
                              .join('')}
                        </div>
                        <div className="flex-1">
                           <h4 className="text-lg font-medium text-gray-900">{order.doctorName}</h4>
                           <p className="text-gray-600 mb-2">{order.doctorSpecialty}</p>
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="flex items-center space-x-2">
                                 <Phone className="h-4 w-4 text-gray-400" />
                                 <span className="text-sm text-gray-600">{order.doctorPhone}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                 <Mail className="h-4 w-4 text-gray-400" />
                                 <span className="text-sm text-gray-600">{order.doctorEmail}</span>
                              </div>
                           </div>
                        </div>
                     </div>
                  </motion.div>

                  {/* Patient Information */}
                  <motion.div
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 0.3 }}
                     className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
                  >
                     <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Thông tin bệnh nhân
                     </h3>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                           <div>
                              <p className="text-sm font-medium text-gray-900">Họ và tên</p>
                              <p className="text-sm text-gray-600">{order.patientName}</p>
                           </div>
                           <div>
                              <p className="text-sm font-medium text-gray-900">Số điện thoại</p>
                              <p className="text-sm text-gray-600">{order.patientPhone}</p>
                           </div>
                           <div>
                              <p className="text-sm font-medium text-gray-900">Email</p>
                              <p className="text-sm text-gray-600">{order.patientEmail}</p>
                           </div>
                        </div>
                        <div>
                           <p className="text-sm font-medium text-gray-900">Địa chỉ</p>
                           <p className="text-sm text-gray-600">{order.patientAddress}</p>
                        </div>
                     </div>
                  </motion.div>

                  {/* Medical Information */}
                  <motion.div
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 0.4 }}
                     className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
                  >
                     <h3 className="text-lg font-semibold text-gray-900 mb-4">Thông tin y tế</h3>
                     <div className="space-y-4">
                        {order.reason && (
                           <div>
                              <p className="text-sm font-medium text-gray-900">Lý do khám</p>
                              <p className="text-sm text-gray-600">{order.reason}</p>
                           </div>
                        )}
                        {order.symptoms && order.symptoms.length > 0 && (
                           <div>
                              <p className="text-sm font-medium text-gray-900">Triệu chứng</p>
                              <div className="flex flex-wrap gap-2 mt-1">
                                 {order.symptoms.map((symptom, index) => (
                                    <span
                                       key={index}
                                       className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800"
                                    >
                                       {symptom}
                                    </span>
                                 ))}
                              </div>
                           </div>
                        )}
                        {order.medicalHistory && (
                           <div>
                              <p className="text-sm font-medium text-gray-900">Tiền sử bệnh</p>
                              <p className="text-sm text-gray-600">{order.medicalHistory}</p>
                           </div>
                        )}
                        {order.notes && (
                           <div>
                              <p className="text-sm font-medium text-gray-900">Ghi chú</p>
                              <p className="text-sm text-gray-600">{order.notes}</p>
                           </div>
                        )}
                     </div>
                  </motion.div>

                  {/* Medical Results (if completed) */}
                  {order.status === 'completed' && (
                     <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
                     >
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Kết quả khám</h3>
                        <div className="space-y-4">
                           <div>
                              <p className="text-sm font-medium text-gray-900">Chẩn đoán</p>
                              <p className="text-sm text-gray-600">
                                 {order.diagnosis ||
                                    'Tình trạng sức khỏe bình thường, tiếp tục theo dõi'}
                              </p>
                           </div>
                           <div>
                              <p className="text-sm font-medium text-gray-900">Đơn thuốc</p>
                              <p className="text-sm text-gray-600">
                                 {order.prescription || 'Không có đơn thuốc'}
                              </p>
                           </div>
                           {order.followUpDate && (
                              <div>
                                 <p className="text-sm font-medium text-gray-900">Lịch tái khám</p>
                                 <p className="text-sm text-gray-600">
                                    {new Date(order.followUpDate).toLocaleDateString('vi-VN')}
                                 </p>
                              </div>
                           )}
                        </div>
                     </motion.div>
                  )}
               </div>

               {/* Sidebar */}
               <div className="space-y-6">
                  {/* Payment Information */}
                  <motion.div
                     initial={{ opacity: 0, x: 20 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ delay: 0.2 }}
                     className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
                  >
                     <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Thông tin thanh toán
                     </h3>
                     <div className="space-y-3">
                        <div className="flex justify-between">
                           <span className="text-sm text-gray-600">Phí khám:</span>
                           <span className="text-sm font-medium text-gray-900">
                              {order.totalAmount}
                           </span>
                        </div>
                        <div className="flex justify-between">
                           <span className="text-sm text-gray-600">Phương thức:</span>
                           <span className="text-sm text-gray-900">{order.paymentMethod}</span>
                        </div>
                        <div className="flex justify-between">
                           <span className="text-sm text-gray-600">Trạng thái:</span>
                           <span
                              className={`text-sm font-medium ${
                                 order.paymentStatus === 'paid'
                                    ? 'text-green-600'
                                    : order.paymentStatus === 'pending'
                                      ? 'text-yellow-600'
                                      : 'text-gray-600'
                              }`}
                           >
                              {order.paymentStatus === 'paid'
                                 ? 'Đã thanh toán'
                                 : order.paymentStatus === 'pending'
                                   ? 'Chờ thanh toán'
                                   : 'Đã hoàn tiền'}
                           </span>
                        </div>
                        <hr />
                        <div className="flex justify-between">
                           <span className="text-base font-medium text-gray-900">Tổng cộng:</span>
                           <span className="text-lg font-bold text-green-600">
                              {order.totalAmount}
                           </span>
                        </div>
                     </div>
                  </motion.div>

                  {/* Actions */}
                  <motion.div
                     initial={{ opacity: 0, x: 20 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ delay: 0.3 }}
                     className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
                  >
                     <h3 className="text-lg font-semibold text-gray-900 mb-4">Hành động</h3>
                     <div className="space-y-3">
                        {order.status === 'confirmed' && order.serviceType === 'telemedicine' && (
                           <Button
                              className="w-full bg-green-600 hover:bg-green-700"
                              onClick={handleStartConsultation}
                           >
                              <Video className="h-4 w-4 mr-2" />
                              Bắt đầu tư vấn
                           </Button>
                        )}
                        {(order.status === 'pending' || order.status === 'confirmed') && (
                           <>
                              <Button
                                 variant="outline"
                                 className="w-full"
                                 onClick={handleReschedule}
                              >
                                 <RefreshCw className="h-4 w-4 mr-2" />
                                 Dời lịch khám
                              </Button>
                              <Button
                                 variant="outline"
                                 className="w-full text-red-600 border-red-300 hover:bg-red-50"
                                 onClick={handleCancel}
                              >
                                 <XCircle className="h-4 w-4 mr-2" />
                                 Hủy lịch khám
                              </Button>
                           </>
                        )}
                        <Button
                           variant="outline"
                           className="w-full"
                           onClick={handleDownloadReceipt}
                        >
                           <Download className="h-4 w-4 mr-2" />
                           Tải hóa đơn
                        </Button>
                     </div>
                  </motion.div>

                  {/* Support */}
                  <motion.div
                     initial={{ opacity: 0, x: 20 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ delay: 0.4 }}
                     className="bg-blue-50 rounded-lg border border-blue-200 p-6"
                  >
                     <h3 className="text-lg font-semibold text-blue-900 mb-2">Cần hỗ trợ?</h3>
                     <p className="text-sm text-blue-800 mb-4">
                        Liên hệ với chúng tôi nếu bạn có bất kỳ thắc mắc nào về lịch khám.
                     </p>
                     <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                           <Phone className="h-4 w-4 text-blue-600" />
                           <span className="text-sm text-blue-800">1900 2115</span>
                        </div>
                        <div className="flex items-center space-x-2">
                           <Mail className="h-4 w-4 text-blue-600" />
                           <span className="text-sm text-blue-800">support@seravacare.vn</span>
                        </div>
                     </div>
                  </motion.div>
               </div>
            </div>
         </div>
      </div>
   )
}
