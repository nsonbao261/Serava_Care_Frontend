'use client'

import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: 'Làm thế nào để đặt lịch khám bệnh?',
    answer: 'Bạn chỉ cần tìm kiếm bác sĩ hoặc chuyên khoa phù hợp, chọn khung giờ trống, điền thông tin và xác nhận đặt lịch. Toàn bộ quá trình chỉ mất 2-3 phút.'
  },
  {
    question: 'Tôi có thể hủy hoặc đổi lịch khám không?',
    answer: 'Có, bạn có thể hủy hoặc đổi lịch khám miễn phí trước 24 giờ. Truy cập "Lịch sử đặt khám" để thực hiện thay đổi.'
  },
  {
    question: 'Chi phí khám bệnh có bao gồm phí đặt lịch không?',
    answer: 'Serava Care không thu thêm phí đặt lịch. Bạn chỉ thanh toán chi phí khám bệnh theo quy định của bệnh viện/phòng khám.'
  },
  {
    question: 'Thông tin cá nhân của tôi có được bảo mật không?',
    answer: 'Chúng tôi cam kết bảo mật thông tin theo tiêu chuẩn HIPAA quốc tế. Dữ liệu được mã hóa và chỉ chia sẻ với bác sĩ/bệnh viện khi có sự đồng ý của bạn.'
  },
  {
    question: 'Tôi có nhận được xác nhận sau khi đặt lịch không?',
    answer: 'Có, bạn sẽ nhận email và SMS xác nhận ngay sau khi đặt lịch thành công. Trước ngày khám 1 ngày, chúng tôi sẽ gửi tin nhắn nhắc nhở.'
  }
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Câu hỏi thường gặp
          </h2>
          <p className="text-xl text-gray-600">
            Giải đáp những thắc mắc phổ biến nhất
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-900 pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`h-5 w-5 text-gray-500 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-48' : 'max-h-0'
                }`}
              >
                <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}