import { motion } from 'framer-motion'
import Link from 'next/link'
import { getBookingById } from '@/services'
import { ArrowLeft, Building2, Calendar, Clock, Download, Mail, Phone, Printer } from 'lucide-react'
import { Button } from '@/components'
import { notFound } from 'next/navigation'

interface Props {
   params: Promise<{ id: string }>
}

export default async function BookingDetailPage({ params }: Props) {
   const { id } = await params
   const booking = await getBookingById(id)

   if (!booking) notFound()

   return (
      <div className="min-h-screen bg-gray-50">
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
                        <p className="text-gray-600">Mã đơn: {booking.orderNumber}</p>
                     </div>
                  </div>
                  <div className="flex items-center space-x-3">
                     <Button variant="outline" size="sm" onClick={() => console.log('print')}>
                        <Printer className="h-4 w-4 mr-2" />
                        In
                     </Button>
                     <Button variant="outline" size="sm" onClick={() => console.log('download')}>
                        <Download className="h-4 w-4 mr-2" />
                        Tải xuống
                     </Button>
                  </div>
               </div>
            </div>
         </div>

         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid lg:grid-cols-3 gap-8">
               <div className="lg:col-span-2 space-y-6">
                  <motion.div
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 0.1 }}
                     className="bg-white rounded-xl shadow-sm bbooking bbooking-gray-100 p-6"
                  >
                     <h2 className="text-xl font-bold text-gray-900 mb-6">Thông tin bác sĩ</h2>
                     <div className="flex items-start space-x-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                           <div className="text-white font-bold text-lg">
                              {booking.doctorName
                                 .split(' ')
                                 .slice(-2)
                                 .map((n) => n[0])
                                 .join('')}
                           </div>
                        </div>
                        <div className="flex-1">
                           <h3 className="text-lg font-bold text-gray-900">{booking.doctorName}</h3>
                           <p className="text-blue-600">{booking.doctorSpecialty}</p>
                           <div className="mt-4 grid md:grid-cols-2 gap-4">
                              <div className="flex items-center text-gray-600">
                                 <Phone className="h-4 w-4 mr-2" />
                                 <span>{booking.doctorPhone}</span>
                              </div>
                              <div className="flex items-center text-gray-600">
                                 <Mail className="h-4 w-4 mr-2" />
                                 <span>{booking.doctorEmail}</span>
                              </div>
                           </div>
                        </div>
                     </div>
                  </motion.div>

                  <motion.div
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 0.2 }}
                     className="bg-white rounded-xl shadow-sm bbooking bbooking-gray-100 p-6"
                  >
                     <h2 className="text-xl font-bold text-gray-900 mb-6">Chi tiết cuộc hẹn</h2>
                     <div className="grid md:grid-cols-2 gap-6">
                        <div>
                           <div className="flex items-center mb-4">
                              <div>
                                 <div className="font-medium text-gray-900">
                                    {booking.serviceName}
                                 </div>
                                 <div className="text-sm text-gray-600">Loại dịch vụ</div>
                              </div>
                           </div>
                           <div className="flex items-center mb-4">
                              <Calendar className="h-5 w-5 text-blue-600 mr-3" />
                              <div>
                                 <div className="font-medium text-gray-900">
                                    {new Date(booking.appointmentDate).toLocaleDateString('vi-VN')}
                                 </div>
                                 <div className="text-sm text-gray-600">Ngày khám</div>
                              </div>
                           </div>
                           <div className="flex items-center">
                              <Clock className="h-5 w-5 text-blue-600 mr-3" />
                              <div>
                                 <div className="font-medium text-gray-900">
                                    {booking.appointmentTime}
                                 </div>
                                 <div className="text-sm text-gray-600">Giờ khám</div>
                              </div>
                           </div>
                        </div>
                        <div>
                           <div className="flex items-start mb-4">
                              <Building2 className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                              <div>
                                 <div className="font-medium text-gray-900">{booking.hospital}</div>
                                 <div className="text-sm text-gray-600">
                                    {booking.hospitalAddress}
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>

                     {booking.reason && (
                        <div className="mt-6 pt-6 bbooking-t bbooking-gray-100">
                           <h3 className="font-medium text-gray-900 mb-2">Lý do khám</h3>
                           <p className="text-gray-600">{booking.reason}</p>
                        </div>
                     )}

                     {booking.symptoms && booking.symptoms.length > 0 && (
                        <div className="mt-4">
                           <h3 className="font-medium text-gray-900 mb-2">Triệu chứng</h3>
                           <div className="flex flex-wrap gap-2">
                              {booking.symptoms.map((symptom, index) => (
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

                  <motion.div
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 0.3 }}
                     className="bg-white rounded-xl shadow-sm bbooking bbooking-gray-100 p-6"
                  >
                     <h2 className="text-xl font-bold text-gray-900 mb-6">Thông tin bệnh nhân</h2>
                     <div className="grid md:grid-cols-2 gap-6">
                        <div>
                           <div className="mb-4">
                              <div className="font-medium text-gray-900">{booking.patientName}</div>
                              <div className="text-sm text-gray-600">Họ và tên</div>
                           </div>
                           <div className="mb-4">
                              <div className="font-medium text-gray-900">
                                 {booking.patientPhone}
                              </div>
                              <div className="text-sm text-gray-600">Số điện thoại</div>
                           </div>
                        </div>
                        <div>
                           <div className="mb-4">
                              <div className="font-medium text-gray-900">
                                 {booking.patientEmail}
                              </div>
                              <div className="text-sm text-gray-600">Email</div>
                           </div>
                           <div className="mb-4">
                              <div className="font-medium text-gray-900">
                                 {booking.patientAddress}
                              </div>
                              <div className="text-sm text-gray-600">Địa chỉ</div>
                           </div>
                        </div>
                     </div>
                  </motion.div>
               </div>

               <div className="space-y-6">
                  <motion.div
                     initial={{ opacity: 0, x: 20 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ delay: 0.2 }}
                     className="bg-white rounded-xl shadow-sm bbooking bbooking-gray-100 p-6 sticky top-6"
                  >
                     <h3 className="text-lg font-bold text-gray-900 mb-4">Thông tin thanh toán</h3>
                     <div className="space-y-4">
                        <div className="flex justify-between">
                           <span className="text-gray-600">Tổng tiền:</span>
                           <span className="font-bold text-2xl text-green-600">
                              {booking.totalAmount}
                           </span>
                        </div>
                        <div className="flex justify-between">
                           <span className="text-gray-600">Phương thức:</span>
                           <span className="font-medium">{booking.paymentMethod}</span>
                        </div>
                        <div className="flex justify-between">
                           <span className="text-gray-600">Trạng thái:</span>
                           <span
                              className={`font-medium ${
                                 booking.paymentStatus === 'paid'
                                    ? 'text-green-600'
                                    : booking.paymentStatus === 'pending'
                                      ? 'text-yellow-600'
                                      : 'text-red-600'
                              }`}
                           >
                              {booking.paymentStatus === 'paid'
                                 ? 'Đã thanh toán'
                                 : booking.paymentStatus === 'pending'
                                   ? 'Chờ thanh toán'
                                   : 'Đã hoàn tiền'}
                           </span>
                        </div>
                     </div>
                  </motion.div>

                  <motion.div
                     initial={{ opacity: 0, x: 20 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ delay: 0.3 }}
                     className="bg-white rounded-xl shadow-sm bbooking bbooking-gray-100 p-6"
                  >
                     <h3 className="text-lg font-bold text-gray-900 mb-4">Thao tác</h3>
                     <div className="space-y-3">
                        {booking.status === 'pending' && (
                           <>
                              <Button
                                 className="w-full"
                                 variant="outline"
                                 onClick={() => {
                                    console.log('Reschedule booking')
                                 }}
                              >
                                 Dời lịch
                              </Button>
                              <Button
                                 className="w-full"
                                 variant="outline"
                                 onClick={() => console.log('cancel')}
                              >
                                 Hủy lịch
                              </Button>
                           </>
                        )}
                        {booking.status === 'confirmed' && (
                           <Button
                              className="w-full"
                              variant="outline"
                              onClick={() => {
                                 console.log('Reschedule booking')
                              }}
                           >
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
