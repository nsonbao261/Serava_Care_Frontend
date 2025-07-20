export const mockTreatments: string[] = [
   'Khám lâm sàng',
   'Tư vấn điều trị',
   'Kê đơn thuốc',
   'Theo dõi diễn biến bệnh',
   'Hướng dẫn chăm sóc tại nhà'
]

export const mockProceduresMap: { [key: string]: string[] } = {
   'tim-mach': ['Điện tim', 'Siêu âm tim', 'Đo huyết áp 24h', 'Thông tim chẩn đoán'],
   mat: ['Khám mắt tổng quát', 'Đo độ cận thị', 'Đo nhãn áp', 'Chụp đáy mắt'],
   'nhi-khoa': ['Khám phát triển', 'Tiêm chủng', 'Tư vấn dinh dưỡng', 'Theo dõi tăng trưởng'],
   default: ['Khám lâm sàng', 'Xét nghiệm', 'Tư vấn điều trị', 'Kê đơn thuốc']
}

export const mockFAQs: { id: string; question: string; answer: string; category: string }[] = [
   {
      id: '1',
      question: 'Tôi cần chuẩn bị gì trước khi đến khám?',
      answer:
         'Bạn nên mang theo giấy tờ tùy thân, bảo hiểm y tế và các kết quả xét nghiệm cũ nếu có.',
      category: 'general'
   },
   {
      id: '2',
      question: 'Thời gian làm việc của phòng khám là gì?',
      answer: 'Phòng khám làm việc từ 8h00 đến 17h00 từ thứ Hai đến thứ Sáu.',
      category: 'hours'
   }
]
