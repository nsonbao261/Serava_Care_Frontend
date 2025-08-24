import { mockQuestions } from '@/data'

export async function getQuestionById(id: string): Promise<Question | null> {
   try {
      await new Promise((resolve) => setTimeout(resolve, 800))
      return mockQuestions.find((order) => order.id === id) || null
   } catch {
      throw new Error('Không thể tải thông tin câu hỏi từ server')
   }
}
