import { mockQuestions } from '@/data'

export async function getUserQuestions(userId?: string): Promise<Question[]> {
   try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800))

      let questions = mockQuestions

      // Filter by user if userId is provided
      if (userId) {
         questions = questions.filter((q) => q.authorId === userId)
      }

      return questions
   } catch {
      throw new Error('Không thể tải danh sách câu hỏi từ server')
   }
}

export async function rateQuestion(questionId: string, rating: number): Promise<void> {
   try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      const question = mockQuestions.find((q) => q.id === questionId)
      if (question) {
         const updatedQuestion = {
            ...question,
            rating,
            hasRated: true
         }
         const index = mockQuestions.findIndex((q) => q.id === questionId)
         if (index !== -1) {
            mockQuestions[index] = updatedQuestion
         }
      }
   } catch {
      throw new Error('Không thể đánh giá câu hỏi')
   }
}

export async function deleteQuestion(questionId: string): Promise<void> {
   try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      const index = mockQuestions.findIndex((q) => q.id === questionId)
      if (index !== -1) {
         mockQuestions.splice(index, 1)
      }
   } catch {
      throw new Error('Không thể xóa câu hỏi')
   }
}

export function filterQuestions(
   questions: Question[],
   filters: {
      status?: Question['status']
      searchQuery?: string
   }
): Question[] {
   return questions.filter((question) => {
      // Filter by status
      if (filters.status && question.status !== filters.status) {
         return false
      }

      // Filter by search query
      if (filters.searchQuery) {
         const query = filters.searchQuery.toLowerCase()
         return (
            question.title.toLowerCase().includes(query) ||
            question.content.toLowerCase().includes(query) ||
            question.specialty.toLowerCase().includes(query)
         )
      }

      return true
   })
}
