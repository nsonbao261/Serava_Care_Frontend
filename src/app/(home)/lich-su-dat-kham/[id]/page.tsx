"use client"

import Link from 'next/link'
import Image from 'next/image'
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
import {Button} from '@/components'
import {getBookingById} from '@/services'
import {notFound} from 'next/navigation'
import React from "react"

export default (async (props) => {
    const {id} = await props.params
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
                                    <ArrowLeft className="mr-2"/>
                                    Quay lại
                                </Button>
                            </Link>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Chi tiết đơn hàng</h1>
                                <p className="text-gray-600">Mã đơn: {booking.booking.code}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Button
                                variant="outline"
                                onClick={() => console.log('Renew')}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <RefreshCw className="h-4 w-4 mr-2"/>
                                Làm mới
                            </Button>
                            <Button variant="outline" onClick={() => console.log('print')}>
                                <Printer className="h-4 w-4 mr-2"/>
                                In
                            </Button>
                            <Button variant="outline" onClick={() => console.log('download')}>
                                <Download className="h-4 w-4 mr-2"/>
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
                                        <Calendar className="h-5 w-5 text-gray-400"/>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">Ngày khám</p>
                                            <p className="text-sm text-gray-600">
                                                {new Date(booking.appointment.date).toLocaleDateString('vi-VN', {
                                                    weekday: 'long',
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <Clock className="h-5 w-5 text-gray-400"/>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">Giờ khám</p>
                                            <p className="text-sm text-gray-600">{booking.appointment.time}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-3">
                                        <Building2 className="h-5 w-5 text-gray-400"/>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">Cơ sở y tế</p>
                                            <p className="text-sm text-gray-600">{booking.hospital.name}</p>
                                            <p className="text-xs text-gray-500">{booking.hospital.address}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Doctor Information */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Thông tin bác sĩ</h3>
                            <div className="flex items-start space-x-4">
                                <div className="w-16 h-16 rounded-full overflow-hidden">
                                    <Image
                                        src={booking.doctor.imageUrl}
                                        alt={booking.doctor.name}
                                        width={64}
                                        height={64}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-lg font-medium text-gray-900">
                                        {booking.doctor.name}
                                    </h4>
                                    <p className="text-gray-600 mb-2">{booking.doctor.specialty}</p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="flex items-center space-x-2">
                                            <Phone className="h-4 w-4 text-gray-400"/>
                                            <span className="text-sm text-gray-600">
                                    {booking.doctor.phone}
                                 </span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Mail className="h-4 w-4 text-gray-400"/>
                                            <span className="text-sm text-gray-600">
                                    {booking.doctor.email}
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
                                        <p className="text-sm text-gray-600">{booking.patient.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">Số điện thoại</p>
                                        <p className="text-sm text-gray-600">{booking.patient.phone}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">Email</p>
                                        <p className="text-sm text-gray-600">{booking.patient.email}</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900">Địa chỉ</p>
                                    <p className="text-sm text-gray-600">{booking.patient.address}</p>
                                </div>
                            </div>
                        </div>

                        {/* Medical Information */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Thông tin y tế</h3>
                            <div className="space-y-4">
                                {booking.medicalRecord.reason && (
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">Lý do khám</p>
                                        <p className="text-sm text-gray-600">{booking.medicalRecord.reason}</p>
                                    </div>
                                )}
                                {booking.medicalRecord.symptoms && booking.medicalRecord.symptoms.length > 0 && (
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">Triệu chứng</p>
                                        <div className="flex flex-wrap gap-2 mt-1">
                                            {booking.medicalRecord.symptoms.map((symptom, index) => (
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
                                {booking.medicalRecord.medicalHistory && (
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">Tiền sử bệnh</p>
                                        <p className="text-sm text-gray-600">{booking.medicalRecord.medicalHistory}</p>
                                    </div>
                                )}
                                {booking.medicalRecord.notes && (
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">Ghi chú</p>
                                        <p className="text-sm text-gray-600">{booking.medicalRecord.notes}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Medical Results (if completed) */}
                        {booking.booking.status === 'completed' && (
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Kết quả khám</h3>
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">Chẩn đoán</p>
                                        <p className="text-sm text-gray-600">
                                            {booking.medicalRecord.diagnosis ||
                                                'Tình trạng sức khỏe bình thường, tiếp tục theo dõi'}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">Đơn thuốc</p>
                                        <p className="text-sm text-gray-600">
                                            {booking.medicalRecord.prescription || 'Không có đơn thuốc'}
                                        </p>
                                    </div>
                                    {booking.medicalRecord.followUpDate && (
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">Lịch tái khám</p>
                                            <p className="text-sm text-gray-600">
                                                {new Date(booking.medicalRecord.followUpDate).toLocaleDateString('vi-VN')}
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
                              {booking.payment.totalAmount}
                           </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-600">Phương thức:</span>
                                    <span className="text-sm font-medium text-gray-900">
                              {booking.payment.method}
                           </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-600">Trạng thái:</span>
                                    <span
                                        className={`text-sm font-medium ${
                                            booking.payment.status === 'paid'
                                                ? 'text-green-600'
                                                : booking.payment.status === 'pending'
                                                    ? 'text-yellow-600'
                                                    : 'text-gray-600'
                                        }`}
                                    >
                              {booking.payment.status === 'paid'
                                  ? 'Đã thanh toán'
                                  : booking.payment.status === 'pending'
                                      ? 'Chờ thanh toán'
                                      : 'Đã hoàn tiền'}
                           </span>
                                </div>
                                <hr/>
                                <div className="flex justify-between">
                                    <span className="text-base font-medium text-gray-900">Tổng cộng:</span>
                                    <span className="text-lg font-bold text-green-600">
                              {booking.payment.totalAmount}
                           </span>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Hành động</h3>
                            <div className="space-y-3">
                                {booking.booking.status === 'confirmed' &&
                                    booking.service.type === 'telemedicine' && (
                                        <Button
                                            className="w-full bg-green-600 hover:bg-green-700"
                                            onClick={() => console.log('start consultant')}
                                        >
                                            <Video className="h-4 w-4 mr-2"/>
                                            Bắt đầu tư vấn
                                        </Button>
                                    )}
                                {(booking.booking.status === 'pending' || booking.booking.status === 'confirmed') && (
                                    <>
                                        <Button
                                            variant="outline"
                                            className="w-full"
                                            onClick={() => console.log('reschedule')}
                                        >
                                            <RefreshCw className="h-4 w-4 mr-2"/>
                                            Dời lịch khám
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="w-full text-red-600 border-red-300 hover:bg-red-50"
                                            onClick={() => console.log('cancel')}
                                        >
                                            <XCircle className="h-4 w-4 mr-2"/>
                                            Hủy lịch khám
                                        </Button>
                                    </>
                                )}
                                <Button
                                    variant="outline"
                                    className="w-full"
                                    onClick={() => console.log('download')}
                                >
                                    <Download className="h-4 w-4 mr-2"/>
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
                                    <Phone className="h-4 w-4 text-blue-600"/>
                                    <span className="text-sm text-blue-800">1900 2115</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Mail className="h-4 w-4 text-blue-600"/>
                                    <span className="text-sm text-blue-800">support@seravacare.vn</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}) satisfies React.FC<{ params: Promise<{ id: string }> }>
