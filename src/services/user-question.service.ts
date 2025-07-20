import { Question } from '@/types'
import { mockQuestions } from '@/data'

export async function getUserQuestions(userId?: string): Promise<Question[]> {
   // Simulate API delay
   await new Promise((resolve) => setTimeout(resolve, 800))

   let questions = mockQuestions

   // Filter by user if userId is provided
   if (userId) {
      questions = questions.filter((q) => q.authorId === userId)
   }

   return questions
}

export async function getQuestionById(id: string): Promise<Question | null> {
   // Simulate API delay
   await new Promise((resolve) => setTimeout(resolve, 600))

   const question = mockQuestions.find((q) => q.id === id)
   if (question) {
      // Increment views
      const updatedQuestion = { ...question, views: (question.views || 0) + 1 }
      return updatedQuestion
   }
   return null
}

export async function rateQuestion(questionId: string, rating: number): Promise<void> {
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
}

export async function deleteQuestion(questionId: string): Promise<void> {
   // Simulate API delay
   await new Promise((resolve) => setTimeout(resolve, 500))

   const index = mockQuestions.findIndex((q) => q.id === questionId)
   if (index !== -1) {
      mockQuestions.splice(index, 1)
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
