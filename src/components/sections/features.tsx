import {Calendar, Shield, Users} from 'lucide-react'
import React from "react"

export default (() => (
    <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Tại sao chọn Serava Care?</h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Chúng tôi mang đến trải nghiệm đặt lịch khám bệnh hiện đại và tiện lợi nhất
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center p-8 rounded-2xl bg-blue-50 hover:bg-blue-100 transition-all duration-300">
                    <div
                        className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                        <Calendar className="h-8 w-8"/>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Đặt lịch nhanh chóng</h3>
                    <p className="text-gray-600">
                        Đặt lịch khám bệnh chỉ trong vài phút với giao diện thân thiện và dễ sử dụng
                    </p>
                </div>

                <div className="text-center p-8 rounded-2xl bg-green-50 hover:bg-green-100 transition-all duration-300">
                    <div
                        className="bg-green-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                        <Users className="h-8 w-8"/>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Mạng lưới rộng khắp</h3>
                    <p className="text-gray-600">
                        Kết nối với hơn 1000 bác sĩ chuyên khoa và 125 cơ sở y tế
                        uy tín trên toàn quốc
                    </p>
                </div>

                <div
                    className="text-center p-8 rounded-2xl bg-purple-50 hover:bg-purple-100 transition-all duration-300">
                    <div
                        className="bg-purple-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                        <Shield className="h-8 w-8"/>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Bảo mật tuyệt đối</h3>
                    <p className="text-gray-600">
                        Thông tin cá nhân và sức khỏe được bảo mật theo tiêu chuẩn quốc tế HIPAA
                    </p>
                </div>
            </div>
        </div>
    </section>
)) satisfies React.FC
