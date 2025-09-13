import Link from 'next/link'
import {
   ArrowLeft,
   Building2,
   Calendar,
   Clock,
   Download,
   Mail,
   Phone,
   Printer,
   RefreshCw,
   Video,
   XCircle
} from 'lucide-react'
import { Button } from '@/components'
import { getBookingById } from '@/services'
import { notFound } from 'next/navigation'

export default async function BookingDetailPage({ params }: { params: Promise<{ id: string }> }) {
   const { id } = await params
   const booking = await getBookingById(id)

   if (!booking) notFound()

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
                        <p className="text-gray-600">Mã đơn: {booking.orderNumber}</p>
                     </div>
                  </div>
                  <div className="flex items-center space-x-2">
                     <Button
                        variant="outline"
                        onClick={() => console.log('Renew')}
                        className="text-gray-500 hover:text-gray-700"
                     >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Làm mới
                     </Button>
                     <Button variant="outline" onClick={() => console.log('print')}>
                        <Printer className="h-4 w-4 mr-2" />
                        In
                     </Button>
                     <Button variant="outline" onClick={() => console.log('download')}>
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
                  {/* Booking Status */}

                  {/* Appointment Details */}
                  <div>
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
                                    {new Date(booking.appointmentDate).toLocaleDateString('vi-VN', {
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
                                 <p className="text-sm text-gray-600">{booking.appointmentTime}</p>
                              </div>
                           </div>
                        </div>
                        <div className="space-y-4">
                           <div className="flex items-center space-x-3">
                              <Building2 className="h-5 w-5 text-gray-400" />
                              <div>
                                 <p className="text-sm font-medium text-gray-900">Cơ sở y tế</p>
                                 <p className="text-sm text-gray-600">{booking.hospital}</p>
                                 <p className="text-xs text-gray-500">{booking.hospitalAddress}</p>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Doctor Information */}
                  <div>
                     <h3 className="text-lg font-semibold text-gray-900 mb-4">Thông tin bác sĩ</h3>
                     <div className="flex items-start space-x-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                           {booking.doctorName
                              .split(' ')
                              .slice(-2)
                              .map((n) => n[0])
                              .join('')}
                        </div>
                        <div className="flex-1">
                           <h4 className="text-lg font-medium text-gray-900">
                              {booking.doctorName}
                           </h4>
                           <p className="text-gray-600 mb-2">{booking.doctorSpecialty}</p>
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="flex items-center space-x-2">
                                 <Phone className="h-4 w-4 text-gray-400" />
                                 <span className="text-sm text-gray-600">
                                    {booking.doctorPhone}
                                 </span>
                              </div>
                              <div className="flex items-center space-x-2">
                                 <Mail className="h-4 w-4 text-gray-400" />
                                 <span className="text-sm text-gray-600">
                                    {booking.doctorEmail}
                                 </span>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Patient Information */}
                  <div>
                     <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Thông tin bệnh nhân
                     </h3>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                           <div>
                              <p className="text-sm font-medium text-gray-900">Họ và tên</p>
                              <p className="text-sm text-gray-600">{booking.patientName}</p>
                           </div>
                           <div>
                              <p className="text-sm font-medium text-gray-900">Số điện thoại</p>
                              <p className="text-sm text-gray-600">{booking.patientPhone}</p>
                           </div>
                           <div>
                              <p className="text-sm font-medium text-gray-900">Email</p>
                              <p className="text-sm text-gray-600">{booking.patientEmail}</p>
                           </div>
                        </div>
                        <div>
                           <p className="text-sm font-medium text-gray-900">Địa chỉ</p>
                           <p className="text-sm text-gray-600">{booking.patientAddress}</p>
                        </div>
                     </div>
                  </div>

                  {/* Medical Information */}
                  <div>
                     <h3 className="text-lg font-semibold text-gray-900 mb-4">Thông tin y tế</h3>
                     <div className="space-y-4">
                        {booking.reason && (
                           <div>
                              <p className="text-sm font-medium text-gray-900">Lý do khám</p>
                              <p className="text-sm text-gray-600">{booking.reason}</p>
                           </div>
                        )}
                        {booking.symptoms && booking.symptoms.length > 0 && (
                           <div>
                              <p className="text-sm font-medium text-gray-900">Triệu chứng</p>
                              <div className="flex flex-wrap gap-2 mt-1">
                                 {booking.symptoms.map((symptom, index) => (
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
                        {booking.medicalHistory && (
                           <div>
                              <p className="text-sm font-medium text-gray-900">Tiền sử bệnh</p>
                              <p className="text-sm text-gray-600">{booking.medicalHistory}</p>
                           </div>
                        )}
                        {booking.notes && (
                           <div>
                              <p className="text-sm font-medium text-gray-900">Ghi chú</p>
                              <p className="text-sm text-gray-600">{booking.notes}</p>
                           </div>
                        )}
                     </div>
                  </div>

                  {/* Medical Results (if completed) */}
                  {booking.status === 'completed' && (
                     <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Kết quả khám</h3>
                        <div className="space-y-4">
                           <div>
                              <p className="text-sm font-medium text-gray-900">Chẩn đoán</p>
                              <p className="text-sm text-gray-600">
                                 {booking.diagnosis ||
                                    'Tình trạng sức khỏe bình thường, tiếp tục theo dõi'}
                              </p>
                           </div>
                           <div>
                              <p className="text-sm font-medium text-gray-900">Đơn thuốc</p>
                              <p className="text-sm text-gray-600">
                                 {booking.prescription || 'Không có đơn thuốc'}
                              </p>
                           </div>
                           {booking.followUpDate && (
                              <div>
                                 <p className="text-sm font-medium text-gray-900">Lịch tái khám</p>
                                 <p className="text-sm text-gray-600">
                                    {new Date(booking.followUpDate).toLocaleDateString('vi-VN')}
                                 </p>
                              </div>
                           )}
                        </div>
                     </div>
                  )}
               </div>

               {/* Sidebar */}
               <div className="space-y-6">
                  {/* Payment Information */}
                  <div>
                     <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Thông tin thanh toán
                     </h3>
                     <div className="space-y-3">
                        <div className="flex justify-between">
                           <span className="text-sm text-gray-600">Phí khám:</span>
                           <span className="text-sm font-medium text-gray-900">
                              {booking.totalAmount}
                           </span>
                        </div>
                        <div className="flex justify-between">
                           <span className="text-sm text-gray-600">Phương thức:</span>
                           <span className="text-sm font-medium text-gray-900">
                              {booking.paymentMethod}
                           </span>
                        </div>
                        <div className="flex justify-between">
                           <span className="text-sm text-gray-600">Trạng thái:</span>
                           <span
                              className={`text-sm font-medium ${
                                 booking.paymentStatus === 'paid'
                                    ? 'text-green-600'
                                    : booking.paymentStatus === 'pending'
                                      ? 'text-yellow-600'
                                      : 'text-gray-600'
                              }`}
                           >
                              {booking.paymentStatus === 'paid'
                                 ? 'Đã thanh toán'
                                 : booking.paymentStatus === 'pending'
                                   ? 'Chờ thanh toán'
                                   : 'Đã hoàn tiền'}
                           </span>
                        </div>
                        <hr />
                        <div className="flex justify-between">
                           <span className="text-base font-medium text-gray-900">Tổng cộng:</span>
                           <span className="text-lg font-bold text-green-600">
                              {booking.totalAmount}
                           </span>
                        </div>
                     </div>
                  </div>

                  {/* Actions */}
                  <div>
                     <h3 className="text-lg font-semibold text-gray-900 mb-4">Hành động</h3>
                     <div className="space-y-3">
                        {booking.status === 'confirmed' &&
                           booking.serviceType === 'telemedicine' && (
                              <Button
                                 className="w-full bg-green-600 hover:bg-green-700"
                                 onClick={() => console.log('start consultant')}
                              >
                                 <Video className="h-4 w-4 mr-2" />
                                 Bắt đầu tư vấn
                              </Button>
                           )}
                        {(booking.status === 'pending' || booking.status === 'confirmed') && (
                           <>
                              <Button
                                 variant="outline"
                                 className="w-full"
                                 onClick={() => console.log('reschedule')}
                              >
                                 <RefreshCw className="h-4 w-4 mr-2" />
                                 Dời lịch khám
                              </Button>
                              <Button
                                 variant="outline"
                                 className="w-full text-red-600 border-red-300 hover:bg-red-50"
                                 onClick={() => console.log('cancel')}
                              >
                                 <XCircle className="h-4 w-4 mr-2" />
                                 Hủy lịch khám
                              </Button>
                           </>
                        )}
                        <Button
                           variant="outline"
                           className="w-full"
                           onClick={() => console.log('download')}
                        >
                           <Download className="h-4 w-4 mr-2" />
                           Tải hóa đơn
                        </Button>
                     </div>
                  </div>

                  {/* Support */}
                  <div>
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
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}
