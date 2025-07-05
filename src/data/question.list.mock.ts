import { Question } from '@/types'

// Mock question data
export const mockQuestions: Question[] = [
   {
      id: '1',
      title: 'Đau đầu thường xuyên có nguy hiểm không?',
      content:
         'Tôi bị đau đầu thường xuyên trong 2 tuần qua, đặc biệt là vào buổi chiều. Có khi đau dữ dội, có khi chỉ đau nhẹ. Tôi muốn hỏi bác sĩ xem tình trạng này có nguy hiểm không và cần làm gì?',
      specialty: 'than-kinh',
      isPublic: true,
      authorId: 'user-1',
      authorName: 'Nguyễn Văn An',
      createdAt: new Date('2024-01-15T10:00:00Z'),
      updatedAt: new Date('2024-01-15T10:00:00Z'),
      status: 'answered',
      answer:
         'Đau đầu thường xuyên có thể do nhiều nguyên nhân khác nhau như căng thẳng, thiếu ngủ, hoặc các vấn đề sức khỏe nghiêm trọng hơn. Tôi khuyên bạn nên đến khám trực tiếp để được thăm khám và chẩn đoán chính xác.',
      doctorName: 'BS. Trần Văn B',
      doctorSpecialty: 'Thần kinh',
      answeredAt: new Date('2024-01-15T14:00:00Z'),
      attachments: [],
      views: 25
   },
   {
      id: '2',
      title: 'Đau bụng sau khi ăn có bình thường không?',
      content:
         'Gần đây tôi thường bị đau bụng sau khi ăn, khoảng 30 phút đến 1 tiếng sau bữa ăn. Đau ở vùng dạ dày, không quá dữ dội nhưng khó chịu. Có phải do thức ăn không?',
      specialty: 'tieu-hoa',
      isPublic: false,
      authorId: 'user-1',
      authorName: 'Nguyễn Văn An',
      createdAt: new Date('2024-01-20T15:30:00Z'),
      updatedAt: new Date('2024-01-20T15:30:00Z'),
      status: 'pending',
      attachments: [],
      views: 0
   },
   {
      id: '3',
      title: 'Khó ngủ và thức khuya có ảnh hưởng gì?',
      content:
         'Công việc của tôi phải thức khuya thường xuyên, gần đây cảm thấy mệt mỏi và khó tập trung. Có cách nào cải thiện giấc ngủ không ạ?',
      specialty: 'tam-than',
      isPublic: true,
      authorId: 'user-2',
      authorName: 'Lê Thị Hoa',
      createdAt: new Date('2024-01-18T09:15:00Z'),
      updatedAt: new Date('2024-01-18T09:15:00Z'),
      status: 'answered',
      answer:
         'Thức khuya thường xuyên có thể gây ra nhiều vấn đề sức khỏe như suy giảm miễn dịch, stress, và các vấn đề về tim mạch. Tôi khuyên bạn nên cố gắng điều chỉnh lịch ngủ và tạo môi trường ngủ thoải mái.',
      doctorName: 'BS. Hoàng Minh C',
      doctorSpecialty: 'Tâm thần',
      answeredAt: new Date('2024-01-18T16:45:00Z'),
      attachments: [],
      views: 42
   }
]
