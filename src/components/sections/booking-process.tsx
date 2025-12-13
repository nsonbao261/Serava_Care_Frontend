'use client'
import React from 'react'
import { Search, Calendar, FileText, CheckCircle } from 'lucide-react'

const steps = [
  {
    icon: Search,
    title: 'Tìm bác sĩ',
    description: 'Tìm kiếm bác sĩ theo chuyên khoa, bệnh viện hoặc triệu chứng',
    color: 'teal'
  },
  {
    icon: Calendar,
    title: 'Chọn lịch khám',
    description: 'Chọn ngày giờ phù hợp với lịch trình của bạn',
    color: 'blue'
  },
  {
    icon: FileText,
    title: 'Điền thông tin',
    description: 'Cung cấp thông tin cá nhân và lý do khám bệnh',
    color: 'purple'
  },
  {
    icon: CheckCircle,
    title: 'Xác nhận đặt khám',
    description: 'Nhận xác nhận qua email và SMS ngay lập tức',
    color: 'green'
  }
]

const colorClasses = {
  teal: {
    bg: 'bg-teal-100',
    text: 'text-teal-600',
    gradient: 'from-teal-500 to-teal-600'
  },
  blue: {
    bg: 'bg-blue-100',
    text: 'text-blue-600',
    gradient: 'from-blue-500 to-blue-600'
  },
  purple: {
    bg: 'bg-purple-100',
    text: 'text-purple-600',
    gradient: 'from-purple-500 to-purple-600'
  },
  green: {
    bg: 'bg-green-100',
    text: 'text-green-600',
    gradient: 'from-green-500 to-green-600'
  }
}

export default function BookingProcess() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Đặt lịch khám chỉ với 4 bước đơn giản
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Quy trình đặt khám nhanh chóng, tiện lợi và an toàn
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 relative">
          {/* Connection lines - desktop only */}
          <div className="hidden md:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-teal-200 via-blue-200 to-green-200" 
               style={{ width: '90%', left: '5%' }}>
          </div>

          {steps.map((step, index) => {
            const colors = colorClasses[step.color as keyof typeof colorClasses]
            const Icon = step.icon

            return (
              <div key={index} className="relative">
                {/* Step card */}
                <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 relative z-10 border border-gray-100">
                  {/* Step number */}
                  <div className="absolute -top-4 -left-4 w-10 h-10 bg-gradient-to-br from-gray-800 to-gray-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div className={`w-16 h-16 ${colors.bg} rounded-2xl flex items-center justify-center mx-auto mb-4 relative overflow-hidden group`}>
                    <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                    <Icon className={`h-8 w-8 ${colors.text} relative z-10`} />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600 text-center leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <button className="px-8 py-4 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            Đặt lịch khám ngay
          </button>
        </div>
      </div>
    </section>
  )
}